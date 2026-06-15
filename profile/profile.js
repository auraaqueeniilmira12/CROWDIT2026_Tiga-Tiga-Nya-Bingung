function getCurrentUser() {
    try { return JSON.parse(localStorage.getItem('currentUser')); } catch(e) { return null; }
}
function setCurrentUser(user) {
    if (user) { localStorage.setItem('currentUser', JSON.stringify(user)); localStorage.setItem('isLoggedIn', 'true'); }
}
function getAllUsers() {
    try { return JSON.parse(localStorage.getItem('registeredUsers')) || []; } catch(e) { return []; }
}
function showToast(msg, type) {
    const el = document.createElement('div');
    const bg = type === 'error' ? '#ef4444' : '#22c55e';
    el.style.cssText = `position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:${bg};color:white;padding:12px 24px;border-radius:30px;z-index:10002;font-size:13px;font-weight:600;`;
    el.innerHTML = `<i class="fas fa-${type==='error'?'times':'check'}-circle"></i> ${msg}`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2500);
}

function loadProfile() {
    const user = getCurrentUser();
    if (!user) return;
    const el = id => document.getElementById(id);
    if (el('profile-name')) el('profile-name').textContent = user.name || 'User';
    if (el('profile-name-field')) el('profile-name-field').textContent = user.name || '-';
    if (el('profile-email')) el('profile-email').textContent = user.email || '-';
    if (el('profile-age')) el('profile-age').textContent = user.age ? user.age + ' tahun' : '-';
    if (el('profile-gender')) el('profile-gender').textContent = user.gender === 'pria' ? 'Pria' : user.gender === 'wanita' ? 'Wanita' : '-';
    if (el('profile-weight')) el('profile-weight').textContent = user.weight ? user.weight + ' kg' : '-';
    if (el('profile-height')) el('profile-height').textContent = user.height ? user.height + ' cm' : '-';
    if (el('profile-goal')) el('profile-goal').textContent = user.goal || '-';
    if (el('profile-joined')) el('profile-joined').textContent = user.joinedDate ? new Date(user.joinedDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '-';

    if (user.weight && user.height) {
        const bmi = (user.weight / ((user.height/100)**2)).toFixed(1);
        let cat = bmi < 18.5 ? 'Kurang' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Lebih' : 'Obesitas';
        if (el('profile-bmi')) el('profile-bmi').textContent = `${bmi} (${cat})`;
    }

    const streak = getStreakData();
    if (el('streak-value')) el('streak-value').textContent = streak.count;
    if (el('achievement-count')) el('achievement-count').textContent = Math.floor(streak.count / 7) + (streak.count >= 30 ? 2 : 0);

    let programCount = 0;
    try { programCount = (JSON.parse(localStorage.getItem(`challenges_${user.email}`)) || []).filter(c => c.status === 'active').length; } catch(e) {}
    if (el('program-count')) el('program-count').textContent = programCount;

    const levelEl = el('profile-level');
    if (levelEl) {
        const level = streak.count >= 30 ? 'Mahir' : streak.count >= 7 ? 'Menengah' : 'Pemula';
        levelEl.textContent = level;
        levelEl.className = `profile-level level-${streak.count >= 30 ? 'advanced' : streak.count >= 7 ? 'intermediate' : 'beginner'}`;
    }

    const photo = user.photo && user.photo.startsWith('data:') ? user.photo : null;
    const photoEl = el('profilePhoto');
    if (photoEl) {
        const img = photoEl.querySelector('img');
        if (img && photo) img.src = photo;
        else if (img && user.name) img.src = createInitialsAvatar(user.name);
    }
}

function createInitialsAvatar(name) {
    const canvas = document.createElement('canvas'); canvas.width = 80; canvas.height = 80;
    const ctx = canvas.getContext('2d');
    const g = ctx.createLinearGradient(0,0,80,80); g.addColorStop(0,'#007260'); g.addColorStop(1,'#4db6ac');
    ctx.fillStyle = g; ctx.fillRect(0,0,80,80);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 32px Poppins,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText((name||'U').charAt(0).toUpperCase(), 40, 40);
    return canvas.toDataURL();
}

function getStreakData() {
    const user = getCurrentUser();
    if (!user) return { count: 0 };
    try { return JSON.parse(localStorage.getItem(`streak_${user.email}`)) || { count: 0 }; } catch(e) { return { count: 0 }; }
}

function openEditProfile() {
    const user = getCurrentUser();
    const modal = document.getElementById('editProfileModal');
    if (!modal) return;
    document.getElementById('edit-name').value = user?.name || '';
    document.getElementById('edit-age').value = user?.age || '';
    document.getElementById('edit-gender').value = user?.gender || 'pria';
    document.getElementById('edit-weight').value = user?.weight || '';
    document.getElementById('edit-height').value = user?.height || '';
    document.getElementById('edit-target-weight').value = user?.targetWeight || '';
    document.getElementById('edit-goal').value = user?.goal || '';
    modal.style.display = 'flex';
}

function saveProfile() {
    const user = getCurrentUser();
    if (!user) return;
    const name = document.getElementById('edit-name').value.trim();
    if (!name) { showToast('Nama tidak boleh kosong', 'error'); return; }
    user.name = name;
    user.age = document.getElementById('edit-age').value;
    user.gender = document.getElementById('edit-gender').value;
    user.weight = parseFloat(document.getElementById('edit-weight').value) || user.weight;
    user.height = parseFloat(document.getElementById('edit-height').value) || user.height;
    user.targetWeight = parseFloat(document.getElementById('edit-target-weight').value) || user.targetWeight;
    user.goal = document.getElementById('edit-goal').value;
    setCurrentUser(user);
    const allUsers = getAllUsers();
    const idx = allUsers.findIndex(u => u.email === user.email);
    if (idx !== -1) { allUsers[idx] = user; localStorage.setItem('registeredUsers', JSON.stringify(allUsers)); }
    document.getElementById('editProfileModal').style.display = 'none';
    loadProfile();
    loadWeightHistory();
    showToast('Profil berhasil diperbarui!', 'success');
    updateNavbarAvatar && updateNavbarAvatar();
}

function loadWeightHistory() {
    const user = getCurrentUser();
    const container = document.getElementById('weightHistoryList');
    if (!container) return;
    let history = [];
    try { history = JSON.parse(localStorage.getItem(`weight_${user?.email}`)) || []; } catch(e) {}
    if (history.length === 0 && user?.weight) {
        history = [{ weight: user.weight, date: 'Hari ini', timestamp: Date.now() }];
    }
    if (history.length === 0) { container.innerHTML = '<div class="empty-weight">Belum ada riwayat berat badan</div>'; return; }
    const sorted = [...history].sort((a,b) => (b.timestamp||0)-(a.timestamp||0)).slice(0,5);
    container.innerHTML = sorted.map((h, i) => {
        const prev = sorted[i+1];
        const diff = prev ? (h.weight - prev.weight).toFixed(1) : null;
        const trend = diff ? (diff > 0 ? `<span style="color:#ef4444"><i class="fas fa-arrow-up"></i> +${diff}</span>` : `<span style="color:#22c55e"><i class="fas fa-arrow-down"></i> ${diff}</span>`) : '';
        return `<div class="weight-entry"><div class="weight-entry-date">${h.date || new Date(h.timestamp).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'})}</div><div class="weight-entry-value">${h.weight} kg ${trend}</div></div>`;
    }).join('');
}

function showAddWeightModal() {
    const user = getCurrentUser();
    const m = document.createElement('div');
    m.id = 'addWeightPop'; m.className = 'modal-overlay';
    m.innerHTML = `<div class="modal-container small">
        <div class="modal-header"><h3><i class="fas fa-weight-scale"></i> Tambah Berat</h3><button onclick="document.getElementById('addWeightPop').remove()" class="modal-close">&times;</button></div>
        <div class="modal-body">
            <div class="form-group"><label>Berat Badan (kg)</label><input type="number" id="new-prof-weight" placeholder="Contoh: 65" min="20" max="300" step="0.1" value="${user?.weight||''}"></div>
            <div class="modal-actions">
                <button onclick="document.getElementById('addWeightPop').remove()" class="btn-cancel-modal">Batal</button>
                <button onclick="saveAddWeight()" class="btn-save-modal"><i class="fas fa-save"></i> Simpan</button>
            </div>
        </div>
    </div>`;
    document.body.appendChild(m);
    m.addEventListener('click', e => { if (e.target === m) m.remove(); });
}

function saveAddWeight() {
    const val = parseFloat(document.getElementById('new-prof-weight').value);
    if (!val || val < 20 || val > 300) { showToast('Berat tidak valid', 'error'); return; }
    const user = getCurrentUser();
    let history = [];
    try { history = JSON.parse(localStorage.getItem(`weight_${user?.email}`)) || []; } catch(e) {}
    history.push({ weight: val, date: 'Hari ini', timestamp: Date.now() });
    if (history.length > 20) history.splice(0, history.length - 20);
    localStorage.setItem(`weight_${user?.email}`, JSON.stringify(history));
    user.weight = val; setCurrentUser(user);
    document.getElementById('addWeightPop')?.remove();
    loadWeightHistory();
    loadProfile();
    showToast('Berat berhasil ditambahkan!', 'success');
}

function loadAchievements() {
    const container = document.getElementById('achievementsGrid');
    if (!container) return;
    const streak = getStreakData().count;
    const badges = [
        { icon: 'fa-fire', label: 'Streak 3 Hari', earned: streak >= 3, color: '#f59e0b' },
        { icon: 'fa-star', label: 'Streak 7 Hari', earned: streak >= 7, color: '#8b5cf6' },
        { icon: 'fa-crown', label: 'Streak 30 Hari', earned: streak >= 30, color: '#f59e0b' },
        { icon: 'fa-dumbbell', label: 'Pertama Olahraga', earned: streak >= 1, color: '#007260' },
        { icon: 'fa-tint', label: '8 Gelas Air', earned: true, color: '#3b82f6' },
        { icon: 'fa-heart', label: 'Profil Lengkap', earned: !!(getCurrentUser()?.weight && getCurrentUser()?.height), color: '#ef4444' },
    ];
    container.innerHTML = badges.map(b => `
        <div class="achievement-badge ${b.earned ? 'earned' : 'locked'}">
            <div class="badge-icon" style="background:${b.earned ? b.color+'20' : '#f0f0f0'}"><i class="fas ${b.icon}" style="color:${b.earned ? b.color : '#ccc'}"></i></div>
            <span class="badge-label">${b.label}</span>
            ${!b.earned ? '<span class="badge-locked"><i class="fas fa-lock"></i></span>' : ''}
        </div>
    `).join('');
}

function loadWeeklyReport() {
    const container = document.getElementById('weeklyReportGrid');
    if (!container) return;
    const user = getCurrentUser();
    const days = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'];
    const today = new Date();
    const grid = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date(today); d.setDate(today.getDate() - i);
        const key = `checklist_${user?.email}_${d.toDateString()}`;
        let data = [];
        try { data = JSON.parse(localStorage.getItem(key)) || []; } catch(e) {}
        const done = data.filter(x => x.done).length;
        const total = data.length || 6;
        const pct = total > 0 ? Math.round((done/total)*100) : 0;
        grid.push({ day: days[d.getDay()], pct, done, total });
    }
    container.innerHTML = grid.map(g => `
        <div class="weekly-day-card">
            <div class="day-bar-wrap"><div class="day-bar-fill" style="height:${g.pct}%;background:${g.pct===100?'#22c55e':g.pct>50?'#007260':'#e8e8e8'}"></div></div>
            <div class="day-pct">${g.pct}%</div>
            <div class="day-label">${g.day}</div>
        </div>
    `).join('');
}

