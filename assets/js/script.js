(function() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    const publicPages = ['login.html', 'register.html', 'forgot-password.html', 'reset-password.html'];
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!publicPages.includes(currentPage) && !isLoggedIn && currentPage !== 'index.html') {
        window.location.href = '../loginregister/login.html';
        return;
    }
    if (publicPages.includes(currentPage) && isLoggedIn) {
        window.location.href = '../index.html';
        return;
    }
})();

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }
});

function getCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    if (userData) { try { return JSON.parse(userData); } catch(e) { return null; } }
    return null;
}

function getAllUsers() {
    const users = localStorage.getItem('registeredUsers');
    if (users) { try { return JSON.parse(users); } catch(e) { return []; } }
    return [];
}

function setCurrentUser(user) {
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
    }
}

function saveUserData(user) {
    if (!user) return;
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('userData', JSON.stringify(user));
}

let currentLang = localStorage.getItem('language') || 'id';

const translations = {
    en: {
        home: 'Home', dashboard: 'Dashboard', content: 'Content', plan: 'Plan', checklist: 'Checklist', profile: 'Profile',
        heroTagline: 'YOUR HEALTH, OUR PRIORITY',
        heroTitle1: 'Build Your', heroTitle2: 'Healthier Lifestyle with Healtech',
        heroDescription: 'All-in-one platform to help you achieve your ideal body with personalized exercise, nutrition, and tracking. Get maximum results with a guide tailored to your needs.',
        getStarted: 'Get Started',
        aboutBadge: 'ABOUT US', aboutTitle: 'Achieving a', aboutTitleHighlight: 'Healthier Lifestyle', aboutTitleEnd: 'Through Digital Innovation',
        aboutDescription: 'HealTech is a digital health platform that combines <span class="text-highlight">education, fitness, and nutrition</span> technology into one integrated ecosystem. We believe that health is everyone\'s right.',
        education: 'Education', articlesVideos: 'Articles & videos', nutrition: 'Nutrition', nutritionInfo: 'Nutrition info',
        fitness: 'Fitness', regularWorkout: 'Regular workout', planLabel: 'Plan', personalPlan: 'Personal plan',
        journal: 'Journal', dailyTracking: 'Daily tracking', byAge: 'By Age', ageBased: 'Age-based',
        teenager: 'Teenager', adult: 'Adult', elderly: 'Elderly', maleFemale: 'Male & Female',
        activeUsers: 'Active Users', programs: 'Programs', exploreFeatures: 'Explore Features',
        topFeatures: 'TOP FEATURES', everythingYouNeed: 'Everything you need to achieve your fitness goals',
        fitnessProgram: 'FITNESS PROGRAM', fitnessProgramDesc: 'Personalized exercise program tailored to your body goals and fitness level.',
        nutritionGuide: 'NUTRITION GUIDE', nutritionGuideDesc: 'Healthy meal plans and daily calorie calculation tailored to your body goals.',
        progressTracking: 'PROGRESS TRACKING', progressTrackingDesc: 'Monitor your weight progress, workout performance, and fitness achievements.',
        healthyHabits: 'HEALTHY HABITS', healthyHabitsDesc: 'Track your water intake, sleep quality, and daily activities to build healthier habits.',
        quickLinks: 'Quick Links', contactUs: 'Contact Us', allRightsReserved: 'All rights reserved.',
        homeBottom: 'Home', contentBottom: 'Content', planBottom: 'Plan', checklistBottom: 'Checklist', profileBottom: 'Profile',
        editProfile: 'Edit Profile', changePhoto: 'Change Photo', logout: 'Logout', verifiedUser: 'Verified User',
        logoutConfirm: 'Are you sure you want to logout?',
        bmiCalculator: 'BMI Calculator', weight: 'Weight (kg)', height: 'Height (cm)', calculate: 'Calculate', yourBMI: 'Your BMI',
        menstrualTracker: 'Menstrual Tracker', lastPeriod: 'Last Period Date', cycleLength: 'Cycle Length (days)', periodLength: 'Period Duration (days)',
        nextPeriod: 'Next Period', fertileWindow: 'Fertile Window', symptoms: 'Symptoms', solutions: 'Solutions',
        goodMorning: 'Good Morning', goodAfternoon: 'Good Afternoon', goodEvening: 'Good Evening', goodNight: 'Good Night',
        streak: 'Day Streak', achievements: 'Achievements', badges: 'badges', activeToday: 'active today',
        weightChart: 'Weight Chart', todaySummary: 'Today\'s Summary', steps: 'Steps', water: 'Water', sleep: 'Sleep', screenTime: 'Screen Time',
        activeChallenges: 'Active Challenges', todayContent: 'Today\'s Content', weeklyStats: 'Weekly Statistics', recommendations: 'Recommendations For You',
        dailyChecklist: 'Daily Checklist', journal: 'Journal', todayProgress: 'Today Progress', points: 'Points',
        mood: 'Mood', happyMood: 'Happy', okayMood: 'Okay', sadMood: 'Sad', angryMood: 'Angry', tiredMood: 'Tired',
        dailyNote: 'Daily Note', writtenHere: 'Write your daily notes here...', saveJournal: 'Save Journal',
        historyChecklist: 'Checklist History', archiveJournal: 'Journal Archive', exportData: 'Export Data',
        exportPDF: 'Export to PDF', exportCSV: 'Export to CSV',
        planChallenges: 'Plan & Challenges', totalActive: 'Total Active', completed: 'Completed', pointsLabel: 'Points',
        addChallenge: 'Add', challengeName: 'Challenge Name', targetDays: 'Target (days)', save: 'Save', cancel: 'Cancel',
        personalData: 'Personal Data', email: 'Email', fullName: 'Full Name', age: 'Age', gender: 'Gender',
        weightLabel: 'Weight', heightLabel: 'Height', bmiLabel: 'BMI', healthGoal: 'Health Goal', joinedSince: 'Member Since',
        womenHealth: 'Women\'s Health', setupCycle: 'Setup Cycle', weightHistory: 'Weight History', addWeight: 'Add',
        achievementsLabel: 'Achievements', weeklyActivity: 'Weekly Activity', reminders: 'Reminders', account: 'Account',
        logoutBtn: 'Logout', beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced',
        contentTitle: 'Health Content', searchContent: 'Search content...', allCategories: 'All', fitnessLabel: 'Fitness', nutritionLabel: 'Nutrition',
        trackingLabel: 'Tracking', habitsLabel: 'Habits',
        viewDetail: 'View Detail', readMore: 'Read More',
        calories: 'Calories'
    },
    id: {
        home: 'Beranda', dashboard: 'Dashboard', content: 'Konten', plan: 'Rencana', checklist: 'Checklist', profile: 'Profil',
        heroTagline: 'KESEHATAN ANDA, PRIORITAS KAMI',
        heroTitle1: 'Bangun Hidup', heroTitle2: 'Lebih Sehat dengan Healtech',
        heroDescription: 'Platform all-in-one untuk membantu Anda mencapai tubuh ideal dengan latihan, nutrisi, dan tracking yang personal. Dapatkan hasil maksimal dengan panduan yang disesuaikan dengan kebutuhan Anda.',
        getStarted: 'Mulai Sekarang',
        aboutBadge: 'TENTANG KAMI', aboutTitle: 'Mewujudkan', aboutTitleHighlight: 'Gaya Hidup Lebih Sehat', aboutTitleEnd: 'Melalui Inovasi Digital',
        aboutDescription: 'HealTech adalah platform kesehatan digital yang menggabungkan teknologi <span class="text-highlight">edukasi, kebugaran, dan nutrisi</span> menjadi satu ekosistem terintegrasi. Kami percaya kesehatan adalah hak setiap orang.',
        education: 'Edukasi', articlesVideos: 'Artikel & video', nutrition: 'Gizi', nutritionInfo: 'Info nutrisi',
        fitness: 'Kebugaran', regularWorkout: 'Latihan rutin', planLabel: 'Rencana', personalPlan: 'Rencana personal',
        journal: 'Jurnal', dailyTracking: 'Tracking harian', byAge: 'By Age', ageBased: 'Sesuai usia',
        teenager: 'Remaja', adult: 'Dewasa', elderly: 'Lansia', maleFemale: 'Pria & Wanita',
        activeUsers: 'Pengguna Aktif', programs: 'Program', exploreFeatures: 'Jelajahi Fitur',
        topFeatures: 'FITUR UNGGULAN', everythingYouNeed: 'Semua yang Anda butuhkan untuk mencapai tujuan kebugaran',
        fitnessProgram: 'PROGRAM LATIHAN', fitnessProgramDesc: 'Program latihan personal yang disesuaikan dengan target tubuh dan level kebugaran Anda.',
        nutritionGuide: 'PANDUAN GIZI', nutritionGuideDesc: 'Rencana makan sehat dan kalkulasi kalori harian yang disesuaikan dengan target tubuh Anda.',
        progressTracking: 'PELACAKAN PROGRES', progressTrackingDesc: 'Pantau progres berat badan, performa latihan, dan pencapaian kebugaran Anda.',
        healthyHabits: 'KEBIASAAN SEHAT', healthyHabitsDesc: 'Lacak asupan air, kualitas tidur, dan aktivitas harian untuk membangun kebiasaan lebih sehat.',
        quickLinks: 'Tautan Cepat', contactUs: 'Hubungi Kami', allRightsReserved: 'Hak cipta dilindungi.',
        homeBottom: 'Beranda', contentBottom: 'Konten', planBottom: 'Rencana', checklistBottom: 'Checklist', profileBottom: 'Profil',
        editProfile: 'Edit Profil', changePhoto: 'Ganti Foto', logout: 'Keluar', verifiedUser: 'Pengguna Terverifikasi',
        logoutConfirm: 'Yakin ingin keluar dari akun ini?',
        bmiCalculator: 'Kalkulator BMI', weight: 'Berat Badan (kg)', height: 'Tinggi Badan (cm)', calculate: 'Hitung', yourBMI: 'BMI Anda',
        menstrualTracker: 'Pelacak Menstruasi', lastPeriod: 'Tanggal Haid Terakhir', cycleLength: 'Panjang Siklus (hari)', periodLength: 'Durasi Haid (hari)',
        nextPeriod: 'Haid Berikutnya', fertileWindow: 'Masa Subur', symptoms: 'Gejala', solutions: 'Solusi',
        goodMorning: 'Selamat Pagi', goodAfternoon: 'Selamat Siang', goodEvening: 'Selamat Sore', goodNight: 'Selamat Malam',
        streak: 'Hari Aktif', achievements: 'Pencapaian', badges: 'lencana', activeToday: 'aktif hari ini',
        weightChart: 'Grafik Berat Badan', todaySummary: 'Ringkasan Hari Ini', steps: 'Langkah', water: 'Air', sleep: 'Tidur', screenTime: 'Waktu Layar',
        activeChallenges: 'Tantangan Aktif', todayContent: 'Konten Hari Ini', weeklyStats: 'Statistik Mingguan', recommendations: 'Rekomendasi Untuk Anda',
        dailyChecklist: 'Checklist Harian', journal: 'Jurnal', todayProgress: 'Progres Hari Ini', points: 'Poin',
        mood: 'Mood', happyMood: 'Senang', okayMood: 'Biasa', sadMood: 'Sedih', angryMood: 'Marah', tiredMood: 'Capek',
        dailyNote: 'Catatan Harian', writtenHere: 'Tulis catatan harianmu di sini...', saveJournal: 'Simpan Jurnal',
        historyChecklist: 'Riwayat Checklist', archiveJournal: 'Arsip Jurnal', exportData: 'Ekspor Data',
        exportPDF: 'Ekspor ke PDF', exportCSV: 'Ekspor ke CSV',
        planChallenges: 'Rencana & Tantangan', totalActive: 'Total Aktif', completed: 'Selesai', pointsLabel: 'Poin',
        addChallenge: 'Tambah', challengeName: 'Nama Tantangan', targetDays: 'Target (hari)', save: 'Simpan', cancel: 'Batal',
        personalData: 'Data Diri', email: 'Email', fullName: 'Nama Lengkap', age: 'Usia', gender: 'Jenis Kelamin',
        weightLabel: 'Berat Badan', heightLabel: 'Tinggi Badan', bmiLabel: 'BMI', healthGoal: 'Tujuan Kesehatan', joinedSince: 'Bergabung Sejak',
        womenHealth: 'Kesehatan Wanita', setupCycle: 'Atur Siklus', weightHistory: 'Riwayat Berat', addWeight: 'Tambah',
        achievementsLabel: 'Pencapaian', weeklyActivity: 'Aktivitas Mingguan', reminders: 'Pengingat', account: 'Akun',
        logoutBtn: 'Logout', beginner: 'Pemula', intermediate: 'Menengah', advanced: 'Mahir',
        contentTitle: 'Konten Kesehatan', searchContent: 'Cari konten...', allCategories: 'Semua', fitnessLabel: 'Kebugaran', nutritionLabel: 'Nutrisi',
        trackingLabel: 'Tracking', habitsLabel: 'Kebiasaan',
        viewDetail: 'Lihat Detail', readMore: 'Baca Selengkapnya',
        calories: 'Kalori'
    }
};

