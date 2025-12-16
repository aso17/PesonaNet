document.addEventListener('DOMContentLoaded', () => {

  // ====================================================
  // 1. FUNGSI UTILITAS (Untuk Counter dan Staggered List)
  // ====================================================

  function animateCounter(elementId, finalValue, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let startTime = null;
    element.textContent = '0'; // Reset ke 0

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentValue = Math.floor(progress * finalValue);
      element.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  function animateStaggeredList(selector, delay = 1000) {
    const items = document.querySelectorAll(selector);

    // Hapus kelas 'show' dari SEMUA elemen list saat ini (untuk reset visual instan)
    items.forEach(item => {
      item.classList.remove('show');
    });

    // Animasikan
    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('show');
      }, index * delay);
    });
  }


  // ====================================================
  // 2. KODE SLIDER UTAMA (Autoplay & Navigasi)
  // ====================================================

  const slidesWrapper = document.querySelector('.slides-wrapper');
  const slides = document.querySelectorAll('.slider-item.slider-slide');
  const dots = document.querySelectorAll('.dots-container .dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const totalSlides = slides.length;

  let currentSlide = 0;
  let autoPlayInterval;
  const AUTO_PLAY_DELAY = 5000; // 5 detik
  const USER_INTERACTION_TIMEOUT = 10000; // 10 detik jeda setelah klik


  function updateSlider() {
    if (!slidesWrapper || totalSlides === 0) return;

    // 1. Geser Wrapper
    const offset = -currentSlide * 100;
    slidesWrapper.style.transform = `translateX(${offset}%)`;

    // 2. Update Dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });

    // 3. Panggil Animasi untuk Slide Aktif
    // A. Reset dan panggil Staggered List untuk slide aktif
    const activeStaggerSelector = '.slider-item.slider-slide:nth-child(' + (currentSlide + 1) + ') .stagger-item';
    animateStaggeredList(activeStaggerSelector, 200);

    // B. Reset dan panggil Counter (Logika Counter per Slide)
    if (currentSlide === 0) {
      animateCounter('counter-download', 100, 2000);
    } else if (currentSlide === 1) {
      animateCounter('counter-uptime', 99, 2500); // Contoh nilai dan durasi berbeda
    }
    // Tambahkan logika lain jika Anda punya slide 3, 4, dst.
  }

  function stopAutoplay() {
    clearInterval(autoPlayInterval);
  }

  function startAutoplay() {
    stopAutoplay();
    autoPlayInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    }, AUTO_PLAY_DELAY);
  }

  function handleUserInteraction() {
    stopAutoplay();
    setTimeout(startAutoplay, USER_INTERACTION_TIMEOUT);
  }

  // ====================================================
  // 3. INICIALISASI SLIDER
  // ====================================================
  if (totalSlides > 0 && prevBtn && nextBtn) {
    // A. Navigasi Tombol
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
      handleUserInteraction();
    });

    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
      handleUserInteraction();
    });

    // B. Navigasi Dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
        handleUserInteraction();
      });
    });

    // C. Panggilan Inisialisasi: Tampilkan slide pertama dan mulai autoplay
    updateSlider();
    startAutoplay();
  }


  // ====================================================
  // 4. ANIMASI SCROLL (Intersection Observer)
  // ====================================================

  const elementsToAnimate = document.querySelectorAll('.fade-in-up-hidden');

  if (elementsToAnimate.length > 0) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;

          // Ambil nilai delay (dalam milidetik) dari atribut data-delay
          const delay = element.getAttribute('data-delay') || 0; // Default 0 jika tidak ada data-delay

          // Tambahkan transition-delay secara inline
          element.style.transitionDelay = `${delay}ms`;

          // Tambahkan kelas pemicu animasi
          element.classList.add('is-animated');

          // Hentikan pengamatan (kita tidak perlu memantau lagi)
          observer.unobserve(element);
        }
      });
    }, options);

    // Mulai mengamati SEMUA elemen
    elementsToAnimate.forEach(element => {
      observer.observe(element);
    });
  }

  // ====================================================
  // 5. NAVIGASI MOBILE & ACTIVE LINK
  // ====================================================

  const navLinks = document.getElementById('nav-links');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileBreakpoint = 768;

  if (navLinks && menuToggle) {
    const links = navLinks.querySelectorAll('a');

    links.forEach(link => {
      link.addEventListener('click', function () {
        // 1. Tentukan Active Link
        // Hapus class 'active' dari semua tautan
        links.forEach(l => l.classList.remove('active'));
        // Tambahkan class 'active' hanya pada tautan yang baru saja diklik
        this.classList.add('active');

        // 2. Tutup Menu Mobile (Jika di mode mobile)
        if (window.innerWidth <= mobileBreakpoint) {
          if (menuToggle.checked) {
            menuToggle.checked = false;
          }
        }
      });
    });

    // 3. Penanganan Resize Window
    // Memastikan menu mobile tertutup jika pengguna mengubah ukuran dari kecil ke besar
    window.addEventListener('resize', () => {
      if (window.innerWidth > mobileBreakpoint && menuToggle.checked) {
        menuToggle.checked = false;
      }
    });
  }

});


document.getElementById('waForm').addEventListener('submit', function (e) {
  e.preventDefault(); // cegah form submit biasa/reload

  const alamat = document.getElementById('alamatInput').value.trim();
  if (!alamat) {
    alert('Mohon masukkan alamat terlebih dahulu!');
    return;
  }

  const nomorWA = '6287825122645'; // nomor WA tujuan tanpa tanda + atau 0 depan
  const pesan = `Halo Admin, saya ingin cek ketersediaan layanan di alamat: ${alamat}`;
  const urlWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

  // redirect ke WA
  window.open(urlWA, '_blank');
});