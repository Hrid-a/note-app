import { monthsInAYear } from '@/utils/constants';
import { Clock } from 'lucide-react';
import * as React from 'react';
import styles from './NoteHeader.module.css';

function NoteHeader({children, date}: {children: React.ReactNode, date: Date}) {
  const dateStr = new Date(date);
  const day = dateStr.getDate();
  const month = monthsInAYear[dateStr.getMonth()];
  const year = dateStr.getFullYear();

  return <div className={styles.wrapper}>
    {children}
    <article className={styles.flex}>
      <Clock size={20} />
      <span> last edited</span>
      <span className={styles.auto}>{day} {' '} {month} {' '} {year}</span>
    </article>
  </div>;
}

export default NoteHeader;
