import { motion } from "framer-motion";
import { Github, Mail, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import cvFile from "/cv.pdf";

export function Hero({ profile }) {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
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
                <div className="max-w-xl mt-4">
                    <p className="whitespace-pre-line leading-relaxed text-neutral-600 dark:text-neutral-300">
                        {profile.summary}
                    </p>

                    {/* Description dropdown */}
                    <div className="mt-3">
                        <button
                            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                            aria-expanded={isDescriptionExpanded}
                            aria-label={isDescriptionExpanded ? "Hide description" : "Show description"}
                        >
                            <span>More about me</span>
                            {isDescriptionExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                            ) : (
                                <ChevronDown className="w-4 h-4" />
                            )}
                        </button>

                        <motion.div
                            initial={false}
                            animate={{
                                height: isDescriptionExpanded ? "auto" : 0,
                                opacity: isDescriptionExpanded ? 1 : 0
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <p className="pt-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                                {profile.description}
                            </p>
                        </motion.div>
                    </div>
                </div>

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
                        href={cvFile}
                        download
                        className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Download CV
                    </motion.a>
                </div>
            </motion.div>

            {/* Subtle animated gradient */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tr from-blue-700/30 via-fuchsia-600/10 to-transparent blur-3xl" />
        </header>
    );
}
