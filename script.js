document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // PAGE LOADER
    // ========================================
    const pageLoader = document.querySelector('.page-loader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            pageLoader.classList.add('loaded');
        }, 2000); // Show loader for 2 seconds
    });

    // Fallback: hide loader after 3 seconds max
    setTimeout(() => {
        pageLoader.classList.add('loaded');
    }, 3000);

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ========================================
    // SCROLL TO TOP BUTTON
    // ========================================
    const scrollTopBtn = document.querySelector('.scroll-top');

    function handleScrollTop() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', handleScrollTop);

    // ========================================
    // CUSTOM CURSOR
    // ========================================
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows immediately
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Follower has more lag
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover states
    const hoverElements = document.querySelectorAll('a, button, .project, .skill-category li, .project-tags span');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
            cursorFollower.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
            cursorFollower.classList.remove('hovering');
        });
    });

    // ========================================
    // SCROLL PROGRESS BAR
    // ========================================
    const progressBar = document.querySelector('.progress-bar');

    function updateProgressBar() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        progressBar.style.transform = `scaleX(${scrollPercent})`;
    }

    window.addEventListener('scroll', updateProgressBar);

    // ========================================
    // NAVIGATION SCROLL EFFECT
    // ========================================
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    function handleNavScroll() {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleNavScroll);

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================
    const revealElements = document.querySelectorAll(
        '.section-header, .about-text, .skills, .experience-item, .project, .contact-content'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========================================
    // EXPERIENCE NUMBERS COUNTER
    // ========================================
    const expNumbers = document.querySelectorAll('.exp-number');
    let hasAnimated = false;

    function animateNumbers() {
        expNumbers.forEach(num => {
            const text = num.textContent;
            if (text === '∞') return; // Skip infinity symbol

            const target = parseInt(text);
            if (isNaN(target)) return;

            let current = 0;
            const increment = target / 50;
            const duration = 1500;
            const stepTime = duration / 50;

            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    num.textContent = text; // Restore original (with + if present)
                    clearInterval(counter);
                } else {
                    num.textContent = Math.floor(current) + (text.includes('+') ? '+' : '');
                }
            }, stepTime);
        });
    }

    const expStrip = document.querySelector('.experience-strip');
    if (expStrip) {
        const expObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    animateNumbers();
                }
            });
        }, { threshold: 0.5 });

        expObserver.observe(expStrip);
    }

    // ========================================
    // PARALLAX EFFECT ON HERO
    // ========================================
    const heroImage = document.querySelector('.hero-image');
    const heroImageInner = document.querySelector('.image-wrapper img');
    const heroContent = document.querySelector('.hero-content');

    function parallax() {
        const scrolled = window.scrollY;

        if (heroImageInner && window.innerWidth > 900) {
            // Image moves slower for depth effect (keeping 0.8 scale)
            heroImageInner.style.transform = `scale(0.8) translateY(${scrolled * 0.15}px)`;
        }
        if (heroContent && window.innerWidth > 900) {
            // Content fades and moves up slightly
            const opacity = Math.max(0, 1 - scrolled / 600);
            heroContent.style.opacity = opacity;
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        if (heroImage && window.innerWidth > 900) {
            // Fade out the hero image as you scroll
            const imageOpacity = Math.max(0, 1 - scrolled / 800);
            heroImage.style.opacity = imageOpacity;
        }
    }

    window.addEventListener('scroll', parallax);

    // ========================================
    // PROJECT HOVER EFFECTS
    // ========================================
    // Note: Project image hover effects removed as layout changed to card-based design

    // ========================================
    // MAGNETIC BUTTONS
    // ========================================
    const magneticBtns = document.querySelectorAll('.btn-primary, .nav-link-cta');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ========================================
    // TEXT SPLIT ANIMATION ENHANCEMENT
    // ========================================
    const animatedTitles = document.querySelectorAll('.section-title, .contact-title');

    animatedTitles.forEach(title => {
        // Split text into spans for each word
        const text = title.innerHTML;
        const words = text.split(' ');
        title.innerHTML = words.map((word, i) => {
            if (word.includes('<br>')) return word;
            return `<span class="word" style="--delay: ${i * 0.05}s">${word}</span>`;
        }).join(' ');
    });

    // Add CSS for word animation
    const style = document.createElement('style');
    style.textContent = `
        .section-title .word,
        .contact-title .word {
            display: inline-block;
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
            transition-delay: var(--delay);
        }
        .reveal.active .word {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // SKILL ITEMS STAGGER
    // ========================================
    const skillItems = document.querySelectorAll('.skill-category li');
    skillItems.forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.05}s`;
    });

    // ========================================
    // HIDE SCROLL INDICATOR ON SCROLL
    // ========================================
    const scrollIndicator = document.querySelector('.scroll-indicator');

    function handleScrollIndicator() {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    }

    window.addEventListener('scroll', handleScrollIndicator);

    // ========================================
    // IMAGE LOAD OPTIMIZATION
    // ========================================
    const heroImg = document.querySelector('.bento-profile-img, .image-wrapper img');
    if (heroImg) {
        heroImg.addEventListener('load', () => {
            heroImg.style.opacity = '1';
        });
    }

    // ========================================
    // KEYBOARD NAVIGATION
    // ========================================
    document.addEventListener('keydown', (e) => {
        // Press 'C' to jump to contact
        if (e.key === 'c' && !e.ctrlKey && !e.metaKey) {
            const contact = document.getElementById('contact');
            if (contact && document.activeElement.tagName !== 'INPUT') {
                contact.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // ========================================
    // BUTTON RIPPLE EFFECT
    // ========================================
    const buttons = document.querySelectorAll('.btn, .scroll-top, .nav-link-cta');

    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            btn.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ========================================
    // TOUCH FEEDBACK FOR MOBILE
    // ========================================
    const touchElements = document.querySelectorAll('.btn, .project, .skill-category li, .project-tags span');

    touchElements.forEach(el => {
        el.addEventListener('touchstart', () => {
            el.style.transform = 'scale(0.98)';
        }, { passive: true });

        el.addEventListener('touchend', () => {
            el.style.transform = '';
        }, { passive: true });
    });

    // ========================================
    // PERFORMANCE: THROTTLE SCROLL EVENTS
    // ========================================
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateProgressBar();
                handleNavScroll();
                handleScrollIndicator();
                handleScrollTop();
                parallax();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Replace individual scroll listeners with throttled version
    window.removeEventListener('scroll', updateProgressBar);
    window.removeEventListener('scroll', handleNavScroll);
    window.removeEventListener('scroll', handleScrollIndicator);
    window.removeEventListener('scroll', handleScrollTop);
    window.removeEventListener('scroll', parallax);
    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial calls
    updateProgressBar();
    handleNavScroll();
    handleScrollTop();
});
