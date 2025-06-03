import React from 'react'
import style from './auth.module.css'
import Logo from '@/components/Logo';
import { requireAnonymos } from '@/utils/auth.server';

async function authLayout({children}:{children: React.ReactNode}) {
  await requireAnonymos()
  return (
    <div className={style.wrapper}>
        <div className={style.authWrapper}>
        <Logo />
        {children}
        </div>
    </div>
  )
}

export default authLayout;