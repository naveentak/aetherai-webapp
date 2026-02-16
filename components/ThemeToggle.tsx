import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const light = e.matches;
        document.documentElement.setAttribute('data-theme', light ? 'light' : 'dark');
        setIsDark(!light);
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggle = () => {
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme-transitioning', '');
    document.documentElement.setAttribute('data-theme', next === 'dark' ? '' : 'light');
    if (next === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', next);
    setIsDark(next === 'dark');
    setTimeout(() => {
      document.documentElement.removeAttribute('data-theme-transitioning');
    }, 350);
  };

  return (
    <motion.button
      onClick={toggle}
      className="relative w-9 h-9 rounded-full overlay-10 border border-overlay-10 flex items-center justify-center text-secondary hover:text-primary transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? <Moon size={16} /> : <Sun size={16} />}
      </motion.div>
    </motion.button>
  );
};
