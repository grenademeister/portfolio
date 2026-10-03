import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { Navigation } from "../components/navigation/Navigation";
import { Footer } from "../components/layout/Footer";
import { PROFILE } from "../data/profile";
import { useTheme } from "../hooks";
import { applyTheme, getPreferredTheme } from "../lib/theme";

applyTheme(getPreferredTheme());

export function BlogMigrationPage() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="page-shell">
            <Navigation
                profileName={PROFILE.name}
                theme={theme}
                toggleTheme={toggleTheme}
                navItems={[]}
                homeHref="https://grenademeister.qzz.io"
                secondaryLinks={[{ href: "https://blog.grenademeister.qzz.io", label: "Blog" }]}
            />
            <main className="page-container section-frame">
                <p className="eyebrow">Blog</p>
                <h1 className="font-editorial text-4xl leading-tight sm:text-5xl">This blog has moved</h1>
                <p className="section-copy">
                    Read all posts at{" "}
                    <a href="https://blog.grenademeister.qzz.io" className="text-link">blog.grenademeister.qzz.io</a>.
                    {" "}The old blog API has been shut down, so posts and comments are no longer available here.
                </p>
            </main>
            <Footer profileName={PROFILE.name} />
        </div>
    );
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BlogMigrationPage />
    </StrictMode>
);