function t(key) {
    return translations[currentLang][key] || translations['id'][key] || key;
}

function setLanguage(lang) {
    if (lang !== 'en' && lang !== 'id') return;
    currentLang = lang;
    localStorage.setItem('language', lang);
    updatePageTexts();
    updateLanguageButton();
}

function toggleLanguage() {
    const newLang = currentLang === 'en' ? 'id' : 'en';
    setLanguage(newLang);
}

function updateLanguageButton() {
    const langBtns = document.querySelectorAll('.lang-btn, #langBtn, .nav-icons button:first-child');
    langBtns.forEach(btn => {
        if (btn) btn.innerHTML = `<i class="fas fa-globe"></i> ${currentLang.toUpperCase()}`;
    });
}

function updatePageTexts() {
    const navLinksTop = document.querySelectorAll('.nav-links-top a');
    const navLabels = [t('home'), t('dashboard'), t('content'), t('plan'), t('checklist'), t('profile')];
    navLinksTop.forEach((a, i) => { if (navLabels[i]) a.textContent = navLabels[i]; });

    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) heroTagline.textContent = t('heroTagline');
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.innerHTML = `${t('heroTitle1')} <br><span class="highlight">${t('heroTitle2')}</span>`;
    const heroDesc = document.querySelector('.hero-description');
    if (heroDesc) heroDesc.innerHTML = t('heroDescription');
    const getStartedBtn = document.querySelector('.hero-buttons .btn-primary');
    if (getStartedBtn) getStartedBtn.textContent = t('getStarted');

    const aboutBadge = document.querySelector('.about-badge');
    if (aboutBadge) aboutBadge.innerHTML = `<i class="fas fa-info-circle"></i> ${t('aboutBadge')}`;
    const aboutTitle = document.querySelector('.about-title');
    if (aboutTitle) aboutTitle.innerHTML = `${t('aboutTitle')} <span class="title-highlight">${t('aboutTitleHighlight')}</span> ${t('aboutTitleEnd')}`;
    const aboutDesc = document.querySelector('.about-description');
    if (aboutDesc) aboutDesc.innerHTML = t('aboutDescription');

    const categoryCards = document.querySelectorAll('.category-card');
    const catTitles = [t('education'), t('nutrition'), t('fitness'), t('planLabel'), t('journal'), t('byAge')];
    const catDescs = [t('articlesVideos'), t('nutritionInfo'), t('regularWorkout'), t('personalPlan'), t('dailyTracking'), t('ageBased')];
    categoryCards.forEach((card, i) => {
        const h = card.querySelector('h4'); const p = card.querySelector('p');
        if (h && catTitles[i]) h.textContent = catTitles[i];
        if (p && catDescs[i]) p.textContent = catDescs[i];
    });

    const chips = document.querySelectorAll('.audience-chip');
    if (chips.length >= 4) {
        chips[0].innerHTML = `<i class="fas fa-check-circle"></i> ${t('teenager')}`;
        chips[1].innerHTML = `<i class="fas fa-check-circle"></i> ${t('adult')}`;
        chips[2].innerHTML = `<i class="fas fa-check-circle"></i> ${t('elderly')}`;
        chips[3].innerHTML = `<i class="fas fa-venus-mars"></i> ${t('maleFemale')}`;
    }

    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels.length >= 2) { statLabels[0].textContent = t('activeUsers'); statLabels[1].textContent = t('programs'); }

    const exploreBtn = document.querySelector('.about-buttons .about-btn-primary');
    if (exploreBtn) exploreBtn.innerHTML = `${t('exploreFeatures')} <i class="fas fa-arrow-right"></i>`;

    const featuresTitle = document.querySelector('.features-title');
    if (featuresTitle) featuresTitle.textContent = t('topFeatures');
    const featuresSubtitle = document.querySelector('.features-subtitle');
    if (featuresSubtitle) featuresSubtitle.innerHTML = `<i class="fas fa-heartbeat"></i> ${t('everythingYouNeed').toUpperCase()} <i class="fas fa-heartbeat"></i>`;

    const featureCards = document.querySelectorAll('.feature-card');
    const fTitles = [t('fitnessProgram'), t('nutritionGuide'), t('progressTracking'), t('healthyHabits')];
    const fDescs = [t('fitnessProgramDesc'), t('nutritionGuideDesc'), t('progressTrackingDesc'), t('healthyHabitsDesc')];
    featureCards.forEach((card, i) => {
        const h = card.querySelector('h3'); const p = card.querySelector('p');
        if (h && fTitles[i]) h.textContent = fTitles[i];
        if (p && fDescs[i]) p.textContent = fDescs[i];
    });

    const footerTitles = document.querySelectorAll('.footer-title');
    if (footerTitles.length >= 2) { footerTitles[0].textContent = t('quickLinks'); footerTitles[1].textContent = t('contactUs'); }
    const footerLinks = document.querySelectorAll('.footer-links li a');
    const fLinks = [t('home'), t('dashboard'), t('content'), t('plan'), t('checklist'), t('profile')];
    footerLinks.forEach((a, i) => { if (fLinks[i]) a.textContent = fLinks[i]; });
    const copyright = document.querySelector('.footer-copyright p');
    if (copyright) copyright.innerHTML = `&copy; 2026 HEALTECH. ${t('allRightsReserved')}`;

    const bottomLinks = document.querySelectorAll('.nav-links-bottom a span');
    const bLabels = [t('homeBottom'), t('dashboard'), t('contentBottom'), t('planBottom'), t('checklistBottom'), t('profileBottom')];
    bottomLinks.forEach((s, i) => { if (bLabels[i]) s.textContent = bLabels[i]; });

    if (typeof updateDashboardTexts === 'function') updateDashboardTexts();
    if (typeof updateChecklistTexts === 'function') updateChecklistTexts();
    if (typeof updatePlanTexts === 'function') updatePlanTexts();
    if (typeof updateProfileTexts === 'function') updateProfileTexts();
    if (typeof updateKontenTexts === 'function') updateKontenTexts();
    if (typeof updateBMITexts === 'function') updateBMITexts();
}

