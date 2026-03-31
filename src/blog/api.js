const BLOG_API_URL = "http://127.0.0.1:8000";

export { BLOG_API_URL };

export async function fetchBlogPosts(signal) {
    const response = await fetch(`${BLOG_API_URL}/posts`, { signal });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
}
