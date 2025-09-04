// js/kapcsolat.js
document.addEventListener('DOMContentLoaded', () => {
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            if (name === '' || email === '' || subject === '' || message === '') {
                formMessage.textContent = 'Kérjük, töltsd ki az összes mezőt!';
                formMessage.classList.remove('success');
                formMessage.classList.add('error');
                formMessage.style.opacity = '1';
                return;
            }

            // Simulate form submission
            // In a real application, you would send this data to a server using fetch() or XMLHttpRequest
            console.log('Form data submitted:', { name, email, subject, message });

            // Display success message
            formMessage.textContent = 'Üzenetedet sikeresen elküldtük! Hamarosan felvesszük veled a kapcsolatot.';
            formMessage.classList.remove('error');
            formMessage.classList.add('success');
            formMessage.style.opacity = '1';

            // Reset form after a short delay
            setTimeout(() => {
                contactForm.reset();
                formMessage.style.opacity = '0';
            }, 3000);
        });
    }

    // --- Entrance Animations (using Intersection Observer for better performance) ---

    const animateElements = document.querySelectorAll(
        '.animate-fade-in, .animate-slide-up, .animate-scale-in, .animate-fade-in-scale'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)'; // Reset transform for slideUp/scaleIn
                entry.target.classList.add('animation-triggered'); // Add a class to prevent re-animation
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust rootMargin if needed
    });

    animateElements.forEach(element => {
        // Initial state for animation (handled by CSS, but good to ensure here too)
        element.style.opacity = '0';
        if (element.classList.contains('animate-slide-up')) {
            element.style.transform = 'translateY(20px)';
        } else if (element.classList.contains('animate-scale-in')) {
            element.style.transform = 'scale(0.8)';
        } else if (element.classList.contains('animate-fade-in-scale')) {
            element.style.transform = 'scale(0.95)';
        }
        observer.observe(element);
    });

    // Handle delay classes for animation-delay on initial load
    // This part is mainly for the initial rendering and works best with CSS keyframes
    // The Intersection Observer handles the 'when to animate' part.
});