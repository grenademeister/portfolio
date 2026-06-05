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

export const projectAnimation = {
    hidden: { opacity: 0, y: 8 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.04 * i,
            duration: 0.25,
            ease: "easeOut"
        }
    }),
};

export const filterTextAnimation = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: {
        opacity: 1,
        height: "auto",
        marginTop: "1rem",
        transition: {
            duration: 0.2,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        height: 0,
        marginTop: 0,
        transition: {
            duration: 0.15,
            ease: "easeIn"
        }
    }
};
