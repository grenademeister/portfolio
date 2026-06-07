import { memo, useEffect, useRef, useState } from "react";
import renderMathInElement from "katex/contrib/auto-render";
import "katex/dist/katex.min.css";
import { Navigation } from "../components/navigation/Navigation";
import { Footer } from "../components/layout/Footer";
import { PROFILE } from "../data/profile";
import { useTheme } from "../hooks";
import {
    BLOG_API_URL,
    createBlogComment,
    fetchBlogPost,
    fetchBlogPosts,
    getBlogThumbnailUrl,
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

function StatusBlock({ tone = "muted", children, className = "" }) {
    const color = tone === "error" ? "var(--danger)" : "var(--text-soft)";
    return (
        <div className={`border-l py-8 pl-4 text-sm leading-7 ${className}`.trim()} style={{ borderColor: color, color }}>
            {children}
        </div>
    );
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

            <main>{children}</main>

            <Footer profileName={PROFILE.name} />
        </div>
    );
}

function BlogPostEntry({ post }) {
    const thumbnailUrl = getBlogThumbnailUrl(post.thumbnail_id);

    return (
        <article className="notebook-entry blog-post-entry">
            <a href={`#/${post.slug}`} className="blog-post-link group">
                <div className="blog-post-thumbnail" aria-hidden={!thumbnailUrl}>
                    {thumbnailUrl ? (
                        <img
                            src={thumbnailUrl}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <span>{post.title.slice(0, 1)}</span>
                    )}
                </div>
                <div className="min-w-0">
                    <div className="meta flex flex-wrap gap-x-3 gap-y-1">
                        <span>{formatDate(post.date)}</span>
                        <span>{formatCountLabel(post.view_count || 0, "view")}</span>
                    </div>
                    <h2 className="mt-2 font-editorial text-2xl leading-8 text-[color:var(--text)] underline-offset-4 group-hover:underline">
                        {post.title}
                    </h2>
                    <p className="blog-post-excerpt mt-2 text-base leading-7 text-[color:var(--text-muted)]">
                        {post.summary || "No summary provided yet."}
                    </p>
                    {post.tags.length ? (
                        <p className="mt-3 text-xs leading-6 text-[color:var(--text-soft)]">
                            {post.tags.map((tag) => `#${tag}`).join(" / ")}
                        </p>
                    ) : null}
                </div>
            </a>
        </article>
    );
}

