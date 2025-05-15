import clsx from 'clsx';
import * as React from 'react';
import styles from './SearchBar.module.css'
import Input from '../Input';


function SearchBar({className}:{className: string}) {
  return <div className={clsx(styles.wrapper, className)}>
    <Input type='text' />
  </div>;
}

export default SearchBar;