function loadMenstrualSection() {
    const user = getCurrentUser();
    if (user?.gender !== 'wanita') {
        const panel = document.getElementById('periodPanel');
        const card = panel?.closest('.profile-card');
        if (card) card.style.display = 'none';
        return;
    }
    const data = localStorage.getItem(`menstrual_${user?.email}`);
    if (!data) return;
    try {
        const d = JSON.parse(data);
        const lastDate = new Date(d.lastDate);
        const cycleLen = d.cycleLength || 28;
        const periodLen = d.periodLength || 5;
        const nextDate = new Date(lastDate); nextDate.setDate(nextDate.getDate() + cycleLen);
        const fertileStart = new Date(nextDate); fertileStart.setDate(nextDate.getDate() - 16);
        const fertileEnd = new Date(nextDate); fertileEnd.setDate(nextDate.getDate() - 10);
        const today = new Date();
        const daysLeft = Math.ceil((nextDate - today) / (1000*60*60*24));
        const el = id => document.getElementById(id);
        if (el('cycle-info')) el('cycle-info').textContent = `Siklus: ${cycleLen} hari, Haid: ${periodLen} hari`;
        if (el('period-prediction-text')) el('period-prediction-text').textContent = `Prediksi haid berikutnya: ${nextDate.toLocaleDateString('id-ID',{day:'numeric',month:'long'})} (${daysLeft > 0 ? daysLeft + ' hari lagi' : 'Sekarang'})`;
        if (el('fertility-text')) el('fertility-text').textContent = `Masa subur: ${fertileStart.toLocaleDateString('id-ID',{day:'numeric',month:'short'})} - ${fertileEnd.toLocaleDateString('id-ID',{day:'numeric',month:'short'})}`;
    } catch(e) {}
}

