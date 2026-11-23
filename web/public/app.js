/* global fetch */

const state = {
  skills: [],
  current: null,
  convs: {},
  pending: false,
  configured: false,
};

const EXAMPLES = {
  'admin-perkantoran-pemda': [
    'Klasifikasikan surat masuk dari Dinas Kesehatan berisi undangan rapat koordinasi vaksinasi 27 November 2026, lalu buatkan draft disposisi dan pengingatnya.',
    'Ringkas transkrip rapat berikut menjadi notulen dengan keputusan dan daftar tindak lanjut: "Rapat membahas anggaran. Kuota kurang. Disepakati realokasi 5%."',
  ],
  'registrasi-anamnesa-klinik': [
    'Pasien: "Sudah 3 hari demam, batuk, tenggorokan sakit, pernah alergi amoxicilin." Belum ada tanda vital. Ubah ke format SOAP dan tandai yang perlu diverifikasi dokter.',
    'Periksa kelengkapan form registrasi berikut: nama terisi, BPJS kosong, alamat kosong, kontak terisi. Tampilkan field yang kurang.',
  ],
  'digital-marketing-agency': [
    'Brief: kopi susu lokal, target mahasiswa 18–24, Instagram, tone santai. Buat 5 variasi caption dengan hook berbeda + hipotesis A/B testing.',
    'Data minggu ini: reach 12.400 (+18%), engagement 3,1% (−0,4%), CTR 1,2%. Beri 3 insight dan rekomendasi konten minggu depan.',
  ],
  'hrd-perusahaan-sawit': [
    'Saring 5 CV Operator Panen dengan kriteria: pengalaman ≥1 tahun (40%), domisili ≤20 km (30%), bersedia shift (30%). Buat tabel peringkat + draft undangan interview.',
    'Karyawan bertanya: "Saya mau cuti 2 hari, caranya bagaimana?" Jawab berdasarkan SOP umum dan tandai jika perlu eskalasi ke HRD.',
  ],
  'kredit-bank': [
    'NAS-014: penghasilan Rp 6.500.000, cicilan existing Rp 1.800.000, angsuran baru Rp 1.950.000. Surat agunan belum ada. Cek kelengkapan, hitung DSR sebagai informasi, dan buat draft memo 5C.',
    'Buat teks pengingat jatuh tempo angsuran yang sopan untuk 7 nasabah yang jatuh tempo 3 hari lagi.',
  ],
};

const SKILL_META = {
  'admin-perkantoran-pemda': {
    title: 'Admin Perkantoran Pemda',
    short: 'Surat masuk/keluar, disposisi, notulen rapat, layanan warga, laporan.',
  },
  'registrasi-anamnesa-klinik': {
    title: 'Registrasi & Anamnesa Klinik',
    short: 'Registrasi pasien, anamnesa SOAP, jadwal kontrol, rekap kunjungan.',
  },
  'digital-marketing-agency': {
    title: 'Digital Marketing Agency',
    short: 'Caption & A/B, riset keyword, insight analitik, laporan klien.',
  },
  'hrd-perusahaan-sawit': {
    title: 'HRD Perusahaan Sawit',
    short: 'Screening CV, job posting, jadwal interview, FAQ & absensi.',
  },
  'kredit-bank': {
    title: 'Kredit Bank',
    short: 'Verifikasi berkas, memo 5C, pengingat angsuran, portofolio.',
  },
};

function skillTitle(skill) {
  return SKILL_META[skill.id]?.title || skill.name.replace(/-/g, ' ');
}

function skillSummary(skill) {
  return SKILL_META[skill.id]?.short || skill.description;
}

const els = {
  skillList: document.getElementById('skillList'),
  skillTitle: document.getElementById('skillTitle'),
  skillDesc: document.getElementById('skillDesc'),
  messages: document.getElementById('messages'),
  examples: document.getElementById('examples'),
  status: document.getElementById('status'),
  form: document.getElementById('chatForm'),
  input: document.getElementById('input'),
  send: document.getElementById('sendBtn'),
  reset: document.getElementById('resetBtn'),
};

/* ------------------------------------------------------------------ */
/* Markdown (minimal, aman)                                            */
/* ------------------------------------------------------------------ */

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[ch]);
}

function inline(text) {
  return text
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}

function tableCells(line) {
  let s = line.trim();
  if (s.startsWith('|')) s = s.slice(1);
  if (s.endsWith('|')) s = s.slice(0, -1);
  return s.split('|').map((c) => c.trim());
}

