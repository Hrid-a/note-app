import DesktopSideBar from '@/components/DesktopSideBar';
import React from 'react'
import styles from './page.module.css'
import UpperHeader from '@/components/UpperHeader';
import Header from '@/components/Header';
import NotesWrapper from '@/components/NotesWrapper';

async function layout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <div className={styles.wrapper}>
        <DesktopSideBar />
        <Header />
        <section className={styles.mobile}>
            <UpperHeader />
            <article className={styles.content}>
                <NotesWrapper />
                {children}
            </article>
        </section>
    </div>
  )
}

export default layout