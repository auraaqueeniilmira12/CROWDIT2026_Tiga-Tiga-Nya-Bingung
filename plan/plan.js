function getCurrentUser() {
    try { return JSON.parse(localStorage.getItem('currentUser')); } catch(e) { return null; }
}

const defaultChallenges = [
    { id: 1, name: 'Minum 2L Air per Hari', icon: 'fas fa-tint', targetDays: 7, daysCompleted: 0, points: 50, status: 'available', color: '#3b82f6', desc: 'Menjaga hidrasi tubuh sepanjang hari' },
    { id: 2, name: '30 Day Squat Challenge', icon: 'fas fa-running', targetDays: 30, daysCompleted: 0, points: 200, status: 'available', color: '#007260', desc: 'Squat setiap hari selama 30 hari' },
    { id: 3, name: 'Tidur 7 Jam per Malam', icon: 'fas fa-bed', targetDays: 14, daysCompleted: 0, points: 100, status: 'available', color: '#8b5cf6', desc: 'Kualitas tidur yang konsisten' },
    { id: 4, name: 'Jalan 10.000 Langkah', icon: 'fas fa-shoe-prints', targetDays: 7, daysCompleted: 0, points: 75, status: 'available', color: '#f59e0b', desc: 'Target langkah harian untuk kesehatan jantung' },
    { id: 5, name: 'Meditasi 10 Menit', icon: 'fas fa-spa', targetDays: 21, daysCompleted: 0, points: 150, status: 'available', color: '#ec4899', desc: 'Latihan mindfulness harian' },
    { id: 6, name: 'Makan Sayur & Buah', icon: 'fas fa-apple-alt', targetDays: 14, daysCompleted: 0, points: 100, status: 'available', color: '#22c55e', desc: 'Konsumsi 5 porsi sayur dan buah sehari' },
    { id: 7, name: 'Olahraga 30 Menit', icon: 'fas fa-dumbbell', targetDays: 30, daysCompleted: 0, points: 200, status: 'available', color: '#f97316', desc: 'Aktivitas fisik rutin setiap hari' },
    { id: 8, name: 'Yoga Pagi Hari', icon: 'fas fa-child', targetDays: 21, daysCompleted: 0, points: 150, status: 'available', color: '#14b8a6', desc: 'Mulai pagi dengan yoga dan peregangan' },
];

function loadChallenges() {
    const user = getCurrentUser();
    const key = `challenges_${user?.email}`;
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultChallenges.map(c => ({...c}));
    } catch(e) { return defaultChallenges.map(c => ({...c})); }
}

function saveChallenges(challenges) {
    const user = getCurrentUser();
    localStorage.setItem(`challenges_${user?.email}`, JSON.stringify(challenges));
}

function renderSummaryCards(challenges) {
    const active = challenges.filter(c => c.status === 'active').length;
    const completed = challenges.filter(c => c.status === 'completed').length;
    const streak = getStreak ? getStreak() : 0;
    const points = challenges.reduce((s, c) => s + (c.earnedPoints || 0), 0);
    document.getElementById('total-active').textContent = active;
    document.getElementById('total-completed').textContent = completed;
    document.getElementById('streak-value').textContent = streak + ' hari';
    document.getElementById('total-points').textContent = points;
}

