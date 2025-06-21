'use client'
import React from 'react'
import Seperator from '@/components/Seperator'
import Link from 'next/link'
import style from './page.module.css';
import ErrorList from '@/components/ErrorList';
import { useForm } from '@conform-to/react';
import { signUpSchema } from '@/actions/schema';
import { parseWithZod } from '@conform-to/zod';
import Input from '@/components/Input';
import { signup } from '@/actions/signup';
import Label from '@/components/Label';
import Button from '@/components/Button';
import VisuallyHidden from '@/components/VisuallyHidden';




const SignUp = () => {
    const [lastResult, signupAction] = React.useActionState(signup, undefined);
    const [form, fields] = useForm({
        id:'signup-form',
        lastResult,
        onValidate({formData}){
            return  parseWithZod(formData, { schema: signUpSchema });
        },
        shouldRevalidate:'onInput'
    })

    return (
    <>
        <div>
            <h1 className={style.title}>Welcome to Note</h1>
            <p className={style.subTitle} >Please Sign up</p>
        </div>
        <form onSubmit={form.onSubmit} id={form.id} action={signupAction} className={style.form}  noValidate>
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
            <Button  type='submit' intent='primary' > Sign up</Button>
        </form>
        <Seperator />
        {/* we could add the option to login with google */}
        <span className={style.text}>Already have an account? <Link className={style.link} href='/login'>Login</Link></span>
    </>
  )
}

export default SignUp