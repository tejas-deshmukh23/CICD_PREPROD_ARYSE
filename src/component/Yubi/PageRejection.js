"use client";
import React, { useEffect, useState } from "react";
import styles from "./SubmitPage.module.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function RejectPage() {
  const [refNo, setRefNo] = useState("");
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [tenure, setTenure] = useState("");
  const [interestRate, setInterestRate] = useState("");
  
  const handleNextClick = () => {
    window.location.href = "https://app.credithaat.com/RejectionPage";
  };

  return (
    <div className={styles.container}>
      <div className="mb-8">
        <svg className="w-20 h-20" viewBox="0 0 52 52">
          <circle
            cx="26"
            cy="26"
            r="25"
            fill="none"
            stroke="#DC2626"
            strokeWidth="2"
          />
          <path
            fill="none"
            stroke="#DC2626"
            strokeWidth="3"
            strokeLinecap="round"
            d="M16 16l20 20M36 16l-20 20"
          />
        </svg>
      </div>
      <div className={`${roboto.className}`}>
        <h1 style={{ fontSize: "16px", fontWeight: "600" }}>
          We&apos;re Sorry!
        </h1>

        <p style={{ fontSize: "16px", fontWeight: "600" }}>
          Your loan application could not be approved.
        </p>
        <br></br>

        <p style={{ fontSize: "16px" }}>
          But don&apos;t worry — you can still explore offers from other trusted
          lenders!
        </p>

        {/* Next Button */}
        <div
          style={{
            position: "fixed",
            bottom: "0",
            left: "0",
            right: "0",
            padding: "40px",
            paddingTop: "20px",
            paddingBottom: "20px",
            backgroundColor: "white",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <button
            onClick={handleNextClick}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#6039D2",
              color: "white",
              border: "none",
              borderRadius: "15px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
