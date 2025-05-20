// ========================================================================
// Checkout page: display cart, validate payment, and handle order placement
// ========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // Get form and items container
    // =========================
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutItems = document.getElementById('checkout-items');

    // =========================
    // Display cart items in checkout
    // =========================
    function displayCheckoutItems() {
        if (cart.length === 0) {
            window.location.href = 'cart.html';
            return;
        }

        checkoutItems.innerHTML = cart.map(item => `
            <div class="checkout-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Quantity: ${item.quantity}</p>
                    <p>$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        `).join('');

        updateCheckoutSummary();
    }

    // =========================
    // Update checkout summary
    // =========================
    function updateCheckoutSummary() {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 10 : 0;
        const tax = subtotal * 0.1;
        const total = subtotal + shipping + tax;

        document.getElementById('checkout-subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('checkout-shipping').textContent = `$${shipping.toFixed(2)}`;
        document.getElementById('checkout-tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('checkout-total').textContent = `$${total.toFixed(2)}`;
    }

    // =========================
    // Form validation for payment fields
    // =========================
    function validateForm() {
        const cardNumber = document.getElementById('cardNumber').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;

        // Basic card number validation (16 digits)
        if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
            alert('Please enter a valid 16-digit card number');
            return false;
        }

        // Expiry date validation (MM/YY format)
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
            alert('Please enter a valid expiry date (MM/YY)');
            return false;
        }

        // CVV validation (3 or 4 digits)
        if (!/^\d{3,4}$/.test(cvv)) {
            alert('Please enter a valid CVV (3 or 4 digits)');
            return false;
        }

        return true;
    }

    // =========================
    // Handle form submission
    // =========================
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!validateForm()) {
                return;
            }

            // Here you would typically send the order to a backend
            // For demo purposes, we'll just show a success message
            alert('Order placed successfully!');
            
            // Clear cart and redirect to home page
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        });
    }

    // =========================
    // Format card number input
    // =========================
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '');
            if (value.length > 16) {
                value = value.slice(0, 16);
            }
            e.target.value = value.replace(/(\d{4})/g, '$1 ').trim();
        });
    }

    // =========================
    // Format expiry date input
    // =========================
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    // =========================
    // Format CVV input
    // =========================
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
        });
    }

    // =========================
    // Initialize checkout display
    // =========================
    displayCheckoutItems();
}); 