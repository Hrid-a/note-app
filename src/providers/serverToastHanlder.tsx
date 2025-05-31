import { cookies } from 'next/headers'
import React from 'react'
import ToastProvider from './ToastProvider';

async function ServerToastHanlder() {
    const cookieStore = await cookies();
    const toastCookie = cookieStore.get('n_toast');
    console.log('toastCookie', toastCookie);
    if(!toastCookie) return null;
    
    let toastData;
    try {
        toastData = JSON.parse(toastCookie.value);
        cookieStore.delete('n_toast');
    }
    catch  {
        toastData = { description: 'Something happened Please try again', type: 'error' };
        cookieStore.delete('n_toast');
    }

    return (
        <ToastProvider initialToast={toastData} />
    )
}

export default ServerToastHanlder