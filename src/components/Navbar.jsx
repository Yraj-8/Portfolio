import { useState, useRef, useEffect } from 'react';
import styles from './Navbar.module.css';

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16a6.47 6.47 0 0 0 4.23-1.57l.27.28v.79L20 21.49 21.49 20 15.5 14zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.76 4.84 5.34 3.42 3.93 4.83l1.41 1.41 1.42-1.4zM1 13h3v-2H1v2zm10-9h2V1h-2v3zm7.66.83-1.41-1.41-1.42 1.42 1.41 1.41 1.42-1.42zM17.24 19.16l1.42 1.42 1.41-1.41-1.42-1.42-1.41 1.41zM20 11v2h3v-2h-3zM11 20h2v3h-2v-3zm-7.07-.59 1.41 1.41 1.42-1.42-1.41-1.41-1.42 1.42zM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.37 5.51A7 7 0 0 0 18.49 14.63 8 8 0 1 1 9.37 5.51z" />
    </svg>
  );
}

const links = [
  { label: 'Home', id: 'home' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Certificates', id: 'certificates' },
  { label: 'Contact', id: 'contact' },
];

const HOME_SECTIONS = ['home', 'about', 'education', 'skills'];

export default function Navbar({ activePage, navigate, theme, onToggleTheme }) {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState('');
  const [highlighted, setHighlighted] = useState(0);
  const searchRef = useRef(null);
  const paletteRef = useRef(null);

  const allLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Education', id: 'education' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Certificates', id: 'certificates' },
    { label: 'Contact', id: 'contact' },
  ];

  const filteredLinks = paletteQuery.trim()
    ? links.filter((l) => l.label.toLowerCase().includes(paletteQuery.toLowerCase()))
    : links;

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'f' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setPaletteOpen(true);
        setPaletteQuery('');
        setHighlighted(0);
        setTimeout(() => paletteRef.current?.focus(), 50);
      }
      if (e.key === 'Escape') {
        setPaletteOpen(false);
        setPaletteQuery('');
        searchRef.current?.blur();
        setQuery('');
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  function handlePaletteKey(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted((h) => Math.min(h + 1, filteredLinks.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setHighlighted((h) => Math.max(h - 1, 0)); }
    if (e.key === 'Enter' && filteredLinks[highlighted]) {
      navigate(filteredLinks[highlighted].id);
      setPaletteOpen(false);
      setPaletteQuery('');
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    const term = query.trim().toLowerCase();
    if (!term) return;
    const match = links.find((l) => l.label.toLowerCase().includes(term));
    if (match) {
      navigate(match.id);
      setQuery('');
    }
  }

  // Active state: home sections all highlight their own link
  function isActive(id) {
    if (id === 'home' && HOME_SECTIONS.includes(activePage)) return activePage === 'home';
    return activePage === id;
  }

  return (
    <>
      <header className={styles.header}>
      <nav className={styles.nav}>
        <button className={styles.brand} onClick={() => navigate('home')}>
          <span className={styles.brandIcon}>&lt;/&gt;</span>
          <span className={styles.brandName}>Yashawant</span>
        </button>

        <form className={styles.searchWrap} onSubmit={handleSearch}>
          <span className={styles.searchIcon}><SearchIcon /></span>
          <input
            type="text"
            placeholder="Press F to search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={searchRef}
            className={styles.searchInput}
          />
        </form>

        <button
          type="button"
          className={styles.themeBtn}
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <span className={styles.themeIcon}>{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</span>
          <span className={styles.themeText}>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {links.map((link) => (
            <li key={link.id}>
              <button
                className={`${styles.navBtn} ${isActive(link.id) ? styles.navActive : ''}`}
                onClick={() => { navigate(link.id); setMenuOpen(false); }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>

    {paletteOpen && (
      <div className={styles.paletteOverlay} onClick={() => { setPaletteOpen(false); setPaletteQuery(''); }}>
        <div className={styles.palette} onClick={(e) => e.stopPropagation()}>
          <input
            ref={paletteRef}
            className={styles.paletteInput}
            placeholder="Go to section..."
            value={paletteQuery}
            onChange={(e) => { setPaletteQuery(e.target.value); setHighlighted(0); }}
            onKeyDown={handlePaletteKey}
            autoComplete="off"
          />
          <ul className={styles.paletteList}>
            {filteredLinks.map((link, i) => (
              <li
                key={link.id}
                className={`${styles.paletteItem} ${i === highlighted ? styles.paletteActive : ''}`}
                onMouseEnter={() => setHighlighted(i)}
                onClick={() => { navigate(link.id); setPaletteOpen(false); setPaletteQuery(''); }}
              >
                <span className={styles.paletteLabel}>{link.label}</span>
                <span className={styles.paletteHint}>↵</span>
              </li>
            ))}
          </ul>
          <div className={styles.paletteFooter}>
            <span><kbd>↑↓</kbd> navigate</span>
            <span><kbd>↵</kbd> select</span>
            <span><kbd>Esc</kbd> close</span>
          </div>
        </div>
      </div>
    )}
  </>
  );
}