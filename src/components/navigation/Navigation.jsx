import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { scrollToSection } from "../../utils";

/**
 * Navigation component with theme toggle and section navigation
 */
export function Navigation({ profileName, theme, toggleTheme, activeSection }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { id: "about", label: "About" },
        { id: "education", label: "Education" },
        { id: "experience", label: "Experience" },
        { id: "skills", label: "Skills" },
        { id: "projects", label: "Projects" },
        { id: "contact", label: "Contact" }
    ];

    const handleNavClick = (id) => {
        scrollToSection(`#${id}`);
        setIsMenuOpen(false);
    };

    useEffect(() => {
        if (!isMenuOpen) return;

        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        if (!isMenuOpen) return;

        const onResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        if (!isMenuOpen) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isMenuOpen]);

    return (
        <motion.nav
            className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center gap-3">
                <p className="font-semibold tracking-tight text-sm sm:text-base">{profileName}</p>

                <div className="hidden md:flex items-center">
                    <ul className="flex gap-6 mr-4">
                        {navItems.map(({ id, label }) => (
                            <li key={id}>
                                <button
                                    onClick={() => scrollToSection(`#${id}`)}
                                    className={`text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 rounded-md px-1 ${activeSection === id
                                        ? "text-blue-500 font-medium"
                                        : "hover:text-blue-400"
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
                        className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
                        aria-label="Toggle theme"
                    >
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: theme === "dark" ? 0 : 180 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </motion.div>
                    </button>
                </div>

                <button
                    type="button"
                    className="md:hidden p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation-menu"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        id="mobile-navigation-menu"
                        className="md:hidden border-t border-gray-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <ul className="container mx-auto px-4 sm:px-6 py-3 flex flex-col gap-1">
                            {navItems.map(({ id, label }) => (
                                <li key={id}>
                                    <button
                                        onClick={() => handleNavClick(id)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 ${activeSection === id
                                            ? "bg-blue-50 dark:bg-neutral-800 text-blue-600 dark:text-blue-300 font-medium"
                                            : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                            }`}
                                        aria-label={`Navigate to ${label} section`}
                                    >
                                        {label}
                                    </button>
                                </li>
                            ))}
                            <li className="pt-1">
                                <button
                                    onClick={toggleTheme}
                                    className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 flex items-center gap-2"
                                    aria-label="Toggle theme"
                                >
                                    {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                    <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
                                </button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
