"use client";
import React from "react";
import "./WaitingPage.css";
import { Roboto } from "next/font/google";
import StickyWarning from "../../component/Yubi/StickyWarning";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const WaitingPageAfterMandate = () => {
  return (
    <>
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
        <h1 style={{ fontSize: "22px", color: "#777777", textAlign: "center" }}>
          <b>Completing process...</b>
        </h1>
      </div>
      <StickyWarning />
    </>
  );
};

export default WaitingPageAfterMandate;
