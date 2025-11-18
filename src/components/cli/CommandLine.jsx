import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CommandLine = ({
    currentInput,
    setCurrentInput,
    onKeyDown,
    isLoading,
    inputRef,
    prompt,
    theme
}) => {
    const [showCursor, setShowCursor] = useState(true);

    // Blinking cursor effect
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);

        return () => clearInterval(interval);
    }, []);

    const getThemeColors = () => {
        switch (theme) {
            case 'matrix':
                return {
                    prompt: 'text-green-400',
                    input: 'text-green-300',
                    cursor: 'bg-green-400'
                };
            case 'amber':
                return {
                    prompt: 'text-amber-400',
                    input: 'text-amber-200',
                    cursor: 'bg-amber-400'
                };
            case 'blue':
                return {
                    prompt: 'text-blue-400',
                    input: 'text-blue-200',
                    cursor: 'bg-blue-400'
                };
            case 'purple':
                return {
                    prompt: 'text-purple-400',
                    input: 'text-purple-200',
                    cursor: 'bg-purple-400'
                };
            default:
                return {
                    prompt: 'text-gray-300',
                    input: 'text-gray-100',
                    cursor: 'bg-gray-400'
                };
        }
    }; const colors = getThemeColors();

    return (
        <div className="flex items-center p-2 sm:p-4 border-t border-gray-700 font-mono text-xs sm:text-sm">
            <span className={`${colors.prompt} mr-1 sm:mr-2 select-none flex-shrink-0`}>
                {prompt} $
            </span>
            <div className="flex-1 relative min-w-0">                <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={isLoading}
                className={`
            w-full bg-transparent border-none outline-none 
            ${colors.input} placeholder-gray-500
            ${isLoading ? 'opacity-50' : ''}
            text-xs sm:text-sm
          `}
                placeholder={isLoading ? 'Processing...' : 'Type a command...'}
                autoComplete="off"
                spellCheck="false"
                autoCapitalize="none"
                autoCorrect="off"
                inputMode="text"
            />{/* Blinking cursor */}
                <motion.div
                    className={`
            absolute top-0 w-2 h-5 ${colors.cursor}
            ${showCursor ? 'opacity-100' : 'opacity-0'}
          `}
                    style={{
                        left: `${currentInput.length * 0.6 + 0.1}em`,
                        transition: 'opacity 0.1s ease-in-out'
                    }}
                />
            </div>
            {isLoading && (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className={`w-4 h-4 border-2 border-t-transparent rounded-full ml-2 ${colors.cursor.replace('bg-', 'border-')}`}
                />
            )}
        </div>
    );
};

export default CommandLine;
