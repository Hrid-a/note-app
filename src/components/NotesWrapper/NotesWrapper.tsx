import * as React from 'react';
import LinkBtn from '../LinkBtn';
import { Plus } from 'lucide-react';
import Notes from '../Notes/Notes';
import styles from './NotesWrapper.module.css';
import { getAllNotes } from '@/utils/queries.server';
import clsx from 'clsx';

async function NotesWrapper() {
  const notes = await getAllNotes();
  
  return (
    <div className={styles.wrapper}>
      <LinkBtn href='/notes/new' className={clsx(styles.flex, styles.primary)}>
        <Plus />
        <span className={styles.btnText}>create new note</span>
      </LinkBtn>
      <LinkBtn href='/notes/new' className={clsx(styles.smallScreenBtn, styles.primary)}>
        <Plus />
      </LinkBtn>
      <Notes notes={notes} />
    </div>
  );
}

export default NotesWrapper;
