import React from 'react'
// import FivePage from "../../../component/Rysa/ONDC/FivePage";
import ReviewLoanPage from '@/component/Rysa/ONDC/ReviewLoanPage';
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const page = () => {
  return (
    <>
        {/* <FivePage/> */}
        <div className={outfit.className}>
        <ReviewLoanPage/>
        </div>
    </>
  )
}

export default page