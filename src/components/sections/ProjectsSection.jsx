import { motion } from "framer-motion";
import { Section, SectionHeading } from "../ui/Section";
import { projectAnimation } from "../../constants/animations";

export function ProjectsSection({
    projects,
    totalProjects,
    isExpanded,
    onToggleExpand,
    onProjectSelect
}) {
    const canToggle = totalProjects > projects.length || isExpanded;
    const toggleLabel = isExpanded ? "Show fewer" : `Show all (${totalProjects})`;

    return (
        <Section id="projects" className="section-divider">
            <div className="page-container">
                <SectionHeading>Projects & Research</SectionHeading>

                {totalProjects === 0 ? (
                    <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
                        No projects match the selected filters yet.
                    </p>
                ) : (
                    <>
                        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project, i) => (
                                <motion.div
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
                                    whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }}
                                    onClick={() => onProjectSelect(project)}
                                    role="button"
                                    aria-label={`View details for ${project.title}`}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            onProjectSelect(project);
                                        }
                                    }}
                                >
                                    <article className="h-full rounded-[2rem] p-5 sm:p-6" style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow)" }}>
                                        <div className="flex h-full flex-col gap-4">
                                            <header>
                                                <h3 className="text-lg font-medium leading-snug sm:text-xl" style={{ color: "var(--text)" }}>
                                                    {project.title}
                                                </h3>
                                                <span className="text-sm" style={{ color: "var(--text-soft)" }}>
                                                    {project.year}
                                                </span>
                                            </header>
                                            <p className="flex-grow text-sm leading-6" style={{ color: "var(--text-muted)" }}>
                                                {project.description}
                                            </p>
                                            <ul className="mt-auto flex flex-wrap gap-2">
                                                {project.tags.map((tag) => (
                                                    <li key={tag} className="rounded-full px-2.5 py-1 text-xs" style={{ background: "var(--surface-strong)", color: "var(--text-muted)", boxShadow: "0 0 0 1px var(--border)" }}>
                                                        {tag}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </article>
                                </motion.div>
                            ))}
                        </div>

                        {canToggle && (
                            <div className="mt-8 flex justify-center">
                                <button
                                    onClick={onToggleExpand}
                                    aria-expanded={isExpanded}
                                    className="ring-button"
                                >
                                    {toggleLabel}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Section>
    );
}
