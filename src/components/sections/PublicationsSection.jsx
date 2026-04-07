import { ArrowUpRight, FileText } from "lucide-react";
import { Section, SectionHeading } from "../ui/Section";

export function PublicationsSection({ publications }) {
    return (
        <Section id="publications" className="section-divider">
            <div className="page-container">
                <SectionHeading>Publications</SectionHeading>
                <div className="space-y-8">
                    {publications.map((publication) => (
                        <article key={publication.title} className="grid gap-4 border-t pt-8 first:border-t-0 first:pt-0 md:grid-cols-[44px_1fr]" style={{ borderColor: "var(--border)" }}>
                            <div className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: "var(--surface-strong)", color: "var(--accent)" }}>
                                <FileText className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-medium leading-tight" style={{ color: "var(--text)" }}>
                                    {publication.title}
                                </p>
                                <p className="mt-1 text-sm" style={{ color: "var(--text-soft)" }}>
                                    {publication.venue} · {publication.year}
                                </p>
                                <p className="mt-2 text-sm leading-7" style={{ color: "var(--text-muted)" }}>
                                    {publication.shortAuthors}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                                    {publication.arxivUrl ? <a href={publication.arxivUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1" style={{ color: "var(--text-muted)" }}>arXiv <ArrowUpRight className="h-4 w-4" /></a> : null}
                                    {publication.pdfUrl ? <a href={publication.pdfUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1" style={{ color: "var(--text-muted)" }}>PDF <ArrowUpRight className="h-4 w-4" /></a> : null}
                                    {publication.doiUrl ? <a href={publication.doiUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1" style={{ color: "var(--text-muted)" }}>DOI <ArrowUpRight className="h-4 w-4" /></a> : null}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </Section>
    );
}
