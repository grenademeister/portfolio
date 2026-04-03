const BLOG_API_URL = import.meta.env.VITE_BLOG_API_URL
    || (import.meta.env.DEV ? "/api" : "https://api.grenademeister.qzz.io");

export { BLOG_API_URL };

function toAbsoluteBlogUrl(path) {
    const normalizedBase = BLOG_API_URL.endsWith("/")
        ? BLOG_API_URL.slice(0, -1)
        : BLOG_API_URL;
    return `${normalizedBase}${path}`;
}

export function normalizePostHtml(html) {
    if (!html || typeof document === "undefined") {
        return html;
    }

    const template = document.createElement("template");
    template.innerHTML = html;

    template.content.querySelectorAll("img[src], source[src]").forEach((node) => {
        const attribute = node.tagName === "SOURCE" ? "src" : "src";
        const value = node.getAttribute(attribute);

        if (!value || !value.startsWith("/media/")) {
            return;
        }

        node.setAttribute(attribute, toAbsoluteBlogUrl(value));
    });

    template.content.querySelectorAll("source[srcset], img[srcset]").forEach((node) => {
        const srcset = node.getAttribute("srcset");

        if (!srcset) {
            return;
        }

        const normalizedSrcset = srcset
            .split(",")
            .map((candidate) => {
                const trimmed = candidate.trim();

                if (!trimmed) {
                    return trimmed;
                }

                const [url, descriptor] = trimmed.split(/\s+/, 2);
                if (!url.startsWith("/media/")) {
                    return trimmed;
                }

                const absoluteUrl = toAbsoluteBlogUrl(url);
                return descriptor ? `${absoluteUrl} ${descriptor}` : absoluteUrl;
            })
            .join(", ");

        node.setAttribute("srcset", normalizedSrcset);
    });

    return template.innerHTML;
}

export async function fetchBlogPosts(signal, query = "") {
    const trimmedQuery = query.trim();
    const endpoint = trimmedQuery
        ? `${BLOG_API_URL}/posts/search?q=${encodeURIComponent(trimmedQuery)}`
        : `${BLOG_API_URL}/posts`;
    const response = await fetch(endpoint, { signal });

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

export async function recordBlogPostView(slug, signal) {
    const response = await fetch(`${BLOG_API_URL}/posts/${slug}/view`, {
        method: "POST",
        signal
    });

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
}

export async function createBlogComment(slug, payload) {
    const response = await fetch(`${BLOG_API_URL}/posts/${slug}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.detail || `Request failed with status ${response.status}`);
    }

    return response.json();
}
