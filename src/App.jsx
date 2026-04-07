import { useEffect, useState } from "react";
import { Footer } from "./components/layout/Footer";
import { ProjectModal } from "./components/modals/ProjectDetailModal";
import { Navigation } from "./components/navigation/Navigation";
import { ContactSection } from "./components/sections/ContactSection";
import { EducationSection } from "./components/sections/EducationSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { Hero } from "./components/sections/Hero";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { PublicationsSection } from "./components/sections/PublicationsSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { EDUCATION, EXPERIENCE, PROFILE, PROJECTS, PUBLICATIONS, SKILLS } from "./data/profile";
import { useActiveSectionObserver, useTheme } from "./hooks";

export default function PortfolioPage() {
    const [activeSkills, setActiveSkills] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showAllProjects, setShowAllProjects] = useState(false);
    const activeSection = useActiveSectionObserver();
    const { theme, toggleTheme } = useTheme();

    const filteredProjects = activeSkills.length
        ? PROJECTS.filter((project) => activeSkills.some((skill) => project.tags.includes(skill)))
        : PROJECTS;

    const sortedProjects = filteredProjects
        .slice()
        .sort((a, b) => Number(b.showOnTop) - Number(a.showOnTop) || Number(b.year) - Number(a.year));

    const topProjects = sortedProjects.filter((project) => project.showOnTop);
    const visibleProjects = showAllProjects ? sortedProjects : topProjects.length ? topProjects : sortedProjects;

    useEffect(() => {
        setShowAllProjects(false);
    }, [activeSkills]);

    const toggleSkill = (skill) => {
        setActiveSkills((prev) => (prev.includes(skill) ? prev.filter((item) => item !== skill) : [...prev, skill]));
    };

    return (
        <div className="page-shell selection:bg-[rgba(201,100,66,0.24)]">
            <Navigation
                profileName={PROFILE.name}
                theme={theme}
                toggleTheme={toggleTheme}
                activeSection={activeSection}
                secondaryLinks={[{ href: `${import.meta.env.BASE_URL}blog/`, label: "Blog" }]}
            />
            <Hero profile={PROFILE} />
            <EducationSection education={EDUCATION} />
            <ExperienceSection experience={EXPERIENCE} />
            <PublicationsSection publications={PUBLICATIONS} />
            <SkillsSection
                skills={SKILLS}
                activeSkills={activeSkills}
                toggleSkill={toggleSkill}
                onClearFilters={() => setActiveSkills([])}
            />
            <ProjectsSection
                projects={visibleProjects}
                totalProjects={filteredProjects.length}
                isExpanded={showAllProjects}
                onToggleExpand={() => setShowAllProjects((prev) => !prev)}
                onProjectSelect={setSelectedProject}
            />
            <ContactSection />
            <Footer profileName={PROFILE.name} />
            <ProjectModal selectedProject={selectedProject} onClose={() => setSelectedProject(null)} />
        </div>
    );
}
