// ========================================================================
// Main JS: navigation, modal, newsletter, search, cart, testimonials, etc.
// ========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // Mobile Menu Toggle
    // =========================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // =========================
    // Modal Functionality
    // =========================
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            modal.classList.remove('active');
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // =========================
    // Newsletter Form Submission
    // =========================
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            // Here you would typically send this to your backend
            console.log('Newsletter subscription:', email);
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }

    // =========================
    // Search Functionality
    // =========================
    const searchForm = document.querySelector('.search-bar');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchTerm = searchForm.querySelector('input').value;
            if (searchTerm.trim()) {
                window.location.href = `shop.html?search=${encodeURIComponent(searchTerm)}`;
            }
        });
    }

    // =========================
    // Check Authentication Status
    // =========================
    function checkAuth() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const loginBtn = document.querySelector('.login-btn');
        
        if (loginBtn) {
            if (isLoggedIn) {
                loginBtn.textContent = 'My Account';
                loginBtn.href = 'account.html';
            } else {
                loginBtn.textContent = 'Login';
                loginBtn.href = 'login.html';
            }
        }
    }

    // =========================
    // Initialize
    // =========================
    checkAuth();
});

// ========================================================================
// Cart Functionality: update count, add to cart, show notification
// ========================================================================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Product added to cart!');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ========================================================================
// Testimonial Slider: drag-to-scroll functionality
// ========================================================================
const testimonialSlider = document.querySelector('.testimonial-slider');
if (testimonialSlider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    testimonialSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        testimonialSlider.classList.add('active');
        startX = e.pageX - testimonialSlider.offsetLeft;
        scrollLeft = testimonialSlider.scrollLeft;
    });

    testimonialSlider.addEventListener('mouseleave', () => {
        isDown = false;
        testimonialSlider.classList.remove('active');
    });

    testimonialSlider.addEventListener('mouseup', () => {
        isDown = false;
        testimonialSlider.classList.remove('active');
    });

    testimonialSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - testimonialSlider.offsetLeft;
        const walk = (x - startX) * 2;
        testimonialSlider.scrollLeft = scrollLeft - walk;
    });
}

// ========================================================================
// Initialize cart count on page load
// ========================================================================
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
}); 