"use client";
import React, { useState, useEffect, useRef } from "react";
import "./LoanApprovalPageNew.css";
import styles from "./LoanAprrovalPageNew.module.css";
import EmblaCarousel from "./Emblacarousel/js/EmblaCarousel";
import listimage1 from "./newplimages/finalimage2.png";
import listimage2 from "./newplimages/finalimage3.png";
import listimage3 from "./newplimages/plimage33.png";
import axios from "axios";
import Image from "next/image";
import hdb from "../../../public/Jays/HDB.png";
import { useRouter, useSearchParams } from "next/navigation";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const LoanApprovalPage = ({ clientLoanId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const salarySlipLink = searchParams.get("salarySlipLink");
  const paramId = searchParams.get("client_loan_id");
  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [approvedLoanAmount, setApprovedLoanAmount] = useState(0);

  const handleBoxClick = (inputRef) => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  const amountRef = useRef(null);
  const tenureRef = useRef(null);
  useEffect(() => {
    const fetchSanctionDetails = async () => {
      const id = paramId || clientLoanId;
      if (!id) return;

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}sanction/${id}`
        );
        const data = response.data;

        setLoanAmount(Number(data.loanAmount));
        setApprovedLoanAmount(Number(data.loanAmount));
        setTenure(Number(data.tenure));
        setInterestRate(Number(data.interestRate));
      } catch (error) {
        console.error("❌ Failed to fetch sanction details:", error);
      }
    };

    fetchSanctionDetails();
  }, [paramId, clientLoanId]);

  // useEffect(() => {
  //   const storedLoanAmount = localStorage.getItem("sanctionLoanAmount");
  //   const storedTenure = localStorage.getItem("sanctionTenure");
  //   const storedInterestRate = localStorage.getItem("sanctionInterestRate");

  //   if (storedLoanAmount) {
  //     const amount = Number(storedLoanAmount);
  //     setApprovedLoanAmount(amount); // ✅ fixed display
  //     setLoanAmount(amount); // ✅ user-editable
  //   }

  //   if (storedTenure) setTenure(Number(storedTenure));
  //   if (storedInterestRate) setInterestRate(Number(storedInterestRate));
  // }, []);

  // useEffect(() => {
  //   if (loanAmount) localStorage.setItem("sanctionLoanAmount", loanAmount);
  // }, [loanAmount]);

  // useEffect(() => {
  //   if (tenure) localStorage.setItem("sanctionTenure", tenure);
  // }, [tenure]);

  // useEffect(() => {
  //   if (interestRate)
  //     localStorage.setItem("sanctionInterestRate", interestRate);
  // }, [interestRate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "✅ Submitting with:",
      "loanAmount:",
      loanAmount,
      "tenure:",
      tenure,
      "interestRate:",
      interestRate
    );

    router.push(
      `/yubi/Bankdetailspage` +
        `?loanAmount=${loanAmount}` +
        `&tenure=${tenure}` +
        `&interestRate=${interestRate}` +
        `&clientLoanId=${paramId}`
      // `&salarySlipLink=${encodeURIComponent(salarySlipLink)}`
    );
  };

  return (
    // <div className={`${outfit.className} pageContainerloanpage`}>
    //   <div className="loan-block">
    //     <div className="loan-head">
    //       <div className="hdb-logo">
    //         <Image
    //           src={hdb}
    //           alt="Hdb tag"
    //           style={{ alignContent: "center", width: "auto", height: "auto" }}
    //         />
    //       </div>
    //     </div>
    //     <div className="cardForm-loan">
    //       <div className="content-loan">
    //         <form onSubmit={handleSubmit} className="formloanpage">
    //           <div className="cardContainerloanpage">
    //             <h3 style={{ textAlign: "center", color: "#777777" }}>
    //               Congratulations ! You have been approved a loan of
    //             </h3>
    //             <h1 style={{ color: "#777777" }}>
    //               ₹
    //               {approvedLoanAmount
    //                 ? approvedLoanAmount.toLocaleString("en-IN")
    //                 : "0"}
    //             </h1>

    //             {/* Loan Amount Field */}
    //             {/* Loan Amount Field */}
    //             <label className="label" style={{ fontSize: "16px" }}>
    //               Select loan amount
    //             </label>
    //             <input
    //               type="number"
    //               className="inputBox"
    //               value={loanAmount}
    //               onChange={(e) => setLoanAmount(Number(e.target.value))}
    //               placeholder="Enter Loan Amount"
    //               min={100000}
    //               max={approvedLoanAmount}
    //               disabled={approvedLoanAmount === 100000}
    //               title={
    //                 approvedLoanAmount === 100000
    //                   ? "Loan amount is fixed and cannot be changed"
    //                   : ""
    //               }
    //               required
    //             />

    // <p className="helperText">
    //   {approvedLoanAmount === 100000
    //     ? "Loan amount is fixed at ₹1,00,000"
    //     : `You can enter up to ₹${approvedLoanAmount.toLocaleString(
    //         "en-IN"
    //       )}`}
    // </p>

    //             {/* Loan Amount Slider */}
    // <div className="sliderContainer">
    //   <span
    //     style={{
    //       color: approvedLoanAmount === 100000 ? "#999" : "#000000",
    //     }}
    //   >
    //     ₹1,00,000
    //   </span>
    //   <input
    //     type="range"
    //     min={100000}
    //     max={approvedLoanAmount}
    //     step={5000}
    //     value={loanAmount}
    //     onChange={(e) => setLoanAmount(Number(e.target.value))}
    //     className="slider"
    //     disabled={approvedLoanAmount === 100000}
    //     title={
    //       approvedLoanAmount === 100000
    //         ? "Loan amount is fixed and cannot be changed"
    //         : ""
    //     }
    //   />
    //   <span
    //     style={{
    //       color: approvedLoanAmount === 100000 ? "#999" : "#000000",
    //     }}
    //   >
    //     ₹{approvedLoanAmount.toLocaleString("en-IN")}
    //   </span>
    // </div>

    //             {/* Tenure Input Field */}
    //             <label className="label" style={{ fontSize: "16px" }}>
    //               Select loan tenure
    //             </label>
    //             <input
    // type="number"
    // className="inputBox"
    // value={tenure}
    // onChange={(e) => setTenure(e.target.value)}
    // placeholder="Enter Tenure in Months"
    // min={6}
    // max={36}
    // step={1}
    // required
    //             />

    // <p className="helperText" style={{ fontSize: "16px" }}>
    //   You can enter up to 36 months
    // </p>

    //             {/* Tenure Slider */}
    // <div className="sliderContainer">
    //   <span style={{ color: "#000000", fontSize: "16px" }}>6</span>
    //   <input
    //     type="range"
    //     min={6}
    //     max={36}
    //     step={1}
    //     value={tenure || 6}
    //     onChange={(e) => setTenure(Number(e.target.value))}
    //     className="slider"
    //   />
    //   <span style={{ color: "#000000", fontSize: "16px" }}>36</span>
    // </div>

    //             {/* Submit Button */}
    //             <div className="Long-button">
    //               <button type="submit" className="form-submit">
    //                 Next
    //               </button>
    //             </div>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className={`${styles.container} ${outfit.className}`}>
      <div className={styles.mainHeaderPart}>
        <div className={styles.topchildren}>
          <div className={styles.logoContainer}>
            <Image
              src={hdb}
              alt="Hdb tag"
              width={250}
              height={250}
              className={styles.logo2}
              priority
            />
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <form onSubmit={handleSubmit}>
          <div>
            <h3>
              {" "}
              Congratulations ! You have been approved a loan of ₹
              {approvedLoanAmount
                ? approvedLoanAmount.toLocaleString("en-IN")
                : "0"}
            </h3>
          </div>
          <div>
            <div className={styles.fields} onClick={() => handleBoxClick(amountRef)}>
              <span className={styles.fieldName1}>Select loan amount</span>
              <input
                ref={amountRef}
                type="number"
                className={styles.inputfield}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                // placeholder="Enter Loan Amount"
                min={100000}
                max={approvedLoanAmount}
                disabled={approvedLoanAmount === 100000}
                title={
                  approvedLoanAmount === 100000
                    ? "Loan amount is fixed and cannot be changed"
                    : ""
                }
                required
              />
            </div>
            <p className={styles.helperText}>
              {approvedLoanAmount === 100000
                ? "Loan amount is fixed at ₹1,00,000"
                : `You can enter up to ₹${approvedLoanAmount.toLocaleString(
                    "en-IN"
                  )}`}
            </p>
            <div className={styles.sliderContainer}>
              <span
                style={{
                  color: approvedLoanAmount === 100000 ? "#999" : "#000000",
                }}
              >
                ₹1,00,000
              </span>
              <input
                type="range"
                min={100000}
                max={approvedLoanAmount}
                step={5000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className={styles.slider}
                disabled={approvedLoanAmount === 100000}
                title={
                  approvedLoanAmount === 100000
                    ? "Loan amount is fixed and cannot be changed"
                    : ""
                }
              />
              <span
                style={{
                  color: approvedLoanAmount === 100000 ? "#999" : "#000000",
                }}
              >
                ₹{approvedLoanAmount.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div>
            <div className={styles.fields} onClick={() => handleBoxClick(tenureRef)}>
              <span className={styles.fieldName1}>Select loan tenure</span>
              <input
                ref={tenureRef}
                type="number"
                id="branchName"
                name="branchName"
                className={styles.inputfield}
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                // placeholder="Enter Tenure in Months"
                min={6}
                max={36}
                step={1}
                required
              />
            </div>
            <p className={styles.helperText}>You can enter up to 36 months</p>
            <div className={styles.sliderContainer}>
              <span style={{ color: "#000000", fontSize: "16px" }}>6</span>
              <input
                type="range"
                min={6}
                max={36}
                step={1}
                value={tenure || 6}
                onChange={(e) => setTenure(Number(e.target.value))}
                className={styles.slider}
              />
              <span style={{ color: "#000000", fontSize: "16px" }}>36</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className={styles.btnContainer}>
            <button type="submit" className={styles.nextbtn}>
              <span>Next</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoanApprovalPage;
