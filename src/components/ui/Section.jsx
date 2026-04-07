import { motion } from "framer-motion";
import { fadeIn } from "../../constants/animations";

export function Section({ children, className = "", id }) {
    return (
        <motion.section
            id={id}
            className={`section-frame ${className}`.trim()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
        >
            {children}
        </motion.section>
    );
}

export function SectionHeading({ children, className = "" }) {
    return (
        <h2 className={`section-title mb-8 sm:mb-10 ${className}`.trim()}>
            {children}
        </h2>
    );
}
