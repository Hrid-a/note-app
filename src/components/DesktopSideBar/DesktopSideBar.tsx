import * as React from 'react';
import {Archive, ChevronRight, House} from 'lucide-react'
import Logo from '../Logo';
import LinkBtn from '../LinkBtn';
import styles from './DesktopSideBar.module.css'
import clsx from 'clsx';
import Link from 'next/link';

function DesktopSideBar() {
  return <div className={styles.wrapper}>
    <Link href='/'>
      <Logo />
    </Link>
    <LinkBtn href='/notes' className={clsx(styles.active, styles.flex)}>
      <House className={styles.activeIcon} />
      <span>all Notes</span>
      <ChevronRight className={styles.auto} />
    </LinkBtn>

    <LinkBtn href='/archive' className={styles.flex}>
      <Archive />
      archived notes
    </LinkBtn>
    {/* maybe some tags ... */}
  </div>;
}

export default DesktopSideBar;
