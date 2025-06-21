'use client'

import { useState } from "react"
import { ChevronLeft } from "lucide-react";
import clsx from "clsx"
import { logout } from "@/actions/logout"
import styles from './Settings.module.css'
import ThemeOptions from "../ThemeOptions"
import Header from "../Header"
import EmailChanger from "../EmailChanger";

interface SettingsProps {
  currentTheme?: 'light' | 'dark',
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

type sections = 'color-theme' | 'change-email' | string & {} | null

function Settings({
  currentTheme = "light",
}: SettingsProps) {
  const [activeSection, setActiveSection] = useState<sections>("color-theme")


  return (
    <>
      <Header />
      
      <div className={styles.container}>
        <aside className={clsx(styles.sidebar, activeSection !== null && styles.hide)}>
          <nav className={styles.sidebarNav}>
            <button
              className={`${styles.navItem} ${activeSection === "color-theme" ? styles.active : ""}`}
              onClick={() => setActiveSection("color-theme")}
            >
              <PaletteIcon />
              Color Theme
              {
                activeSection === "color-theme" ? <ChevronRightIcon /> : null
              }
            </button>

            <button
              className={`${styles.navItem} ${activeSection === "change-email" ? styles.active : ""}`}
              onClick={() => setActiveSection("change-email")}
            >
              <LockIcon />
              Change Email
              {
                activeSection === "change-email" ? <ChevronRightIcon /> : null
              }
            </button>
            <form action={logout}>
              <button className={styles.navItem}>
                <LogOutIcon />
                Logout
              </button>
            </form>
          </nav>
        </aside>

        <main className={clsx(styles.main, activeSection === null && styles.hide)}>
          <button className={styles.mobilebtn} onClick={()=> setActiveSection(null)} > <ChevronLeft /> settings </button>
          {activeSection === "color-theme" && (
            <ThemeOptions initialTheme={currentTheme} />
          )}


          {activeSection === "change-email" ? (
            <EmailChanger  />
          ): null}
        </main>
      </div>
    </>
  )
}

export default Settings;