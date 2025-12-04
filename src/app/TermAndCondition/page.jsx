'use client'
import React from 'react'
import { Roboto } from 'next/font/google';
import TermAndCondition from '../../component/Rysa/TermAndConditionPage';
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// const roboto = Roboto({
//   weight: ['400', '700'],
//   subsets: ['latin'],
//   display: 'swap',
// });
function page() { 
  return (
    <div className={outfit.className}>
      <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          />
  
      <TermAndCondition />
      
    </div>
  )
}
export default page
