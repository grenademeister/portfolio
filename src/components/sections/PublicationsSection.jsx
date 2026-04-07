import { ArrowUpRight, FileText } from "lucide-react";
import { Section, SectionHeading } from "../ui/Section";

export function PublicationsSection({ publications }) {
    return (
        <Section id="publications" className="section-divider">
            <div className="page-container">
                <SectionHeading>Publications</SectionHeading>
                <div className="space-y-8">
                    {publications.map((publication) => (
                        <article key={publication.title} className="surface-card rounded-[2rem] p-6 sm:p-8 lg:p-10">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                <div className="max-w-3xl">
                                    <div className="flex items-center gap-3 text-sm uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>
                                        <FileText className="h-4 w-4" />
                                        <span>{publication.year}</span>
                                        <span style={{ color: "var(--text-soft)" }}>{publication.venue}</span>
                                    </div>
                                    <h3 className="mt-4 font-editorial text-3xl leading-tight sm:text-4xl">{publication.title}</h3>
                                    <p className="mt-4 text-base leading-7" style={{ color: "var(--text-muted)" }}>{publication.summary}</p>
                                    <p className="mt-5 text-sm leading-7" style={{ color: "var(--text-soft)" }}>{publication.shortAuthors}</p>
                                </div>
                                <div className="flex flex-wrap gap-3 lg:max-w-xs lg:justify-end">
                                    {publication.arxivUrl ? <a href={publication.arxivUrl} target="_blank" rel="noreferrer" className="ring-button gap-2">arXiv <ArrowUpRight className="h-4 w-4" /></a> : null}
                                    {publication.pdfUrl ? <a href={publication.pdfUrl} target="_blank" rel="noreferrer" className="ring-button gap-2">PDF <ArrowUpRight className="h-4 w-4" /></a> : null}
                                    {publication.doiUrl ? <a href={publication.doiUrl} target="_blank" rel="noreferrer" className="ring-button gap-2">DOI <ArrowUpRight className="h-4 w-4" /></a> : null}
                                </div>
                            </div>
                            <div className="mt-8 grid gap-6 border-t pt-8 lg:grid-cols-[1.2fr_0.8fr]" style={{ borderColor: "var(--border)" }}>
                                <p className="text-base leading-7" style={{ color: "var(--text-muted)" }}>{publication.abstract}</p>
                                <ul className="flex flex-wrap content-start gap-2 lg:justify-end">
                                    {publication.tags.map((tag) => (
                                        <li key={tag} className="rounded-full px-3 py-1 text-sm" style={{ background: "var(--surface-strong)", color: "var(--text-muted)", boxShadow: "0 0 0 1px var(--border)" }}>
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </Section>
    );
}
