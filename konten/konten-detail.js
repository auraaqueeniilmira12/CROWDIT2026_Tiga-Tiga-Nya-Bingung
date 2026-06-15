// Konten detail modal sederhana (untuk semua kategori)
// Gunakan alert untuk fallback. Jika mau modal full, tinggal diubah.

function openKontenDetailById(contentId) {
  // Dipanggil dari konten.js via openContentDetail
  if (!contentId) {
<<<<<<< HEAD
    if(typeof showToast==="function") showToast("Konten tidak ditemukan", "error"); else console.error("Konten tidak ditemukan");
=======
    alert("Konten tidak ditemukan");
>>>>>>> 47a08fa1a0f98c9477b0465f894f03a7dfc48757
    return;
  }

  if (typeof openContentDetail === "function") {
    openContentDetail(contentId);
    return;
  }

<<<<<<< HEAD
  if(typeof showToast==="function") showToast(`Konten ${contentId} akan segera hadir!`, "info");
=======
  alert(`Konten ${contentId} akan segera hadir!`);
>>>>>>> 47a08fa1a0f98c9477b0465f894f03a7dfc48757
}
