'use client'
import React from 'react'
import { Roboto } from 'next/font/google';
import AnimationLoadingPage from "../../component/NewJourney/AnimationLoadingpage";
import AnimationLoadingPage2 from "../../component/NewJourney/AnimationLoadingpage2";
import AnimationHatting from "../../component/NewJourney/AnimationHittingApi";
import LastPageAnimation from "../../component/NewJourney/lastAnimatinpage";
import NewLastpageAnimation from "../../component/NewJourney/lastAnimatinpagenew";
import RejectionAnimationPage from "@/component/NewJourney/AnimatedRejectionPage";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
function page() { 
  return (
    <div className={outfit.className}>
      <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          />
  
      {/* <AnimationLoadingPage/> */}
      <AnimationLoadingPage2/>
      {/* <AnimationHatting/> */}
      {/* <LastPageAnimation/> */}
      {/* <NewLastpageAnimation/> */}
      {/* <RejectionAnimationPage/> */}
    </div>
  )
}
export default page;