const BlogPostContent = memo(function BlogPostContent({ html }) {
    const postContainer = useRef(null);

    useEffect(() => {
        if (!postContainer.current || !html) {
            return;
        }

        postContainer.current.querySelectorAll(".math").forEach((mathElement) => {
            renderMathInElement(mathElement, {
                delimiters: [
                    { left: "$$", right: "$$", display: true },
                    { left: "\\(", right: "\\)", display: false }
                ]
            });
        });
    }, [html]);

    return (
        <div
            ref={postContainer}
            className="mt-10 text-[color:var(--text-muted)] [&_a]:text-[color:var(--accent)] [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:mt-6 [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h1]:mt-12 [&_h1]:font-editorial [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:mt-10 [&_h2]:font-editorial [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-8 [&_h3]:font-editorial [&_h3]:text-xl [&_h3]:font-semibold [&_img]:mt-8 [&_img]:w-full [&_img]:border [&_li]:mt-2 [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-5 [&_p]:leading-8 [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6"
            style={{ ["--tw-prose-quote-borders"]: "var(--border)", ["--tw-prose-img-borders"]: "var(--border)" }}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
});

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
            <div className="max-w-3xl">
                <p className="eyebrow">Blog</p>
                <h1 className="font-editorial text-4xl leading-tight sm:text-5xl">
                    Life Logs
                </h1>
                <p className="section-copy">
                    Selected, published posts from my Obsidian vault.
                </p>
            </div>

            <div className="mt-10">
                <form onSubmit={handleSearchSubmit} className="mb-8 grid gap-3 border-t pt-5 sm:grid-cols-[1fr_auto_auto] sm:items-end" style={{ borderColor: "var(--border)" }}>
                    <label className="min-w-0">
                        <span className="sr-only">Search blog posts</span>
                        <input
                            type="search"
                            value={searchInput}
                            onChange={(event) => setSearchInput(event.target.value)}
                            placeholder="Search titles, summaries, or tags"
                            className="field"
                            aria-label="Search blog posts"
                        />
                    </label>
                    <button type="submit" className="accent-button">Search</button>
                    <button type="button" onClick={handleSearchClear} className="plain-button">Clear</button>
                </form>

                {status === "success" && posts.length > 0 ? (
                    <div className="mb-5 text-sm text-[color:var(--text-soft)]">
                        {posts.length} result{posts.length > 1 ? "s" : ""}
                        {activeQuery ? ` for "${activeQuery}"` : ` across all published posts`}
                    </div>
                ) : null}

                {status === "loading" ? (
                    <StatusBlock>{activeQuery ? `Searching for "${activeQuery}"...` : "Loading published posts..."}</StatusBlock>
                ) : null}

                {status === "error" ? (
                    <StatusBlock tone="error">Could not reach the blog backend at {BLOG_API_URL}.</StatusBlock>
                ) : null}

                {status === "success" && posts.length === 0 ? (
                    <StatusBlock>{activeQuery ? `No posts matched "${activeQuery}".` : "No published posts yet."}</StatusBlock>
                ) : null}

                {status === "success" && posts.length > 0 ? (
                    <div className="ruled-list">
                        {posts.map((post) => (
                            <BlogPostEntry key={post.slug} post={post} />
                        ))}
                    </div>
                ) : null}
            </div>
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
            <div className="mx-auto max-w-3xl">
                <a href="#" className="text-link text-sm">
                    Back to all posts
                </a>

                {status === "loading" ? <StatusBlock className="mt-8">Loading post...</StatusBlock> : null}
                {status === "error" ? <StatusBlock tone="error" className="mt-8">Could not reach the blog backend at {BLOG_API_URL}.</StatusBlock> : null}
                {status === "not-found" ? <StatusBlock className="mt-8">Post not found.</StatusBlock> : null}

                {status === "success" && post ? (
                    <article className="mt-8">
                        <header className="border-b pb-8" style={{ borderColor: "var(--border)" }}>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[color:var(--text-soft)]">
                                <span>{formatDate(post.date)}</span>
                                <span>{formatCountLabel(post.view_count || 0, "view")}</span>
                                <span>{formatCountLabel(post.comments?.length || 0, "comment")}</span>
                            </div>
                            <h1 className="mt-5 font-editorial text-4xl leading-tight sm:text-5xl">
                                {post.title}
                            </h1>
                        </header>

                        <BlogPostContent html={normalizedHtml} />

                        <section className="mt-16 border-t pt-10" style={{ borderColor: "var(--border)" }}>
                            <div className="flex flex-wrap items-baseline justify-between gap-3">
                                <h2 className="font-editorial text-2xl leading-tight">
                                    Comments
                                </h2>
                                <p className="meta">
                                    {formatCountLabel(post.comments?.length || 0, "comment")}
                                </p>
                            </div>

                            <form onSubmit={handleCommentSubmit} className="mt-8 space-y-5 border-t pt-5" style={{ borderColor: "var(--border-subtle)" }}>
                                <label className="block">
                                    <span className="meta mb-1 block">Name</span>
                                    <input
                                        type="text"
                                        value={commentAuthor}
                                        onChange={(event) => setCommentAuthor(event.target.value)}
                                        className="field"
                                        placeholder="Your name"
                                    />
                                </label>
                                <label className="block">
                                    <span className="meta mb-1 block">Comment</span>
                                    <textarea
                                        value={commentBody}
                                        onChange={(event) => setCommentBody(event.target.value)}
                                        rows={5}
                                        className="field"
                                        placeholder="Write a comment"
                                    />
                                </label>
                                {commentStatus === "error" && commentError ? (
                                    <p className="text-sm" style={{ color: "var(--danger)" }}>
                                        {commentError}
                                    </p>
                                ) : null}
                                {commentStatus === "success" ? (
                                    <p className="text-sm" style={{ color: "var(--success)" }}>
                                        Comment posted.
                                    </p>
                                ) : null}
                                <button type="submit" disabled={commentStatus === "submitting"} className="accent-button disabled:cursor-not-allowed disabled:opacity-60">
                                    {commentStatus === "submitting" ? "Posting..." : "Post comment"}
                                </button>
                            </form>

                            <div className="ruled-list mt-8">
                                {post.comments?.length ? post.comments.map((comment) => (
                                    <article key={comment.id} className="notebook-entry">
                                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                                            <p className="text-sm text-[color:var(--text)]">
                                                {comment.author_name}
                                            </p>
                                            <p className="meta">
                                                {new Intl.DateTimeFormat("en", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "numeric",
                                                    minute: "2-digit"
                                                }).format(new Date(comment.created_at))}
                                            </p>
                                        </div>
                                        <p className="mt-3 whitespace-pre-wrap text-base leading-7 text-[color:var(--text-muted)]">
                                            {comment.body}
                                        </p>
                                    </article>
                                )) : (
                                    <StatusBlock>No comments yet.</StatusBlock>
                                )}
                            </div>
                        </section>
                    </article>
                ) : null}
            </div>
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
