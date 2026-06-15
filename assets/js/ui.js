(function () {
  const style = document.createElement("style");
  style.textContent = `
    .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 999; background: rgba(255,255,255,0.98); box-shadow: 0 2px 12px rgba(0,0,0,0.08); transition: background 0.35s, backdrop-filter 0.35s, box-shadow 0.35s, padding 0.35s; }
    .navbar.scrolled { background: rgba(171, 167, 167, 0.7); backdrop-filter: blur(20px); box-shadow: 0 4px 20px rgba(0,0,0,0.12); }
    body { padding-top: 60px; }

    .hamburger-btn { display: none; background: none; border: none; font-size: 22px; cursor: pointer; color: #007260; padding: 4px 8px; border-radius: 8px; }
    @media (max-width: 768px) {
        .nav-links-top { display: none !important; }
        .hamburger-btn { display: flex !important; align-items: center; }
        .nav-icons { gap: 6px; }
        .nav-icons button:first-child { font-size: 10px; padding: 5px 8px; }
        .nav-icons #notifBtn { width: 32px; height: 32px; border-radius: 50%; padding: 0; display: flex; align-items: center; justify-content: center; }
        .nav-icons img { width: 32px; height: 32px; }
    }
    .mobile-menu { position: fixed; top: 0; left: 0; width: 80%; max-width: 300px; height: 100vh; background: white; z-index: 10001; transform: translateX(-100%); transition: transform 0.3s ease; box-shadow: 4px 0 20px rgba(0,0,0,0.15); overflow-y: auto; }
    .mobile-menu.open { transform: translateX(0); }
    .mobile-menu-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 10000; display: none; }
    .mobile-menu-backdrop.open { display: block; }
    .mobile-menu-header { padding: 20px; border-bottom: 1px solid #f0f0f0; background: linear-gradient(135deg, #007260, #4db6ac); }
    .mobile-menu-logo { display: flex; align-items: center; gap: 10px; }
    .mobile-menu-logo img { width: 32px; height: 32px; }
    .mobile-menu-logo h2 { font-size: 18px; font-weight: 800; color: white; }
    .mobile-menu-user { display: flex; align-items: center; gap: 10px; margin-top: 12px; }
    .mobile-menu-user img { width: 40px; height: 40px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.5); object-fit: cover; }
    .mobile-menu-user span { color: white; font-size: 13px; font-weight: 600; }
    .mobile-menu-links { padding: 12px 0; }
    .mobile-menu-link { display: flex; align-items: center; gap: 14px; padding: 14px 20px; color: #333; text-decoration: none; font-size: 14px; font-weight: 600; transition: all 0.2s; border-left: 3px solid transparent; }
    .mobile-menu-link:hover, .mobile-menu-link.active { background: #f0faf8; color: #007260; border-left-color: #007260; }
    .mobile-menu-link i { width: 20px; text-align: center; color: #007260; font-size: 16px; }
    .mobile-menu-logout { display: flex; align-items: center; gap: 14px; padding: 14px 20px; color: #ef4444; font-size: 14px; font-weight: 600; cursor: pointer; border-top: 1px solid #f0f0f0; }
    .mobile-menu-logout i { color: #ef4444; }
    .notif-panel { position: fixed; top: 64px; right: 16px; width: 300px; background: white; border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.15); z-index: 10000; overflow: hidden; max-height: 420px; overflow-y: auto; }
    .notif-header { padding: 14px 16px; font-size: 14px; font-weight: 700; color: #1a1a1a; border-bottom: 1px solid #f0f0f0; display: flex; justify-content: space-between; align-items: center; }
    .notif-item { padding: 12px 16px; border-bottom: 1px solid #f5f5f5; display: flex; gap: 10px; align-items: flex-start; }
    .notif-icon { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 15px; }
    .notif-text { font-size: 12px; color: #444; line-height: 1.5; }
    .notif-time { font-size: 10px; color: #aaa; display: block; margin-top: 4px; }
    .prof-btn-green { display: inline-flex; align-items: center; gap: 8px; background: #007260; color: white; border: none; padding: 10px 20px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; margin-top: 12px; transition: all 0.2s; }
    .prof-btn-green:hover { background: #005a4c; }
    .alarm-row { display: flex; flex-direction: column; gap: 10px; }
    .alarm-item { display: flex; align-items: center; gap: 10px; padding: 12px 14px; background: #f8f9fa; border-radius: 10px; font-size: 13px; font-weight: 600; color: #333; }
    .alarm-item i { color: #007260; width: 20px; }
    .alarm-item span { flex: 1; margin-left: 4px; }
    .alarm-item button { background: #f0faf8; border: none; width: 28px; height: 28px; border-radius: 50%; cursor: pointer; color: #007260; font-size: 11px; display: flex; align-items: center; justify-content: center; }
    `;
  document.head.appendChild(style);

  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    updateNavbarAvatar && updateNavbarAvatar();
  });

  function initMobileMenu() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
    const container = navbar.querySelector(".navbar-container");
    if (!container) return;

    const btn = document.createElement("button");
    btn.className = "hamburger-btn";
    btn.innerHTML = '<i class="fas fa-bars"></i>';
    container.insertBefore(btn, container.querySelector(".nav-icons"));

    const backdrop = document.createElement("div");
    backdrop.className = "mobile-menu-backdrop";
    document.body.appendChild(backdrop);

    const menu = document.createElement("div");
    menu.className = "mobile-menu";
    const currentPath = window.location.pathname;

    const navLinks = [
      {
        href: getBasePath ? getBasePath() + "index.html" : "index.html",
        icon: "fa-home",
        labelId: "home",
        label: "Beranda",
      },
      {
        href:
          (getBasePath ? getBasePath() : "../") + "dashboard/dashboard.html",
        icon: "fa-chalkboard-user",
        labelId: "dashboard",
        label: "Dashboard",
      },
      {
        href: (getBasePath ? getBasePath() : "../") + "konten/konten.html",
        icon: "fa-book",
        labelId: "content",
        label: "Konten",
      },
      {
        href: (getBasePath ? getBasePath() : "../") + "plan/plan.html",
        icon: "fa-calendar",
        labelId: "plan",
        label: "Rencana",
      },
      {
        href:
          (getBasePath ? getBasePath() : "../") + "checklist/checklist.html",
        icon: "fa-check-square",
        labelId: "checklist",
        label: "Checklist",
      },
      {
        href: (getBasePath ? getBasePath() : "../") + "profile/profile.html",
        icon: "fa-user",
        labelId: "profile",
        label: "Profil",
      },
    ];

    const user = (getCurrentUser && getCurrentUser()) || {};
    const userPhoto =
      user.photo && user.photo.startsWith("data:")
        ? user.photo
        : getCurrentUser
          ? createInitialsAvatar(user.name || "U")
          : "";

    menu.innerHTML = `
            <div class="mobile-menu-header">
                <div class="mobile-menu-logo">
                    <img src="${currentPath.includes("/dashboard/") || currentPath.includes("/konten/") || currentPath.includes("/plan/") || currentPath.includes("/checklist/") || currentPath.includes("/profile/") ? "../" : ""}assets/image/Logo.png" alt="Logo">
                    <h2>HEALTECH</h2>
                </div>
                <div class="mobile-menu-user">
                    ${userPhoto ? `<img src="${userPhoto}" alt="User">` : ""}
                    <span>${user.name || "User"}</span>
                </div>
            </div>
            <div class="mobile-menu-links">
                ${navLinks.map((l) => `<a href="${l.href}" class="mobile-menu-link ${currentPath.includes(l.href.split("/").pop()) || (l.href.includes("index") && currentPath.endsWith("/")) || currentPath.endsWith("index.html") ? "active" : ""}"><i class="fas ${l.icon}"></i> ${l.label}</a>`).join("")}
                <div class="mobile-menu-logout" onclick="handleLogout && handleLogout()"><i class="fas fa-sign-out-alt"></i> Logout</div>
            </div>
        `;
    document.body.appendChild(menu);

    btn.addEventListener("click", () => {
      menu.classList.toggle("open");
      backdrop.classList.toggle("open");
    });
    backdrop.addEventListener("click", () => {
      menu.classList.remove("open");
      backdrop.classList.remove("open");
    });
  }

  window.toggleNotifPanel = function () {
    const existing = document.getElementById("notifPanel");
    if (existing) {
      existing.remove();
      return;
    }
    const panel = document.createElement("div");
    panel.id = "notifPanel";
    panel.className = "notif-panel";
    const lang = localStorage.getItem("language") || "id";
    const notifs = [
      {
        icon: "fa-fire",
        color: "#ff6b35",
        bg: "#fff3ed",
        text:
          lang === "en"
            ? "Don't forget your daily checklist!"
            : "Jangan lupa checklist harianmu!",
        time: lang === "en" ? "5 min ago" : "5 menit lalu",
      },
      {
        icon: "fa-tint",
        color: "#3b82f6",
        bg: "#eff6ff",
        text:
          lang === "en"
            ? "Water reminder: have you had 8 glasses today?"
            : "Pengingat air: sudah minum 8 gelas hari ini?",
        time: lang === "en" ? "1 hour ago" : "1 jam lalu",
      },
      {
        icon: "fa-running",
        color: "#007260",
        bg: "#f0faf8",
        text:
          lang === "en"
            ? "Time to exercise! Keep your streak going."
            : "Waktunya olahraga! Jaga streakmu tetap nyala.",
        time: lang === "en" ? "2 hours ago" : "2 jam lalu",
      },
      {
        icon: "fa-star",
        color: "#f59e0b",
        bg: "#fffbeb",
        text:
          lang === "en"
            ? "New content available: HIIT Guide"
            : "Konten baru: Panduan HIIT Pemula",
        time: lang === "en" ? "Today" : "Hari ini",
      },
    ];
    panel.innerHTML = `
            <div class="notif-header"><span>${lang === "en" ? "Notifications" : "Notifikasi"}</span><span style="font-size:11px;color:#007260;cursor:pointer" onclick="document.getElementById('notifPanel').remove()">${lang === "en" ? "Close" : "Tutup"}</span></div>
            ${notifs.map((n) => `<div class="notif-item"><div class="notif-icon" style="background:${n.bg};color:${n.color}"><i class="fas ${n.icon}"></i></div><div class="notif-text">${n.text}<span class="notif-time">${n.time}</span></div></div>`).join("")}
        `;
    document.body.appendChild(panel);
    setTimeout(() => {
      document.addEventListener("click", function close(e) {
        if (!panel.contains(e.target) && !e.target.closest("#notifBtn")) {
          panel.remove();
          document.removeEventListener("click", close);
        }
      });
    }, 100);
  };
})();
