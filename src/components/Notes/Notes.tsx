'use client'
import Link from 'next/link';
import * as React from 'react';
import styles from './Notes.module.css';
import clsx from 'clsx';
import { usePathname } from 'next/navigation'
import { monthsInAYear } from '@/utils/constants';


type NotesProps = {
    id: string;
    title: string;
    createdAt: Date;
}[]



function Notes({notes}: {notes: NotesProps}) {
  const pathname = usePathname();


  return <div className={clsx(styles.wrapper)}>
    {
      notes.map(({id, title, createdAt})=>{
        const date = new Date(createdAt);
        return (
          <Link className={clsx(styles.note, pathname.slice(1) === id && styles.active)} href={`/${id}`} key={id} >
          <span className={styles.title}>{title}</span>
          <span>{date.getDate()} {' '} {monthsInAYear[date.getMonth()]} {' '} {date.getFullYear()} </span>
        </Link>
        )
      })
    }
  </div>;
}

export default Notes;
