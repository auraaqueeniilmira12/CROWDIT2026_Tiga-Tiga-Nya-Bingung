function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("currentUser"));
  } catch (e) {
    return null;
  }
}
function showToast(msg, type) {
  let el = document.createElement("div");
  el.style.cssText = `position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:${type === "error" ? "#ef4444" : "#007260"};color:white;padding:12px 24px;border-radius:40px;z-index:10002;font-size:13px;font-weight:600;`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2500);
}

let weightChart = null;
let currentEditStat = null;

function getWeightHistory() {
  const user = getCurrentUser();
  if (!user) return [];
  try {
    return JSON.parse(localStorage.getItem(`weight_${user.email}`)) || [];
  } catch (e) {
    return [];
  }
}

function saveWeightHistory(data) {
  const user = getCurrentUser();
  if (!user) return;
  localStorage.setItem(`weight_${user.email}`, JSON.stringify(data));
}

function getDailyStats() {
  const user = getCurrentUser();
  if (!user) return {};
  const today = new Date().toDateString();
  try {
    const all =
      JSON.parse(localStorage.getItem(`dailyStats_${user.email}`)) || {};
    return all[today] || {};
  } catch (e) {
    return {};
  }
}

function saveDailyStats(data) {
  const user = getCurrentUser();
  if (!user) return;
  const today = new Date().toDateString();
  try {
    const all =
      JSON.parse(localStorage.getItem(`dailyStats_${user.email}`)) || {};
    all[today] = { ...(all[today] || {}), ...data };
    localStorage.setItem(`dailyStats_${user.email}`, JSON.stringify(all));
  } catch (e) {}
}

function displayWeightChart() {
  const ctx = document.getElementById("weightChart");
  if (!ctx) return;
  if (weightChart) {
    weightChart.destroy();
    weightChart = null;
  }
  const user = getCurrentUser();
  const currentWeight = parseFloat(user?.weight) || 65;
  const targetWeight = parseFloat(user?.targetWeight) || 60;
  let history = getWeightHistory();
  if (history.length === 0) {
    const base = currentWeight + 3;
    history = [
      { date: "4 minggu lalu", weight: base + 1 },
      { date: "3 minggu lalu", weight: base },
      { date: "2 minggu lalu", weight: currentWeight + 1.5 },
      { date: "Minggu lalu", weight: currentWeight + 0.5 },
      { date: "Hari ini", weight: currentWeight },
    ];
  }
  const labels = history.slice(-6).map(
    (h) =>
      h.date ||
      new Date(h.timestamp).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
      }),
  );
  const weights = history.slice(-6).map((h) => h.weight);

  weightChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Berat (kg)",
          data: weights,
          borderColor: "#007260",
          backgroundColor: "rgba(0,114,96,0.08)",
          borderWidth: 3,
          pointRadius: 5,
          pointBackgroundColor: "#007260",
          tension: 0.3,
          fill: true,
        },
        {
          label: "Target",
          data: Array(labels.length).fill(targetWeight),
          borderColor: "#f59e0b",
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 0,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: { font: { size: 11, family: "Poppins" } },
        },
      },
      scales: {
        y: {
          grid: { color: "rgba(0,0,0,0.05)" },
          ticks: { font: { size: 10 } },
        },
        x: { ticks: { font: { size: 10 } } },
      },
    },
  });

  document.getElementById("current-weight").textContent = currentWeight;
  document.getElementById("weight-target").textContent =
    `Target: ${targetWeight} kg`;
  const diff = currentWeight - targetWeight;
  const diffEl = document.getElementById("weight-difference");
  if (diff > 0)
    diffEl.innerHTML = `<i class="fas fa-arrow-up" style="color:#ef4444"></i><span>${diff.toFixed(1)} kg di atas target</span>`;
  else if (diff < 0)
    diffEl.innerHTML = `<i class="fas fa-arrow-down" style="color:#22c55e"></i><span>${Math.abs(diff).toFixed(1)} kg di bawah target</span>`;
  else
    diffEl.innerHTML = `<i class="fas fa-check-circle" style="color:#22c55e"></i><span>Target tercapai!</span>`;

  const heightM = (parseFloat(user?.height) || 165) / 100;
  const bmi = currentWeight / (heightM * heightM);
  const bmiRounded = bmi.toFixed(1);
  document.getElementById("bmi-display").textContent = bmiRounded;
  let bmiCat =
    bmi < 18.5
      ? "Kurang"
      : bmi < 25
        ? "Normal"
        : bmi < 30
          ? "Lebih"
          : "Obesitas";
  const bmiEl = document.getElementById("bmi-cat");
  bmiEl.textContent = bmiCat;
  bmiEl.style.color =
    bmi < 18.5
      ? "#3b82f6"
      : bmi < 25
        ? "#22c55e"
        : bmi < 30
          ? "#f59e0b"
          : "#ef4444";
}

