"use client";
import React, { useState, useRef, useCallback, useContext, useEffect } from "react";
import styles from "./RedirectingLoader.module.css";
import { Outfit } from 'next/font/google';

const roboto = Outfit({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const RedirectingLoader = () => {
  // const [seconds, setSeconds] = useState(60);
  //   const [showFact, setShowFact] = useState(false);
  //   const [showFactText, setShowFactText] = useState(false);
  
  //   useEffect(() => {
  //     // Timer countdown - 60 seconds to 0
  //     const timer = setInterval(() => {
  //       setSeconds((prev) => {
  //         if (prev <= 1) {
  //           // clearInterval(timer);
  //           return 60;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);
  
  //     // Show fun fact after 5 seconds (bottom to top animation)
  //     const factTimer = setTimeout(() => {
  //       setShowFact(true);
  //     }, 1000);
  
  //     // Show paragraph text 2 seconds after fun fact title
  //     const factTextTimer = setTimeout(() => {
  //       setShowFactText(true);
  //     }, 1000); // 5 seconds + 2 seconds = 7 seconds
  
  //     return () => {
  //       clearInterval(timer);
  //       clearTimeout(factTimer);
  //       clearTimeout(factTextTimer);
  //     };
  //   }, []);
  
  //   // Calculate rotation angle for the sun (clockwise: 0-360 degrees)
  //   const sunRotation = ((60 - seconds) / 60) * 360; // 720 1080
  
  //   // Calculate stroke dash offset for circular progress (clockwise)
  //   const radius = 90;
  //   const circumference = 2 * Math.PI * radius;
  //   const strokeDashoffset = circumference * (seconds / 60); //20 30
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
    //  <div className={`${styles.loaderContainer} Outfit`}>
    //   <div className={styles.content}>
    //     <h1 className={styles.title}>Please wait</h1>
    //     <p className={styles.subtitle}>
    //       We are processing your
    //       <br />
    //       best investment in you...
    //     </p>

    //     <div className={styles.timerWrapper}>
    //       {/* Purple gradient background with pulse animation */}
    //       <div className={styles.purpleGlow}></div>

    //       {/* Rotating sun circle - moves clockwise */}
    //       <div
    //         className={styles.sunGlow}
    //         style={{
    //           transform: `rotate(${sunRotation}deg)`,
    //           transition: "transform 1s linear",
    //         }}
    //       ></div>

    //       {/* Timer circle with animated border (clockwise) */}
    //       <div className={styles.timerCircle}>
    //         <svg className={styles.progressRing} width="200" height="200">
    //           {/* Background circle - static */}
    //           <circle
    //             stroke="rgba(255, 255, 255, 0.3)"
    //             strokeWidth="2"
    //             fill="transparent"
    //             r={radius}
    //             cx="100"
    //             cy="100"
    //           />
    //           {/* Progress circle - moves clockwise */}
    //           <circle
    //             className={styles.progressRingCircle}
    //             stroke="white"
    //             strokeWidth="3"
    //             fill="transparent"
    //             r={radius}
    //             cx="100"
    //             cy="100"
    //             style={{
    //               strokeDasharray: circumference,
    //               strokeDashoffset: strokeDashoffset,
    //             }}
    //           />
    //         </svg>
    //         {/* <div className={styles.timerText}>
    //           <div className={styles.secondsNumber}>{seconds}</div>
    //           <div className={styles.secondsLabel}>seconds</div>
    //         </div> */}
    //       </div>
    //     </div>

    //     {/* Fun fact sliding from bottom to top */}
    //     <div>
    //       <div
    //         className={`${styles.factContainer} ${
    //           showFact ? styles.factVisible : ""
    //         }`}
    //       >
    //         <p className={styles.factTitle}>Here is a fun fact:</p>
    //       </div>

    //       <div
    //         className={`${styles.factContainer} ${
    //           showFactText ? styles.factVisible : ""
    //         }`}
    //       >
    //         <p className={styles.factText}>
    //           {/* A Red Door Can Mean a Paid-Off Mortgage:
    //           <br />
    //           In Scotland, a tradition exists where painting
    //           <br />
    //           ones&#39; front door red signifies that the
    //           <br />
    //           homeowner has fully paid off their mortgage. */}
    //           Smooth disbursal means money reaches you <br />quicker than relatives at a wedding buffet.
    //         </p>
    //       </div>
    //       {/* <div className={styles.btnDiv}>
    //         <button
    //           type="submit"
    //           className={styles.btn}
    //           // onClick={() => handleButtonClick()}
    //         >
    //           Next
    //         </button>
    //       </div> */}
    //     </div>
    //   </div>
    // </div>
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
              Smooth disbursal means money reaches you <br />quicker than relatives at a wedding buffet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedirectingLoader;