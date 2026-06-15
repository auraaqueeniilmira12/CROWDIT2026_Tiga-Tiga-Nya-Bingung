const categoriesData = [
    { id: 1, icon: "fas fa-running", name: "Fitness", color: "#007260", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop" },
    { id: 2, icon: "fas fa-apple-alt", name: "Nutrition", color: "#007260", image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h=300&fit=crop" },
    { id: 3, icon: "fas fa-spa", name: "Healthy Living", color: "#007260", image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop" },
    { id: 4, icon: "fas fa-calendar-alt", name: "Plan", color: "#007260", image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=400&h=300&fit=crop" },
    { id: 5, icon: "fas fa-check-circle", name: "Checklist", color: "#007260", image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=300&fit=crop" },
    { id: 6, icon: "fas fa-book", name: "Journal", color: "#007260", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop" },
    { id: 7, icon: "fas fa-child", name: "Age Health", color: "#007260", image: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=400&h=300&fit=crop" },
    { id: 8, icon: "fas fa-utensils", name: "Recipes", color: "#007260", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop" },
    { id: 9, icon: "fas fa-flask", name: "Nutrition Info", color: "#007260", image: "https://images.unsplash.com/photo-1535572290543-960a8046f5af?w=400&h=300&fit=crop" },
    { id: 10, icon: "fas fa-mobile-alt", name: "Digital Health", color: "#007260", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop" }
];

const allContents = [
    { id: 1, title: "10 Minute Morning Workout", description: "Quick full body workout to start your day", duration: "10 min", level: "Beginner", categoryId: 1, categoryName: "Fitness", icon: "fas fa-running", views: 15230, date: "2026-06-10", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=200&fit=crop", contentDetail: "<h3>10 Menit Olahraga Pagi</h3><p>Mulai hari dengan energi positif! Latihan ini dirancang khusus untuk membangkitkan semangat dan mengaktifkan seluruh otot tubuh Anda dalam waktu singkat. Cocok untuk pemula hingga mahir.</p><h4>Manfaat:</h4><ul><li>Meningkatkan metabolisme</li><li>Membakar kalori hingga 150 kkal</li><li>Meningkatkan fleksibilitas</li></ul><h4>Gerakan:</h4><ol><li>Jumping Jacks - 30 detik</li><li>Squat - 30 detik</li><li>Push-up - 30 detik</li><li>Plank - 30 detik</li><li>High Knees - 30 detik</li><li>Rest - 10 detik (ulangi 2x)</li></ol><p>Lakukan setiap pagi untuk hasil maksimal. Jangan lupa pemanasan 2 menit sebelum memulai.</p>" },
    { id: 2, title: "Home Cardio Exercises", description: "No equipment cardio workout at home", duration: "20 min", level: "Intermediate", categoryId: 1, categoryName: "Fitness", icon: "fas fa-heartbeat", views: 12450, date: "2026-06-09", image: "https://images.unsplash.com/photo-1599058917765-a3b3a56aca2c?w=400&h=200&fit=crop", contentDetail: "<h3>Latihan Kardio di Rumah</h3><p>Tidak perlu peralatan mahal! Latihan kardio ini bisa dilakukan di ruang tamu Anda. Dengan durasi 20 menit, Anda bisa membakar hingga 250 kalori.</p><h4>Sirkuit Kardio:</h4><ul><li>Mountain Climbers - 40 detik</li><li>Burpees - 40 detik</li><li>Jump Squat - 40 detik</li><li>High Knees - 40 detik</li><li>Rest - 20 detik</li></ul><p>Ulangi sirkuit sebanyak 3 putaran. Tingkatkan intensitas secara bertahap.</p>" },
    { id: 3, title: "Yoga for Beginners", description: "Basic yoga poses for flexibility", duration: "15 min", level: "Beginner", categoryId: 1, categoryName: "Fitness", icon: "fas fa-spa", views: 18900, date: "2026-06-08", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop", contentDetail: "<h3>Yoga untuk Pemula</h3><p>Yoga membantu meningkatkan fleksibilitas, keseimbangan, dan ketenangan pikiran. Panduan ini cocok untuk Anda yang baru memulai.</p><h4>Pose yang Dipelajari:</h4><ol><li>Child's Pose (Balasana) - tahan 5 napas</li><li>Cat-Cow Stretch (Marjaryasana-Bitilasana) - 10x</li><li>Downward Dog (Adho Mukha Svanasana) - tahan 5 napas</li><li>Cobra Pose (Bhujangasana) - tahan 5 napas</li><li>Warrior I (Virabhadrasana I) - tahan 5 napas di setiap sisi</li></ol><p>Lakukan dengan perlahan dan fokus pada napas. Jangan memaksakan diri.</p>" },
    { id: 4, title: "Strength Training Basics", description: "Build muscle with proper techniques", duration: "30 min", level: "Advanced", categoryId: 1, categoryName: "Fitness", icon: "fas fa-dumbbell", views: 8760, date: "2026-06-07", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=200&fit=crop", contentDetail: "<h3>Latihan Kekuatan Dasar</h3><p>Membangun otot tidak hanya untuk penampilan, tetapi juga untuk kesehatan tulang dan metabolisme. Latihan ini menggunakan berat badan sendiri atau dumbbell ringan.</p><h4>Latihan:</h4><ul><li>Squat - 3x12 repetisi</li><li>Push-up - 3x10 repetisi</li><li>Lunge - 3x12 per kaki</li><li>Plank - 3x30 detik</li><li>Glute Bridge - 3x15 repetisi</li></ul><p>Istirahat 60 detik antar set. Tingkatkan beban secara bertahap.</p>" },
    { id: 5, title: "HIIT Workout", description: "High intensity interval training", duration: "15 min", level: "Advanced", categoryId: 1, categoryName: "Fitness", icon: "fas fa-bolt", views: 14320, date: "2026-06-06", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=200&fit=crop", contentDetail: "<h3>HIIT 15 Menit</h3><p>High-Intensity Interval Training adalah metode latihan yang terbukti efektif membakar lemak dalam waktu singkat. Prinsipnya: kerja keras diselingi istirahat pendek.</p><h4>Sirkuit HIIT (40 detik kerja, 20 detik istirahat):</h4><ol><li>Burpees</li><li>Jump Squat</li><li>Plank Jack</li><li>Mountain Climber</li><li>Rest 60 detik setelah 1 putaran</li></ol><p>Ulangi sirkuit 3-4 kali. Setelah selesai, lakukan pendinginan 3 menit.</p>" },
    { id: 6, title: "Pilates Core Workout", description: "Strengthen your core muscles", duration: "20 min", level: "Intermediate", categoryId: 1, categoryName: "Fitness", icon: "fas fa-user", views: 9870, date: "2026-06-05", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=200&fit=crop", contentDetail: "<h3>Pilates Core</h3><p>Pilates fokus pada kekuatan inti (core), postur, dan fleksibilitas. Latihan ini baik untuk memperkuat otot perut, punggung, dan panggul.</p><h4>Gerakan Pilates:</h4><ul><li>The Hundred - tahan 10 napas</li><li>Roll-Up - 10 repetisi perlahan</li><li>Leg Circles - 10 putaran per kaki</li><li>Plank - tahan 30 detik</li><li>Side Plank - tahan 20 detik per sisi</li></ul><p>Kontrol napas sangat penting. Lakukan dengan gerakan lambat dan terkontrol.</p>" },
    { id: 7, title: "Healthy Breakfast Ideas", description: "3 quick nutritious breakfast recipes", duration: "5 min read", level: "Beginner", categoryId: 2, categoryName: "Nutrition", icon: "fas fa-apple-alt", views: 11340, date: "2026-06-10", image: "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=200&fit=crop", contentDetail: "<h3>Ide Sarapan Sehat</h3><p>Sarapan adalah waktu makan terpenting. Berikut 3 resep cepat dan bergizi untuk memulai hari Anda.</p><h4>1. Overnight Oats</h4><p>Campurkan 50g oat, 150ml susu almond, 1 sdm chia seed, dan topping buah beri. Diamkan di kulkas semalaman.</p><h4>2. Smoothie Bowl</h4><p>Blender pisang beku, bayam, yogurt, dan sedikit madu. Tuang ke mangkuk, taburi granola dan potongan buah.</p><h4>3. Telur Rebus + Roti Gandum</h4><p>Rebus 2 telur selama 8 menit. Sajikan dengan 2 lembar roti gandum panggang dan alpukat.</p>" },
    { id: 8, title: "Meal Prep for Week", description: "Save time with weekly meal planning", duration: "8 min read", level: "Intermediate", categoryId: 2, categoryName: "Nutrition", icon: "fas fa-utensils", views: 8920, date: "2026-06-09", image: "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?w=400&h=200&fit=crop", contentDetail: "<h3>Persiapan Makanan Mingguan</h3><p>Meal prep menghemat waktu dan membantu Anda tetap pada jalur diet sehat. Panduan lengkap untuk pemula.</p><h4>Langkah-langkah:</h4><ol><li>Pilih 3-4 resep untuk seminggu</li><li>Buat daftar belanja</li><li>Belanja bahan di akhir pekan</li><li>Masak dalam jumlah besar (batch cooking)</li><li>Simpan dalam wadah kedap udara</li></ol><h4>Contoh Menu:</h4><ul><li>Senin: Nasi merah + ayam panggang + brokoli</li><li>Selasa: Quinoa + salmon + asparagus</li><li>Rabu: Ubi + tahu tumis + bayam</li><li>Kamis: Salad + telur rebus + alpukat</li><li>Jumat: Pasta gandum + saus tomat + daging sapi cincang</li></ul>" },
    { id: 9, title: "Understanding Macros", description: "Protein, carbs, and fats explained", duration: "10 min read", level: "Advanced", categoryId: 2, categoryName: "Nutrition", icon: "fas fa-chart-line", views: 7650, date: "2026-06-06", image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=400&h=200&fit=crop", contentDetail: "<h3>Memahami Makronutrien</h3><p>Makronutrien adalah nutrisi yang dibutuhkan tubuh dalam jumlah besar: protein, karbohidrat, dan lemak. Mengetahui keseimbangan yang tepat sangat penting untuk mencapai tujuan kebugaran.</p><h4>Protein:</h4><p>1.6-2.2 gram per kg berat badan. Sumber: daging, ikan, telur, tahu, tempe.</p><h4>Karbohidrat:</h4><p>3-5 gram per kg berat badan. Pilih karbohidrat kompleks: nasi merah, oat, ubi, quinoa.</p><h4>Lemak:</h4><p>0.8-1 gram per kg berat badan. Sumber: alpukat, kacang, minyak zaitun, ikan berlemak.</p><p>Contoh untuk berat 70kg: protein 126g, karbo 280g, lemak 63g.</p>" },
    { id: 10, title: "Healthy Snack Ideas", description: "Low calorie snacks that taste good", duration: "4 min read", level: "Beginner", categoryId: 2, categoryName: "Nutrition", icon: "fas fa-carrot", views: 10230, date: "2026-06-04", image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&h=200&fit=crop", contentDetail: "<h3>Camilan Sehat Rendah Kalori</h3><p>Lapar di antara waktu makan? Coba camilan sehat ini tanpa rasa bersalah.</p><ul><li>Yoghurt Yunani + madu + stroberi (150 kkal)</li><li>Apel + selai kacang (180 kkal)</li><li>Edamame kukus + garam laut (120 kkal)</li><li>Wortel baby + hummus (100 kkal)</li><li>Pisang beku + dark chocolate (200 kkal)</li></ul><p>Hindari camilan kemasan tinggi gula dan garam. Pilih yang alami.</p>" },
    { id: 11, title: "Hydration Guide", description: "How much water you really need", duration: "3 min read", level: "Beginner", categoryId: 2, categoryName: "Nutrition", icon: "fas fa-tint", views: 15420, date: "2026-06-03", image: "https://images.unsplash.com/photo-1543353071-10c8ba0a2669?w=400&h=200&fit=crop", contentDetail: "<h3>Panduan Hidrasi</h3><p>Air sangat penting untuk hampir setiap fungsi tubuh. Berapa banyak yang Anda butuhkan?</p><p>Rekomendasi umum: 2-3 liter per hari (8-12 gelas). Namun kebutuhan bisa lebih tinggi jika aktif berolahraga atau cuaca panas.</p><h4>Tanda Dehidrasi:</h4><ul><li>Urine berwarna kuning gelap</li><li>Mulut kering</li><li>Pusing atau lelah</li><li>Konsentrasi menurun</li></ul><p>Tips: Bawa botol minum ke mana-mana, tambahkan irisan lemon atau mentimun untuk rasa, dan minum segelas sebelum setiap makan.</p>" },
    { id: 12, title: "Stress Relief Meditation", description: "10 minute guided meditation", duration: "10 min", level: "Beginner", categoryId: 3, categoryName: "Healthy Living", icon: "fas fa-brain", views: 20450, date: "2026-06-10", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=200&fit=crop", contentDetail: "<h3>Meditasi untuk Mengurangi Stres</h3><p>Meditasi 10 menit setiap hari dapat menurunkan kortisol, meningkatkan fokus, dan membuat Anda lebih bahagia.</p><h4>Panduan:</h4><ol><li>Duduk nyaman dengan punggung tegak</li><li>Tutup mata</li><li>Fokus pada napas: tarik dalam, hembuskan perlahan</li><li>Jika pikiran mengembara, kembalikan fokus ke napas</li><li>Lakukan selama 10 menit</li></ol><p>Gunakan aplikasi seperti Headspace atau Calm untuk panduan audio.</p>" }
];

let currentFilter = "all";
let currentCat = null;
let searchQuery = "";
let bookmarks = [];
let readHistory = [];

function getCurrentUser() {
    const data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
}
function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'custom-toast';
    t.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
    t.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#007260;color:white;padding:12px 24px;border-radius:40px;z-index:10002;';
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2500);
}
function saveBookmarks() {
    const user = getCurrentUser();
    if (user) localStorage.setItem(`bm_${user.email}`, JSON.stringify(bookmarks));
}
function loadUserState() {
    const user = getCurrentUser();
    if (user) {
        bookmarks = JSON.parse(localStorage.getItem(`bm_${user.email}`) || "[]");
        readHistory = JSON.parse(localStorage.getItem(`rh_${user.email}`) || "[]");
    }
}
function renderCategories() {
    const grid = document.getElementById("categoriesGrid");
    if (!grid) return;
    grid.innerHTML = categoriesData.map(cat => `
        <div class="category-card-konten" onclick="selectCategory(${cat.id})" style="background-image: url('${cat.image}');">
            <div class="catk-icon"><i class="${cat.icon}"></i></div>
            <span class="catk-name">${cat.name}</span>
            <button class="catk-btn" onclick="event.stopPropagation();selectCategory(${cat.id})">Lihat Konten →</button>
        </div>
    `).join("");
}
function selectCategory(id) {
    currentCat = id;
    const cat = categoriesData.find(c => c.id === id);
    document.getElementById("contentListHeader").innerHTML = cat ? cat.name : "Semua Konten";
    renderContentList();
}
function renderContentList() {
    const container = document.getElementById("contentList");
    if (!container) return;
    let items = [...allContents];
    if (currentCat) items = items.filter(c => c.categoryId === currentCat);
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        items = items.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
    }
    document.getElementById("resultCount").innerText = `${items.length} konten`;
    if (items.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:40px">Konten tidak ditemukan</div>';
        return;
    }
    container.innerHTML = items.map(c => {
        const isBm = bookmarks.includes(c.id);
        const isRead = readHistory.includes(c.id);
        let levelClass = c.level === "Beginner" ? "pemula" : (c.level === "Intermediate" ? "menengah" : "lanjutan");
        return `
            <div class="content-card" onclick="openContentDetail(${c.id})">
                <div class="cc-image" style="background-image: url('${c.image}');"></div>
                <div class="cc-body">
                    <div class="cc-meta">
                        <span class="cc-level ${levelClass}">${c.level}</span>
                        ${isRead ? '<span class="cc-read">✓ Sudah dibaca</span>' : ''}
                    </div>
                    <h4 class="cc-title">${c.title}</h4>
                    <p class="cc-desc">${c.description.substring(0,100)}${c.description.length>100?'...':''}</p>
                    <div class="cc-footer">
                        <span><i class="fas fa-clock"></i> ${c.duration}</span>
                        <span><i class="fas fa-eye"></i> ${c.views.toLocaleString()}</span>
                        <div class="cc-actions">
                            <button onclick="event.stopPropagation();toggleBookmark(${c.id}, this)" class="cc-btn-bm ${isBm ? 'bm-active' : ''}"><i class="fas fa-bookmark"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}
function openContentDetail(id) {
    const content = allContents.find(c => c.id === id);
    if (!content) return;
    if (!readHistory.includes(id)) {
        readHistory.push(id);
        const user = getCurrentUser();
        if (user) localStorage.setItem(`rh_${user.email}`, JSON.stringify(readHistory));
        renderContentList();
    }
    const modal = document.getElementById("contentModal");
    const container = document.getElementById("modalContainer");
    const isBm = bookmarks.includes(id);
    container.innerHTML = `
        <div class="cm-box">
            <div class="cm-head" style="background: linear-gradient(135deg, #007260, #0d9488);">
                <div style="display:flex;align-items:center;gap:12px">
                    <div style="width:44px;height:44px;background:rgba(255,255,255,.2);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px"><i class="${content.icon}"></i></div>
                    <div><h3 style="color:white;font-size:16px;font-weight:700">${content.title}</h3><div style="color:rgba(255,255,255,.8);font-size:12px">${content.categoryName} · ${content.duration} · ${content.views.toLocaleString()} views</div></div>
                </div>
                <button onclick="closeContentModal()" style="background:rgba(255,255,255,.2);border:none;width:34px;height:34px;border-radius:50%;color:white;cursor:pointer"><i class="fas fa-times"></i></button>
            </div>
            <div class="cm-body">
                <img src="${content.image}" style="width:100%; border-radius:16px; margin-bottom:16px;">
                <div class="cm-content">${content.contentDetail}</div>
                <div class="cm-footer">
                    <button onclick="toggleBookmark(${content.id}, this)" class="cm-btn-bm ${isBm ? 'bm-active' : ''}"><i class="fas fa-bookmark"></i> ${isBm ? "Disimpan" : "Simpan"}</button>
                    <button onclick="shareContent('${content.title}')" class="cm-btn-share"><i class="fas fa-share-alt"></i> Bagikan</button>
                </div>
            </div>
        </div>
    `;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}
function closeContentModal() {
    document.getElementById("contentModal").style.display = "none";
    document.body.style.overflow = "";
}
function toggleBookmark(id, btn) {
    const idx = bookmarks.indexOf(id);
    if (idx === -1) {
        bookmarks.push(id);
        if (btn) btn.classList.add("bm-active");
        if (btn && btn.innerText) btn.innerHTML = '<i class="fas fa-bookmark"></i> Disimpan';
    } else {
        bookmarks.splice(idx, 1);
        if (btn) btn.classList.remove("bm-active");
        if (btn && btn.innerText) btn.innerHTML = '<i class="fas fa-bookmark"></i> Simpan';
    }
    saveBookmarks();
    updateBookmarksSection();
    showToast(idx === -1 ? "Konten disimpan!" : "Konten dihapus dari tersimpan");
}
function shareContent(title) {
    if (navigator.share) navigator.share({ title, url: window.location.href });
    else { navigator.clipboard?.writeText(`${title} — HealTech`); showToast("Link disalin!"); }
}
function renderTrending() {
    const container = document.getElementById("trendingList");
    if (!container) return;
    const trending = [...allContents].sort((a,b) => b.views - a.views).slice(0,5);
    container.innerHTML = trending.map((item,i) => `
        <div class="trending-item" onclick="openContentDetail(${item.id})">
            <div class="trending-rank">${i+1}</div>
            <div><div class="trending-title">${item.title}</div><div class="trending-meta">${item.views.toLocaleString()} dilihat</div></div>
        </div>
    `).join("");
}
function renderLatest() {
    const container = document.getElementById("latestList");
    if (!container) return;
    const latest = [...allContents].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0,4);
    container.innerHTML = latest.map(item => `
        <div class="latest-item" onclick="openContentDetail(${item.id})">
            <div class="latest-icon"><i class="${item.icon}"></i></div>
            <div><div class="latest-title">${item.title}</div><div class="latest-meta">${item.duration}</div></div>
        </div>
    `).join("");
}
function updateBookmarksSection() {
    const container = document.getElementById("bookmarkList");
    if (!container) return;
    const bmItems = allContents.filter(c => bookmarks.includes(c.id));
    if (bmItems.length === 0) {
        container.innerHTML = '<p style="color:#94a3b8;text-align:center;padding:16px">Belum ada konten tersimpan</p>';
        return;
    }
    container.innerHTML = bmItems.map(item => `
        <div class="bookmark-item" onclick="openContentDetail(${item.id})">
            <div class="bookmark-icon"><i class="${item.icon}"></i></div>
            <div><div class="bookmark-title">${item.title}</div><div class="bookmark-meta">${item.duration}</div></div>
            <button class="bookmark-remove" onclick="event.stopPropagation();toggleBookmark(${item.id}, this)"><i class="fas fa-trash-alt"></i></button>
        </div>
    `).join("");
}
function renderRecommendations() {
    const container = document.getElementById("recommendationListKonten");
    if (!container) return;
    const random = [...allContents].sort(() => 0.5 - Math.random()).slice(0,3);
    container.innerHTML = random.map(item => `
        <div class="recommendation-item" onclick="openContentDetail(${item.id})">
            <div class="rec-icon"><i class="${item.icon}"></i></div>
            <div><div class="rec-title">${item.title}</div><div class="rec-desc">${item.description.substring(0,60)}...</div></div>
        </div>
    `).join("");
}
function renderTags() {
    const container = document.getElementById("tagsContainer");
    if (!container) return;
    const tags = ["#pemula","#fitness","#nutrisi","#kebugaran","#resepsehat","#mentalhealth","#digitaldetox"];
    container.innerHTML = tags.map(tag => `<span class="tag-item" onclick="searchByTag('${tag}')">${tag}</span>`).join("");
}
function renderStats() {
    const container = document.getElementById("statsLearningContent");
    if (!container) return;
    container.innerHTML = `
        <div class="stats-row-konten"><span class="stats-label">Konten dibaca</span><span class="stats-value">${readHistory.length} konten</span></div>
        <div class="stats-row-konten"><span class="stats-label">Tersimpan</span><span class="stats-value">${bookmarks.length} konten</span></div>
    `;
}
function searchByTag(tag) {
    searchQuery = tag.replace("#","");
    document.getElementById("searchInput").value = tag;
    renderContentList();
    document.getElementById("contentList").scrollIntoView({ behavior: "smooth" });
}
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "../loginregister/login.html";
        return;
    }
    loadUserState();
    renderCategories();
    renderTrending();
    renderLatest();
    updateBookmarksSection();
    renderRecommendations();
    renderTags();
    renderStats();
    renderContentList();
    const searchInput = document.getElementById("searchInput");
    let timer;
    searchInput.addEventListener("input", function() {
        clearTimeout(timer);
        timer = setTimeout(() => { searchQuery = this.value; renderContentList(); }, 300);
    });
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            currentFilter = this.dataset.filter;
            renderContentList();
        });
    });
});