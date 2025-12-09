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

    // === Genie Section Interactions ===

    // Conversation Switcher
    const convButtons = document.querySelectorAll('.conv-btn');
    const conversationSets = document.querySelectorAll('.conversation-set');

    convButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetConv = button.getAttribute('data-conversation');

            // Remove active class from all buttons
            convButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Hide all conversations
            conversationSets.forEach(conv => {
                conv.classList.remove('active');
            });

            // Show target conversation
            const targetSet = document.querySelector(`.conversation-set[data-conversation="${targetConv}"]`);
            if (targetSet) {
                targetSet.classList.add('active');
            }
        });
    });

    // Mood Board Click (Modal simulation)
    const moodBoards = document.querySelectorAll('.mood-board');
    moodBoards.forEach((board, index) => {
        board.addEventListener('click', () => {
            alert(`Mood Board ${index + 1}: In the full app, this would open a beautiful full-screen gallery! 🎨`);
        });
    });

    // Demo Widget Interactions
    const promptPills = document.querySelectorAll('.prompt-pill');
    const demoInput = document.getElementById('genieInput');
    const demoSubmit = document.getElementById('genieSubmit');
    const demoResponse = document.getElementById('genieResponse');
    const closeResponseBtn = document.getElementById('closeResponse');

    // Click prompt pills to fill input
    promptPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const promptText = pill.getAttribute('data-prompt');
            demoInput.value = promptText;
            demoInput.focus();

            // Auto-submit after a brief delay
            setTimeout(() => {
                showDemoResponse();
            }, 500);
        });
    });

    // Submit demo question
    demoSubmit.addEventListener('click', showDemoResponse);

    demoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            showDemoResponse();
        }
    });

    // Close response button
    if (closeResponseBtn) {
        closeResponseBtn.addEventListener('click', () => {
            demoResponse.style.display = 'none';
            demoInput.value = '';
            demoInput.focus();
        });
    }

    function showDemoResponse() {
        if (demoInput.value.trim()) {
            // Show typing indicator briefly
            const typingIndicator = document.querySelector('.typing-indicator');
            if (typingIndicator) {
                typingIndicator.style.display = 'flex';

                setTimeout(() => {
                    typingIndicator.style.display = 'none';
                    demoResponse.style.display = 'block';

                    // Smooth scroll to response
                    demoResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 1500);
            } else {
                demoResponse.style.display = 'block';
                demoResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }

    // Flip cards - click to flip on mobile
    if (window.innerWidth <= 768) {
        const flipCards = document.querySelectorAll('.flip-card');
        flipCards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });
        });
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
