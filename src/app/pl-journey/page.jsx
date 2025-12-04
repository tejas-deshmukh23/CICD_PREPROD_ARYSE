'use client'
import React from 'react'
import { Roboto } from 'next/font/google';
import RysaForm1 from '../../component/Rysa/rysaform/RysaNewPage';
import PlOTPBottomSheet from '@/component/Rysa/rysaform/NewPlOtpBottomSheet/PlOTPBottomSheet';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});
function page() { 
  return (
    <div className={roboto.className}>
      <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          />
  
      <RysaForm1 />
      {/* <PlOTPBottomSheet/> */}
    </div>
  )
}
export default page
