// ===== PORTFOLIO PAGE SPECIFIC JAVASCRIPT =====

// Portfolio Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioProjects = document.querySelectorAll('.portfolio-project');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Filter projects with animation
        portfolioProjects.forEach((project, index) => {
            const category = project.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                // Show project
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'scale(1)';
                }, index * 50);
            } else {
                // Hide project
                project.style.opacity = '0';
                project.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Image Lightbox Functionality
const projectImages = document.querySelectorAll('.portfolio-project .project-image');

projectImages.forEach(imageContainer => {
    imageContainer.addEventListener('click', function(e) {
        // Don't trigger if clicking the project link button
        if (e.target.closest('.project-link')) {
            e.preventDefault();
            return;
        }
        
        const img = this.querySelector('img');
        const projectInfo = this.querySelector('.project-info');
        const title = projectInfo.querySelector('h3').textContent;
        const description = projectInfo.querySelector('p').textContent;
        const tags = Array.from(projectInfo.querySelectorAll('.project-tags span')).map(tag => tag.textContent);
        
        openLightbox(img.src, title, description, tags);
    });
    
    // Add cursor pointer to indicate clickable
    imageContainer.style.cursor = 'pointer';
});

function openLightbox(imageSrc, title, description, tags) {
    // Create lightbox modal
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Close lightbox">
                <i class="fas fa-times"></i>
            </button>
            <div class="lightbox-image-container">
                <img src="${imageSrc}" alt="${title}" class="lightbox-image">
            </div>
            <div class="lightbox-info">
                <h2>${title}</h2>
                <p>${description}</p>
                <div class="lightbox-tags">
                    ${tags.map(tag => `<span class="lightbox-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Add lightbox to body
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
    
    // Close functionality
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.remove();
            document.body.style.overflow = '';
        }, 300);
    };
    
    // Close button
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    
    // Close on overlay click
    lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
    
    // Close on Escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
    
    // Prevent scrolling on content
    lightbox.querySelector('.lightbox-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Load More Functionality
const loadMoreBtn = document.getElementById('loadMoreBtn');
let currentItems = 12;
const itemsToLoad = 6;

if (loadMoreBtn) {
    // Initially hide extra projects
    portfolioProjects.forEach((project, index) => {
        if (index >= currentItems) {
            project.style.display = 'none';
        }
    });
    
    loadMoreBtn.addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        this.disabled = true;
        
        setTimeout(() => {
            let itemsShown = 0;
            portfolioProjects.forEach((project, index) => {
                if (index >= currentItems && index < currentItems + itemsToLoad) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'scale(1)';
                    }, itemsShown * 100);
                    itemsShown++;
                }
            });
            
            currentItems += itemsToLoad;
            
            this.innerHTML = 'Load More Projects <i class="fas fa-plus"></i>';
            this.disabled = false;
            
            const hiddenProjects = Array.from(portfolioProjects).filter(p => 
                window.getComputedStyle(p).display === 'none'
            );
            
            if (hiddenProjects.length === 0) {
                this.style.display = 'none';
            }
        }, 1000);
    });
}

// Portfolio Stats Counter Animation (renamed to avoid conflict)
const portfolioStatNumbers = document.querySelectorAll('.portfolio-stats .stat-number');
let portfolioStatsAnimated = false;

const portfolioStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !portfolioStatsAnimated) {
            portfolioStatsAnimated = true;
            
            portfolioStatNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animatePortfolioCounter(stat, target);
            });
        }
    });
}, { threshold: 0.5 });

const portfolioStatsSection = document.querySelector('.portfolio-stats');
if (portfolioStatsSection) {
    portfolioStatsObserver.observe(portfolioStatsSection);
}

function animatePortfolioCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Project Card Hover Effect (3D Tilt) - Desktop Only
if (window.innerWidth > 768) {
    portfolioProjects.forEach(project => {
        const projectImage = project.querySelector('.project-image');
        
        if (projectImage) {
            project.addEventListener('mousemove', (e) => {
                const rect = project.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                projectImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            project.addEventListener('mouseleave', () => {
                projectImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        }
    });
}

// Scroll Progress Bar for Portfolio
const portfolioScrollProgress = document.createElement('div');
portfolioScrollProgress.className = 'portfolio-scroll-progress';
portfolioScrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(portfolioScrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    portfolioScrollProgress.style.width = scrollPercent + '%';
});

// Prevent project link from triggering lightbox
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        const projectCard = this.closest('.portfolio-project');
        const img = projectCard.querySelector('.project-image img');
        const projectInfo = projectCard.querySelector('.project-info');
        const title = projectInfo.querySelector('h3').textContent;
        const description = projectInfo.querySelector('p').textContent;
        const tags = Array.from(projectInfo.querySelectorAll('.project-tags span')).map(tag => tag.textContent);
        
        openLightbox(img.src, title, description, tags);
    });
});

console.log('Portfolio page scripts loaded successfully! 🎨');