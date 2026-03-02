// ===== INITIALIZE AOS (Animate On Scroll) =====
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

// ===== MOBILE MENU TOGGLE =====
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Update ARIA attribute
        const isExpanded = navMenu.classList.contains('active');
        mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== HERO CAROUSEL =====
let heroCurrentSlide = 0;
const heroSlides = document.querySelectorAll('.carousel-slide');
const heroIndicators = document.querySelectorAll('.indicator');
const heroPrevBtn = document.querySelector('.carousel-control.prev');
const heroNextBtn = document.querySelector('.carousel-control.next');
let heroAutoplayInterval;

// Show specific slide
function showHeroSlide(index) {
    // Remove active class from all slides and indicators
    heroSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (heroIndicators[i]) {
            heroIndicators[i].classList.remove('active');
        }
    });
    
    // Calculate the correct index (wrap around)
    heroCurrentSlide = (index + heroSlides.length) % heroSlides.length;
    
    // Add active class to current slide and indicator
    heroSlides[heroCurrentSlide].classList.add('active');
    if (heroIndicators[heroCurrentSlide]) {
        heroIndicators[heroCurrentSlide].classList.add('active');
    }
}

// Next slide
function nextHeroSlide() {
    showHeroSlide(heroCurrentSlide + 1);
}

// Previous slide
function prevHeroSlide() {
    showHeroSlide(heroCurrentSlide - 1);
}

// Auto-play carousel
function startAutoplay() {
    heroAutoplayInterval = setInterval(nextHeroSlide, 5000);
}

function stopAutoplay() {
    clearInterval(heroAutoplayInterval);
}

// Event listeners for carousel controls
if (heroPrevBtn) {
    heroPrevBtn.addEventListener('click', () => {
        prevHeroSlide();
        stopAutoplay();
        startAutoplay();
    });
}

if (heroNextBtn) {
    heroNextBtn.addEventListener('click', () => {
        nextHeroSlide();
        stopAutoplay();
        startAutoplay();
    });
}

// Event listeners for indicators
heroIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showHeroSlide(index);
        stopAutoplay();
        startAutoplay();
    });
});

// Touch support for carousel (swipe on mobile)
let touchStartX = 0;
let touchEndX = 0;

const heroCarousel = document.querySelector('.hero-carousel');

if (heroCarousel) {
    heroCarousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroCarousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next slide
        nextHeroSlide();
        stopAutoplay();
        startAutoplay();
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous slide
        prevHeroSlide();
        stopAutoplay();
        startAutoplay();
    }
}

// Start autoplay if carousel exists
if (heroSlides.length > 0) {
    startAutoplay();
}

// Pause autoplay when user hovers over carousel
if (heroCarousel) {
    heroCarousel.addEventListener('mouseenter', stopAutoplay);
    heroCarousel.addEventListener('mouseleave', startAutoplay);
}

// ===== PORTFOLIO CAROUSEL (AUTO-SCROLL ON MOBILE) =====
const portfolioTrack = document.getElementById('portfolioTrack');
const portfolioItems = document.querySelectorAll('.portfolio-item');
let portfolioIndex = 0;
let portfolioAutoScroll;

function isTabletOrMobile() {
    return window.innerWidth <= 1024;
}

function autoScrollPortfolio() {
    if (isTabletOrMobile() && portfolioTrack && portfolioItems.length > 0) {
        portfolioAutoScroll = setInterval(() => {
            portfolioIndex = (portfolioIndex + 1) % portfolioItems.length;
            const itemWidth = portfolioItems[0].offsetWidth;
            const gap = 32; // 2rem gap
            const offset = portfolioIndex * (itemWidth + gap);
            portfolioTrack.style.transform = `translateX(-${offset}px)`;
        }, 4000);
    }
}

function stopPortfolioScroll() {
    if (portfolioAutoScroll) {
        clearInterval(portfolioAutoScroll);
    }
}

// Start portfolio auto-scroll on mobile
if (portfolioTrack) {
    autoScrollPortfolio();
    
    // Reset on window resize
    window.addEventListener('resize', () => {
        stopPortfolioScroll();
        portfolioIndex = 0;
        if (portfolioTrack) {
            portfolioTrack.style.transform = 'translateX(0)';
        }
        autoScrollPortfolio();
    });
    
    // Pause on hover (desktop)
    portfolioTrack.addEventListener('mouseenter', stopPortfolioScroll);
    portfolioTrack.addEventListener('mouseleave', autoScrollPortfolio);
}

// ===== STATISTICS COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

function animateStats() {
    if (animated) return;
    
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    
    const rect = statsSection.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isInView) {
        animated = true;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
}

