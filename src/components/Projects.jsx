import styles from './Section.module.css';
import { useScrollReveal, useTilt } from '../hooks';

function MonitorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 3H3c-1.1 0-2 .9-2 2v11h22V5c0-1.1-.9-2-2-2zm0 13H3v2c0 1.1.9 2 2 2h5v1h4v-1h5c1.1 0 2-.9 2-2v-2z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 3v2h3.59L8 14.59 9.41 16 19 6.41V10h2V3h-7z" />
      <path d="M5 5h6V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6h-2v6H5V5z" />
    </svg>
  );
}

const projects = [
  {
    title: 'Password-breach-checker',
    desc: 'A Password Breach Checker built using Node.js, Express, and the HaveIBeenPwned API.',
    tech: ['React', 'CSS', 'REST API'],
    live: 'https://password-guardian-18hm.onrender.com/',
    github: 'https://github.com/Yraj-8/Password-breach-checker',
    img: '/assets/project1.png',
  },
  {
    title: 'Currency Convertor',
    desc: 'This project allows users to convert between different currencies in real-time using live exchange rates.',
    tech: ['HTML', 'JavaScript'],
    live: 'https://yraj-8.github.io/Currency-Convertor/',
    github: 'https://github.com/Yraj-8/Currency-Convertor',
    img: '/assets/project2.png',
  },
  {
    title: 'Password Generator',
    desc: 'Developed a secure password generator using React.js, enabling users to create strong, customizable passwords.',
    tech: ['React', 'Tailwind'],
    live: 'https://yraj-8.github.io/Password-Generator/',
    github: 'https://github.com/Yraj-8/Password-Generator',
    img: 'https://s0.wordpress.com/mshots/v1/https%3A%2F%2Fyraj-8.github.io%2FPassword-Generator%2F?w=600',
  },
];

const reveal = (delay) => ({
  opacity: 1, transform: 'translateY(0)',
  transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
});
const hidden = (delay) => ({
  opacity: 0, transform: 'translateY(32px)',
  transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
});

function TiltCard({ children, visible, delay }) {
  const tilt = useTilt(8);
  return (
    <article
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className={`${styles.card} ${styles.projectCard}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </article>
  );
}

export default function Projects() {
  const [ref, visible] = useScrollReveal();
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.sectionLabel}>Browse My Recent</p>
        <h2 className={styles.sectionTitle}>Projects</h2>
        <div className={styles.projectGrid} ref={ref}>
          {projects.map((project, i) => (
            <TiltCard key={project.title} visible={visible} delay={i * 0.15}>
              {project.img
                ? <img src={project.img} alt={project.title} className={styles.projectImg} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                : null}
              <div className={styles.projectImgPlaceholder} style={{ display: project.img ? 'none' : 'flex' }}><MonitorIcon /></div>
              <div className={`${styles.cardBody} ${styles.projectCardBody}`}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardMuted}>{project.desc}</p>
                <div className={styles.techRow}>
                  {project.tech.map((t) => <span key={t} className={styles.chip}>{t}</span>)}
                </div>
                <div className={styles.projectLinks}>
                  <a href={project.github} className={styles.linkBtn} target="_blank" rel="noreferrer">
                    <span className={styles.projectLinkIcon}><GithubIcon /></span>GitHub
                  </a>
                  <a href={project.live} className={styles.linkBtnAlt} target="_blank" rel="noreferrer">
                    <span className={styles.projectLinkIcon}><ExternalLinkIcon /></span>Live Demo
                  </a>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
