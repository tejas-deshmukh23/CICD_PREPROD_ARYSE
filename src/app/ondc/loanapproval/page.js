import React, {Suspense} from 'react'
import LoanApprovalPage from '../../../component/Rysa/ONDC/LoanApprovalPage'

const page = () => {
  return (
    // <div>page</div>
    <>
    <Suspense fallback={<div>Loading...</div>}>
    <LoanApprovalPage/>
    </Suspense>
    </>
  )
}

export default page