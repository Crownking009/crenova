// ===== BLOG PAGE JAVASCRIPT =====

// Category Filter Functionality
const categoryBtns = document.querySelectorAll('.category-btn');
const blogCards = document.querySelectorAll('.blog-card');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Filter blog cards
        blogCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                card.classList.add('hidden');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });

        // Scroll to blog grid smoothly
        const blogGrid = document.querySelector('.blog-grid-section');
        if (blogGrid) {
            setTimeout(() => {
                blogGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    });
});

// Read More Button - Open Article Modal
function openArticleModal(articleContent) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'article-modal';
    modal.innerHTML = `
        <div class="article-modal-content">
            <button class="article-close-btn" aria-label="Close article">
                <i class="fas fa-times"></i>
            </button>
            <div class="article-body">
                ${articleContent}
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Add reading progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        z-index: 10002;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    const modalContent = modal.querySelector('.article-modal-content');
    modalContent.addEventListener('scroll', () => {
        const scrollHeight = modalContent.scrollHeight - modalContent.clientHeight;
        const scrolled = (modalContent.scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // Close functionality
    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            progressBar.remove();
            document.body.style.overflow = '';
        }, 300);
    };
    
    // Close button
    modal.querySelector('.article-close-btn').addEventListener('click', closeModal);
    
    // Close on overlay click (outside content)
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
    
    // Prevent scrolling on modal content from closing
    modal.querySelector('.article-modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Wait for DOM to load before attaching events
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBlog);
} else {
    initializeBlog();
}

function initializeBlog() {
    // Attach event listeners to all Read More buttons
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    console.log('Found', readMoreBtns.length, 'read more buttons');
    
    readMoreBtns.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            console.log('Read more button clicked:', index);
            
            // Find the parent blog card
            const blogCard = this.closest('.blog-card');
            
            if (!blogCard) {
                console.error('Blog card not found');
                return;
            }
            
            // Get the full article content
            const fullArticleContent = blogCard.querySelector('.full-article-content');
            
            if (fullArticleContent) {
                const articleHTML = fullArticleContent.innerHTML;
                console.log('Opening article modal');
                openArticleModal(articleHTML);
            } else {
                console.error('Article content not found');
            }
        });
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Show success message
            showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
            
            // Clear input
            emailInput.value = '';
            
            // Here you would typically send the email to your backend
            console.log('Newsletter subscription:', email);
        });
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10001;
        animation: slideInRight 0.5s ease;
        max-width: 400px;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Lazy loading for blog images (renamed to avoid conflict)
const blogPageImages = document.querySelectorAll('.blog-image img');

const blogImageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            blogImageObserver.unobserve(img);
        }
    });
}, { threshold: 0.1 });

blogPageImages.forEach(img => {
    blogImageObserver.observe(img);
});

console.log('Blog page scripts loaded successfully! 📝');