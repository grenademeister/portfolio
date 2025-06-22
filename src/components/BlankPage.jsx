import React, { useState } from "react";
import { X } from "lucide-react";
import Terminal from "./cli/Terminal";

/**
 * BlankPage Component - CLI Portfolio Interface
 * --------------------------------------------------
 * A CLI-style portfolio interface implemented in React
 */
function BlankPage({ switchPage }) {
    const [cliTheme, setCLITheme] = useState('matrix');

    const handleThemeChange = (newTheme) => {
        setCLITheme(newTheme);
    };

    const handleSkipToGUI = () => {
        switchPage();
    };

    return (
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

        </div>
    );
}

export default BlankPage;
