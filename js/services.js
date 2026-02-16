// ===== SERVICES PAGE SPECIFIC JAVASCRIPT =====

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other open items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Smooth scroll to service sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#' || href === '') {
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            const offset = 100;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Pricing Card Animation on Scroll
const pricingCards = document.querySelectorAll('.pricing-card');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const pricingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

pricingCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    pricingObserver.observe(card);
});

// Service Detail Visual Parallax Effect
window.addEventListener('scroll', () => {
    const visualCards = document.querySelectorAll('.visual-card');
    
    visualCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.05;
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            card.style.transform = `translateY(${rate}px)`;
        }
    });
});

// Timeline Animation
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Service Button Click Tracking (for analytics)
const serviceButtons = document.querySelectorAll('.service-detail .btn');

serviceButtons.forEach(button => {
    button.addEventListener('click', function() {
        const serviceName = this.closest('.service-detail').querySelector('h2').textContent;
        console.log(`Service clicked: ${serviceName}`);
        
        // You can add Google Analytics tracking here
        // gtag('event', 'service_click', { 'service_name': serviceName });
    });
});

// Dynamic Service Stats Counter
const serviceStats = document.querySelectorAll('.stat-box h4');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = entry.target;
            const text = target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (!isNaN(number)) {
                animateCounter(target, number, text);
                target.classList.add('counted');
            }
        }
    });
}, { threshold: 0.5 });

serviceStats.forEach(stat => {
    statsObserver.observe(stat);
});

function animateCounter(element, target, originalText) {
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = originalText;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + originalText.replace(/\d+/g, '');
        }
    }, stepTime);
}

// Process Timeline Scroll Animation
const processSection = document.querySelector('.process-timeline');

if (processSection) {
    window.addEventListener('scroll', () => {
        const rect = processSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
            const scrollPercentage = 1 - (rect.top / windowHeight);
            const timelineLine = document.querySelector('.process-timeline::before');
            
            // Add animation class to items as they come into view
            timelineItems.forEach((item, index) => {
                const itemRect = item.getBoundingClientRect();
                if (itemRect.top < windowHeight * 0.8) {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 200);
                }
            });
        }
    });
}

// Initialize timeline items with initial state
timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'all 0.6s ease';
});

// Tech Badges Hover Effect
const techBadges = document.querySelectorAll('.tech-badge');

techBadges.forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Scroll Progress Indicator for Long Page
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    scrollProgress.style.width = scrollPercent + '%';
});

// Load More Services (if you have more services to show)
const loadMoreBtn = document.getElementById('loadMoreServices');

if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        // Add your logic to load more services
        console.log('Loading more services...');
        
        // Show loading state
        this.textContent = 'Loading...';
        this.disabled = true;
        
        // Simulate loading
        setTimeout(() => {
            this.textContent = 'Load More Services';
            this.disabled = false;
            // Add new services to the DOM here
        }, 1500);
    });
}

// Service Filter (if you want to add filtering functionality)
const filterButtons = document.querySelectorAll('.filter-btn');
const serviceItems = document.querySelectorAll('.service-detail');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filter = this.dataset.filter;
        
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Filter services
        serviceItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Scroll-triggered animations for service icons
const serviceIcons = document.querySelectorAll('.service-detail-icon');

const iconObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'iconPop 0.6s ease forwards';
        }
    });
}, { threshold: 0.5 });

serviceIcons.forEach(icon => {
    iconObserver.observe(icon);
});

// Add CSS for icon animation
const style = document.createElement('style');
style.textContent = `
    @keyframes iconPop {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
        }
        50% {
            transform: scale(1.2) rotate(10deg);
        }
        100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

console.log('Services page scripts loaded successfully! 🎨');