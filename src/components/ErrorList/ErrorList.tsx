import * as React from 'react';
import styles from './ErrorList.module.css'


function ErrorList({errors, id}:{errors?:string[] | null, id?:string}) {
  const errorsToRender = errors?.filter(Boolean)
	if (!errorsToRender?.length) return null
  return <ul id={id} className={styles.wrapper}>
    {
      errorsToRender.map((error:string) => {
        return (
          <li key={error} className={styles.error} >{error}</li>
        )
      })
    }
  </ul>;
}

export default ErrorList;
