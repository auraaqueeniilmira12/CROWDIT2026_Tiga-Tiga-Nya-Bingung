function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("currentUser"));
  } catch (e) {
    return null;
  }
}

const defaultItems = [
  { id: 1, label: "Minum 8 gelas air", icon: "fa-tint", points: 10 },
  { id: 2, label: "Olahraga 30 menit", icon: "fa-running", points: 20 },
  { id: 3, label: "Makan sayur & buah", icon: "fa-apple-alt", points: 15 },
  { id: 4, label: "Tidur 7-8 jam", icon: "fa-bed", points: 15 },
  { id: 5, label: "Meditasi / relaksasi", icon: "fa-spa", points: 10 },
  { id: 6, label: "Batasi waktu layar", icon: "fa-mobile-alt", points: 10 },
];

let currentDate = new Date();
let checklistData = [];
let selectedMood = "";
let selectedTags = [];

function getDateKey(date) {
  return date.toDateString();
}

function getChecklistKey(date) {
  const user = getCurrentUser();
  return `checklist_${user?.email}_${getDateKey(date)}`;
}

function getJournalKey(date, index = null) {
  const user = getCurrentUser();
  const dateKey = getDateKey(date);
  // index null => key jurnal harian utama (dipakai textarea)
  if (index === null) return `journal_${user?.email}_${dateKey}`;
  // index untuk arsip per hari (maks 15)
  return `journal_${user?.email}_${dateKey}_${index}`;
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str).replace(
    /[&<>"']/g,
    (m) =>
      ({
        "&": "&amp;",
        "<": "<",
        ">": ">",
        '"': '"',
        "'": "&#39;",
      })[m],
  );
}

function loadChecklist() {
  const key = getChecklistKey(currentDate);
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      checklistData = JSON.parse(stored);
    } else {
      checklistData = defaultItems.map((item) => ({ ...item, done: false }));
    }
  } catch (e) {
    checklistData = defaultItems.map((item) => ({ ...item, done: false }));
  }
}

function saveChecklist() {
  const key = getChecklistKey(currentDate);
  localStorage.setItem(key, JSON.stringify(checklistData));
  updateStreakFromChecklist();
  updateStats();
  updateProgressBadge();
  renderHistory();
}

function updateStreakFromChecklist() {
  const completed = checklistData.filter((i) => i.done).length;
  const total = checklistData.length;
  const allDone = completed === total && total > 0;
  if (!allDone) return;

  const user = getCurrentUser();
  if (!user) return;

  const streakKey = `streak_${user.email}`;
  const today = new Date().toDateString();
  let data = { count: 0, lastDate: "", lastCompleted: false };

  try {
    const s = localStorage.getItem(streakKey);
    if (s) data = JSON.parse(s);
  } catch (e) {}

  if (data.lastDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (data.lastDate === yesterday.toDateString() && data.lastCompleted)
      data.count++;
    else data.count = 1;

    data.lastDate = today;
    data.lastCompleted = true;
  }

  localStorage.setItem(streakKey, JSON.stringify(data));
  const streakEl = document.getElementById("streak-count");
  if (streakEl) streakEl.textContent = data.count;
}

function renderChecklist() {
  const container = document.getElementById("checklist-items-container");
  if (!container) return;

  container.innerHTML = checklistData
    .map(
      (item, idx) => `
        <div class="checklist-item ${item.done ? "done" : ""}" onclick="toggleItem(${idx})" style="cursor:pointer">
            <div class="check-box ${item.done ? "checked" : ""}">
                ${item.done ? '<i class="fas fa-check"></i>' : ""}
            </div>
            <div class="item-icon"><i class="fas ${item.icon || "fa-check"}"></i></div>
            <div class="item-content">
                <span class="item-label">${escapeHtml(item.label)}</span>
                <span class="item-points"><i class="fas fa-star"></i> +${item.points} poin</span>
            </div>
            <button class="delete-item-btn" onclick="event.stopPropagation();deleteItem(${idx})" title="Hapus"><i class="fas fa-times"></i></button>
        </div>
    `,
    )
    .join("");

  updateStats();
  updateProgressBadge();

  // pastikan streak & points dashboard/profil selalu refresh setelah checklist item berubah
  try {
    if (typeof window !== "undefined" && window.location) {
      if (typeof updateStreakDisplay === "function") updateStreakDisplay();
    }
  } catch (e) {}
}

