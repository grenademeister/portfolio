import { getIcon } from "../../utils/iconMap";
import { Section, SectionHeading } from "../ui/Section";

export function EducationSection({ education }) {
    return (
        <Section id="education" className="section-divider">
            <div className="page-container">
                <SectionHeading>Education</SectionHeading>
                <div className="space-y-5">
                    {education.map((edu) => (
                        <article key={edu.institution} className="surface-card rounded-[2rem] p-6 sm:p-8">
                            <div className="flex items-start justify-between gap-6">
                                <div>
                                    <h3 className="font-editorial text-3xl leading-tight">{edu.institution}</h3>
                                    <p className="mt-3 text-base sm:text-lg" style={{ color: "var(--text-muted)" }}>{edu.degree}</p>
                                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm" style={{ color: "var(--text-soft)" }}>
                                        <span>{edu.period}</span>
                                        <span>GPA: {edu.gpa}</span>
                                    </div>
                                </div>
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ background: "var(--surface-strong)", color: "var(--accent)" }}>
                                    {getIcon(edu.icon, { className: "h-5 w-5" })}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </Section>
    );
}
