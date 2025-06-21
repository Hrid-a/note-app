// import SessionData from '@/components/SessionData';
'use server';
import DesktopSideBar from '@/components/DesktopSideBar';
import Settings from '@/components/Settings';
import { requireUser } from '@/utils/auth.server';
import { COLOR_THEME_COOKIE_NAME } from '@/utils/constants';
import { getUser } from '@/utils/queries.server';
import { cookies } from 'next/headers';
import React from 'react'
import styles from './page.module.css';

async function SettingsPage() {
  const user = await requireUser();
  const session = await getUser({id: user.id});
  const rawTheme = (await cookies()).get(COLOR_THEME_COOKIE_NAME)?.value;
  const theme = rawTheme === "light" || rawTheme === "dark" ? rawTheme : "light";

  if(!session) return null;
  return (
    <div className={styles.wrapper}>
      <DesktopSideBar />
        <Settings  currentTheme={theme} >
        </Settings>
    </div>
  )
}

export default SettingsPage;


