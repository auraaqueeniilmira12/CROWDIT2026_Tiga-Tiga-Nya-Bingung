(function () {
  const style = document.createElement("style");
  style.textContent = `
    .navbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
      transition: background 400ms ease, backdrop-filter 400ms ease, box-shadow 400ms ease, padding 400ms ease;
    }
    .navbar.scrolled {
      background: rgba(255,255,255,0.75);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 4px 20px rgba(0,0,0,0.10);
    }
    @media (max-width: 768px) {
      .nav-links-top { display: none !important; }
      .hamburger-btn { display: none !important; }
      .nav-icons { gap: 6px; }
      .nav-icons button:first-child { font-size: 10px; padding: 5px 8px; width: auto; border-radius: 20px; }
      .nav-icons #notifBtn { width: 32px; height: 32px; border-radius: 50%; padding: 0; display: flex; align-items: center; justify-content: center; }
      .nav-icons img { width: 32px; height: 32px; }
    }
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

  function initNavbarScrollEffect() {
    const navbarEl = document.querySelector(".navbar");
    if (!navbarEl) return;
    const THRESHOLD = 15;
    let ticking = false;
    const apply = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      navbarEl.classList.toggle("scrolled", y > THRESHOLD);
      ticking = false;
    };
    apply();
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(apply);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNavbarScrollEffect();
    if (typeof updateNavbarAvatar === "function") updateNavbarAvatar();
  });

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
