'use client';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import Cookie from 'js-cookie';
import Settings from '../Settings';
import styles from './UpperHeader.module.css'
import clsx from 'clsx';
import Button from '../Button';
import VisuallyHidden from '../VisuallyHidden';
import { DARK_TOKENS, LIGHT_TOKENS } from '@/utils/colors';
import { COLOR_THEME_COOKIE_NAME } from '@/utils/constants';

function UpperHeader({initialTheme}: {initialTheme: 'light' | 'dark'}) {
    const pathname = usePathname();
    const [theme, setTheme] = React.useState<'light' | 'dark'>(initialTheme);
    
    function toggleTheme() {
      const nextTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(nextTheme);

      Cookie.set(COLOR_THEME_COOKIE_NAME, nextTheme, {
        expires: 365,
      });

      const root = document.documentElement;
      root.setAttribute('data-color-theme', nextTheme);

      const COLORS = nextTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;

      Object.entries(COLORS).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });

    }
  
  return <div className={clsx(styles.wrapper, pathname !== '/notes' && styles.hide)}>
    <h1> all notes</h1>
    <Button intent='secondary' className={styles.auto} onClick={toggleTheme}>
      <VisuallyHidden>change theme to {' ' } {theme === 'light' ? 'dark' : 'light'}</VisuallyHidden>
      <Settings  />
    </Button>
  </div>;
}

export default UpperHeader;
