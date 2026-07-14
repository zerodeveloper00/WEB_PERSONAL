document.addEventListener('DOMContentLoaded', function() {
    const basePath = '/WEB_PERSONAL';
    const navbarContainer = document.getElementById('navbar');
    const footerContainer = document.getElementById('footer');

    // Cargar navbar
    fetch(basePath + '/components/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarContainer.innerHTML = data;
            // Resaltar enlace activo
            const currentPath = window.location.pathname;
            const links = navbarContainer.querySelectorAll('.nav-links a');
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (currentPath.endsWith(href) || (currentPath === '/' && href === '/')) {
                    link.style.color = '#00e5ff';
                    link.style.textShadow = '0 0 10px rgba(0, 229, 255, 0.3)';
                }
            });
            // Menú móvil
            const toggle = navbarContainer.querySelector('.menu-toggle');
            const navLinks = navbarContainer.querySelector('.nav-links');
            if (toggle && navLinks) {
                toggle.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                    toggle.classList.toggle('active');
                });
            }
        })
        .catch(err => console.warn('Error al cargar navbar:', err));

    // Cargar footer
    fetch(basePath + '/components/footer.html')
        .then(response => response.text())
        .then(data => {
            footerContainer.innerHTML = data;
        })
        .catch(err => console.warn('Error al cargar footer:', err));

    // ===== ANIMACIONES DE REVELADO AL SCROLL =====
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    revealElements.forEach(el => revealObserver.observe(el));
});