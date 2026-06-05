import { X } from "lucide-react";

export function ProjectModal({ selectedProject, onClose }) {
    if (!selectedProject) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                className="max-h-[82vh] w-full max-w-2xl overflow-y-auto border bg-[var(--surface)] p-6 md:p-8"
                style={{ borderColor: "var(--border)", color: "var(--text)", borderRadius: "4px" }}
                onClick={(e) => e.stopPropagation()}
            >
                    <div className="mb-6 flex items-start justify-between gap-6 border-b pb-5" style={{ borderColor: "var(--border)" }}>
                        <div>
                            <p className="meta">{selectedProject.year}</p>
                            <h2 className="mt-1 text-2xl leading-8 text-[color:var(--text)]">
                                {selectedProject.title}
                            </h2>
                        </div>
                        <button onClick={onClose} className="plain-button h-9 w-9 shrink-0 px-0" aria-label="Close project details">
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="space-y-7">
                        <p className="leading-8 text-[color:var(--text-muted)]">
                            {selectedProject.detailedDescription || selectedProject.description}
                        </p>

                        <div>
                            <h3 className="meta uppercase tracking-[0.12em]">
                                Technologies
                            </h3>
                            <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">
                                {selectedProject.tags.join(" / ")}
                            </p>
                        </div>
                    </div>
            </div>
        </div>
    );
}
