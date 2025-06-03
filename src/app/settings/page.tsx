import React from 'react'

function SettingsPage() {
  return (
    <div>
        <Settings />
    </div>
  )
}

export default SettingsPage;



import { useState } from "react"
import styles from "./settings.module.css"

type ThemeMode = "light" | "dark" | "system"

interface SettingsProps {
  currentTheme?: ThemeMode
  onThemeChange?: (theme: ThemeMode) => void
  onLogout?: () => void
}

// SVG Icons
const PaletteIcon = () => (
  <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3V1m0 18v2m8-10a4 4 0 00-4-4H7a4 4 0 00-4 4v6a4 4 0 004 4h4a4 4 0 004-4v-6z"
    />
  </svg>
)

const TypeIcon = () => (
  <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
)

const LockIcon = () => (
  <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
)

const LogOutIcon = () => (
  <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
)

const ChevronRightIcon = () => (
  <svg className={styles.chevronIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

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

function Settings({
  currentTheme = "light",
  onThemeChange = () => {},
  onLogout = () => console.log("Logout clicked"),
}: SettingsProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeMode>(currentTheme)
  const [activeSection, setActiveSection] = useState("color-theme")

  const handleThemeSelect = (theme: ThemeMode) => {
    setSelectedTheme(theme)
  }

  const handleApplyChanges = () => {
    onThemeChange(selectedTheme)
    // Apply theme to document
    if (selectedTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      document.documentElement.setAttribute("data-theme", systemTheme)
    } else {
      document.documentElement.setAttribute("data-theme", selectedTheme)
    }
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

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <nav className={styles.sidebarNav}>
          <button
            className={`${styles.navItem} ${activeSection === "color-theme" ? styles.active : ""}`}
            onClick={() => setActiveSection("color-theme")}
          >
            <PaletteIcon />
            Color Theme
            <ChevronRightIcon />
          </button>

          <button
            className={`${styles.navItem} ${activeSection === "font-theme" ? styles.active : ""}`}
            onClick={() => setActiveSection("font-theme")}
          >
            <TypeIcon />
            Font Theme
          </button>

          <button
            className={`${styles.navItem} ${activeSection === "change-password" ? styles.active : ""}`}
            onClick={() => setActiveSection("change-password")}
          >
            <LockIcon />
            Change Password
          </button>

          <button className={styles.navItem} onClick={onLogout}>
            <LogOutIcon />
            Logout
          </button>
        </nav>
      </aside>

      <main className={styles.main}>
        {activeSection === "color-theme" && (
          <>
            <div className={styles.header}>
              <h1 className={styles.title}>Color Theme</h1>
              <p className={styles.subtitle}>Choose your color theme:</p>
            </div>

            <div className={styles.themeOptions}>
              {themeOptions.map((option) => (
                <div
                  key={option.id}
                  className={`${styles.themeOption} ${selectedTheme === option.id ? styles.selected : ""}`}
                  onClick={() => handleThemeSelect(option.id)}
                >
                  {option.icon}
                  <div className={styles.themeContent}>
                    <h3 className={styles.themeName}>{option.name}</h3>
                    <p className={styles.themeDescription}>{option.description}</p>
                  </div>
                  <div className={`${styles.radioButton} ${selectedTheme === option.id ? styles.selected : ""}`} />
                </div>
              ))}
            </div>

            <button
              className={styles.applyButton}
              onClick={handleApplyChanges}
              disabled={selectedTheme === currentTheme}
            >
              Apply Changes
            </button>
          </>
        )}

        {activeSection === "font-theme" && (
          <div className={styles.header}>
            <h1 className={styles.title}>Font Theme</h1>
            <p className={styles.subtitle}>Font theme settings coming soon...</p>
          </div>
        )}

        {activeSection === "change-password" && (
          <div className={styles.header}>
            <h1 className={styles.title}>Change Password</h1>
            <p className={styles.subtitle}>Password change settings coming soon...</p>
          </div>
        )}
      </main>
    </div>
  )
}