function createInitialsAvatar(name) {
    if (!name) name = 'U';
    const canvas = document.createElement('canvas');
    canvas.width = 80; canvas.height = 80;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 80, 80);
    gradient.addColorStop(0, '#007260'); gradient.addColorStop(1, '#4db6ac');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, 80, 80);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 32px Poppins,sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(name.charAt(0).toUpperCase(), 40, 40);
    return canvas.toDataURL();
}

function updateNavbarAvatar() {
    const user = getCurrentUser();
    const navIcons = document.querySelector('.nav-icons');
    if (!navIcons) return;
    let avatarImg = navIcons.querySelector('img');
    if (!avatarImg) {
        avatarImg = document.createElement('img');
        avatarImg.style.cssText = 'width:36px;height:36px;border-radius:50%;object-fit:cover;cursor:pointer;border:2px solid #007260;';
        navIcons.appendChild(avatarImg);
    }
    if (user && user.photo && user.photo.startsWith('data:image')) avatarImg.src = user.photo;
    else if (user && user.name) avatarImg.src = createInitialsAvatar(user.name);
    else avatarImg.src = '../assets/image/avatar.jpg';
    avatarImg.onclick = (e) => { e.stopPropagation(); toggleUserMenu(); };
}

function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        container.style.cssText = 'position:fixed;bottom:90px;right:20px;z-index:10000;display:flex;flex-direction:column;gap:8px;';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    const bg = type === 'success' ? '#4caf50' : (type === 'error' ? '#f44336' : '#007260');
    toast.style.cssText = `background:${bg};color:white;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:500;box-shadow:0 4px 12px rgba(0,0,0,0.15);cursor:pointer;min-width:200px;max-width:300px;transition:all 0.3s;`;
    const icon = type === 'success' ? 'fa-check-circle' : (type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle');
    toast.innerHTML = `<i class="fas ${icon}" style="margin-right:8px;"></i>${message}`;
    toast.onclick = () => toast.remove();
    container.appendChild(toast);
    setTimeout(() => { if (toast.parentNode) toast.remove(); }, 3000);
}

