'use client';
import * as React from 'react';
import Button from '../Button';
import { Archive, Trash } from 'lucide-react';
import styles from './NoteActions.module.css';
import clsx from 'clsx';
import { handleNote } from '@/actions/handle-note';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { noteActionSchema } from '@/actions/schema';
import ErrorList from '../ErrorList';
import { useRouter } from 'next/navigation';

function NoteActions({ className, id }: { className?: string, id?: string }) {

  const router = useRouter();
  const [lastResult, action] = React.useActionState(handleNote, undefined);
  const [form, fields] = useForm({
    id: 'note-actions',
    lastResult,
    onValidate({formData}){
      return parseWithZod(formData, {
        schema: noteActionSchema
      })
    },

    defaultValue:{
      id
    }

  })

  React.useEffect(() => {
    if (lastResult?.status === 'success') {
      router.push('/notes');
      router.refresh();
    }
  }, [lastResult, router]);


  return <>

  <form key={form.key} id={form.id} onSubmit={form.onSubmit} action={action}  noValidate={form.noValidate} className={clsx(styles.actions, className)}>
      <ErrorList errors={form.errors} id={form.errorId} ></ErrorList>
        
        <input type='hidden' name={fields.id.name} id={fields.id.id} key={fields.id.key} defaultValue={fields.id.initialValue} />
        <Button type='submit' form={form.id} name='intent' value='archive' intent='bordered' className={clsx(styles.flex, styles.btn)}>
          <Archive  size={16} />
          <span>archive note</span>
        </Button>
        <Button type='submit' form={form.id} intent='bordered' className={clsx(styles.flex, styles.btn)}>
          <Trash  size={16} />
          <span>delete note</span>
          <input type='hidden' name='intent' value='delete' />
        </Button>
      </form>

      </>;
}

export default NoteActions;
