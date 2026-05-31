import styles from './Section.module.css';
import { useScrollReveal } from '../hooks';

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2H6v3H2v3c0 2.97 2.16 5.43 5 5.91V16H5v2h14v-2h-2v-2.09c2.84-.48 5-2.94 5-5.91V5h-4V2zm-2 12H8v-2h8v2zm4-6c0 1.86-1.28 3.41-3 3.86V7h3v1zM7 11.86C5.28 11.41 4 9.86 4 8V7h3v4.86z" />
    </svg>
  );
}

function EducationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3zm0 14L5.5 13.45V17L12 21l6.5-4v-3.55L12 17z" />
    </svg>
  );
}

export default function About() {
  const [ref, visible] = useScrollReveal();
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container} ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
        <p className={styles.sectionLabel}>Get To Know More</p>
        <h2 className={styles.sectionTitle}>About Me</h2>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutImg}>
            <img
              src="/assets/Personal.jpg"
              alt="Yashawant Raj"
            />
          </div>
          <div className={styles.aboutText}>
            <div className={styles.aboutCards}>
              <div className={styles.aboutCard}>
                <span className={styles.aboutCardIcon}><TrophyIcon /></span>
                <h4>Experience</h4>
                <p>Java Full Stack<br />Spring Boot + Angular</p>
              </div>
              <div className={styles.aboutCard}>
                <span className={styles.aboutCardIcon}><EducationIcon /></span>
                <h4>Education</h4>
                <p>B.Tech CSE<br />CGPA 7.6</p>
              </div>
            </div>
            <p className={styles.aboutDesc}>
              I build Java full-stack applications with Spring Boot and Angular, and my college journey also included MERN development and Java-based DSA. I enjoy turning real requirements into clean, working software and designing practical solutions with readable architecture. I like to learn from every project, improve my skills with code reviews, and keep delivering value with reliable apps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
