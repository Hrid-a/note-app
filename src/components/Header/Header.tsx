import * as React from 'react';
import Logo from '../Logo';
import styles from './Header.module.css';

function Header() {
  return <div className={styles.wrapper}>
    <Logo />
  </div>;
}

export default Header;
