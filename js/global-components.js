// ========================================================================
// Global Components Loader: navbar/footer injection, link handling, loader
// ========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // =========================
    // Helper: get correct path for components
    // =========================
    function getComponentPath(componentName) {
        // Always fetch from root for navbar.html and footer.html
        return componentName;
    }

    // =========================
    // Helper: load HTML component into element
    // =========================
    async function loadComponent(elementId, componentName) {
        try {
            const path = getComponentPath(componentName);
            console.log(`Loading ${componentName} from: ${path}`);
            
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Failed to load ${componentName}: ${response.status} ${response.statusText}`);
            }
            
            const html = await response.text();
            const element = document.getElementById(elementId);
            
            if (element) {
                element.innerHTML = html;
                console.log(`Successfully loaded ${componentName}`);
                return true;
            } else {
                console.error(`Element with id "${elementId}" not found`);
                return false;
            }
        } catch (error) {
            console.error(`Error loading ${componentName}:`, error);
            return false;
        }
    }

    // =========================
    // Load navbar and footer components
    // =========================
    Promise.all([
        loadComponent('global-header', 'navbar.html'),
        loadComponent('global-footer', 'footer.html')
    ]).then(([navbarLoaded, footerLoaded]) => {
        if (navbarLoaded && footerLoaded) {
            updateRelativePaths();
        }
    });

    // =========================
    // Update relative paths for links in navbar/footer
    // =========================
    function updateRelativePaths() {
        console.log('Updating relative paths...');
        
        // Update navbar links
        const navLinks = document.querySelectorAll('.navbar a, .mobile-menu a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http')) {
                const newHref = href.replace(/^\.\.\//, '');
                if (newHref !== href) {
                    console.log(`Updated navbar link: ${href} -> ${newHref}`);
                    link.href = newHref;
                }
            }
        });

        // Update footer links
        const footerLinks = document.querySelectorAll('.footer a');
        footerLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http')) {
                const newHref = href.replace(/^\.\.\//, '');
                if (newHref !== href) {
                    console.log(`Updated footer link: ${href} -> ${newHref}`);
                    link.href = newHref;
                }
            }
        });
        
        console.log('Finished updating relative paths');
    }
});

// ========================================================================
// Intercept internal link clicks and redirect to error.html if not found
// ========================================================================
function isInternalLink(href) {
    return href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('#');
}

document.addEventListener('click', function(event) {
    const link = event.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!isInternalLink(href)) return;

    // Only handle left-clicks without modifier keys
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    // Prevent default navigation
    event.preventDefault();

    // Check if the target exists
    fetch(href, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                window.location.href = href;
            } else {
                window.location.href = 'error.html';
            }
        })
        .catch(() => {
            window.location.href = 'error.html';
        });
});

// ========================================================================
// Page Loader Spinner: show spinner until page is fully loaded
// ========================================================================
(function() {
    // Create loader element
    var loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loader);

    // Inject CSS for loader
    var style = document.createElement('style');
    style.innerHTML = `
    #page-loader {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(255,255,255,0.95);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.3s;
    }
    #page-loader .spinner {
        width: 60px;
        height: 60px;
        border: 6px solid #EB5E28;
        border-top: 6px solid transparent;
        border-radius: 50%;
        animation: spin 2s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    `;
    document.head.appendChild(style);

    // Hide loader on window load
    window.addEventListener('load', function() {
        loader.style.opacity = '0';
        setTimeout(function() {
            loader.style.display = 'none';
        }, 400);
    });
})(); 