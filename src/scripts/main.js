// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initScrollEffects();
    initLiveToggle();
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
                const targetPosition = targetSection.offsetTop - headerHeight;
                
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
}

// Live player toggle (YouTube/Twitch)
function initLiveToggle() {
    const tabs = document.querySelectorAll('.live__tab');
    const panes = document.querySelectorAll('.live__pane');
    if (!tabs.length || !panes.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');
            if (!target) return;

            // update tab active state
            tabs.forEach(t => {
                const isActive = t === tab;
                t.classList.toggle('is-active', isActive);
                t.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });

            // update panes
            panes.forEach(pane => {
                const isMatch = pane.getAttribute('data-pane') === target;
                pane.classList.toggle('is-active', isMatch);
                pane.setAttribute('aria-hidden', isMatch ? 'false' : 'true');
            });
        });
    });
}
