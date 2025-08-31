// Go to Top Button functionality
const goToTopBtn = document.getElementById('goToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        goToTopBtn.classList.add('visible');
    } else {
        goToTopBtn.classList.remove('visible');
    }
});

goToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with loading class
document.addEventListener('DOMContentLoaded', () => {
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => observer.observe(el));
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Calendar functionality
function generateCalendar() {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const calendarGrid = document.querySelector('.calendar-grid');
    if (!calendarGrid) return;
    
    months.forEach((month, index) => {
        const monthDiv = document.createElement('div');
        monthDiv.className = 'month-calendar loading';
        monthDiv.innerHTML = `
            <div class="month-name">${month}</div>
            <div class="event-details">
                <strong>Quiz Night:</strong> ${15 + index}th ${month}<br>
                <small>7:00 PM - Library Hall</small>
            </div>
        `;
        calendarGrid.appendChild(monthDiv);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    generateCalendar();
    
    // Add loading class to all cards and sections for animation
    const animateElements = document.querySelectorAll('.card, .team-member, .gallery-item, .event-card');
    animateElements.forEach(el => {
        el.classList.add('loading');
    });
});

// Social media feed simulation
function loadSocialFeeds() {
    const socialContainer = document.getElementById('social-feeds');
    if (!socialContainer) return;
    
    const feeds = [
        {
            platform: 'Instagram',
            content: '🎉 Just wrapped up our amazing Quiz Championship! Congratulations to all participants! #QuizClub #Championship2024',
            likes: '245',
            time: '2 hours ago'
        },
        {
            platform: 'LinkedIn',
            content: 'We\'re excited to announce our partnership with Local Library for monthly quiz events! Join us every third Saturday!',
            likes: '89',
            time: '1 day ago'
        },
        {
            platform: 'Instagram',
            content: 'Behind the scenes: Our team preparing questions for the upcoming trivia night! 🧠✨',
            likes: '156',
            time: '3 days ago'
        }
    ];
    
    feeds.forEach(feed => {
        const feedCard = document.createElement('div');
        feedCard.className = 'card loading';
        feedCard.innerHTML = `
            <h3>${feed.platform}</h3>
            <p>${feed.content}</p>
            <div class="social-stats">
                <span>❤️ ${feed.likes} likes</span>
                <span>•</span>
                <span>${feed.time}</span>
            </div>
        `;
        socialContainer.appendChild(feedCard);
    });
}

// Load social feeds when social page is loaded
if (window.location.pathname.includes('social.html')) {
    document.addEventListener('DOMContentLoaded', loadSocialFeeds);
}

// Gallery lightbox functionality
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const description = item.querySelector('.gallery-overlay p').textContent;
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${imgSrc}" alt="Gallery image">
                    <p>${description}</p>
                    <button class="lightbox-close">&times;</button>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            
            // Close lightbox
            lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
                lightbox.remove();
            });
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.remove();
                }
            });
        });
    });
}

// Initialize gallery if on gallery page
if (window.location.pathname.includes('gallery.html')) {
    document.addEventListener('DOMContentLoaded', initGallery);
}

// Add lightbox styles dynamically
const lightboxStyles = `
.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
}

.lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
}

.lightbox-content img {
    max-width: 100%;
    max-height: 80vh;
    border-radius: 10px;
}

.lightbox-content p {
    color: white;
    text-align: center;
    margin-top: 1rem;
}

.lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    background: var(--highlight);
    color: white;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
}
`;

// Add lightbox styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = lightboxStyles;
document.head.appendChild(styleSheet);
