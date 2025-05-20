// ========================================================================
// Cart functionality: add, remove, update, display, and checkout logic
// ========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // Cart Data Management
    // =========================
    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const cart = getCart();
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    // =========================
    // Cart Operations
    // =========================
    function addToCart(productId) {
        const cart = getCart();
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            // In a real app, you would fetch the product details from your backend
            const product = {
                id: productId,
                name: "Product " + productId, // This would be the actual product name
                price: 99.99, // This would be the actual product price
                quantity: 1
            };
            cart.push(product);
        }

        saveCart(cart);
        showNotification('Product added to cart!');
    }

    function removeFromCart(productId) {
        let cart = getCart();
        cart = cart.filter(item => item.id !== productId);
        saveCart(cart);
        showNotification('Product removed from cart!');
    }

    function updateQuantity(productId, quantity) {
        const cart = getCart();
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            item.quantity = Math.max(1, Math.min(10, quantity));
            saveCart(cart);
        }
    }

    function calculateTotal() {
        const cart = getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // =========================
    // Display Cart Items
    // =========================
    function displayCartItems() {
        const cartItems = document.querySelector('.cart-items');
        if (!cartItems) return;

        const cart = getCart();
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            return;
        }

        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="images/products/product${item.id}.jpg" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        // Update total
        const total = calculateTotal();
        const totalElement = document.querySelector('.cart-total');
        if (totalElement) {
            totalElement.textContent = `$${total.toFixed(2)}`;
        }
    }

    // =========================
    // Checkout Process
    // =========================
    function proceedToCheckout() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const cart = getCart();

        if (cart.length === 0) {
            showNotification('Your cart is empty!');
            return;
        }

        if (!isLoggedIn) {
            const loginModal = document.getElementById('login-modal');
            if (loginModal) {
                loginModal.classList.add('active');
            }
            return;
        }

        window.location.href = 'checkout.html';
    }

    // =========================
    // Notification Utility
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
    // Initialization
    // =========================
    updateCartCount();
    displayCartItems();

    // Make functions globally available
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateQuantity = updateQuantity;
    window.proceedToCheckout = proceedToCheckout;
}); 