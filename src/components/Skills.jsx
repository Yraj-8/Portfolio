import styles from './Section.module.css';
import { useScrollReveal } from '../hooks';

const categories = [
  { icon: '</>', title: 'Programming Languages', chips: ['Java', 'JavaScript', 'TypeScript', 'HTML/CSS'] },
  { icon: '▦', title: 'Front-End Development', chips: ['Angular', 'React.js', 'Tailwind CSS', 'Redux'] },
  { icon: '⊟', title: 'Back-End Development', chips: ['Spring Boot', 'JDBC', 'Node.js', 'Express', 'REST APIs'] },
  { icon: '🗄', title: 'Databases & Cloud Storage', chips: ['MongoDB', 'Cloudinary', 'Firebase', 'MySQL'] },
  { icon: '◈', title: 'Version Control & DevOps', chips: ['Git', 'GitHub', 'Vercel', 'Render'] },
  { icon: '🔧', title: 'Tools & Platforms', chips: ['VS Code', 'Postman', 'IntelliJ'] },
];

const reveal = { opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.6s ease, transform 0.6s ease' };
const hidden = { opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.6s ease, transform 0.6s ease' };

export default function Skills() {
  const [ref, visible] = useScrollReveal();
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container} ref={ref} style={visible ? reveal : hidden}>
        <p className={styles.skillIntro}>A comprehensive overview of my technical expertise and tools I work with</p>
        <h2 className={styles.skillHeading}>Technical Skills</h2>
        <div className={styles.skillCatGrid}>
          {categories.map((cat) => (
            <div key={cat.title} className={styles.skillCatCard}>
              <div className={styles.skillCatHeader}>
                <span className={styles.skillCatIcon}>{cat.icon}</span>
                <span className={styles.skillCatTitle}>{cat.title}</span>
              </div>
              <div className={styles.skillChipGrid}>
                {cat.chips.map((chip) => (
                  <span key={chip} className={styles.skillChip}>{chip}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
