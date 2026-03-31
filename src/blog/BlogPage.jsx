import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "../components/navigation/Navigation";
import { Footer } from "../components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { PROFILE } from "../data/profile";
import { useTheme } from "../hooks";

const BLOG_API_URL = "http://127.0.0.1:8000";
const HOME_PATH = `${import.meta.env.BASE_URL}`;

function formatDate(date) {
    if (!date) {
        return "Undated";
    }

    return new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "numeric"
    }).format(new Date(`${date}T00:00:00`));
}

function BlogPostCard({ post }) {
    return (
        <Card className="h-full border-gray-200/80 bg-white/90 dark:border-neutral-700/80 dark:bg-neutral-800/90">
            <CardHeader className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
                    <span>{formatDate(post.date)}</span>
                    {post.tags.length ? (
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-200"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    ) : null}
                </div>
                <div className="space-y-2">
                    <CardTitle className="text-xl sm:text-2xl">{post.title}</CardTitle>
                    <CardDescription className="text-base leading-7 text-neutral-600 dark:text-neutral-300">
                        {post.summary || "No summary provided yet."}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <p className="text-sm text-neutral-400 dark:text-neutral-500">Slug: {post.slug}</p>
            </CardContent>
        </Card>
    );
}

export function BlogPage() {
    const { theme, toggleTheme } = useTheme();
    const [posts, setPosts] = useState([]);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        let cancelled = false;

        async function loadPosts() {
            setStatus("loading");

            try {
                const response = await fetch(`${BLOG_API_URL}/posts`);
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const data = await response.json();
                if (cancelled) {
                    return;
                }

                setPosts(Array.isArray(data) ? data : []);
                setStatus("success");
            } catch (error) {
                if (cancelled) {
                    return;
                }

                console.error("Failed to load blog posts", error);
                setPosts([]);
                setStatus("error");
            }
        }

        loadPosts();
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="min-h-screen bg-white text-neutral-800 font-sans antialiased selection:bg-blue-600/90 dark:bg-neutral-900 dark:text-neutral-100">
            <Navigation
                profileName={PROFILE.name}
                theme={theme}
                toggleTheme={toggleTheme}
                activeSection=""
                navItems={[]}
                secondaryLinks={[
                    { href: HOME_PATH, label: "Portfolio" }
                ]}
            />

            <main className="relative overflow-hidden">
                <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
                    <motion.div
                        className="max-w-3xl"
                        initial={{ opacity: 0, y: -32 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
                    >
                        <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-500">Blog</p>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                            Notes, experiments, and field logs.
                        </h1>
                        <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-300 sm:text-lg">
                            A minimal public index of published posts from the Obsidian-backed FastAPI service.
                        </p>
                    </motion.div>

                    <motion.div
                        className="mt-12"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1 } }}
                    >
                        {status === "loading" ? (
                            <div className="rounded-3xl border border-dashed border-gray-300 px-6 py-16 text-center text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                                Loading published posts...
                            </div>
                        ) : null}

                        {status === "error" ? (
                            <div className="rounded-3xl border border-red-200 bg-red-50/80 px-6 py-16 text-center text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-200">
                                Could not reach the blog backend at {BLOG_API_URL}.
                            </div>
                        ) : null}

                        {status === "success" && posts.length === 0 ? (
                            <div className="rounded-3xl border border-dashed border-gray-300 px-6 py-16 text-center text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                                No published posts yet.
                            </div>
                        ) : null}

                        {status === "success" && posts.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2">
                                {posts.map((post) => (
                                    <BlogPostCard key={post.slug} post={post} />
                                ))}
                            </div>
                        ) : null}
                    </motion.div>
                </section>

                <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tr from-blue-700/25 via-fuchsia-600/10 to-transparent blur-3xl" />
            </main>

            <Footer profileName={PROFILE.name} />
        </div>
    );
}
