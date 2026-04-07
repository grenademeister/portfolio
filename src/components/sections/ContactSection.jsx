import { ContactForm } from "../forms/ContactForm";
import { Section, SectionHeading } from "../ui/Section";

export function ContactSection() {
    return (
        <Section id="contact" className="section-divider">
            <div className="page-container">
                <SectionHeading>Contact</SectionHeading>
                <div className="surface-card max-w-2xl rounded-[2rem] p-6 sm:p-8">
                    <ContactForm />
                </div>
            </div>
        </Section>
    );
}
