export function Footer({ profileName }) {
    return (
        <footer className="page-container pb-10 pt-4">
            <div className="border-t pt-5 text-xs leading-6" style={{ borderColor: "var(--border)", color: "var(--text-soft)" }}>
                © {new Date().getFullYear()} {profileName}. All rights reserved.
            </div>
        </footer>
    );
}