function displayDailySummary() {
  const user = getCurrentUser();
  const stats = getDailyStats();
  const today = new Date().toDateString();
  const checklistKey = `checklist_${user?.email}_${today}`;
  let checklistData = [];
  try {
    checklistData = JSON.parse(localStorage.getItem(checklistKey)) || [];
  } catch (e) {}
  const completed = checklistData.filter((i) => i.done).length;
  const total = checklistData.length || 6;
  const checkPct = Math.round((completed / total) * 100);

  const items = {
    checklist: {
      val: completed,
      max: total,
      text: `${completed}/${total}`,
      pct: checkPct,
    },
    steps: {
      val: stats.steps || 0,
      max: 8000,
      text: `${(stats.steps || 0).toLocaleString()}/8.000`,
      pct: Math.min(100, Math.round(((stats.steps || 0) / 8000) * 100)),
    },
    water: {
      val: stats.water || 0,
      max: 8,
      text: `${stats.water || 0}/8 gelas`,
      pct: Math.min(100, Math.round(((stats.water || 0) / 8) * 100)),
    },
    sleep: {
      val: stats.sleep || 0,
      max: 8,
      text: `${stats.sleep || 0}/8 jam`,
      pct: Math.min(100, Math.round(((stats.sleep || 0) / 8) * 100)),
    },
    screentime: {
      val: stats.screentime || 0,
      max: 4,
      text: `${stats.screentime || 0}/4 jam`,
      pct: Math.min(100, Math.round(((stats.screentime || 0) / 4) * 100)),
    },
  };
  Object.entries(items).forEach(([key, d]) => {
    const fill = document.getElementById(`${key}-progress`);
    const text = document.getElementById(`${key}-text`);
    if (fill) fill.style.width = d.pct + "%";
    if (text) text.textContent = d.text;
  });
}

function renderChallenges() {
  const user = getCurrentUser();
  const container = document.getElementById("challengesList");
  if (!container) return;
  let challenges = [];
  try {
    challenges =
      JSON.parse(localStorage.getItem(`challenges_${user?.email}`)) || [];
  } catch (e) {}
  const active = challenges.filter((c) => c.status === "active").slice(0, 3);
  if (active.length === 0) {
    container.innerHTML = `<div class="empty-state"><i class="fas fa-fire"></i><p>Belum ada tantangan aktif</p><a href="../plan/plan.html" class="empty-link">Mulai Tantangan</a></div>`;
    return;
  }
  container.innerHTML = active
    .map((c) => {
      const pct = Math.round((c.daysCompleted / c.targetDays) * 100);
      return `<div class="challenge-item" onclick="window.location.href='../plan/plan.html'">
            <div class="challenge-icon"><i class="${c.icon || "fas fa-fire"}"></i></div>
            <div class="challenge-content">
                <div class="challenge-title">${escapeHtml(c.name)}</div>
                <div class="challenge-progress-wrapper"><div class="challenge-progress-bar"><div class="challenge-progress-fill" style="width:${pct}%"></div></div><span class="challenge-progress-text">${pct}% (Hari ${c.daysCompleted}/${c.targetDays})</span></div>
            </div>
        </div>`;
    })
    .join("");
}

