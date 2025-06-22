import { motion } from "framer-motion";
import { Section, SectionHeading } from "../ui/Section";
import { fadeIn } from "../../constants/animations";
import { getIcon } from "../../utils/iconMap";

/**
 * Experience section component displaying work experience and honors
 */
export function ExperienceSection({ experience }) {
    return (
        <Section id="experience" className="container mx-auto px-6 py-16">
            <SectionHeading>Experience & Honors</SectionHeading>
            <ul className="space-y-6">
                {experience.map((exp, i) => (
                    <motion.li
                        key={exp.role}
                        custom={i}
                        variants={fadeIn}
                        className="flex items-start gap-4"
                    >
                        <span className="mt-1 text-blue-500 dark:text-blue-400">
                            {getIcon(exp.icon, { className: "w-5 h-5" })}
                        </span>
                        <div>
                            <p className="font-medium leading-tight text-neutral-800 dark:text-neutral-100">
                                {exp.role} · {exp.org}
                            </p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                {exp.period}
                            </p>
                            <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                {exp.description}
                            </p>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </Section>
    );
}
