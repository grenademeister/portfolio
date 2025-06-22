import { motion } from "framer-motion";
import { Section, SectionHeading } from "../ui/Section";
import { fadeIn } from "../../constants/animations";
import { getIcon } from "../../utils/iconMap";

/**
 * Education section component displaying academic background
 */
export function EducationSection({ education }) {
    return (
        <Section id="education" className="container mx-auto px-6 py-16">
            <SectionHeading>Education</SectionHeading>
            <ul className="space-y-8">
                {education.map((edu, i) => (
                    <motion.li
                        key={edu.institution}
                        custom={i}
                        variants={fadeIn}
                        className="flex flex-col md:flex-row md:items-center gap-6 p-6 bg-white/90 dark:bg-neutral-800/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-transparent shadow-md"
                    >
                        <div className="flex-shrink-0 p-4 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-600 dark:text-blue-500">
                            {getIcon(edu.icon, { className: "w-5 h-5" })}
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-xl font-medium text-neutral-900 dark:text-white">
                                {edu.institution}
                            </h3>
                            <p className="text-neutral-700 dark:text-neutral-300 mt-1">
                                {edu.degree}
                            </p>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                    {edu.period}
                                </span>
                                <span className="text-sm px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg">
                                    GPA: {edu.gpa}
                                </span>
                            </div>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </Section>
    );
}
