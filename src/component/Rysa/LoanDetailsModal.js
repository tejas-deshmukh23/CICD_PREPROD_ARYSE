// LoanDetailsModal.js
"use client";

import React,{useState} from "react";
import styles from "./LoanDetailsModal.module.css";
import { useRouter } from "next/navigation";
import RepaymentInstallment from "./RepaymentInstallments";

export default function LoanDetailsModal({ loan, onClose }) {

  const [showRepaymentList, setShowRepaymentList] = useState(false);

  const router = useRouter();

  const handlePartPaymentClick = () =>{
    router.push(`/myContener/PartPaymentPage?mobilenumber=${loan.mno}`);
  }

  const handlePreClosure=()=>{
    router.push(`/myContener/PreCloserPage?mobilenumber=${loan.mno}`);
  }

  const handleMissedEmi=()=>{
    router.push(`/myContener/missedemi?mobilenumber=${loan.mno}`);
  }

  const handleRepaymentList = () =>{
    // setShowRepaymentList(true);
    router.push(`/myContener/repaymentlist?loanId=${loan.DisbursedLoanId}`);
  }

  if (!loan) return null;

  return (

    <>
      {/* {!showRepaymentList?(<> */}
        <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <span className={styles.title}>Loan Details</span>
          <span
            className={`${styles.status} ${
              loan.status === "Active" ? styles.active : styles.closed
            }`}
          >
            {loan.status}
          </span>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.row}>
          <div>
            <div className={styles.label}>Amount</div>
            <div className={styles.value}>₹{loan.amount.toLocaleString()}</div>
          </div>
          <div>
            <div className={styles.label}>Interest Rate</div>
            <div className={styles.value}>{loan.interestRate}%</div>
          </div>
        </div>

        <div className={styles.rowDif}>
          <div>
            <div className={styles.label}>Duration</div>
            <div className={styles.value}>{loan.duration}</div>
          </div>
          <div>
            <div className={styles.label}>Monthly EMI</div>
            <div className={styles.value}>₹{loan.emi.toLocaleString()}</div>
          </div>
        </div>

        <div className={styles.row}>
          <div>
            <div className={styles.label}>Loan Start Date</div>
            <div className={styles.value}>{loan.startDate}</div>
          </div>
          <div>
            <div className={styles.label}>Loan End Date</div>
            <div className={styles.value}>{loan.endDate}</div>
          </div>
        </div>

        <div className={styles.rowDif}>
          <div>
            <div className={styles.label}>Total Amount</div>
            <div className={styles.value}>₹{loan.totalAmount.toLocaleString()}</div>
          </div>
          {/* <div>
            <div className={styles.label}>Remaining Amount</div>
            <div className={styles.value}>₹{loan.remainingAmount.toLocaleString()}</div>
          </div> */}
        </div>

        <div className={styles.buttonRow}>
          {/* <button className={styles.actionButton} onClick={handleMissedEmi}>Repayment</button> */}
          <button className={styles.actionButton} onClick={handleMissedEmi}>MissedEmiPayment</button>
          <button className={styles.actionButtonOutline} onClick={handlePreClosure} >Pre-Closure</button>
          <button className={styles.actionButtonOutline} onClick={handlePartPaymentClick}>Part Payment</button>
          <button className={styles.actionButtonOutline} onClick={handleRepaymentList}>Repayment List</button>
        </div>
      </div>
    </div>
      {/* </>):(<>
      {console.log("loanId : ",loan.DisbursedLoanId)}
      </>)} */}
    </>

    
  );
}
