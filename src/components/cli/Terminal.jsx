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
    }, [output.length, focusInput]);

    // Handle clicks on terminal to focus input
    const handleTerminalClick = () => {
        focusInput();
    };

    const getTerminalBg = () => {
        switch (currentTheme) {
            case 'matrix':
                return 'bg-black';
            case 'amber':
                return 'bg-gray-900';
            case 'blue':
                return 'bg-slate-900';
            case 'purple':
                return 'bg-gray-900';
            default:
                return 'bg-gray-900';
        }
    };

    const getBorderColor = () => {
        switch (currentTheme) {
            case 'matrix':
                return 'border-green-500';
            case 'amber':
                return 'border-amber-500';
            case 'blue':
                return 'border-blue-500';
            case 'purple':
                return 'border-purple-500';
            default:
                return 'border-gray-600';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`
        h-full w-full rounded-lg border-2 ${getBorderColor()} 
        ${getTerminalBg()} shadow-2xl overflow-hidden flex flex-col
        font-mono selection:bg-green-500/20
      `}
            onClick={handleTerminalClick}
        >
            {/* Terminal Header */}
            <div className={`
        flex items-center justify-between p-3 
        ${getBorderColor().replace('border-', 'bg-').replace('-500', '-900')}
        border-b ${getBorderColor()}
      `}>
                <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-gray-300 text-sm font-medium ml-4">
                        Portfolio Terminal - {currentTheme} theme
                    </span>
                </div>
                <div className="text-gray-400 text-xs">
                    user@portfolio: {fileSystem.getPromptPath()}
                </div>
            </div>

            {/* Terminal Content */}
            <div className="flex-1 flex flex-col min-h-0">
                <Output output={output} theme={currentTheme} />
                <CommandLine
                    currentInput={currentInput}
                    setCurrentInput={setCurrentInput}
                    onKeyDown={handleKeyDown}
                    isLoading={isLoading}
                    inputRef={inputRef}
                    prompt={fileSystem.getPromptPath()}
                    theme={currentTheme}
                />
            </div>
        </motion.div>
    );
};

export default Terminal;
