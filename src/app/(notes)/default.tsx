import Button from '@/components/Button';
import { Plus } from 'lucide-react';
import Notes from '@/components/Notes';
import { getAllNotes } from '@/utils/queries.server';
import styles from './notes/notes.module.css';

async function defaultPage() {
  const notes = await getAllNotes({id: 'cmalhdv1l000legko9pj8bne0'});
  return (
    <div className={styles.wrapper}>
      <Button intent='primary' className={styles.flex}>
        <Plus />
        <span>create new note</span>
      </Button>
      <Button intent='primary' className={styles.smallScreenBtn}>
        <Plus />
      </Button>

      <Notes notes={notes} />
    </div>
  )
}

export default defaultPage