'use client'
import React from 'react'
import style from './page.module.css';
import ErrorList from '@/components/ErrorList';
import { useForm } from '@conform-to/react';
import { forgotPasswordSchema } from '@/actions/schema';
import { parseWithZod } from '@conform-to/zod';
import Input from '@/components/Input';
import Label from '@/components/Label';
import Button from '@/components/Button';
import VisuallyHidden from '@/components/VisuallyHidden';
import { forgotPassword } from '@/actions/forgot-password';




const ForgotPassword = () => {
    const [lastResult, forgotPasswordAction] = React.useActionState(forgotPassword, undefined);
    const [form, fields] = useForm({
        id:'forgotPassword-form',
        lastResult,
        onValidate({formData}){
            return  parseWithZod(formData, { schema: forgotPasswordSchema });
        },
        shouldRevalidate:'onInput'
    })

    return (
    <>
        <div>
            <h1 className={style.title}>Forgotten your password?</h1>
            <p className={style.subTitle} >Enter your Email below, and we will send you a reset link.</p>
        </div>
        <form onSubmit={form.onSubmit} id={form.id} action={forgotPasswordAction} className={style.form}  noValidate>
            <ErrorList errors={form.errors} id={form.errorId} ></ErrorList>
            <VisuallyHidden tabIndex={-1}>
                <Label>username</Label>
                <Input type='text' name='username' defaultValue=''></Input>
            </VisuallyHidden>
            <fieldset>
                <Label htmlFor={fields.email.id}> 
                    Email Address
                </Label>  
                <Input  required 
                        key={fields.email.key} 
                        autoFocus 
                        name={fields.email.name} 
                        type='email' 
                        id={fields.email.id}
                        defaultValue={fields.email.initialValue} 
                />
                <ErrorList errors={fields.email.errors} 
                    id={fields.email.errorId} >
                </ErrorList>
                
            </fieldset>
            <Button  type='submit' intent='primary' > Send a reset link </Button>
        </form>
    </>
  )
}

export default ForgotPassword