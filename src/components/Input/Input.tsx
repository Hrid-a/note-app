import * as React from 'react';
import style from './Input.module.css'


function Input(props:React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={style.input} {...props} />;
}

export default Input;
