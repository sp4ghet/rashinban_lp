// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initScrollEffects();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav__menu--active');
            navToggle.classList.toggle('nav__toggle--active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('nav__menu--active');
                navToggle.classList.remove('nav__toggle--active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('nav__menu--active');
                navToggle.classList.remove('nav__toggle--active');
            }
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}


// Scroll effects
function initScrollEffects() {
    // Header background on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.stat');
    animateElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });
}



// Add some CSS for animations and notifications via JavaScript
const style = document.createElement('style');
style.textContent = `
    /* Mobile navigation styles */
    @media (max-width: 767px) {
        .nav__menu {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background-color: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            padding: 2rem;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease-in-out;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .nav__menu--active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav__menu {
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .nav__toggle--active .nav__toggle-line:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav__toggle--active .nav__toggle-line:nth-child(2) {
            opacity: 0;
        }
        
        .nav__toggle--active .nav__toggle-line:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        /* Mobile menu text colors when scrolled */
        .header--scrolled .nav__menu {
            background-color: rgba(255, 255, 255, 0.98);
        }
        
        .header--scrolled .nav__link {
            color: #333333;
        }
        
        .header--scrolled .nav__link:hover {
            color: #ff0000;
        }
    }
    
    /* Animation elements */
    .animate-element {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .animate-element.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(style);
