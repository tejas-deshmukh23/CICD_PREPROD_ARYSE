"use client";
import React, { useState, useEffect } from "react";
import "./KfsCompleted.css";
import axios from "axios";
import Image from "next/image";
import hdb from "../../../public/Jays/HDB.png";
import { useRouter, useSearchParams } from "next/navigation";
import { Roboto } from "next/font/google";
import Mandate from "../../component/Yubi/newplimages/Mandate.png";
import StickyWarning from "../../component/Yubi/StickyWarning";
import CallbackListener from "../CallbackListener";
// import WaitingPageforBankdetails from "./WaitingPageforBankdetails";
import WaitingPageAfterMandate from "./WaitingPageAfterMandate";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const Mandatecompleted = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientLoanId = searchParams.get("cid");

  const [isNextClicked, setIsNextClicked] = useState(false);

  useEffect(() => {
    // These are assumed to be true since the user is on the mandate page
    localStorage.setItem("loanStatusWebhookReceived", "true");
    localStorage.setItem("finalSanctionWebhookReceived", "true");
    localStorage.setItem("esignCallbackReceived", "true");

    console.log("✅ Mandate page loaded — fallback flags set in localStorage");
  }, []);

  const handleNextClick = async () => {
    setIsNextClicked(true);
    try {
      // const clientLoanId = localStorage.getItem("clientLoanId"); // ensure it's already stored

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}getMandateStatus`,
        { clientLoanId } // backend expects JSON payload
      );

      console.log("response is:", response);

      if (response.data.code === -1) {
        window.location.href = `/yubi/RejectionPage`;
        return;
      }
      const redirectUrl = response?.data?.code;
      if (redirectUrl == 0) {
        const response2 = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}agreementSigned`,
          { clientLoanId } // backend expects JSON payload
        );

        if (response2.data.code === -1) {
          window.location.href = `/yubi/RejectionPage`;
          return;
        }
      } else {
        alert("Mandate initiation failed.");
      }
    } catch (error) {
      console.error("Error initiating mandate:", error);
      alert("Something went wrong during mandate registration.");
    }
  };

  // const handleNextClick = () => {
  //   router.push("/yubi/SubmitePage"); // 👈 Update with your actual route
  // };

  return (
    <>
      <CallbackListener
        clientLoanId={clientLoanId}
        onFinalSanctionReady={() => {
          console.log("🌟 Final sanction ready! Redirecting...");
          router.push("/SuccessPage");
        }}
      />
      {isNextClicked ? (
        <WaitingPageAfterMandate />
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
                      <div className="status-icon status-completed">✓</div>
                      <div className="status-text status-completed-text">
                        Agreement Completed
                      </div>
                    </div>

                    <div className="status-row">
                      <div className="status-icon status-completed">✓</div>
                      <div className="status-text status-completed-text">
                        Mandate Completed
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
export default Mandatecompleted;
