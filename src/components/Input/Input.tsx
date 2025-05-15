import * as React from 'react';
import style from './Input.module.css'
import clsx from 'clsx';


function Input({className , ...delegated}:React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={clsx(style.input,className)} {...delegated} />;
}

export default Input;
