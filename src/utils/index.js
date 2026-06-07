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
