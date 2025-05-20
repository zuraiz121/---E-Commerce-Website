// ========================================================================
// Category page: dynamic filtering, sorting, and UI updates for products
// ========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // Get category from URL and update page
    // =========================
    const category = window.location.pathname.split('/').pop().replace('.html', '');
    
    // Update page title and banner
    document.title = `${category.charAt(0).toUpperCase() + category.slice(1)} Products - ShopNow`;
    document.querySelector('.category-banner').classList.add(category);
    document.querySelector('.banner-content h1').textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Products`;
    document.querySelector('.current-category').textContent = category.charAt(0).toUpperCase() + category.slice(1);

    // =========================
    // Initialize filter controls
    // =========================
    const priceSlider = document.getElementById('price-slider');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const ratingCheckboxes = document.querySelectorAll('.rating-filters input');
    const sortSelect = document.getElementById('sort-by');
    const applyFiltersBtn = document.querySelector('.apply-filters');

    // Set initial max price from slider
    maxPriceInput.value = priceSlider.value;

    // Update max price input when slider changes
    priceSlider.addEventListener('input', () => {
        maxPriceInput.value = priceSlider.value;
    });

    // =========================
    // Filtering and sorting logic
    // =========================
    function filterAndSortProducts() {
        const minPrice = parseFloat(minPriceInput.value) || 0;
        const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
        const selectedRatings = Array.from(ratingCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => parseInt(cb.value));
        const sortBy = sortSelect.value;

        // Filter products by category first
        let filteredProducts = products.filter(product => 
            product.category.toLowerCase() === category
        );

        // Apply price filter
        filteredProducts = filteredProducts.filter(product => 
            product.price >= minPrice && product.price <= maxPrice
        );

        // Apply rating filter
        if (selectedRatings.length > 0) {
            filteredProducts = filteredProducts.filter(product => 
                selectedRatings.some(rating => product.rating >= rating)
            );
        }

        // Sort products
        switch (sortBy) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            default: // 'featured'
                // Keep original order
                break;
        }

        // Update results count
        document.querySelector('.results-count span').textContent = filteredProducts.length;

        // Display products
        const productGrid = document.querySelector('.product-grid');
        if (filteredProducts.length === 0) {
            productGrid.innerHTML = '<p class="no-results">No products found matching your criteria.</p>';
            return;
        }

        productGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-rating">
                        ${generateStars(product.rating)}
                        <span>(${product.rating})</span>
                    </div>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <button onclick="addToCart(${product.id})" class="add-to-cart-btn">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    }

    // =========================
    // Event listeners for filters and sorting
    // =========================
    applyFiltersBtn.addEventListener('click', filterAndSortProducts);
    sortSelect.addEventListener('change', filterAndSortProducts);

    // =========================
    // Mobile filter sidebar toggle
    // =========================
    const filterToggle = document.createElement('button');
    filterToggle.className = 'filter-toggle';
    filterToggle.innerHTML = '<i class="fas fa-filter"></i> Filters';
    document.querySelector('.products-header').prepend(filterToggle);

    filterToggle.addEventListener('click', () => {
        document.querySelector('.filter-sidebar').classList.toggle('active');
    });

    // Close filter sidebar when clicking outside
    document.addEventListener('click', (e) => {
        const sidebar = document.querySelector('.filter-sidebar');
        const toggle = document.querySelector('.filter-toggle');
        
        if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });

    // =========================
    // Initial load
    // =========================
    filterAndSortProducts();
}); 