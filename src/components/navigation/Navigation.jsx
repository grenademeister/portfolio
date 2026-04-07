import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { scrollToSection } from "../../utils";

export function Navigation({
    profileName,
    theme,
    toggleTheme,
    activeSection,
    navItems,
    secondaryLinks = []
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDesktopNavOpen, setIsDesktopNavOpen] = useState(false);
    const desktopNavCloseTimeout = useRef(null);

    const defaultNavItems = [
        { id: "about", label: "About" },
        { id: "education", label: "Education" },
        { id: "experience", label: "Experience" },
        { id: "publications", label: "Publications" },
        { id: "skills", label: "Skills" },
        { id: "projects", label: "Projects" },
        { id: "contact", label: "Contact" }
    ];
    const items = navItems ?? defaultNavItems;

    const clearDesktopNavCloseTimeout = () => {
        if (desktopNavCloseTimeout.current) {
            window.clearTimeout(desktopNavCloseTimeout.current);
            desktopNavCloseTimeout.current = null;
        }
    };

    const openDesktopNav = () => {
        clearDesktopNavCloseTimeout();
        setIsDesktopNavOpen(true);
    };

    const closeDesktopNav = () => {
        clearDesktopNavCloseTimeout();
        desktopNavCloseTimeout.current = window.setTimeout(() => {
            setIsDesktopNavOpen(false);
        }, 120);
    };

    const handleNavClick = (id) => {
        scrollToSection(`#${id}`);
        setIsMenuOpen(false);
        setIsDesktopNavOpen(false);
    };

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!isMenuOpen) return;

        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        };

        const onResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("resize", onResize);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("resize", onResize);
        };
    }, [isMenuOpen]);

    useEffect(() => () => clearDesktopNavCloseTimeout(), []);

    return (
        <motion.nav
            className="sticky top-0 z-50 px-3 pt-3 sm:px-5"
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
        >
            <div
                className="mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-3 sm:px-6"
                style={{
                    background: isScrolled ? "color-mix(in srgb, var(--bg) 88%, transparent)" : "transparent",
                    border: isScrolled ? "1px solid var(--border)" : "1px solid transparent",
                    boxShadow: isScrolled ? "0 10px 30px rgba(20,20,19,0.08)" : "none",
                    backdropFilter: isScrolled ? "blur(18px)" : "none"
                }}
            >
                <button
                    type="button"
                    onClick={() => scrollToSection("#about")}
                    className="font-editorial text-lg font-semibold tracking-tight"
                    aria-label={`Navigate to ${profileName} home`}
                >
                    {profileName}
                </button>

                <div className="hidden items-center gap-3 md:flex">
                    <div
                        className="relative"
                        onMouseEnter={openDesktopNav}
                        onMouseLeave={closeDesktopNav}
                        onFocusCapture={openDesktopNav}
                        onBlurCapture={(event) => {
                            if (!event.currentTarget.contains(event.relatedTarget)) {
                                closeDesktopNav();
                            }
                        }}
                    >
                        <button
                            type="button"
                            className="ring-button gap-2 px-4"
                            aria-haspopup="menu"
                            aria-expanded={isDesktopNavOpen}
                            aria-controls="desktop-navigation-menu"
                            onClick={() => setIsDesktopNavOpen((prev) => !prev)}
                        >
                            <span>Navigate</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${isDesktopNavOpen ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                            {isDesktopNavOpen && (
                                <motion.div
                                    id="desktop-navigation-menu"
                                    className="absolute right-0 top-[calc(100%+0.75rem)] w-72 overflow-hidden rounded-[1.75rem] p-3"
                                    style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}
                                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                                    transition={{ duration: 0.18, ease: "easeOut" }}
                                >
                                    <ul className="grid gap-1" role="menu" aria-label="Section navigation">
                                        {items.map(({ id, label }) => (
                                            <li key={id} role="none">
                                                <button
                                                    type="button"
                                                    onClick={() => handleNavClick(id)}
                                                    className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition-colors"
                                                    style={{
                                                        background: activeSection === id ? "var(--surface-strong)" : "transparent",
                                                        color: activeSection === id ? "var(--text)" : "var(--text-muted)"
                                                    }}
                                                    aria-label={`Navigate to ${label} section`}
                                                    role="menuitem"
                                                >
                                                    <span>{label}</span>
                                                    {activeSection === id ? (
                                                        <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
                                                    ) : null}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {secondaryLinks.map(({ href, label }) => (
                        <a
                            key={href}
                            href={href}
                            className="rounded-full px-4 py-3 text-sm font-medium transition-colors"
                            style={{
                                color: "var(--text)",
                                background: "color-mix(in srgb, var(--surface) 92%, transparent)",
                                boxShadow: "0 0 0 1px var(--border)"
                            }}
                            aria-label={`Navigate to ${label} page`}
                        >
                            {label}
                        </a>
                    ))}

                    <button onClick={toggleTheme} className="ring-button h-11 w-11 px-0" aria-label="Toggle theme">
                        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </button>
                </div>

                <button
                    type="button"
                    className="ring-button h-11 w-11 px-0 md:hidden"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation-menu"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        id="mobile-navigation-menu"
                        className="mx-auto mt-3 max-w-6xl rounded-[2rem] p-4 md:hidden"
                        style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                    >
                        <div className="mb-2 px-2 text-xs uppercase tracking-[0.18em]" style={{ color: "var(--text-soft)" }}>
                            Navigate
                        </div>
                        <ul className="flex flex-col gap-1">
                            {items.map(({ id, label }) => (
                                <li key={id}>
                                    <button
                                        onClick={() => handleNavClick(id)}
                                        className="w-full rounded-2xl px-4 py-3 text-left text-sm transition-colors"
                                        style={{
                                            background: activeSection === id ? "var(--surface-strong)" : "transparent",
                                            color: activeSection === id ? "var(--text)" : "var(--text-muted)"
                                        }}
                                        aria-label={`Navigate to ${label} section`}
                                    >
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {secondaryLinks.length > 0 && (
                            <div className="mt-4 border-t pt-4" style={{ borderColor: "var(--border)" }}>
                                <ul className="flex flex-col gap-1">
                                    {secondaryLinks.map(({ href, label }) => (
                                        <li key={href}>
                                            <a
                                                href={href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium"
                                                style={{
                                                    background: "color-mix(in srgb, var(--surface-strong) 62%, transparent)",
                                                    color: "var(--text)"
                                                }}
                                                aria-label={`Navigate to ${label} page`}
                                            >
                                                {label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="mt-4 border-t pt-4" style={{ borderColor: "var(--border)" }}>
                            <button
                                onClick={toggleTheme}
                                className="flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-left text-sm"
                                style={{ color: "var(--text-muted)" }}
                                aria-label="Toggle theme"
                            >
                                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                                <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
