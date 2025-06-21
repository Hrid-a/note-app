import React from 'react'
import ClientLayout from '@/components/ClientLayout'
import NotesWrapper from '@/components/NotesWrapper'
import styles from './page.module.css';
import DesktopSideBar from '@/components/DesktopSideBar';
import Header from '@/components/Header';
import UpperHeader from '@/components/UpperHeader';


async function NoteLayout({children}: {children: React.ReactNode}) {
    
return (
    <div className={styles.wrapper}>
      <DesktopSideBar />
      <Header />
      <section className={styles.mobile}>
        <UpperHeader  />
        <article className={styles.content}>
          <ClientLayout>
              <NotesWrapper />
          </ClientLayout>
          {children}
        </article>
      </section>
    </div>    
  )
}

export default NoteLayout