function renderDailyContent() {
  const container = document.getElementById("dailyContentGrid");
  if (!container) return;
  const contents = [
    {
      icon: "fa-running",
      title: "Morning Stretch",
      desc: "Peregangan pagi 5 menit",
      meta: "5 min",
      url: "../konten/konten.html",
    },
    {
      icon: "fa-apple-alt",
      title: "Sarapan Sehat",
      desc: "3 resep cepat bergizi",
      meta: "3 min read",
      url: "../konten/konten.html?cat=nutrition",
    },
    {
      icon: "fa-tint",
      title: "Hidrasi Optimal",
      desc: "Tips minum air yang benar",
      meta: "2 min read",
      url: "../konten/konten.html",
    },
    {
      icon: "fa-brain",
      title: "Meditasi Singkat",
      desc: "Relaksasi 10 menit",
      meta: "10 min",
      url: "../konten/konten.html",
    },
  ];
  const idx = new Date().getDay();
  const shown = contents.slice(idx % 2, (idx % 2) + 2);
  container.innerHTML = shown
    .map(
      (c) => `
        <div class="content-card" onclick="window.location.href='${c.url}'" style="cursor:pointer">
            <div class="content-icon"><i class="fas ${c.icon}"></i></div>
            <div class="content-info">
                <div class="content-title">${c.title}</div>
                <div class="content-description">${c.desc}</div>
                <div class="content-meta"><i class="fas fa-clock"></i> ${c.meta}</div>
            </div>
        </div>`,
    )
    .join("");
}

function renderWeeklyStats() {
  const user = getCurrentUser();
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - 6);
  document.getElementById("week-range").textContent =
    `${weekStart.toLocaleDateString("id-ID", { day: "numeric", month: "short" })} - ${now.toLocaleDateString("id-ID", { day: "numeric", month: "short" })}`;
  let allStats = {};
  try {
    allStats =
      JSON.parse(localStorage.getItem(`dailyStats_${user?.email}`)) || {};
  } catch (e) {}
  let totalSteps = 0,
    totalCal = 0,
    totalWater = 0,
    totalSleep = 0,
    days = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = d.toDateString();
    if (allStats[key]) {
      totalSteps += allStats[key].steps || 0;
      totalCal += allStats[key].calories || 1850;
      totalWater += allStats[key].water || 0;
      totalSleep += allStats[key].sleep || 0;
      days++;
    }
  }
  document.getElementById("stats-steps").textContent =
    totalSteps > 0 ? totalSteps.toLocaleString() : "24,500";
  document.getElementById("stats-calories").textContent =
    totalCal > 0 ? totalCal.toLocaleString() : "12,950";
  document.getElementById("stats-water").textContent =
    totalWater > 0 ? totalWater : "38";
  document.getElementById("stats-sleep").textContent =
    totalSleep > 0 ? (totalSleep / Math.max(days, 1)).toFixed(1) : "7.2";
}

function renderRecommendations() {
  const container = document.getElementById("recommendationList");
  if (!container) return;
  const user = getCurrentUser();
  const age = parseInt(user?.age) || 25;
  const gender = user?.gender || "pria";
  document.getElementById("recommendation-age-text").textContent =
    `Berdasarkan usia ${age} tahun`;
  const recs = getRecommendations(age, gender);
  container.innerHTML = recs
    .map(
      (r) =>
        `<li class="recommendation-item"><i class="fas ${r.icon}"></i><div><strong>${r.title}</strong><p>${r.desc}</p></div></li>`,
    )
    .join("");
}

