/* ========================================
   Navigation Module
   Handles navbar, mobile menu, and page routing
   ======================================== */

const Navigation = {
    // Initialize navigation
    init() {
        this.header = document.getElementById('header');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.mobileToggle = document.querySelector('.mobile-toggle');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.mobileOverlay = document.querySelector('.mobile-menu-overlay');
        this.mobileClose = document.querySelector('.mobile-menu-close');
        
        this.setupEventListeners();
        this.setupScrollEffect();
        this.setupActiveNavLink();
    },

    // Setup event listeners
    setupEventListeners() {
        // Mobile menu toggle
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Mobile menu close
        if (this.mobileClose) {
            this.mobileClose.addEventListener('click', () => this.closeMobileMenu());
        }

        // Mobile overlay click
        if (this.mobileOverlay) {
            this.mobileOverlay.addEventListener('click', () => this.closeMobileMenu());
        }

        // Navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Close mobile menu on link click
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
    },

    // Handle navigation click
    handleNavClick(e) {
        const href = e.currentTarget.getAttribute('href');
        
        // If it's an internal page link (starts with #)
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            this.navigateTo(targetId);
        }
    },

    // Navigate to a page/section
    navigateTo(targetId) {
        // Map section IDs to page IDs
        const pageMap = {
            'home': 'home-page',
            'about': 'about-page',
            'services': 'services-page',
            'projects': 'projects-page',
            'contact': 'contact-page',
            'settings': 'settings-page'
        };

        const pageId = pageMap[targetId] || targetId + '-page';
        
        // If it's a section on the same page
        if (document.getElementById(targetId)) {
            this.scrollToSection(targetId);
            
            // Update active link
            this.setActiveLink(targetId);
        }
        
        // Check if page exists and show it
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show target page
            targetPage.classList.add('active');
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    },

    // Scroll to section
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = this.header ? this.header.offsetHeight : 0;
            const sectionTop = section.offsetTop - headerHeight;
            
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        }
    },

    // Setup scroll effect for header
    setupScrollEffect() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (this.header) {
                if (currentScroll > 50) {
                    this.header.classList.add('scrolled');
                } else {
                    this.header.classList.remove('scrolled');
                }
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    },

    // Setup active nav link based on scroll position
    setupActiveNavLink() {
        const sections = document.querySelectorAll('section[id], div[id$="-page"]');
        
        if (sections.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    this.setActiveLink(id.replace('-page', '').replace('-section', ''));
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-20% 0px -20% 0px'
        });

        sections.forEach(section => observer.observe(section));
    },

    // Set active navigation link
    setActiveLink(id) {
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === '#' + id) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    // Toggle mobile menu
    toggleMobileMenu() {
        if (this.mobileToggle) {
            this.mobileToggle.classList.toggle('active');
        }
        
        if (this.mobileMenu) {
            this.mobileMenu.classList.toggle('active');
        }
        
        if (this.mobileOverlay) {
            this.mobileOverlay.classList.toggle('active');
        }
        
        // Prevent body scroll
        document.body.style.overflow = this.mobileMenu?.classList.contains('active') ? 'hidden' : '';
    },

    // Close mobile menu
    closeMobileMenu() {
        if (this.mobileToggle) {
            this.mobileToggle.classList.remove('active');
        }
        
        if (this.mobileMenu) {
            this.mobileMenu.classList.remove('active');
        }
        
        if (this.mobileOverlay) {
            this.mobileOverlay.classList.remove('active');
        }
        
        document.body.style.overflow = '';
    }
};

// Export for use in main.js
window.Navigation = Navigation;
