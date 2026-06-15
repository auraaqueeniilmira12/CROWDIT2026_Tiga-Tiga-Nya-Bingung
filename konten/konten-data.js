// ============================================
// HEALTEACH - KONTEN DATA
// ============================================

// DATA KATEGORI (SEMUA WARNA HIJAU DENGAN GAMBAR)
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

// DATA SEMUA KONTEN DENGAN GAMBAR DARI URL
const allContents = [
    // Fitness (categoryId: 1)
    { id: 1, title: "10 Minute Morning Workout", description: "Quick full body workout to start your day", duration: "10 min", level: "Beginner", categoryId: 1, categoryName: "Fitness", icon: "fas fa-running", views: 15230, date: "2026-06-10", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=200&fit=crop" },
    { id: 2, title: "Home Cardio Exercises", description: "No equipment cardio workout at home", duration: "20 min", level: "Intermediate", categoryId: 1, categoryName: "Fitness", icon: "fas fa-heartbeat", views: 12450, date: "2026-06-09", image: "https://images.unsplash.com/photo-1599058917765-a3b3a56aca2c?w=400&h=200&fit=crop" },
    { id: 3, title: "Yoga for Beginners", description: "Basic yoga poses for flexibility", duration: "15 min", level: "Beginner", categoryId: 1, categoryName: "Fitness", icon: "fas fa-spa", views: 18900, date: "2026-06-08", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop" },
    { id: 4, title: "Strength Training Basics", description: "Build muscle with proper techniques", duration: "30 min", level: "Advanced", categoryId: 1, categoryName: "Fitness", icon: "fas fa-dumbbell", views: 8760, date: "2026-06-07", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=200&fit=crop" },
    { id: 5, title: "HIIT Workout", description: "High intensity interval training", duration: "15 min", level: "Advanced", categoryId: 1, categoryName: "Fitness", icon: "fas fa-bolt", views: 14320, date: "2026-06-06", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=200&fit=crop" },
    { id: 6, title: "Pilates Core Workout", description: "Strengthen your core muscles", duration: "20 min", level: "Intermediate", categoryId: 1, categoryName: "Fitness", icon: "fas fa-user", views: 9870, date: "2026-06-05", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=200&fit=crop" },
    
    // Nutrition (categoryId: 2)
    { id: 7, title: "Healthy Breakfast Ideas", description: "3 quick nutritious breakfast recipes", duration: "5 min read", level: "Beginner", categoryId: 2, categoryName: "Nutrition", icon: "fas fa-apple-alt", views: 11340, date: "2026-06-10", image: "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=200&fit=crop" },
    { id: 8, title: "Meal Prep for Week", description: "Save time with weekly meal planning", duration: "8 min read", level: "Intermediate", categoryId: 2, categoryName: "Nutrition", icon: "fas fa-utensils", views: 8920, date: "2026-06-09", image: "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?w=400&h=200&fit=crop" },
    { id: 9, title: "Understanding Macros", description: "Protein, carbs, and fats explained", duration: "10 min read", level: "Advanced", categoryId: 2, categoryName: "Nutrition", icon: "fas fa-chart-line", views: 7650, date: "2026-06-06", image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=400&h=200&fit=crop" },
    { id: 10, title: "Healthy Snack Ideas", description: "Low calorie snacks that taste good", duration: "4 min read", level: "Beginner", categoryId: 2, categoryName: "Nutrition", icon: "fas fa-carrot", views: 10230, date: "2026-06-04", image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&h=200&fit=crop" },
    { id: 11, title: "Hydration Guide", description: "How much water you really need", duration: "3 min read", level: "Beginner", categoryId: 2, categoryName: "Nutrition", icon: "fas fa-tint", views: 15420, date: "2026-06-03", image: "https://images.unsplash.com/photo-1543353071-10c8ba0a2669?w=400&h=200&fit=crop" },
    
    // Healthy Living (categoryId: 3)
    { id: 12, title: "Stress Relief Meditation", description: "10 minute guided meditation", duration: "10 min", level: "Beginner", categoryId: 3, categoryName: "Healthy Living", icon: "fas fa-brain", views: 20450, date: "2026-06-10", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=200&fit=crop" },
    { id: 13, title: "Better Sleep Habits", description: "Tips for quality sleep every night", duration: "6 min read", level: "Beginner", categoryId: 3, categoryName: "Healthy Living", icon: "fas fa-bed", views: 15670, date: "2026-06-08", image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=200&fit=crop" },
    { id: 14, title: "Morning Routine Guide", description: "Start your day productively", duration: "5 min read", level: "Beginner", categoryId: 3, categoryName: "Healthy Living", icon: "fas fa-sun", views: 12340, date: "2026-06-05", image: "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=400&h=200&fit=crop" },
    { id: 15, title: "Digital Detox Tips", description: "Reduce screen time effectively", duration: "7 min read", level: "Intermediate", categoryId: 3, categoryName: "Healthy Living", icon: "fas fa-mobile-alt", views: 9870, date: "2026-06-02", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop" },
    
    // Plan (categoryId: 4)
    { id: 16, title: "30 Day Fitness Plan", description: "Complete monthly workout schedule", duration: "30 days", level: "Intermediate", categoryId: 4, categoryName: "Plan", icon: "fas fa-calendar-alt", views: 5430, date: "2026-06-05", image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=400&h=200&fit=crop" },
    { id: 17, title: "Weekly Workout Plan", description: "Structured exercise plan for a week", duration: "7 days", level: "Beginner", categoryId: 4, categoryName: "Plan", icon: "fas fa-calendar-week", views: 4320, date: "2026-06-04", image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=400&h=200&fit=crop" },
    { id: 18, title: "Weight Loss Journey", description: "12 week transformation plan", duration: "12 weeks", level: "Intermediate", categoryId: 4, categoryName: "Plan", icon: "fas fa-weight-scale", views: 6780, date: "2026-06-01", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop" },
    
    // Checklist (categoryId: 5)
    { id: 19, title: "Daily Health Checklist", description: "Track your daily healthy habits", duration: "Daily", level: "Beginner", categoryId: 5, categoryName: "Checklist", icon: "fas fa-check-square", views: 9870, date: "2026-06-09", image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=200&fit=crop" },
    { id: 20, title: "Weekly Wellness Check", description: "Review your weekly progress", duration: "Weekly", level: "Beginner", categoryId: 5, categoryName: "Checklist", icon: "fas fa-clipboard-list", views: 5430, date: "2026-06-07", image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=200&fit=crop" },
    
    // Journal (categoryId: 6)
    { id: 21, title: "Gratitude Journal Guide", description: "Start your gratitude practice", duration: "5 min read", level: "Beginner", categoryId: 6, categoryName: "Journal", icon: "fas fa-book", views: 4320, date: "2026-06-06", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=200&fit=crop" },
    { id: 22, title: "Fitness Journal Template", description: "Track your workouts effectively", duration: "3 min read", level: "Beginner", categoryId: 6, categoryName: "Journal", icon: "fas fa-pen-alt", views: 3210, date: "2026-06-03", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=200&fit=crop" },
    
    // Age Health (categoryId: 7)
    { id: 23, title: "Teen Health Guide", description: "Health tips for teenagers", duration: "8 min read", level: "Beginner", categoryId: 7, categoryName: "Age Health", icon: "fas fa-child", views: 7650, date: "2026-06-08", image: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=400&h=200&fit=crop" },
    { id: 24, title: "Senior Wellness Tips", description: "Healthy aging strategies", duration: "10 min read", level: "Beginner", categoryId: 7, categoryName: "Age Health", icon: "fas fa-user-graduate", views: 6540, date: "2026-06-05", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=200&fit=crop" },
    
    // Recipes (categoryId: 8)
    { id: 25, title: "Healthy Smoothie Recipes", description: "Delicious nutritious smoothies", duration: "5 min read", level: "Beginner", categoryId: 8, categoryName: "Recipes", icon: "fas fa-blender", views: 11230, date: "2026-06-10", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=200&fit=crop" },
    { id: 26, title: "Low Calorie Dinner", description: "Healthy dinner under 500 calories", duration: "7 min read", level: "Intermediate", categoryId: 8, categoryName: "Recipes", icon: "fas fa-utensils", views: 8760, date: "2026-06-07", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=200&fit=crop" },
    
    // Nutrition Info (categoryId: 9)
    { id: 27, title: "Vitamins and Minerals", description: "Essential nutrients for body", duration: "10 min read", level: "Intermediate", categoryId: 9, categoryName: "Nutrition Info", icon: "fas fa-flask", views: 5430, date: "2026-06-09", image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=200&fit=crop" },
    { id: 28, title: "Superfoods Explained", description: "Benefits of superfoods", duration: "6 min read", level: "Beginner", categoryId: 9, categoryName: "Nutrition Info", icon: "fas fa-leaf", views: 6540, date: "2026-06-06", image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=200&fit=crop" },
    
    // Digital Health (categoryId: 10)
    { id: 29, title: "Health Apps Review", description: "Best apps for healthy lifestyle", duration: "8 min read", level: "Beginner", categoryId: 10, categoryName: "Digital Health", icon: "fas fa-mobile-alt", views: 4320, date: "2026-06-10", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=200&fit=crop" },
    { id: 30, title: "Wearable Tech Guide", description: "Smartwatches and fitness trackers", duration: "7 min read", level: "Beginner", categoryId: 10, categoryName: "Digital Health", icon: "fas fa-clock", views: 3870, date: "2026-06-08", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=200&fit=crop" }
];

// ========== FUNGSI GET KONTEN ==========
function getCategoryById(categoryId) {
    return categoriesData.find(cat => cat.id === categoryId);
}

function getContentsByCategory(categoryId) {
    return allContents.filter(content => content.categoryId === categoryId);
}

function getTrendingContents() {
    return [...allContents].sort((a, b) => b.views - a.views).slice(0, 6);
}

function getLatestContents() {
    return [...allContents].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);
}

function getContentById(contentId) {
    return allContents.find(content => content.id === contentId);
}

function getRelatedContents(categoryId, currentContentId) {
    return allContents.filter(content => content.categoryId === categoryId && content.id !== currentContentId).slice(0, 4);
}