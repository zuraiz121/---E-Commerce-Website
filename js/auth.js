// ========================================================================
// Authentication functionality for login, signup, and forgot password forms
// Handles simulated user session and UI updates for demo purposes
// ========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Get references to forms if they exist on the page
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');

    // =========================
    // Login form handling
    // =========================
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Get user input values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;

            // Simulate credential validation (replace with backend call in production)
            if (email && password) {
                // Store user session in localStorage or sessionStorage
                if (remember) {
                    localStorage.setItem('user', JSON.stringify({ email }));
                } else {
                    sessionStorage.setItem('user', JSON.stringify({ email }));
                }
                // Redirect to home page after login
                window.location.href = 'index.html';
            } else {
                alert('Please enter both email and password');
            }
        });
    }

    // =========================
    // Signup form handling
    // =========================
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Get user input values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Basic validation for signup fields
            if (!email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            if (password.length < 8) {
                alert('Password must be at least 8 characters long');
                return;
            }
            // Simulate successful registration (replace with backend call in production)
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        });
    }

    // =========================
    // Forgot password form handling
    // =========================
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Get user email
            const email = document.getElementById('email').value;
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            // Simulate sending password reset instructions
            alert('Password reset instructions have been sent to your email');
            window.location.href = 'login.html';
        });
    }

    // =========================
    // Check if user is already logged in and update UI
    // =========================
    function checkAuth() {
        // Retrieve user from localStorage or sessionStorage
        const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            // Update login button to "My Account" if user is logged in
            const loginBtn = document.querySelector('.login-btn');
            if (loginBtn) {
                loginBtn.textContent = 'My Account';
                loginBtn.href = 'account.html';
            }
        }
    }

    // Run authentication check on page load
    checkAuth();
}); 