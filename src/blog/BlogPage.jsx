import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "../components/navigation/Navigation";
import { Footer } from "../components/layout/Footer";
import { Card, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { PROFILE } from "../data/profile";
import { useTheme } from "../hooks";
import { BLOG_API_URL, fetchBlogPost, fetchBlogPosts, normalizePostHtml } from "./api";

const HOME_PATH = `${import.meta.env.BASE_URL}`;
const BLOG_HOME_PATH = `${import.meta.env.BASE_URL}blog/`;

function getSlugFromHash() {
    return window.location.hash.replace(/^#\/?/, "").trim();
}

function getSearchQueryFromUrl() {
    return new URLSearchParams(window.location.search).get("q")?.trim() || "";
}

function setSearchQueryInUrl(query) {
    const url = new URL(window.location.href);

    if (query) {
        url.searchParams.set("q", query);
    } else {
        url.searchParams.delete("q");
    }

    window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

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

function BlogShell({ theme, toggleTheme, children }) {
    return (
        <div className="min-h-screen bg-white text-neutral-800 font-sans antialiased selection:bg-blue-600/90 dark:bg-neutral-900 dark:text-neutral-100">
            <Navigation
                profileName={PROFILE.name}
                theme={theme}
                toggleTheme={toggleTheme}
                activeSection=""
                navItems={[]}
                secondaryLinks={[
                    { href: HOME_PATH, label: "About me" },
                    { href: BLOG_HOME_PATH, label: "All posts" }
                ]}
            />

            <main className="relative overflow-hidden">
                {children}
                <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tr from-blue-700/25 via-fuchsia-600/10 to-transparent blur-3xl" />
            </main>

            <Footer profileName={PROFILE.name} />
        </div>
    );
}

function BlogPostCard({ post }) {
    return (
        <a
            href={`#/${post.slug}`}
            className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
        >
            <Card className="h-full border-gray-200/80 bg-white/90 transition-transform duration-200 group-hover:-translate-y-1 dark:border-neutral-700/80 dark:bg-neutral-800/90">
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
                        <CardTitle className="text-xl sm:text-2xl group-hover:text-blue-500 dark:group-hover:text-blue-300">
                            {post.title}
                        </CardTitle>
                        <CardDescription className="text-base leading-7 text-neutral-600 dark:text-neutral-300">
                            {post.summary || "No summary provided yet."}
                        </CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </a>
    );
}

function BlogIndex() {
    const [posts, setPosts] = useState([]);
    const [status, setStatus] = useState("loading");
    const [searchInput, setSearchInput] = useState(() => getSearchQueryFromUrl());
    const [activeQuery, setActiveQuery] = useState(() => getSearchQueryFromUrl());

    useEffect(() => {
        const controller = new AbortController();

        async function loadPosts() {
            setStatus("loading");

            try {
                const data = await fetchBlogPosts(controller.signal, activeQuery);
                setPosts(data);
                setStatus("success");
            } catch (error) {
                if (error.name === "AbortError") {
                    return;
                }

                console.error("Failed to load blog posts", error);
                setPosts([]);
                setStatus("error");
            }
        }

        loadPosts();
        return () => {
            controller.abort();
        };
    }, [activeQuery]);

    useEffect(() => {
        const handlePopState = () => {
            const nextQuery = getSearchQueryFromUrl();
            setSearchInput(nextQuery);
            setActiveQuery(nextQuery);
        };

        window.addEventListener("popstate", handlePopState);
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const nextQuery = searchInput.trim();
        setSearchQueryInUrl(nextQuery);
        setActiveQuery(nextQuery);
    };

    const handleSearchClear = () => {
        setSearchInput("");
        setSearchQueryInUrl("");
        setActiveQuery("");
    };

    return (
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <motion.div
                className="max-w-3xl"
                initial={{ opacity: 0, y: -32 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
            >
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-500">Blog</p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                    Life Logs
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-300 sm:text-lg">
                    Selected, published posts from my Obsidian vault.
                </p>
            </motion.div>

            <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1 } }}
            >
                <form
                    onSubmit={handleSearchSubmit}
                    className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end"
                >
                    <label className="min-w-0 flex-1">
                        <input
                            type="search"
                            value={searchInput}
                            onChange={(event) => setSearchInput(event.target.value)}
                            placeholder="Search titles, summaries, or tags"
                            className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-base text-neutral-800 outline-none transition placeholder:text-neutral-400 focus:border-blue-500 focus:ring-0 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-500"
                            aria-label="Search blog posts"
                        />
                    </label>
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="rounded-full bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                            Search
                        </button>
                        <button
                            type="button"
                            onClick={handleSearchClear}
                            className="rounded-full border border-gray-300 px-5 py-3 text-sm font-medium text-neutral-600 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
                        >
                            Clear
                        </button>
                    </div>
                </form>

                {status === "success" && posts.length > 0 ? (
                    <div className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
                        {posts.length} result{posts.length > 1 ? "s" : ""}
                        {activeQuery ? ` for "${activeQuery}"` : ` across all published posts`}
                    </div>
                ) : null}

                {status === "loading" ? (
                    <div className="rounded-3xl border border-dashed border-gray-300 px-6 py-16 text-center text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                        {activeQuery ? `Searching for "${activeQuery}"...` : "Loading published posts..."}
                    </div>
                ) : null}

                {status === "error" ? (
                    <div className="rounded-3xl border border-red-200 bg-red-50/80 px-6 py-16 text-center text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-200">
                        Could not reach the blog backend at {BLOG_API_URL}.
                    </div>
                ) : null}

                {status === "success" && posts.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-gray-300 px-6 py-16 text-center text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                        {activeQuery
                            ? `No posts matched "${activeQuery}".`
                            : "No published posts yet."}
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
    );
}

function BlogPostPage({ slug }) {
    const [post, setPost] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const controller = new AbortController();

        async function loadPost() {
            setStatus("loading");

            try {
                const data = await fetchBlogPost(slug, controller.signal);
                setPost(data);
                setStatus(data ? "success" : "not-found");
            } catch (error) {
                if (error.name === "AbortError") {
                    return;
                }

                console.error("Failed to load blog post", error);
                setPost(null);
                setStatus("error");
            }
        }

        loadPost();
        return () => {
            controller.abort();
        };
    }, [slug]);

    const normalizedHtml = post ? normalizePostHtml(post.html) : "";

    return (
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <motion.div
                className="mx-auto max-w-3xl"
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
            >
                <a
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-blue-500 transition-colors hover:text-blue-400"
                >
                    Back to all posts
                </a>

                {status === "loading" ? (
                    <div className="mt-8 rounded-3xl border border-dashed border-gray-300 px-6 py-16 text-center text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                        Loading post...
                    </div>
                ) : null}

                {status === "error" ? (
                    <div className="mt-8 rounded-3xl border border-red-200 bg-red-50/80 px-6 py-16 text-center text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-200">
                        Could not reach the blog backend at {BLOG_API_URL}.
                    </div>
                ) : null}

                {status === "not-found" ? (
                    <div className="mt-8 rounded-3xl border border-dashed border-gray-300 px-6 py-16 text-center text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                        Post not found.
                    </div>
                ) : null}

                {status === "success" && post ? (
                    <article className="mt-8">
                        <header className="border-b border-gray-200 pb-8 dark:border-neutral-800">
                            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                                {post.title}
                            </h1>
                        </header>

                        <div
                            className="mt-10 text-neutral-700 dark:text-neutral-200 [&_a]:text-blue-500 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-blue-400 [&_h1]:mt-12 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_p]:mt-5 [&_p]:leading-8 [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-2 [&_blockquote]:mt-6 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-200 [&_blockquote]:pl-4 [&_blockquote]:italic [&_img]:mt-8 [&_img]:w-full [&_img]:rounded-2xl [&_img]:border [&_img]:border-black/5 [&_img]:shadow-lg dark:[&_blockquote]:border-blue-900 dark:[&_img]:border-white/10"
                            dangerouslySetInnerHTML={{ __html: normalizedHtml }}
                        />
                    </article>
                ) : null}
            </motion.div>
        </section>
    );
}

export function BlogPage() {
    const { theme, toggleTheme } = useTheme();
    const [slug, setSlug] = useState(() => getSlugFromHash());

    useEffect(() => {
        const handleHashChange = () => {
            setSlug(getSlugFromHash());
            window.scrollTo({ top: 0, behavior: "auto" });
        };

        window.addEventListener("hashchange", handleHashChange);
        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    return (
        <BlogShell theme={theme} toggleTheme={toggleTheme}>
            {slug ? <BlogPostPage slug={slug} /> : <BlogIndex />}
        </BlogShell>
    );
}
