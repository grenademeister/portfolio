import { useEffect, useState } from 'react';
import { applyTheme, getPreferredTheme, getStoredTheme, persistTheme, watchSystemTheme } from '../lib/theme';

export const useActiveSectionObserver = () => {
    const [activeSection, setActiveSection] = useState('about');

    useEffect(() => {
        const sections = document.querySelectorAll('section[id], header[id]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                root: null,
                rootMargin: '-120px 0px -45% 0px',
                threshold: 0.05,
            }
        );

        sections.forEach((section) => observer.observe(section));
        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    return activeSection;
};

export const useTheme = () => {
    const [theme, setTheme] = useState(getPreferredTheme);
    const [hasStoredTheme, setHasStoredTheme] = useState(() => getStoredTheme() !== null);

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    useEffect(() => {
        if (hasStoredTheme) {
            return undefined;
        }

        return watchSystemTheme(setTheme);
    }, [hasStoredTheme]);

    const toggleTheme = () => {
        setTheme((currentTheme) => {
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            persistTheme(nextTheme);
            return nextTheme;
        });
        setHasStoredTheme(true);
    };

    return { theme, toggleTheme };
};
