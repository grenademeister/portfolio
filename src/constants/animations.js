/**
 * Animation variants used throughout the portfolio
 */

export const fadeIn = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.15 * i, duration: 0.4 }
    }),
};

export const projectAnimation = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: (i = 0) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            delay: 0.08 * i,
            duration: 0.4,
            ease: "easeOut"
        }
    }),
};

export const filterTextAnimation = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: {
        opacity: 1,
        height: "auto",
        marginTop: "0.75rem",
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        height: 0,
        marginTop: 0,
        transition: {
            duration: 0.2,
            ease: "easeIn"
        }
    }
};
