import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Output = ({ output, theme }) => {
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [output]);

    const getThemeColors = () => {
        switch (theme) {
            case 'matrix':
                return {
                    command: 'text-green-400',
                    output: 'text-green-300',
                    error: 'text-red-400',
                    file: 'text-green-200',
                    system: 'text-green-500'
                };
            case 'amber':
                return {
                    command: 'text-amber-400',
                    output: 'text-amber-200',
                    error: 'text-red-400',
                    file: 'text-amber-100',
                    system: 'text-amber-500'
                };
            case 'blue':
                return {
                    command: 'text-blue-400',
                    output: 'text-blue-200',
                    error: 'text-red-400',
                    file: 'text-blue-100',
                    system: 'text-blue-500'
                };
            case 'purple':
                return {
                    command: 'text-purple-400',
                    output: 'text-purple-200',
                    error: 'text-red-400',
                    file: 'text-purple-100',
                    system: 'text-purple-500'
                };
            default:
                return {
                    command: 'text-gray-300',
                    output: 'text-gray-100',
                    error: 'text-red-400',
                    file: 'text-gray-200',
                    system: 'text-gray-400'
                };
        }
    };

    const colors = getThemeColors();

    const formatContent = (content, type) => {
        if (type === 'file') {
            // Format file content with proper line breaks and preserve formatting
            return content.split('\n').map((line, index) => (
                <div key={index} className="leading-relaxed">
                    {line || '\u00A0'} {/* Non-breaking space for empty lines */}
                </div>
            ));
        }

        return content.split('\n').map((line, index) => (
            <div key={index} className="leading-relaxed">
                {line || '\u00A0'}
            </div>
        ));
    }; return (
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2 font-mono text-xs sm:text-sm terminal-scroll">
            {output.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`${colors[item.type]} whitespace-pre-wrap break-words`}
                >
                    {item.type === 'clear' ? null : formatContent(item.content, item.type)}
                </motion.div>
            ))}
            <div ref={endRef} />
        </div>
    );
};

export default Output;