function toggleItem(idx) {
  checklistData[idx].done = !checklistData[idx].done;
  saveChecklist();
  renderChecklist();

  if (checklistData[idx].done) {
    showItemCelebration(checklistData[idx].label);
  }
}

function showItemCelebration(label) {
  const el = document.createElement("div");
  el.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg,#007260,#4db6ac);color:white;padding:20px 32px;border-radius:16px;z-index:10001;text-align:center;font-weight:600;font-size:14px;box-shadow:0 8px 30px rgba(0,114,96,0.4);`;
  el.innerHTML = `<i class="fas fa-check-circle" style="font-size:32px;display:block;margin-bottom:8px;"></i>Selesai: ${escapeHtml(label)}`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1500);
}

function deleteItem(idx) {
  checklistData.splice(idx, 1);
  saveChecklist();
  renderChecklist();
}

function updateStats() {
  const completed = checklistData.filter((i) => i.done).length;
  const total = checklistData.length || 1;
  const pct = Math.round((completed / total) * 100);
  const points = checklistData
    .filter((i) => i.done)
    .reduce((s, i) => s + (i.points || 10), 0);

  const progressEl = document.getElementById("today-progress");
  if (progressEl) progressEl.textContent = pct;

  const pointsEl = document.getElementById("today-points");
  if (pointsEl) pointsEl.textContent = points;

  const streakEl = document.getElementById("streak-count");
  if (streakEl) {
    const user = getCurrentUser();
    try {
      const data = JSON.parse(
        localStorage.getItem(`streak_${user?.email}`),
      ) || { count: 0 };
      streakEl.textContent = data.count;
    } catch (e) {
      streakEl.textContent = 0;
    }
  }
}

function updateProgressBadge() {
  const completed = checklistData.filter((i) => i.done).length;
  const total = checklistData.length;
  const badge = document.getElementById("checklist-progress-badge");
  if (badge) badge.textContent = `${completed}/${total} Selesai`;
}

function updateDateDisplay() {
  const dateEl = document.getElementById("current-date");
  if (!dateEl) return;

  const today = new Date();
  const isToday = currentDate.toDateString() === today.toDateString();

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const isYesterday = currentDate.toDateString() === yesterday.toDateString();

  let label = currentDate.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  if (isToday) label = "Hari Ini, " + label.split(", ").slice(1).join(", ");
  else if (isYesterday)
    label = "Kemarin, " + label.split(", ").slice(1).join(", ");

  dateEl.textContent = label;

  const nextBtn = document.getElementById("nextDayBtn");
  if (nextBtn) nextBtn.disabled = isToday;
}

function changeDate(days) {
  const newDate = new Date(currentDate);
  newDate.setDate(newDate.getDate() + days);
  if (newDate > new Date()) return;

  currentDate = newDate;
  updateDateDisplay();
  loadChecklist();
  renderChecklist();
  loadJournal();
  renderHistory();
  renderArchive();
}

function loadJournal() {
  const key = getJournalKey(currentDate);
  try {
    const data = JSON.parse(localStorage.getItem(key)) || {};
    const note = document.getElementById("daily-note");
    if (note) note.value = data.note || "";

    selectedMood = data.mood || "";
    selectedTags = data.tags || [];

    document.querySelectorAll(".mood-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.mood === selectedMood);
    });

    document.querySelectorAll(".tag-btn").forEach((btn) => {
      btn.classList.toggle("active", selectedTags.includes(btn.dataset.tag));
    });

    const preview = document.getElementById("photoPreview");
    const uploadArea = document.getElementById("photoUploadArea");
    const previewImage = document.getElementById("previewImage");

    if (data.photo) {
      if (preview) preview.style.display = "block";
      if (previewImage) previewImage.src = data.photo;
      if (uploadArea) uploadArea.style.display = "none";
    } else {
      if (preview) preview.style.display = "none";
      if (uploadArea) uploadArea.style.display = "flex";
      if (previewImage) previewImage.src = "";
    }
  } catch (e) {}
}