function getRecommendations(age, gender) {
  const base = [
    {
      icon: "fa-tint",
      title: "Minum 8 Gelas Air",
      desc: "Jaga hidrasi tubuh sepanjang hari untuk metabolisme optimal.",
    },
    {
      icon: "fa-walking",
      title: "10.000 Langkah/Hari",
      desc: "Target langkah harian untuk menjaga kesehatan jantung.",
    },
    {
      icon: "fa-moon",
      title: "Tidur 7-8 Jam",
      desc: "Kualitas tidur yang baik meningkatkan performa harian.",
    },
  ];
  if (age < 25)
    base.push({
      icon: "fa-dumbbell",
      title: "Latihan Kekuatan",
      desc: "Bangun massa otot di usia muda untuk metabolisme lebih baik.",
    });
  else if (age < 45)
    base.push({
      icon: "fa-heart",
      title: "Kardio 150 Menit/Minggu",
      desc: "Jaga kesehatan jantung dengan aktivitas aerobik rutin.",
    });
  else
    base.push({
      icon: "fa-spa",
      title: "Yoga & Meditasi",
      desc: "Jaga fleksibilitas tubuh dan kesehatan mental.",
    });
  if (gender === "wanita")
    base.push({
      icon: "fa-venus",
      title: "Pantau Siklus Menstruasi",
      desc: "Tracking siklus membantu perencanaan aktivitas dan kesehatan.",
    });
  return base;
}

function updateGreeting() {
  const user = getCurrentUser();
  const hour = new Date().getHours();
  let greet =
    hour < 11
      ? "Selamat Pagi,"
      : hour < 15
        ? "Selamat Siang,"
        : hour < 18
          ? "Selamat Sore,"
          : "Selamat Malam,";
  const quotes = [
    "Setiap langkah kecil membawa perubahan besar!",
    "Kesehatan adalah investasi terbaik dalam hidup.",
    "Tubuh sehat, pikiran jernih, hidup bahagia.",
    "Mulai hari ini dengan semangat yang baru!",
    "Konsisten adalah kunci keberhasilan.",
  ];
  document.getElementById("greeting-message").textContent = greet;
  document.getElementById("user-name").textContent = user?.name || "User";
  document.getElementById("motivation-quote").textContent =
    quotes[new Date().getDay() % quotes.length];
}

function updateStreakDisplay() {
  // streak dihitung dari key streak_<email>
  // dashboard sebelumnya bisa tidak terbaca jika fungsi getStreak tidak ada di window
  const user = getCurrentUser();
  let streak = 0;
  try {
    if (typeof getStreak === "function") {
      streak = getStreak() || 0;
    } else if (user?.email) {
      const raw = localStorage.getItem(`streak_${user.email}`);
      streak = raw ? JSON.parse(raw).count || 0 : 0;
    }
  } catch (e) {
    streak = 0;
  }

  document.getElementById("streak-value").textContent = streak;
  let points = 0;
  try {
    const challenges =
      JSON.parse(localStorage.getItem(`challenges_${user?.email}`)) || [];

    points = challenges.reduce((sum, c) => sum + (c.earnedPoints || 0), 0);
  } catch (e) {}
  document.getElementById("points-value").textContent = points;
  document.getElementById("achievement-count").textContent =
    Math.floor(streak / 7) + (points > 100 ? 1 : 0);
}

function showAddWeightModal() {
  const user = getCurrentUser();
  document.getElementById("new-weight-input").value = user?.weight || "";
  document.getElementById("addWeightModal").style.display = "flex";
}

function saveNewWeight() {
  const val = parseFloat(document.getElementById("new-weight-input").value);
  if (!val || val < 20 || val > 300) {
    showToast("Masukkan berat yang valid", "error");
    return;
  }
  const user = getCurrentUser();
  const history = getWeightHistory();
  history.push({ weight: val, date: "Hari ini", timestamp: Date.now() });
  if (history.length > 20) history.splice(0, history.length - 20);
  saveWeightHistory(history);
  user.weight = val;
  setCurrentUser(user);
  document.getElementById("addWeightModal").style.display = "none";
  displayWeightChart();
  showToast("Berat badan berhasil disimpan!", "success");
}

