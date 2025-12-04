
// // loanRequestPage.js
// "use client";
// import { useState, useEffect } from "react";
// import Image from 'next/image';
// import React from "react";
// import styles from "./loanRequestPage.module.css";
// import LoanDetailsModal from "./LoanDetailsModal.js";
// import hdb from '../../../public/Jays/HDB.png';
// import { useSearchParams } from "next/navigation";
// import axios from "axios";

// const loanData = [
//   {
//     name: "Personal Loan",
//     date: "12 Jun 2024",
//     amount: 50000,
//     status: "Active",
//   },
//   {
//     name: "Business Loan",
//     date: "17 Jun 2023",
//     amount: 50000,
//     status: "Active",
//   },
//   {
//     name: "Education Loan",
//     date: "20 Jun 2022",
//     amount: 50000,
//     status: "Closed",
//   },
// ];

// // button code
// const LoanRequestPage = () => {

//   const searchParams = useSearchParams();
//   const mobileNumber = searchParams.get("mobilenumber");

//   // useEffect(()=>{
//   //   fetchLoanDetailsByMobile(mobileNumber);
//   // },[])

//   // const fetchLoanDetailsByMobile=async()=>{
//   //   try{
//   //     const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}fetchLoanDetails`,mobilenumber);
//   //     if(response.status === 200){
//   //       console.log("The response is : ",response);
//   //     }
//   //   }catch(error){
//   //     console.log("error while fetching the loan details",error);
//   //   }
//   // }

//   useEffect(() => { 
//     fetchLoanDetailsByMobile(mobileNumber); 
//   }, [mobileNumber]);
  
