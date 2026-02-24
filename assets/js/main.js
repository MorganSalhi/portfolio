// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. GESTION DU MENU BURGER --- */
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    // On vérifie si le burger existe sur la page avant d'ajouter l'écouteur
    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
            
            // Bloque le défilement du corps quand le menu est ouvert
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Ferme le menu automatiquement quand on clique sur un lien
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    const cards = document.querySelectorAll('.project-card, .skill-card');
    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});