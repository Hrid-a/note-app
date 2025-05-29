import * as React from 'react';
import LinkBtn from '../LinkBtn';
import { Plus } from 'lucide-react';
import Notes from '../Notes/Notes';
import styles from './NotesWrapper.module.css';
import { getAllNotes } from '@/utils/queries.server';

async function NotesWrapper() {
  const notes = await getAllNotes({id: 'cmalhdv1l000legko9pj8bne0'});
  
  return (
    <div className={styles.wrapper}>
      <LinkBtn href='/notes/new' className={styles.flex}>
        <Plus />
        <span className={styles.btnText}>create new note</span>
      </LinkBtn>
      <LinkBtn href='/notes/new' className={styles.smallScreenBtn}>
        <Plus />
      </LinkBtn>
      <Notes notes={notes} />
    </div>
  );
}

export default NotesWrapper;
