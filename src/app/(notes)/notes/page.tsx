import styles from './notes.module.css';
import Button from '@/components/Button';
import { Plus } from 'lucide-react';
import Notes from '@/components/Notes';
import { getAllNotes } from '@/utils/queries.server';

async function page() {
  const notes = await getAllNotes({id: 'cmalhdv1l000legko9pj8bne0'});
  return (
    <div className={styles.wrapper}>
      <Button intent='primary' className={styles.flex}>
        <Plus />
        <span className={styles.btnText}>create new note</span>
      </Button>
      <Button intent='primary' className={styles.smallScreenBtn}>
        <Plus />
      </Button>

      <Notes notes={notes} />
    </div>
  )
}

export default page