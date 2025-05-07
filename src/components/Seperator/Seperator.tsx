import * as React from 'react';
import style from './Seperator.module.css';
import clsx from 'clsx';

function Seperator() {
  return <span className={clsx(style.wrapper, style.horizontal)}></span>;
}

export default Seperator;
