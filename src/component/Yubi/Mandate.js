"use client";
import React, { useState } from "react";
import { Roboto } from "next/font/google";
import styles from "./NewPlFirstPage.module.css";
import "./Mandate.css";
import FinalSuccess from "./FinalSuccess"; // Import the FinalSuccessPage component

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const Mandate = () => {
  // State to manage the active container
  const [activeContainer, setActiveContainer] = useState("MandatePage");

  const handleAgreeClick = () => {
    setActiveContainer("FinalSuccess"); // Switch to the success page
  };

  return (
    <div className={`${roboto.className} mpage-container`}>
      {/* Mandate Page */}
      {activeContainer === "MandatePage" && (
        <div
          className="newfirstcard-container-mddc"
          style={{ boxSizing: "content-box" }}
        >
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <h1
                className="fixed-header"
                style={{ fontSize: "35px", fontWeight: "bold" }}
              >
                Agreement
              </h1>
            </div>

            {/* Scrollable Content */}
            <div className="scrollable-content">
              <p>
                <strong>Agreement Terms:</strong> <br />
                This is a dummy agreement format. By agreeing to this, you
                confirm that you have read and understood the terms and
                conditions mentioned herein. The agreement is a representation
                of mutual understanding between the parties involved.
              </p>
              <p>
                <strong>Section 1:</strong> Rights and Responsibilities <br />
                Both parties agree to fulfill their respective roles and
                responsibilities as outlined in this agreement.
              </p>
              <p>
                <strong>Section 2:</strong> Confidentiality <br />
                Any information shared under this agreement shall remain
                confidential and shall not be disclosed to any unauthorized
                third party.
              </p>
              <p>
                <strong>Section 3:</strong> Termination <br />
                Either party may terminate this agreement by providing written
                notice of termination at least 30 days in advance.
              </p>
              <p>
                <strong>Section 4:</strong> Dispute Resolution <br />
                Any disputes arising under this agreement shall be resolved
                through mediation and arbitration, as applicable.
              </p>
            </div>

            {/* Sticky Button at Bottom */}
            <div className={styles.stickyButton}>
              <button
                type="button"
                className={`${styles.button} ${styles.submitButton}`}
                onClick={handleAgreeClick}
              >
                Agree
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Final Success Page */}
      {activeContainer === "FinalSuccess" && <FinalSuccess />}
    </div>
  );
};

export default Mandate;

// "use client";
// import React, { useState } from "react";
// import { Roboto } from "@next/font/google";
// import styles from "./NewPlFirstPage.module.css";
// import "./Mandate.css";

// const roboto = Roboto({
//   weight: ["400", "700"],
//   subsets: ["latin"],
// });

// const Mandate = () => {
//   const [isAgreed, setIsAgreed] = useState(false);

//   const handleAgreeClick = () => {
//     setIsAgreed(true);
//     alert("You have agreed to the terms of the agreement!");
//   };

//   return (
//     <>
//     <div className={`${roboto.className} page-container`}>
//       <div className="newfirstcard-container-ddc" style={{ boxSizing: "content-box" }}>
//       <form className={styles.form}>
//         <div className={styles.formGroup}>
//         <h1 className="fixed-header" style={{fontSize:'35px'}}>Agreement</h1>
//         </div>

//         {/* Scrollable Content */}

//         <div className="scrollable-content">
//           <p>
//             <strong>Agreement Terms:</strong> <br />
//             This is a dummy agreement format. By agreeing to this, you confirm that you have read and understood the terms
//             and conditions mentioned herein. The agreement is a representation of mutual understanding between the parties
//             involved.
//           </p>
//           <p>
//             <strong>Section 1:</strong> Rights and Responsibilities <br />
//             Both parties agree to fulfill their respective roles and responsibilities as outlined in this agreement.
//           </p>
//           <p>
//             <strong>Section 2:</strong> Confidentiality <br />
//             Any information shared under this agreement shall remain confidential and shall not be disclosed to any
//             unauthorized third party.
//           </p>
//           <p>
//             <strong>Section 3:</strong> Termination <br />
//             Either party may terminate this agreement by providing written notice of termination at least 30 days in
//             advance.
//           </p>
//           <p>
//             <strong>Section 4:</strong> Dispute Resolution <br />
//             Any disputes arising under this agreement shall be resolved through mediation and arbitration, as applicable.
//           </p>
//         </div>

//         {/* Sticky Button at Bottom */}
//         <div className={styles.stickyButton}>
//           <button
//             type="button"
//             className={`${styles.button} ${styles.submitButton}`}
//             onClick={handleAgreeClick}
//           >
//             Agree
//             </button>
//           </div>
//         </form>
//       </div>
//       </div>

//     </>
//   );
// };

// export default Mandate;
