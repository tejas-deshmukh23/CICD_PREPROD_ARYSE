"use client";
import React, { useState, useEffect } from "react";
import "./KfsCompleted.css";
import axios from "axios";
import Image from "next/image";
import hdb from "../../../public/Jays/HDB.png";
import { useRouter, useSearchParams } from "next/navigation";
import { Roboto } from "next/font/google";
import Agreement from "../../component/Yubi/newplimages/Agreement.png";
import StickyWarning from "../../component/Yubi/StickyWarning";
import RedirectingPageForMandate from "./RedirectingPageForMandate";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const Agreementcompleted = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientLoanId = searchParams.get("cid");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleNextClick = async () => {
    try {
      // const clientLoanId = localStorage.getItem("clientLoanId"); // ensure it's already stored

      setIsRedirecting(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}registerMandate`,
        { clientLoanId } // backend expects JSON payload
      );

      if (response.data.code === -1) {
        window.location.href = `/yubi/RejectionPage`;
        return;
      }

      const redirectUrl = response?.data?.obj;
      if (redirectUrl) {
        window.location.href = redirectUrl; // redirect to mandate page
      } else {
        alert("Mandate initiation failed.");
        setIsRedirecting(false);
      }
    } catch (error) {
      console.error("Error initiating mandate:", error);
      alert("Something went wrong during mandate registration.");
    }
  };

  if (isRedirecting) {
    return <RedirectingPageForMandate />; // 👈 Show your redirect page here
  }

  // const handleNextClick = () => {
  //   router.push("/yubi/MandateCompleted"); // 👈 Update with your actual route
  // };

  return (
    <>
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
                        background: "linear-gradient(45deg, #6039D2, #8B5FD6)",
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
                    <div className="status-icon status-completed">✓</div>
                    <div className="status-text status-completed-text">
                      Agreement Completed
                    </div>
                  </div>

                  <div className="status-row">
                    <div className="status-icon status-pending">📋</div>
                    <div className="status-text status-pending-text">
                      Mandate
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
      <StickyWarning />
    </>
  );
};
export default Agreementcompleted;
