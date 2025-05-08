'use client'
import React from 'react'
import Seperator from '@/components/Seperator'
import Link from 'next/link'
import style from './page.module.css';
import { login } from '@/actions/login';
import ErrorList from '@/components/ErrorList';
import { useForm } from '@conform-to/react';
import { loginSchema } from '@/actions/schema';
import { parseWithZod } from '@conform-to/zod';
import Input from '@/components/Input';
import Label from '@/components/Label';
import Button from '@/components/Button';
import VisuallyHidden from '@/components/VisuallyHidden';



const Login = () => {
    const [lastResult, loginAction, isPending] = React.useActionState(login, undefined);
    const [form, fields] = useForm({
        id:'login-form',
        lastResult,
        onValidate({formData}){
            return  parseWithZod(formData, { schema: loginSchema });
        },
        shouldValidate: 'onBlur',
        shouldRevalidate:'onInput'
    })

    return (
    <>
        <div>
            <h1 className={style.title}>Welcome to Note</h1>
            <p className={style.subTitle} >Please log in to continue</p>
        </div>
        <form onSubmit={form.onSubmit} id={form.id} action={loginAction} className={style.form}  noValidate>
            <ErrorList errors={form.errors} id={form.errorId} ></ErrorList>
            <VisuallyHidden tabIndex={-1}>
                <Label>username</Label>
                <Input type='text' name='username' defaultValue=''></Input>
            </VisuallyHidden>
            <fieldset>
                <Label htmlFor={fields.email.id}> 
                    Email Address
                </Label>  
                <Input autoFocus  required key={fields.email.key}  name={fields.email.name} type='email' id={fields.email.id} defaultValue={fields.email.initialValue} />
                <ErrorList errors={fields.email.errors} id={fields.email.errorId} ></ErrorList>
                
            </fieldset>
            <fieldset>
            <div className={style.flex}>
                <Label htmlFor={fields.password.id} > Password</Label>
                <Link className={style.link} href='/forgot-password'>Forgot</Link>
            </div>
            <Input required autoComplete='password' type='password' id={fields.password.id} name={fields.password.name} defaultValue={fields.password.initialValue} key={fields.password.key} />
            <ErrorList errors={fields.password.errors} id={fields.password.errorId} ></ErrorList>
            </fieldset>

            <Button type='submit' disabled={isPending ? true : false}> Login</Button>

        </form>
        <Seperator />
        {/* we could add the option to login with google */}
        <span className={style.text}>No account yet? <Link className={style.link} href='/signup'>Sign Up</Link></span>
    </>
  )
}

export default Login