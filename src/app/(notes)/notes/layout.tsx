import React from 'react'
import ClientLayout from '@/components/ClientLayout'
import NotesWrapper from '@/components/NotesWrapper'
import styles from './page.module.css';

function NoteLayout({children}: {children: React.ReactNode}) {
return (
    <article className={styles.content}>
        <ClientLayout>
            <NotesWrapper />
        </ClientLayout>
        {children}
    </article>
  )
}

export default NoteLayout