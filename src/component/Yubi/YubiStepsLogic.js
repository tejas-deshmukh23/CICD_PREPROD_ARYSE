// hooks/useYubiStepsLogic.js
"use client";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function useYubiStepsLogic(setStepText) {
  const searchParams = useSearchParams();
  const clientLoanId = searchParams.get("client_loan_id");

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

        localStorage.setItem("hdbClientLoanId", clientLoanId);

        setStepText("Verifying Details...");
        const reqIdResp = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}getRequestIdByClientLoanId`,
          { params: { clientLoanId } }
        );

        const requestId = reqIdResp.data?.obj;
        console.log("✅ requestId response:", requestId);

        if (reqIdResp.data.code === -1) {
          window.location.href = `/yubi/RejectionPage`;
          return;
        }

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

        if (retrieveResp.data.code === -1) {
          window.location.href = `/yubi/RejectionPage`;
          return;
        }

        setStepText("Analyzing Bank Statements...");
      } catch (err) {
        console.error("❌ Error in runSteps:", err);
        setStepText("Something Went Wrong.");
      }
    };

    if (clientLoanId) {
      runSteps();
    } else {
      setStepText("Missing Client Loan Id.");
    }
  }, [clientLoanId, setStepText]);
}