function renderActiveChallenges(challenges) {
    const container = document.getElementById('active-challenges-container');
    if (!container) return;
    const active = challenges.filter(c => c.status === 'active');
    if (active.length === 0) {
        container.innerHTML = `<div class="empty-challenges"><i class="fas fa-fire"></i><h3>Belum ada tantangan aktif</h3><p>Pilih tantangan dari daftar di bawah untuk memulai</p></div>`;
        return;
    }
    container.innerHTML = active.map(c => {
        const pct = c.targetDays > 0 ? Math.round((c.daysCompleted / c.targetDays) * 100) : 0;
        const today = new Date().toDateString();
        const isDoneToday = (c.lastChecked === today);
        return `<div class="challenge-card active-card">
            <div class="challenge-card-header">
                <div class="ch-icon" style="background:${c.color}20"><i class="${c.icon}" style="color:${c.color}"></i></div>
                <div class="ch-info">
                    <h4>${escapeHtml(c.name)}</h4>
                    <p>${escapeHtml(c.desc || '')}</p>
                </div>
                <div class="ch-points"><i class="fas fa-star"></i>${c.points}</div>
            </div>
            <div class="challenge-progress-section">
                <div class="challenge-progress-bar-big"><div class="challenge-progress-fill-big" style="width:${pct}%;background:${c.color}"></div></div>
                <div class="challenge-progress-info"><span>Hari ${c.daysCompleted}/${c.targetDays}</span><span>${pct}%</span></div>
            </div>
            <div class="challenge-actions">
                <button class="btn-check-day ${isDoneToday ? 'done-today' : ''}" onclick="checkDay(${c.id})" ${isDoneToday ? 'disabled' : ''}>
                    <i class="fas ${isDoneToday ? 'fa-check-circle' : 'fa-calendar-check'}"></i> ${isDoneToday ? 'Selesai Hari Ini' : 'Tandai Hari Ini'}
                </button>
                <button class="btn-abandon" onclick="abandonChallenge(${c.id})"><i class="fas fa-times"></i></button>
            </div>
        </div>`;
    }).join('');
}

function renderAllChallenges(challenges) {
    const container = document.getElementById('all-challenges-container');
    if (!container) return;
    const available = challenges.filter(c => c.status === 'available' || c.status === 'completed');
    container.innerHTML = available.map(c => {
        const isCompleted = c.status === 'completed';
        return `<div class="challenge-card ${isCompleted ? 'completed-card' : ''}">
            <div class="challenge-card-header">
                <div class="ch-icon" style="background:${c.color}20"><i class="${c.icon}" style="color:${isCompleted?'#22c55e':c.color}"></i></div>
                <div class="ch-info">
                    <h4>${escapeHtml(c.name)}</h4>
                    <p>${escapeHtml(c.desc || '')}</p>
                    <div class="ch-meta"><span><i class="fas fa-calendar"></i> ${c.targetDays} hari</span><span><i class="fas fa-star"></i> ${c.points} poin</span></div>
                </div>
            </div>
            ${isCompleted ? '<div class="completed-badge"><i class="fas fa-check-circle"></i> Selesai</div>' : `<button class="btn-join" onclick="joinChallenge(${c.id})"><i class="fas fa-play"></i> Mulai</button>`}
        </div>`;
    }).join('');
}

function joinChallenge(id) {
    const challenges = loadChallenges();
    const ch = challenges.find(c => c.id === id);
    if (!ch) return;
    if (challenges.filter(c => c.status === 'active').length >= 5) {
        showToast('Maksimal 5 tantangan aktif!', 'error'); return;
    }
    ch.status = 'active';
    ch.daysCompleted = 0;
    ch.startDate = Date.now();
    saveChallenges(challenges);
    renderPage();
    showToast(`Tantangan "${ch.name}" dimulai!`, 'success');
}

function checkDay(id) {
    const challenges = loadChallenges();
    const ch = challenges.find(c => c.id === id);
    if (!ch || ch.status !== 'active') return;
    const today = new Date().toDateString();
    if (ch.lastChecked === today) { showToast('Sudah dicatat hari ini!', 'info'); return; }
    ch.daysCompleted++;
    ch.lastChecked = today;
    if (ch.daysCompleted >= ch.targetDays) {
        ch.status = 'completed';
        ch.earnedPoints = ch.points;
        saveChallenges(challenges);
        renderPage();
        showToast(`Selamat! Tantangan "${ch.name}" selesai! +${ch.points} poin`, 'success');
        return;
    }
    saveChallenges(challenges);
    renderPage();
    showToast(`Hari ${ch.daysCompleted}/${ch.targetDays} selesai! Terus semangat!`, 'success');
}

