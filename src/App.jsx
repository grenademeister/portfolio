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
    const [currentPage, setCurrentPage] = useState('portfolio');

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
        return <BlankPage switchPage={switchPage} />;
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
