'use client';
import * as React from 'react';
import Cookies from 'js-cookie';
import styles from './ThemeOptions.module.css';
import { DARK_TOKENS, LIGHT_TOKENS } from '@/utils/colors';
import { COLOR_THEME_COOKIE_NAME } from '@/utils/constants';

const SunIcon = () => (
  <svg className={styles.themeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
)

const MoonIcon = () => (
  <svg className={styles.themeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
)

const MonitorIcon = () => (
  <svg className={styles.themeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

type ThemeMode = "light" | "dark" | "system"


function ThemeOptions({initialTheme}:{initialTheme: string}) {
  const [theme, setTheme] = React.useState(initialTheme)
  
  const handleThemeSelect = (nextTheme: ThemeMode)=>{
    setTheme(nextTheme);
  }

  function changeTheme(){
    let nextTheme = theme;

    if(theme === 'system' && typeof window !== 'undefined'){
      nextTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const COLORS = nextTheme === 'dark' ? DARK_TOKENS : LIGHT_TOKENS;
    const root = document.documentElement;

    root.setAttribute('data-theme', nextTheme);

    Object.entries(COLORS).forEach(([key , value])=>{
      root.style.setProperty(key, value)
    })

    Cookies.set(COLOR_THEME_COOKIE_NAME, nextTheme, {expires: 1000})
  }



  const themeOptions = [
    {
      id: "light" as ThemeMode,
      name: "Light Mode",
      description: "Pick a clean and classic light theme",
      icon: <SunIcon />,
    },
    {
      id: "dark" as ThemeMode,
      name: "Dark Mode",
      description: "Select a sleek and modern dark theme",
      icon: <MoonIcon />,
    },
    {
      id: "system" as ThemeMode,
      name: "System",
      description: "Adapts to your device's theme",
      icon: <MonitorIcon />,
    },
  ]

  return (<>
            <div className={styles.header}>
              <h1 className={styles.title}>Color Theme</h1>
              <p className={styles.subtitle}>Choose your color theme:</p>
            </div>

            <div className={styles.themeOptions}>
              {themeOptions.map((option) => (
                <div
                  key={option.id}
                  className={`${styles.themeOption} ${theme === option.id ? styles.selected : ""}`}
                  onClick={() => handleThemeSelect(option.id)}
                >
                  {option.icon}
                  <div className={styles.themeContent}>
                    <h3 className={styles.themeName}>{option.name}</h3>
                    <p className={styles.themeDescription}>{option.description}</p>
                  </div>
                  <div className={`${styles.radioButton} ${theme === option.id ? styles.selected : ""}`} />
                </div>
              ))}
            </div>

            <button
              className={styles.applyButton}
              onClick={changeTheme}
            >
              Apply Changes
            </button>
          </>);
}

export default ThemeOptions;
