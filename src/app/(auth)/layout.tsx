import React from 'react'
import style from './auth.module.css'
import Logo from '@/components/Logo';

function authLayout({children}:{children: React.ReactNode}) {
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