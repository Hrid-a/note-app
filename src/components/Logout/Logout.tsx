import { logout } from '@/actions/logout';
import * as React from 'react';
import styles from './Logout.module.css';
import clsx from 'clsx';

function Logout({className}: {className?: string}) {
  return <button className={clsx(styles.btn, className)} onClick={() => logout()} >Logout</button>;
}

export default Logout;
