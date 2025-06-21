'use client';
import * as React from 'react';
import style from './ResetPassword.module.css';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { resetPasswordSchema } from '@/actions/schema';
import { resetPassword } from '@/actions/reset-password';
import ErrorList from '../ErrorList';
import VisuallyHidden from '../VisuallyHidden';
import Label from '../Label';
import Input from '../Input';
import Button from '../Button';

function ResetPassword() {
    const [lastResult, resetPasswordAction] = React.useActionState(resetPassword, undefined);
    const [form, fields] = useForm({
        id:'onboarding-form',
        lastResult,
        onValidate({formData}){
            return  parseWithZod(formData, { schema: resetPasswordSchema });
        },
        shouldRevalidate:'onInput'
    })

    return (
    <>
        <div>
            <h1 className={style.title}>Reset your password</h1>
            <p className={style.subTitle} >Choose a new password to secure your account</p>
        </div>
        <form onSubmit={form.onSubmit} id={form.id} action={resetPasswordAction} className={style.form}  noValidate>
            <ErrorList errors={form.errors} id={form.errorId} ></ErrorList>
            <VisuallyHidden tabIndex={-1}>
                <Label>username</Label>
                <Input type='text' name='username' defaultValue=''></Input>
            </VisuallyHidden>
            <fieldset>
                <Label htmlFor={fields.password.id}> 
                    New Password
                </Label>  
                <Input  required 
                        key={fields.password.key} 
                        autoFocus 
                        name={fields.password.name} 
                        type='password' 
                        id={fields.password.id}
                        defaultValue={fields.password.initialValue} 
                />
                <ErrorList errors={fields.password.errors} 
                    id={fields.password.errorId} >
                </ErrorList>
                
            </fieldset>
            <fieldset>
            <Label htmlFor={fields.confirmPassword.id} > Confirm New Password</Label>
            <Input required 
                    autoComplete='password' 
                    type='password' 
                    id={fields.confirmPassword.id} 
                    name={fields.confirmPassword.name} 
                    defaultValue={fields.confirmPassword.initialValue} 
                    key={fields.confirmPassword.key} 
            />
            <ErrorList errors={fields.confirmPassword.errors} id={fields.confirmPassword.errorId} ></ErrorList>
            </fieldset>
            
            <Button type='submit' intent='primary' > Reset Password</Button>

        </form>
    </>
  )
}

export default ResetPassword;
