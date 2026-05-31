import { useState } from 'react';
import styles from './Section.module.css';
import { useScrollReveal } from '../hooks';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xojbzvod';

function MailIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" /></svg>;
}
function LocationIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>;
}
function LinkedInIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [msg, setMsg] = useState('');
  const [ref, visible] = useScrollReveal();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setMsg('Please fill all fields.');
      return;
    }

    setIsSubmitting(true);
    setMsg('Sending message...');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (response.ok) {
        setMsg('Message sent! I will get back to you soon.');
        setForm({ name: '', email: '', message: '' });
      } else {
        setMsg('Unable to send message right now. Please try again later.');
      }
    } catch (error) {
      setMsg('Unable to send message right now. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container} ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
        <p className={styles.sectionLabel}>Get In Touch</p>
        <h2 className={styles.sectionTitle}>Contact Me</h2>
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}><MailIcon /></span>
              <div><p className={styles.contactLabel}>Email</p><a href="mailto:yourname@email.com" className={styles.contactValue}>yourname@email.com</a></div>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}><LocationIcon /></span>
              <div><p className={styles.contactLabel}>Location</p><span className={styles.contactValue}>Bhubaneswar, India</span></div>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}><LinkedInIcon /></span>
              <div><p className={styles.contactLabel}>LinkedIn</p><a href="https://in.linkedin.com/in/yraj0812" className={styles.contactValue} target="_blank" rel="noreferrer">linkedin.com/in/yraj0812</a></div>
            </div>
          </div>
          <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
            <input type="text" placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <textarea rows={4} placeholder="Your Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <button type="submit">Send Message ✉</button>
            {msg && <p className={styles.formMsg}>{msg}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
