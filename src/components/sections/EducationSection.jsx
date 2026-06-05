import { Section, SectionHeading } from "../ui/Section";

export function EducationSection({ education }) {
    return (
        <Section id="education" className="section-divider">
            <div className="page-container">
                <SectionHeading>Education</SectionHeading>
                <div className="ruled-list">
                    {education.map((edu) => (
                        <article key={edu.institution} className="notebook-entry grid gap-2 sm:grid-cols-[150px_1fr] md:grid-cols-[180px_1fr]">
                            <p className="meta">{edu.period}</p>
                            <div>
                                <h3 className="text-lg leading-7 text-[color:var(--text)]">
                                    {edu.institution}
                                </h3>
                                <p className="mt-1 text-sm leading-6 text-[color:var(--text-muted)]">
                                    {edu.degree}{edu.gpa ? `; GPA ${edu.gpa}` : ""}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </Section>
    );
}
