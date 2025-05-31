'use client';
import clsx from 'clsx';
import { usePathname } from 'next/navigation'
import React from 'react'
import styles from './ClientLayout.module.css';

function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  return (
    <div className={clsx(pathname !== '/notes' && styles.hide)}>{children}</div>
  )
}

export default ClientLayout