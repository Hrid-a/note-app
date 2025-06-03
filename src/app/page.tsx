import styles from './page.module.css';
import DesktopSideBar from "@/components/DesktopSideBar";
import { getUser } from '@/utils/queries.server';
import UserCard from '@/components/UserCard';
import { requireUser } from '@/utils/auth.server';

export default async function Home() {
  const user = await requireUser();
  const data = await getUser({id: user?.id})
  if(!data) return null;

  return ( 
    <div className={styles.wrapper}>
      <DesktopSideBar />
      <div className={styles.content}>
        <UserCard user={{...data, createdAt: data.createdAt.toISOString()}} />
      </div>
  </div>
  );
}
