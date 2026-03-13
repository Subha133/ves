import { useState } from 'react';
import siteData from '../data/site-data.json';
import styles from './ContactForm.module.css';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const phoneNumber = siteData.app_config.contact_whatsapp; 

        const message = `
📩 *New Inquiry – Visual Edit Studio*

👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}

📝 *Project Details:*
${formData.message}
        `;

        const encodedMessage = encodeURIComponent(message.trim());
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappURL, "_blank");

        // Reset form after opening WhatsApp
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="message">How can we help?</label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                ></textarea>
            </div>

            <button type="submit" className={styles.submitBtn}>
                Send Message →
            </button>
        </form>
    );
}
