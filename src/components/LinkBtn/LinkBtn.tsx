import clsx from 'clsx';
import Link from 'next/link';
import * as React from 'react';
import styles from './LinkBtn.module.css';

type LinkProps = React.PropsWithChildren<React.AnchorHTMLAttributes<HTMLAnchorElement>>

function LinkBtn({children, href,  className, ...rest}:LinkProps) {
  return <Link href={href!} {...rest} className={clsx(styles.wrapper, className)} >
    {children}
  </Link>;
}

export default LinkBtn;
