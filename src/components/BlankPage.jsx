import React, { useState } from "react";
import { X } from "lucide-react";
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

    // Hide scrollbars and prevent body scroll when in CLI mode
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        };
    }, []);

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
    }, []); return (
        <div className="h-screen w-screen bg-black text-green-400 font-mono antialiased overflow-hidden fixed top-0 left-0">            {/* Subtle Exit Button - Top Right Corner */}
            <button
                onClick={handleSkipToGUI}
                className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50 p-2 sm:p-3 rounded-full bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-sm border border-gray-600/50 hover:border-gray-400 shadow-lg hover:shadow-xl touch-manipulation"
                aria-label="Exit CLI and switch to GUI portfolio"
                title="Exit CLI Mode"
            >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Full-screen CLI Interface - No GUI elements */}
            <div className="h-full w-full overflow-hidden">
                <Terminal
                    theme={cliTheme}
                    onThemeChange={handleThemeChange}
                    onSkipToGUI={handleSkipToGUI}
                />
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