function saveJournal() {
  // simpan jurnal hari ini ke key arsip per hari (maks 15)
  const user = getCurrentUser();
  if (!user?.email) return;

  // pencapaian/streak terhubung ke dashboard & profil
  // - checklist done memicu streak + updateStats()
  // - jurnal disimpan juga memberi "points" (earnedPoints) & re-render

  const noteEl = document.getElementById("daily-note");

  const previewImageEl = document.getElementById("previewImage");

  const note = noteEl ? noteEl.value.trim() : "";
  const previewSrc = previewImageEl ? previewImageEl.src : "";
  const photo =
    previewSrc && previewSrc !== window.location.href ? previewSrc : null;

  const data = {
    note,
    mood: selectedMood,
    tags: selectedTags,
    photo,
    date: currentDate.toISOString(),
    saved: Date.now(),
  };

  // simpan ke salah satu slot arsip hari ini (maks 15)
  // cari index pertama yang kosong
  const existing = [];
  const dateKey = getDateKey(currentDate);
  const prefix = `journal_${user?.email}_${dateKey}_`;

  for (let k in localStorage) {
    if (k.startsWith(prefix)) {
      try {
        const d = JSON.parse(localStorage.getItem(k));
        existing.push({ key: k, saved: d?.saved || 0 });
      } catch (e) {}
    }
  }

  existing.sort((a, b) => b.saved - a.saved);

  let indexSlot = null;
  // karena key journal_<email>_<date>_index, cek slot 0..14
  for (let i = 1; i <= 15; i++) {
    const candidateKey = getJournalKey(currentDate, i);
    if (!localStorage.getItem(candidateKey)) {
      indexSlot = i;
      break;
    }
  }

  // jika semua slot penuh, override slot terakhir (slot 15)
  if (indexSlot === null) indexSlot = 15;

  const finalKey = getJournalKey(currentDate, indexSlot);
  localStorage.setItem(finalKey, JSON.stringify(data));

  // update achievement/points yang dipakai dashboard & profil
  // schema sederhana: simpan earnedPoints untuk user yang terhubung dengan daftar tantangan
  // (dashboard menjumlahkan challenges_${email} earnedPoints)
  try {
    const challengesKey = `challenges_${user.email}`;
    const challenges = JSON.parse(localStorage.getItem(challengesKey)) || [];

    // kalau belum ada challenge, buat challenge dummy agar points tampil
    if (challenges.length === 0) {
      const dummy = {
        id: Date.now(),
        name: "Journal Streak Points",
        status: "active",
        icon: "fa-journal-whills",
        targetDays: 7,
        daysCompleted: 0,
        earnedPoints: 0,
        earnedAt: Date.now(),
      };
      challenges.push(dummy);
    }

    // cari challenge active pertama, tambah earnedPoints sebesar 10 (berdasarkan jurnal tersimpan)
    const idx = challenges.findIndex((c) => c.status === "active");
    const addPts = 10;
    if (idx !== -1) {
      challenges[idx].earnedPoints =
        (challenges[idx].earnedPoints || 0) + addPts;
      challenges[idx].lastJournalSavedAt = Date.now();
      localStorage.setItem(challengesKey, JSON.stringify(challenges));
    }
  } catch (e) {}

  // dashboard & profil butuh refresh otomatis via reload, jadi render ulang archive
  showSaveToast("Jurnal berhasil disimpan!");
  renderArchive();
  if (typeof updateStreakDisplay === "function") updateStreakDisplay();
}

function showSaveToast(msg) {
  const el = document.createElement("div");
  el.style.cssText =
    "position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:#22c55e;color:white;padding:12px 24px;border-radius:30px;z-index:10002;font-size:13px;font-weight:600;";
  el.innerHTML = `<i class="fas fa-check-circle"></i> ${escapeHtml(msg)}`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2500);
}

function getMoodIcon(mood) {
  const icons = {
    senang: "fa-face-smile",
    biasa: "fa-face-meh",
    sedih: "fa-face-frown",
    marah: "fa-face-angry",
    capek: "fa-face-tired",
  };
  return `<i class="fas ${icons[mood] || "fa-face-smile"}"></i>`;
}

function renderHistory() {
  const container = document.getElementById("historyList");
  if (!container) return;

  const user = getCurrentUser();
  const today = new Date();
  const rows = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    const key = `checklist_${user?.email}_${d.toDateString()}`;
    let data = [];

    try {
      data = JSON.parse(localStorage.getItem(key)) || [];
    } catch (e) {}

    const done = data.filter((x) => x.done).length;
    const total = data.length || 6;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    const dayLabel =
      i === 0
        ? "Hari ini"
        : i === 1
          ? "Kemarin"
          : d.toLocaleDateString("id-ID", {
              weekday: "short",
              day: "numeric",
              month: "short",
            });

    rows.push(`
            <div class="history-item" onclick="goToDate(${-i})">
                <span class="history-date">${escapeHtml(dayLabel)}</span>
                <div class="history-bar-wrap"><div class="history-bar"><div class="history-fill" style="width:${pct}%;background:${pct === 100 ? "#22c55e" : pct > 50 ? "#f59e0b" : "#e8e8e8"}"></div></div></div>
                <span class="history-pct ${pct === 100 ? "perfect" : ""}">${pct}%</span>
            </div>
        `);
  }

  container.innerHTML = rows.join("");
}

