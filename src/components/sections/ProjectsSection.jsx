import { Section, SectionHeading } from "../ui/Section";

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
                    <p className="mt-4 text-sm text-[color:var(--text-muted)]">
                        No projects match the selected filters yet.
                    </p>
                ) : (
                    <>
                        <div className="ruled-list">
                            {projects.map((project) => (
                                <article
                                    key={project.title}
                                    className="notebook-entry grid cursor-pointer gap-2 sm:grid-cols-[86px_1fr] md:grid-cols-[100px_1fr]"
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
                                    <p className="meta">{project.year}</p>
                                    <div>
                                        <h3 className="text-xl leading-7 text-[color:var(--text)] underline-offset-4 hover:underline">
                                            {project.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">
                                            {project.description}
                                        </p>
                                        <p className="mt-3 text-xs leading-6 text-[color:var(--text-soft)]">
                                            {project.tags.join(" / ")}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {canToggle && (
                            <div className="mt-8">
                                <button onClick={onToggleExpand} aria-expanded={isExpanded} className="plain-button">
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
