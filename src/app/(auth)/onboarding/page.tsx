import OnBoarding from '@/components/OnBoarding'
import { requireOnBoardingEmail } from '@/utils/auth.server'
import React from 'react'

async function onBoardingPage() {
  const email = await requireOnBoardingEmail()
  return (
    <OnBoarding email={email} />
  )
}

export default onBoardingPage