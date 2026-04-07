import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "../components/navigation/Navigation";
import { Footer } from "../components/layout/Footer";
import { Card, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { PROFILE } from "../data/profile";
import { useTheme } from "../hooks";
import {
    BLOG_API_URL,
    createBlogComment,
    fetchBlogPost,
    fetchBlogPosts,
    normalizePostHtml,
    recordBlogPostView
} from "./api";

const HOME_PATH = `${import.meta.env.BASE_URL}`;
const BLOG_HOME_PATH = `${import.meta.env.BASE_URL}blog/`;
const viewedPostKeys = new Set();

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

function formatCountLabel(count, singular, plural = `${singular}s`) {
    return `${count} ${count === 1 ? singular : plural}`;
}

function BlogShell({ theme, toggleTheme, children }) {
    return (
        <div className="page-shell">
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
            </main>

            <Footer profileName={PROFILE.name} />
        </div>
    );
}

function BlogPostCard({ post }) {
    return (
        <a
            href={`#/${post.slug}`}
            className="group block h-full rounded-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40"
        >
            <Card className="h-full transition-transform duration-200 group-hover:-translate-y-1">
                <CardHeader className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-sm" style={{ color: "var(--text-soft)" }}>
                        <span>{formatDate(post.date)}</span>
                        <span>{formatCountLabel(post.view_count || 0, "view")}</span>
                        {post.tags.length ? (
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full px-2.5 py-1 text-xs font-medium" style={{ background: "var(--surface-strong)", color: "var(--accent)", boxShadow: "0 0 0 1px var(--border)" }}
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        ) : null}
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-xl sm:text-2xl group-hover:text-[var(--accent)]">
                            {post.title}
                        </CardTitle>
                        <CardDescription className="text-base leading-7" style={{ color: "var(--text-muted)" }}>
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
        <section className="page-container section-frame">
            <motion.div
                className="max-w-3xl"
                initial={{ opacity: 0, y: -32 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
            >
                <p className="eyebrow">Blog</p>
                <h1 className="font-editorial mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                    Life Logs
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-7 sm:text-lg" style={{ color: "var(--text-muted)" }}>
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
                            className="w-full border-0 border-b bg-transparent px-0 py-3 text-base outline-none transition focus:ring-0" style={{ borderColor: "var(--border)", color: "var(--text)" }}
                            aria-label="Search blog posts"
                        />
                    </label>
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="accent-button"
                        >
                            Search
                        </button>
                        <button
                            type="button"
                            onClick={handleSearchClear}
                            className="ring-button"
                        >
                            Clear
                        </button>
                    </div>
                </form>

                {status === "success" && posts.length > 0 ? (
                    <div className="mb-6 text-sm" style={{ color: "var(--text-soft)" }}>
                        {posts.length} result{posts.length > 1 ? "s" : ""}
                        {activeQuery ? ` for "${activeQuery}"` : ` across all published posts`}
                    </div>
                ) : null}

                {status === "loading" ? (
                    <div className="rounded-[2rem] border border-dashed px-6 py-16 text-center" style={{ borderColor: "var(--border)", color: "var(--text-soft)", background: "color-mix(in srgb, var(--surface) 72%, transparent)" }}>
                        {activeQuery ? `Searching for "${activeQuery}"...` : "Loading published posts..."}
                    </div>
                ) : null}

                {status === "error" ? (
                    <div className="rounded-[2rem] border px-6 py-16 text-center" style={{ borderColor: "rgba(181,51,51,0.18)", background: "rgba(181,51,51,0.08)", color: "#b53333" }}>
                        Could not reach the blog backend at {BLOG_API_URL}.
                    </div>
                ) : null}

                {status === "success" && posts.length === 0 ? (
                    <div className="rounded-[2rem] border border-dashed px-6 py-16 text-center" style={{ borderColor: "var(--border)", color: "var(--text-soft)", background: "color-mix(in srgb, var(--surface) 72%, transparent)" }}>
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
    const [commentAuthor, setCommentAuthor] = useState("");
    const [commentBody, setCommentBody] = useState("");
    const [commentStatus, setCommentStatus] = useState("idle");
    const [commentError, setCommentError] = useState("");

    useEffect(() => {
        setCommentAuthor("");
        setCommentBody("");
        setCommentStatus("idle");
        setCommentError("");
    }, [slug]);

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

    useEffect(() => {
        if (!post) {
            return;
        }

        const viewKey = `${window.location.pathname}#/${slug}`;
        if (viewedPostKeys.has(viewKey)) {
            return;
        }
        viewedPostKeys.add(viewKey);

        const controller = new AbortController();

        async function sendView() {
            try {
                const data = await recordBlogPostView(slug, controller.signal);
                if (data?.view_count != null) {
                    setPost((currentPost) => (
                        currentPost ? { ...currentPost, view_count: data.view_count } : currentPost
                    ));
                }
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Failed to record blog post view", error);
                }
            }
        }

        sendView();
        return () => {
            controller.abort();
        };
    }, [post, slug]);

    const normalizedHtml = post ? normalizePostHtml(post.html) : "";

    const handleCommentSubmit = async (event) => {
        event.preventDefault();

        const authorName = commentAuthor.trim();
        const body = commentBody.trim();
        if (!authorName || !body) {
            setCommentError("Name and comment are required.");
            setCommentStatus("error");
            return;
        }

        setCommentStatus("submitting");
        setCommentError("");

        try {
            const createdComment = await createBlogComment(slug, { author_name: authorName, body });
            if (!createdComment) {
                setCommentStatus("error");
                setCommentError("Post not found.");
                return;
            }

            setPost((currentPost) => (
                currentPost
                    ? { ...currentPost, comments: [...(currentPost.comments || []), createdComment] }
                    : currentPost
            ));
            setCommentAuthor("");
            setCommentBody("");
            setCommentStatus("success");
        } catch (error) {
            console.error("Failed to create comment", error);
            setCommentStatus("error");
            setCommentError(error.message || "Could not submit comment.");
        }
    };

    return (
        <section className="page-container section-frame">
            <motion.div
                className="mx-auto max-w-3xl"
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
            >
                <a
                    href="#"
                    className="inline-flex items-center text-sm font-medium transition-colors hover:opacity-80" style={{ color: "var(--accent)" }}
                >
                    Back to all posts
                </a>

                {status === "loading" ? (
                    <div className="mt-8 rounded-[2rem] border border-dashed px-6 py-16 text-center" style={{ borderColor: "var(--border)", color: "var(--text-soft)", background: "color-mix(in srgb, var(--surface) 72%, transparent)" }}>
                        Loading post...
                    </div>
                ) : null}

                {status === "error" ? (
                    <div className="mt-8 rounded-[2rem] border px-6 py-16 text-center" style={{ borderColor: "rgba(181,51,51,0.18)", background: "rgba(181,51,51,0.08)", color: "#b53333" }}>
                        Could not reach the blog backend at {BLOG_API_URL}.
                    </div>
                ) : null}

                {status === "not-found" ? (
                    <div className="mt-8 rounded-[2rem] border border-dashed px-6 py-16 text-center" style={{ borderColor: "var(--border)", color: "var(--text-soft)", background: "color-mix(in srgb, var(--surface) 72%, transparent)" }}>
                        Post not found.
                    </div>
                ) : null}

                {status === "success" && post ? (
                    <article className="mx-auto mt-8 max-w-3xl">
                        <header className="border-b pb-8" style={{ borderColor: "var(--border)" }}>
                            <div className="flex flex-wrap items-center gap-3 text-sm" style={{ color: "var(--text-soft)" }}>
                                <span>{formatDate(post.date)}</span>
                                <span>{formatCountLabel(post.view_count || 0, "view")}</span>
                                <span>{formatCountLabel(post.comments?.length || 0, "comment")}</span>
                            </div>
                            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                                {post.title}
                            </h1>
                        </header>

                        <div
                            className="mt-10 text-[color:var(--text-muted)] [&_a]:underline [&_a]:underline-offset-4 [&_a]:text-[color:var(--accent)] [&_h1]:mt-12 [&_h1]:font-editorial [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:mt-10 [&_h2]:font-editorial [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-8 [&_h3]:font-editorial [&_h3]:text-xl [&_h3]:font-semibold [&_p]:mt-5 [&_p]:leading-8 [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-2 [&_blockquote]:mt-6 [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic [&_img]:mt-8 [&_img]:w-full [&_img]:rounded-2xl [&_img]:border [&_img]:shadow-lg" style={{ ["--tw-prose-quote-borders"]: "var(--border)", ["--tw-prose-img-borders"]: "var(--border)" }}
                            dangerouslySetInnerHTML={{ __html: normalizedHtml }}
                        />

                        <section className="mt-16 border-t pt-10" style={{ borderColor: "var(--border)" }}>
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <h2 className="font-editorial text-2xl font-semibold tracking-tight">
                                    Comments
                                </h2>
                                <p className="text-sm" style={{ color: "var(--text-soft)" }}>
                                    {formatCountLabel(post.comments?.length || 0, "comment")}
                                </p>
                            </div>

                            <form
                                onSubmit={handleCommentSubmit}
                                className="surface-card mt-8 space-y-4 rounded-[2rem] p-6"
                            >
                                <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)]">
                                    <label className="block">
                                        <span className="mb-2 block text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                                            Name
                                        </span>
                                        <input
                                            type="text"
                                            value={commentAuthor}
                                            onChange={(event) => setCommentAuthor(event.target.value)}
                                            className="w-full rounded-[1.25rem] border px-4 py-3 outline-none transition" style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}
                                            placeholder="Your name"
                                        />
                                    </label>
                                </div>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                                        Comment
                                    </span>
                                    <textarea
                                        value={commentBody}
                                        onChange={(event) => setCommentBody(event.target.value)}
                                        rows={5}
                                        className="w-full rounded-[1.25rem] border px-4 py-3 outline-none transition" style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}
                                        placeholder="Write a comment"
                                    />
                                </label>
                                {commentStatus === "error" && commentError ? (
                                    <p className="text-sm" style={{ color: "#b53333" }}>
                                        {commentError}
                                    </p>
                                ) : null}
                                {commentStatus === "success" ? (
                                    <p className="text-sm" style={{ color: "#5b6a46" }}>
                                        Comment posted.
                                    </p>
                                ) : null}
                                <button
                                    type="submit"
                                    disabled={commentStatus === "submitting"}
                                    className="accent-button disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {commentStatus === "submitting" ? "Posting..." : "Post comment"}
                                </button>
                            </form>

                            <div className="mt-8 space-y-4">
                                {post.comments?.length ? post.comments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        className="surface-card rounded-[2rem] p-6"
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                                                {comment.author_name}
                                            </p>
                                            <p className="text-sm" style={{ color: "var(--text-soft)" }}>
                                                {new Intl.DateTimeFormat("en", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "numeric",
                                                    minute: "2-digit"
                                                }).format(new Date(comment.created_at))}
                                            </p>
                                        </div>
                                        <p className="mt-4 whitespace-pre-wrap text-base leading-7" style={{ color: "var(--text-muted)" }}>
                                            {comment.body}
                                        </p>
                                    </div>
                                )) : (
                                    <div className="rounded-[2rem] border border-dashed px-6 py-12 text-center" style={{ borderColor: "var(--border)", color: "var(--text-soft)", background: "color-mix(in srgb, var(--surface) 72%, transparent)" }}>
                                        No comments yet.
                                    </div>
                                )}
                            </div>
                        </section>
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
