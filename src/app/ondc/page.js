import React, { Suspense } from 'react'
import Ondclist from "../../component/Rysa/ONDC/ondclist";
import { Outfit } from "next/font/google";
import DataLoadByUID from '@/component/Rysa/ONDC/LoadingPages/DataLoadByUID';

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const page = () => {
  return (
    // <Ondclist/>
    <div className={outfit.className}>
      {/* <Suspense fallback={<div>Loading...</div>}><Ondclist/></Suspense> */}
      <Suspense fallback={<></>}>
        <DataLoadByUID />
      </Suspense>
    </div>
  )
}

export default page