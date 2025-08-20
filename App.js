// Enhanced mobile menu functionality with improved performance
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLinks = document.querySelectorAll('.navbar__links');
const body = document.body;

// Mobile menu toggle with smooth animations
if (menu && menuLinks) {
    menu.addEventListener('click', function(e) {
        e.preventDefault();
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (menuLinks.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('is-active');
            menuLinks.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !menuLinks.contains(e.target) && menuLinks.classList.contains('active')) {
            menu.classList.remove('is-active');
            menuLinks.classList.remove('active');
            body.style.overflow = 'auto';
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuLinks.classList.contains('active')) {
            menu.classList.remove('is-active');
            menuLinks.classList.remove('active');
            body.style.overflow = 'auto';
        }
    });
}

// Smooth scrolling for internal links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for navbar height
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Enhanced navbar scroll effect with throttling
let lastScrollY = window.scrollY;
let isScrolling = false;

function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.style.background = 'rgba(19, 19, 19, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
        
        // Hide navbar on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    } else {
        navbar.style.background = 'rgba(19, 19, 19, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
    isScrolling = false;
}

// Throttled scroll event
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        requestAnimationFrame(handleNavbarScroll);
        isScrolling = true;
    }
});

// Intersection Observer for fade-in animations with stagger effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger delay for multiple elements
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('visible');
            }, index * 100);
            
            // Stop observing once animated
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize fade-in animations
document.addEventListener('DOMContentLoaded', function() {
    // Observe fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        fadeObserver.observe(el);
    });

    // Initialize particle animation
    createParticles();
});

// Particle animation for visual enhancement
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 20;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(${Math.random() > 0.5 ? '255, 129, 119' : '33, 212, 253'}, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: 100%;
        animation: floatUp ${duration}s ${delay}s linear infinite;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            // Create new particle to replace it
            createParticle(container);
        }
    }, (duration + delay) * 1000);
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .particles-container {
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// Enhanced button loading states
function addButtonLoadingStates() {
    document.querySelectorAll('.main__btn, .button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Don't add loading to external links or forms
            const link = this.querySelector('a');
            if (link && (link.target === '_blank' || link.href.includes('google.com'))) {
                return;
            }
            
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                this.style.pointerEvents = 'none';
                
                // Create loading spinner
                const spinner = document.createElement('div');
                spinner.className = 'btn-spinner';
                spinner.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 20px;
                    height: 20px;
                    margin: -10px 0 0 -10px;
                    border: 2px solid transparent;
                    border-top: 2px solid #fff;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                `;
                
                this.appendChild(spinner);
                
                // Hide button text
                const btnText = this.querySelector('a') || this;
                const originalText = btnText.textContent;
                btnText.style.opacity = '0';
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.style.pointerEvents = 'auto';
                    if (this.contains(spinner)) {
                        this.removeChild(spinner);
                    }
                    btnText.style.opacity = '1';
                }, 1500);
            }
        });
    });
}

// Initialize button loading states when DOM is ready
document.addEventListener('DOMContentLoaded', addButtonLoadingStates);

// Preload critical resources
function preloadResources() {
    const criticalPages = ['/tech.html', '/impact.html', '/product.html', '/feedback.html'];
    
    criticalPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
    });
}

// Initialize preloading after a delay
setTimeout(preloadResources, 2000);

// Enhanced form handling (for feedback page)
function enhanceFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4444';
                    input.classList.add('error');
                } else {
                    input.style.borderColor = '';
                    input.classList.remove('error');
                }
            });
            
            // Email validation
            const emailInputs = form.querySelectorAll('input[type="email"]');
            emailInputs.forEach(email => {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email.value)) {
                    isValid = false;
                    email.style.borderColor = '#ff4444';
                    email.classList.add('error');
                }
            });
            
            if (isValid) {
                // Show success message
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                form.reset();
            } else {
                showNotification('Please fill in all required fields correctly.', 'error');
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(45deg, #f44336, #d32f2f)';
            break;
        default:
            notification.style.background = 'linear-gradient(45deg, #2196F3, #1976D2)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Initialize enhanced form handling
document.addEventListener('DOMContentLoaded', enhanceFormHandling);

// Performance monitoring
function performanceMonitoring() {
    // Log page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
        
        // Show warning for slow load times
        if (loadTime > 3000) {
            console.warn('Page load time is slow. Consider optimizing resources.');
        }
    });
}

// Initialize performance monitoring
performanceMonitoring();