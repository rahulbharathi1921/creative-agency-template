/* ========================================
   Form Handler Module
   Handles form validation, submission, and states
   ======================================== */

const FormHandler = {
    // Initialize form handlers
    init() {
        this.forms = document.querySelectorAll('[data-form]');
        
        this.forms.forEach(form => {
            this.setupForm(form);
        });
    },

    // Setup individual form
    setupForm(form) {
        const formType = form.dataset.form;
        
        switch (formType) {
            case 'contact':
                this.setupContactForm(form);
                break;
            case 'settings':
                this.setupSettingsForm(form);
                break;
            default:
                this.setupDefaultForm(form);
        }
    },

    // Setup contact form
    setupContactForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm(form)) {
                this.submitContactForm(form);
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('.form-input, .form-textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('is-invalid')) {
                    this.validateField(input);
                }
            });
        });
    },

    // Setup settings form
    setupSettingsForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm(form)) {
                this.showSuccess(form, 'Settings saved successfully!');
            }
        });
    },

    // Setup default form
    setupDefaultForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm(form)) {
                this.showSuccess(form, 'Form submitted successfully!');
            }
        });
    },

    // Validate entire form
    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('.form-input, .form-textarea, .form-select');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    },

    // Validate individual field
    validateField(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required validation
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        if (input.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-+()]+$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Min length validation
        if (input.hasAttribute('minlength') && value) {
            const minLength = parseInt(input.getAttribute('minlength'));
            if (value.length < minLength) {
                isValid = false;
                errorMessage = `Must be at least ${minLength} characters`;
            }
        }

        // Update field UI
        this.updateFieldState(input, isValid, errorMessage);
        
        return isValid;
    },

    // Update field state
    updateFieldState(input, isValid, errorMessage) {
        const formGroup = input.closest('.form-group') || input.parentElement;
        
        // Remove existing error
        formGroup?.querySelector('.form-error')?.remove();
        input.classList.remove('is-invalid', 'is-valid');

        if (!isValid && errorMessage) {
            input.classList.add('is-invalid');
            
            // Add error message
            const errorEl = document.createElement('div');
            errorEl.className = 'form-error';
            errorEl.textContent = errorMessage;
            formGroup?.appendChild(errorEl);
        } else if (isValid && input.value.trim()) {
            input.classList.add('is-valid');
        }
    },

    // Submit contact form
    async submitContactForm(form) {
        const submitBtn = form.querySelector('.form-submit');
        const originalText = submitBtn?.textContent;
        
        // Show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('btn-loading');
            submitBtn.textContent = 'Sending...';
        }

        try {
            // Simulate API call (replace with actual API endpoint)
            await this.simulateApiCall({
                name: form.querySelector('#name')?.value,
                email: form.querySelector('#email')?.value,
                message: form.querySelector('#message')?.value
            });

            // Show success message
            this.showSuccess(form, 'Thank you for your message! We will get back to you soon.');
            
            // Reset form
            form.reset();
            
            // Remove valid states
            form.querySelectorAll('.is-valid').forEach(el => {
                el.classList.remove('is-valid');
            });

        } catch (error) {
            // Show error message
            this.showError(form, 'Something went wrong. Please try again.');
        } finally {
            // Restore button state
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-loading');
                submitBtn.textContent = originalText || 'Send Message';
            }
        }
    },

    // Simulate API call (placeholder)
    simulateApiCall(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve({ success: true });
            }, 1500);
        });
    },

    // Show success message
    showSuccess(form, message) {
        // Remove existing messages
        form.querySelectorAll('.alert').forEach(el => el.remove());
        
        const alert = document.createElement('div');
        alert.className = 'alert alert-success';
        alert.innerHTML = `
            <span class="alert-icon">✓</span>
            <div class="alert-content">
                <p class="alert-message">${message}</p>
            </div>
        `;
        
        form.insertBefore(alert, form.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    },

    // Show error message
    showError(form, message) {
        // Remove existing messages
        form.querySelectorAll('.alert').forEach(el => el.remove());
        
        const alert = document.createElement('div');
        alert.className = 'alert alert-error';
        alert.innerHTML = `
            <span class="alert-icon">✕</span>
            <div class="alert-content">
                <p class="alert-message">${message}</p>
            </div>
        `;
        
        form.insertBefore(alert, form.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
};

// Export for use in main.js
window.FormHandler = FormHandler;
