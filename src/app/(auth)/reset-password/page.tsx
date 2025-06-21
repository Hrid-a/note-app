import ResetPassword from '@/components/ResetPassword'
import { requireOnBoardingEmail } from '@/utils/auth.server'
import React from 'react'

async function ResetPasswordPage() {
    await requireOnBoardingEmail()
  return (
    <ResetPassword />
  )
}

export default ResetPasswordPage