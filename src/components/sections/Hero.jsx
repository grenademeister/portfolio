import { AnimatePresence, motion } from "framer-motion";
import {
    Github,
    Mail,
    Linkedin,
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { useState } from "react";
import cvFile from "/cv.pdf";
import profilePhoto1 from "/pic1-square.jpg";
import profilePhoto2 from "/pic2-square.jpg";

export function Hero({ profile }) {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [activePhotoIndex, setActivePhotoIndex] = useState(0);
    const profilePhotos = [profilePhoto1, profilePhoto2];

    const showPreviousPhoto = () => {
        setActivePhotoIndex((prev) => (prev - 1 + profilePhotos.length) % profilePhotos.length);
    };

    const showNextPhoto = () => {
        setActivePhotoIndex((prev) => (prev + 1) % profilePhotos.length);
    };

    return (
        <header id="about" className="relative overflow-hidden">
            <motion.div
                className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
            >
                <div className="flex-1 max-w-2xl">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">
                        {profile.name}
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl md:text-2xl text-blue-400/90">
                        {profile.tagline}
                    </p>
                    <div className="mt-4">
                        <p className="whitespace-pre-line leading-relaxed text-neutral-600 dark:text-neutral-300">
                            {profile.summary}
                        </p>

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
                                <p className="pt-3 text-sm leading-relaxed whitespace-pre-line text-neutral-500 dark:text-neutral-400">
                                    {profile.description}
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    <div className="flex gap-4 sm:gap-6 mt-6">
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
                            href={profile.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:opacity-80 transition-opacity"
                            aria-label="LinkedIn Profile"
                        >
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a
                            href={`mailto:${profile.email}`}
                            className="hover:opacity-80 transition-opacity"
                            aria-label="Email Contact"
                        >
                            <Mail className="w-6 h-6" />
                        </a>
                    </div>

                    <div className="flex flex-wrap gap-3 sm:gap-4 mt-8">
                        <motion.a
                            href={cvFile}
                            download
                            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Download CV
                        </motion.a>
                        <motion.a
                            href={`${import.meta.env.BASE_URL}bare.html`}
                            title="I hate React. Give me bare HTML."
                            aria-label="I hate React. Give me bare HTML."
                            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Hate React? Bare HTML
                        </motion.a>
                    </div>
                </div>

                <motion.div
                    className="w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[300px] mx-auto lg:mx-0 shrink-0"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.15 } }}
                >
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={profilePhotos[activePhotoIndex]}
                                src={profilePhotos[activePhotoIndex]}
                                alt={`${profile.name} portrait ${activePhotoIndex + 1}`}
                                className="w-full aspect-square rounded-3xl object-cover object-center shadow-2xl ring-1 ring-black/5 dark:ring-white/10"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                            />
                        </AnimatePresence>

                        <button
                            type="button"
                            onClick={showPreviousPhoto}
                            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-neutral-700 shadow-md transition hover:bg-white dark:bg-neutral-900/80 dark:text-neutral-100 dark:hover:bg-neutral-900"
                            aria-label="Show previous photo"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={showNextPhoto}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-neutral-700 shadow-md transition hover:bg-white dark:bg-neutral-900/80 dark:text-neutral-100 dark:hover:bg-neutral-900"
                            aria-label="Show next photo"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-2">
                        {profilePhotos.map((photo, index) => (
                            <button
                                key={photo}
                                type="button"
                                onClick={() => setActivePhotoIndex(index)}
                                className={`h-2.5 rounded-full transition ${
                                    index === activePhotoIndex
                                        ? "w-6 bg-blue-500"
                                        : "w-2.5 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                                }`}
                                aria-label={`Show photo ${index + 1}`}
                                aria-pressed={index === activePhotoIndex}
                            />
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Subtle animated gradient */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tr from-blue-700/30 via-fuchsia-600/10 to-transparent blur-3xl" />
        </header>
    );
}
