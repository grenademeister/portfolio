import { ContactForm } from "../forms/ContactForm";
import { Section, SectionHeading } from "../ui/Section";

export function ContactSection() {
    return (
        <Section id="contact" className="section-divider">
            <div className="page-container">
                <SectionHeading>Contact</SectionHeading>
                <div className="max-w-2xl">
                    <ContactForm />
                </div>
            </div>
        </Section>
    );
}
