import React,{Suspense} from 'react'
// import NewRejectionPage from "@/component/Yubi/newrejectionpage"
import RejectionPage from '@/component/Rysa/ONDC/LoadingPages/rejectionpage'
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const page = () => {
  return (
    <>
    <div className={outfit.className}>
    <Suspense fallback={<></>}>
       <RejectionPage/> 
       </Suspense>
       </div>
    </>
  )
}

export default page