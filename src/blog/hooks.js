import { useEffect, useState } from "react";
import { fetchBlogPost, fetchBlogPosts, recordBlogPostView } from "./api";

const viewedPostKeys = new Set();

function isAbortError(error) {
    return error.name === "AbortError";
}

export function getSearchQuery() {
    return new URLSearchParams(window.location.search).get("q")?.trim() || "";
}

export function setSearchQuery(query) {
    const url = new URL(window.location.href);

    if (query) {
        url.searchParams.set("q", query);
    } else {
        url.searchParams.delete("q");
    }

    window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

export function useHashSlug() {
    const getSlug = () => window.location.hash.replace(/^#\/?/, "").trim();
    const [slug, setSlug] = useState(getSlug);

    useEffect(() => {
        const handleHashChange = () => {
            setSlug(getSlug());
            window.scrollTo({ top: 0, behavior: "auto" });
        };

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    return slug;
}

export function useBlogPosts(query) {
    const [posts, setPosts] = useState([]);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const controller = new AbortController();

        async function loadPosts() {
            setStatus("loading");

            try {
                setPosts(await fetchBlogPosts(controller.signal, query));
                setStatus("success");
            } catch (error) {
                if (isAbortError(error)) return;
                console.error("Failed to load blog posts", error);
                setPosts([]);
                setStatus("error");
            }
        }

        loadPosts();
        return () => controller.abort();
    }, [query]);

    return { posts, status };
}

export function useBlogPost(slug) {
    const [post, setPost] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const controller = new AbortController();

        async function loadPost() {
            setStatus("loading");

            try {
                const loadedPost = await fetchBlogPost(slug, controller.signal);
                setPost(loadedPost);
                setStatus(loadedPost ? "success" : "not-found");

                if (!loadedPost) return;

                const viewKey = `${window.location.pathname}#/${slug}`;
                if (viewedPostKeys.has(viewKey)) return;
                viewedPostKeys.add(viewKey);

                try {
                    const viewData = await recordBlogPostView(slug, controller.signal);
                    if (viewData?.view_count != null) {
                        setPost((currentPost) => (
                            currentPost ? { ...currentPost, view_count: viewData.view_count } : currentPost
                        ));
                    }
                } catch (error) {
                    if (!isAbortError(error)) {
                        console.error("Failed to record blog post view", error);
                    }
                }
            } catch (error) {
                if (isAbortError(error)) return;
                console.error("Failed to load blog post", error);
                setPost(null);
                setStatus("error");
            }
        }

        loadPost();
        return () => controller.abort();
    }, [slug]);

    return { post, setPost, status };
}
