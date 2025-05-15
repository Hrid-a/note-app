import DesktopSideBar from '@/components/DesktopSideBar';
import React from 'react'
import styles from './page.module.css'
import UpperHeader from '@/components/UpperHeader';
import Header from '@/components/Header';

async function layout({children, content}: Readonly<{children: React.ReactNode; content: React.ReactNode}>) {
  return (
    <div className={styles.wrapper}>
        <DesktopSideBar />
        <Header />
        <section className={styles.mobile}>
            <UpperHeader />
            <article className={styles.content}>
              {children}
              {content}
            </article>
        </section>
    </div>
  )
}

export default layout