// ===== ARCHIVE (Expand box detail sampai tanggal + isi) =====
function renderArchive() {
  const container = document.getElementById("archiveList");
  if (!container) return;

  // Arsip jurnal harus tampil PER HARI yang sedang dipilih
  // (sesuai tombol tanggal di halaman checklist)
  const user = getCurrentUser();
  if (!user?.email) {
    container.innerHTML =
      '<div class="empty-archive">Silakan login untuk melihat jurnal</div>';
    return;
  }

  // Untuk arsip jurnal per hari: simpan maksimal 15 entri per tanggal.
  // (Karena sebelumnya implementasi jurnal harian satu key, kita buat model arsip per tanggal per-jurnalIndex.)
  const sortMode = localStorage.getItem("journalArchiveSort") || "latest"; // latest | oldest
  container.dataset.sortMode = sortMode;

  const dateKey = getDateKey(currentDate);
  const prefix = `journal_${user.email}_${dateKey}_`;

  let shown = [];
  for (let k in localStorage) {
    if (!k.startsWith(prefix)) continue;
    try {
      const raw = localStorage.getItem(k);
      if (!raw) continue;
      const data = JSON.parse(raw);
      if (data && (data.note || data.mood)) shown.push({ ...data, key: k });
    } catch (e) {}
  }

  // sorting global dulu (latest/oldest), lalu potong 15
  shown.sort((a, b) => {
    const av = a.saved || 0;
    const bv = b.saved || 0;
    return sortMode === "latest" ? bv - av : av - bv;
  });
  shown = shown.slice(0, 15);

  // Arsip per hari sudah dibatasi 15; tidak ada jurnal lintas hari.

  if (!shown.length) {
    container.innerHTML =
      '<div class="empty-archive">Belum ada jurnal tersimpan</div>';
    return;
  }

  container.innerHTML = shown
    .map((e, idx) => {
      const dateStr = new Date(e.date || e.saved).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const moodHtml = e.mood
        ? `${getMoodIcon(e.mood)} ${escapeHtml(e.mood)}`
        : "";
      const shortNote = escapeHtml((e.note || "").substring(0, 120));
      const hasMore = (e.note || "").length > 120;

      const expandedId = `archiveDetail_${idx}`;
      const detailNote = escapeHtml(e.note || "");

      return `
            <div class="archive-item" data-archive-key="${escapeHtml(e.key)}">
                <button type="button" class="archive-expand-btn" 
                    style="width:100%;text-align:left;background:none;border:none;padding:0;cursor:pointer;">
                    <div class="archive-date">${escapeHtml(dateStr)}</div>
                    <div class="archive-mood">${moodHtml}</div>
                    <div class="archive-note">
                        ${shortNote}${hasMore ? "..." : ""}
                        <span style="color:#007260;font-weight:700;display:block;margin-top:6px;">Lihat detail</span>
                    </div>
                </button>

                <div id="${expandedId}" style="display:none;margin-top:10px;padding-top:10px;border-top:1px solid rgba(0,114,96,0.15);">
                    <div style="font-size:12px;font-weight:700;color:#007260;margin-bottom:6px;">Detail jurnal</div>
                    <div style="font-size:13px;color:#555;line-height:1.6;white-space:pre-wrap;">
                        ${detailNote || '<span style="color:#999">(catatan kosong)</span>'}
                    </div>
                </div>
                <div style="margin-top:10px;display:flex;gap:10px;align-items:center;">
                  <button type="button" class="archive-remove-btn" data-archive-key="${escapeHtml(e.key)}" 
                    style="background:#fff1f2;border:1px solid rgba(239,68,68,0.35);color:#e11d48;border-radius:12px;padding:8px 12px;cursor:pointer;font-weight:800;">
                    <i class="fas fa-trash" style="margin-right:6px;"></i>Hapus
                  </button>
                </div>
            </div>
        `;
    })
    .join("");

  // bind expand toggle + remove
  container.querySelectorAll(".archive-item").forEach((item) => {
    const btn = item.querySelector(".archive-expand-btn");
    const detail = item.querySelector('[id^="archiveDetail_"]');
    const removeBtn = item.querySelector(".archive-remove-btn");

    if (!btn || !detail) return;

    btn.addEventListener("click", () => {
      detail.style.display = detail.style.display === "none" ? "block" : "none";
    });

    if (removeBtn) {
      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const key = removeBtn.getAttribute("data-archive-key");
        if (!key) return;
        const ok = confirm("Hapus jurnal ini? ");
        if (!ok) return;
        localStorage.removeItem(key);
        renderArchive();
      });
    }
  });
}

