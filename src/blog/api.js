const BLOG_API_URL = import.meta.env.VITE_BLOG_API_URL
    || (import.meta.env.DEV ? "/api" : "http://127.0.0.1:8000");

export { BLOG_API_URL };

export async function fetchBlogPosts(signal) {
    const response = await fetch(`${BLOG_API_URL}/posts`, { signal });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
}

export async function fetchBlogPost(slug, signal) {
    const response = await fetch(`${BLOG_API_URL}/posts/${slug}`, { signal });

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
}
