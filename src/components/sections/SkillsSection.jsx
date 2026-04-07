import { AnimatePresence, motion } from "framer-motion";
import { fadeIn, filterTextAnimation } from "../../constants/animations";
import { getIcon } from "../../utils/iconMap";
import { Section, SectionHeading } from "../ui/Section";

export function SkillsSection({ skills, activeSkills, toggleSkill, onClearFilters }) {
    return (
        <Section id="skills" className="section-divider">
            <div className="page-container">
                <SectionHeading>Core Skills</SectionHeading>
                <div className="space-y-8">
                    {Object.entries(skills).map(([category, skillsList], categoryIndex) => (
                        <div key={category} className="space-y-4">
                            <h3 className="text-lg font-medium sm:text-xl" style={{ color: "var(--text)" }}>
                                {category}
                            </h3>
                            <ul className="flex flex-wrap gap-3">
                                {skillsList.map((skill, i) => {
                                    const isActive = activeSkills.includes(skill.name);
                                    return (
                                        <motion.li
                                            key={skill.name}
                                            custom={categoryIndex * skillsList.length + i}
                                            variants={fadeIn}
                                            className="flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 transition-all"
                                            style={{
                                                background: isActive ? "var(--accent)" : "var(--surface)",
                                                color: isActive ? "#ffffff" : "var(--text-muted)",
                                                boxShadow: isActive ? "0 18px 34px rgba(201,100,66,0.22)" : "0 0 0 1px var(--border)"
                                            }}
                                            onClick={() => toggleSkill(skill.name)}
                                            role="button"
                                            aria-pressed={isActive}
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    toggleSkill(skill.name);
                                                }
                                            }}
                                        >
                                            <span style={{ color: isActive ? "#ffffff" : "var(--accent)" }}>
                                                {getIcon(skill.icon, { className: "h-4 w-4" })}
                                            </span>
                                            {skill.name}
                                        </motion.li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>

                <AnimatePresence>
                    {activeSkills.length > 0 && (
                        <motion.div
                            className="mt-4 text-sm"
                            style={{ color: "var(--text-muted)" }}
                            variants={filterTextAnimation}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <p>
                                Showing projects that use any of: {" "}
                                {activeSkills.map((skill, index) => (
                                    <span key={skill}>
                                        <span style={{ color: "var(--accent)" }}>{skill}</span>
                                        {index < activeSkills.length - 1 ? ", " : ""}
                                    </span>
                                ))}
                            </p>
                            <button onClick={onClearFilters} className="mt-1 text-xs transition-colors" style={{ color: "var(--accent)" }}>
                                Clear filters
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Section>
    );
}
