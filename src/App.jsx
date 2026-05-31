import { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Certificates from './components/Certificates';
import Footer from './components/Footer';

const HOME_SECTIONS = ['home', 'about', 'education', 'skills'];

function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setWidth(isNaN(pct) ? 0 : pct);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}

// Fade wrapper for page transitions
function PageFade({ children, pageKey }) {
  const [phase, setPhase] = useState('enter');
  const prevKey = useRef(pageKey);

  useEffect(() => {
    if (prevKey.current === pageKey) return;
    prevKey.current = pageKey;
    setPhase('exit');
    const t = setTimeout(() => setPhase('enter'), 260);
    return () => clearTimeout(t);
  }, [pageKey]);

  return (
    <div style={{
      opacity: phase === 'enter' ? 1 : 0,
      transform: phase === 'enter' ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.98)',
      transition: 'opacity 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1)',
    }}>
      {children}
    </div>
  );
}

const CODE_SYMBOLS = ['{}', '</>', '()', '=>', '[]', '&&', '||', '...', '#', '++'];

function BurstLayer({ theme }) {
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    function onClick(e) {
      const symbol = CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)];
      const particles = Array.from({ length: 10 }, (_, i) => {
        const angle = (i / 10) * 2 * Math.PI;
        const dist = 55 + Math.random() * 55;
        return { dx: Math.cos(angle) * dist, dy: Math.sin(angle) * dist, id: i };
      });
      const id = Date.now() + Math.random();
      setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY, symbol, particles }]);
      setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 700);
    }
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [theme]);

  const burstColor = theme === 'light' ? '#f5c518' : '#58a6ff';

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {bursts.map((b) => (
        <div key={b.id} style={{ position: 'absolute', left: b.x, top: b.y }}>
          {b.particles.map((p) => (
            <span key={p.id} style={{
              position: 'absolute',
              fontSize: '0.95rem',
              color: burstColor,
              fontFamily: 'monospace',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              animation: 'burstParticle 0.65s ease-out forwards',
              '--dx': `${p.dx}px`,
              '--dy': `${p.dy}px`,
            }}>{b.symbol}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

function FloatingSymbols({ theme, isHome }) {
  if (!isHome) return null;
  const symbolColor = theme === 'light' ? '#f5c518' : '#58a6ff';
  const baseOpacity = theme === 'light' ? 0.15 : 0.06;
  const items = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    symbol: CODE_SYMBOLS[i % CODE_SYMBOLS.length],
    left: `${5 + (i * 7.2) % 90}%`,
    delay: `${(i * 1.3) % 10}s`,
    duration: `${14 + (i * 2.1) % 12}s`,
    size: `${0.65 + (i * 0.07) % 0.5}rem`,
    opacity: baseOpacity + (i * 0.005) % 0.06,
  }));

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10, overflow: 'hidden' }}>
      {items.map((item) => (
        <span key={item.id} style={{
          position: 'absolute',
          left: item.left,
          bottom: '-2rem',
          fontSize: item.size,
          color: symbolColor,
          opacity: item.opacity,
          fontFamily: 'monospace',
          fontWeight: 700,
          whiteSpace: 'nowrap',
          animation: `floatUp ${item.duration} ${item.delay} linear infinite`,
        }}>{item.symbol}</span>
      ))}
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  function navigate(id) {
    if (HOME_SECTIONS.includes(id)) {
      if (!HOME_SECTIONS.includes(activePage)) {
        setActivePage('home');
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setActivePage(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const isHome = HOME_SECTIONS.includes(activePage);

  return (
    <div data-theme={theme} style={{ minHeight: '100vh' }}>
      <FloatingSymbols theme={theme} isHome={isHome} />
      <BurstLayer theme={theme} />
      <ScrollProgress />
      <Navbar activePage={activePage} navigate={navigate} theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <PageFade pageKey={activePage}>
          {isHome && (
            <>
              <Hero navigate={navigate} />
              <About />
              <Education />
              <Skills />
            </>
          )}
          {activePage === 'projects' && <Projects />}
          {activePage === 'experience' && <Experience />}
          {activePage === 'certificates' && <Certificates />}
          {activePage === 'contact' && <Contact />}
        </PageFade>
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
