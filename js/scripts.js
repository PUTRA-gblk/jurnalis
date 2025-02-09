document.addEventListener('DOMContentLoaded', () => {
    // Elemen Utama
    const menuToggle = document.getElementById('menuToggle');
    const menuIcon = document.getElementById('menuIcon');
    const menu = document.getElementById('menu');
    const navItems = document.querySelectorAll('.nav-item');
    const projectList = document.getElementById('projectList');
    const projectDetails = document.querySelectorAll('.project-detail');
    const themeToggle = document.getElementById('mobileSidebarThemeToggle');
    const themePopup = document.getElementById('themePopup');
    const themeMessage = document.getElementById('themeMessage');
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    const loadingContainer = document.getElementById('loadingContainer');
    let currentSlide = 0;

    // Konfigurasi Tema
    const THEME_KEY = 'palvo-jurnalis-theme';

    // Inisialisasi Aplikasi
    function initializeApp() {
        initializeTheme(); // Muat tema tersimpan
        attachEventListeners(); // Pasang Event Listener
        showSlide(currentSlide); // Tampilkan slide pertama
        startLoadingAnimation(); // Mulai animasi loading
        setupScrollAnimations(); // Setup animasi scroll
    }

    // Animasi Loading
    function startLoadingAnimation() {
        if (!loadingContainer) return; // Pastikan elemen loadingContainer ada

        // Nonaktifkan scroll saat loading
        document.body.style.overflow = 'hidden';

        // Setelah 3 detik, hilangkan loading container
        setTimeout(() => {
            loadingContainer.style.opacity = '0'; // Fade out
            setTimeout(() => {
                loadingContainer.style.display = 'none'; // Sembunyikan setelah animasi selesai
                document.body.style.overflow = 'auto'; // Aktifkan scroll
            }, 500); // Durasi fade out
        }, 3000); // Durasi animasi loading
    }

    // Manajemen Tema
    function initializeTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
        document.body.classList.toggle('dark-theme', savedTheme === 'dark');
        updateThemeToggle(savedTheme);
    }

    function toggleTheme() {
        const body = document.body;
        const isDarkTheme = body.classList.contains('dark-theme');
        const newTheme = isDarkTheme ? 'light' : 'dark';

        body.classList.toggle('dark-theme', !isDarkTheme);
        localStorage.setItem(THEME_KEY, newTheme);
        updateThemeToggle(newTheme);

        // Tampilkan popup di bagian bawah
        if (themePopup && themeMessage) {
            themeMessage.textContent = `Tema diubah ke mode ${newTheme}`;
            themePopup.classList.remove('hidden');
            setTimeout(() => themePopup.classList.add('hidden'), 3000);
        }
    }

    function updateThemeToggle(theme) {
        const themeThumb = document.querySelector('.theme-toggle-thumb');
        if (themeThumb) {
            if (theme === 'dark') {
                themeThumb.style.transform = 'translateX(26px)';
            } else {
                themeThumb.style.transform = 'translateX(2px)';
            }
        }
    }

    // Slider Functionality
    function showSlide(index) {
        if (!slider || !slides) return; // Pastikan elemen slider dan slides ada

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    // Animasi Coming Soon
    function animateComingSoon() {
        const comingSoonTitles = document.querySelectorAll('.coming-soon-title');
        const comingSoonTexts = document.querySelectorAll('.coming-soon-text');
        const comingSoonImages = document.querySelectorAll('.coming-soon-image');

        comingSoonTitles.forEach(title => {
            title.style.opacity = 0;
            title.style.transform = 'translateY(20px)';
        });

        comingSoonTexts.forEach(text => {
            text.style.opacity = 0;
            text.style.transform = 'translateY(20px)';
        });

        comingSoonImages.forEach(image => {
            image.style.opacity = 0;
        });

        setTimeout(() => {
            comingSoonTitles.forEach(title => {
                title.style.opacity = 1;
                title.style.transform = 'translateY(0)';
            });

            comingSoonTexts.forEach(text => {
                text.style.opacity = 1;
                text.style.transform = 'translateY(0)';
            });

            comingSoonImages.forEach(image => {
                image.style.opacity = 1;
            });
        }, 500);
    }

    // Animasi Scroll
    function setupScrollAnimations() {
        const sections = document.querySelectorAll('.section');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        sections.forEach((section) => {
            observer.observe(section);
        });
    }

    // Pasang Event Listener
    function attachEventListeners() {
        // Toggle Menu
        if (menuToggle && menu && menuIcon) {
            menuToggle.addEventListener('click', () => {
                menu.classList.toggle('active');
                // Toggle ikon menu
                if (menu.classList.contains('active')) {
                    menuIcon.classList.remove('fa-bars');
                    menuIcon.classList.add('fa-times');
                } else {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            });
        }

        // Navigasi Section
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const section = item.getAttribute('data-section');
                if (section) {
                    showSection(section);
                    if (menu && menuIcon) {
                        menu.classList.remove('active');
                        menuIcon.classList.remove('fa-times');
                        menuIcon.classList.add('fa-bars');
                    }
                }
            });
        });

        // Delegasi Klik Proyek
        if (projectList) {
            projectList.addEventListener('click', (e) => {
                const projectItem = e.target.closest('li[data-project]');
                if (!projectItem) return;

                // Hapus class 'active' dari semua item proyek
                document.querySelectorAll('.project-list li').forEach(item => {
                    item.classList.remove('active');
                });

                // Tambahkan class 'active' ke item yang diklik
                projectItem.classList.add('active');

                // Ambil nama proyek dari atribut data-project
                const projectName = projectItem.getAttribute('data-project');

                // Sembunyikan semua konten proyek
                projectDetails.forEach(detail => {
                    detail.classList.remove('active');
                });

                // Tampilkan konten proyek yang sesuai
                const activeProjectDetail = document.getElementById(`${projectName}-content`);
                if (activeProjectDetail) {
                    activeProjectDetail.classList.add('active');
                    if (projectName.includes('coming-soon')) {
                        animateComingSoon(); // Jalankan animasi Coming Soon
                    }
                }
            });
        }

        // Toggle Tema
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }

        // Slider Navigation
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });

            nextButton.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
        }
    }

    // Tampilkan Section
    function showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.toggle('hidden', section.id !== sectionId);
        });
    }

    // Jalankan Inisialisasi
    initializeApp();
});