// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. GESTION DU MENU BURGER --- */
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    const closeMenu = () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Ouvrir le menu de navigation');
        document.body.style.overflow = '';
    };

    const toggleMenu = () => {
        const isOpen = navLinks.classList.toggle('active');
        burger.classList.toggle('active', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
        burger.setAttribute('aria-label', isOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    if (burger) {
        burger.addEventListener('click', toggleMenu);
        burger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });

        links.forEach(link => link.addEventListener('click', closeMenu));
    }

    /* --- 2. DÉFILEMENT FLUIDE (ANCRES) --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    /* --- 3. EFFET D'APPARITION AU SCROLL --- */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = document.querySelectorAll('.project-card, .skill-card');

    if (prefersReducedMotion) {
        cards.forEach(card => {
            card.style.opacity = 1;
            card.style.transform = 'none';
        });
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease-out';
            observer.observe(card);
        });
    }
});