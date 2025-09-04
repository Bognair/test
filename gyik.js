// gyik.js
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.closest('.faq-item');

            // Toggle active class on the clicked item
            faqItem.classList.toggle('active');

            // Close other open items (optional, uncomment if desired)
            /*
            faqQuestions.forEach(otherButton => {
                const otherFaqItem = otherButton.closest('.faq-item');
                if (otherFaqItem !== faqItem && otherFaqItem.classList.contains('active')) {
                    otherFaqItem.classList.remove('active');
                }
            });
            */
        });
    });
});