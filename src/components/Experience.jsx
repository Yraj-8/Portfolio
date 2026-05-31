import styles from './Section.module.css';
import { useScrollReveal } from '../hooks';

const experience = [
  {
    role: 'Java Full Stack Developer',
    company: 'LTM',
    duration: 'Mar 2026 – Present',
    points: [
      'Developing and maintaining enterprise-grade web applications using Java, Spring Boot and Angular.',
      'Designing and optimizing RESTful APIs integrated with MySQL databases via JDBC.',
      'Building dynamic, responsive frontend interfaces with Angular and modern CSS.',
      'Collaborating in agile teams to deliver scalable, production-ready full stack solutions.',
    ],
  },
  {
    role: 'Node.js Developer',
    company: 'Self-employed',
    duration: 'Sep 2025 – Nov 2025',
    points: [
      'Built and deployed RESTful APIs using Node.js and Express for client web applications.',
      'Integrated third-party APIs and authentication services into existing web platforms.',
      'Implemented MongoDB database schemas and optimized query performance by 40%.',
      'Collaborated with clients to gather requirements and deliver clean, maintainable code.',
    ],
  },
];

export default function Experience() {
  const [ref, visible] = useScrollReveal();
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container} ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
        <p className={styles.sectionLabel}>My Professional Journey</p>
        <h2 className={styles.sectionTitle}>Experience</h2>
        <div className={`${styles.timeline} ${visible ? styles.animated : ''}`}>
          {experience.map((item) => (
            <div key={item.role} className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{item.role}</h3>
                  <span className={styles.badge}>{item.duration}</span>
                </div>
                <p className={styles.cardSub}>{item.company}</p>
                <ul className={styles.bulletList}>
                  {item.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
