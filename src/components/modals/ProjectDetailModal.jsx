import { motion, AnimatePresence } from "framer-motion";

/**
 * Project detail modal component
 */
export function ProjectModal({ selectedProject, onClose }) {
    if (!selectedProject) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="bg-white dark:bg-neutral-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-200 dark:border-transparent shadow-xl"
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 20, opacity: 0 }}
                    transition={{ type: "spring", damping: 25 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6 md:p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
                                    {selectedProject.title}
                                </h2>
                                <p className="text-blue-600 dark:text-blue-400">{selectedProject.year}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                                aria-label="Close project details"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M18 6L6 18M6 6L18 18"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-6">
                            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                {selectedProject.detailedDescription || selectedProject.description}
                            </p>

                            <div>
                                <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-3">
                                    Technologies
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-neutral-700 dark:text-blue-200 rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
