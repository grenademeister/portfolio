import { Section, SectionHeading } from "../ui/Section";

export function ExperienceSection({ experience }) {
    return (
        <Section id="experience" className="section-divider">
            <div className="page-container">
                <SectionHeading>Experience & Honors</SectionHeading>
                <div className="ruled-list">
                    {experience.map((exp) => (
                        <article key={`${exp.role}-${exp.org}`} className="notebook-entry grid gap-2 sm:grid-cols-[150px_1fr] md:grid-cols-[180px_1fr]">
                            <p className="meta">{exp.period}</p>
                            <div>
                                <h3 className="text-lg leading-7 text-[color:var(--text)]">
                                    {exp.role}; {exp.org}
                                </h3>
                                <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">{exp.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </Section>
    );
}
