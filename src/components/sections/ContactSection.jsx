import { Section, SectionHeading } from "../ui/Section";

export function ContactSection({ email }) {
    return (
        <Section id="contact" className="section-divider">
            <div className="page-container">
                <SectionHeading>Contact</SectionHeading>
                <p className="max-w-2xl text-sm leading-7 text-[color:var(--text-muted)]">
                    For research, project, or collaboration inquiries, email me at{" "}
                    <a href={`mailto:${email}`} className="text-link">{email}</a>.
                </p>
            </div>
        </Section>
    );
}
