import * as React from 'react';
import {Archive, ChevronRight, House} from 'lucide-react'
import Logo from '../Logo';
import LinkBtn from '../LinkBtn';
import styles from './DesktopSideBar.module.css'

function DesktopSideBar() {
  return <div className={styles.wrapper}>
    <Logo />
    <LinkBtn href='/' className={styles.active}>
      <House className={styles.activeIcon} />
      <span>all Notes</span>
      <ChevronRight className={styles.auto} />
    </LinkBtn>

    <LinkBtn href='/archive'>
      <Archive />
      archived notes
    </LinkBtn>
    {/* maybe some tags ... */}
  </div>;
}

export default DesktopSideBar;
