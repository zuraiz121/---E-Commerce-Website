// ========================================================================
// Products page: product data, display, filtering, searching, and helpers
// ========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // Sample product data (replace with backend in real app)
    // =========================
    // Sample product data (in a real app, this would come from a backend)
    const products = [
        {
            id: 1,
            name: "Wireless Headphones",
            price: 99.99,
            image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.webp?auto=compress&w=1200",
            category: "Electronics",
            rating: 4.5
        },
        {
            id: 2,
            name: "Smart Watch",
            price: 149.99,
            image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&w=1200",
            category: "Electronics",
            rating: 4.3
        },
        {
            id: 3,
            name: "Running Shoes",
            price: 79.99,
            image: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&w=1200",
            category: "Fashion",
            rating: 4.7
        },
        {
            id: 4,
            name: "Coffee Maker",
            price: 129.99,
            image: "https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg?auto=compress&w=1200",
            category: "Home",
            rating: 4.2
        },
        {
            id: 5,
            name: "Wireless Earbuds",
            price: 79.99,
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
            category: "Electronics",
            rating: 4.5
        },
        {
            id: 6,
            name: "Bluetooth Speaker",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
            category: "Electronics",
            rating: 4.3
        },
        {
            id: 7,
            name: "Mechanical Keyboard",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef",
            category: "Electronics",
            rating: 4.7
        },
        {
            id: 8,
            name: "Organic Cotton T-Shirt",
            price: 29.99,
            image: "https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg",
            category: "Fashion",
            rating: 4.2
        },
        {
            id: 9,
            name: "Denim Jacket",
            price: 89.99,
            image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
            category: "Fashion",
            rating: 4.4
        },
        {
            id: 10,
            name: "Leather Wallet",
            price: 49.99,
            image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
            category: "Fashion",
            rating: 4.6
        },
        {
            id: 11,
            name: "Ceramic Coffee Mug",
            price: 19.99,
            image: "https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg",
            category: "Home",
            rating: 4.3
        },
        {
            id: 12,
            name: "Stainless Steel Cookware Set",
            price: 149.99,
            image: "https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg",
            category: "Home",
            rating: 4.8
        },
        {
            id: 13,
            name: "Smart LED Light Bulb",
            price: 24.99,
            image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg",
            category: "Home",
            rating: 4.4
        },
        {
            id: 14,
            name: "Yoga Mat",
            price: 29.99,
            image: "https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg",
            category: "Sports",
            rating: 4.5
        },
        {
            id: 15,
            name: "Resistance Bands Set",
            price: 34.99,
            image: "https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg",
            category: "Sports",
            rating: 4.2
        },
        {
            id: 16,
            name: "Fitness Tracker",
            price: 79.99,
            image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
            category: "Sports",
            rating: 4.6
        },
        {
            id: 17,
            name: "Natural Face Cream",
            price: 24.99,
            image: "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg",
            category: "Beauty",
            rating: 4.4
        },
        {
            id: 18,
            name: "Bamboo Toothbrush",
            price: 9.99,
            image: "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg",
            category: "Beauty",
            rating: 4.7
        },
        {
            id: 19,
            name: "Essential Oil Set",
            price: 39.99,
            image: "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg",
            category: "Beauty",
            rating: 4.5
        },
        {
            id: 20,
            name: "Hair Care Kit",
            price: 49.99,
            image: "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg",
            category: "Beauty",
            rating: 4.3
        }
    ];

    // Load Featured Products
    function loadFeaturedProducts() {
        const productGrid = document.querySelector('.product-grid');
        if (!productGrid) return;

        productGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80'">
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

    // Generate Star Rating HTML
    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let starsHTML = '';

        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }

        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }

        return starsHTML;
    }

    // Filter Products
    function filterProducts(category) {
        const filteredProducts = category === 'all' 
            ? products 
            : products.filter(product => product.category === category);

        const productGrid = document.querySelector('.product-grid');
        if (!productGrid) return;

        productGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80'">
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

    // Search Products
    function searchProducts(query) {
        const searchResults = products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );

        const productGrid = document.querySelector('.product-grid');
        if (!productGrid) return;

        if (searchResults.length === 0) {
            productGrid.innerHTML = '<p class="no-results">No products found matching your search.</p>';
            return;
        }

        productGrid.innerHTML = searchResults.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80'">
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

    // Initialize
    loadFeaturedProducts();

    // Handle URL parameters for search
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
        searchProducts(searchQuery);
    }
}); 