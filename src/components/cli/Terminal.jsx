import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTerminal } from '../../hooks/useTerminal';
import Output from './Output';
import CommandLine from './CommandLine';

const Terminal = ({ theme = 'default', onThemeChange, onSkipToGUI }) => {
    const [currentTheme, setCurrentTheme] = useState(theme);
    const {
        output,
        currentInput,
        setCurrentInput,
        isLoading,
        handleKeyDown,
        focusInput,
        inputRef,
        fileSystem,
        history
    } = useTerminal();

    // Handle custom events from commands
    useEffect(() => {
        const handleOpenProject = (event) => {
            // This will be handled by the parent component
            console.log('Opening project:', event.detail);
        };

        const handleChangeTheme = (event) => {
            setCurrentTheme(event.detail);
            if (onThemeChange) {
                onThemeChange(event.detail);
            }
        };

        const handleSkipToGUI = () => {
            if (onSkipToGUI) {
                onSkipToGUI();
            }
        };

        window.addEventListener('openProject', handleOpenProject);
        window.addEventListener('changeTheme', handleChangeTheme);
        window.addEventListener('skipToGUI', handleSkipToGUI);

        return () => {
            window.removeEventListener('openProject', handleOpenProject);
            window.removeEventListener('changeTheme', handleChangeTheme);
            window.removeEventListener('skipToGUI', handleSkipToGUI);
        };
    }, [onThemeChange, onSkipToGUI]);
    // Auto-focus input when component mounts
    useEffect(() => {
        focusInput();
    }, [focusInput]);  // Re-focus input after output changes (command completion)
    useEffect(() => {
        const timer = setTimeout(() => {
            focusInput();
        }, 100);

        return () => clearTimeout(timer);
    }, [output.length, focusInput]);    // Handle clicks on terminal to focus input
    const handleTerminalClick = (e) => {
        // Prevent focusing if user is selecting text
        if (window.getSelection().toString()) return;
        
        // Focus input on any click
        focusInput();
        
        // On mobile, ensure the input is scrolled into view
        if (window.innerWidth < 768) {
            setTimeout(() => {
                inputRef.current?.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 100);
        }
    };const getTerminalBg = () => {
        switch (currentTheme) {
            case 'matrix':
                return 'bg-black';
            case 'amber':
                return 'bg-black';
            case 'blue':
                return 'bg-black';
            case 'purple':
                return 'bg-black';
            default:
                return 'bg-black';
        }
    };

    const getTextColor = () => {
        switch (currentTheme) {
            case 'matrix':
                return 'text-green-400';
            case 'amber':
                return 'text-amber-400';
            case 'blue':
                return 'text-blue-400';
            case 'purple':
                return 'text-purple-400';
            default:
                return 'text-green-400';
        }
    };    return (
        <div
            className={`
                h-full w-full ${getTerminalBg()} ${getTextColor()}
                font-mono selection:bg-current/20 overflow-hidden
                cursor-text
            `}
            onClick={handleTerminalClick}
        >
            {/* Full-screen Terminal Content */}
            <div className="h-full flex flex-col p-2 sm:p-4 overflow-hidden">
                <Output output={output} theme={currentTheme} />
                <CommandLine
                    currentInput={currentInput}
                    setCurrentInput={setCurrentInput}
                    onKeyDown={handleKeyDown}
                    isLoading={isLoading}
                    inputRef={inputRef}
                    prompt="user@portfolio:~$"
                    theme={currentTheme}
                />
            </div>
        </div>
    );
};

export default Terminal;
