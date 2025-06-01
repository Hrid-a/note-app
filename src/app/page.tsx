import Link from "next/link";
import styles from './page.module.css';

export default async function Home() {

  // TODO: manage inactive user sessions (check if there is a session(userid) but not a user, remove cookie)
  return ( 
    <div className={styles.wrapper}>
      this should contain the profile only and notes llink
      <Link href={`/notes`}  className={styles.link}>all Notes</Link>

  </div>
  );
}
