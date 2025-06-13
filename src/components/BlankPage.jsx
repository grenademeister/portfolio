import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Terminal as TerminalIcon, ArrowLeft } from "lucide-react";
import Terminal from "./cli/Terminal";
import ProjectModal from "./modals/ProjectModal";

/**
 * BlankPage Component - CLI Portfolio Interface
 * --------------------------------------------------
 * A CLI-style portfolio interface implemented in React
 */
function BlankPage({ theme, toggleTheme, switchPage }) {
    const [cliTheme, setCLITheme] = useState('matrix');
    const [selectedProject, setSelectedProject] = useState(null);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

    const handleThemeChange = (newTheme) => {
        setCLITheme(newTheme);
    };

    const handleSkipToGUI = () => {
        switchPage();
    };

    // Listen for project open events
    React.useEffect(() => {
        const handleOpenProject = (event) => {
            setSelectedProject(event.detail);
            setIsProjectModalOpen(true);
        };

        window.addEventListener('openProject', handleOpenProject);

        return () => {
            window.removeEventListener('openProject', handleOpenProject);
        };
    }, []);

    return (
        <div className="min-h-screen bg-neutral-900 text-neutral-100 font-sans antialiased">
            {/* Navigation */}
            <motion.nav
                className="sticky top-0 z-40 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <TerminalIcon className="w-6 h-6 text-green-400" />
                        <span className="font-semibold tracking-tight text-green-400">
                            CLI Portfolio
                        </span>
                        <span className="text-sm text-gray-500">
                            - Type "help" for commands
                        </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={handleSkipToGUI}
                            className="flex items-center px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                            aria-label="Switch to GUI portfolio"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            GUI Mode
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-neutral-800 transition-all"
                            aria-label="Toggle theme"
                        >
                            <motion.div
                                initial={{ rotate: 0 }}
                                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </motion.div>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* CLI Interface */}
            <div className="container mx-auto px-6 py-6 h-[calc(100vh-80px)]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="h-full"
                >
                    <Terminal
                        theme={cliTheme}
                        onThemeChange={handleThemeChange}
                        onSkipToGUI={handleSkipToGUI}
                    />
                </motion.div>
            </div>

            {/* Project Modal */}
            <ProjectModal
                projectId={selectedProject}
                isOpen={isProjectModalOpen}
                onClose={() => {
                    setIsProjectModalOpen(false);
                    setSelectedProject(null);
                }}
            />
        </div>
    );
}

export default BlankPage;
