import styles from './Section.module.css';
import { useScrollReveal } from '../hooks';

const education = [
  {
    degree: 'Bachelor of Technology',
    field: 'Computer Science & Engineering',
    institute: 'Lakshmi Narain College of Technology & Science',
    year: '2021 – 2025',
    grade: 'CGPA: 7.6 / 10',
  },
  {
    degree: 'Higher Secondary (12th)',
    field: 'Science – PCM',
    institute: "Scholar's Abode",
    year: '2019 – 2021',
    grade: 'Percentage: 63%',
  },
];

export default function Education() {
  const [ref, visible] = useScrollReveal();
  return (
    <section id="education" className={styles.section}>
      <div className={styles.container} ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
        <p className={styles.sectionLabel}>My Learning Path</p>
        <h2 className={styles.sectionTitle}>Education</h2>
        <div className={`${styles.timeline} ${visible ? styles.animated : ''}`}>
          {education.map((item) => (
            <div key={item.degree} className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{item.degree}</h3>
                  <span className={styles.badge}>{item.year}</span>
                </div>
                <p className={styles.cardSub}>{item.field}</p>
                <p className={styles.cardMuted}>{item.institute}</p>
                <span className={styles.chip}>{item.grade}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
