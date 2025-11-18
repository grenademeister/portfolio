import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeading } from "../ui/Section";
import { fadeIn, filterTextAnimation } from "../../constants/animations";
import { getIcon } from "../../utils/iconMap";

/**
 * Skills section component with interactive skill filtering
 */
export function SkillsSection({ skills, activeSkills, toggleSkill, onClearFilters }) {
    return (
        <Section id="skills" className="container mx-auto px-6 py-16">
            <SectionHeading>Core Skills</SectionHeading>
            <div className="space-y-8">
                {Object.entries(skills).map(([category, skillsList], categoryIndex) => (
                    <div key={category} className="space-y-4">
                        <h3 className="text-xl font-medium text-neutral-800 dark:text-neutral-200">
                            {category}
                        </h3>
                        <ul className="flex flex-wrap gap-3">
                            {skillsList.map((skill, i) => (
                                <motion.li
                                    key={skill.name}
                                    custom={categoryIndex * skillsList.length + i}
                                    variants={fadeIn}
                                    className={
                                        "px-4 py-2 rounded-2xl border transition-all cursor-pointer flex items-center gap-2 " +
                                        (activeSkills.includes(skill.name)
                                            ? "bg-blue-600/80 text-white border-blue-500 dark:bg-blue-600/80 dark:border-blue-500"
                                            : "border-gray-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800")
                                    }
                                    onClick={() => toggleSkill(skill.name)}
                                    role="button"
                                    aria-pressed={activeSkills.includes(skill.name)}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            toggleSkill(skill.name);
                                        }
                                    }}
                                >
                                    <span className={
                                        activeSkills.includes(skill.name)
                                            ? "text-white"
                                            : "text-blue-600 dark:text-blue-400"
                                    }>
                                        {getIcon(skill.icon, { className: "w-4 h-4" })}
                                    </span>
                                    {skill.name}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {activeSkills.length > 0 && (
                    <motion.div
                        className="mt-4 text-sm text-neutral-600 dark:text-neutral-400"
                        variants={filterTextAnimation}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <p>
                            Showing projects that use any of: {" "}
                            {activeSkills.map((skill, index) => (
                                <span key={skill}>
                                    <span className="underline text-blue-600 dark:text-blue-400">{skill}</span>
                                    {index < activeSkills.length - 1 ? ", " : ""}
                                </span>
                            ))}
                        </p>
                        <button
                            onClick={onClearFilters}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mt-1 text-xs transition-colors"
                        >
                            Clear filters
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </Section>
    );
}
