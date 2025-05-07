import * as React from 'react';
import styles from './ErrorList.module.css'


function ErrorList({errors, id}:{errors?:string[] | null, id?:string}) {
  return <ul id={id} className={styles.wrapper}>
    {
      errors?.length ?
      errors.map((error:string) => {
        return (
          <li key={error} className={styles.error} >{error}</li>
        )
      })
      : null
    }
  </ul>;
}

export default ErrorList;
