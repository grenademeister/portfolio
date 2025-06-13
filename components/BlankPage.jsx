import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon, BookOpen } from "lucide-react";

/**
 * BlankPage Component
 * --------------------------------------------------
 * A simple blank page with navigation and theme toggle functionality
 */
function BlankPage({ theme, toggleTheme, switchPage }) {
    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 font-sans antialiased">
            {/* Navigation for blank page */}
            <motion.nav
                className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <p className="font-semibold tracking-tight">Blank Page</p>
                    <div className="flex items-center">
                        <button
                            onClick={switchPage}
                            className="px-3 py-1 mr-4 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                            aria-label="Back to portfolio"
                        >
                            Back to Portfolio
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
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

            {/* Blank page content */}
            <div className="container mx-auto px-6 py-24 flex flex-col items-center justify-center min-h-[80vh]">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Blank Page
                    </h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
                        This is a blank page. You can add any content here.
                    </p>
                    <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-white" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default BlankPage;
