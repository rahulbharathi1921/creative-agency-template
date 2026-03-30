/* ========================================
   Theme Manager Module
   Handles dark/light mode, preferences, and storage
   ======================================== */

const ThemeManager = {
    // Theme keys
    THEME_KEY: 'decoders-theme',
    THEMES: {
        LIGHT: 'light',
        DARK: 'dark',
        SYSTEM: 'system'
    },

    // Initialize theme manager
    init() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.toggleSwitch = document.querySelector('.toggle-switch[data-theme]');
        
        this.loadTheme();
        this.setupEventListeners();
        this.setupSystemPreferenceListener();
    },

    // Setup event listeners
    setupEventListeners() {
        // Theme toggle button
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Toggle switch
        if (this.toggleSwitch) {
            this.toggleSwitch.addEventListener('click', () => this.toggleTheme());
        }
    },

    // Setup system preference listener
    setupSystemPreferenceListener() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', (e) => {
            const savedTheme = localStorage.getItem(this.THEME_KEY);
            if (!savedTheme || savedTheme === this.THEMES.SYSTEM) {
                this.applyTheme(e.matches ? this.THEMES.DARK : this.THEMES.LIGHT);
            }
        });
    },

    // Load saved theme
    loadTheme() {
        const savedTheme = localStorage.getItem(this.THEME_KEY) || this.THEMES.SYSTEM;
        this.applyTheme(savedTheme);
    },

    // Apply theme
    applyTheme(theme) {
        // Handle system preference
        if (theme === this.THEMES.SYSTEM) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            theme = prefersDark ? this.THEMES.DARK : this.THEMES.LIGHT;
        }

        // Apply to document
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update toggle switches
        document.querySelectorAll('.toggle-switch[data-theme]').forEach(toggle => {
            if (theme === this.THEMES.DARK) {
                toggle.classList.add('active');
            } else {
                toggle.classList.remove('active');
            }
        });

        // Update toggle buttons
        document.querySelectorAll('.theme-toggle').forEach(btn => {
            const icon = btn.querySelector('.theme-toggle-icon');
            if (icon) {
                icon.textContent = theme === this.THEMES.DARK ? '☀️' : '🌙';
            }
        });

        // Save to localStorage
        localStorage.setItem(this.THEME_KEY, theme);
    },

    // Toggle theme
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === this.THEMES.DARK ? this.THEMES.LIGHT : this.THEMES.DARK;
        
        this.applyTheme(newTheme);
    },

    // Get current theme
    getTheme() {
        return document.documentElement.getAttribute('data-theme') || this.THEMES.LIGHT;
    },

    // Set specific theme
    setTheme(theme) {
        if (Object.values(this.THEMES).includes(theme)) {
            this.applyTheme(theme);
        }
    }
};

// Export for use in main.js
window.ThemeManager = ThemeManager;

/* ========================================
   Utility Functions
   ======================================== */

const Utils = {
    // Debounce function
    debounce(func, wait = 250) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit = 250) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Get viewport dimensions
    getViewport() {
        return {
            width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
            height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const viewport = this.getViewport();
        
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= viewport.height &&
            rect.right <= viewport.width
        );
    },

    // Smooth scroll to element
    smoothScrollTo(target, offset = 0) {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    },

    // Copy text to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            return false;
        }
    },

    // Format date
    formatDate(date, options = {}) {
        const d = new Date(date);
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            ...options
        });
    },

    // Format relative time
    formatRelativeTime(date) {
        const now = new Date();
        const then = new Date(date);
        const diff = now - then;
        
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 7) {
            return this.formatDate(date);
        } else if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return 'Just now';
        }
    },

    // Generate random ID
    generateId(prefix = 'id') {
        return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },

    // Parse query string
    parseQueryString(queryString) {
        const params = new URLSearchParams(queryString);
        const result = {};
        
        for (const [key, value] of params) {
            result[key] = value;
        }
        
        return result;
    },

    // Build query string
    buildQueryString(params) {
        return new URLSearchParams(params).toString();
    },

    // Lazy load images
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }
};

// Export for use in main.js
window.Utils = Utils;
