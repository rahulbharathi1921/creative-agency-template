/* ========================================
   Animations Module
   Handles scroll animations, reveal effects, and transitions
   ======================================== */

const Animations = {
    // Initialize animations
    init() {
        this.setupRevealAnimations();
        this.setupParallax();
        this.setupStaggerAnimations();
    },

    // Setup reveal animations on scroll
    setupRevealAnimations() {
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        
        if (revealElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Optional: unobserve after revealing
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    },

    // Setup parallax effects
    setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    parallaxElements.forEach(el => {
                        const speed = parseFloat(el.dataset.parallax) || 0.1;
                        const scrolled = window.pageYOffset;
                        const rate = scrolled * speed;
                        
                        el.style.transform = `translateY(${rate}px)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    },

    // Setup stagger animations
    setupStaggerAnimations() {
        const staggerElements = document.querySelectorAll('.stagger-children');
        
        if (staggerElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1
        });

        staggerElements.forEach(el => observer.observe(el));
    },

    // Animate element in
    animateIn(element, animation = 'fadeInUp', duration = 600) {
        const animations = {
            fadeIn: 'fadeIn 0.6s ease forwards',
            fadeInUp: 'fadeInUp 0.6s ease forwards',
            fadeInDown: 'fadeInDown 0.6s ease forwards',
            scaleIn: 'scaleIn 0.6s ease forwards'
        };
        
        element.style.animation = animations[animation] || animations.fadeInUp;
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    },

    // Add loading animation
    showLoading(element) {
        element.innerHTML = '<div class="spinner"></div>';
        element.classList.add('loading');
    },

    // Remove loading animation
    hideLoading(element) {
        element.classList.remove('loading');
        element.innerHTML = '';
    }
};

// Export for use in main.js
window.Animations = Animations;
