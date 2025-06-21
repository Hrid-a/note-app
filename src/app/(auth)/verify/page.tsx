'use server';
import VerifyPage from '@/components/VerifyPage'
import { requireOnBoardingEmail } from '@/utils/auth.server'
import React from 'react'


async function  Verify(){
    const session = await requireOnBoardingEmail()
    console.log('Verify Page Loaded', {session})
    return <VerifyPage />
}

export default Verify