/**
 * Web AI Agent — Praktikum #13
 * Zero-dependency Node.js server (Node 18+).
 *
 * Menyajikan UI chat dan memuat kelima skill dari folder ../skills.
 * Meneruskan percakapan ke API LLM yang kompatibel dengan OpenAI.
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { exec } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const SKILLS_DIR = path.join(ROOT, 'skills');
const PUBLIC_DIR = path.join(__dirname, 'public');
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || '127.0.0.1';

loadEnvFile();

const BASE_URL = (process.env.LLM_BASE_URL || 'https://api.openai.com/v1').replace(/\/+$/, '');
const API_KEY = process.env.LLM_API_KEY || '';
const DEFAULT_MODEL = process.env.LLM_MODEL || 'gpt-4o-mini';
let activeModel = DEFAULT_MODEL;

const PERSONA =
  'Namamu adalah RAKA (Rekan Kerja Otomatis): rekan kerja digital yang sigap, teliti, dan membantu pekerjaan operasional. ' +
  'Perkenalkan dirimu sebagai RAKA bila ditanya, tetapi tetap utamakan penyelesaian tugas.';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

/* ------------------------------------------------------------------ */
/* Skill loader                                                        */
/* ------------------------------------------------------------------ */

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw.trim() };
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
  }
  return { meta, body: match[2].trim() };
}

function loadSkills() {
  const skills = [];
  if (!fs.existsSync(SKILLS_DIR)) return skills;

  for (const entry of fs.readdirSync(SKILLS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const file = path.join(SKILLS_DIR, entry.name, 'SKILL.md');
    if (!fs.existsSync(file)) continue;

    const raw = fs.readFileSync(file, 'utf8');
    const { meta, body } = parseFrontmatter(raw);

    const refDir = path.join(SKILLS_DIR, entry.name, 'references');
    const references = fs.existsSync(refDir)
      ? fs.readdirSync(refDir).filter((f) => f.endsWith('.md'))
      : [];

    skills.push({
      id: entry.name,
      name: meta.name || entry.name,
      description: meta.description || '',
      system: body,
      references,
    });
  }

  return skills.sort((a, b) => a.id.localeCompare(b.id));
}

const SKILLS = loadSkills();
const SKILL_MAP = new Map(SKILLS.map((s) => [s.id, s]));

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function loadEnvFile() {
  const file = path.join(__dirname, '.env');
  if (!fs.existsSync(file)) return;

  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(m[1] in process.env)) process.env[m[1]] = value;
  }
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

function readBody(req, limit = 1024 * 1024) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(new Error('Payload terlalu besar.'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function buildSystemPrompt(skill) {
  const refs = skill.references.length
    ? `\n\nReferensi pendukung yang tersedia di repository: ${skill.references.join(', ')}. ` +
      'Minta pengguna memilih template bila diperlukan.'
    : '';

  return [
    PERSONA,
    'Kamu adalah AI Agent yang menjalankan skill di bawah ini secara ketat.',
    'Patuhi peran, workflow, format keluaran, dan batasan (guardrails) yang tertulis.',
    'Selalu jawab dalam Bahasa Indonesia yang jelas dan ringkas.',
    'Tandai ketidakpastian dengan [PERLU VERIFIKASI] dan jangan mengarang data.',
    'Semua keluaran bersifat DRAFT yang harus diverifikasi manusia.',
    '',
    `<SKILL id="${skill.id}" name="${skill.name}">`,
    skill.system,
    '</SKILL>',
    refs,
  ].join('\n');
}

/* ------------------------------------------------------------------ */
/* API                                                                 */
/* ------------------------------------------------------------------ */

async function handleChat(req, res) {
  if (!API_KEY) {
    return sendJson(res, 503, {
      error:
        'API key belum dikonfigurasi. Salin web/.env.example menjadi web/.env, ' +
        'lalu isi LLM_API_KEY (dan opsional LLM_BASE_URL / LLM_MODEL), kemudian restart server.',
    });
  }

  let payload;
  try {
    payload = JSON.parse(await readBody(req));
  } catch {
    return sendJson(res, 400, { error: 'Body JSON tidak valid.' });
  }

  const skill = SKILL_MAP.get(String(payload.skillId || ''));
  if (!skill) return sendJson(res, 404, { error: 'Skill tidak ditemukan.' });

  const incoming = Array.isArray(payload.messages) ? payload.messages : [];
  const messages = incoming
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-20)
    .map((m) => ({ role: m.role, content: m.content }));

  if (!messages.length) {
    return sendJson(res, 400, { error: 'Pesan tidak boleh kosong.' });
  }

  const body = {
    model: activeModel,
    temperature: 0.2,
    messages: [{ role: 'system', content: buildSystemPrompt(skill) }, ...messages],
  };

  try {
    const upstream = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(120000),
    });

    const text = await upstream.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return sendJson(res, 502, {
        error: `Respons upstream bukan JSON (HTTP ${upstream.status}).`,
        detail: text.slice(0, 500),
      });
    }

    if (!upstream.ok) {
      return sendJson(res, 502, {
        error: friendlyUpstreamError(data?.error?.message || `Upstream error (HTTP ${upstream.status}).`),
      });
    }

    const reply =
      data?.choices?.[0]?.message?.content ??
      data?.choices?.[0]?.text ??
      '';

    if (!reply) {
      return sendJson(res, 502, { error: 'Model tidak mengembalikan teks.' });
    }

    return sendJson(res, 200, { reply, model: activeModel });
  } catch (err) {
    const message =
      err?.name === 'TimeoutError'
        ? 'Permintaan ke penyedia LLM melebihi batas waktu (120 detik).'
        : `Gagal menghubungi penyedia LLM: ${err.message}`;
    return sendJson(res, 502, { error: message });
  }
}