function showAddItemModal() {
  const modal = document.getElementById("addItemModal");
  if (modal) {
    modal.style.display = "flex";
    return;
  }

  const m = document.createElement("div");
  m.id = "addItemModal";
  m.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px;";

  m.innerHTML = `<div style="background:white;border-radius:16px;padding:24px;width:100%;max-width:380px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
            <h3 style="font-size:16px;font-weight:700;color:#1a1a1a;">Tambah Item Checklist</h3>
            <button onclick="document.getElementById('addItemModal').remove()" style="background:none;border:none;font-size:22px;cursor:pointer;color:#888;">&times;</button>
        </div>
        <div style="margin-bottom:16px;">
            <label style="display:block;font-size:13px;font-weight:600;color:#444;margin-bottom:8px;">Nama Item</label>
            <input id="newItemLabel" type="text" placeholder="Contoh: Jogging pagi" style="width:100%;padding:12px;border:2px solid #e8e8e8;border-radius:10px;font-size:14px;font-family:Poppins,sans-serif;outline:none;">
        </div>
        <div style="margin-bottom:20px;">
            <label style="display:block;font-size:13px;font-weight:600;color:#444;margin-bottom:8px;">Poin</label>
            <input id="newItemPoints" type="number" value="10" min="1" max="100" style="width:100%;padding:12px;border:2px solid #e8e8e8;border-radius:10px;font-size:14px;font-family:Poppins,sans-serif;outline:none;">
        </div>
        <div style="display:flex;gap:10px;justify-content:flex-end;">
            <button onclick="document.getElementById('addItemModal').remove()" style="background:#f5f5f5;color:#666;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;">Batal</button>
            <button onclick="addCustomItem()" style="background:#007260;color:white;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;">Tambah</button>
        </div>
    </div>`;

  document.body.appendChild(m);
  m.addEventListener("click", (e) => {
    if (e.target === m) m.remove();
  });
}

function addCustomItem() {
  const label = document.getElementById("newItemLabel").value.trim();
  const points = parseInt(document.getElementById("newItemPoints").value) || 10;

  if (!label) {
    showSaveToast("Nama item tidak boleh kosong");
    return;
  }

  checklistData.push({
    id: Date.now(),
    label,
    icon: "fa-check-circle",
    points,
    done: false,
  });
  saveChecklist();
  renderChecklist();
  document.getElementById("addItemModal")?.remove();
  showSaveToast("Item berhasil ditambahkan!");
}

function updateChecklistTexts() {
  const lang = localStorage.getItem("language") || "id";
  const el = (id) => document.getElementById(id);

  if (el("lbl-daily-checklist"))
    el("lbl-daily-checklist").textContent =
      lang === "en" ? "Daily Checklist" : "Checklist Harian";
  if (el("lbl-journal"))
    el("lbl-journal").textContent = lang === "en" ? "Journal" : "Jurnal";
  if (el("btn-save-journal"))
    el("btn-save-journal").innerHTML =
      `<i class="fas fa-save"></i> ${lang === "en" ? "Save Journal" : "Simpan Jurnal"}`;
  if (el("btn-export-pdf"))
    el("btn-export-pdf").innerHTML =
      `<i class="fas fa-file-pdf"></i> ${lang === "en" ? "Export to PDF" : "Ekspor ke PDF"}`;
  if (el("btn-export-csv"))
    el("btn-export-csv").innerHTML =
      `<i class="fas fa-file-excel"></i> ${lang === "en" ? "Export to CSV" : "Ekspor ke CSV"}`;
}

