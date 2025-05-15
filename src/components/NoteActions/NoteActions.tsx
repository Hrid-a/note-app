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

function NoteActions({ className, id }: { className?: string, id?: string }) {

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


  return <>
  <form onSubmit={form.onSubmit} action={action} id={form.id} noValidate={form.noValidate} className={clsx(styles.actions, className)}>
        <input type='hidden' name={fields.id.name} id={fields.id.id} key={fields.id.key} defaultValue={fields.id.initialValue} />
        <Button intent='bordered' name='intent' value='archive' className={clsx(styles.flex, styles.btn)}>
          <Archive  size={20} />
          <span>archive note</span>
        </Button>
        <Button name='intent' value='delete' intent='bordered' className={clsx(styles.flex, styles.btn)}>
          <Trash  size={20} />
          <span>delete note</span>
          </Button>
      </form>
      </>;
}

export default NoteActions;
