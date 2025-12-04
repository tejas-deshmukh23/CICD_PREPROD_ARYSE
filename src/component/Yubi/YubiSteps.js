// "use client";
// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import axios from "axios";

// const YubiSteps = () => {
//   const [stepText, setStepText] = useState("Starting process...");
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const clientLoanId = searchParams.get("client_loan_id");
//   //   const requestId = searchParams.get("request_id");

//   useEffect(() => {
//     const runSteps = async () => {
//       try {
//         setStepText("Getting request ID...");
//         const reqIdResp = await axios.get(
//           `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}getRequestIdByClientLoanId`,
//           { params: { clientLoanId } }
//         );

//         const requestId = reqIdResp.data?.obj;
//         if (!requestId) {
//           setStepText("Invalid request ID.");
//           return;
//         }

//         setStepText("Retrieving report...");
//         await axios.post(
//           `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}retrieveReport`,
//           { clientLoanId, requestId }
//         );

//         setStepText("Initiating KYC...");
//         const kycResponse = await axios.post(
//           `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}initiateKYC`,
//           { clientLoanId }
//         );

//         const kycRedirectUrl = kycResponse.data?.obj;
//         if (kycRedirectUrl) {
//           setStepText("Redirecting to KYC...");
//           window.location.href = kycRedirectUrl;
//         } else {
//           setStepText("KYC initiation failed.");
//         }
//       } catch (err) {
//         console.error("Error in steps:", err);
//         setStepText("Something went wrong.");
//       }
//     };

//     if (clientLoanId) {
//       runSteps();
//     } else {
//       setStepText("Missing client loan ID.");
//     }
//   }, [clientLoanId]);

//   return (
//     <div style={{ padding: "2rem", textAlign: "center" }}>
//       <h2>Processing Your Application</h2>
//       <p>{stepText}</p>
//     </div>
//   );
// };

// export default YubiSteps;

"use client";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import CallbackListener from "../CallbackListener";
import StickyWarning from "../../component/Yubi/StickyWarning";

const YubiSteps = () => {
  const [stepText, setStepText] = useState("Starting process...");
  const searchParams = useSearchParams();

  const clientLoanId = searchParams.get("client_loan_id");

  // 🟢 This ref protects against duplicate API hits
  const isRunning = useRef(false);

  useEffect(() => {
    const runSteps = async () => {
      if (isRunning.current) {
        console.warn("⚠️ runSteps already running, skipping duplicate call");
        return;
      }
      isRunning.current = true;

      try {
        console.log("✅ runSteps started for clientLoanId:", clientLoanId);

        // Save for WS listener to use
        localStorage.setItem("hdbClientLoanId", clientLoanId);

        setStepText("Verifying Details...");
        const reqIdResp = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}getRequestIdByClientLoanId`,
          { params: { clientLoanId } }
        );

        const requestId = reqIdResp.data?.obj;
        console.log("✅ requestId response:", requestId);

        if (!requestId) {
          setStepText("Invalid request ID.");
          return;
        }

        setStepText("Analyzing Bank Statements...");
        const retrieveResp = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}retrieveReport`,
          { clientLoanId, requestId }
        );
        console.log("✅ retrieveReport response:", retrieveResp.data);

        // 🟢 Do NOT manually wait for localStorage value — let CallbackListener handle it.
        setStepText("Analyzing Bank Statements...");
      } catch (err) {
        console.error("❌ Error in runSteps:", err);
        setStepText("Something went wrong.");
      }
    };

    if (clientLoanId) {
      runSteps();
    } else {
      setStepText("Missing client loan ID.");
    }
  }, [clientLoanId]);

  return (
    <>
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <CallbackListener />
      <h2>Processing Your Application</h2>
      <p>{stepText}</p>
    </div>
     <StickyWarning />
    </>
  );
};

export default YubiSteps;
