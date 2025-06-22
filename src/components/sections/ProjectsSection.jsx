import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Section, SectionHeading } from "../ui/Section";
import { projectAnimation } from "../../constants/animations";

/**
 * Projects section component displaying project portfolio
 */
export function ProjectsSection({ projects, onProjectSelect }) {
    return (
        <Section id="projects" className="container mx-auto px-6 py-16">
            <SectionHeading>Projects & Research</SectionHeading>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.title}
                        custom={i}
                        variants={projectAnimation}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            duration: 0.4,
                            type: "spring",
                            stiffness: 150,
                            damping: 15
                        }}
                        style={{
                            transformOrigin: "center"
                        }}
                        whileHover={{
                            y: -8,
                            transition: { duration: 0.2, ease: "easeOut" }
                        }}
                        onClick={() => onProjectSelect(project)}
                        role="button"
                        aria-label={`View details for ${project.title}`}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                onProjectSelect(project);
                            }
                        }}
                    >
                        <Card className="h-full rounded-2xl bg-white/90 dark:bg-neutral-800/80 backdrop-blur-xl border border-gray-200 dark:border-transparent shadow-md hover:shadow-xl transition-all group cursor-pointer">
                            <CardContent className="p-6 flex flex-col gap-4 h-full">
                                <header>
                                    <h3 className="text-xl font-medium leading-snug text-neutral-800 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                        {project.year}
                                    </span>
                                </header>
                                <p className="text-sm text-neutral-700 dark:text-neutral-300 flex-grow">
                                    {project.description}
                                </p>
                                <ul className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.map((tag) => (
                                        <li
                                            key={tag}
                                            className="text-xs px-2 py-1 bg-blue-50 text-blue-700 dark:bg-neutral-700 dark:text-blue-200 rounded-xl group-hover:bg-blue-100 dark:group-hover:bg-neutral-600 transition-colors"
                                        >
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}
