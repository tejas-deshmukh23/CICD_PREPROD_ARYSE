// // "use client";

// import React,{Suspense} from "react";
// // import NewPlPage from "../../components/Yubi/MandateCompleted";
// import SelfiePageNew from "../../component/Yubi/SelfiePageNew";
// import YubiSteps from "../../component/Yubi/YubiSteps";
// // import { useSearchParams } from "next/navigation";
// // import SuccessPage from "../../components/Yubi/SelfieSuccess";

// function Page({ params }) {
//   // const searchParams = useSearchParams();
//   // const step = searchParams.get("step");
//   // const clientLoanId = searchParams.get("client_loan_id");

//   return (
//     <div>
//       <Suspense fallback={<></>}>
//       {step === "step" ? (
//         <YubiSteps params={params} />
//       ) : step === "selfie" || clientLoanId ? (
//         // Pass the clientLoanId to SelfiePage if available
//         <SelfiePageNew clientLoanId={clientLoanId} />
//       ) : (
//         <NewPlPage params={params} searchParams={searchParams} />
//       )}
//       </Suspense>
//     </div>
//   );
// }

// export default Page;
