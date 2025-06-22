import { motion } from "framer-motion";
import { Github, Mail, Terminal } from "lucide-react";

/**
 * Hero section component with profile information and action buttons
 */
export function Hero({ profile, switchPage }) {
    return (
        <header id="about" className="relative overflow-hidden">
            <motion.div
                className="container mx-auto px-6 py-24 flex flex-col items-start gap-4"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
            >
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    {profile.name}
                </h1>
                <p className="text-xl md:text-2xl text-blue-400/90">
                    {profile.tagline}
                </p>
                <p className="max-w-xl leading-relaxed mt-4 text-neutral-600 dark:text-neutral-300">
                    {profile.summary}
                </p>

                <div className="flex gap-6 mt-6">
                    <a
                        href={profile.github}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:opacity-80 transition-opacity"
                        aria-label="GitHub Profile"
                    >
                        <Github className="w-6 h-6" />
                    </a>
                    <a
                        href={`mailto:${profile.email}`}
                        className="hover:opacity-80 transition-opacity"
                        aria-label="Email Contact"
                    >
                        <Mail className="w-6 h-6" />
                    </a>
                </div>

                <div className="flex gap-4 mt-8">
                    <motion.a
                        href="/cv.pdf"
                        download
                        className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Download CV
                    </motion.a>
                    <motion.button
                        onClick={switchPage}
                        className="px-6 py-3 bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label="Switch to CLI portfolio"
                    >
                        <Terminal className="w-4 h-4" />
                        CLI Portfolio
                    </motion.button>
                </div>
            </motion.div>

            {/* Subtle animated gradient */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tr from-blue-700/30 via-fuchsia-600/10 to-transparent blur-3xl" />
        </header>
    );
}
