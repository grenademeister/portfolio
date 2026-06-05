import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { scrollToSection } from "../../utils";

export function Navigation({
    profileName,
    theme,
    toggleTheme,
    activeSection,
    navItems,
    secondaryLinks = [],
    homeHref = `${import.meta.env.BASE_URL}`
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

        const onResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("resize", onResize);
        };
    }, [isMenuOpen]);

    return (
        <nav
            className="sticky top-0 z-50 border-b bg-[var(--bg)]/95"
            style={{ borderColor: "var(--border)" }}
        >
            <div className="page-container flex min-h-14 items-center justify-between gap-6 py-3">
                <a
                    href={homeHref}
                    className="font-editorial text-base leading-none text-[color:var(--text)] hover:text-[color:var(--accent)]"
                    aria-label={`Navigate to ${profileName} home`}
                >
                    {profileName}
                </a>

                <div className="hidden min-w-0 flex-1 items-center justify-end gap-5 lg:flex">
                    {items.length > 0 ? (
                        <ul className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm">
                            {items.map(({ id, label }) => (
                                <li key={id}>
                                    <button
                                        type="button"
                                        onClick={() => handleNavClick(id)}
                                        className="underline-offset-4 hover:underline"
                                        style={{ color: activeSection === id ? "var(--accent)" : "var(--text-muted)" }}
                                        aria-label={`Navigate to ${label} section`}
                                    >
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : null}

                    {secondaryLinks.map(({ href, label }) => (
                        <a key={href} href={href} className="text-sm text-link" aria-label={`Navigate to ${label} page`}>
                            {label}
                        </a>
                    ))}

                    <button onClick={toggleTheme} className="plain-button h-9 w-9 px-0" aria-label="Toggle theme">
                        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </button>
                </div>

                <button
                    type="button"
                    className="plain-button h-9 w-9 px-0 lg:hidden"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation-menu"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
            </div>

            {isMenuOpen ? (
                <div id="mobile-navigation-menu" className="page-container border-t py-4 lg:hidden" style={{ borderColor: "var(--border)" }}>
                    {items.length > 0 ? (
                        <ul className="grid gap-3 text-sm">
                            {items.map(({ id, label }) => (
                                <li key={id}>
                                    <button
                                        onClick={() => handleNavClick(id)}
                                        className="w-full text-left underline-offset-4 hover:underline"
                                        style={{ color: activeSection === id ? "var(--accent)" : "var(--text-muted)" }}
                                        aria-label={`Navigate to ${label} section`}
                                    >
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : null}

                    {secondaryLinks.length > 0 ? (
                        <ul className={`${items.length > 0 ? "mt-4 border-t pt-4" : ""} grid gap-3 text-sm`} style={{ borderColor: "var(--border)" }}>
                            {secondaryLinks.map(({ href, label }) => (
                                <li key={href}>
                                    <a href={href} onClick={() => setIsMenuOpen(false)} className="text-link">
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : null}

                    <button onClick={toggleTheme} className="mt-4 inline-flex items-center gap-2 text-sm text-[color:var(--text-muted)]">
                        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
                    </button>
                </div>
            ) : null}
        </nav>
    );
}
