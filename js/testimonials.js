// ========================================================================
// Testimonials Slider: dynamic slides, navigation, and auto-play logic
// ========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // Sample testimonials data (replace with backend in real app)
    // =========================
    const testimonials = [
        {
            name: "Alex M.",
            location: "Karachi, PK",
            rating: 5,
            text: "Fast delivery and excellent packaging! The product quality exceeded my expectations. Will definitely shop here again.",
            avatar: "https://i.pravatar.cc/150?img=1"
        },
        {
            name: "Sarah K.",
            location: "Toronto, CA",
            rating: 5,
            text: "Amazing customer service! They helped me find exactly what I needed and the shipping was incredibly fast.",
            avatar: "https://i.pravatar.cc/150?img=2"
        },
        {
            name: "Mohammed R.",
            location: "Dubai, UAE",
            rating: 5,
            text: "The international shipping was surprisingly quick. Products arrived in perfect condition. Highly recommended!",
            avatar: "https://i.pravatar.cc/150?img=3"
        },
        {
            name: "Emma L.",
            location: "Sydney, AU",
            rating: 5,
            text: "Best online shopping experience ever! The website is easy to navigate and the prices are unbeatable.",
            avatar: "https://i.pravatar.cc/150?img=4"
        },
        {
            name: "Carlos D.",
            location: "Mexico City, MX",
            rating: 5,
            text: "Great selection of products and competitive prices. The customer support team is very responsive.",
            avatar: "https://i.pravatar.cc/150?img=5"
        },
        {
            name: "Yuki T.",
            location: "Tokyo, JP",
            rating: 5,
            text: "I'm impressed with the attention to detail in packaging. Everything arrives perfectly protected.",
            avatar: "https://i.pravatar.cc/150?img=6"
        },
        {
            name: "Sophie M.",
            location: "Paris, FR",
            rating: 5,
            text: "The product quality is outstanding! I've been shopping here for years and have never been disappointed.",
            avatar: "https://i.pravatar.cc/150?img=7"
        },
        {
            name: "James W.",
            location: "London, UK",
            rating: 5,
            text: "Fast shipping and excellent customer service. The products always arrive in perfect condition.",
            avatar: "https://i.pravatar.cc/150?img=8"
        },
        {
            name: "Aisha P.",
            location: "Mumbai, IN",
            rating: 5,
            text: "I love the variety of products available. The prices are competitive and the quality is top-notch.",
            avatar: "https://i.pravatar.cc/150?img=9"
        },
        {
            name: "David K.",
            location: "Seoul, KR",
            rating: 5,
            text: "The customer support team is incredibly helpful. They resolved my issue within minutes!",
            avatar: "https://i.pravatar.cc/150?img=10"
        },
        {
            name: "Maria G.",
            location: "Madrid, ES",
            rating: 5,
            text: "Best online shopping experience ever! The website is easy to navigate and the products are amazing.",
            avatar: "https://i.pravatar.cc/150?img=11"
        },
        {
            name: "Thomas A.",
            location: "Berlin, DE",
            rating: 5,
            text: "I'm impressed with the attention to detail in packaging and delivery. Everything arrives perfectly.",
            avatar: "https://i.pravatar.cc/150?img=12"
        },
        {
            name: "Nina P.",
            location: "Moscow, RU",
            rating: 5,
            text: "The product selection is incredible. I always find exactly what I'm looking for.",
            avatar: "https://i.pravatar.cc/150?img=13"
        },
        {
            name: "Daniel L.",
            location: "Toronto, CA",
            rating: 5,
            text: "Great prices and even better quality. I've recommended this store to all my friends.",
            avatar: "https://i.pravatar.cc/150?img=14"
        },
        {
            name: "Sophia W.",
            location: "Hong Kong",
            rating: 5,
            text: "The attention to customer satisfaction is remarkable. I'm a loyal customer for life!",
            avatar: "https://i.pravatar.cc/150?img=15"
        },
        {
            name: "Rahul S.",
            location: "Delhi, IN",
            rating: 5,
            text: "Shopping here has been a game-changer. The products are exactly as described.",
            avatar: "https://i.pravatar.cc/150?img=16"
        },
        {
            name: "Anna K.",
            location: "Warsaw, PL",
            rating: 5,
            text: "The international shipping is fast and reliable. I'm very satisfied with my purchases.",
            avatar: "https://i.pravatar.cc/150?img=17"
        },
        {
            name: "Ahmed H.",
            location: "Cairo, EG",
            rating: 5,
            text: "The quality of products exceeds my expectations every time. Highly recommended!",
            avatar: "https://i.pravatar.cc/150?img=18"
        },
        {
            name: "Isabella R.",
            location: "Rome, IT",
            rating: 5,
            text: "Excellent service and product quality. The website is user-friendly and secure.",
            avatar: "https://i.pravatar.cc/150?img=19"
        },
        {
            name: "Lucas S.",
            location: "São Paulo, BR",
            rating: 5,
            text: "I love how easy it is to track my orders. The delivery updates are very helpful.",
            avatar: "https://i.pravatar.cc/150?img=20"
        }
    ];

    // =========================
    // Initialize slider and state
    // =========================
    const slider = document.querySelector('.testimonial-slider');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 2000; // 2 seconds

    // =========================
    // Create slides with error handling for images
    // =========================
    function createSlides() {
        testimonials.forEach((testimonial, index) => {
            const slide = document.createElement('div');
            slide.className = `testimonial-slide ${index === 0 ? 'active' : ''}`;
            slide.innerHTML = `
                <div class="testimonial-card">
                    <div class="rating">★★★★★</div>
                    <p class="testimonial-text">"${testimonial.text}"</p>
                    <div class="customer-info">
                        <img src="${testimonial.avatar}" 
                             alt="${testimonial.name}" 
                             class="customer-avatar"
                             onerror="this.src='https://via.placeholder.com/150?text=User'">
                        <div class="customer-details">
                            <h4>${testimonial.name}</h4>
                            <p class="customer-location">${testimonial.location}</p>
                        </div>
                    </div>
                </div>
            `;
            slider.appendChild(slide);
        });
    }

    // =========================
    // Create navigation dots
    // =========================
    function createDots() {
        const nav = document.createElement('div');
        nav.className = 'slider-nav';
        testimonials.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            nav.appendChild(dot);
        });
        slider.parentElement.appendChild(nav);
    }

    // =========================
    // Create navigation arrows
    // =========================
    function createArrows() {
        const prevArrow = document.createElement('button');
        prevArrow.className = 'slider-arrow slider-prev';
        prevArrow.innerHTML = '❮';
        prevArrow.setAttribute('aria-label', 'Previous testimonial');
        prevArrow.addEventListener('click', () => goToSlide(currentSlide - 1));
        const nextArrow = document.createElement('button');
        nextArrow.className = 'slider-arrow slider-next';
        nextArrow.innerHTML = '❯';
        nextArrow.setAttribute('aria-label', 'Next testimonial');
        nextArrow.addEventListener('click', () => goToSlide(currentSlide + 1));
        slider.parentElement.appendChild(prevArrow);
        slider.parentElement.appendChild(nextArrow);
    }

    // =========================
    // Go to a specific slide
    // =========================
    function goToSlide(index) {
        const slides = slider.querySelectorAll('.testimonial-slide');
        const dots = slider.parentElement.querySelectorAll('.slider-dot');
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    // =========================
    // Auto-play slider
    // =========================
    function startSliding() {
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, slideDuration);
    }
    function pauseSliding() {
        clearInterval(slideInterval);
    }

    // =========================
    // Initialize slider
    // =========================
    function initSlider() {
        createSlides();
        createDots();
        createArrows();
        startSliding();
        // Pause on hover
        slider.addEventListener('mouseenter', pauseSliding);
        slider.addEventListener('mouseleave', startSliding);
    }

    // =========================
    // Touch/Swipe support (optional)
    // =========================
    function handleSwipe() {
        // ... swipe logic ...
    }

    // =========================
    // Start everything
    // =========================
    initSlider();
}); 