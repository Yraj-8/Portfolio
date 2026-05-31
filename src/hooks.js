import { useEffect, useRef, useState, useCallback } from 'react';

// ── Scroll reveal ──
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

// ── Counter ──
export function useCounter(target, duration = 1500, trigger = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const num = parseInt(target.replace(/\D/g, ''), 10);
    if (!num) return;
    let start = 0;
    const step = Math.ceil(num / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);
  const suffix = target.replace(/[0-9]/g, '');
  return count + suffix;
}

// ── Number scramble ──
const CHARS = '0123456789';
export function useScramble(target, trigger = true, duration = 1200) {
  const [display, setDisplay] = useState(target);
  useEffect(() => {
    if (!trigger) return;
    const num = parseInt(target.replace(/\D/g, ''), 10);
    const suffix = target.replace(/[0-9]/g, '');
    if (!num) return;
    let elapsed = 0;
    const interval = 40;
    const timer = setInterval(() => {
      elapsed += interval;
      const progress = elapsed / duration;
      if (progress >= 1) { setDisplay(target); clearInterval(timer); return; }
      const scrambled = Array.from(String(num)).map((ch, i) =>
        progress > i / String(num).length
          ? ch
          : CHARS[Math.floor(Math.random() * CHARS.length)]
      ).join('');
      setDisplay(scrambled + suffix);
    }, interval);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);
  return display;
}

// ── Tilt card ──
export function useTilt(max = 12) {
  const ref = useRef(null);
  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * max}deg) rotateX(${-y * max}deg) scale(1.03)`;
  }, [max]);
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
  }, []);
  return { ref, onMouseMove: handleMove, onMouseLeave: handleLeave };
}

// ── Magnetic button ──
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null);
  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * strength;
    const y = (e.clientY - top - height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }, [strength]);
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  }, []);
  return { ref, onMouseMove: handleMove, onMouseLeave: handleLeave };
}
