import * as React from 'react';
import styles from './Label.module.css'
import clsx from 'clsx';


function Label({children, className, ...rest}:React.PropsWithChildren<React.LabelHTMLAttributes<HTMLLabelElement>>) {
  return <label className={clsx(styles.label, className)} {...rest}>
    {children}
  </label>
}

export default Label;
