import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { scrollToSection } from "../../utils";

/**
 * Navigation component with theme toggle and section navigation
 */
export function Navigation({ profileName, theme, toggleTheme, activeSection }) {
    const navItems = [
        { id: 'about', label: 'About' },
        { id: 'education', label: 'Education' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'experience', label: 'Experience' },
        { id: 'contact', label: 'Contact' }
    ];

    return (
        <motion.nav
            className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <p className="font-semibold tracking-tight">{profileName}</p>
                <div className="flex items-center">
                    <ul className="flex gap-6 mr-4">
                        {navItems.map(({ id, label }) => (
                            <li key={id}>
                                <button
                                    onClick={() => scrollToSection(`#${id}`)}
                                    className={`text-sm transition-colors ${activeSection === id
                                            ? 'text-blue-400 font-medium'
                                            : 'hover:text-blue-400'
                                        }`}
                                    aria-label={`Navigate to ${label} section`}
                                >
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>
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
    );
}
