// ========================================================================
// Track Order: form validation, status timeline, and tracking info display
// ========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // =========================
    // Get form and timeline elements
    // =========================
    const trackOrderForm = document.getElementById('trackOrderForm');
    const statusTimeline = document.querySelector('.status-timeline');

    // =========================
    // Sample order status data (replace with backend in real app)
    // =========================
    const sampleOrders = {
        'ORD123456': {
            email: 'customer@example.com',
            status: 'shipped',
            trackingNumber: 'TRK789012',
            estimatedDelivery: '2024-03-15'
        }
    };

    // =========================
    // Handle form submission
    // =========================
    trackOrderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const orderNumber = document.getElementById('orderNumber').value;
        const email = document.getElementById('email').value;
        // Validate order number and email
        if (!orderNumber || !email) {
            showError('Please enter both order number and email address.');
            return;
        }
        // Check if order exists (simulate API call)
        if (sampleOrders[orderNumber] && sampleOrders[orderNumber].email === email) {
            const order = sampleOrders[orderNumber];
            updateOrderStatus(order.status);
            showTrackingInfo(order);
        } else {
            showError('Order not found. Please check your order number and email address.');
        }
    });

    // =========================
    // Update order status timeline
    // =========================
    function updateOrderStatus(status) {
        const steps = statusTimeline.querySelectorAll('.status-step');
        steps.forEach((step, index) => {
            const stepStatus = getStepStatus(index, status);
            step.className = `status-step ${stepStatus}`;
        });
    }

    // =========================
    // Determine step status (completed, active, pending)
    // =========================
    function getStepStatus(stepIndex, currentStatus) {
        const statusOrder = ['placed', 'processing', 'shipped', 'delivered'];
        const currentIndex = statusOrder.indexOf(currentStatus);
        if (stepIndex < currentIndex) {
            return 'completed';
        } else if (stepIndex === currentIndex) {
            return 'active';
        } else {
            return '';
        }
    }

    // =========================
    // Show tracking info below form
    // =========================
    function showTrackingInfo(order) {
        // Create tracking info element
        const trackingInfo = document.createElement('div');
        trackingInfo.className = 'tracking-info';
        trackingInfo.innerHTML = `
            <h3>Tracking Information</h3>
            <div class="tracking-details">
                <p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>
                <p><strong>Estimated Delivery:</strong> ${order.estimatedDelivery}</p>
                <p><strong>Status:</strong> ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
            </div>
        `;
        // Remove existing tracking info if any
        const existingInfo = document.querySelector('.tracking-info');
        if (existingInfo) {
            existingInfo.remove();
        }
        // Insert tracking info after the form
        trackOrderForm.parentNode.insertBefore(trackingInfo, trackOrderForm.nextSibling);
    }

    // =========================
    // Show error message below form
    // =========================
    function showError(message) {
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        // Remove existing error message if any
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        // Insert error message after the form
        trackOrderForm.parentNode.insertBefore(errorDiv, trackOrderForm.nextSibling);
        // Remove error message after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}); 