function toggleUserMenu() {
    const existing = document.querySelector('.user-menu-dropdown');
    if (existing) { existing.remove(); return; }
    const user = getCurrentUser();
    const menu = document.createElement('div');
    menu.className = 'user-menu-dropdown';
    menu.style.cssText = 'position:fixed;top:65px;right:20px;background:white;border-radius:14px;box-shadow:0 8px 30px rgba(0,0,0,0.15);width:260px;z-index:10000;overflow:hidden;';
    const userPhoto = (user && user.photo && user.photo.startsWith('data:')) ? user.photo : (user ? createInitialsAvatar(user.name || 'U') : createInitialsAvatar('U'));
    const userName = (user && user.name) ? escapeHtml(user.name) : 'User';
    const userEmail = (user && user.email) ? escapeHtml(user.email) : '';
    menu.innerHTML = `
        <div style="padding:16px;border-bottom:1px solid #f0f0f0;background:linear-gradient(135deg,#f0faf8,#fff);">
            <div style="display:flex;align-items:center;gap:12px;">
                <img src="${userPhoto}" style="width:46px;height:46px;border-radius:50%;object-fit:cover;border:2px solid #007260;">
                <div><div style="font-weight:600;color:#1a1a1a;font-size:14px;">${userName}</div><div style="font-size:11px;color:#888;">${userEmail}</div></div>
            </div>
        </div>
        <div style="padding:6px 0;">
            <a href="${getBasePath()}profile/profile.html" style="display:flex;align-items:center;gap:12px;padding:10px 16px;color:#333;text-decoration:none;font-size:13px;transition:background 0.2s;" onmouseover="this.style.background='#f5f5f5'" onmouseout="this.style.background=''"><i class="fas fa-user" style="width:18px;color:#007260;"></i> ${t('editProfile')}</a>
            <a href="#" onclick="changeProfilePhoto();return false;" style="display:flex;align-items:center;gap:12px;padding:10px 16px;color:#333;text-decoration:none;font-size:13px;transition:background 0.2s;" onmouseover="this.style.background='#f5f5f5'" onmouseout="this.style.background=''"><i class="fas fa-camera" style="width:18px;color:#007260;"></i> ${t('changePhoto')}</a>
            <div style="height:1px;background:#f0f0f0;margin:4px 0;"></div>
            <a href="#" onclick="handleLogout();return false;" style="display:flex;align-items:center;gap:12px;padding:10px 16px;color:#ef4444;text-decoration:none;font-size:13px;transition:background 0.2s;" onmouseover="this.style.background='#fff5f5'" onmouseout="this.style.background=''"><i class="fas fa-sign-out-alt" style="width:18px;"></i> ${t('logout')}</a>
        </div>
    `;
    document.body.appendChild(menu);
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target) && !e.target.closest('[onclick*="toggleUserMenu"]') && !e.target.closest('.nav-icons img')) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 100);
}

