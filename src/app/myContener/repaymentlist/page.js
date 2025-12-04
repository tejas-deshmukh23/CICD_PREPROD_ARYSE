import React, { Suspense } from 'react'
import RepaymentInstallment from '@/component/Rysa/RepaymentInstallments'

const page = () => {
  return (
    <>
    <Suspense fallback={<></>}>
    <RepaymentInstallment/>
    </Suspense>
    </>
  )
}

export default page