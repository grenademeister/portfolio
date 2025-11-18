import { Section, SectionHeading } from "../ui/Section";
import { ContactForm } from "../forms/ContactForm";

/**
 * Contact section component with contact form
 */
export function ContactSection() {
    return (
        <Section id="contact" className="container mx-auto px-6 py-16">
            <SectionHeading>Get In Touch</SectionHeading>
            <div className="max-w-2xl mx-auto">
                <div className="bg-white/90 dark:bg-neutral-800/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-transparent shadow-md p-8">
                    <ContactForm />
                </div>
            </div>
        </Section>
    );
}
