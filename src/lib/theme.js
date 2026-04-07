const THEME_STORAGE_KEY = 'theme';
const DARK_THEME_MEDIA_QUERY = '(prefers-color-scheme: dark)';

export const getStoredTheme = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : null;
};

export const getSystemTheme = () => {
    if (typeof window === 'undefined') {
        return 'light';
    }

    return window.matchMedia(DARK_THEME_MEDIA_QUERY).matches ? 'dark' : 'light';
};

export const getPreferredTheme = () => getStoredTheme() || getSystemTheme();

export const applyTheme = (theme) => {
    if (typeof document === 'undefined') {
        return;
    }

    const isDarkTheme = theme === 'dark';

    document.documentElement.classList.toggle('dark', isDarkTheme);
    document.body.classList.toggle('dark', isDarkTheme);
    document.documentElement.style.colorScheme = isDarkTheme ? 'dark' : 'light';
};

export const watchSystemTheme = (onChange) => {
    if (typeof window === 'undefined') {
        return () => {};
    }

    const mediaQuery = window.matchMedia(DARK_THEME_MEDIA_QUERY);
    const handleChange = (event) => onChange(event.matches ? 'dark' : 'light');

    if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
};

export const persistTheme = (theme) => {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
};
