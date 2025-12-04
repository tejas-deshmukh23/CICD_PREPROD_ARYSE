// 'use client';
// import React, { useEffect, useState } from 'react';
// import styles from './SubmitPage.module.css';
// import confetti from 'canvas-confetti';
// import { Roboto } from "next/font/google";

// const roboto = Roboto({
//   weight: ["400", "700"],
//   subsets: ["latin"],
// });

// export default function SubmitPage() {
//   const [refNo, setRefNo] = useState('');
//   const [amount, setAmount] = useState('');
//   const [account, setAccount] = useState('');

//   useEffect(() => {
//     //  Confetti animation
//     confetti({
//       particleCount: 200,
//       spread: 50,
//       origin: { y: 0.6 }
//     });

//     // 🟩 Simulate backend fetch (you can replace with fetch/axios)
//     const fetchData = async () => {
//       const data = {
//         ref: 'D1102345',
//         amount: '50000',
//         accountNumber: '1298656789'
//       };
//       setRefNo(data.ref);
//       setAmount(data.amount);
//       setAccount(maskAccount(data.accountNumber));
//     };

//     fetchData();
//   }, []);

//   // ✅ Mask account number: show first 2 and last 4 digits only
//   const maskAccount = (accNum) => {
//     if (!accNum || accNum.length < 6) return accNum;
//     const first2 = accNum.slice(0, 2);
//     const last4 = accNum.slice(-4);
//     return `${first2}XX${last4}`;
//   };

//   // ✅ Format amount in Indian currency style (with commas)
//   const formatIndianCurrency = (amount) => {
//     if (!amount) return '';

//     // Convert to number and back to string to handle any formatting
//     const numAmount = parseInt(amount);

//     // Use Indian number formatting with commas
//     return numAmount.toLocaleString('en-IN');
//   };

//   return (
//     <div className={styles.container}>
//       {/* Updated Success Checkmark with KFS styling */}
//       <div className={styles.professionalCheckmarkContainer}>
//         <div className={`${styles.statusIcon} ${styles.statusCompleted}`}>
//           ✓
//         </div>
//       </div>

//       <div className={`${roboto.className}`}>
//         <h1 className={styles.title}>
//           Congratulations!<br />
//           Your loan of <strong>₹{formatIndianCurrency(amount)}</strong> has been successfully approved
//         </h1>
//         <p className={styles.message}>
//           The amount will be credited to your bank account <strong>{account}</strong> within 24 hours.
//         </p>
//         <br></br>
//         {/* <p className={styles.message}>
//           ✅ Sit back and relax — we'll notify you once the funds are transferred.
//         </p> */}
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import styles from "./SubmitPage.module.css";
import confetti from "canvas-confetti";
import { Roboto } from "next/font/google";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function SubmitPage() {
  const searchParams = useSearchParams();
  const clientLoanId = searchParams.get("clientLoanId");

  const [refNo, setRefNo] = useState("");
  const [account, setAccount] = useState("");
  const [loanAmount, setLoanAmount] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [emi, setEmi] = useState(0);

  // useEffect(() => {
  //   confetti({
  //     particleCount: 200,
  //     spread: 50,
  //     origin: { y: 0.6 },
  //   });

  //   const fetchSanctionDetails = async () => {
  //     if (!clientLoanId) return;
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8080/sanction/${clientLoanId}`
  //       );
  //       const data = response.data;
  //       setLoanAmount(data.loanAmount);
  //       setTenure(data.tenure);
  //       setInterestRate(data.interestRate);
  //       const emiValue = calculateEMI(
  //         data.loanAmount,
  //         data.interestRate,
  //         data.tenure
  //       );
  //       setEmi(emiValue);

  //       // Simulated bank account and reference number
  //       setRefNo("D1102345");
  //       setAccount(maskAccount("1298656789"));
  //     } catch (err) {
  //       console.error("Failed to fetch sanction details", err);
  //     }
  //   };

  //   fetchSanctionDetails();
  // }, [clientLoanId]);
  const fetchSanctionDetails = async () => {
    if (!clientLoanId) return;
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}sanctionWithAccount/${clientLoanId}`
      );
      const data = response.data;

      setLoanAmount(data.loanAmount);
      setTenure(data.tenure);
      setInterestRate(data.interestRate);

      // EMI Calculation
      const emiValue = calculateEMI(
        data.loanAmount,
        data.interestRate,
        data.tenure
      );
      setEmi(emiValue);

      // Masked account number
      if (data.accountNumber) {
        setAccount(maskAccount(data.accountNumber));
      }

      // If backend sends refNo, set it, else keep static
      setRefNo(data.refNo || "D1102345");
    } catch (err) {
      console.error("Failed to fetch sanction details", err);
    }
  };
  useEffect(() => {
    if (clientLoanId) {
      fetchSanctionDetails();
    }
  }, [clientLoanId]);

  const calculateEMI = (principalAmount, annualInterestRate, tenureMonths) => {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const emi =
      (principalAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, tenureMonths)) /
      (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);
    return Math.floor(emi);
  };

  // const maskAccount = (accNum) => {
  //   if (!accNum || accNum.length < 6) return accNum;
  //   const first2 = accNum.slice(0, 2);
  //   const last4 = accNum.slice(-4);
  //   return `${first2}XX${last4}`;
  // };

  const maskAccount = (accNum) => {
    if (!accNum || accNum.length < 6) return accNum; // basic validation

    const first2 = accNum.slice(0, 2);
    const last4 = accNum.slice(-4);

    // Number of X's = total length - first2 - last4
    const middleXCount = accNum.length - 6;
    const middleXs = "X".repeat(middleXCount);

    return `${first2}${middleXs}${last4}`;
  };

  const formatIndianCurrency = (amount) => {
    if (!amount) return "";
    return parseInt(amount).toLocaleString("en-IN");
  };

  return (
    <div className={styles.container}>
      <div className={styles.professionalCheckmarkContainer}>
        <div className={`${styles.statusIcon} ${styles.statusCompleted}`}>
          ✓
        </div>
      </div>

      <div className={`${roboto.className}`}>
        <h1 className={styles.title}>
          Congratulations!
          <br />
          Your loan of <strong>₹{formatIndianCurrency(loanAmount)}</strong> has
          been successfully approved
        </h1>

        <p className={styles.message}>
          EMI: <strong>₹{formatIndianCurrency(emi)}</strong> for{" "}
          <strong>{tenure} months</strong>
          <br />
          Interest Rate: <strong>{interestRate}% p.a.</strong>
        </p>

        <p className={styles.message}>
          The amount will be credited to your bank account{" "}
          <strong>{account}</strong> within 24 hours.
        </p>
      </div>
    </div>
  );
}
