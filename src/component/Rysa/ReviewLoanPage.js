'use client';
import Image from 'next/image';
import styles from './ReviewLoan.module.css';
import hdb from '../../../public/Jays/HDB.png';
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
export default function ReviewLoanPage() {
  const summary = {
    loanAmount: 50000,
    processingFees: 966.42,
    interestRate: 20,
    interestPayable: 6000,
    totalPayable: 56000,
    emi: 6000,
    emiTenure: 36,
    numInstallments: 9,
  };
  const contCharges = {
    closureCharge: "3%",
    latePaymentCharge: "4%",
  };
  // const contCharges={
  //   closureCharge: 3%,
  //   latePaymentCharge: 4%,
  // };
  const gro = {
    name: 'Kiran Deshmukh',
    designation: 'Software engineer',
    mobile: '9999999999',
    address: 'Kharadi pune maharashtra',
    email: 'Kiran@gmail.com',
  };

  const cur = n => `₹ ${n.toLocaleString()}`;

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
        {/* ========== Amount you get ========== */}
        {/* <h3 className={styles.sectionTitle}>Amount you get</h3>
        <div className={styles.row}>
          <span>Loan Amount</span> <span className={styles.valueAm}>{cur(summary.loanAmount)}</span>
        </div>
        <div className={styles.row}>
          <span>Processing Fees</span>{' '}
          <span className={styles.valueAm}>{cur(summary.processingFees)}</span>
        </div>

        <hr className={styles.divider} />

        <div className={styles.row}>
          <span className={styles.netLabel}>Net disbursed amount</span>
          <span className={styles.netValue}>
            {cur(summary.loanAmount - summary.processingFees)}
          </span>
        </div>

        {/* ========== Amount you pay ========== */}
        {/* <h3 className={styles.sectionTitle}>Amount you pay</h3>
        <div className={styles.row}>
          <span>Loan Amount</span> <span className={styles.valueAm}>{cur(summary.loanAmount)}</span>
        </div>
        <div className={styles.row}>
          <span>
            Interest payable
            <br />
            (with interest rate {summary.interestRate}%)
          </span>
          <span className={styles.valueAm}>{cur(summary.interestPayable)}</span>
        </div>
        <div className={styles.row}>
          <span>Total amount payable</span>{' '}
          <span className={styles.valueAm}>{cur(summary.totalPayable)}</span>
        </div>
        <div className={styles.row}>
          <span>EMI Amount</span> <span className={styles.valueAm}>{cur(summary.emi)}</span>
        </div>
        <div className={styles.row}>
          <span>EMI Payable</span> <span className={styles.valueAm}>{cur(summary.emi)}</span>
        </div>
        <div className={styles.row}>
          <span>EMI Tenure</span> <span className={styles.valueAm}>{summary.emiTenure}</span>
        </div>
        <div className={styles.row}>
          <span>Number of installment</span>{' '}
          <span className={styles.valueAm}>{summary.numInstallments}</span>
        </div>

        <hr className={styles.divider} /> */}

        {/* ========== Contigent charges ========== */}
        {/* <h3 className={styles.sectionTitle}>Contigent charges</h3>
        <div className={styles.row}>
          <span>Foreclosure charge</span> <span className={styles.valueAm}>{contCharges.closureCharge}</span>
        </div>
        <div className={styles.row}>
          <span>Late payment charge</span> <span className={styles.valueAm}>{contCharges.latePaymentCharge}</span>
        </div> */}

        {/*  */}
        <table className={styles.summaryTable}>
          <tbody>
            {/* ========== "Amount you get" Section ========== */}
            <tr>
              <th colSpan="2" className={styles.sectionTitle}>Amount you get</th>
            </tr>
            <tr>
              <td><span className={styles.netValue}>Loan Amount</span></td>
              <td className={styles.colDout}>:</td>
              <td className={styles.valueAm}>{cur(summary.loanAmount)}</td>
            </tr>
            <tr>
              <td><span className={styles.netValue}>Processing Fees</span></td>
              <td className={styles.colDout}>:</td>
              <td className={styles.valueAm}>{cur(summary.processingFees)}</td>
            </tr>
            <tr>
              <td><hr className={styles.divider} /></td>
              <td><hr className={styles.divider} /></td>
              <td><hr className={styles.divider} /></td>
            </tr>
            <tr>
              <td className={styles.netLabel}>Net disbursed amount</td>
              <td className={styles.colDout}>:</td>
              <td className={styles.valueAm} >
                {cur(summary.loanAmount - summary.processingFees)}
              </td>
            </tr>
            <tr>
              <td style={{ paddingTop: '10px' }}></td>
              <td style={{ paddingTop: '10px' }}></td>
              <td style={{ paddingTop: '10px' }}></td>
            </tr>
            {/* ========== "Amount you pay" Section ========== */}
            <tr>
              <th colSpan="2" className={styles.sectionTitle}>Amount you pay</th>
            </tr>
            <tr>
              <td><span className={styles.netValue}>Loan Amount</span></td>
              <td className={styles.colDout}>:</td>
              <td className={styles.valueAm}>{cur(summary.loanAmount)}</td>
            </tr>
            <tr>
              <td> <span className={styles.netValue}>
                Interest payable<br />
                (interest rate {summary.interestRate})</span>
              </td>
              <td className={styles.colDout}>:</td>
              <td className={styles.valueAm}>{cur(summary.interestPayable)}</td>
            </tr>
            <tr>
              <td><span className={styles.netValue}>Total amount payable</span></td>
              <td className={styles.colDout}>:</td>
              <td className={styles.valueAm}>{cur(summary.totalPayable)}</td>
            </tr>
            <tr>
              <td><span className={styles.netValue}>EMI Amount</span></td>
              <td className={styles.colDout}>:</td>
              <td className={styles.valueAm}>{cur(summary.emi)}</td>
            </tr>
            <tr>
              <td><span className={styles.netValue}>EMI Payable</span></td>
              <td className={styles.colDout}>:</td>
              <td className={styles.valueAm}>{cur(summary.emi)}</td>
            </tr>
            <tr>
              <td><span className={styles.netValue}>EMI Tenure</span></td>
              <td className={styles.colDout}>:</td>
              <td className={styles.valueAm}>{summary.emiTenure}</td>
            </tr>
            <tr>
              <td> <span className={styles.netValue}>Number of installments</span></td>
              <td className={styles.colDout}>:</td>
              <td className={styles.valueAm}>{summary.numInstallments}</td>
            </tr>
            <tr>
              <td><hr className={styles.divider} /></td>
              <td><hr className={styles.divider} /></td>
              <td><hr className={styles.divider} /></td>
            </tr>
            {/* ========== "Contingent charges" Section ========== */}
            <tr>
              <th colSpan="2" className={styles.sectionTitle}>Contingent charges</th>
            </tr>
            <tr>
              <td><span className={styles.netValue}>Foreclosure charge</span></td>
              <td className={styles.colDout}>:</td>
              <td className={styles.valueAm}>{contCharges.closureCharge}</td>
            </tr>
            <tr>
              <td><span className={styles.netValue}>Late payment charge</span></td>
              <td className={styles.colDout}>:</td>
              <td className={styles.valueAm}>{contCharges.latePaymentCharge}</td>
            </tr>
            <tr>
              <td><hr className={styles.divider} /></td>
              <td><hr className={styles.divider} /></td>
              <td><hr className={styles.divider} /></td>
            </tr>
          </tbody>
        </table>


        {/*  */}
        {/* <hr className={styles.divider} /> */}

        {/* ========== GRO Details ========== */}
        <h3 className={styles.sectionTitle}>GRO Details</h3>

        <div className={styles.field}>
          <label>Name</label>
          <input
            readOnly
            value={gro.name}
            className={styles.readonlyInput}
          />
        </div>

        <div className={styles.field}>
          <label>Designation</label>
          <input
            readOnly
            value={gro.designation}
            className={styles.readonlyInput}
          />
        </div>

        <div className={styles.field}>
          <label>Mobile No.</label>
          <input
            readOnly
            value={gro.mobile}
            className={styles.readonlyInput}
          />
        </div>

        <div className={styles.field}>
          <label>Postal address</label>
          <input
            readOnly
            value={gro.address}
            className={styles.readonlyInput}
          />
        </div>

        <div className={styles.field}>
          <label>Email</label>
          <input
            readOnly
            value={gro.email}
            className={styles.readonlyInput}
          />
        </div>
        <div className={styles.btnContainer}>
          <button type="button"
            className={styles.nextBtn} >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}
