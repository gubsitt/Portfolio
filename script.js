document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    };

    const revealOptions = {
        root: null,
        // Trigger a bit before the element is fully in view, especially for tall cards.
        rootMargin: '0px 0px 120px 0px',
        threshold: 0.02
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Initial Reveal for Hero Section
    // Ensure hero elements are revealed immediately on load
    setTimeout(() => {
        const heroReveals = document.querySelectorAll('.hero .reveal');
        heroReveals.forEach(el => el.classList.add('active'));
    }, 100);

    // 5. Image Modal (Lightbox)
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const captionText = document.getElementById("modal-caption");
    const closeBtn = document.querySelector(".close-modal");
    const featureImgs = document.querySelectorAll(".feature-img");

    if (modal && modalImg && closeBtn) {
        // Open modal when clicking on any feature image
        featureImgs.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = "flex";
                // Slight delay to allow display:flex to apply before adding opacity class for transition
                setTimeout(() => modal.classList.add('show'), 10);
                modalImg.src = this.src;
                captionText.innerHTML = this.alt;
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = "none";
                document.body.style.overflow = 'auto'; // Restore scrolling
            }, 300); // 300ms matches the transition duration in CSS
        };

        // Close on clicking the X button
        closeBtn.addEventListener('click', closeModal);

        // Close when clicking empty space outside the image
        modal.addEventListener('click', function(e) {
            if (e.target !== modalImg) {
                closeModal();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === "Escape" && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }
});
