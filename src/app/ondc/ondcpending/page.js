import ONDCPendingPage from '@/component/Rysa/ONDC/LoadingPages/ONDCpendingPage'
import React, {Suspense} from 'react'


const page = () => {
  return (
    <>
    <Suspense fallback={<></>}>
        <ONDCPendingPage/>
    </Suspense>
    </>
  )
}

export default page