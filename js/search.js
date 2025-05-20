// ========================================================================
// Search bar: live suggestions, product search, and navigation logic
// ========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // Get search bar elements
    // =========================
    const searchBar = document.querySelector('.search-bar');
    const searchInput = searchBar.querySelector('input');
    const searchButton = searchBar.querySelector('button');
    let searchTimeout;

    // =========================
    // Create suggestions container
    // =========================
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'search-suggestions';
    searchBar.appendChild(suggestionsContainer);

    // =========================
    // Sample product data (replace with backend in real app)
    // =========================
    const products = [
        {
            id: 1,
            name: "Wireless Headphones",
            price: 99.99,
            image: "images/products/headphones.jpg",
            category: "Electronics"
        },
        {
            id: 2,
            name: "Smart Watch",
            price: 149.99,
            image: "images/products/smartwatch.jpg",
            category: "Electronics"
        },
        {
            id: 3,
            name: "Running Shoes",
            price: 79.99,
            image: "images/products/shoes.jpg",
            category: "Fashion"
        },
        {
            id: 4,
            name: "Coffee Maker",
            price: 129.99,
            image: "images/products/coffee-maker.jpg",
            category: "Home"
        }
    ];

    // =========================
    // Search function: filter products by query
    // =========================
    function searchProducts(query) {
        if (!query.trim()) {
            suggestionsContainer.classList.remove('active');
            return;
        }
        const searchResults = products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );
        displaySuggestions(searchResults);
    }

    // =========================
    // Display search suggestions
    // =========================
    function displaySuggestions(results) {
        if (results.length === 0) {
            suggestionsContainer.innerHTML = '<div class="no-results">No products found</div>';
        } else {
            suggestionsContainer.innerHTML = results.map(product => `
                <div class="suggestion-item" data-product-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="suggestion-info">
                        <h4>${product.name}</h4>
                        <p>$${product.price.toFixed(2)}</p>
                    </div>
                </div>
            `).join('');
        }
        suggestionsContainer.classList.add('active');
    }

    // =========================
    // Handle input changes with debounce
    // =========================
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchProducts(e.target.value);
        }, 300);
    });

    // =========================
    // Handle search button click
    // =========================
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
        }
    });

    // =========================
    // Handle suggestion clicks
    // =========================
    suggestionsContainer.addEventListener('click', (e) => {
        const suggestionItem = e.target.closest('.suggestion-item');
        if (suggestionItem) {
            const productId = suggestionItem.dataset.productId;
            window.location.href = `product-detail.html?id=${productId}`;
        }
    });

    // =========================
    // Close suggestions when clicking outside
    // =========================
    document.addEventListener('click', (e) => {
        if (!searchBar.contains(e.target)) {
            suggestionsContainer.classList.remove('active');
        }
    });

    // =========================
    // Handle keyboard navigation
    // =========================
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
            window.location.href = `shop.html?search=${encodeURIComponent(searchInput.value.trim())}`;
        } else if (e.key === 'Escape') {
            suggestionsContainer.classList.remove('active');
        }
    });
}); 