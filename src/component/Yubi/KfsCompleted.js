// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import "./KfsCompleted.css";
// import axios from "axios";
// import Image from "next/image";
// import hdb from "../../../public/Jays/HDB.png";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Roboto } from "next/font/google";
// import Kfs from "../../component/Yubi/newplimages/KFS.png";
// import StickyWarning from "../../component/Yubi/StickyWarning";
// import CallbackListener from "../CallbackListener";
// // import RedirectingPageOnRysa from "./RedirectingPageOnRysa";
// import RedirectingPageForAgreeement from "./RedirectingPageForAgreement";

// const roboto = Roboto({
//   weight: ["400", "700"],
//   subsets: ["latin"],
// });

// const Kfscompleted = () => {
//   const searchParams = useSearchParams();
//   const [clientLoanId, setClientLoanId] = useState(null);
//   const [statusMessage, setStatusMessage] = useState("KFS Completed");
//   const hasLoanAgreementStarted = useRef(false);
//   const [isNextClicked, setIsNextClicked] = useState(false);

//   useEffect(() => {
//     // const loanId = localStorage.getItem("clientLoanId");
//     const loanId = searchParams.get("clientLoanId");
//     if (loanId) {
//       setClientLoanId(loanId);
//     } else {
//       console.error("❌ Client Loan ID not found in localStorage");
//     }
//   }, []);

//   // if (isNextClicked) {
//   //   return <RedirectingPageOnRysa />;
//   // }

//   const handleNextClick = async () => {
//     if (!clientLoanId) {
//       console.error("❌ Missing clientLoanId");
//       return;
//     }

//     if (hasLoanAgreementStarted.current) {
//       console.warn("⚠️ Loan Agreement already initiated");
//       return;
//     }

//     hasLoanAgreementStarted.current = true;
//     setIsNextClicked(true); // 👈 Hides button
//     setStatusMessage("Waiting for loan agreement status...");

