"use client";
import React, { useEffect, useRef } from "react";
import axios from "axios";
import { Roboto } from "next/font/google";
import "./WaitingPageLoanAgreement.css";
import CallbackListener from "../CallbackListener";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const WaitingPageLoanAgreement = () => {
  const clientLoanId = localStorage.getItem("clientLoanId");
  const hasCalledApi = useRef(false);

  useEffect(() => {
    if (!clientLoanId) {
      console.error("❌ Client Loan ID not found in localStorage");
      return;
    }

    if (hasCalledApi.current) {
      console.log("⚠️ Skipping duplicate API call");
      return;
    }
    hasCalledApi.current = true;

    const docType = localStorage.getItem("documentTypeStatus");
    if (docType === "kfs_doc") {
      const callLoanAgreementAPI = async () => {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}generateLoanAgreementDocument`,
            { clientLoanId }
          );

          console.log("✅ Loan Agreement API called:", res.data);
          if (res.data.code === -1) {
            window.location.href = `/yubi/RejectionPage`;
            return;
          }
        } catch (err) {
          console.error("❌ Loan Agreement API error:", err);
        }
      };
      callLoanAgreementAPI();
    }
  }, [clientLoanId]);

  return (
    <div className={`${roboto.className} waiting-container`}>
      <div className="loading-circle">
        <svg className="hourglass-icon" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z"
            fill="#6039D2"
            stroke="#6039D2"
            strokeWidth="2.5"
          />
        </svg>
      </div>
      <div className="waiting-text">
        <b>Generating final offer...</b>
      </div>
      {/* ✅ Plug in the CallbackListener to listen for loan_agreement_doc */}
      <CallbackListener
        onEsignReady={async () => {
          console.log("✅ Loan Agreement doc generated webhook received!");

          try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}requestEsign`, {
              clientLoanId,
              // email: "user@example.com",
              // phone: "9999999999",
              // firstName: "John",
              // lastName: "Doe",
            });
            console.log("✅ eSign API Response:", res.data);

            if (res.data.code === -1) {
              window.location.href = `/yubi/RejectionPage`;
              return;
            }

            const redirectUrl = res.data?.obj;
            if (redirectUrl) {
              window.location.href = redirectUrl;
            }
          } catch (err) {
            console.error("❌ eSign API error:", err);
          }
        }}
      />
    </div>
  );
};

export default WaitingPageLoanAgreement;
