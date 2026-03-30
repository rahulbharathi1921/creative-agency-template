/* ========================================
   DeCoders - Main JavaScript Entry Point
   Initializes all modules and functionality
   ======================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DeCoders - Initializing...');
    
    // Initialize all modules
    init();
    
    // Mark as loaded
    document.body.classList.add('loaded');
});

/* ========================================
   Main Initialization
   ======================================== */

function init() {
    // Initialize Navigation
    if (typeof Navigation !== 'undefined') {
        Navigation.init();
    }
    
    // Initialize Animations
    if (typeof Animations !== 'undefined') {
        Animations.init();
    }
    
    // Initialize Form Handler
    if (typeof FormHandler !== 'undefined') {
        FormHandler.init();
    }
    
    // Initialize Theme Manager
    if (typeof ThemeManager !== 'undefined') {
        ThemeManager.init();
    }
    
    // Setup additional interactions
    setupHeroAnimations();
    setupCardHoverEffects();
    setupParallaxEffect();
    setupScrollToTop();
    setupToggleSwitches();
    
    console.log('DeCoders - Ready!');
}

/* ========================================
   Hero Animations
   ======================================== */

function setupHeroAnimations() {
    const heroSection = document.querySelector('.hero');
    
    if (!heroSection) return;
    
    // Mouse move parallax effect for hero background
    document.addEventListener('mousemove', Utils.throttle((e) => {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;
        
        heroSection.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }, 50));
}

/* ========================================
   Card Hover Effects
   ======================================== */

function setupCardHoverEffects() {
    // Service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('.project-image');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.project-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

/* ========================================
   Parallax Effect
   ======================================== */

function setupParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.about-image, .project-card');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', Utils.throttle(() => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isInView) {
                const rate = scrolled * 0.05;
                el.style.transform = `translateY(${rate}px)`;
            }
        });
    }, 50));
}

/* ========================================
   Scroll To Top
   ======================================== */

function setupScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: var(--color-accent, #0066ff);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        font-size: 20px;
        box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', Utils.throttle(() => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    }, 100));
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ========================================
   Toggle Switches
   ======================================== */

function setupToggleSwitches() {
    document.querySelectorAll('.toggle-switch[data-theme]').forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            const isDark = toggle.classList.contains('active');
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
            localStorage.setItem('decoders-theme', isDark ? 'dark' : 'light');
        });
        
        // Keyboard support
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle.click();
            }
        });
    });
    
    // Other toggle switches
    document.querySelectorAll('.toggle-switch:not([data-theme])').forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
        });
        
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle.click();
            }
        });
    });
}

/* ========================================
   Loading Screen (Optional)
   ======================================== */

function hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-overlay');
    
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }
}

// Hide loading screen after page loads
window.addEventListener('load', () => {
    setTimeout(hideLoadingScreen, 500);
});

/* ========================================
   Error Handling
   ======================================== */

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

// Unhandled promise rejection
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

/* ========================================
   Console Branding
   ======================================== */

console.log(`
██╗    ██╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
██║    ██║██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
██║ █╗ ██║█████╗  ██████║██╔████╔██║██║██╔██╗ ██║███████║██║     
██║███╗██║██╔══╝  ██╔══██║██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
╚███╔███╔╝███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
 ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
 
 🎨 DeCoders - Creative Digital Agency
 Version: 2.0.0
 Built with vanilla HTML, CSS, and JavaScript
`);
