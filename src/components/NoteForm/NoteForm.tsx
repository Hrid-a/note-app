'use client';
import * as React from 'react';
import NoteHeader from '../NoteHeader';
import Input from '../Input';
import Button from '../Button';
import styles from './NoteForm.module.css';
import { updateNote } from '@/actions/update-note';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { noteSchema } from '@/actions/schema';
import ErrorList from '../ErrorList';
import LinkBtn from '../LinkBtn';
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import NoteActions from '../NoteActions';

function NoteForm({id, title, content, updatedAt}:{id:string, title:string, content:string, updatedAt:Date}) {
  
  const [lastResult, action] = React.useActionState(updateNote, undefined);
  console.log({lastResult});
    const [form, fields] = useForm({
      id: 'note-form-updater',
      lastResult,
      onValidate({formData}){
        return parseWithZod(formData, {schema: noteSchema})
      },
      shouldRevalidate: 'onBlur',
      shouldValidate: 'onInput',
      defaultValue:{
        title,
        content
      }
    })
  
  return <>
  <div className={clsx(styles.flex, styles.mobileActions)}>
          <LinkBtn href='/notes' className={clsx(styles.flex, styles.text, styles.grow )}>
            <ChevronRight />
            <span>go back</span>
          </LinkBtn>

          <NoteActions id={id} className={styles.auto} />
          <Button form={form.id} type='reset' className={styles.text}>
            cancel
          </Button>

          <Button form={form.id} type='submit' className={styles.primary}>
            save note
          </Button>
        </div>
    <form onSubmit={form.onSubmit} id={form.id} action={action} noValidate={form.noValidate} className={styles.note}>
        <NoteHeader  date={updatedAt} >
          <Input name={fields.title.name}  key={fields.title.key} required type='text' className={styles.title} defaultValue={typeof fields.title?.initialValue === 'string' ? fields.title.initialValue : title} id={fields.title.id} />
          <ErrorList errors={fields.title.errors} id={fields.title.errorId} ></ErrorList>
        </NoteHeader>
          <textarea name={fields.content.name} key={fields.content.key} required className={styles.content} defaultValue={typeof fields.content?.initialValue === 'string' ? fields.content.initialValue : content} id={fields.content.id} >
          </textarea>
          <ErrorList errors={fields.content.errors} id={fields.content.errorId} ></ErrorList>
          <input type='hidden' name='id' value={id} />
        </form>
        <ErrorList errors={form.errors} id={form.errorId} ></ErrorList>
        <div className={styles.noteActions}>
          <Button form={form.id}  type='submit' intent='primary'>save note</Button>
          <Button form={form.id} type='reset' intent='secondary' >cancel</Button>
        </div>
  </>;
}

export default NoteForm;
