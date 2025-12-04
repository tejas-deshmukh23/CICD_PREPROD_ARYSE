// "use client"; 

import React,{Suspense} from "react";
// import FinalSanctionPage from "../../../components/Yubi/FinalLoanOffer";
import FinalLoanAmountNew from "../../../component/Yubi/MandateCompleted";
// import FinalLoanAmountNew from "../../../component/Yubi/RedirectingPageOnRysa";
// import { useSearchParams } from "next/navigation";

export default function Page({ params }) {
  // const searchParams = useSearchParams(); // ✅ Correct way!
  //   const step = searchParams.get("step");
  //   const clientLoanId = searchParams.get("client_loan_id");

  //   console.log("step:", step);
  //   console.log("clientLoanId:", clientLoanId);

  return (
  
      <Suspense fallback={<></>}>
          <div>
      <FinalLoanAmountNew params={params} />
      </div>
      </Suspense>
  );
}