function openCycleModal() {
    const user = getCurrentUser();
    const data = localStorage.getItem(`menstrual_${user?.email}`);
    let d = {};
    try { d = JSON.parse(data) || {}; } catch(e) {}
    const m = document.createElement('div');
    m.id = 'cycleModal'; m.className = 'modal-overlay';
    const today = new Date().toISOString().slice(0,10);
    m.innerHTML = `<div class="modal-container" style="max-width:420px">
        <div class="modal-header"><h3><i class="fas fa-venus"></i> Atur Siklus Menstruasi</h3><button onclick="document.getElementById('cycleModal').remove()" class="modal-close">&times;</button></div>
        <div class="modal-body">
            <div class="form-group"><label>Tanggal Haid Terakhir</label><input type="date" id="cycle-last-date" value="${d.lastDate||today}" max="${today}"></div>
            <div class="form-group"><label>Panjang Siklus (hari)</label><input type="number" id="cycle-length" value="${d.cycleLength||28}" min="20" max="45"></div>
            <div class="form-group"><label>Durasi Haid (hari)</label><input type="number" id="cycle-period-len" value="${d.periodLength||5}" min="2" max="10"></div>
            <div class="symptom-section">
                <label style="font-size:13px;font-weight:600;color:#444;display:block;margin-bottom:10px;">Gejala yang Dirasakan</label>
                <div class="symptom-grid">
                    ${['Nyeri perut','Kembung','Mood swing','Lelah','Sakit kepala','Ngidam','Jerawat','Insomnia'].map(s => `<label class="symptom-check"><input type="checkbox" value="${s}" ${(d.symptoms||[]).includes(s)?'checked':''}> ${s}</label>`).join('')}
                </div>
            </div>
            <div class="solution-preview" id="cycleSolutions"></div>
            <div class="modal-actions">
                <button onclick="document.getElementById('cycleModal').remove()" class="btn-cancel-modal">Batal</button>
                <button onclick="saveCycleData()" class="btn-save-modal"><i class="fas fa-save"></i> Simpan</button>
            </div>
        </div>
    </div>`;
    document.body.appendChild(m);
    m.addEventListener('click', e => { if (e.target === m) m.remove(); });
    document.querySelectorAll('.symptom-check input').forEach(cb => cb.addEventListener('change', updateSolutions));
    if (d.symptoms?.length) updateSolutions();
}

