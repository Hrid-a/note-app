'use client'
import { verifactionSchema } from '@/actions/schema';
import { verify } from '@/actions/verify-email';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import ErrorList from '../ErrorList';
import VisuallyHidden from '../VisuallyHidden';
import Label from '../Label';
import Input from '../Input';
import Button from '../Button';
import style from './VerifyPage.module.css';

function VerifyPage() {
    const searchParams = useSearchParams()
    const [lastResult, verifyEmail] = React.useActionState(verify, undefined);
    const [form, fields] = useForm({
        id:'verifaction-form',
        lastResult,
        onValidate({formData}){
            return  parseWithZod(formData, { schema: verifactionSchema });
        },
        defaultValue:{
          target: searchParams.get('target') ?? '' ,
          type: searchParams.get('type') ?? '',
          code:searchParams.get('code') ?? ''
        },
        shouldRevalidate:'onInput'
    })

    console.log('form page loaded successfully', form.id);

    return (
    <>
        <div>
            <h1 className={style.title}>Verify Your Email</h1>
            <p className={style.subTitle} >Please check your email</p>
        </div>
        <form onSubmit={form.onSubmit} id={form.id} action={verifyEmail} className={style.form}  noValidate>
            <ErrorList errors={form.errors} id={form.errorId} ></ErrorList>
            <VisuallyHidden tabIndex={-1}>
                <Label>username</Label>
                <Input type='text' name='username' defaultValue=''></Input>
                <Input  required 
                        key={fields.target.key} 
                        autoFocus 
                        name={fields.target.name} 
                        type='text' 
                        id={fields.target.id}
                        defaultValue={fields.target.initialValue} 
                />
                <Input  required 
                        key={fields.type.key} 
                        autoFocus 
                        name={fields.type.name} 
                        type='text' 
                        id={fields.type.id}
                        defaultValue={fields.type.initialValue} 
                />
            </VisuallyHidden>
            <fieldset>
                <Label htmlFor={fields.code.id}> Code</Label>  
                <Input  required 
                        key={fields.code.key} 
                        autoFocus 
                        name={fields.code.name} 
                        type='text' 
                        id={fields.code.id}
                        defaultValue={fields.code.initialValue} 
                />
                <ErrorList errors={fields.code.errors} 
                    id={fields.code.errorId} >
                </ErrorList>
                
            </fieldset>
            <Button  type='submit' intent='primary' > Submit</Button>
        </form>
    </>
  )
}

export default VerifyPage;
