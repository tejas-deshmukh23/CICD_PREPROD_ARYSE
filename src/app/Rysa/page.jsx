'use client'
import React from 'react'
import { Roboto } from 'next/font/google';
import SinglePage from '../../component/Rysa/SinglePage';
// import LoanFrom from '../../component/Rysa/LoanFormPage.js';
import ThridPage from '../../component/Rysa/ThridPage.js';
import LoanRangePage from '../../component/Rysa/LoanRangePage.js';
import ReviewLoan from '../../component/Rysa/ReviewLoanPage.js';
// import BankDetailsPage from '../../component/Rysa/BankDetailsPage';
import NewBlListPage from '../../component/Rysa/NewBlListPage.js';
import LoginPage from '../../component/Rysa/LoginPage.js';
import RepaymentHistoryPage from '../../component/Rysa/RepaymentHistoryPage.js';
import LoanRequestPage from '../../component/Rysa/loanRequestPage.js';
import RepaymentPage from '../../component/Rysa/RepaymentPage.js';
import PreCloserPage from '../../component/Rysa/PreCloserPage.js';
import PartPaymentPage from '../../component/Rysa/PartPaymentPage.js';
import WaitingPage from '../../component/Rysa/WaitingPage.js';
import SubmitPage from '../../component/Rysa/SubmitPage.js';
import SubmitButtonPage from '../../component/Rysa/SubmitButton/submitButtonPage.js';
import IframePage from '../../component/Rysa/IframeScreen';
import RysaComingSoonPage from "../../component/Rysa/RysaComingSoPage";
// import NewBankD from '../../component/Rysa/Bank_Details.js';

import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
function page() {
  // Dummy company object (तू backend मधून फक्त structure असाच ठेव)
  const companies = {
    lender_details: [
      {
        logo: "/HDBLogo.png",
        product: "Personal Loan",
        maxloanamount: "1,00,000",
        description: "Loan within 15 minutes",
        interest: "Interest 3%",
        cpi: 1,
        applicationlink: "https://example.com/hdb",
        product_id: 101,
      },
      {
        logo: "/ondc-logo.png",
        product: "Instant Loan",
        maxloanamount: "1,00,000",
        description: "Loan within 15 minutes",
        interest: "Interest 3%",
        cpi: 0,
        applicationlink: "https://example.com/ondc",
        product_id: 102,
      },
    ]
  };

  // Dummy functions
  const getLoanBackendMethod = (e, product) => {
    console.log("Get Loan from Backend for product:", product);
  };

  const redirectLinkMethod = (product, link, product_id) => {
    console.log("Redirect to:", link);
    window.location.href = link;
  };
  return (
    <div className={outfit.className}>
      <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          />
      <SinglePage/>   
      {/* <LoanFrom />   */}
       {/* <NewBlListPage
      companies={companies}
      getLoanBackendMethod={getLoanBackendMethod}
      redirectLinkMethod={redirectLinkMethod}
      mobileNumber={"9876543210"}
    /> */}
      {/* <LoanRangePage/> */}
      {/* <ReviewLoan/> */}
      {/* <BankDetailsPage/> */}
      {/* <LoginPage/> */}
      {/* <RepaymentHistoryPage/> */}
      {/* <LoanRequestPage/> */}
      {/* <RepaymentPage/> */}
       {/* <PreCloserPage/> */}
       {/* <PartPaymentPage/> */}
       {/* <WaitingPage/>  */}
       {/* <SubmitPage/> */}
       {/* <SubmitButtonPage/> */}
       {/* <IframePage/> */}
       {/* <RysaComingSoonPage/> */}
    </div>
  )
}
export default page
// {/* <NewBankD/> */}
// {/* <ThridPage
//       companies={companies}
//       getLoanBackendMethod={getLoanBackendMethod}
//       redirectLinkMethod={redirectLinkMethod}
//       mobileNumber={"9876543210"}/> */}