import { LogOutIcon } from 'lucide-react';
import * as React from 'react';
import styles from './SessionData.module.css';
import { logoutFromManySession } from '@/actions/logout';

async function SessionData({count, id}: {count: number, id:string}) {
    
  const logoutAction = logoutFromManySession.bind(null, id)
  return count > 1 ? (
    <>
      <form action={logoutAction}>
        <span className={styles.title}>you have loged in {count } sessions</span>
        <button className={styles.navItem}>
          <LogOutIcon />
          logout from {count - 1} other sessions
        </button>
      </form>
    </>
  ) : <span  className={styles.title}>you only loged in here</span>;
}

export default SessionData;
