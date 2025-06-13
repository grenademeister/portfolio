import { useState, useCallback } from 'react';

export const useCommandHistory = () => {
    const [history, setHistory] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const addToHistory = useCallback((command) => {
        if (command.trim() && (history.length === 0 || history[history.length - 1] !== command)) {
            setHistory(prev => [...prev, command]);
        }
        setCurrentIndex(-1);
    }, [history]);

    const getPreviousCommand = useCallback(() => {
        if (history.length === 0) return '';

        const newIndex = currentIndex === -1 ? history.length - 1 : Math.max(0, currentIndex - 1);
        setCurrentIndex(newIndex);
        return history[newIndex] || '';
    }, [history, currentIndex]);

    const getNextCommand = useCallback(() => {
        if (history.length === 0 || currentIndex === -1) return '';

        const newIndex = Math.min(history.length - 1, currentIndex + 1);
        if (newIndex === history.length - 1 && currentIndex === newIndex) {
            setCurrentIndex(-1);
            return '';
        }

        setCurrentIndex(newIndex);
        return history[newIndex] || '';
    }, [history, currentIndex]);

    const clearHistory = useCallback(() => {
        setHistory([]);
        setCurrentIndex(-1);
    }, []);

    return {
        history,
        addToHistory,
        getPreviousCommand,
        getNextCommand,
        clearHistory
    };
};
