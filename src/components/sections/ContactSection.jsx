import { Section, SectionHeading } from "../ui/Section";
import { ContactForm } from "../forms/ContactForm";

export function ContactSection() {
    return (
        <Section id="contact" className="container mx-auto px-6 py-16">
            <SectionHeading>Contact</SectionHeading>
            <div className="max-w-2xl">
                <ContactForm />
            </div>
        </Section>
    );
}
