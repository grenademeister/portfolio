import { getIcon } from "../../utils/iconMap";
import { Section, SectionHeading } from "../ui/Section";

export function ExperienceSection({ experience }) {
    return (
        <Section id="experience" className="section-divider">
            <div className="page-container">
                <SectionHeading>Experience & Honors</SectionHeading>
                <div className="space-y-8">
                    {experience.map((exp) => (
                        <article key={`${exp.role}-${exp.org}`} className="grid gap-4 border-t pt-8 first:border-t-0 first:pt-0 md:grid-cols-[44px_1fr]" style={{ borderColor: "var(--border)" }}>
                            <div className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: "var(--surface-strong)", color: "var(--accent)" }}>
                                {getIcon(exp.icon, { className: "h-5 w-5" })}
                            </div>
                            <div>
                                <p className="font-medium leading-tight" style={{ color: "var(--text)" }}>
                                    {exp.role} · {exp.org}
                                </p>
                                <p className="mt-1 text-sm" style={{ color: "var(--text-soft)" }}>{exp.period}</p>
                                <p className="mt-2 text-sm leading-7" style={{ color: "var(--text-muted)" }}>{exp.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </Section>
    );
}
