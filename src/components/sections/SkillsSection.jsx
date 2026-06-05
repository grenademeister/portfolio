import { Section, SectionHeading } from "../ui/Section";

export function SkillsSection({ skills, activeSkills, toggleSkill, onClearFilters }) {
    return (
        <Section id="skills" className="section-divider">
            <div className="page-container">
                <SectionHeading>Core Skills</SectionHeading>
                <div className="ruled-list">
                    {Object.entries(skills).map(([category, skillsList]) => (
                        <section key={category} className="notebook-entry grid gap-3 sm:grid-cols-[150px_1fr] md:grid-cols-[180px_1fr]">
                            <h3 className="meta uppercase tracking-[0.12em]">{category}</h3>
                            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm leading-7">
                                {skillsList.map((skill) => {
                                    const isActive = activeSkills.includes(skill.name);
                                    return (
                                        <li key={skill.name}>
                                            <button
                                                type="button"
                                                className="underline-offset-4 hover:underline"
                                                style={{ color: isActive ? "var(--accent)" : "var(--text-muted)" }}
                                                onClick={() => toggleSkill(skill.name)}
                                                aria-pressed={isActive}
                                            >
                                                {skill.name}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    ))}
                </div>

                {activeSkills.length > 0 ? (
                    <div
                        className="mt-4 border-l pl-4 text-sm leading-7 text-[color:var(--text-muted)]"
                        style={{ borderColor: "var(--border)" }}
                    >
                            <p>
                                Showing projects that use any of: {" "}
                                {activeSkills.map((skill, index) => (
                                    <span key={skill}>
                                        <span className="text-[color:var(--accent)]">{skill}</span>
                                        {index < activeSkills.length - 1 ? ", " : ""}
                                    </span>
                                ))}
                            </p>
                            <button onClick={onClearFilters} className="text-link">
                                Clear filters
                            </button>
                    </div>
                ) : null}
            </div>
        </Section>
    );
}
