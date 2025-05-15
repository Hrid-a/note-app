import * as React from 'react';
import styles from './Button.module.css'
import {cva, type VariantProps} from 'class-variance-authority';


const button = cva(styles.base, {
  variants:{
    intent:{
      primary: styles.primary,
      secondary: styles.secondary,
      bordered: styles.bordered
    }
  }
})

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>, VariantProps<typeof button> {}

function Button({children, intent, className, ...delegated}:React.PropsWithChildren<ButtonProps>) {
  return <button className={button({intent, className})}  {...delegated}>
    {children}
  </button>;
}

export default Button;
