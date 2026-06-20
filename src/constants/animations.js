/**
 * Restrained animation variants used throughout the portfolio.
 */

export const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.06 * i, duration: 0.25, ease: "easeOut" }
    }),
};
