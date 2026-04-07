export function Footer({ profileName }) {
    return (
        <footer className="px-5 pb-10 pt-4 sm:px-8 lg:px-10">
            <div className="page-container border-t pt-6 text-center text-xs" style={{ borderColor: "var(--border)", color: "var(--text-soft)" }}>
                © {new Date().getFullYear()} {profileName}. All rights reserved.
            </div>
        </footer>
    );
}
