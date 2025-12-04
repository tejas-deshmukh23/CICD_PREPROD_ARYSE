"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from './SmsWaiting.module.css';
import { Roboto } from "next/font/google";
import { useSearchParams, useRouter } from "next/navigation";
import CallbackListener from "../CallbackListener";
import axios from "axios";
import StickyWarning from "../../component/Yubi/StickyWarning";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const SMSWaiting = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const clientLoanId = searchParams.get("clientLoanId") || "";

  const callbackReceivedRef = useRef(false);
  const hasCalledApi = useRef(false);
  const timerRef = useRef(null);

  const [mobile, setMobile] = useState("");

  // ✅ Step 1: Fetch mobile + generate KFS only once
  useEffect(() => {
    if (!clientLoanId || hasCalledApi.current) return;
    hasCalledApi.current = true;

    const fetchMobile = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}getMobileByClientLoanId`,
          { params: { clientLoanId } }
        );
        if (res.data) {
          console.log("📱 Got mobile from backend:", res.data);
          setMobile(res.data);
        }
      } catch (err) {
        console.error("❌ Error fetching mobile:", err);
      }
    };

    const generateKfs = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}generateKfsDocument`,
          { clientLoanId }
        );
        console.log("✅ generateKfsDocument:", res.data);
        if (res.data.code === -1) {
          router.push(`/yubi/RejectionPage`);
          return;
        }
      } catch (err) {
        console.error("❌ generateKfsDocument error:", err);
      }
    };

    fetchMobile();
    generateKfs();
  }, [clientLoanId]);

  // ✅ Step 2: Start fallback timer only when mobile is available and callback not received
  useEffect(() => {
    if (!mobile) return;

    timerRef.current = setTimeout(() => {
      if (!callbackReceivedRef.current) {
        console.log("⏱️ 5 minutes passed. Sending fallback SMS...");
        axios
          .get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}h5/sms_pl_journey`, {
            params: {
              phone: mobile,
              dsa: "214394238",
            },
          })
          .then((res) => {
            console.log("✅ Fallback SMS sent:", res.data);
          })
          .catch((err) => {
            console.error("❌ Fallback SMS error:", err);
          });
      } else {
        console.log("✅ Callback received. No SMS needed.");
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearTimeout(timerRef.current);
  }, [mobile]);

  // ✅ Callback from WebSocket
  const handleCallback = () => {
    callbackReceivedRef.current = true;
    clearTimeout(timerRef.current); // stop the fallback
    console.log("✅ Moving to Loan Agreement Waiting Page");
    router.push(`/yubi/Waitingpageloanagreement?clientLoanId=${clientLoanId}`);
  };
   // new11
  const [showFact, setShowFact] = useState(false);
  const [showFactText, setShowFactText] = useState(false);

  useEffect(() => {
    // Show fun fact title at 5 sec
    const factTimer = setTimeout(() => {
      setShowFact(true);
    }, 1000);

    // Show fun fact text at 7 sec
    const factTextTimer = setTimeout(() => {
      setShowFactText(true);
    }, 3000);

    return () => {
      clearTimeout(factTimer);
      clearTimeout(factTextTimer);
    };
  }, []);

  return (
    <>
      {/* <div className={`${roboto.className} sms-container`}>
        <div className="sms-content">
          <div className="loading-circle">
            <svg className="hourglass-icon" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z"
                fill="#6039D2"
                stroke="#6039D2"
                strokeWidth="2.5"
              />
            </svg>
          </div>

          <h1
            style={{ fontSize: "22px", color: "#777777", textAlign: "center" }}
          >
            <b>Please Approve Offer Details</b>
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#777777",
              textAlign: "center",
              padding: "10px",
            }}
          >
            We have sent you a link via SMS.
            <br />
            Please open the link and give your consent to proceed.
          </p>
        </div>
        <CallbackListener
          clientLoanId={clientLoanId}
          onLoanAgreementReady={() => {
            console.log("📞 handleCallback triggered from CallbackListener");
            handleCallback();
          }}
        />
      </div>
      <StickyWarning /> */}
      <div className={styles.loaderContainer}>
      <div className={styles.content}>
        <h1 className={styles.title}>Please wait</h1>
        <p className={styles.subtitle}>
          We are processing your
          <br />
          best investment in you...
        </p>

        <div className={styles.timerWrapper}>
          {/* Purple gradient background with pulse animation */}
          <div className={styles.purpleGlow}></div>

          {/* Rotating sun circle - moves clockwise INFINITE LOOP */}
          <div className={styles.sunGlow}></div>

          {/* Timer circle with animated border (clockwise) */}
          <div className={styles.timerCircle}>
            <svg className={styles.progressRing} width="200" height="200">
              {/* Background circle - thin white line (patli line) */}
              <circle
                className={styles.progressRingBg}
                r="90"
                cx="100"
                cy="100"
                fill="none"
                stroke="white"
              />
              <circle
                className={styles.progressRingCircle}
                r="90"
                cx="100"
                cy="100"
                fill="none"
                stroke="white"
                strokeWidth="3"
              />
            </svg>
            <div className={styles.timerText}>
              {/* <div className={styles.secondsNumber}></div> */}
              {/* <div className={styles.secondsLabel}>seconds</div> */}
            </div>
          </div>
        </div>

        {/* Fun fact sliding from bottom to top */}
        <div>
          <div
            className={`${styles.factContainer} ${
              showFact ? styles.factVisible : ""
            }`}
          >
            <p className={styles.factTitle}>
              <span>Please Approve Offer Details</span>
              <br/><br/>We have sent you a link via SMS.<br/>
Please open the link and give your consent to proceed.</p>
          </div>

          <div
            className={`${styles.factContainer} ${
              showFactText ? styles.factVisible : ""
            }`}
          >
            <p className={styles.factText}>
              Please do not press the back button or refresh the page
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SMSWaiting;
