"use client";
import React, { useEffect, useState } from "react";
import "./rejectionpage.css";
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
    window.location.href = "https://app.credithaat.com";
  };

  return (
    <div className="container">
     {/* Updated Cross Mark with KFS styling */}
          <div className="professional-checkmark-container">
            <div className="status-icon status-failed">✕</div>
          </div>

      <div className={`${roboto.className}`}>
        <h1 className="title">
          We&apos;re Sorry!
        </h1>

        <p className="message" style={{ fontWeight: "600" }}>
          Your loan application could not be approved.
        </p>
        
        <br />

        <p className="message">
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
            Check Offers
          </button>
        </div>
      </div>
    </div>
  );
}