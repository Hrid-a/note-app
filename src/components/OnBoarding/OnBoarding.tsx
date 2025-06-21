'use client'
import React from 'react'
import Seperator from '@/components/Seperator'
import Link from 'next/link'
import ErrorList from '@/components/ErrorList';
import { useForm } from '@conform-to/react';
import { onBoardingSchema } from '@/actions/schema';
import { parseWithZod } from '@conform-to/zod';
import Input from '@/components/Input';
import Label from '@/components/Label';
import Button from '@/components/Button';
import VisuallyHidden from '@/components/VisuallyHidden';
import { completeSignUp } from '@/actions/onBoarding';
import style from './OnBoarding.module.css'




const OnBoarding = ({email}:{email:string}) => {
    const [lastResult, onBoardingAction] = React.useActionState(completeSignUp, undefined);
    const [form, fields] = useForm({
        id:'onboarding-form',
        lastResult,
        onValidate({formData}){
            return  parseWithZod(formData, { schema: onBoardingSchema });
        },
        shouldRevalidate:'onInput'
    })

    return (
    <>
        <div>
            <h1 className={style.title}>Welcome aboard {email}</h1>
            <p className={style.subTitle} >Please enter your details</p>
        </div>
        <form onSubmit={form.onSubmit} id={form.id} action={onBoardingAction} className={style.form}  noValidate>
            <ErrorList errors={form.errors} id={form.errorId} ></ErrorList>
            <VisuallyHidden tabIndex={-1}>
                <Label>username</Label>
                <Input type='text' name='username' defaultValue=''></Input>
            </VisuallyHidden>
            <fieldset>
                <Label htmlFor={fields.name.id}> 
                    Name
                </Label>  
                <Input  required 
                        key={fields.name.key} 
                        autoFocus 
                        name={fields.name.name} 
                        type='text' 
                        id={fields.name.id}
                        defaultValue={fields.name.initialValue} 
                />
                <ErrorList errors={fields.name.errors} 
                    id={fields.name.errorId} >
                </ErrorList>
                
            </fieldset>
            <fieldset>
            <Label htmlFor={fields.password.id} > Password</Label>
            <Input required 
                    autoComplete='password' 
                    type='password' 
                    id={fields.password.id} 
                    name={fields.password.name} 
                    defaultValue={fields.password.initialValue} 
                    key={fields.password.key} 
            />
            <ErrorList errors={fields.password.errors} id={fields.password.errorId} ></ErrorList>
            </fieldset>
            <fieldset>
            <Label htmlFor={fields.password.id} > Password</Label>
            <Input required 
                    type='password' 
                    id={fields.confirmPassword.id} 
                    name={fields.confirmPassword.name} 
                    defaultValue={fields.confirmPassword.initialValue} 
                    key={fields.confirmPassword.key} 
            />
            <ErrorList errors={fields.confirmPassword.errors} id={fields.confirmPassword.errorId} ></ErrorList>
            </fieldset>

            <Button  type='submit' intent='primary' > Sign up</Button>

        </form>
        <Seperator />
        {/* we could add the option to login with google */}
        <span className={style.text}>Already have an account? <Link className={style.link} href='/login'>Login</Link></span>
    </>
  )
}

export default OnBoarding