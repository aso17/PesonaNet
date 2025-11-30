document.addEventListener('DOMContentLoaded', () => {
  // 1. Ambil elemen-elemen penting
  const navLinks = document.getElementById('nav-links');
  const menuToggle = document.getElementById('menu-toggle');
  const links = navLinks.querySelectorAll('a');

  // 2. Tentukan lebar layar untuk mode mobile (Sesuai dengan Media Query CSS Anda)
  const mobileBreakpoint = 768;

  // 3. Tambahkan event listener untuk setiap tautan
  links.forEach(link => {
    link.addEventListener('click', () => {
      // Cek apakah mode saat ini adalah mode mobile
      if (window.innerWidth <= mobileBreakpoint) {
        // HANYA tutup menu jika kita di mode mobile
        if (menuToggle.checked) {
          menuToggle.checked = false;
        }
      }
      // Jika di mode desktop (window.innerWidth > 768px),
      // script tidak melakukan apa-apa pada menuToggle,
      // sehingga menu tetap terlihat.
    });
  });

  // 4. (Opsional) Tambahkan penanganan saat ukuran layar berubah
  // Hal ini memastikan menu mobile tertutup jika pengguna mengubah ukuran dari kecil ke besar
  window.addEventListener('resize', () => {
    if (window.innerWidth > mobileBreakpoint && menuToggle.checked) {
      menuToggle.checked = false;
      // Di desktop, meskipun menuToggle=false, CSS Anda sudah memastikan menu terlihat (transform:none)
    }
  });

  // 5. Tambahkan class 'active' ke tautan saat di-klik
  links.forEach(link => {
    link.addEventListener('click', function () {
      // Hapus class 'active' dari semua tautan
      links.forEach(l => l.classList.remove('active'));
      // Tambahkan class 'active' hanya pada tautan yang baru saja diklik
      this.classList.add('active');
    });
  });

});



