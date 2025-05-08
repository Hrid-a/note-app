import * as React from 'react';
import styles from './VisuallyHidden.module.css';
import clsx from 'clsx';

function VisuallyHidden({children, className, ...delegated}: React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>) {
  return <div className={clsx(styles.wrapper, className)} {...delegated}>
    {children}
  </div>;
}

export default VisuallyHidden;