function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/dashboard/') || path.includes('/konten/') || path.includes('/plan/') || path.includes('/checklist/') || path.includes('/profile/') || path.includes('/loginregister/')) return '../';
    return '';
}

function changeProfilePhoto() {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*'; input.style.display = 'none';
    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) { showToast('File terlalu besar. Max 5MB', 'error'); return; }
        const reader = new FileReader();
        reader.onload = function(ev) {
            const photoUrl = ev.target.result;
            const user = getCurrentUser();
            if (user) {
                user.photo = photoUrl;
                setCurrentUser(user);
                const allUsers = getAllUsers();
                const idx = allUsers.findIndex(u => u.email === user.email);
                if (idx !== -1) { allUsers[idx].photo = photoUrl; localStorage.setItem('registeredUsers', JSON.stringify(allUsers)); }
                updateNavbarAvatar();
                const menu = document.querySelector('.user-menu-dropdown');
                if (menu) menu.remove();
                showToast('Foto profil diperbarui!', 'success');
            }
        };
        reader.readAsDataURL(file);
    });
    document.body.appendChild(input); input.click(); document.body.removeChild(input);
}

function handleLogout() {
    if (confirm(t('logoutConfirm'))) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userData');
        window.location.href = getBasePath() + 'index.html';
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);
}

