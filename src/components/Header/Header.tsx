import * as React from 'react';
import Logo from '../Logo';
import styles from './Header.module.css';
import Link from 'next/link';

function Header() {
  return <div className={styles.wrapper}>
    <Link href='/'>
      <Logo />
    </Link>
  </div>;
}

export default Header;
