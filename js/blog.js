// ========================================================================
// Blog page interactivity: search, filter, navigation, and UI effects
// ========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // =========================
    // Search functionality
    // =========================
    const searchForm = document.querySelector('.search-form');
    const searchInput = searchForm.querySelector('input');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm) {
            // In a real application, this would make an API call
            // For now, we'll just show an alert
            alert(`Searching for: ${searchTerm}`);
            searchInput.value = '';
        }
    });

    // =========================
    // Category filtering
    // =========================
    const categoryLinks = document.querySelectorAll('.category-list a');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.textContent.split('(')[0].trim();
            
            // Remove active class from all links
            categoryLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // In a real application, this would filter posts by category
            alert(`Filtering by category: ${category}`);
        });
    });

    // =========================
    // Tag filtering
    // =========================
    const tagLinks = document.querySelectorAll('.tag-cloud a');
    
    tagLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tag = this.textContent.trim();
            
            // Remove active class from all tags
            tagLinks.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tag
            this.classList.add('active');
            
            // In a real application, this would filter posts by tag
            alert(`Filtering by tag: ${tag}`);
        });
    });

    // =========================
    // Read More links
    // =========================
    const readMoreLinks = document.querySelectorAll('.read-more');
    
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const postTitle = this.closest('.blog-post').querySelector('h2, h3').textContent;
            
            // In a real application, this would navigate to the full post
            alert(`Reading full post: ${postTitle}`);
        });
    });

    // =========================
    // Recent posts links
    // =========================
    const recentPostLinks = document.querySelectorAll('.recent-posts a');
    
    recentPostLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const postTitle = this.querySelector('h4').textContent;
            
            // In a real application, this would navigate to the post
            alert(`Reading post: ${postTitle}`);
        });
    });

    // =========================
    // Add hover effect to blog posts
    // =========================
    const blogPosts = document.querySelectorAll('.blog-post');
    
    blogPosts.forEach(post => {
        post.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        post.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}); 