function editStat(type) {
  currentEditStat = type;
  const labels = {
    steps: "Langkah",
    water: "Gelas Air",
    sleep: "Jam Tidur",
    screentime: "Jam Layar",
  };
  const stats = getDailyStats();
  document.getElementById("editStatTitle").textContent = `Edit ${labels[type]}`;
  document.getElementById("editStatLabel").textContent = labels[type];
  document.getElementById("editStatInput").value = stats[type] || 0;
  document.getElementById("editStatModal").style.display = "flex";
}

function saveStatEdit() {
  const val = parseFloat(document.getElementById("editStatInput").value);
  if (isNaN(val) || val < 0) {
    showToast("Nilai tidak valid", "error");
    return;
  }
  const update = {};
  update[currentEditStat] = val;
  saveDailyStats(update);
  document.getElementById("editStatModal").style.display = "none";
  displayDailySummary();
  showToast("Data berhasil diperbarui!", "success");
}

function quickBMI() {
  const w = parseFloat(document.getElementById("dash-weight").value);
  const h = parseFloat(document.getElementById("dash-height").value);
  if (!w || !h) {
    showToast("Isi berat dan tinggi", "error");
    return;
  }
  const bmi = w / ((h / 100) * (h / 100));
  const b = bmi.toFixed(1);
  let cat =
    bmi < 18.5
      ? "Berat Kurang"
      : bmi < 25
        ? "Normal"
        : bmi < 30
          ? "Berat Lebih"
          : "Obesitas";
  let color =
    bmi < 18.5
      ? "#3b82f6"
      : bmi < 25
        ? "#22c55e"
        : bmi < 30
          ? "#f59e0b"
          : "#ef4444";
  document.getElementById("dashBmiResult").style.display = "flex";
  document.getElementById("dashBmiNum").textContent = b;
  document.getElementById("dashBmiCat").textContent = cat;
  document.getElementById("dashBmiCat").style.color = color;
}

function renderMenstrualDash() {
  const user = getCurrentUser();
  const container = document.getElementById("mensTrackDash");
  if (!container) return;
  const cycleData = localStorage.getItem(`menstrual_${user?.email}`);
  if (!cycleData) {
    container.innerHTML = `<div class="mens-empty"><i class="fas fa-venus"></i><p>Belum ada data siklus</p><a href="../profile/profile.html" class="empty-link">Atur Siklus</a></div>`;
    return;
  }
  try {
    const data = JSON.parse(cycleData);
    const lastDate = new Date(data.lastDate);
    const cycleLen = data.cycleLength || 28;
    const nextDate = new Date(lastDate);
    nextDate.setDate(nextDate.getDate() + cycleLen);
    const today = new Date();
    const daysLeft = Math.ceil((nextDate - today) / (1000 * 60 * 60 * 24));
    const fertileStart = new Date(nextDate);
    fertileStart.setDate(fertileStart.getDate() - 16);
    const fertileEnd = new Date(nextDate);
    fertileEnd.setDate(fertileEnd.getDate() - 10);
    const phase =
      daysLeft <= 0
        ? "Sedang haid"
        : daysLeft <= 5
          ? "Fase PMS"
          : today >= fertileStart && today <= fertileEnd
            ? "Masa subur"
            : "Fase folikel";
    const phaseColors = {
      "Sedang haid": "#ef4444",
      "Fase PMS": "#f59e0b",
      "Masa subur": "#22c55e",
      "Fase folikel": "#007260",
    };
    container.innerHTML = `
            <div class="mens-info-row"><span class="mens-phase" style="background:${phaseColors[phase]}20;color:${phaseColors[phase]}">${phase}</span></div>
            <div class="mens-detail"><i class="fas fa-calendar"></i> Haid berikutnya: <strong>${daysLeft > 0 ? daysLeft + " hari lagi" : "Sekarang"}</strong></div>
            <div class="mens-detail"><i class="fas fa-heart"></i> Masa subur: <strong>${fertileStart.toLocaleDateString("id-ID", { day: "numeric", month: "short" })} - ${fertileEnd.toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</strong></div>
        `;
  } catch (e) {
    container.innerHTML = `<div class="mens-empty"><p>Data tidak valid</p><a href="../profile/profile.html" class="empty-link">Perbarui</a></div>`;
  }
}

