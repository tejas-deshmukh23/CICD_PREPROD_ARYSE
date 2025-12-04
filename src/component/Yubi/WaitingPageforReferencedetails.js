"use client";
import React from "react";
import { useState, useEffect } from "react";
import styles from "./WaitingPageforReferencedetails.module.css";
import { Roboto } from "next/font/google";
import StickyWarning from "../../component/Yubi/StickyWarning";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const WaitingPageforReferencedetails = () => {
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
    {/* <div className={`${roboto.className} waiting-container`}>
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
      <h1 style={{fontSize:'22px',color:'#777777',textAlign:'center'}}>
          <b>Generating Final Offer...</b>
        </h1>
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
            <p className={styles.factTitle}>Generating Final Offer...</p>
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

export default WaitingPageforReferencedetails;