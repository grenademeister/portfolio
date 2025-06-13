import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Github,
    Mail,
    Award,
    GraduationCap,
    Laptop2,
    BookOpen,
    Moon,
    Sun,
    Brain,
    Code2,
    Cpu,
    Database,
    Network,
    FileCode,
    Terminal,
    GitBranch,
    Zap,
    Bot,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import BlankPage from "./components/BlankPage";

/**
 * Minimal, modern portfolio ― Hyeokgi Kim
 * --------------------------------------------------
 * – Tailwind CSS + shadcn/ui components
 * – framer-motion for viewport-aware animations
 * – lucide-react icons for crisp SVGs
 *
 * The page is self-contained: drop into a React router route or render directly.
 */

// ---------------------- data model ----------------------
const PROFILE = {
    name: "Hyeokgi Kim",
    tagline: "Undergraduate ECE Student & AI Engineer",
    email: "ryan0905@snu.ac.kr",
    github: "https://github.com/grenademeister",
    summary:
        "Electrical & Computer Engineering student at Seoul National University focused on applied machine learning, reinforcement learning, and hardware-aware AI acceleration. Experienced in developing AI agents and neural network models with hands-on projects in reinforcement learning and transformer-based models."
};

// New contact form validation function
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const EDUCATION = [
    {
        institution: "Seoul National University",
        degree: "Electrical & Computer Engineering",
        period: "2024 - Present",
        gpa: "4.1 / 4.3",
        icon: <GraduationCap className="w-5 h-5" />
    },
    {
        institution: "Gyeonggi Science High School for the Gifted",
        degree: "Physics Track",
        period: "Graduated 2023",
        gpa: "4.27 / 4.3",
        icon: <BookOpen className="w-5 h-5" />
    }
];

const SKILLS = {
    "AI Research": [
        { name: "PyTorch", icon: <Zap className="w-4 h-4" /> },
        { name: "TensorFlow", icon: <Brain className="w-4 h-4" /> },
        { name: "HuggingFace Transformers", icon: <Bot className="w-4 h-4" /> },
        { name: "OpenAI Gym", icon: <Network className="w-4 h-4" /> },
        { name: "scikit-learn", icon: <Database className="w-4 h-4" /> },
        { name: "MATLAB", icon: <Cpu className="w-4 h-4" /> }
    ],
    "Software Engineering": [
        { name: "Python", icon: <FileCode className="w-4 h-4" /> },
        { name: "C/C++", icon: <Code2 className="w-4 h-4" /> },
        { name: "JavaScript (React)", icon: <Laptop2 className="w-4 h-4" /> },
        { name: "Git", icon: <GitBranch className="w-4 h-4" /> }
    ]
};

const PROJECTS = [
    {
        title: "Hardware-Aware Sequentialization of CNN Kernels",
        year: 2025,
        description:
            "Converted spatial CNN kernels into time-sequential forms to exploit an RNN-centric AI accelerator",
        detailedDescription: "Developed a novel approach to convert convolutional neural network operations into sequential forms optimized for RNN-based accelerator hardware. This research focused on hardware-aware optimization techniques that significantly improved throughput while maintaining model accuracy.",
        tags: ["C++", "Python", "PyTorch", "AI Acceleration"],
    },
    {
        title: "Rainbow DQN Tetris Agent",
        year: 2025,
        description:
            "Designed and trained a Rainbow DQN agent that surpasses human baseline on classic Tetris",
        detailedDescription: "Implemented a reinforcement learning agent using Rainbow DQN techniques (combining multiple DQN improvements) for playing Tetris. The agent incorporates prioritized experience replay, noisy networks for exploration, and distributional Q-learning to model uncertainty in returns.",
        tags: ["Python", "PyTorch", "Reinforcement Learning", "OpenAI Gym"],
    },
    {
        title: "Transformer from Scratch on Edge NPU",
        year: 2024,
        description:
            "Implemented a basic transformer architecture, quantized and compiled on Intel NPU",
        detailedDescription: "Built a transformer architecture from scratch with fundamental principles and optimized it for edge deployment. Implemented efficient quantization techniques to enable inference on resource-constrained neural processing units.",
        tags: ["Python", "Edge", "HuggingFace Transformers"],
    },
    {
        title: "Analytic Model of Horizontal Brazil Nut Effect",
        year: 2023,
        description:
            "Developed an analytic model explaining the horizontal Brazil nut effect through void filling mechanisms as part of physics graduation research.",
        detailedDescription: "Created a mathematical model to explain the physical phenomenon where larger particles aggregates to the center in heterogeneous granular materials when shaken horizontally. The research focused on void-filling mechanisms and resulted in a predictive model with experimental validation.",
        tags: ["Physics", "Mathematical Modeling"],
    },
];

const EXPERIENCE = [
    {
        role: "Research Intern",
        org: "LIST, Seoul National University",
        period: "May 2025 ~ Aug 2025",
        description: "Conducted research on hardware-aware AI optimization techniques in the Laboratory for Imaging science & technology. Focused on developing efficient neural network architectures for specialized hardware accelerators.",
        icon: <Award className="w-5 h-5" />,
    },
    {
        role: "Student Member",
        org: "DEEPEST(Research Group)",
        period: "Since 2025",
        description: "Active member of a student-led AI research community focused on deep learning and its applications. Collaborated on projects and participated in knowledge-sharing sessions on cutting-edge AI techniques.",
        icon: <BookOpen className="w-5 h-5" />,
    },
    {
        role: "STEM National Scholarship",
        org: "Korea Student Aid Foundation",
        period: "Since 2024",
        description: "Recipient of the prestigious National Scholarship for Outstanding STEM Students, awarded based on academic excellence and research potential in science and engineering fields.",
        icon: <GraduationCap className="w-5 h-5" />,
    },
];