function updateDashboardTexts() {
  const lang = localStorage.getItem("language") || "id";
  const texts = {
    "lbl-streak": lang === "en" ? "STREAK" : "STREAK",
    "lbl-streak-unit": lang === "en" ? "active days" : "hari aktif",
    "lbl-achievement": lang === "en" ? "ACHIEVEMENT" : "PENCAPAIAN",
    "lbl-badges": lang === "en" ? "badges" : "lencana",
    "lbl-points": lang === "en" ? "POINTS" : "POIN",
    "lbl-points-unit": lang === "en" ? "pts" : "poin",
    "lbl-weight-chart": lang === "en" ? "Weight Chart" : "Grafik Berat Badan",
    "lbl-current-weight": lang === "en" ? "Current Weight" : "Berat Saat Ini",
    "lbl-today-summary":
      lang === "en" ? "Today's Summary" : "Ringkasan Hari Ini",
    "lbl-checklist": lang === "en" ? "Checklist" : "Checklist",
    "lbl-steps": lang === "en" ? "Steps" : "Langkah",
    "lbl-water": lang === "en" ? "Water" : "Air",
    "lbl-sleep": lang === "en" ? "Sleep" : "Tidur",
    "lbl-screentime": lang === "en" ? "Screen Time" : "Waktu Layar",
    "lbl-active-challenges":
      lang === "en" ? "Active Challenges" : "Tantangan Aktif",
    "lbl-today-content": lang === "en" ? "Today's Content" : "Konten Hari Ini",
    "lbl-weekly-stats":
      lang === "en" ? "Weekly Statistics" : "Statistik Mingguan",
    "lbl-recommendations":
      lang === "en" ? "Recommendations" : "Rekomendasi Untuk Anda",
    "lbl-stat-steps": lang === "en" ? "Steps" : "Langkah",
    "lbl-stat-calories": lang === "en" ? "Calories" : "Kalori",
    "lbl-stat-water": lang === "en" ? "Water" : "Air",
    "lbl-stat-sleep": lang === "en" ? "Sleep" : "Tidur",
  };
  Object.entries(texts).forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  });
}
window.updateDashboardTexts = updateDashboardTexts;

document.addEventListener("DOMContentLoaded", function () {
  updateGreeting();
  updateStreakDisplay();
  displayWeightChart();
  displayDailySummary();
  renderChallenges();
  renderDailyContent();
  renderWeeklyStats();
  renderRecommendations();
  renderMenstrualDash();
  updateNavbarAvatar && updateNavbarAvatar();
  document.getElementById("notifBtn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (typeof toggleNotifPanel === "function") toggleNotifPanel();
  });
  document.getElementById("addWeightModal").addEventListener("click", (e) => {
    if (e.target.id === "addWeightModal") e.target.style.display = "none";
  });
  document.getElementById("editStatModal").addEventListener("click", (e) => {
    if (e.target.id === "editStatModal") e.target.style.display = "none";
  });
});

window.showAddWeightModal = showAddWeightModal;
window.saveNewWeight = saveNewWeight;
window.editStat = editStat;
window.saveStatEdit = saveStatEdit;
window.quickBMI = quickBMI;
window.renderDailyContent = renderDailyContent;
window.renderRecommendations = renderRecommendations;
