import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "../ui/Section";

export function PublicationsSection({ publications }) {
    return (
        <Section id="publications" className="section-divider">
            <div className="page-container">
                <SectionHeading>Publications</SectionHeading>
                <div className="ruled-list">
                    {publications.map((publication) => (
                        <article key={publication.title} className="notebook-entry grid gap-2 sm:grid-cols-[150px_1fr] md:grid-cols-[180px_1fr]">
                            <p className="meta">{publication.year}</p>
                            <div>
                                <h3 className="text-xl leading-7 text-[color:var(--text)]">
                                    {publication.title}
                                </h3>
                                <p className="mt-1 text-sm leading-6 text-[color:var(--text-soft)]">
                                    {publication.venue}
                                </p>
                                <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                                    {publication.shortAuthors}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                                    {publication.arxivUrl ? <a href={publication.arxivUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-link">arXiv <ArrowUpRight className="h-3.5 w-3.5" /></a> : null}
                                    {publication.pdfUrl ? <a href={publication.pdfUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-link">PDF <ArrowUpRight className="h-3.5 w-3.5" /></a> : null}
                                    {publication.doiUrl ? <a href={publication.doiUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-link">DOI <ArrowUpRight className="h-3.5 w-3.5" /></a> : null}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </Section>
    );
}
