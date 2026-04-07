import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { BlogPage } from "./BlogPage";
import { applyTheme, getPreferredTheme } from "../lib/theme";

applyTheme(getPreferredTheme());

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BlogPage />
    </StrictMode>
);
