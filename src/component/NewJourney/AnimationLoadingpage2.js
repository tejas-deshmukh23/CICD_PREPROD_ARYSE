"use client";
import React, { useState, useEffect } from "react";
import styles from "./AnimationLoadingpage2.module.css";

const AnimationLoadingpage = () => {
  const [showFact, setShowFact] = useState(false);
  const [showFactText, setShowFactText] = useState(false);

  useEffect(() => {
    // Show fun fact title at 5 sec
    const factTimer = setTimeout(() => {
      setShowFact(true);
    }, 5000);

    // Show fun fact text at 7 sec
    const factTextTimer = setTimeout(() => {
      setShowFactText(true);
    }, 7000);

    return () => {
      clearTimeout(factTimer);
      clearTimeout(factTextTimer);
    };
  }, []);


  return (
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
            <p className={styles.factTitle}>Here is a fun fact:</p>
          </div>

          <div
            className={`${styles.factContainer} ${
              showFactText ? styles.factVisible : ""
            }`}
          >
            <p className={styles.factText}>
              A Red Door Can Mean a Paid-Off Mortgage:
              <br />
              In Scotland, a tradition exists where painting
              <br />
              ones&#39; front door red signifies that the
              <br />
              homeowner has fully paid off their mortgage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationLoadingpage;