function updateSolutions() {
    const checked = [...document.querySelectorAll('.symptom-check input:checked')].map(c => c.value);
    const solutions = {
        'Nyeri perut': 'Kompres hangat di perut, konsumsi ibuprofen jika perlu, yoga ringan.',
        'Kembung': 'Hindari makanan asin & berkarbonasi, minum teh jahe, olahraga ringan.',
        'Mood swing': 'Meditasi 10 menit, konsumsi cokelat hitam, berbicara dengan orang terpercaya.',
        'Lelah': 'Istirahat cukup, konsumsi makanan kaya zat besi (bayam, daging merah).',
        'Sakit kepala': 'Minum air putih banyak, istirahat di ruangan gelap, kompres dingin di dahi.',
        'Ngidam': 'Pilih camilan sehat (buah, kacang), hindari gula berlebihan.',
        'Jerawat': 'Jaga kebersihan wajah 2x/hari, hindari memencet jerawat, gunakan toner non-comedogenic.',
        'Insomnia': 'Hindari kafein setelah jam 2 siang, rutinitas tidur yang konsisten, teh chamomile.',
    };
    const el = document.getElementById('cycleSolutions');
    if (!el) return;
    if (checked.length === 0) { el.innerHTML = ''; return; }
    el.innerHTML = `<div class="solutions-box"><h4><i class="fas fa-lightbulb"></i> Solusi untuk Gejala Anda</h4>${checked.map(s => `<div class="solution-item"><strong>${s}:</strong> ${solutions[s]||'Konsultasikan dengan dokter.'}</div>`).join('')}</div>`;
}

function saveCycleData() {
    const lastDate = document.getElementById('cycle-last-date').value;
    const cycleLength = parseInt(document.getElementById('cycle-length').value) || 28;
    const periodLength = parseInt(document.getElementById('cycle-period-len').value) || 5;
    const symptoms = [...document.querySelectorAll('.symptom-check input:checked')].map(c => c.value);
    const user = getCurrentUser();
    const data = { lastDate, cycleLength, periodLength, symptoms, saved: Date.now() };
    localStorage.setItem(`menstrual_${user?.email}`, JSON.stringify(data));
    document.getElementById('cycleModal')?.remove();
    loadMenstrualSection();
    showToast('Data siklus berhasil disimpan!', 'success');
}

