import { useEffect, useState } from 'react';
import styles from './Hero.module.css';
import { useScramble, useScrollReveal, useMagnetic } from '../hooks';


function GithubIcon() {
  return <svg height="18" width="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>;
}
function LinkedInIcon() {
  return <svg height="18" width="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
}
function MailIcon() {
  return <svg height="18" width="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" /></svg>;
}
function DownloadIcon() {
  return <svg height="16" width="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 20h14v-2H5v2zm7-18v10.17l3.59-3.58L17 10l-5 5-5-5 1.41-1.41L11 12.17V2h1z" /></svg>;
}
function UserIcon() {
  return <svg height="16" width="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.76 0 5-2.24 5-5S14.76 2 12 2 7 4.24 7 7s2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" /></svg>;
}

const TAGLINES = ['I design & code for web', 'I build full stack apps', 'I love clean UI & code'];

function useTyping(texts, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[idx];
    let timeout;
    if (!deleting && display === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && display === '') {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    } else {
      timeout = setTimeout(() => {
        setDisplay(deleting ? current.slice(0, display.length - 1) : current.slice(0, display.length + 1));
      }, deleting ? speed / 2 : speed);
    }
    return () => clearTimeout(timeout);
  }, [display, deleting, idx, texts, speed, pause]);
  return display;
}

const statsData = [
  { icon: <GithubIcon />, value: '10+', label: 'GitHub Projects', href: 'https://github.com/Yraj-8' },
  { icon: <LinkedInIcon />, value: '500+', label: 'LinkedIn Connections', href: 'https://in.linkedin.com/in/yraj0812' },
  { icon: <MailIcon />, value: '24×7', label: 'Available for Work', href: 'mailto:work.yraj@gmail.com' },
];

function StatItem({ icon, value, label, href, trigger }) {
  const scrambled = useScramble(value, trigger);
  const content = (
    <>
      <span className={styles.statIcon}>{icon}</span>
      <span className={styles.statValue}>{scrambled}</span>
      <span className={styles.statLabel}>{label}</span>
    </>
  );

  return href ? (
    <a
      className={styles.statItem}
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
    >
      {content}
    </a>
  ) : (
    <div className={styles.statItem}>{content}</div>
  );
}

export default function Hero({ navigate }) {
  const typed = useTyping(TAGLINES);
  const [statsRef, statsVisible] = useScrollReveal();
  const btn1 = useMagnetic();
  const btn2 = useMagnetic();

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.glow} />

      <div className={styles.content}>
        <h1 className={styles.name}>Yashawant Raj</h1>

        <h2 className={styles.tagline}>
          {typed}<span className={styles.cursor}>|</span>
        </h2>

        <p className={styles.sub}>
          Code. Build. Deploy. Repeat.
        </p>

        <div className={styles.actions}>
          <a
            ref={btn1.ref}
            onMouseMove={btn1.onMouseMove}
            onMouseLeave={btn1.onMouseLeave}
            className={styles.btnPrimary}
            href="dist/assets/YRAJ_RESUME.pdf"
            download
            style={{ transition: 'transform 0.15s ease, background 0.2s' }}
          >
            <span className={styles.actionIcon}><DownloadIcon /></span>
            Download CV
          </a>
          <a
            ref={btn2.ref}
            onMouseMove={btn2.onMouseMove}
            onMouseLeave={btn2.onMouseLeave}
            className={styles.btnSecondary}
            onClick={() => navigate('about')}
            style={{ cursor: 'pointer', transition: 'transform 0.15s ease, background 0.2s' }}
          >
            <span className={styles.actionIcon}><UserIcon /></span>
            About Me
          </a>
        </div>

        <div className={styles.socialRow}>
          <a href="https://github.com/Yraj-8" className={styles.socialLink} target="_blank" rel="noreferrer">
            <GithubIcon />
            github.com/Yraj-8
          </a>
        </div>

        <div className={styles.statsRow} ref={statsRef}>
          {statsData.map((s) => (
            <StatItem key={s.label} {...s} trigger={statsVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
