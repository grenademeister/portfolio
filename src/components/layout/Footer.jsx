/**
 * Simple footer component
 */
export function Footer({ profileName }) {
    return (
        <footer className="py-12 text-center text-xs text-neutral-500">
            © {new Date().getFullYear()} {profileName}. All rights reserved.
        </footer>
    );
}
