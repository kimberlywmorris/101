// ==========================================
// PREMIUM SAAS LANDING PAGE - INTERACTIONS
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initButtonInteractions();
    initNavbarScroll();
});

// ==========================================
// SCROLL ANIMATIONS - Intersection Observer
// ==========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate cards on scroll
    document.querySelectorAll('.prop-card, .testimonial-card, .diff-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

// ==========================================
// BUTTON INTERACTIONS
// ==========================================

function initButtonInteractions() {
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Trigger modal or scroll to form (placeholder)
            console.log('Book a call button clicked');
            showBookingModal();
        });
    });
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.style.background = 'rgba(10, 14, 39, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 14, 39, 0.8)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollY = scrollY;
    });
}

// ==========================================
// BOOKING MODAL (Placeholder)
// ==========================================

function showBookingModal() {
    alert('🚀 Growth Mapping Call\n\nThis would open a calendar scheduling interface.\n\nFor demo purposes, this is a placeholder.\n\nIntegrate with Cal.com, Calendly, or your preferred scheduling service.');
}

// ==========================================
// ADD RIPPLE ANIMATION CSS
// ==========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