function renderMarkdown(source) {
  const codeBlocks = [];
  let text = escapeHtml(source).replace(/```[^\n]*\n([\s\S]*?)```/g, (_, code) => {
    codeBlocks.push(`<pre><code>${code.replace(/\n$/, '')}</code></pre>`);
    return `\u0000B${codeBlocks.length - 1}\u0000`;
  });

  const lines = text.split('\n');
  const out = [];
  let list = null;

  const closeList = () => {
    if (list) {
      out.push(`</${list}>`);
      list = null;
    }
  };

  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i];
    const line = raw.trim();

    if (!line) {
      closeList();
      continue;
    }

    const token = line.match(/^\u0000B(\d+)\u0000$/);
    if (token) {
      closeList();
      out.push(codeBlocks[Number(token[1])]);
      continue;
    }

    if (
      line.startsWith('|') &&
      i + 1 < lines.length &&
      /^\s*\|(\s*:?-{3,}:?\s*\|)+\s*$/.test(lines[i + 1])
    ) {
      closeList();
      const header = tableCells(line);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        rows.push(tableCells(lines[i]));
        i += 1;
      }
      i -= 1;
      out.push(
        `<table><thead><tr>${header.map((h) => `<th>${inline(h)}</th>`).join('')}</tr></thead>` +
          `<tbody>${rows
            .map(
              (row) =>
                `<tr>${header.map((_, idx) => `<td>${inline(row[idx] || '')}</td>`).join('')}</tr>`
            )
            .join('')}</tbody></table>`
      );
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      closeList();
      const level = Math.min(heading[1].length + 1, 4);
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }

    if (/^([-*_])\1{2,}$/.test(line)) {
      closeList();
      out.push('<hr>');
      continue;
    }

    if (line.startsWith('&gt;')) {
      closeList();
      out.push(`<blockquote>${inline(line.replace(/^&gt;\s?/, ''))}</blockquote>`);
      continue;
    }

    const ordered = line.match(/^(\d+)[.)]\s+(.*)$/);
    if (ordered) {
      if (list !== 'ol') {
        closeList();
        out.push('<ol>');
        list = 'ol';
      }
      out.push(`<li>${inline(ordered[2])}</li>`);
      continue;
    }

    const unordered = line.match(/^[-*+]\s+(.*)$/);
    if (unordered) {
      if (list !== 'ul') {
        closeList();
        out.push('<ul>');
        list = 'ul';
      }
      out.push(`<li>${inline(unordered[1])}</li>`);
      continue;
    }

    closeList();
    out.push(`<p>${inline(line)}</p>`);
  }

  closeList();
  return out.join('\n');
}

/* ------------------------------------------------------------------ */
/* UI                                                                  */
/* ------------------------------------------------------------------ */

function activeSkill() {
  return state.skills.find((s) => s.id === state.current) || null;
}

function conversation() {
  if (!state.convs[state.current]) state.convs[state.current] = [];
  return state.convs[state.current];
}

function renderSkillList() {
  els.skillList.innerHTML = '';

  for (const skill of state.skills) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `skill${skill.id === state.current ? ' active' : ''}`;
    button.dataset.id = skill.id;

    const name = document.createElement('span');
    name.className = 'skill-name';
    name.textContent = skillTitle(skill);

    const desc = document.createElement('span');
    desc.className = 'skill-desc';
    desc.textContent = skillSummary(skill);

    button.append(name, desc);
    button.addEventListener('click', () => selectSkill(skill.id));
    els.skillList.append(button);
  }
}

function renderExamples() {
  els.examples.innerHTML = '';
  const items = EXAMPLES[state.current] || [];
  for (const text of items) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip';
    chip.textContent = text;
    chip.title = text;
    chip.addEventListener('click', () => {
      els.input.value = text;
      grow();
      els.input.focus();
    });
    els.examples.append(chip);
  }
}

