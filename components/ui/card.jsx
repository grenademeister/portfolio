// src/components/ui/card.jsx
import React from "react";

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

export function Card({ className, ...props }) {
    return (
        <div
            className={cn(
                "rounded-xl border bg-neutral-800 text-white shadow",
                className
            )}
            {...props}
        />
    );
}

export function CardContent({ className, ...props }) {
    return (
        <div className={cn("p-6", className)} {...props} />
    );
}
