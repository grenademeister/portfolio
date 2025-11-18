import { useState, useEffect } from 'react';

/**
 * Custom hook to observe which section is currently in view
 * Used for highlighting active navigation items
 */
export const useActiveSectionObserver = () => {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const sections = document.querySelectorAll('section[id], header[id]');

        const observerOptions = {
            root: null,
            rootMargin: '-80px 0px -40% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

        return () => {
            sections.forEach(section => {
                observer.unobserve(section);
            });
        };
    }, []);

    return activeSection;
};

/**
 * Custom hook for managing theme state and persistence
 */
export const useTheme = () => {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        // Check if theme is stored in localStorage
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);

        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        // Apply theme transition
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return { theme, toggleTheme };
};
