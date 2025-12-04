'use client'
import React from 'react'
import { Roboto } from 'next/font/google';
import NewBlListPage from '../../component/Rysa/NewBlListPage';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});
function page() {
  // Dummy company object (तू backend मधून फक्त structure असाच ठेव)
  const companies = {
    lender_details: [
      {
        logo: "/HDBLogo.png",
        product: "Personal Loan",
        maxloanamount: "1,00,000",
        description: "Loan within 15 minutes more more lines add here because to see the how it look like good or bad",
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
    <div className={roboto.className}>
      <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          />
       <NewBlListPage
      companies={companies}
      getLoanBackendMethod={getLoanBackendMethod}
      redirectLinkMethod={redirectLinkMethod}
      mobileNumber={"9876543210"}
    />
      
    </div>
  )
}
export default page
