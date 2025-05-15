import { prisma } from "@/utils/db.server";
import Link from "next/link";
import styles from './page.module.css';

export default async function Home() {

  const notes = await prisma.note.findMany({
    where:{ownerId:'cmalhdv1l000legko9pj8bne0'},
    select:{
        id: true,
        title: true,
        content: true,
        createdAt: true,
    }
})
  return ( 
    <div className={styles.wrapper}>
      this should contain the profile only and notes llink
      <Link href={`/notes`}  className={styles.link}>all Notes</Link>
    {
      notes.map(({id, title, createdAt})=> (
        <Link href={`/${id}`} key={id} className={styles.link}>
          <span>{title}</span>
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </Link>
      ))
    }
  </div>
  );
}