// Trigger animation on scroll
window.addEventListener('scroll', animateStats);
// Also check on page load
animateStats();

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignore empty hash or just '#'
        if (href === '#' || href === '') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            if (history.pushState) {
                history.pushState(null, '', href);
            } else {
                window.location.hash = href;
            }
            const offset = 100; // Offset for fixed navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ACTIVE NAVIGATION LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}` || 
                    link.getAttribute('href') === `${sectionId}.html`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===== LAZY LOADING IMAGES =====
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===== FORM VALIDATION (FOR CONTACT PAGE) =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        // Simple validation
        if (name && name.value.trim() === '') {
            showError(name, 'Name is required');
            isValid = false;
        } else if (name) {
            clearError(name);
        }
        
        if (email && !isValidEmail(email.value)) {
            showError(email, 'Valid email is required');
            isValid = false;
        } else if (email) {
            clearError(email);
        }
        
        if (message && message.value.trim() === '') {
            showError(message, 'Message is required');
            isValid = false;
        } else if (message) {
            clearError(message);
        }
        
        if (isValid) {
            // Form is valid - submit or show success message
            showSuccessMessage('Thank you! Your message has been sent successfully.');
            contactForm.reset();
        }
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message') || document.createElement('small');
    error.className = 'error-message';
    error.style.color = '#e74c3c';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    error.style.display = 'block';
    error.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }
    
    input.style.borderColor = '#e74c3c';
}

function clearError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    
    if (error) {
        error.remove();
    }
    
    input.style.borderColor = '';
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideInRight 0.5s ease;
    `;
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            successDiv.remove();
        }, 500);
    }, 3000);
}

// ===== KEYBOARD ACCESSIBILITY =====
// Allow keyboard navigation for carousel controls
document.querySelectorAll('.carousel-control, .indicator').forEach(button => {
    button.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click();
        }
    });
});

// ===== PREVENT SCROLL HIJACKING =====
// Ensure smooth scroll doesn't interfere with normal scrolling
let isScrolling = false;

window.addEventListener('wheel', () => {
    isScrolling = true;
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 100);
}, { passive: true });

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Refresh AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate positions after resize
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 250);
});




// ===== IMAGE SLIDESHOW FUNCTIONALITY =====
const slideshowSlides = document.querySelectorAll('.slideshow-slide');
const slideshowPrev = document.querySelector('.slideshow-prev');
const slideshowNext = document.querySelector('.slideshow-next');
const indicatorDots = document.querySelectorAll('.indicator-dot');
let currentSlideIndex = 0;
let slideshowInterval;

function showSlide(index) {
    // Remove active class from all slides and indicators
    slideshowSlides.forEach(slide => slide.classList.remove('active'));
    indicatorDots.forEach(dot => dot.classList.remove('active'));
    
    // Calculate the correct index (wrap around)
    currentSlideIndex = (index + slideshowSlides.length) % slideshowSlides.length;
    
    // Add active class to current slide and indicator
    slideshowSlides[currentSlideIndex].classList.add('active');
    indicatorDots[currentSlideIndex].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

function prevSlide() {
    showSlide(currentSlideIndex - 1);
}

// Auto-play slideshow (fast - every 3 seconds)
function startSlideshow() {
    slideshowInterval = setInterval(nextSlide, 3000);
}

function stopSlideshow() {
    clearInterval(slideshowInterval);
}

// Event listeners for navigation
if (slideshowPrev) {
    slideshowPrev.addEventListener('click', () => {
        prevSlide();
        stopSlideshow();
        startSlideshow();
    });
}

if (slideshowNext) {
    slideshowNext.addEventListener('click', () => {
        nextSlide();
        stopSlideshow();
        startSlideshow();
    });
}

// Event listeners for indicators
indicatorDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        stopSlideshow();
        startSlideshow();
    });
});

// Pause slideshow on hover (desktop only)
const slideshowContainer = document.querySelector('.slideshow-container');
if (slideshowContainer && window.innerWidth > 768) {
    slideshowContainer.addEventListener('mouseenter', stopSlideshow);
    slideshowContainer.addEventListener('mouseleave', startSlideshow);
}

// Touch/Swipe support for mobile
if (slideshowContainer) {
    let touchStartX = 0;
    let touchEndX = 0;
    
    slideshowContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slideshowContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    }, { passive: true });
    
    function handleSwipeGesture() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next slide
            nextSlide();
            stopSlideshow();
            startSlideshow();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous slide
            prevSlide();
            stopSlideshow();
            startSlideshow();
        }
    }
}

// Start slideshow automatically if slides exist
if (slideshowSlides.length > 0) {
    startSlideshow();
}



// ===== CONSOLE GREETING =====
console.log('%c🎨 CRENOVA STUDIO', 'font-size: 24px; font-weight: bold; color: #0a3d62;');
console.log('%cCreative Excellence Made in Nigeria 🇳🇬', 'font-size: 14px; color: #f39c12;');
console.log('%cWebsite developed with ❤️', 'font-size: 12px; color: #7f8c8d;');

// ===== EXPORT FOR MODULE USE (OPTIONAL) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showSlide,
        nextSlide,
        prevSlide,
        showTestimonial,
        animateStats
    };
}
