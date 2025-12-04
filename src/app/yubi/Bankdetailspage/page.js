// "use client"; 

import React,{Suspense} from "react";
import BankDetails from "../../../component/Yubi/BankDetailsNew";
// import { useSearchParams } from "next/navigation";

export default function Page({ params }) {
  // const searchParams = useSearchParams(); // ✅ Correct way!
  // const step = searchParams.get("step");
  // const clientLoanId = searchParams.get("client_loan_id");

  // console.log("step:", step);
  // console.log("clientLoanId:", clientLoanId);

  return (
   
      <Suspense fallback={<></>}>
         <div>
      <BankDetails  />
      </div>
      </Suspense>
  );
}
