// SelfieVerifying.jsx
"use client";
import React from "react";
import "./SelfieVerifying.css";
import Verifyingimage from "./newplimages/Verifyingimage.png";
import logo from "./newplimages/logo.png";
import Image from "next/image";
import { Roboto } from "@next/font/google";
import "./Mandate.css";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const SelfieVerifying = () => {
  return (
    <div className={`${roboto.className} verification-container`} style={{backgroundColor:"#f7f6fd"}}>
      <div className="verification-content">
       

        <div className="verification-text">
          <span className="verification-message">Verifying your selfie</span>
          <span className="dots">.....</span>
        </div>

        <div className="illustration-wrapper">
          <Image 
            src={Verifyingimage} 
            alt="Verification Illustration" 
            className="verification-illustration"
            height={500}
            width={500}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default SelfieVerifying;