import { useEffect, useState } from "react";
import { Navigation } from "./components/navigation/Navigation";
import { Hero } from "./components/sections/Hero";
import { EducationSection } from "./components/sections/EducationSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { ProjectModal } from "./components/modals/ProjectDetailModal";
import { Footer } from "./components/layout/Footer";
import { PROFILE, EDUCATION, SKILLS, PROJECTS, EXPERIENCE } from "./data/profile";
import { useActiveSectionObserver, useTheme } from "./hooks";

const PROJECT_PREVIEW_COUNT = 3;

export default function PortfolioPage() {
    const [activeSkills, setActiveSkills] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showAllProjects, setShowAllProjects] = useState(false);
    const activeSection = useActiveSectionObserver();
    const { theme, toggleTheme } = useTheme();

    const filteredProjects = activeSkills.length
        ? PROJECTS.filter((project) =>
            activeSkills.some((skill) => project.tags.includes(skill))
        )
        : PROJECTS;

    const visibleProjects = showAllProjects
        ? filteredProjects
        : filteredProjects.slice(0, PROJECT_PREVIEW_COUNT);

    const toggleSkill = (skill) => {
        setActiveSkills((prev) =>
            prev.includes(skill)
                ? prev.filter((item) => item !== skill)
                : [...prev, skill]
        );
    };

    useEffect(() => {
        setShowAllProjects(false);
    }, [activeSkills]);

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 font-sans antialiased selection:bg-blue-600/90">
            <Navigation
                profileName={PROFILE.name}
                theme={theme}
                toggleTheme={toggleTheme}
                activeSection={activeSection}
            />

            <Hero profile={PROFILE} />

            <EducationSection education={EDUCATION} />

            <ExperienceSection experience={EXPERIENCE} />

            <SkillsSection
                skills={SKILLS}
                activeSkills={activeSkills}
                toggleSkill={toggleSkill}
                onClearFilters={() => setActiveSkills([])}
            />

            <ProjectsSection
                projects={visibleProjects}
                totalProjects={filteredProjects.length}
                previewCount={PROJECT_PREVIEW_COUNT}
                isExpanded={showAllProjects}
                onToggleExpand={() => setShowAllProjects((prev) => !prev)}
                onProjectSelect={setSelectedProject}
            />

            <Footer profileName={PROFILE.name} />

            <ProjectModal
                selectedProject={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    );
}
