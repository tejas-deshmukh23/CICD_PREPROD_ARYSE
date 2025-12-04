import ONDCRejectionPage from '@/component/Rysa/ONDC/LoadingPages/ONDCRejectionPage'
import React, {Suspense} from 'react'


const page = () => {
  return (
    <>
    <Suspense fallback={<></>}>
        <ONDCRejectionPage/>
    </Suspense>
    </>
  )
}

export default page