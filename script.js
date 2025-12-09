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

    // === FUNDRAISING SECTION ENHANCEMENTS ===

    // Morphing Counter Animation for Balance Amount
    function animateCounter(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16); // 60fps
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }

            // Format number with commas
            const formatted = Math.floor(current).toLocaleString();
            element.innerHTML = `$${formatted}<span class="cents">.00</span>`;
        }, 16);
    }

    // Animate Percentage
    function animatePercentage(element, targetPercent, duration) {
        let current = 0;
        const increment = targetPercent / (duration / 16);

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetPercent) {
                current = targetPercent;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '%';
        }, 16);
    }

    // Initialize counters when section is in view
    const fundraisingSection = document.getElementById('fundraising');
    if (fundraisingSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';

                    // Animate balance amount
                    const amountEl = document.querySelector('.amount[data-target]');
                    if (amountEl) {
                        const target = parseInt(amountEl.dataset.target);
                        animateCounter(amountEl, 0, target, 2000);
                    }

                    // Animate percentage
                    const percentEl = document.querySelector('.percentage[data-percent]');
                    if (percentEl) {
                        const targetPercent = parseInt(percentEl.dataset.percent);
                        animatePercentage(percentEl, targetPercent, 2000);

                        // Trigger confetti at 75%
                        if (targetPercent >= 75) {
                            setTimeout(() => {
                                launchConfetti();
                            }, 2000);
                        }
                    }
                }
            });
        }, { threshold: 0.3 });

        observer.observe(fundraisingSection);
    }

    // Confetti Animation System
    function launchConfetti() {
        const canvas = document.getElementById('confettiCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const confettiPieces = [];
        const colors = ['#026BC2', '#FFB3D4', '#93CEFF', '#FF85B6', '#3B7E8F'];

        // Create confetti pieces
        for (let i = 0; i < 100; i++) {
            confettiPieces.push({
                x: Math.random() * canvas.width,
                y: -10,
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5,
                velocityY: Math.random() * 3 + 2,
                velocityX: Math.random() * 4 - 2,
                opacity: 1
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            confettiPieces.forEach((piece, index) => {
                ctx.save();
                ctx.translate(piece.x, piece.y);
                ctx.rotate(piece.rotation * Math.PI / 180);
                ctx.globalAlpha = piece.opacity;
                ctx.fillStyle = piece.color;
                ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
                ctx.restore();

                // Update position
                piece.y += piece.velocityY;
                piece.x += piece.velocityX;
                piece.rotation += piece.rotationSpeed;
                piece.velocityY += 0.1; // Gravity

                // Fade out at bottom
                if (piece.y > canvas.height - 100) {
                    piece.opacity -= 0.02;
                }

                // Remove if off screen
                if (piece.y > canvas.height + 20 || piece.opacity <= 0) {
                    confettiPieces.splice(index, 1);
                }
            });

            if (confettiPieces.length > 0) {
                requestAnimationFrame(animate);
            }
        }

        animate();
    }

    // Floating Coins Animation (triggered on contribution hover)
    const contributionItems = document.querySelectorAll('.contribution-item');
    contributionItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            createFloatingCoins(item);
        });
    });

    function createFloatingCoins(element) {
        const rect = element.getBoundingClientRect();
        const balanceDisplay = document.querySelector('.balance-display');
        if (!balanceDisplay) return;

        const targetRect = balanceDisplay.getBoundingClientRect();

        // Create 3 floating coins
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const coin = document.createElement('div');
                coin.textContent = '💰';
                coin.style.position = 'fixed';
                coin.style.left = rect.left + rect.width / 2 + 'px';
                coin.style.top = rect.top + rect.height / 2 + 'px';
                coin.style.fontSize = '1.5rem';
                coin.style.pointerEvents = 'none';
                coin.style.zIndex = '1000';
                coin.style.transition = 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                document.body.appendChild(coin);

                // Animate to balance
                setTimeout(() => {
                    coin.style.left = targetRect.left + targetRect.width / 2 + 'px';
                    coin.style.top = targetRect.top + 'px';
                    coin.style.opacity = '0';
                    coin.style.transform = 'scale(0.5) rotate(360deg)';
                }, 50);

                // Remove after animation
                setTimeout(() => {
                    coin.remove();
                }, 1600);
            }, i * 200);
        }
    }

    // Milestone marker click effects
    const milestoneMarkers = document.querySelectorAll('.milestone-marker');
    milestoneMarkers.forEach(marker => {
        marker.addEventListener('click', () => {
            // Create sparkle effect
            for (let i = 0; i < 8; i++) {
                const sparkle = document.createElement('div');
                sparkle.textContent = '✨';
                sparkle.style.position = 'absolute';
                sparkle.style.fontSize = '1.2rem';
                sparkle.style.pointerEvents = 'none';

                const angle = (i / 8) * Math.PI * 2;
                const distance = 50;

                marker.style.position = 'relative';
                marker.appendChild(sparkle);

                sparkle.style.left = '50%';
                sparkle.style.top = '50%';
                sparkle.style.transform = 'translate(-50%, -50%)';
                sparkle.style.transition = 'all 0.8s ease-out';

                setTimeout(() => {
                    const x = Math.cos(angle) * distance;
                    const y = Math.sin(angle) * distance;
                    sparkle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
                    sparkle.style.opacity = '0';
                }, 50);

                setTimeout(() => sparkle.remove(), 900);
            }
        });
    });

    // === GUEST STATS ANIMATED COUNTERS ===
    function animateStatCounter(element, target, duration) {
        let current = 0;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Initialize guest stat counters when section is in view
    const guestsSection = document.getElementById('guests');
    if (guestsSection) {
        const guestObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animatedStats) {
                    entry.target.dataset.animatedStats = 'true';

                    // Animate all stat counters
                    const statCounters = document.querySelectorAll('.stat-counter[data-target]');
                    statCounters.forEach((counter, index) => {
                        const target = parseInt(counter.dataset.target);
                        setTimeout(() => {
                            animateStatCounter(counter, target, 1500);
                        }, index * 150); // Stagger animation
                    });
                }
            });
        }, { threshold: 0.3 });

        guestObserver.observe(guestsSection);
    }
    // === VENDOR SECTION INTERACTIONS ===

    // Filter Buttons Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const vendorCards = document.querySelectorAll('.vendor-card');
    const categoryCards = document.querySelectorAll('.vendor-cat-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');

            const filter = btn.textContent.toLowerCase();

            // Simple visual feedback for now (in real app would filter grid)
            if (filter === 'all') {
                vendorCards.forEach(card => card.style.opacity = '1');
                categoryCards.forEach(card => card.style.opacity = '1');
            } else {
                // Dim non-matching items for demo effect
                vendorCards.forEach(card => {
                    const cat = card.querySelector('.vendor-cat').textContent.toLowerCase();
                    card.style.opacity = cat.includes(filter) ? '1' : '0.3';
                });

                categoryCards.forEach(card => {
                    const cat = card.querySelector('h3').textContent.toLowerCase();
                    card.style.opacity = cat.includes(filter) ? '1' : '0.3';
                });
            }
        });
    });

    // Check Availability Buttons
    const checkBtns = document.querySelectorAll('.btn-check-availability');
    checkBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const originalText = this.textContent;
            this.textContent = 'Checking...';
            this.style.background = '#f0f7ff';

            setTimeout(() => {
                this.textContent = 'Request Sent! ✅';
                this.style.background = '#2ecc71';
                this.style.color = 'white';
                this.style.borderColor = '#2ecc71';

                // Reset after 3 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = 'transparent';
                    this.style.color = 'var(--primary-blue)';
                    this.style.borderColor = 'var(--primary-blue)';
                }, 3000);
            }, 1500);
        });
    });

    // Save/Heart Buttons
    const saveBtns = document.querySelectorAll('.overlay-btn[title="Save"]');
    saveBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                icon.style.color = '#e91e63';

                // Add sparkle effect
                const rect = this.getBoundingClientRect();
                createSparkle(rect.left + rect.width / 2, rect.top + rect.height / 2);
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                icon.style.color = 'var(--text-dark)';
            }
        });
    });

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '❤️';
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.transition = 'all 1s ease';
        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.style.transform = 'translateY(-50px) scale(1.5)';
            sparkle.style.opacity = '0';
        }, 50);

        setTimeout(() => sparkle.remove(), 1000);
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

// Navbar Scroll Effect & Active Link Highlighting
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    // Navbar Shrink Effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active Link Highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(a => {
        a.classList.remove('active-link');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active-link');
        }
    });
});
