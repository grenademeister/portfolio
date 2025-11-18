import { motion } from "framer-motion";
import { fadeIn } from "../../constants/animations";

/**
 * Reusable section wrapper with animation
 */
export function Section({ children, className, id }) {
    return (
        <motion.section
            id={id}
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
        >
            {children}
        </motion.section>
    );
}

/**
 * Consistent section heading component
 */
export function SectionHeading({ children }) {
    return (
        <h2 className="text-3xl font-semibold mb-8 text-neutral-800 dark:text-white">
            {children}
        </h2>
    );
}
