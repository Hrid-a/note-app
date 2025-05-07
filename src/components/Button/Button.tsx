import * as React from 'react';
import styles from './Button.module.css'
import clsx from 'clsx';

function Button({children, className, ...delegated}:React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return <button className={clsx(styles.btn, className)}  {...delegated}>
    {children}
  </button>;
}

export default Button;