function abandonChallenge(id) {
    if (!confirm('Yakin ingin meninggalkan tantangan ini?')) return;
    const challenges = loadChallenges();
    const ch = challenges.find(c => c.id === id);
    if (!ch) return;
    ch.status = 'available';
    ch.daysCompleted = 0;
    ch.lastChecked = null;
    saveChallenges(challenges);
    renderPage();
    showToast('Tantangan dihentikan', 'info');
}

function showAddChallengeModal() {
    document.getElementById('addChallengeModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('addChallengeModal').style.display = 'none';
}

function renderPage() {
    const challenges = loadChallenges();
    renderSummaryCards(challenges);
    renderActiveChallenges(challenges);
    renderAllChallenges(challenges);
}

function showToast(msg, type) {
    const el = document.createElement('div');
    const bg = type === 'error' ? '#ef4444' : type === 'info' ? '#3b82f6' : '#22c55e';
    el.style.cssText = `position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:${bg};color:white;padding:12px 24px;border-radius:30px;z-index:10002;font-size:13px;font-weight:600;white-space:nowrap;`;
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2500);
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);
}

function updatePlanTexts() {
    const lang = localStorage.getItem('language') || 'id';
    const el = id => document.getElementById(id);
    if (el('plan-title')) el('plan-title').textContent = lang === 'en' ? 'Plan & Challenges' : 'Rencana & Tantangan';
    if (el('plan-subtitle')) el('plan-subtitle').textContent = lang === 'en' ? 'Manage your fitness goals and track daily progress' : 'Kelola target kebugaran dan pantau progres harianmu';
    if (el('lbl-total-active')) el('lbl-total-active').textContent = lang === 'en' ? 'Total Active' : 'Total Aktif';
    if (el('lbl-completed')) el('lbl-completed').textContent = lang === 'en' ? 'Completed' : 'Selesai';
    if (el('lbl-streak')) el('lbl-streak').textContent = lang === 'en' ? 'Streak' : 'Streak';
    if (el('lbl-points')) el('lbl-points').textContent = lang === 'en' ? 'Points' : 'Poin';
    if (el('lbl-active-challenges')) el('lbl-active-challenges').textContent = lang === 'en' ? 'Active Challenges' : 'Tantangan Aktif';
    if (el('lbl-all-challenges')) el('lbl-all-challenges').textContent = lang === 'en' ? 'All Challenges' : 'Semua Tantangan';
}
window.updatePlanTexts = updatePlanTexts;

document.addEventListener('DOMContentLoaded', function() {
    renderPage();
    updateNavbarAvatar && updateNavbarAvatar();
    document.getElementById('btnAddChallenge')?.addEventListener('click', showAddChallengeModal);
    document.getElementById('notifBtn')?.addEventListener('click', e => { e.stopPropagation(); if (typeof toggleNotifPanel === 'function') toggleNotifPanel(); });
    document.getElementById('addChallengeModal')?.addEventListener('click', e => { if (e.target.id === 'addChallengeModal') closeModal(); });
    document.getElementById('addChallengeForm')?.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('challenge-name').value.trim();
        const target = parseInt(document.getElementById('challenge-target').value);
        const points = parseInt(document.getElementById('challenge-points').value);
        const icon = document.getElementById('challenge-icon').value;
        if (!name) { showToast('Nama tantangan wajib diisi', 'error'); return; }
        const challenges = loadChallenges();
        const newId = Math.max(...challenges.map(c => c.id), 0) + 1;
        challenges.push({ id: newId, name, icon, targetDays: target, daysCompleted: 0, points, status: 'available', color: '#007260', desc: 'Tantangan kustom Anda' });
        saveChallenges(challenges);
        closeModal();
        renderPage();
        showToast('Tantangan baru berhasil ditambahkan!', 'success');
        e.target.reset();
    });
});

window.joinChallenge = joinChallenge;
window.checkDay = checkDay;
window.abandonChallenge = abandonChallenge;
window.showAddChallengeModal = showAddChallengeModal;
window.closeModal = closeModal;
