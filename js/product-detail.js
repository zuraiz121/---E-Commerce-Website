// ========================================================================
// Product Detail Page: gallery, variants, tabs, cart, wishlist, related
// ========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // Image Gallery
    // =========================
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    function changeImage(src) {
        mainImage.src = src;
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        event.target.classList.add('active');
    }

    // =========================
    // Color Selection
    // =========================
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });

    // =========================
    // Quantity Selector
    // =========================
    const quantityInput = document.getElementById('quantity');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');

    minusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    });

    quantityInput.addEventListener('change', () => {
        const value = parseInt(quantityInput.value);
        if (value < 1) quantityInput.value = 1;
        if (value > 10) quantityInput.value = 10;
    });

    // =========================
    // Tabs Functionality
    // =========================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Show selected tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });

    // =========================
    // Add to Cart Functionality
    // =========================
    window.addToCart = function() {
        const product = {
            id: 1, // This would come from your product data
            name: document.querySelector('.product-info h1').textContent,
            price: parseFloat(document.querySelector('.current-price').textContent.replace('$', '')),
            image: mainImage.src,
            quantity: parseInt(quantityInput.value),
            color: document.querySelector('.color-option.active').getAttribute('data-color')
        };
        // Get existing cart or initialize empty array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        // Check if product already exists in cart
        const existingItem = cart.find(item => 
            item.id === product.id && item.color === product.color
        );
        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            cart.push(product);
        }
        // Save updated cart
        localStorage.setItem('cart', JSON.stringify(cart));
        // Update cart count
        updateCartCount();
        // Show success message
        showNotification('Product added to cart!');
    };

    // =========================
    // Wishlist Functionality
    // =========================
    const wishlistBtn = document.querySelector('.wishlist-btn');
    wishlistBtn.addEventListener('click', () => {
        wishlistBtn.classList.toggle('active');
        const icon = wishlistBtn.querySelector('i');
        if (wishlistBtn.classList.contains('active')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            showNotification('Added to wishlist!');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            showNotification('Removed from wishlist!');
        }
    });

    // =========================
    // Related Products Slider
    // =========================
    const productSlider = document.querySelector('.product-slider');
    if (productSlider) {
        // Sample related products data
        const relatedProducts = [
            {
                id: 2,
                name: "Wireless Earbuds",
                price: 79.99,
                image: "images/products/earbuds.jpg"
            },
            {
                id: 3,
                name: "Bluetooth Speaker",
                price: 89.99,
                image: "images/products/speaker.jpg"
            },
            {
                id: 4,
                name: "Noise Cancelling Headphones",
                price: 149.99,
                image: "images/products/headphones-pro.jpg"
            }
        ];
        // Display related products
        productSlider.innerHTML = relatedProducts.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <button onclick="window.location.href='product-detail.html?id=${product.id}'" class="view-btn">
                        View Details
                    </button>
                </div>
            </div>
        `).join('');
    }

    // =========================
    // Notification Function
    // =========================
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // =========================
    // Update cart count in header
    // =========================
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    // =========================
    // Initialize
    // =========================
    updateCartCount();
}); 