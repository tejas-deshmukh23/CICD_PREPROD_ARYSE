"use client";
import React, { useState, useEffect } from 'react';
import styles from './AnimationLoadingpage.module.css';

const AnimationLoadingpage = () => {
  const [seconds, setSeconds] = useState(60);
  const [showFact, setShowFact] = useState(false);
  const [showFactText, setShowFactText] = useState(false);

  useEffect(() => {
    // Timer countdown - 60 seconds to 0
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Show fun fact after 5 seconds (bottom to top animation)
    const factTimer = setTimeout(() => {
      setShowFact(true);
    }, 5000);

    // Show paragraph text 2 seconds after fun fact title
    const factTextTimer = setTimeout(() => {
      setShowFactText(true);
    }, 7000); // 5 seconds + 2 seconds = 7 seconds

    return () => {
      clearInterval(timer);
      clearTimeout(factTimer);
      clearTimeout(factTextTimer);
    };
  }, []);

  // Calculate rotation angle for the sun (clockwise: 0-360 degrees)
  const sunRotation = ((60 - seconds) / 60) * 360;

  // Calculate stroke dash offset for circular progress (clockwise)
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (seconds / 60);

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
          
          {/* Rotating sun circle - moves clockwise */}
          <div 
            className={styles.sunGlow} 
            style={{ 
              transform: `rotate(${sunRotation}deg)`,
              transition: 'transform 1s linear'
            }}
          ></div>

          {/* Timer circle with animated border (clockwise) */}
          <div className={styles.timerCircle}>
            <svg className={styles.progressRing} width="200" height="200">
              {/* Background circle - static */}
              <circle
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="2"
                fill="transparent"
                r={radius}
                cx="100"
                cy="100"
              />
              {/* Progress circle - moves clockwise */}
              <circle
                className={styles.progressRingCircle}
                stroke="white"
                strokeWidth="3"
                fill="transparent"
                r={radius}
                cx="100"
                cy="100"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                }}
              />
            </svg>
            <div className={styles.timerText}>
              <div className={styles.secondsNumber}>{seconds}</div>
              <div className={styles.secondsLabel}>seconds</div>
            </div>
          </div>
        </div>

        {/* Fun fact sliding from bottom to top */}
        <div>
          <div className={`${styles.factContainer} ${showFact ? styles.factVisible : ''}`}>
            <p className={styles.factTitle}>Here is a fun fact:</p>
          </div>
          
          <div className={`${styles.factContainer} ${showFactText ? styles.factVisible : ''}`}>
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