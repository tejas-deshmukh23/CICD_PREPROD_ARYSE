import React from 'react';
import Image from 'next/image';
import styles from './repaymentHistoryPage.module.css';
import hdb from '../../../public/Jays/HDB.png';
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
const RepaymentHistoryPage = ({ 
  loanData = {
    loanAmount: 56666,
    interestRate: 56,
    interestPayable: 45,
    emiAmount: 24,
    emiPayable: 423,
    emiTenure: 43,
    numberOfInstallments: 3424,
    repaymentFrequency: 'Monthly',
    totalAmountPayable: 423,
    remainingAmount: 4234,
    totalAmountPaid: 2455767
  }
}) => {
  const {
    loanAmount,
    interestRate,
    interestPayable,
    emiAmount,
    emiPayable,
    emiTenure,
    numberOfInstallments,
    repaymentFrequency,
    totalAmountPayable,
    remainingAmount,
    totalAmountPaid
  } = loanData;

  // Format currency function
  const formatCurrency = (amount) => {
    return amount ? `₹ ${amount.toLocaleString()}` : '';
  };

  return (
    // <main className={styles.page}>
    <main className={`${styles.page} ${outfit.className}`}>
      {/* <div className={styles.mainCard}></div> */}
      {/*—‑ हेडर ‑—*/}
      {/* <header className={styles.header}>Review Loan Application</header> */}
      <div className={styles.header}>
        <div className={styles.headerLogo}>
          <Image
            src={hdb}
            alt="Hdb tag"
            style={{ alignContent: "center", width: "auto", height: "auto", top: "-4" }}
          />
        </div>
      </div>
      {/*—‑ कार्ड ‑—*/}
      <section className={styles.card}>
        {/* <div className={styles.content}> */}
          {/* <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Amount you pay</h2>
            
            <div className={styles.fieldGroup}>
              <div className={styles.field}>
                <div className={styles.labelBlock}>
                  <span className={styles.label}>Loan Amount</span>
                </div>
                <div className={styles.divDout}>
                    <span className={styles.centerDout}>:</span>
                </div>
                <div className={styles.divValue}>
                <span className={styles.value}>{formatCurrency(loanAmount)}</span>
                </div>
              </div>
              
              <div className={styles.field}>
                <div className={styles.labelBlock}>
                  <span className={styles.label}>Interest payable</span>
                  <span className={styles.sublabel}>(with interest rate {interestRate}%)</span>
                </div>
                <div className={styles.divDout}>
                    <span className={styles.centerDout}>:</span>
                </div>
                <div className={styles.divValue}>
                <span className={styles.value}>{formatCurrency(interestPayable)}</span>
                </div>
              </div>
              
              <div className={styles.field}>
                <div className={styles.labelBlock}>
                  <span className={styles.label}>EMI Amount</span>
                </div>
                <div className={styles.divDout}>
                    <span className={styles.centerDout}>:</span>
                </div>
                <div className={styles.divValue}>
                <span className={styles.value}>{formatCurrency(emiAmount)}</span>
                </div>
              </div>
              
              <div className={styles.field}>
                <div className={styles.labelBlock}>
                  <span className={styles.label}>EMI Payable</span>
                </div>
                <div className={styles.divDout}>
                    <span className={styles.centerDout}>:</span>
                </div>
                <div className={styles.divValue}>
                <span className={styles.value}>{formatCurrency(emiPayable)}</span>
                </div>
              </div>
              
              <div className={styles.field}>
                <div className={styles.labelBlock}>
                  <span className={styles.label}>EMI Tenure</span>
                </div>
                <div className={styles.divDout}>
                    <span className={styles.centerDout}>:</span>
                </div>
                <div className={styles.divValue}>
                <span className={styles.value}>{emiTenure ? `${emiTenure} months` : ''}</span>
                </div>
              </div>
              
              <div className={styles.field}>
                <div className={styles.labelBlock}>
                  <span className={styles.label}>Number of installment</span>
                </div>
                <div className={styles.divDout}>
                    <span className={styles.centerDout}>:</span>
                </div>
                <div className={styles.divValue}>
                <span className={styles.value}>{numberOfInstallments || ''}</span>
                </div>
              </div>
              
              <div className={styles.field}>
                <div className={styles.labelBlock}>
                  <span className={styles.label}>Repayment Frequency</span>
                </div>
                <div className={styles.divDout}>
                    <span className={styles.centerDout}>:</span>
                </div>
                <div className={styles.divValue}>
                <span className={styles.value}>{repaymentFrequency}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.summarySection}>
            <div className={styles.summaryField}>
              <div className={styles.summaryLabelBlock}>
                <span className={styles.summaryLabel}>Total amount payable</span>
              </div>
              <div className={styles.divDout}>
                <span className={styles.centerDout}>:</span>
              </div>
              <div className={styles.divValue}>
              <span className={styles.summaryValue}>{formatCurrency(totalAmountPayable)}</span>
              </div>
            </div>
            
            <div className={styles.summaryField}>
              <div className={styles.summaryLabelBlock}>
                <span className={styles.summaryLabel}>Remaining Amount</span>
              </div>
              <div className={styles.divDout}>
                <span className={styles.centerDout}>:</span>
              </div>
              <div className={styles.divValue}>
              <span className={styles.summaryValue}>{formatCurrency(remainingAmount)}</span>
              </div>
            </div>
            
            <div className={styles.summaryField}>
              <div className={styles.summaryLabelBlock}>
                <span className={styles.summaryLabel}>Total amount paid</span>
              </div>
              <div className={styles.divDout}>
                <span className={styles.centerDout}>:</span>
              </div>
              <div className={styles.divValue}>
              <span className={styles.summaryValue}>{formatCurrency(totalAmountPaid)}</span>
              </div>
            </div> */}
            {/*  */}
            <table className={styles.summaryTable}>
  <tbody>
  
    {/* Section: Amount you pay */}
    <tr>
      <th colSpan="3" className={styles.sectionTitle}>
        Amount you pay
      </th>
    </tr>
    {[
      { label: 'Loan Amount', value: formatCurrency(loanAmount) },
      {
      label: (
        <>
          Interest payable<br />
          (interest rate {interestRate}%)
        </>
      ),
      value: formatCurrency(interestPayable),
    },
      // { label: `Interest payable <br/> (interest rate ${interestRate}%)`, value: formatCurrency(interestPayable) },
      { label: 'EMI Amount', value: formatCurrency(emiAmount) },
      { label: 'EMI Payable', value: formatCurrency(emiPayable) },
      { label: 'EMI Tenure', value: emiTenure ? `${emiTenure} months` : '' },
      { label: 'Number of installment', value: numberOfInstallments || '' },
      { label: 'Repayment Frequency', value: repaymentFrequency }
    ].map((row, idx) => (
      <tr key={idx} className={styles.fieldRow}>
        <td className={styles.leftCell}>{row.label}</td>
        <td className={styles.separatorCell}>:</td>
        <td className={styles.rightCell}><span className={styles.valueAm}>{row.value}</span></td>
      </tr>
    ))}

    {/* Section: Summary */}
    <tr>
      <th colSpan="3">
        <hr className={styles.divider} />
      </th>
    </tr>
    <tr>
      <th colSpan="3" className={styles.sectionTitle}>
        Summary
      </th>
    </tr>
    {[
      { label: 'Total amount payable', value: formatCurrency(totalAmountPayable) },
      { label: 'Remaining Amount', value: formatCurrency(remainingAmount) },
      { label: 'Total amount paid', value: formatCurrency(totalAmountPaid) },
    ].map((row, idx) => (
      <tr key={`summary-${idx}`} className={styles.summaryRow}>
        <td className={styles.leftCell}>{row.label}</td>
        <td className={styles.separatorCell}>:</td>
        <td className={styles.rightCell}><span className={styles.valueAm}>{row.value}</span></td>
      </tr>
    ))}

  </tbody>
</table>

            {/*  */}
            <div className={styles.btnContainer}>
          <button type="button"
            className={styles.nextBtn} >
            Next
          </button>
        </div>
      </section>
    </main>
  );
};

export default RepaymentHistoryPage;