//   const fetchLoanDetailsByMobile = async (mobileNumber) => {
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}fetchloans`,
//         { mobileNumber }   // send JSON body
//       );
  
//       if (response.status === 200) {
//         console.log("The response is : ", response.data);
//       }
//     } catch (error) {
//       console.log("error while fetching the loan details", error);
//     }
//   }

//   const [selectedLoan, setSelectedLoan] = useState(null); // ✅ make this active

//   return (
//     <div className={styles.container}>
//       {/* <div className={styles.topSection}></div> */}
//       <div className={styles.headerTop}>
//          <div className={styles.headerLogo}>
//                   <Image
//                     src={hdb}
//                     alt="Hdb tag"
//                     style={{alignContent:"center",width:"auto",height:"auto", top:"-4"}}
//                   />
//                 </div>
//       </div>
//       <div className={styles.header}>
//         Open Loan Request (10)
//         <span className={styles.dropdown}>▼</span>
//       </div>

//       <div className={styles.content}>
//         {loanData.map((loan, index) => (
//           <div className={styles.loanCard} key={index}>
//             <div className={styles.cardHeader}>
//               <div className={styles.headerItem}>
//                 <div className={styles.label}>Loan Name</div>
//                 <div className={styles.value}>{loan.name}</div>
//               </div>
//               <div className={styles.headerItem}>
//                 <div className={styles.label}>Date</div>
//                 <div className={styles.value}>{loan.date}</div>
//               </div>
//               <div
//                 className={`${styles.status} ${
//                   loan.status === "Active"
//                     ? styles.statusActive
//                     : styles.statusClosed
//                 }`}
//               >
//                 {loan.status}
//               </div>
//             </div>

//             <div className={styles.cardBody}>
//               <div className={styles.amountSection}>
//                 <div className={styles.label}>Loan Amount</div>
//                 <div className={styles.amount}>
//                   ₹ {loan.amount.toLocaleString()}
//                 </div>
//               </div>

//               {/* ✅ working view button */}
//               <button
//                 className={styles.viewButton}
//                 onClick={() =>
//                   setSelectedLoan({
//                     ...loan,
//                     interestRate: 8,
//                     duration: "10 years",
//                     emi: 7000,
//                     startDate: "25 JAN 2024",
//                     endDate: "25 JAN 2044",
//                     totalAmount: 75000,
//                     remainingAmount: 54000,
//                   })
//                 }
//               >
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ✅ modal shows when loan is selected */}
//       {selectedLoan && (
//         <LoanDetailsModal
//           loan={selectedLoan}
//           onClose={() => setSelectedLoan(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default LoanRequestPage;

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import React from "react";
import styles from "./loanRequestPage.module.css";
import LoanDetailsModal from "./LoanDetailsModal.js";
import hdb from "../../../public/Jays/HDB.png";
import logo2 from "../../../public/AryseFin_logo.png"
import { useSearchParams } from "next/navigation";
import axios from "axios";
import SelectedLoanContext from "./RysaContexts/SelectedLoanContext";
import { useContext } from "react";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const LoanRequestPage = () => {

  const {selectedLoanData, setSelectedLoanData} = useContext(SelectedLoanContext);

  const searchParams = useSearchParams();
  const mobileNumber = searchParams.get("mobilenumber");

  const [loans, setLoans] = useState([]); // ✅ dynamic data
  const [selectedLoan, setSelectedLoan] = useState(null);

  useEffect(() => {
    if (mobileNumber) {
      fetchLoanDetailsByMobile(mobileNumber);
    }
  }, [mobileNumber]);

  const fetchLoanDetailsByMobile = async (mobileNumber) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}fetchloans`,
        { mobileNumber }
      );

      if (response.status === 200) {
        console.log("The response is : ", response.data);
        setLoans(response.data); // ✅ save response into state
      }
    } catch (error) {
      console.log("error while fetching the loan details", error);
    }
  };

  return (
     <div className={`${styles.container} ${outfit.className}`}>
      <div className={styles.headerTop}>
        <div className={styles.headerLogo}>
          {/* <Image
            src={hdb}
            alt="Hdb tag"
            style={{
              alignContent: "center",
              width: "auto",
              height: "auto",
              top: "-4",
            }}
          /> */}
          <Image
                  src={logo2}
                  alt="NA"
                  style={{
                    alignContent: "center",
                    width: "auto",
                    height: "auto",
                    // top: "",
                  }}
                height={150}
                width={150}
                />
        </div>
      </div>

      <div className={styles.header}>
        Open Loan Request ({loans.length})
        <span className={styles.dropdown}>▼</span>
      </div>

      <div className={styles.content}>
        {loans.map((loan, index) => (
          <div className={styles.loanCard} key={loan.id || index}>
            <div className={styles.cardHeader}>
              <div className={styles.headerItem}>
                <div className={styles.label}>Loan Number</div>
                <div className={styles.value}>{loan.loanNumber}</div>
              </div>
              <div className={styles.headerItem}>
                <div className={styles.label}>Start Date</div>
                <div className={styles.value}>
                  {loan.createTime
                    ? new Date(loan.createTime).toLocaleDateString()
                    : "-"}
                </div>
              </div>
              <div
                className={`${styles.status} ${
                  loan.status === "ACTIVE"
                    ? styles.statusActive
                    : styles.statusClosed
                }`}
              >
                {loan.status}
              </div>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.amountSection}>
                <div className={styles.label}>Loan Amount</div>
                <div className={styles.amount}>
                  ₹ {loan.principalAmount?.toLocaleString()}
                </div>
              </div>

              {/* <button
                className={styles.viewButton}
                onClick={() =>
                  setSelectedLoan({
                    ...loan,
                    emi: Math.round(
                      loan.outstandingAmount / loan.tenureMonths
                    ),
                    duration: `${loan.tenureMonths} months`,
                  })
                }
              >
                View Details
              </button> */}

              <button
  className={styles.viewButton}
  onClick={() =>{
    setSelectedLoan({
      // keep old modal field names
      amount: loan.principalAmount,
      interestRate: loan.interestRate,
      duration: `${loan.tenureMonths} months`,
      emi: Math.round(loan.outstandingAmount / loan.tenureMonths),
      startDate: loan.createTime
        ? new Date(loan.createTime).toLocaleDateString()
        : "-",
      endDate: loan.tenureMonths
        ? new Date(
            new Date(loan.createTime).setMonth(
              new Date(loan.createTime).getMonth() + loan.tenureMonths
            )
          ).toLocaleDateString()
        : "-",
      // totalAmount:
      //   loan.principalAmount +
      //   (loan.principalAmount * loan.interestRate * loan.tenureMonths) /
      //     (12 * 100), // simple interest calc
      totalAmount: loan.principalAmount,
      remainingAmount: loan.outstandingAmount,
      status: loan.status,
      mno: mobileNumber,
      DisbursedLoanId: loan.id
    })

    setSelectedLoanData({
      // keep old modal field names
      amount: loan.principalAmount,
      interestRate: loan.interestRate,
      duration: `${loan.tenureMonths} months`,
      emi: Math.round(loan.outstandingAmount / loan.tenureMonths),
      startDate: loan.createTime
        ? new Date(loan.createTime).toLocaleDateString()
        : "-",
      endDate: loan.tenureMonths
        ? new Date(
            new Date(loan.createTime).setMonth(
              new Date(loan.createTime).getMonth() + loan.tenureMonths
            )
          ).toLocaleDateString()
        : "-",
      // totalAmount:
      //   loan.principalAmount +
      //   (loan.principalAmount * loan.interestRate * loan.tenureMonths) /
      //     (12 * 100), // simple interest calc
      totalAmount: loan.principalAmount,
      remainingAmount: loan.outstandingAmount,
      status: loan.status,
      mno: mobileNumber,
      loanNumber: loan.loanNumber,
      transactionId: loan.transactionId,
      DisbursedLoanId: loan.id
    })
  }
  }
>
  View Details
</button>
{/* ✅ Why this w */}

            </div>
          </div>
        ))}
      </div>

      {selectedLoan && (
        <LoanDetailsModal
          loan={selectedLoan}
          onClose={() => setSelectedLoan(null)}
        />
      )}
    </div>
  );
};

export default LoanRequestPage;

// "use client";
// import React from "react";
// import styles from "./loanDetailsModal.module.css";

// const LoanDetailsModal = ({ loan, onClose }) => {
//   if (!loan) return null;

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.modal}>
//         <div className={styles.header}>
//           <h2>Loan Details</h2>
//           <button className={styles.closeButton} onClick={onClose}>
//             ✕
//           </button>
//         </div>

//         <div className={styles.body}>
//           <div className={styles.row}>
//             <span className={styles.label}>Loan Number:</span>
//             <span className={styles.value}>{loan.loanNumber}</span>
//           </div>

//           <div className={styles.row}>
//             <span className={styles.label}>Status:</span>
//             <span
//               className={`${styles.value} ${
//                 loan.status === "ACTIVE"
//                   ? styles.statusActive
//                   : styles.statusClosed
//               }`}
//             >
//               {loan.status}
//             </span>
//           </div>

//           <div className={styles.row}>
//             <span className={styles.label}>Principal Amount:</span>
//             <span className={styles.value}>
//               ₹ {loan.principalAmount?.toLocaleString()}
//             </span>
//           </div>

//           <div className={styles.row}>
//             <span className={styles.label}>Outstanding Amount:</span>
//             <span className={styles.value}>
//               ₹ {loan.remainingAmount?.toLocaleString()}
//             </span>
//           </div>

//           <div className={styles.row}>
//             <span className={styles.label}>Interest Rate:</span>
//             <span className={styles.value}>{loan.interestRate}%</span>
//           </div>

//           <div className={styles.row}>
//             <span className={styles.label}>Duration:</span>
//             <span className={styles.value}>{loan.duration}</span>
//           </div>

//           <div className={styles.row}>
//             <span className={styles.label}>EMI:</span>
//             <span className={styles.value}>
//               ₹ {loan.emi?.toLocaleString()}
//             </span>
//           </div>

//           <div className={styles.row}>
//             <span className={styles.label}>Start Date:</span>
//             <span className={styles.value}>{loan.startDate}</span>
//           </div>

//           <div className={styles.row}>
//             <span className={styles.label}>End Date:</span>
//             <span className={styles.value}>{loan.endDate}</span>
//           </div>

//           <div className={styles.row}>
//             <span className={styles.label}>Total Payable:</span>
//             <span className={styles.value}>
//               ₹ {loan.totalAmount?.toLocaleString()}
//             </span>
//           </div>
//         </div>

//         <div className={styles.footer}>
//           <button className={styles.closeButtonFooter} onClick={onClose}>
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoanDetailsModal;
