import { FileText } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Section, SectionHeading } from "../ui/Section";

export function PublicationsSection({ publications }) {
    return (
        <Section id="publications" className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <SectionHeading>Publications</SectionHeading>

            <div className="grid gap-6">
                {publications.map((publication) => (
                    <Card
                        key={publication.title}
                        className="rounded-2xl bg-white/90 dark:bg-neutral-800/80 backdrop-blur-xl border border-gray-200 dark:border-transparent shadow-md"
                    >
                        <CardContent className="p-5 sm:p-6 flex flex-col gap-4">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <h3 className="text-lg sm:text-xl font-medium text-neutral-800 dark:text-neutral-100">
                                        {publication.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                        {publication.venue} · {publication.year}
                                    </p>
                                </div>
                                <span className="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-neutral-700 dark:text-blue-200">
                                    First publication
                                </span>
                            </div>

                            <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                {publication.shortAuthors}
                            </p>
                            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                                {publication.summary}
                            </p>

                            <div className="flex flex-wrap gap-3 pt-2">
                                <a
                                    href={publication.arxivUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                >
                                    <FileText className="h-4 w-4" />
                                    Read on arXiv
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Section>
    );
}
