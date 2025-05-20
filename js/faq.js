// ========================================================================
// FAQ page: accordion toggle and accessibility for questions/answers
// ========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // =========================
    // Get all FAQ items
    // =========================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        // =========================
        // Toggle FAQ item on click
        // =========================
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });

        // =========================
        // Keyboard accessibility (Enter/Space)
        // =========================
        question.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}); 