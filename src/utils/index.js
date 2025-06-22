/**
 * Validation utilities for forms and user input
 */

export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

/**
 * Utility function for smooth scrolling to sections
 */
export const scrollToSection = (sectionId) => {
    const targetElement = document.querySelector(sectionId);
    if (targetElement) {
        const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20; // Extra 20px padding

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};
