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

function animateStaggeredList(selector, delay = 200) {
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
    // 1. Geser Wrapper
    const offset = -currentSlide * 100;
    slidesWrapper.style.transform = `translateX(${offset}%)`;

    // 2. Update Dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });

    // 3. Panggil Animasi untuk Slide Aktif
    const activeSlide = slides[currentSlide];

    // A. Reset dan panggil Staggered List untuk slide aktif
    // Kita panggil animateStaggeredList dengan selector yang hanya menargetkan item di slide AKTIF
    const activeStaggerSelector = '.slider-item.slider-slide:nth-child(' + (currentSlide + 1) + ') .stagger-item';
    animateStaggeredList(activeStaggerSelector, 200);

    // B. Reset dan panggil Counter (Gunakan ID yang berbeda untuk setiap slide jika perlu)
    // Contoh: #counter-download untuk slide 1, #counter-uptime untuk slide 2
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
// 3. EVENT LISTENER UTAMA (Hanya ada SATU)
// ====================================================

document.addEventListener('DOMContentLoaded', () => {
    // Pastikan ada slide sebelum menginisialisasi
    if (totalSlides > 0) {
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

    // D. Panggilan Animasi Statis (Jika ada kotak promo di luar slider)
    // Contoh: animateCounter('id-promo-bawah-1', 90, 3000); 
});