function getStreak() {
    const user = getCurrentUser();
    if (!user) return 0;
    const key = `streak_${user.email}`;
    const data = localStorage.getItem(key);
    if (!data) return 0;
    try { return JSON.parse(data).count || 0; } catch(e) { return 0; }
}

function updateStreak(completed) {
    const user = getCurrentUser();
    if (!user) return;
    const key = `streak_${user.email}`;
    const today = new Date().toDateString();
    let data = { count: 0, lastDate: '', lastCompleted: false };
    try { const stored = localStorage.getItem(key); if (stored) data = JSON.parse(stored); } catch(e) {}
    if (completed) {
        if (data.lastDate === today) {
            data.lastCompleted = true;
        } else {
            const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
            if (data.lastDate === yesterday.toDateString() && data.lastCompleted) data.count++;
            else if (data.lastDate !== today) data.count = 1;
            data.lastDate = today; data.lastCompleted = true;
        }
    }
    localStorage.setItem(key, JSON.stringify(data));
    return data.count;
}

document.addEventListener('DOMContentLoaded', function() {
    const langStyle = document.createElement('style');
    langStyle.textContent = `
        .nav-icons button { background:#007260;border:none;border-radius:20px;color:white;cursor:pointer;display:flex;align-items:center;gap:5px;padding:6px 10px;font-size:11px;font-weight:600;transition:all 0.2s; }
        .nav-icons button:hover { background:#005a4c;transform:scale(1.05); }
        .toast-container { position:fixed;bottom:90px;right:20px;z-index:10000;display:flex;flex-direction:column;gap:8px; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
    `;
    document.head.appendChild(langStyle);

    const langBtns = document.querySelectorAll('#langBtn, .lang-btn');
    langBtns.forEach(btn => btn.addEventListener('click', toggleLanguage));
    const firstNavBtn = document.querySelector('.nav-icons button:first-child');
    if (firstNavBtn && !firstNavBtn.id) firstNavBtn.addEventListener('click', toggleLanguage);

    currentLang = localStorage.getItem('language') || 'id';
    updatePageTexts();
    updateLanguageButton();
    if (localStorage.getItem('isLoggedIn') === 'true') updateNavbarAvatar();
});

window.getCurrentUser = getCurrentUser;
window.getAllUsers = getAllUsers;
window.setCurrentUser = setCurrentUser;
window.handleLogout = handleLogout;
window.updateNavbarAvatar = updateNavbarAvatar;
window.changeProfilePhoto = changeProfilePhoto;
window.toggleUserMenu = toggleUserMenu;
window.t = t;
window.setLanguage = setLanguage;
window.toggleLanguage = toggleLanguage;
window.showToast = showToast;
window.createInitialsAvatar = createInitialsAvatar;
window.escapeHtml = escapeHtml;
window.getStreak = getStreak;
window.updateStreak = updateStreak;
window.saveUserData = saveUserData;
window.getBasePath = getBasePath;
window.updatePageTexts = updatePageTexts;
