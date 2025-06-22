import React, { useState } from "react";
import BlankPage from "./components/BlankPage";

// Import modular components
import { Navigation } from "./components/navigation/Navigation";
import { Hero } from "./components/sections/Hero";
import { EducationSection } from "./components/sections/EducationSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { ContactSection } from "./components/sections/ContactSection";
import { ProjectModal } from "./components/modals/ProjectDetailModal";
import { Footer } from "./components/layout/Footer";

// Import data and hooks
import { PROFILE, EDUCATION, SKILLS, PROJECTS, EXPERIENCE } from "./data/profile";
import { useActiveSectionObserver, useTheme } from "./hooks";

/**
 * Modern portfolio application ― Hyeokgi Kim
 * --------------------------------------------------
 * – Modular component architecture
 * – Clean separation of concerns
 * – Reusable hooks and utilities
 * – Tailwind CSS + shadcn/ui components
 * – framer-motion for smooth animations
 */

export default function PortfolioPage() {
    // State management
    const [activeSkills, setActiveSkills] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentPage, setCurrentPage] = useState('blank');
    
    // Custom hooks
    const activeSection = useActiveSectionObserver();
    const { theme, toggleTheme } = useTheme();

    // Event handlers
    const switchPage = () => {
        setCurrentPage(currentPage === 'portfolio' ? 'blank' : 'portfolio');
    };

    const toggleSkill = (skill) => {
        if (activeSkills.includes(skill)) {
            setActiveSkills(activeSkills.filter(s => s !== skill));
        } else {
            setActiveSkills([...activeSkills, skill]);
        }
    };

    const clearSkillFilters = () => {
        setActiveSkills([]);
    };

    // Filter projects based on active skills
    const filteredProjects = activeSkills.length > 0
        ? PROJECTS.filter(project =>
            activeSkills.some(skill => project.tags.includes(skill))
        )
        : PROJECTS;

    // If we're on the blank page, render CLI interface
    if (currentPage === 'blank') {
        return <BlankPage theme={theme} toggleTheme={toggleTheme} switchPage={switchPage} />;
    }

    // Main portfolio page
    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 font-sans antialiased selection:bg-blue-600/90">
            <Navigation 
                profileName={PROFILE.name} 
                theme={theme} 
                toggleTheme={toggleTheme}
                activeSection={activeSection}
            />
            
            <Hero profile={PROFILE} switchPage={switchPage} />
            
            <EducationSection education={EDUCATION} />
            
            <SkillsSection 
                skills={SKILLS}
                activeSkills={activeSkills}
                toggleSkill={toggleSkill}
                onClearFilters={clearSkillFilters}
            />
            
            <ProjectsSection 
                projects={filteredProjects}
                onProjectSelect={setSelectedProject}
            />
            
            <ExperienceSection experience={EXPERIENCE} />
            
            <ContactSection />
            
            <Footer profileName={PROFILE.name} />
            
            <ProjectModal 
                selectedProject={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    );
}