function friendlyUpstreamError(message) {
  if (/not found, try pulling it first/i.test(message)) {
    return `Model "${activeModel}" belum terunduh. Jalankan di terminal: ollama pull ${activeModel}`;
  }
  if (/connection refused|ECONNREFUSED|fetch failed/i.test(message)) {
    return `Tidak bisa menghubungi ${BASE_URL}. Bila memakai Ollama, pastikan aplikasinya berjalan (ollama serve).`;
  }
  if (/does not support tools|context length/i.test(message)) {
    return `${message} — coba model lain lewat dropdown Model di kanan atas.`;
  }
  return message;
}

/* ------------------------------------------------------------------ */
/* Model picker                                                        */
/* ------------------------------------------------------------------ */

async function handleModels(res) {
  const fallback = {
    models: [activeModel],
    active: activeModel,
    default: DEFAULT_MODEL,
    source: 'config',
  };

  if (!API_KEY) {
    return sendJson(res, 200, { ...fallback, error: 'API key belum dikonfigurasi.' });
  }

  try {
    const upstream = await fetch(`${BASE_URL}/models`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
      signal: AbortSignal.timeout(8000),
    });

    if (!upstream.ok) {
      return sendJson(res, 200, { ...fallback, error: `Penyedia LLM menjawab HTTP ${upstream.status}.` });
    }

    const data = await upstream.json();
    const ids = Array.isArray(data?.data) ? data.data.map((m) => m?.id).filter(Boolean) : [];

    if (!ids.length) return sendJson(res, 200, { ...fallback, error: 'Daftar model kosong.' });
    if (!ids.includes(activeModel)) ids.unshift(activeModel);

    return sendJson(res, 200, {
      models: ids,
      active: activeModel,
      default: DEFAULT_MODEL,
      source: 'provider',
    });
  } catch (err) {
    return sendJson(res, 200, { ...fallback, error: `Gagal mengambil daftar model: ${err.message}` });
  }
}

async function handleSetModel(req, res) {
  let payload;
  try {
    payload = JSON.parse(await readBody(req, 8 * 1024));
  } catch {
    return sendJson(res, 400, { error: 'Body JSON tidak valid.' });
  }

  const model = String(payload?.model || '').trim();
  if (!model || model.length > 120) {
    return sendJson(res, 400, { error: 'Nama model tidak valid.' });
  }

  activeModel = model;
  return sendJson(res, 200, { model: activeModel, default: DEFAULT_MODEL });
}

/* ------------------------------------------------------------------ */
/* Static files                                                        */
/* ------------------------------------------------------------------ */

function serveStatic(req, res, pathname) {
  const rel = pathname === '/' ? '/index.html' : pathname;
  const file = path.normalize(path.join(PUBLIC_DIR, rel));

  if (!file.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(file, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Not found');
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    res.end(content);
  });
}

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/api/health') {
    return sendJson(res, 200, {
      ok: true,
      configured: Boolean(API_KEY),
      model: activeModel,
      defaultModel: DEFAULT_MODEL,
      baseUrl: BASE_URL,
      skills: SKILLS.length,
    });
  }

  if (url.pathname === '/api/models' && req.method === 'GET') {
    return handleModels(res);
  }

  if (url.pathname === '/api/model' && req.method === 'POST') {
    return handleSetModel(req, res);
  }

  if (url.pathname === '/api/skills' && req.method === 'GET') {
    return sendJson(
      res,
      200,
      SKILLS.map((s) => ({
        id: s.id,
        name: s.name,
        description: s.description,
        references: s.references,
      }))
    );
  }

  if (url.pathname === '/api/chat' && req.method === 'POST') {
    return handleChat(req, res);
  }

  if (req.method === 'GET' || req.method === 'HEAD') {
    return serveStatic(req, res, url.pathname);
  }

  res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Method not allowed');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\nPort ${PORT} sudah dipakai. Jalankan dengan PORT lain, contoh:`);
    console.error(`  $env:PORT=4174; node server.js\n`);
  } else {
    console.error(err);
  }
  process.exit(1);
});

server.listen(PORT, HOST, () => {
  const url = `http://localhost:${PORT}`;
  console.log('\n  RAKA — Rekan Kerja Otomatis');
  console.log(`  ${SKILLS.length} skill dimuat dari ${path.relative(process.cwd(), SKILLS_DIR) || SKILLS_DIR}`);
  console.log(`  Server: ${url}`);
  console.log(`  Model : ${activeModel}`);
  console.log(`  API   : ${API_KEY ? 'terkonfigurasi' : 'BELUM terkonfigurasi (isi web/.env)'}\n`);

  if (!process.env.NO_OPEN && process.stdout.isTTY) {
    const cmd =
      process.platform === 'win32'
        ? `start "" "${url}"`
        : process.platform === 'darwin'
          ? `open "${url}"`
          : `xdg-open "${url}"`;
    exec(cmd, () => {});
  }
});
