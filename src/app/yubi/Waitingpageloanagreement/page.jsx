// "use client"; 

import React,{Suspense} from "react";
// import WaitingPageLoanAgreement from "../../../components/Yubi/WaitingPageLoanAgreement";
import KfsCompleted from "../../../component/Yubi/KfsCompleted";
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
      <KfsCompleted params={params} />
    </div>
    </Suspense>
  );
}
