import React, {Suspense} from 'react'
import LoanApprovalPageDataLoad from "@/component/Rysa/ONDC/LoadingPages/LoanApprovalPageDataLoad";

const page = () => {
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
    <LoanApprovalPageDataLoad/>
    </Suspense>
    </>
  )
}

export default page