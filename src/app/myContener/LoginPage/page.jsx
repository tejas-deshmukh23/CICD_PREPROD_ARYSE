'use client'
import React from 'react'
import { Roboto } from 'next/font/google';

import LoginPage from '../../../component/Rysa/LoginPage.js';

// import NewBankD from '../../component/Rysa/Bank_Details.js';

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
      
      
      <LoginPage/>
      
    </div>
  )
}
export default page
