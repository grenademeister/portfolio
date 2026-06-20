import { motion } from "framer-motion";
import { Github, Mail, Linkedin } from "lucide-react";
import cvFile from "/cv.pdf";
import profilePhoto from "/pic1-square.jpg";

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;
const MotionFigure = motion.figure;

export function Hero({ profile }) {
    const links = [
        { href: profile.github, label: "GitHub", icon: <Github className="h-4 w-4" />, external: true },
        { href: profile.linkedin, label: "LinkedIn", icon: <Linkedin className="h-4 w-4" />, external: true },
        { href: `mailto:${profile.email}`, label: "Email", icon: <Mail className="h-4 w-4" /> }
    ];

    const item = {
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.34, ease: "easeOut" } }
    };

    return (
        <header id="about" className="page-container py-10 sm:py-14 lg:py-18">
            <MotionDiv
                className="grid gap-8 md:grid-cols-[minmax(0,1fr)_210px] md:items-start lg:grid-cols-[minmax(0,1fr)_250px]"
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.07 }}
            >
                <div className="max-w-3xl">
                    <MotionH1 variants={item} className="font-editorial text-4xl leading-[1.03] sm:text-5xl md:text-6xl lg:text-7xl">
                        {profile.name}
                    </MotionH1>
                    <MotionP variants={item} className="mt-4 text-lg leading-7 text-[color:var(--text)] sm:text-xl md:text-2xl">
                        {profile.tagline}
                    </MotionP>
                    <MotionDiv variants={item} className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm sm:mt-7">
                        {links.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noreferrer" : undefined}
                                className="inline-flex items-center gap-1.5 text-link"
                                aria-label={link.label}
                            >
                                {link.icon}
                                <span>{link.label}</span>
                            </a>
                        ))}
                        <a href={cvFile} download className="text-link">CV</a>
                        <a href={`${import.meta.env.BASE_URL}bare.html`} className="text-link">Bare HTML</a>
                    </MotionDiv>

                    <MotionP variants={item} className="mt-7 max-w-2xl whitespace-pre-line border-t pt-5 text-sm leading-7 text-[color:var(--text-muted)] sm:mt-8" style={{ borderColor: "var(--border)" }}>
                        {profile.description}
                    </MotionP>
                </div>

                <MotionFigure variants={item} className="w-36 sm:w-40 md:w-full">
                    <img
                        src={profilePhoto}
                        alt={`${profile.name} portrait`}
                        className="aspect-[4/5] w-full object-cover"
                        style={{ border: "1px solid var(--border)" }}
                    />
                </MotionFigure>
            </MotionDiv>
        </header>
    );
}
