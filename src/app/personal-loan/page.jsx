'use client'
import React from 'react'
import { Outfit } from "next/font/google";
import PersonalDetailPage from "../../component/NewJourney/personalDetailePage";
import PersonalDetailPage2 from "../../component/NewJourney/personalDetailePage2";
import PersonalDetailPage3 from "../../component/NewJourney/personalDetailePage3";
import NewLandingPage from '@/component/NewJourney/newladingpage';
// import FirstPage from '@/component/NewJourney/firstpage';

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
function page() {
  // Dummy company object (तू backend मधून फक्त structure असाच ठेव)


  return (
    <div className={outfit.className}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
      
      {/* <PersonalDetailPage /> */}
      {/* <PersonalDetailPage2 /> */}
      {/* <PersonalDetailPage3 /> */}
      {/* <FirstPage/> */}
      <NewLandingPage/>
    </div>
  )
}
export default page