function messageElement(msg) {
  const wrap = document.createElement('div');
  wrap.className = `msg ${msg.role === 'user' ? 'user' : 'assistant'}`;

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = msg.role === 'user' ? 'Anda' : 'AI';
  avatar.style.fontSize = msg.role === 'user' ? '9.5px' : '11px';

  const bubble = document.createElement('div');
  bubble.className = 'bubble';

  const who = document.createElement('span');
  who.className = 'who';
  who.textContent =
    msg.role === 'user'
      ? 'Anda'
      : msg.role === 'error'
        ? 'Kesalahan'
        : activeSkill()
          ? skillTitle(activeSkill())
          : 'AI Agent';

  const content = document.createElement('div');
  if (msg.role === 'assistant') {
    content.innerHTML = renderMarkdown(msg.content);
  } else {
    const p = document.createElement('p');
    p.textContent = msg.content;
    content.append(p);
  }

  bubble.append(who, content);

  if (msg.role === 'assistant') {
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'copy';
    copy.textContent = 'Salin';
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(msg.content);
        copy.textContent = 'Tersalin';
        setTimeout(() => (copy.textContent = 'Salin'), 1200);
      } catch {
        copy.textContent = 'Gagal';
      }
    });
    bubble.append(copy);
  }

  if (msg.role === 'error') bubble.classList.add('error');

  wrap.append(avatar, bubble);
  return wrap;
}

function renderMessages() {
  els.messages.innerHTML = '';
  const conv = conversation();

  if (!conv.length && !state.pending) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    const strong = document.createElement('strong');
    strong.textContent = 'Mulai percakapan';
    const p = document.createElement('p');
    p.textContent =
      'Pilih salah satu contoh di bawah atau tulis instruksi Anda. Agent akan menjawab sebagai DRAFT yang perlu diverifikasi.';
    empty.append(strong, p);
    els.messages.append(empty);
  }

  for (const msg of conv) els.messages.append(messageElement(msg));

  if (state.pending) {
    const typing = document.createElement('div');
    typing.className = 'typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.append(typing);
    const wrap = document.createElement('div');
    wrap.className = 'msg assistant';
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = 'AI';
    wrap.append(avatar, bubble);
    els.messages.append(wrap);
  }

  els.messages.scrollTop = els.messages.scrollHeight;
}

function selectSkill(id) {
  state.current = id;
  const skill = activeSkill();
  if (!skill) return;

  els.skillTitle.textContent = skillTitle(skill);
  els.skillDesc.textContent = skillSummary(skill);

  conversation();
  renderSkillList();
  renderExamples();
  renderMessages();
  els.input.placeholder = `Tulis instruksi untuk ${skillTitle(skill)}…`;
  els.input.focus();
}

function setPending(value) {
  state.pending = value;
  els.send.disabled = value;
  els.input.disabled = value;
  renderMessages();
}

async function sendMessage(text) {
  const trimmed = text.trim();
  if (!trimmed || state.pending || !state.current) return;

  const conv = conversation();
  conv.push({ role: 'user', content: trimmed });
  els.input.value = '';
  grow();
  setPending(true);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skillId: state.current, messages: conv }),
    });

    let data = {};
    try {
      data = await res.json();
    } catch {
      throw new Error(`Respons server tidak valid (HTTP ${res.status}).`);
    }

    if (!res.ok) throw new Error(data.error || `Permintaan gagal (HTTP ${res.status}).`);
    conv.push({ role: 'assistant', content: data.reply });
  } catch (err) {
    conv.push({ role: 'error', content: err.message });
  } finally {
    setPending(false);
    renderMessages();
  }
}

function grow() {
  els.input.style.height = 'auto';
  els.input.style.height = `${Math.min(els.input.scrollHeight, 180)}px`;
}

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */

async function boot() {
  try {
    const [skillsRes, healthRes] = await Promise.all([
      fetch('/api/skills'),
      fetch('/api/health'),
    ]);

    state.skills = await skillsRes.json();
    const health = await healthRes.json();
    state.configured = Boolean(health.configured);

    if (!state.skills.length) {
      els.skillTitle.textContent = 'Tidak ada skill';
      els.skillDesc.textContent = 'Pastikan folder skills/ berisi SKILL.md.';
      return;
    }

    if (state.configured) {
      els.status.className = 'status ok';
      els.status.textContent = `Siap · model ${health.model} · ${state.skills.length} skill`;
    } else {
      els.status.className = 'status bad';
      els.status.textContent =
        'API key belum diatur. Salin web/.env.example menjadi web/.env, isi LLM_API_KEY, lalu restart server.';
    }

    selectSkill(state.skills[0].id);
  } catch (err) {
    els.skillTitle.textContent = 'Gagal memuat';
    els.skillDesc.textContent = String(err.message || err);
  }
}

els.form.addEventListener('submit', (event) => {
  event.preventDefault();
  sendMessage(els.input.value);
});

els.input.addEventListener('input', grow);

els.input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage(els.input.value);
  }
});

els.reset.addEventListener('click', () => {
  if (!state.current) return;
  state.convs[state.current] = [];
  renderMessages();
  els.input.focus();
});

boot();
