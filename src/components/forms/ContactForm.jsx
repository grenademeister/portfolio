import { useState } from "react";
import { motion } from "framer-motion";
import { validateEmail } from "../../utils";

export function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });

            setTimeout(() => {
                setSubmitStatus(null);
            }, 5000);
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputBaseStyle = {
        background: "var(--bg)",
        color: "var(--text)",
        borderColor: "var(--border)",
        boxShadow: "inset 0 0 0 1px transparent"
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-[1.25rem] border px-4 py-3 outline-none"
                    style={{ ...inputBaseStyle, borderColor: errors.name ? '#b53333' : 'var(--border)' }}
                />
                {errors.name && <p className="mt-1 text-sm" style={{ color: '#b53333' }}>{errors.name}</p>}
            </div>

            <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-[1.25rem] border px-4 py-3 outline-none"
                    style={{ ...inputBaseStyle, borderColor: errors.email ? '#b53333' : 'var(--border)' }}
                />
                {errors.email && <p className="mt-1 text-sm" style={{ color: '#b53333' }}>{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-[1.25rem] border px-4 py-3 outline-none"
                    style={{ ...inputBaseStyle, borderColor: errors.message ? '#b53333' : 'var(--border)', resize: 'vertical' }}
                />
                {errors.message && <p className="mt-1 text-sm" style={{ color: '#b53333' }}>{errors.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="accent-button w-full disabled:cursor-not-allowed disabled:opacity-70"
            >
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-[1.25rem] border px-4 py-3"
                    style={{ background: 'rgba(119,125,87,0.12)', borderColor: 'rgba(119,125,87,0.2)', color: '#5b6a46' }}
                >
                    Message sent successfully! I'll get back to you soon.
                </motion.div>
            )}

            {submitStatus === 'error' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-[1.25rem] border px-4 py-3"
                    style={{ background: 'rgba(181,51,51,0.08)', borderColor: 'rgba(181,51,51,0.16)', color: '#b53333' }}
                >
                    Something went wrong. Please try again later.
                </motion.div>
            )}
        </form>
    );
}
