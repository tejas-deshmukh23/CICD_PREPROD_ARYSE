'use client'
import React from 'react'
import { Roboto } from 'next/font/google';
import RysaForm2 from '../../component/Rysa/rysaform/RysaNewPage2';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
}); 
function page() {
  // Dummy company object (तू backend मधून फक्त structure असाच ठेव)
 
  return (
    <div className={roboto.className}>
      <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          />
  
      <RysaForm2 />
    </div>
  )
}
export default page
