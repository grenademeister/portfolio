import { useEffect, useState } from "react";
import "katex/dist/katex.min.css";
import { useTheme } from "../hooks";
import { normalizePostHtml } from "./api";
import {
    BlogShell,
    CommentsSection,
    PostContent,
    PostList,
    PostStatus
} from "./components";
import { formatCount, formatPostDate } from "./format";
import {
    getSearchQuery,
    setSearchQuery,
    useBlogPost,
    useBlogPosts,
    useHashSlug
} from "./hooks";

function BlogIndex() {
    const [searchInput, setSearchInput] = useState(getSearchQuery);
    const [activeQuery, setActiveQuery] = useState(getSearchQuery);
    const { posts, status } = useBlogPosts(activeQuery);

    useEffect(() => {
        const handlePopState = () => {
            const query = getSearchQuery();
            setSearchInput(query);
            setActiveQuery(query);
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    const applySearch = (query) => {
        setSearchQuery(query);
        setActiveQuery(query);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        applySearch(searchInput.trim());
    };

    const handleSearchClear = () => {
        setSearchInput("");
        applySearch("");
    };

    return (
        <section className="page-container section-frame">
            <div className="max-w-3xl">
                <p className="eyebrow">Blog</p>
                <h1 className="font-editorial text-4xl leading-tight sm:text-5xl">Life Logs</h1>
                <p className="section-copy">Selected, published posts from my Obsidian vault.</p>
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
                <PostList posts={posts} query={activeQuery} status={status} />
            </div>
        </section>
    );
}

function BlogPostPage({ slug }) {
    const { post, setPost, status } = useBlogPost(slug);

    const handleCommentCreated = (comment) => {
        setPost((currentPost) => ({
            ...currentPost,
            comments: [...(currentPost.comments || []), comment]
        }));
    };

    return (
        <section className="page-container section-frame">
            <div className="mx-auto max-w-3xl">
                <a href="#" className="text-link text-sm">Back to all posts</a>
                <PostStatus status={status} />

                {status === "success" && post ? (
                    <article className="mt-8">
                        <header className="border-b pb-8" style={{ borderColor: "var(--border)" }}>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[color:var(--text-soft)]">
                                <span>{formatPostDate(post.date)}</span>
                                <span>{formatCount(post.view_count || 0, "view")}</span>
                                <span>{formatCount(post.comments?.length || 0, "comment")}</span>
                            </div>
                            <h1 className="mt-5 font-editorial text-4xl leading-tight sm:text-5xl">{post.title}</h1>
                        </header>
                        <PostContent html={normalizePostHtml(post.html)} />
                        <CommentsSection
                            slug={slug}
                            comments={post.comments}
                            onCommentCreated={handleCommentCreated}
                        />
                    </article>
                ) : null}
            </div>
        </section>
    );
}

export function BlogPage() {
    const { theme, toggleTheme } = useTheme();
    const slug = useHashSlug();

    return (
        <BlogShell theme={theme} toggleTheme={toggleTheme}>
            {slug ? <BlogPostPage slug={slug} /> : <BlogIndex />}
        </BlogShell>
    );
}
