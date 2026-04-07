import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export function ProjectModal({ selectedProject, onClose }) {
    if (!selectedProject) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border p-6 md:p-8"
                    style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text)", boxShadow: "var(--shadow)" }}
                    initial={{ scale: 0.96, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.96, y: 20, opacity: 0 }}
                    transition={{ type: "spring", damping: 24 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="mb-6 flex items-start justify-between">
                        <div>
                            <h2 className="mb-1 text-2xl font-bold" style={{ color: "var(--text)" }}>
                                {selectedProject.title}
                            </h2>
                            <p style={{ color: "var(--accent)" }}>{selectedProject.year}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="ring-button h-10 w-10 px-0"
                            aria-label="Close project details"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
                            {selectedProject.detailedDescription || selectedProject.description}
                        </p>

                        <div>
                            <h3 className="mb-3 text-lg font-medium" style={{ color: "var(--text)" }}>
                                Technologies
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {selectedProject.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full px-3 py-1 text-sm"
                                        style={{ background: "var(--surface-strong)", color: "var(--text-muted)", boxShadow: "0 0 0 1px var(--border)" }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
