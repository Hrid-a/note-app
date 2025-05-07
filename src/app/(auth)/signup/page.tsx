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




const Login = () => {
    const [lastResult, loginAction, isPending] = React.useActionState(signup, undefined);
    const [form, fields] = useForm({
        id:'signup-form',
        lastResult,
        onValidate({formData}){
            return  parseWithZod(formData, { schema: signUpSchema });
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
            <fieldset>
                <Label htmlFor={fields.email.id}> 
                    Email Address
                </Label>  
                <Input  required key={fields.email.key}  name={fields.email.name} type='email' id={fields.email.id} defaultValue={fields.email.initialValue} />
                <ErrorList errors={fields.email.errors} id={fields.email.errorId} ></ErrorList>
                
            </fieldset>
            <fieldset>
            <Label htmlFor={fields.password.id} > Password</Label>
            <Input required  type='password' id={fields.password.id} name={fields.password.name} defaultValue={fields.password.initialValue} key={fields.password.key} />
            <ErrorList errors={fields.password.errors} id={fields.password.errorId} ></ErrorList>
            </fieldset>

            <Button  type='submit' disabled={isPending ? true : false}> Sign up</Button>

        </form>
        <Seperator />
        {/* we could add the option to login with google */}
        <span className={style.text}>Already have an account? <Link className={style.link} href='/login'>Login</Link></span>
    </>
  )
}

export default Login