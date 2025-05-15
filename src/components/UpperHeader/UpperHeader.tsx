'use client';
import * as React from 'react';
import SearchBar from '../SearchBar';
import Settings from '../Settings';
import styles from './UpperHeader.module.css'
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

function UpperHeader() {
    const pathname = usePathname();
  
  return <div className={clsx(styles.wrapper, pathname !== '/notes' && styles.hide)}>
    <h1> all notes</h1>
    <SearchBar className={styles.auto} />
    <Settings />
  </div>;
}

export default UpperHeader;
