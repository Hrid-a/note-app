import * as React from 'react';
import style from './EmailChanger.module.css';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import ErrorList from '../ErrorList';
import VisuallyHidden from '../VisuallyHidden';
import Label from '../Label';
import Input from '../Input';
import Button from '../Button';
import { changeEmailSchema } from '@/actions/schema';
import { changeEmail } from '@/actions/change-email';

function EmailChanger() {
    const [lastResult, changeEmailAction] = React.useActionState(changeEmail, undefined);
    const [form, fields] = useForm({
        id:'changeEmail-form',
        lastResult,
        onValidate({formData}){
            return  parseWithZod(formData, { schema: changeEmailSchema });
        },
        shouldRevalidate:'onInput'
    })

    return (
    <>
        <div>
            <h1 className={style.title}>Change Email</h1>
            <p className={style.subTitle} >Please enter your new email address</p>
        </div>
        <form onSubmit={form.onSubmit} id={form.id} action={changeEmailAction} className={style.form}  noValidate>
            <ErrorList errors={form.errors} id={form.errorId} ></ErrorList>
            <VisuallyHidden tabIndex={-1}>
                <Label>username</Label>
                <Input type='text' name='username' defaultValue=''></Input>
            </VisuallyHidden>
            <fieldset>
                <Label htmlFor={fields.email.id}> 
                    New Email
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
            <Button  type='submit' intent='primary' > Send Confirmation</Button>
        </form>
        </>
    );
}

export default EmailChanger;
