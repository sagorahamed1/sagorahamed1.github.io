// Global variables
let isScrolling = false;
const particles = [];
const maxParticles = 50;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initLoadingScreen();
    initNavigation();
    initParticles();
    initScrollAnimations();
    initSkillCircles();
    initProjectFilters();
    initContactForm();
    initTypingAnimation();
    initSmoothScrolling();
    initAdvancedAnimations();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.querySelector('.progress-bar::after');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Hide loading screen after a short delay
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'visible';
                
                // Start entrance animations
                startEntranceAnimations();
            }, 500);
        }
    }, 150);
    
    // Hide loading screen after maximum 3 seconds
    setTimeout(() => {
        if (!loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'visible';
            startEntranceAnimations();
        }
    }, 3000);
}

// Entrance animations after loading
function startEntranceAnimations() {
    // Animate navbar
    const navbar = document.querySelector('.navbar');
    navbar.style.animation = 'slideDown 0.8s ease-out';
    
    // Animate hero content with stagger
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${0.2 + index * 0.1}s`;
        el.classList.add('animate-in');
    });
    
    // Animate hero visual
    const heroVisual = document.querySelector('.hero-visual');
    heroVisual.style.animationDelay = '0.5s';
    heroVisual.classList.add('animate-in');
}

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.9)';
        }
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
}

// Particle system
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const startX = Math.random() * window.innerWidth;
        const endX = startX + (Math.random() - 0.5) * 200;
        const duration = 8 + Math.random() * 4;
        const delay = Math.random() * 2;
        const size = 2 + Math.random() * 4;
        
        particle.style.left = startX + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random colors
        const colors = ['#40D9FF', '#FF6B35', '#7C3AED', '#10B981', '#F59E0B'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = randomColor;
        particle.style.boxShadow = `0 0 10px ${randomColor}`;
        
        // Random shapes
        if (Math.random() > 0.7) {
            particle.style.borderRadius = '0';
            particle.style.transform = 'rotate(45deg)';
        }
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, (duration + delay) * 1000);
    }

    // Create initial particles
    for (let i = 0; i < maxParticles; i++) {
        setTimeout(() => createParticle(), Math.random() * 5000);
    }

    // Continuously create new particles
    setInterval(createParticle, 500);
    
    // Create special floating code symbols
    createFloatingSymbols();
}

// Floating code symbols
function createFloatingSymbols() {
    const symbols = ['{ }', '< />', '( )', '[ ]', '=>', '&&', '||', '++'];
    const container = document.getElementById('particles');
    
    function createSymbol() {
        const symbol = document.createElement('div');
        symbol.className = 'floating-symbol';
        symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        
        symbol.style.cssText = `
            position: absolute;
            font-family: var(--font-code);
            font-size: ${12 + Math.random() * 8}px;
            color: rgba(64, 217, 255, 0.3);
            pointer-events: none;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 50}px;
            animation: symbolFloat ${15 + Math.random() * 10}s linear infinite;
            z-index: 1;
        `;
        
        container.appendChild(symbol);
        
        setTimeout(() => {
            if (symbol.parentNode) {
                symbol.parentNode.removeChild(symbol);
            }
        }, 25000);
    }
    
    // Create symbols periodically
    setInterval(createSymbol, 3000);
    
    // Add CSS for symbol animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes symbolFloat {
            0% { 
                transform: translateY(0) rotate(0deg); 
                opacity: 0; 
            }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { 
                transform: translateY(-${window.innerHeight + 100}px) rotate(360deg); 
                opacity: 0; 
            }
        }
    `;
    document.head.appendChild(style);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Special handling for skill circles
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillCircle(entry.target);
                }
                
                // Special handling for about section
                if (entry.target.classList.contains('about-image')) {
                    animateAboutImage(entry.target);
                }
                
                // Special handling for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const elementsToObserve = [
        '.service-card',
        '.skill-item',
        '.project-card',
        '.contact-item',
        '.section-title',
        '.section-subtitle',
        '.about-image',
        '.timeline-item',
        '.highlight-item'
    ];

    elementsToObserve.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add('scroll-reveal');
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    });
}

// Skill circles animation
function initSkillCircles() {
    function animateSkillCircle(skillItem) {
        const circle = skillItem.querySelector('.skill-circle');
        const percentage = circle.getAttribute('data-percentage');
        
        if (!percentage) return;
        
        const degree = (percentage / 100) * 360;
        const colors = [
            'var(--primary-color)',
            'var(--secondary-color)',
            'var(--accent-color)',
            'var(--success-color)'
        ];
        
        const randomColor1 = colors[Math.floor(Math.random() * colors.length)];
        const randomColor2 = colors[Math.floor(Math.random() * colors.length)];
        
        setTimeout(() => {
            circle.style.background = `conic-gradient(${randomColor1} ${degree}deg, ${randomColor2} ${degree}deg, var(--bg-tertiary) ${degree}deg)`;
        }, 300);
    }

    // Manual animation for already visible skill circles
    window.animateSkillCircle = animateSkillCircle;
}

