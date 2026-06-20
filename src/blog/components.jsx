import { memo, useEffect, useRef, useState } from "react";
import renderMathInElement from "katex/contrib/auto-render";
import { Footer } from "../components/layout/Footer";
import { Navigation } from "../components/navigation/Navigation";
import { PROFILE } from "../data/profile";
import { BLOG_API_URL, createBlogComment, getBlogThumbnailUrl } from "./api";
import { formatCommentDate, formatCount, formatPostDate } from "./format";

const HOME_PATH = import.meta.env.BASE_URL;
const BLOG_HOME_PATH = `${import.meta.env.BASE_URL}blog/`;

export function StatusBlock({ tone = "muted", children, className = "" }) {
    const color = tone === "error" ? "var(--danger)" : "var(--text-soft)";

    return (
        <div className={`border-l py-8 pl-4 text-sm leading-7 ${className}`.trim()} style={{ borderColor: color, color }}>
            {children}
        </div>
    );
}

export function BlogShell({ theme, toggleTheme, children }) {
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

export function PostList({ posts, query, status }) {
    if (status === "loading") {
        return <StatusBlock>{query ? `Searching for "${query}"...` : "Loading published posts..."}</StatusBlock>;
    }

    if (status === "error") {
        return <StatusBlock tone="error">Could not reach the blog backend at {BLOG_API_URL}.</StatusBlock>;
    }

    if (!posts.length) {
        return <StatusBlock>{query ? `No posts matched "${query}".` : "No published posts yet."}</StatusBlock>;
    }

    return (
        <>
            <div className="mb-5 text-sm text-[color:var(--text-soft)]">
                {formatCount(posts.length, "result")}
                {query ? ` for "${query}"` : " across all published posts"}
            </div>
            <div className="ruled-list">
                {posts.map((post) => <PostListEntry key={post.slug} post={post} />)}
            </div>
        </>
    );
}

const PostListEntry = memo(function PostListEntry({ post }) {
    const thumbnailUrl = getBlogThumbnailUrl(post.thumbnail_id);

    return (
        <article className="notebook-entry blog-post-entry">
            <a href={`#/${post.slug}`} className="blog-post-link group">
                <div className="blog-post-thumbnail" aria-hidden={!thumbnailUrl}>
                    {thumbnailUrl ? (
                        <img src={thumbnailUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
                    ) : (
                        <span>{post.title.slice(0, 1)}</span>
                    )}
                </div>
                <div className="min-w-0">
                    <div className="meta flex flex-wrap gap-x-3 gap-y-1">
                        <span>{formatPostDate(post.date)}</span>
                        <span>{formatCount(post.view_count || 0, "view")}</span>
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
});

export const PostContent = memo(function PostContent({ html }) {
    const postContainer = useRef(null);

    useEffect(() => {
        if (!postContainer.current || !html) return;

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
            className="mt-10 text-[color:var(--text-muted)] [&_a]:text-[color:var(--accent)] [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:mt-6 [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h1]:mt-12 [&_h1]:font-editorial [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:mt-10 [&_h2]:font-editorial [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-8 [&_h3]:font-editorial [&_h3]:text-xl [&_h3]:font-semibold [&_img]:mt-8 [&_img]:w-full [&_img]:border [&_li]:mt-2 [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-5 [&_p]:leading-8 [&_pre]:mt-5 [&_pre]:overflow-x-auto [&_pre]:rounded [&_pre]:border [&_pre]:border-[color:var(--border)] [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-6 [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6"
            style={{ ["--tw-prose-quote-borders"]: "var(--border)", ["--tw-prose-img-borders"]: "var(--border)" }}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
});

export function PostStatus({ status }) {
    const messages = {
        loading: "Loading post...",
        error: `Could not reach the blog backend at ${BLOG_API_URL}.`,
        "not-found": "Post not found."
    };

    if (!messages[status]) return null;

    return (
        <StatusBlock tone={status === "error" ? "error" : "muted"} className="mt-8">
            {messages[status]}
        </StatusBlock>
    );
}

export function CommentsSection({ slug, comments = [], onCommentCreated }) {
    return (
        <section className="mt-16 border-t pt-10" style={{ borderColor: "var(--border)" }}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="font-editorial text-2xl leading-tight">Comments</h2>
                <p className="meta">{formatCount(comments.length, "comment")}</p>
            </div>
            <CommentForm key={slug} slug={slug} onCommentCreated={onCommentCreated} />
            <CommentList comments={comments} />
        </section>
    );
}

function CommentForm({ slug, onCommentCreated }) {
    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const authorName = author.trim();
        const commentBody = body.trim();
        if (!authorName || !commentBody) {
            setError("Name and comment are required.");
            setStatus("error");
            return;
        }

        setStatus("submitting");
        setError("");

        try {
            const comment = await createBlogComment(slug, { author_name: authorName, body: commentBody });
            if (!comment) {
                setError("Post not found.");
                setStatus("error");
                return;
            }

            onCommentCreated(comment);
            setAuthor("");
            setBody("");
            setStatus("success");
        } catch (submitError) {
            console.error("Failed to create comment", submitError);
            setError(submitError.message || "Could not submit comment.");
            setStatus("error");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5 border-t pt-5" style={{ borderColor: "var(--border-subtle)" }}>
            <label className="block">
                <span className="meta mb-1 block">Name</span>
                <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)} className="field" placeholder="Your name" />
            </label>
            <label className="block">
                <span className="meta mb-1 block">Comment</span>
                <textarea value={body} onChange={(event) => setBody(event.target.value)} rows={5} className="field" placeholder="Write a comment" />
            </label>
            {status === "error" && error ? <p className="text-sm" style={{ color: "var(--danger)" }}>{error}</p> : null}
            {status === "success" ? <p className="text-sm" style={{ color: "var(--success)" }}>Comment posted.</p> : null}
            <button type="submit" disabled={status === "submitting"} className="accent-button disabled:cursor-not-allowed disabled:opacity-60">
                {status === "submitting" ? "Posting..." : "Post comment"}
            </button>
        </form>
    );
}

function CommentList({ comments }) {
    if (!comments.length) {
        return <div className="ruled-list mt-8"><StatusBlock>No comments yet.</StatusBlock></div>;
    }

    return (
        <div className="ruled-list mt-8">
            {comments.map((comment) => (
                <article key={comment.id} className="notebook-entry">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <p className="text-sm text-[color:var(--text)]">{comment.author_name}</p>
                        <p className="meta">{formatCommentDate(comment.created_at)}</p>
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-base leading-7 text-[color:var(--text-muted)]">
                        {comment.body}
                    </p>
                </article>
            ))}
        </div>
    );
}
