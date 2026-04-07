import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Github, Mail, Linkedin, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import cvFile from "/cv.pdf";
import profilePhoto1 from "/pic1-square.jpg";
import profilePhoto2 from "/pic2-square.jpg";

export function Hero({ profile }) {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [activePhotoIndex, setActivePhotoIndex] = useState(0);
    const profilePhotos = [profilePhoto1, profilePhoto2];
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const imageY = useTransform(scrollYProgress, [0, 1], [0, 28]);
    const copyY = useTransform(scrollYProgress, [0, 1], [0, -14]);

    const showPreviousPhoto = () => {
        setActivePhotoIndex((prev) => (prev - 1 + profilePhotos.length) % profilePhotos.length);
    };

    const showNextPhoto = () => {
        setActivePhotoIndex((prev) => (prev + 1) % profilePhotos.length);
    };

    return (
        <header id="about" ref={heroRef} className="relative overflow-hidden px-5 pb-10 pt-2 sm:px-8 sm:pb-12 lg:px-10 lg:pb-14 lg:pt-4">
            <div className="absolute inset-x-0 top-0 -z-10 h-[72%] rounded-[2.5rem] sm:rounded-[3rem]" style={{ background: "linear-gradient(135deg, rgba(201,100,66,0.14), rgba(232,230,220,0.1) 40%, rgba(119,125,87,0.08))" }} />
            <motion.div
                className="mx-auto grid min-h-[auto] max-w-[92rem] grid-cols-1 gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.78fr)] md:items-start lg:gap-12"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.55 } }}
            >
                <motion.div style={{ y: copyY }} className="max-w-2xl pt-16 sm:pt-20 lg:pl-4 lg:pt-24 xl:pl-8">
                    <h1 className="font-editorial text-4xl leading-[0.95] sm:text-5xl md:text-7xl">
                        {profile.name}
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl md:text-2xl" style={{ color: "var(--accent)" }}>
                        {profile.tagline}
                    </p>
                    <div className="mt-4">
                        <p className="whitespace-pre-line leading-relaxed" style={{ color: "var(--text-muted)" }}>
                            {profile.summary}
                        </p>

                        <div className="mt-3">
                            <button
                                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                className="flex items-center gap-2 text-sm transition-colors"
                                style={{ color: "var(--accent)" }}
                                aria-expanded={isDescriptionExpanded}
                                aria-label={isDescriptionExpanded ? "Hide description" : "Show description"}
                            >
                                <span>More about me</span>
                                {isDescriptionExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
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
                                <p className="whitespace-pre-line pt-3 text-sm leading-relaxed" style={{ color: "var(--text-soft)" }}>
                                    {profile.description}
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-4 sm:gap-6">
                        <a href={profile.github} target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-80" aria-label="GitHub Profile">
                            <Github className="h-6 w-6" />
                        </a>
                        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-80" aria-label="LinkedIn Profile">
                            <Linkedin className="h-6 w-6" />
                        </a>
                        <a href={`mailto:${profile.email}`} className="transition-opacity hover:opacity-80" aria-label="Email Contact">
                            <Mail className="h-6 w-6" />
                        </a>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                        <motion.a href={cvFile} download className="accent-button" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                            Download CV
                        </motion.a>
                        <motion.a
                            href={`${import.meta.env.BASE_URL}bare.html`}
                            title="I hate React. Give me bare HTML."
                            aria-label="I hate React. Give me bare HTML."
                            className="ring-button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Hate React? Bare HTML
                        </motion.a>
                    </div>
                </motion.div>

                <motion.div style={{ y: imageY }} className="relative flex items-start justify-center pt-6 md:justify-end md:pt-20 lg:pr-4 xl:pr-8">
                    <div className="absolute bottom-6 left-1/2 -z-10 h-44 w-44 -translate-x-1/2 rounded-full blur-3xl" style={{ background: "rgba(201,100,66,0.18)" }} />
                    <div className="surface-card relative w-full max-w-[29rem] overflow-hidden rounded-[2.15rem] p-4 sm:p-5">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-[var(--surface-strong)]">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={profilePhotos[activePhotoIndex]}
                                    src={profilePhotos[activePhotoIndex]}
                                    alt={`${profile.name} portrait ${activePhotoIndex + 1}`}
                                    className="h-full w-full object-cover"
                                    initial={{ opacity: 0, scale: 1.04 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                />
                            </AnimatePresence>

                            <button
                                type="button"
                                onClick={showPreviousPhoto}
                                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2 transition"
                                style={{ background: "rgba(250,249,245,0.88)", color: "var(--text)", boxShadow: "0 10px 24px rgba(20,20,19,0.12)" }}
                                aria-label="Show previous photo"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                onClick={showNextPhoto}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 transition"
                                style={{ background: "rgba(250,249,245,0.88)", color: "var(--text)", boxShadow: "0 10px 24px rgba(20,20,19,0.12)" }}
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
                                    className="h-2.5 rounded-full transition"
                                    style={{
                                        width: index === activePhotoIndex ? "1.5rem" : "0.625rem",
                                        background: index === activePhotoIndex ? "var(--accent)" : "color-mix(in srgb, var(--text-soft) 45%, transparent)"
                                    }}
                                    aria-label={`Show photo ${index + 1}`}
                                    aria-pressed={index === activePhotoIndex}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </header>
    );
}
