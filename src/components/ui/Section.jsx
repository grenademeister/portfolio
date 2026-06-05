import { motion } from "framer-motion";
import { fadeIn } from "../../constants/animations";

const MotionSection = motion.section;

export function Section({ children, className = "", id }) {
    return (
        <MotionSection
            id={id}
            className={`section-frame ${className}`.trim()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            variants={fadeIn}
        >
            {children}
        </MotionSection>
    );
}

export function SectionHeading({ children, className = "" }) {
    return (
        <h2 className={`section-title mb-7 sm:mb-9 ${className}`.trim()}>
            {children}
        </h2>
    );
}