function editAlarm(type) {
    const current = localStorage.getItem(`alarm_${type}`) || (type==='water'?'08:00':type==='exercise'?'17:00':'20:00');
    const time = prompt(`Atur waktu pengingat ${type}:`, current);
    if (time) {
        localStorage.setItem(`alarm_${type}`, time);
        const el = document.getElementById(`${type}-reminder-time`);
        if (el) el.textContent = time;
        showToast('Pengingat diperbarui!', 'success');
    }
}

function addAlarm() {
    const types = ['Minum Air','Olahraga','Obat','Tidur','Sarapan'];
    const type = prompt('Nama pengingat:\n' + types.join(', '));
    if (type) { showToast(`Pengingat "${type}" ditambahkan!`, 'success'); }
}

function loadAlarms() {
    ['water','exercise','med'].forEach(type => {
        const el = document.getElementById(`${type}-reminder-time`);
        const stored = localStorage.getItem(`alarm_${type}`);
        if (el && stored) el.textContent = stored;
    });
}

function handleLogout() {
    if (confirm('Yakin ingin keluar dari akun ini?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userData');
        window.location.href = '../index.html';
    }
}

function changeProfilePhoto() {
    const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*';
    input.onchange = e => {
        const file = e.target.files[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
            const user = getCurrentUser();
            user.photo = ev.target.result; setCurrentUser(user);
            const allUsers = getAllUsers();
            const idx = allUsers.findIndex(u => u.email === user.email);
            if (idx !== -1) { allUsers[idx].photo = ev.target.result; localStorage.setItem('registeredUsers', JSON.stringify(allUsers)); }
            const img = document.querySelector('#profilePhoto img');
            if (img) img.src = ev.target.result;
            updateNavbarAvatar && updateNavbarAvatar();
            showToast('Foto diperbarui!', 'success');
        };
        reader.readAsDataURL(file);
    };
    input.click();
}

function updateProfileTexts() {
    const lang = localStorage.getItem('language') || 'id';
    const map = {
        'lbl-personal-data': lang==='en'?'Personal Data':'Data Diri',
        'lbl-women-health': lang==='en'?"Women's Health":'Kesehatan Wanita',
        'lbl-weight-history': lang==='en'?'Weight History':'Riwayat Berat Badan',
        'lbl-achievements': lang==='en'?'Achievements':'Pencapaian',
        'lbl-weekly-activity': lang==='en'?'Weekly Activity':'Aktivitas Mingguan',
        'lbl-reminders': lang==='en'?'Reminders':'Pengingat',
        'lbl-account': lang==='en'?'Account':'Akun',
    };
    Object.entries(map).forEach(([id,text]) => {
        const el = document.getElementById(id); if (el) el.textContent = text;
    });
}
window.updateProfileTexts = updateProfileTexts;

document.addEventListener('DOMContentLoaded', function() {
    loadProfile();
    loadWeightHistory();
    loadAchievements();
    loadWeeklyReport();
    loadMenstrualSection();
    loadAlarms();
    updateNavbarAvatar && updateNavbarAvatar();

    document.getElementById('editProfileBtn')?.addEventListener('click', openEditProfile);
    document.getElementById('editProfileBtn2')?.addEventListener('click', openEditProfile);
    document.getElementById('editCycleBtn')?.addEventListener('click', openCycleModal);
    document.getElementById('addWeightBtn')?.addEventListener('click', showAddWeightModal);
    document.getElementById('addAlarmBtn')?.addEventListener('click', addAlarm);
    document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);
    document.getElementById('editPhotoBtn')?.addEventListener('click', changeProfilePhoto);
    document.getElementById('notifBtn')?.addEventListener('click', e => { e.stopPropagation(); if (typeof toggleNotifPanel === 'function') toggleNotifPanel(); });

    document.querySelectorAll('.sym-btn').forEach(btn => {
        const saved = localStorage.getItem(`menstrual_${getCurrentUser()?.email}`);
        try { const d = JSON.parse(saved); if (d?.symptoms?.includes(btn.dataset.symptom)) btn.classList.add('active'); } catch(e) {}
        btn.addEventListener('click', () => btn.classList.toggle('active'));
    });

    document.getElementById('editProfileModal')?.addEventListener('click', e => {
        if (e.target.id === 'editProfileModal') e.target.style.display = 'none';
    });
});

window.saveProfile = saveProfile;
window.openCycleModal = openCycleModal;
window.saveCycleData = saveCycleData;
window.editAlarm = editAlarm;
window.handleLogout = handleLogout;
window.showAddWeightModal = showAddWeightModal;
window.saveAddWeight = saveAddWeight;
