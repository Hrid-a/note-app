'use client';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import Settings from '../Settings';
import styles from './UpperHeader.module.css'
import clsx from 'clsx';
import VisuallyHidden from '../VisuallyHidden';
import LinkBtn from '../LinkBtn';

function UpperHeader() {
    const pathname = usePathname();
  
  return(<>
    <div className={clsx(styles.wrapper, pathname !== '/notes' && styles.hide)}>
      <h1> all notes</h1>
      <LinkBtn  href='/settings' className={clsx(styles.auto, styles.settings)}>
        <VisuallyHidden>change settings menu</VisuallyHidden>
        <Settings  />
      </LinkBtn>
    </div>
  </>);
}

export default UpperHeader;