// About image animation
function animateAboutImage(imageContainer) {
    const floatingIcons = imageContainer.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.animation = `floatIcon 4s ease-in-out infinite ${index * -1.5}s, 
                                   iconAppear 0.6s ease-out forwards`;
        }, index * 200);
    });
}

// Timeline animation
function animateTimelineItem(item) {
    const dot = item.querySelector('::before');
    setTimeout(() => {
        item.style.transform = 'translateX(0)';
        item.style.opacity = '1';
    }, 100);
}

// Project filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                setTimeout(() => {
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                        card.style.animationDelay = `${index * 0.1}s`;
                        card.style.animation = 'projectSlideIn 0.6s ease-out forwards';
                    } else {
                        card.classList.add('hidden');
                    }
                }, index * 50);
            });
        });
    });
}

// Advanced animations
function initAdvancedAnimations() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        const particles = document.getElementById('particles');
        
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        if (particles) {
            particles.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });
    
    // Magnetic effect for buttons
    const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .hire-btn');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
    
    // Typing effect for hero subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        
        setTimeout(() => {
            typeWriter(subtitle, text, 100);
        }, 1500);
    }
    
    // Glitch effect on hover for logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.style.animation = 'glitch 0.3s ease-in-out';
        });
        
        logo.addEventListener('animationend', () => {
            logo.style.animation = '';
        });
    }
    
    // Ripple effect for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', createRipple);
    });
}

// Typewriter effect
function typeWriter(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Ripple effect
function createRipple(e) {
    const card = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(64, 217, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    card.style.position = 'relative';
    card.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Contact form
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            form.reset();
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    // Form validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearValidation);
    });
}

// Input validation
function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    // Remove existing validation classes
    input.classList.remove('valid', 'invalid');
    
    if (input.hasAttribute('required') && !value) {
        input.classList.add('invalid');
        return false;
    }
    
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            input.classList.add('invalid');
            return false;
        }
    }
    
    if (value) {
        input.classList.add('valid');
    }
    
    return true;
}

function clearValidation(e) {
    e.target.classList.remove('valid', 'invalid');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: var(--success-color);' : ''}
        ${type === 'error' ? 'background: var(--error-color);' : ''}
        ${type === 'info' ? 'background: var(--primary-color);' : ''}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Typing animation for code snippet
function initTypingAnimation() {
    const codeLines = document.querySelectorAll('.code-line .code');
    if (!codeLines.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeText(entry.target);
            }
        });
    }, { threshold: 0.5 });

    codeLines.forEach((line, index) => {
        const text = line.innerHTML;
        line.innerHTML = '';
        line.setAttribute('data-text', text);
        
        setTimeout(() => {
            observer.observe(line);
        }, index * 200);
    });
}

function typeText(element) {
    const text = element.getAttribute('data-text');
    if (!text) return;
    
    let index = 0;
    const speed = 30;
    
    function type() {
        if (index < text.length) {
            element.innerHTML = text.substring(0, index + 1);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Smooth scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimizations
const debouncedResize = debounce(() => {
    // Handle resize events
    console.log('Window resized');
}, 250);

const throttledScroll = throttle(() => {
    // Handle scroll events
    isScrolling = true;
    setTimeout(() => {
        isScrolling = false;
    }, 100);
}, 16);

window.addEventListener('resize', debouncedResize);
window.addEventListener('scroll', throttledScroll);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loading');
    
    // Animate elements on load
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.2}s`;
            el.classList.add('fade-in-up');
        });
    }, 500);
});

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.8s ease-out both;
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes glitch {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
    
    @keyframes iconAppear {
        from {
            opacity: 0;
            transform: scale(0) rotate(180deg);
        }
        to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }
    }
    
    .notification {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    
    .contact-form input.valid,
    .contact-form textarea.valid {
        border-color: var(--success-color);
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
    
    .contact-form input.invalid,
    .contact-form textarea.invalid {
        border-color: var(--error-color);
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .skill-circle {
        transition: background 0.8s ease-in-out;
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: var(--bg-secondary);
            flex-direction: column;
            padding: 2rem;
            border-top: 1px solid var(--border-color);
            box-shadow: var(--shadow-lg);
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Console styling for developers
console.log(
    '%c🚀 Mofiz Uddin Sagor — Flutter Developer Portfolio',
    'color: #40D9FF; font-size: 16px; font-weight: bold;'
);

console.log(
    '%cBuilt with love using HTML, CSS & JavaScript',
    'color: #FF6B35; font-size: 12px;'
);

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
        
        // Add some fun effects
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.background = '#FFD700';
            particle.style.boxShadow = '0 0 20px #FFD700';
        });
        
        konamiCode = [];
    }
});

// Export functions for external use
window.portfolioUtils = {
    showNotification,
    initParticles,
    createRipple,
    typeWriter,
    debounce,
    throttle
};