function exportToPDF() {
  const user = getCurrentUser();
  const today = new Date();

  const content = [];
  content.push("HEALTECH - Laporan Checklist Harian");
  content.push(`Pengguna: ${user?.name || "User"}`);
  content.push(
    `Tanggal Ekspor: ${today.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`,
  );
  content.push("");

  content.push("=== CHECKLIST HARI INI ===");
  const today_key = getChecklistKey(new Date());
  let todayData = [];
  try {
    todayData = JSON.parse(localStorage.getItem(today_key)) || [];
  } catch (e) {}

  todayData.forEach((item) => {
    content.push(`[${item.done ? "X" : " "}] ${item.label}`);
  });

  const completed = todayData.filter((i) => i.done).length;
  content.push(
    `\nSelesai: ${completed}/${todayData.length} (${Math.round((completed / Math.max(todayData.length, 1)) * 100)}%)`,
  );

  content.push("\n=== JURNAL MINGGUAN ===");
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    const jKey = `journal_${user?.email}_${d.toDateString()}`;
    try {
      const jData = JSON.parse(localStorage.getItem(jKey));
      if (jData && (jData.note || jData.mood)) {
        content.push(
          `\n${d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })}`,
        );
        if (jData.mood) content.push(`Mood: ${jData.mood}`);
        if (jData.note) content.push(`Catatan: ${jData.note}`);
      }
    } catch (e) {}
  }

  const blob = new Blob([content.join("\n")], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `HealTech_Checklist_${today.toISOString().slice(0, 10)}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
  showSaveToast("PDF berhasil diunduh!");
}

function exportToCSV() {
  const user = getCurrentUser();
  const rows = [["Tanggal", "Item", "Selesai", "Poin"]];
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = `checklist_${user?.email}_${d.toDateString()}`;

    try {
      const data = JSON.parse(localStorage.getItem(key)) || [];
      data.forEach((item) => {
        rows.push([
          d.toLocaleDateString("id-ID"),
          item.label,
          item.done ? "Ya" : "Tidak",
          item.points || 10,
        ]);
      });
    } catch (e) {}
  }

  const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `HealTech_Checklist_${today.toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showSaveToast("CSV berhasil diunduh!");
}

// Expose for inline handlers
window.toggleItem = toggleItem;
window.deleteItem = deleteItem;
window.addCustomItem = addCustomItem;
window.goToDate = function (daysOffset) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  currentDate = d;
  updateDateDisplay();
  loadChecklist();
  renderChecklist();
  loadJournal();
  renderHistory();
  renderArchive();
};
window.showAddItemModal = showAddItemModal;
window.saveJournal = saveJournal;

document.addEventListener("DOMContentLoaded", function () {
  updateDateDisplay();
  loadChecklist();
  renderChecklist();
  loadJournal();
  renderHistory();
  renderArchive();

  const btnPrev = document.getElementById("prevDayBtn");
  const btnNext = document.getElementById("nextDayBtn");
  if (btnPrev) btnPrev.addEventListener("click", () => changeDate(-1));
  if (btnNext) btnNext.addEventListener("click", () => changeDate(1));

  const saveBtn = document.getElementById("saveJournalBtn");
  if (saveBtn) saveBtn.addEventListener("click", saveJournal);

  const exportPdfBtn = document.getElementById("exportPdfBtn");
  if (exportPdfBtn) exportPdfBtn.addEventListener("click", exportToPDF);

  const exportCsvBtn = document.getElementById("exportCsvBtn");
  if (exportCsvBtn) exportCsvBtn.addEventListener("click", exportToCSV);

  const addItemBtn = document.getElementById("addItemBtn");
  if (addItemBtn) addItemBtn.addEventListener("click", showAddItemModal);

  // mood buttons
  document.querySelectorAll(".mood-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".mood-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedMood = btn.dataset.mood || "";
    });
  });

  // tag buttons
  document.querySelectorAll(".tag-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      const tag = btn.dataset.tag;
      if (!tag) return;
      if (selectedTags.includes(tag))
        selectedTags = selectedTags.filter((t) => t !== tag);
      else selectedTags.push(tag);
    });
  });

  const sortLatestBtn = document.getElementById("archiveSortLatestBtn");
  const sortOldestBtn = document.getElementById("archiveSortOldestBtn");

  if (sortLatestBtn) {
    sortLatestBtn.addEventListener("click", () => {
      localStorage.setItem("journalArchiveSort", "latest");
      renderArchive();
    });
  }

  if (sortOldestBtn) {
    sortOldestBtn.addEventListener("click", () => {
      localStorage.setItem("journalArchiveSort", "oldest");
      renderArchive();
    });
  }
});
