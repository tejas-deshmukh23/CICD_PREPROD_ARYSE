import React, { Suspense } from 'react'
import Bankdetails from '../../../component/Rysa/ONDC/BankDetails'

const page = () => {
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
        <Bankdetails/>
    </Suspense>
    </>
  )
}

export default page