// Ensure the DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Menu Functionality ---
    const menuButton = document.getElementById('menu-button');
    const closeMenuButton = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = document.querySelectorAll('.menu-link');

    // Function to open the mobile menu
    const openMenu = () => {
        mobileMenu.style.transform = 'translateX(0)';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Function to close the mobile menu
    const closeMenu = () => {
        mobileMenu.style.transform = 'translateX(-100%)';
        document.body.style.overflow = ''; // Restore scrolling
    };

    // Event listeners for menu toggle
    if (menuButton) menuButton.addEventListener('click', openMenu);
    if (closeMenuButton) closeMenuButton.addEventListener('click', closeMenu);

    // Close menu when a link is clicked (for seamless navigation)
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // --- 2. Scroll-to-Top Button Functionality ---
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    // Show/Hide the button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) { // Show after scrolling 400px
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.pointerEvents = 'none';
        }
    });

    // Scroll to the top when clicked
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 3. GSAP Animations and ScrollTriggers ---

    // Check if GSAP and ScrollTrigger are loaded before registering and using
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Section Entrance Animation (Runs once on page load)
        gsap.timeline()
            .from('header', { y: -100, opacity: 0, duration: 0.8 })
            .from('#hero-kicker', { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
            .from('#hero-title', { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
            .from('#hero-tagline', { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
            .from('#hero-cta', { scale: 0.8, opacity: 0, duration: 0.5, ease: "back.out(1.7)" }, "-=0.3");
        
        // Function to handle the counting animation
        function animateCount(targetId, endValue, duration = 3) {
            const target = document.getElementById(targetId);
            
            if (!target) return;

            // Use GSAP's built-in utility to animate a value
            gsap.to(
                { count: 0 }, 
                {
                    count: endValue,
                    duration: duration,
                    roundProps: 'count', // Round the number to integer
                    onUpdate: function () {
                        target.textContent = this.targets()[0].count;
                    }
                }
            );
        }

        // ScrollTrigger for Statistics Counters
        ScrollTrigger.create({
            trigger: '#stats',
            start: 'top 80%', // Start animation when top of section hits 80% down the viewport
            once: true, // Only run once
            onEnter: () => {
                // Target values for the counters (Adjusted for a new company)
                animateCount('stat1-value', 15);     // Projects Completed
                animateCount('stat2-value', 2);      // Years of Expertise
                animateCount('stat3-value', 500);    // Tonnes of Concrete Cut
                animateCount('stat4-value', 15);     // Satisfied Clients
            }
        });

        // ScrollTrigger for Services Grid (Staggered fade-in effect)
        gsap.from('.service-card', {
            y: 50,
            opacity: 0,
            stagger: 0.15, // Delay between each card's animation
            duration: 0.6,
            ease: 'power1.out',
            scrollTrigger: {
                trigger: '#services-grid',
                start: 'top 85%',
                toggleActions: 'play none none none',
            }
        });
        
        // --- 4. Interactive WhatsApp Button Pulse Animation ---
        
        const whatsappBtn = document.querySelector('#contact .space-x-6 a:first-child');
        
        if (whatsappBtn) {
            gsap.to(whatsappBtn, {
                scale: 1.15, // Scale up slightly
                duration: 0.8,
                ease: "power1.inOut",
                repeat: -1, // Repeat indefinitely
                yoyo: true, // Go back and forth (pulse effect)
                delay: 3 // Start after the initial page load animations are complete
            });
        }
    } else {
        console.warn("GSAP or ScrollTrigger libraries not loaded. Animations disabled.");
    }
});