// ---------------------- helpers ----------------------
const fadeIn = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: 0.15 * i, duration: 0.4 } }),
};

// Animation variants for projects
const projectAnimation = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: (i = 0) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            delay: 0.08 * i,
            duration: 0.4,
            ease: "easeOut"
        }
    }),
};

// Animation for filter text
const filterTextAnimation = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: {
        opacity: 1,
        height: "auto",
        marginTop: "0.75rem",
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        height: 0,
        marginTop: 0,
        transition: {
            duration: 0.2,
            ease: "easeIn"
        }
    }
};

// Helper function to check if a section is in view
const useActiveSectionObserver = () => {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const sections = document.querySelectorAll('section[id], header[id]');

        const observerOptions = {
            root: null,
            rootMargin: '-80px 0px -40% 0px', // Adjust these values as needed
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

        return () => {
            sections.forEach(section => {
                observer.unobserve(section);
            });
        };
    }, []);

    return activeSection;
};

function Section({ children, className }) {
    return (
        <motion.section
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
        >
            {children}
        </motion.section>
    );
}

// Custom heading component for consistent section headings
function SectionHeading({ children }) {
    return (
        <h2 className="text-3xl font-semibold mb-8 text-neutral-800 dark:text-white">
            {children}
        </h2>
    );
}

// Contact form component
function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);

        // Simulate form submission
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            // In a real application, you would send the form data to a server here

            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setSubmitStatus(null);
            }, 5000);
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-xl border ${errors.name ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-neutral-600'} bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.name}</p>}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-xl border ${errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-neutral-600'} bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-xl border ${errors.message ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-neutral-600'} bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
                {errors.message && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-xl font-medium transition-all ${isSubmitting
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                    } text-white shadow-lg hover:shadow-xl disabled:opacity-70`}
            >
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-green-50 border border-green-100 dark:bg-green-900/20 dark:border-green-800 text-green-700 dark:text-green-300 rounded-xl"
                >
                    Message sent successfully! I'll get back to you soon.
                </motion.div>
            )}

            {submitStatus === 'error' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-red-50 border border-red-100 dark:bg-red-900/20 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl"
                >
                    Something went wrong. Please try again later.
                </motion.div>
            )}        </form>
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
    const [currentPage, setCurrentPage] = useState('portfolio'); // New state for page switching
    const activeSection = useActiveSectionObserver();
    useEffect(() => {
        // Check if theme is stored in localStorage
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);

        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Add smooth scroll behavior for anchor links
        const handleAnchorClick = (e) => {
            const target = e.target.closest('a[href^="#"]');
            if (!target) return;

            e.preventDefault();
            const targetId = target.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get the height of the navbar for offset
                const navbarHeight = document.querySelector('nav').offsetHeight;

                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        };

        // Add event listener to the navigation links
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', handleAnchorClick);
        });

        // Cleanup event listeners
        return () => {
            document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
                anchor.removeEventListener('click', handleAnchorClick);
            });
        };
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
                    <ul className="flex gap-6 mr-4">
                        <li>
                            <a
                                href="#about"
                                className={`text-sm transition-colors ${activeSection === 'about'
                                    ? 'text-blue-400 font-medium'
                                    : 'hover:text-blue-400'
                                    }`}
                                aria-label="Navigate to About section"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#education"
                                className={`text-sm transition-colors ${activeSection === 'education'
                                    ? 'text-blue-400 font-medium'
                                    : 'hover:text-blue-400'
                                    }`}
                                aria-label="Navigate to Education section"
                            >
                                Education
                            </a>
                        </li>
                        <li>
                            <a
                                href="#skills"
                                className={`text-sm transition-colors ${activeSection === 'skills'
                                    ? 'text-blue-400 font-medium'
                                    : 'hover:text-blue-400'
                                    }`}
                                aria-label="Navigate to Skills section"
                            >
                                Skills
                            </a>
                        </li>
                        <li>
                            <a
                                href="#projects"
                                className={`text-sm transition-colors ${activeSection === 'projects'
                                    ? 'text-blue-400 font-medium'
                                    : 'hover:text-blue-400'
                                    }`}
                                aria-label="Navigate to Projects section"
                            >
                                Projects
                            </a>
                        </li>
                        <li>
                            <a
                                href="#experience"
                                className={`text-sm transition-colors ${activeSection === 'experience'
                                    ? 'text-blue-400 font-medium'
                                    : 'hover:text-blue-400'
                                    }`}
                                aria-label="Navigate to Experience section"
                            >
                                Experience
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className={`text-sm transition-colors ${activeSection === 'contact'
                                    ? 'text-blue-400 font-medium'
                                    : 'hover:text-blue-400'
                                    }`}
                                aria-label="Navigate to Contact section"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                    <button
                        onClick={switchPage}
                        className="px-3 py-1 mr-4 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                        aria-label="Switch to blank page"
                    >
                        Blank Page
                    </button>
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
        </motion.nav>

        {/* Hero */}
        <header id="about" className="relative overflow-hidden">
            <motion.div
                className="container mx-auto px-6 py-24 flex flex-col items-start gap-4"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
            >
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    {PROFILE.name}
                </h1>                <p className="text-xl md:text-2xl text-blue-400/90">
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
                </div>

                <motion.a
                    href="/cv.pdf"
                    download
                    className="inline-block mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Download CV
                </motion.a>
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
