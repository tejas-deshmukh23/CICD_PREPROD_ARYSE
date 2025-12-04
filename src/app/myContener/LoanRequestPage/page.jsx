'use client'
import React, { Suspense } from 'react'
import { Roboto } from 'next/font/google';

import LoanRequestPage from '../../../component/Rysa/loanRequestPage.js';

// import NewBankD from '../../component/Rysa/Bank_Details.js';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});
function page() {

  return (
    <>
    <Suspense fallback={<></>}>
    <div className={roboto.className}>
      <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          />
      
      <LoanRequestPage/>
      
    </div>
    </Suspense>
    </>
  )
}
export default page
