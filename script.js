// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Mobile scroll-based illustration reveal
    if (window.innerWidth <= 768) {
        const previewCards = document.querySelectorAll('.preview-card');

        const revealOnScroll = () => {
            previewCards.forEach(card => {
                const cardTop = card.getBoundingClientRect().top;
                const cardBottom = card.getBoundingClientRect().bottom;
                const windowHeight = window.innerHeight;

                // If card is in viewport, add active class
                if (cardTop < windowHeight * 0.75 && cardBottom > windowHeight * 0.25) {
                    card.classList.add('mobile-active');
                } else {
                    card.classList.remove('mobile-active');
                }
            });
        };

        // Initial check
        revealOnScroll();

        // Check on scroll
        window.addEventListener('scroll', revealOnScroll);
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    if (navLinks.style.display === 'flex') {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'white';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
