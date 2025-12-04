"use client";
import React, { useState, useEffect } from "react";
import "./VerifiedSelfie.css";
import { Roboto } from "next/font/google";
import NewBankD from "./BankDetailsNew";
import { useRouter, useSearchParams } from "next/navigation";
import StickyWarning from "../../component/Yubi/StickyWarning";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const VerifiedSelfie = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientLoanId = searchParams.get("client_loan_id");
  const [activeContainer, setActiveContainer] = useState("SelfieSuccess");

  const handleNext = () => {
    console.log("Next button clicked");
    setActiveContainer("BankDetails");
  };
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.push(`/yubi/Loanapprovalpage?client_loan_id=${clientLoanId}`);
  //   }, 2000);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (clientLoanId) {
        router.push(`/yubi/Loanapprovalpage?client_loan_id=${clientLoanId}`);
      } else {
        console.error("No clientLoanId found in URL!");
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [clientLoanId, router]);

  return (
    <>
      {activeContainer === "BankDetails" && <NewBankD />}
      {activeContainer === "SelfieSuccess" && (
        <div className={`${roboto.className} waiting-table`}>
          {/* Updated Success Checkmark with KFS styling */}
          <div className="professional-checkmark-container">
            <div className="status-icon status-completed">✓</div>
          </div>

          <br />

          <div className="loading-text" style={{ textAlign: "center" }}>
            <h1
              style={{
                fontSize: "22px",
                color: "#777777",
                textAlign: "center",
              }}
            >
              <b>Successfully Verified Selfie</b>
            </h1>
          </div>
        </div>
      )}
      <StickyWarning />
    </>
  );
};

export default VerifiedSelfie;
