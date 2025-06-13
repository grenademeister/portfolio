import { useState, useCallback, useRef, useEffect } from 'react';
import { useCommandHistory } from './useCommandHistory';
import { useFileSystem } from './useFileSystem';
import { executeCommand as executeCommandHandler } from '../components/cli/commands';

export const useTerminal = () => {
    const [output, setOutput] = useState([]);
    const [currentInput, setCurrentInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);

    const {
        history,
        addToHistory,
        getPreviousCommand,
        getNextCommand,
        clearHistory
    } = useCommandHistory();

    const fileSystemHook = useFileSystem();    // Welcome message with ASCII art
    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        
        const welcomeMessage = isMobile ? `
╔═══════════════════════════════╗
║        HYEOKGI KIM            ║
║   ECE Student & AI Engineer   ║
║                               ║
║  🎓 Seoul National University ║
║  🤖 RL • DL • Hardware AI     ║
╚═══════════════════════════════╝

Welcome to CLI Portfolio!
Type "help" for commands.
Try "ascii" or "neofetch".
Type "exit" for GUI version.
` : `
 ██   ██ ██    ██ ███████  ██████  ██   ██  ██████  ██ 
 ██   ██  ██  ██  ██      ██    ██ ██  ██  ██       ██ 
 ███████   ████   █████   ██    ██ █████   ██   ███ ██ 
 ██   ██    ██    ██      ██    ██ ██  ██  ██    ██ ██ 
 ██   ██    ██    ███████  ██████  ██   ██  ██████  ██ 
                                                       
          ██   ██ ██ ███    ███                        
          ██  ██  ██ ████  ████                        
          █████   ██ ██ ████ ██                        
          ██  ██  ██ ██  ██  ██                        
          ██   ██ ██ ██      ██                        

    ECE Undergraduate & AI Engineer

Welcome to the CLI Portfolio! Type "help" for available commands.
Try "ascii" for this banner again, or "neofetch" for info about me.
Type "exit" to see the GUI version of this portfolio.
`;

        setOutput([
            {
                type: 'system',
                content: welcomeMessage,
                timestamp: new Date()
            }
        ]);
    }, []);

    const addOutput = useCallback((content, type = 'output') => {
        setOutput(prev => [...prev, {
            type,
            content,
            timestamp: new Date()
        }]);
    }, []);

    const clearTerminal = useCallback(() => {
        setOutput([]);
    }, []);

    const executeCommand = useCallback(async (command) => {
        const trimmedCommand = command.trim();
        if (!trimmedCommand) return;

        // Add command to history
        addToHistory(trimmedCommand);

        // Add command to output
        addOutput(`${fileSystemHook.getPromptPath()} $ ${trimmedCommand}`, 'command'); setIsLoading(true);

        try {
            const result = await executeCommandHandler(trimmedCommand, fileSystemHook, history);

            if (result.type === 'clear') {
                clearTerminal();
            } else if (result.output) {
                addOutput(result.output, result.type || 'output');
            }

            if (result.action) {
                // Handle special actions like opening modals, switching themes, etc.
                result.action();
            }
        } catch (error) {
            console.error('Command execution error:', error);
            addOutput(`Command not found: ${trimmedCommand}. Type "help" for available commands.`, 'error');
        } setIsLoading(false);
        setCurrentInput('');

        // Re-focus the input after command execution
        requestAnimationFrame(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        });
    }, [addToHistory, addOutput, fileSystemHook]); const handleKeyDown = useCallback((e) => {
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                executeCommand(currentInput);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setCurrentInput(getPreviousCommand());
                break;
            case 'ArrowDown':
                e.preventDefault();
                setCurrentInput(getNextCommand());
                break;
            case 'Tab':
                e.preventDefault();
                // TODO: Implement autocomplete
                break;
            case 'l':
                if (e.ctrlKey) {
                    e.preventDefault();
                    clearTerminal();
                }
                break;
        }
    }, [currentInput, executeCommand, getPreviousCommand, getNextCommand, clearTerminal]); const focusInput = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return {
        output,
        currentInput,
        setCurrentInput,
        isLoading,
        handleKeyDown,
        executeCommand,
        clearTerminal,
        focusInput,
        inputRef,
        fileSystem: fileSystemHook,
        history
    };
};
