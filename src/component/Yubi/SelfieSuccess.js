"use client";
import React, { useState, useEffect } from "react";
import "./SelfieSuccess.css";
import "./CardBorder.css";
import Successimage from "./newplimages/Successimage.png";
import Image from "next/image";
import styles from "./NewPlFirstPage.module.css";
import { Roboto } from "@next/font/google";
import HDBNavBar from "./HdbNavBar/HDBNavBar";
import NewBankD from "./BankDetails";
import { useRouter, useSearchParams } from "next/navigation";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const SelfieSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientLoanId = searchParams.get("client_loan_id");
  const [activeContainer, setActiveContainer] = useState("SelfieSuccess");

  const handleNext = () => {
    console.log("Next button clicked");
    setActiveContainer("BankDetails");
  };

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
        <div className={`${roboto.className} page-container-ss`}>
          <div
            className="newfirstcard-container-ddcc"
            style={{ boxSizing: "content-box" }}
          >
            {/*
            <div>
              <HDBNavBar/>
            </div>
            */}

            <div className="verification-s-text">
              <h1 className="title" style={{ fontWeight: "bold" }}>
                Successfully verified selfie!
              </h1>
            </div>

            <div className="successimg-hdb">
              <Image
                src={Successimage}
                alt="Verificationsuceess image"
                className="verificationsuccess-image"
                height={300}
                width={300}
                priority
              />
            </div>

            {/* <div className={styles.stickyButton}>
              <button
                type="submit"
                className={`${styles.button} ${styles.submitButton}`}
                onClick={handleNext}
              >
                Next
              </button>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default SelfieSuccess;
