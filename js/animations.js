// Optimized Animation Controller
class AnimationController {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        // Initialize only if animations are supported
        if (!this.supportsAnimations()) return;
        
        this.initScrollAnimations();
        this.initPageTransitions();
        this.initFormAnimations();
    }

    supportsAnimations() {
        return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    initPageTransitions() {
        document.addEventListener('click', e => {
            const link = e.target.closest('a');
            if (link?.href?.startsWith(window.location.origin)) {
                e.preventDefault();
                this.handlePageTransition(link.href);
            }
        });
    }

    async handlePageTransition(url) {
        const main = document.querySelector('main');
        if (!main) return;

        main.classList.remove('active');

        try {
            const response = await fetch(url);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.querySelector('main')?.innerHTML;

            if (!newContent) throw new Error('No content found');

            main.innerHTML = newContent;
            requestAnimationFrame(() => main.classList.add('active'));
            window.history.pushState({}, '', url);
        } catch (error) {
            console.error('Page transition failed:', error);
            window.location.href = url;
        }
    }

    initScrollAnimations() {
        if (!('IntersectionObserver' in window)) return;

        this.observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        if (!entry.target.dataset.repeat) {
                            this.observer.unobserve(entry.target);
                        }
                    } else if (entry.target.dataset.repeat) {
                        entry.target.classList.remove('visible');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        // Use a more performant selector
        const animatedElements = document.querySelectorAll('.fade-up, .slide-in, .heading-underline');
        animatedElements.forEach(el => this.observer.observe(el));
    }

    initFormAnimations() {
        const forms = document.querySelectorAll('form');
        if (!forms.length) return;

        forms.forEach(form => {
            const inputs = form.querySelectorAll('.form-input');
            inputs.forEach(input => {
                input.addEventListener('focus', () => input.parentElement?.classList.add('focused'));
                input.addEventListener('blur', () => {
                    if (!input.value) input.parentElement?.classList.remove('focused');
                });
            });

            form.addEventListener('submit', e => {
                const inputs = form.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    if (input.checkValidity()) {
                        this.showValidationIcon(input, true);
                    } else {
                        this.showValidationIcon(input, false);
                    }
                });
            });
        });
    }

    showValidationIcon(input, isValid) {
        const icon = document.createElement('span');
        icon.className = `form-icon ${isValid ? 'success' : 'error'}`;
        icon.innerHTML = isValid ? '✓' : '✕';
        
        const container = input.parentElement;
        if (!container) return;

        container.appendChild(icon);
        requestAnimationFrame(() => icon.classList.add('visible'));

        setTimeout(() => {
            icon.classList.remove('visible');
            setTimeout(() => icon.remove(), 300);
        }, 2000);
    }
}

// Initialize animations when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new AnimationController());
} else {
    new AnimationController();
} 