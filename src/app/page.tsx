import Link from "next/link";
import styles from './page.module.css';

export default async function Home() {


  return ( 
    <div className={styles.wrapper}>
      this should contain the profile only and notes llink
      <Link href={`/notes`}  className={styles.link}>all Notes</Link>

  </div>
  );
}
