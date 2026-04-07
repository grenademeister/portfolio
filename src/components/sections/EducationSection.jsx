import { getIcon } from "../../utils/iconMap";
import { Section, SectionHeading } from "../ui/Section";

export function EducationSection({ education }) {
    return (
        <Section id="education" className="section-divider">
            <div className="page-container">
                <SectionHeading>Education</SectionHeading>
                <div className="space-y-8">
                    {education.map((edu) => (
                        <article key={edu.institution} className="grid gap-4 border-t pt-8 first:border-t-0 first:pt-0 md:grid-cols-[44px_1fr]" style={{ borderColor: "var(--border)" }}>
                            <div className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: "var(--surface-strong)", color: "var(--accent)" }}>
                                {getIcon(edu.icon, { className: "h-5 w-5" })}
                            </div>
                            <div>
                                <p className="font-medium leading-tight" style={{ color: "var(--text)" }}>
                                    {edu.degree} · {edu.institution}
                                </p>
                                <p className="mt-1 text-sm" style={{ color: "var(--text-soft)" }}>
                                    {edu.period}{edu.gpa ? ` · GPA: ${edu.gpa}` : ""}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </Section>
    );
}
