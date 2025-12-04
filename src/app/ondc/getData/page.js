import DataLoadByUID from '@/component/Rysa/ONDC/LoadingPages/DataLoadByUID';
import React, { Suspense } from 'react';

const page = () => {
  return (
    <>
    <Suspense fallback={<></>}>
        <DataLoadByUID/>
    </Suspense>
    </>
  )
}

export default page