import styles from './Section.module.css';
import { useScrollReveal } from '../hooks';

const certificates = [
  { title: 'React – The Complete Guide', issuer: 'Coursera', date: 'June 2024', credential: 'https://www.coursera.org/account/accomplishments/certificate/AFTK8W36PGGA', icon: '⚛' },
  { title: 'JavaScript Algorithms & Data Structures', issuer: 'freeCodeCamp', date: 'May 2024', credential: 'https://www.freecodecamp.org/certification/fccf9ae769a-cbe3-4be0-bbe9-0061f30cfec8/javascript-algorithms-and-data-structures', icon: 'JS' },
  { title: 'Angular Basic', issuer: 'HackerRank', date: 'May 2026', credential: 'https://www.hackerrank.com/certificates/c1acf94c1c7d', icon: '🅰' },

];

export default function Certificates() {
  const [ref, visible] = useScrollReveal();
  return (
    <section id="certificates" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.sectionLabel}>My Achievements</p>
        <h2 className={styles.sectionTitle}>Certificates</h2>
        <div className={styles.certGrid} ref={ref}>
          {certificates.map((cert, i) => (
            <div
              key={cert.title}
              className={styles.certCard}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(32px)',
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}
            >
              <div className={styles.certIconWrap}>
                <span className={styles.certIcon}>{cert.icon}</span>
              </div>
              <div className={styles.certBody}>
                <h3 className={styles.certTitle}>{cert.title}</h3>
                <p className={styles.certIssuer}>{cert.issuer}</p>
                <div className={styles.certFooter}>
                  <span className={styles.certDate}>{cert.date}</span>
                  <a href={cert.credential} className={styles.certLink} target="_blank" rel="noreferrer">
                    View Credential ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
