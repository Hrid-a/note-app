import * as React from 'react';
import { getNoteById } from '@/utils/queries.server';
import styles from './page.module.css'
import NoteForm from '@/components/NoteForm';
import NoteActions from '@/components/NoteActions';

export default async function NotePage({params}:{params: Promise<{slug:string}>}) {
    const {slug} = await params;
    const note = await getNoteById({id: slug});
    if(!note){
      throw new Error('there is no note with this id')
    }
    
  return (
    <div className={styles.wrapper}>
      <div className={styles.noteContent}>
        <NoteForm {...note} id={slug} />
      </div>
      <NoteActions id={slug} className={styles.hide} />
    </div>
  )
}
