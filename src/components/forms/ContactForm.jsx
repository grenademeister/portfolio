import { useState } from "react";
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
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 border-t pt-6" style={{ borderColor: "var(--border)" }}>
            <div>
                <label htmlFor="name" className="meta mb-1 block">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="field"
                    style={{ borderColor: errors.name ? 'var(--danger)' : undefined }}
                />
                {errors.name && <p className="mt-1 text-sm" style={{ color: 'var(--danger)' }}>{errors.name}</p>}
            </div>

            <div>
                <label htmlFor="email" className="meta mb-1 block">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="field"
                    style={{ borderColor: errors.email ? 'var(--danger)' : undefined }}
                />
                {errors.email && <p className="mt-1 text-sm" style={{ color: 'var(--danger)' }}>{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="message" className="meta mb-1 block">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="field"
                    style={{ borderColor: errors.message ? 'var(--danger)' : undefined, resize: 'vertical' }}
                />
                {errors.message && <p className="mt-1 text-sm" style={{ color: 'var(--danger)' }}>{errors.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="accent-button disabled:cursor-not-allowed disabled:opacity-70"
            >
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
                <div
                    className="border-l pl-4 text-sm leading-7"
                    style={{ borderColor: 'var(--success)', color: 'var(--success)' }}
                >
                    Message sent successfully. I'll get back to you soon.
                </div>
            )}

            {submitStatus === 'error' && (
                <div
                    className="border-l pl-4 text-sm leading-7"
                    style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}
                >
                    Something went wrong. Please try again later.
                </div>
            )}
        </form>
    );
}
