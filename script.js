document.addEventListener('DOMContentLoaded', function () {
    // Ambil elemen yang diperlukan
    const toggleCheckbox = document.getElementById('menu-toggle');
    const navLinks = document.querySelectorAll('.nav-links li a');

    // Tambahkan event listener untuk setiap link navigasi
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Cek jika menu dalam keadaan terbuka (di mobile)
            if (toggleCheckbox.checked) {
                // Tutup menu dengan menghilangkan centang pada checkbox
                toggleCheckbox.checked = false;
                // Perbarui atribut aria-expanded untuk aksesibilitas
                toggleCheckbox.setAttribute('aria-expanded', 'false');

                // Pada implementasi CSS di atas, menghilangkan centang
                // akan mengembalikan transform: translateX(100%)
            }
        });
    });

    // Update aria-expanded saat checkbox berubah (aksesibilitas)
    if (toggleCheckbox) {
        toggleCheckbox.addEventListener('change', function () {
            toggleCheckbox.setAttribute('aria-expanded', this.checked ? 'true' : 'false');
        });
    }

    // (Opsional) Fungsionalitas Penanda Link Aktif saat Scroll
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 75; // Offset header 
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // Panggil saat load agar link Home aktif di awal
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
});