// ---------------------- main page ----------------------
export default function PortfolioPage() {
    const [activeSkills, setActiveSkills] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [theme, setTheme] = useState('dark');
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');
    const [currentPage, setCurrentPage] = useState('blank'); // New state for page switching
    const activeSection = useActiveSectionObserver(); useEffect(() => {
        // Check if theme is stored in localStorage
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);

        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []); const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        // Apply theme transition
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const scrollToSection = (sectionId) => {
        const targetElement = document.querySelector(sectionId);
        if (targetElement) {
            const navbarHeight = document.querySelector('nav').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20; // Extra 20px padding

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const switchPage = () => {
        setCurrentPage(currentPage === 'portfolio' ? 'blank' : 'portfolio');
    }; const toggleSkill = (skill) => {
        if (activeSkills.includes(skill)) {
            setActiveSkills(activeSkills.filter(s => s !== skill));
        } else {
            setActiveSkills([...activeSkills, skill]);
        }
    };

    // Filter projects based on active skills
    const filteredProjects = activeSkills.length > 0
        ? PROJECTS.filter(project =>
            activeSkills.some(skill => project.tags.includes(skill))
        )
        : PROJECTS;

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactForm({
            ...contactForm,
            [name]: value
        });
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setFormSuccess('');

        // Basic client-side validation
        if (!contactForm.name || !contactForm.email || !contactForm.message) {
            setFormError('Please fill in all fields.');
            return;
        }

        if (!validateEmail(contactForm.email)) {
            setFormError('Please enter a valid email address.');
            return;
        }

        setFormSuccess('Message sent!');
        setContactForm({
            name: '',
            email: '',
            message: ''
        });
    };    // If we're on the blank page, render it
    if (currentPage === 'blank') {
        return <BlankPage theme={theme} toggleTheme={toggleTheme} switchPage={switchPage} />;
    }

    return (<div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 font-sans antialiased selection:bg-blue-600/90">
        {/* Navigation */}
        <motion.nav
            className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <p className="font-semibold tracking-tight">{PROFILE.name}</p>
                <div className="flex items-center">
                    <ul className="flex gap-6 mr-4">                        <li>
                        <button
                            onClick={() => scrollToSection('#about')}
                            className={`text-sm transition-colors ${activeSection === 'about'
                                ? 'text-blue-400 font-medium'
                                : 'hover:text-blue-400'
                                }`}
                            aria-label="Navigate to About section"
                        >
                            About
                        </button>
                    </li>                        <li>
                            <button
                                onClick={() => scrollToSection('#education')}
                                className={`text-sm transition-colors ${activeSection === 'education'
                                    ? 'text-blue-400 font-medium'
                                    : 'hover:text-blue-400'
                                    }`}
                                aria-label="Navigate to Education section"
                            >
                                Education
                            </button>
                        </li>                        <li>
                            <button
                                onClick={() => scrollToSection('#skills')}
                                className={`text-sm transition-colors ${activeSection === 'skills'
                                    ? 'text-blue-400 font-medium'
                                    : 'hover:text-blue-400'
                                    }`}
                                aria-label="Navigate to Skills section"
                            >
                                Skills
                            </button>
                        </li>                        <li>
                            <button
                                onClick={() => scrollToSection('#projects')}
                                className={`text-sm transition-colors ${activeSection === 'projects'
                                    ? 'text-blue-400 font-medium'
                                    : 'hover:text-blue-400'
                                    }`}
                                aria-label="Navigate to Projects section"
                            >
                                Projects
                            </button>
                        </li>                        <li>
                            <button
                                onClick={() => scrollToSection('#experience')}
                                className={`text-sm transition-colors ${activeSection === 'experience'
                                    ? 'text-blue-400 font-medium'
                                    : 'hover:text-blue-400'
                                    }`}
                                aria-label="Navigate to Experience section"
                            >
                                Experience
                            </button>
                        </li>                        <li>
                            <button
                                onClick={() => scrollToSection('#contact')}
                                className={`text-sm transition-colors ${activeSection === 'contact'
                                    ? 'text-blue-400 font-medium'
                                    : 'hover:text-blue-400'
                                    }`}
                                aria-label="Navigate to Contact section"
                            >
                                Contact
                            </button>
                        </li></ul>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                        aria-label="Toggle theme"
                    >
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </motion.div>
                    </button>
                </div>
            </div>
        </motion.nav>        {/* Hero */}
        <header id="about" className="relative overflow-hidden">
            <motion.div
                className="container mx-auto px-6 py-24 flex flex-col items-start gap-4"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
            >                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    {PROFILE.name}
                </h1>
                <p className="text-xl md:text-2xl text-blue-400/90">
                    {PROFILE.tagline}
                </p>
                <p className="max-w-xl leading-relaxed mt-4 text-neutral-600 dark:text-neutral-300">
                    {PROFILE.summary}
                </p>
                <div className="flex gap-6 mt-6">
                    <a
                        href={PROFILE.github}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:opacity-80 transition-opacity"
                    >
                        <Github className="w-6 h-6" />
                    </a>                    <a
                        href={`mailto:${PROFILE.email}`}
                        className="hover:opacity-80 transition-opacity"
                    >
                        <Mail className="w-6 h-6" />
                    </a>
                </div>                <div className="flex gap-4 mt-8">
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
            {/* subtle animated gradient */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tr from-blue-700/30 via-fuchsia-600/10 to-transparent blur-3xl" />
        </header>

        {/* Education */}
        <Section id="education" className="container mx-auto px-6 py-16">
            <SectionHeading>Education</SectionHeading>
            <ul className="space-y-8">
                {EDUCATION.map((edu, i) => (
                    <motion.li
                        key={edu.institution}
                        custom={i}
                        variants={fadeIn} className="flex flex-col md:flex-row md:items-center gap-6 p-6 bg-white/90 dark:bg-neutral-800/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-transparent shadow-md"
                    >
                        <div className="flex-shrink-0 p-4 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-600 dark:text-blue-500">
                            {edu.icon}
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-xl font-medium text-neutral-900 dark:text-white">
                                {edu.institution}
                            </h3>
                            <p className="text-neutral-700 dark:text-neutral-300 mt-1">
                                {edu.degree}
                            </p>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                    {edu.period}
                                </span>
                                <span className="text-sm px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg">
                                    GPA: {edu.gpa}
                                </span>
                            </div>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </Section>

        {/* Skills */}
        <Section id="skills" className="container mx-auto px-6 py-16">
            <SectionHeading>Core Skills</SectionHeading>
            <div className="space-y-8">
                {Object.entries(SKILLS).map(([category, skills], categoryIndex) => (
                    <div key={category} className="space-y-4">
                        <h3 className="text-xl font-medium text-neutral-800 dark:text-neutral-200">
                            {category}
                        </h3>                        <ul className="flex flex-wrap gap-3">
                            {skills.map((skill, i) => (
                                <motion.li
                                    key={skill.name}
                                    custom={categoryIndex * skills.length + i}
                                    variants={fadeIn}
                                    className={
                                        "px-4 py-2 rounded-2xl border transition-all cursor-pointer flex items-center gap-2 " +
                                        (activeSkills.includes(skill.name)
                                            ? "bg-blue-600/80 text-white border-blue-500 dark:bg-blue-600/80 dark:border-blue-500"
                                            : "border-gray-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800")
                                    }
                                    onClick={() => toggleSkill(skill.name)}
                                    role="button"
                                    aria-pressed={activeSkills.includes(skill.name)}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            toggleSkill(skill.name);
                                        }
                                    }}
                                >
                                    <span className={
                                        activeSkills.includes(skill.name)
                                            ? "text-white"
                                            : "text-blue-600 dark:text-blue-400"
                                    }>
                                        {skill.icon}
                                    </span>
                                    {skill.name}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <AnimatePresence>
                {activeSkills.length > 0 && (<motion.div
                    className="mt-4 text-sm text-neutral-600 dark:text-neutral-400"
                    variants={filterTextAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <p>
                        Showing projects that use any of: {" "}
                        {activeSkills.map((skill, index) => (
                            <span key={skill}>
                                <span className="underline text-blue-600 dark:text-blue-400">{skill}</span>
                                {index < activeSkills.length - 1 ? ", " : ""}
                            </span>
                        ))}
                    </p>
                    <button
                        onClick={() => setActiveSkills([])}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mt-1 text-xs transition-colors"
                    >
                        Clear filters
                    </button>
                </motion.div>
                )}
            </AnimatePresence>
        </Section>

        {/* Projects */}
        <Section id="projects" className="container mx-auto px-6 py-16">
            <SectionHeading>Projects & Research</SectionHeading>                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project, i) => (<motion.div
                    key={project.title}
                    custom={i}
                    variants={projectAnimation}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: 0.4,
                        type: "spring",
                        stiffness: 150,
                        damping: 15
                    }}
                    style={{
                        transformOrigin: "center"
                    }} whileHover={{
                        y: -8,
                        transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    onClick={() => setSelectedProject(project)}
                    role="button"
                    aria-label={`View details for ${project.title}`}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedProject(project);
                        }
                    }}
                ><Card className="h-full rounded-2xl bg-white/90 dark:bg-neutral-800/80 backdrop-blur-xl border border-gray-200 dark:border-transparent shadow-md hover:shadow-xl transition-all group cursor-pointer">
                        <CardContent className="p-6 flex flex-col gap-4 h-full">                                <header>
                            <h3 className="text-xl font-medium leading-snug text-neutral-800 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {project.title}
                            </h3>
                            <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                {project.year}
                            </span>
                        </header>
                            <p className="text-sm text-neutral-700 dark:text-neutral-300 flex-grow">
                                {project.description}
                            </p>
                            <ul className="flex flex-wrap gap-2 mt-auto">                                    {project.tags.map((t) => (
                                <li
                                    key={t}
                                    className="text-xs px-2 py-1 bg-blue-50 text-blue-700 dark:bg-neutral-700 dark:text-blue-200 rounded-xl group-hover:bg-blue-100 dark:group-hover:bg-neutral-600 transition-colors"
                                >
                                    {t}
                                </li>
                            ))}
                            </ul>
                        </CardContent>
                    </Card>
                </motion.div>
                ))}
            </div>
        </Section>

        {/* Experience */}
        <Section id="experience" className="container mx-auto px-6 py-16">
            <SectionHeading>Experience & Honors</SectionHeading>
            <ul className="space-y-6">
                {EXPERIENCE.map((exp, i) => (
                    <motion.li
                        key={exp.role}
                        custom={i}
                        variants={fadeIn} className="flex items-start gap-4"
                    >
                        <span className="mt-1 text-blue-500 dark:text-blue-400">{exp.icon}</span>
                        <div>
                            <p className="font-medium leading-tight text-neutral-800 dark:text-neutral-100">
                                {exp.role} · {exp.org}
                            </p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                {exp.period}
                            </p>
                            <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                {exp.description}
                            </p>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </Section>            {/* Contact */}
        <Section id="contact" className="container mx-auto px-6 py-16">
            <SectionHeading>Get In Touch</SectionHeading>
            <div className="max-w-2xl mx-auto">
                <div className="bg-white/90 dark:bg-neutral-800/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-transparent shadow-md p-8">
                    <motion.form
                        onSubmit={handleContactSubmit}
                        className="space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={contactForm.name}
                                onChange={handleContactChange}
                                className="mt-1 block w-full px-4 py-2 text-neutral-800 dark:text-neutral-100 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={contactForm.email}
                                onChange={handleContactChange}
                                className="mt-1 block w-full px-4 py-2 text-neutral-800 dark:text-neutral-100 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={contactForm.message}
                                onChange={handleContactChange}
                                className="mt-1 block w-full px-4 py-2 text-neutral-800 dark:text-neutral-100 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                rows="4"
                                required
                            />
                        </div>
                        {formError && (
                            <p className="text-red-500 text-sm">{formError}</p>
                        )}
                        {formSuccess && (
                            <p className="text-green-500 text-sm">{formSuccess}</p>
                        )}
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-blue-600 dark:bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-400 transition-all"
                        >
                            Send Message
                        </button>
                    </motion.form>
                </div>
            </div>
        </Section>

        {/* Footer */}
        <footer className="py-12 text-center text-xs text-neutral-500">
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </footer>

        {/* Project Modal */}
        <AnimatePresence>
            {selectedProject && (
                <motion.div
                    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedProject(null)}                    >                        <motion.div
                        className="bg-white dark:bg-neutral-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-200 dark:border-transparent shadow-xl"
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        transition={{ type: "spring", damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 md:p-8">                                <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
                                    {selectedProject.title}
                                </h2>
                                <p className="text-blue-600 dark:text-blue-400">{selectedProject.year}</p>
                            </div>                                    <button
                                onClick={() => setSelectedProject(null)}
                                className="p-2 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                                aria-label="Close project details"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M18 6L6 18M6 6L18 18"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>                                </div>                                <div className="space-y-6">
                                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                    {selectedProject.detailedDescription || selectedProject.description}
                                </p>

                                <div>
                                    <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-3">Technologies</h3>
                                    <div className="flex flex-wrap gap-2">                                            {selectedProject.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-neutral-700 dark:text-blue-200 rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
    );
}