//     try {
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}generateLoanAgreementDocument`,
//         {
//           clientLoanId,
//         }
//       );
//       console.log("✅ Loan Agreement API Response:", res.data);
//       if (res.data.code === -1) {
//         window.location.href = `/yubi/RejectionPage`;
//         return;
//       }
//     } catch (err) {
//       console.error("❌ Loan Agreement API error:", err);
//       setStatusMessage("Error generating loan agreement");
//       setIsNextClicked(false); // 👈 Show again on error (optional)
//     }
//   };

//   // const handleNextClick = () => {
//   //   setIsNextClicked(true);
//   //   router.push("/yubi/AgreementCompleted"); // ✅ Redirect on Next click
//   // };

//   return (
//     <>
//       <CallbackListener
//         clientLoanId={clientLoanId}
//         onEsignReady={async () => {
//           console.log("✅ Loan Agreement doc generated webhook received!");

//           // setStatusMessage("Agreement...");

//           try {
//             const res = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}requestEsign`, {
//               clientLoanId,
//             });

//             console.log("✅ eSign API Response:", res.data);

//             if (res.data.code === -1) {
//               window.location.href = `/yubi/RejectionPage`;
//               return;
//             }

//             const redirectUrl = res.data?.obj;
//             if (redirectUrl) {
//               window.location.href = redirectUrl;
//             } else {
//               console.error("❌ No redirect URL in eSign response");
//             }
//           } catch (err) {
//             console.error("❌ eSign API error:", err);
//           }
//         }}
//       />
//       {isNextClicked ? (
//         <RedirectingPageForAgreeement />
//       ) : (
//         <div className={`${roboto.className} pageContainerloanpage`}>
//           <div className="loan-block">
//             <div className="loan-head">
//               <div className="hdb-logo">
//                 <Image
//                   src={hdb}
//                   alt="Hdb tag"
//                   style={{
//                     alignContent: "center",
//                     width: "auto",
//                     height: "auto",
//                   }}
//                 />
//               </div>
//             </div>
//             <div className="cardForm-loan">
//               <div className="content-loan">
//                 <div className="formloanpage">
//                   <div className="sign-txt">
//                     <div className="kfs-icon-container">
//                       <div className="kfs-circle-bg"></div>
//                       <div
//                         style={{
//                           width: "100px",
//                           height: "100px",
//                           background:
//                             "linear-gradient(45deg, #6039D2, #8B5FD6)",
//                           borderRadius: "50%",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           color: "white",
//                           fontSize: "36px",
//                           fontWeight: "bold",
//                           position: "relative",
//                           zIndex: 1,
//                         }}
//                       >
//                         📄
//                       </div>
//                     </div>
//                   </div>

//                   <div className="status-container">
//                     <div className="status-row">
//                       <div className="status-icon status-completed">✓</div>
//                       <div className="status-text status-completed-text">
//                         KFS Completed
//                       </div>
//                     </div>

//                     <div className="status-row">
//                       <div className="status-icon status-pending">📋</div>
//                       <div className="status-text status-pending-text">
//                         Agreement
//                         <div className="blinking-dots">
//                           <div className="dot"></div>
//                           <div className="dot"></div>
//                           <div className="dot"></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="Long-button">
//                     <button onClick={handleNextClick} className="form-submit">
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       <StickyWarning />
//     </>
//   );
// };
// export default Kfscompleted;

"use client";
import React, { useState, useEffect, useRef } from "react";
import "./KfsCompleted.css";
import axios from "axios";
import Image from "next/image";
import hdb from "../../../public/Jays/HDB.png";
import { useRouter, useSearchParams } from "next/navigation";
import { Roboto } from "next/font/google";
import Kfs from "../../component/Yubi/newplimages/KFS.png";
import StickyWarning from "../../component/Yubi/StickyWarning";
import CallbackListener from "../CallbackListener";
// import RedirectingPageOnRysa from "./RedirectingPageOnRysa";
import RedirectingPageForAgreeement from "./RedirectingPageForAgreement";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const Kfscompleted = () => {
  const searchParams = useSearchParams();
  const [clientLoanId, setClientLoanId] = useState(null);
  const [statusMessage, setStatusMessage] = useState("KFS Completed");
  const hasLoanAgreementStarted = useRef(false);
  const [isNextClicked, setIsNextClicked] = useState(false);

  useEffect(() => {
    // const loanId = localStorage.getItem("clientLoanId");
    const loanId = searchParams.get("clientLoanId");
    if (loanId) {
      setClientLoanId(loanId);
    } else {
      console.error("❌ Client Loan ID not found in localStorage");
    }
  }, []);

  // if (isNextClicked) {
  //   return <RedirectingPageOnRysa />;
  // }

  const handleNextClick = async () => {
    if (!clientLoanId) {
      console.error("❌ Missing clientLoanId");
      return;
    }

    if (hasLoanAgreementStarted.current) {
      console.warn("⚠️ Loan Agreement already initiated");
      return;
    }

    hasLoanAgreementStarted.current = true;
    setIsNextClicked(true); // 👈 Hides button
    setStatusMessage("Waiting for loan agreement status...");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}generateLoanAgreementDocument`,
        {
          clientLoanId,
        }
      );
      console.log("✅ Loan Agreement API Response:", res.data);
      if (res.data.code === -1) {
        window.location.href = `/yubi/RejectionPage`;
        return;
      }
    } catch (err) {
      console.error("❌ Loan Agreement API error:", err);
      setStatusMessage("Error generating loan agreement");
      setIsNextClicked(false); // 👈 Show again on error (optional)
    }
  };

  // const handleNextClick = () => {
  //   setIsNextClicked(true);
  //   router.push("/yubi/AgreementCompleted"); // ✅ Redirect on Next click
  // };

  return (
    <>
      <CallbackListener
        clientLoanId={clientLoanId}
        onEsignReady={async () => {
          console.log("✅ Loan Agreement doc generated webhook received!");

          // setStatusMessage("Agreement...");

          try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}requestEsign`, {
              clientLoanId,
            });

            console.log("✅ eSign API Response:", res.data);

            if (res.data.code === -1) {
              window.location.href = `/yubi/RejectionPage`;
              return;
            }

            const redirectUrl = res.data?.obj;
            if (redirectUrl) {
              window.location.href = redirectUrl;
            } else {
              console.error("❌ No redirect URL in eSign response");
            }
          } catch (err) {
            console.error("❌ eSign API error:", err);
          }
        }}
      />
      {isNextClicked ? (
        <RedirectingPageForAgreeement />
      ) : (
        <div className={`${roboto.className} pageContainerloanpage`}>
          <div className="loan-block">
            <div className="loan-head">
              <div className="hdb-logo">
                <Image
                  src={hdb}
                  alt="Hdb tag"
                  style={{
                    alignContent: "center",
                    width: "auto",
                    height: "auto",
                  }}
                />
              </div>
            </div>
            <div className="cardForm-loan">
              <div className="content-loan">
                <div className="formloanpage">
                  <div className="sign-txt">
                    <div className="kfs-icon-container">
                      <div className="kfs-circle-bg"></div>
                      <div
                        style={{
                          width: "100px",
                          height: "100px",
                          background:
                            "linear-gradient(45deg, #6039D2, #8B5FD6)",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "36px",
                          fontWeight: "bold",
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        📄
                      </div>
                    </div>
                  </div>

                  <div className="status-container">
                    <div className="status-row">
                      <div className="status-icon status-completed">✓</div>
                      <div className="status-text status-completed-text">
                        KFS Completed
                      </div>
                    </div>

                    <div className="status-row">
                      <div className="status-icon status-pending">📋</div>
                      <div className="status-text status-pending-text">
                        Agreement
                        <div className="blinking-dots">
                          <div className="dot"></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="Long-button">
                    <button onClick={handleNextClick} className="form-submit">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <StickyWarning />
    </>
  );
};
export default Kfscompleted;