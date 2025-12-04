"use client";
import React, { useState, useEffect } from "react";
import styles from "./lastAnimatinpagenew.module.css";
import Image from "next/image";

function LastAnimatinpage() {
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    // Stage 0: Initial state
    // Stage 1: Star moves to center (after 500ms)
    // Stage 2: Circle animation starts (after 2000ms)
    // Stage 3: Show congratulations (after 2800ms)
    
    const timer1 = setTimeout(() => setAnimationStage(1), 500);
    const timer2 = setTimeout(() => setAnimationStage(2), 2500);
    const timer3 = setTimeout(() => setAnimationStage(3), 3300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <>
    <div className={styles.pageCenterWrapper}>
      <div className={`${styles.container} ${animationStage >= 2 ? styles.shrinkCircle : ''}`}>
        {/* squre star */}
        <div>
          <div className={styles.squreStar1}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#B499FF"
                d="
      M8 0
      Q8.6 0 9.1 0.5
      L15.5 6.9
      Q16 7.4 16 8
      Q16 8.6 15.5 9.1
      L9.1 15.5
      Q8.6 16 8 16
      Q7.4 16 6.9 15.5
      L0.5 9.1
      Q0 8.6 0 8
      Q0 7.4 0.5 6.9
      L6.9 0.5
      Q7.4 0 8 0
    "
              />
            </svg>
          </div>
          <div className={styles.squreStar2}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#B499FF"
                d="
      M8 0
      Q8.6 0 9.1 0.5
      L15.5 6.9
      Q16 7.4 16 8
      Q16 8.6 15.5 9.1
      L9.1 15.5
      Q8.6 16 8 16
      Q7.4 16 6.9 15.5
      L0.5 9.1
      Q0 8.6 0 8
      Q0 7.4 0.5 6.9
      L6.9 0.5
      Q7.4 0 8 0
    "
              />
            </svg>
          </div>

          <div className={styles.squreStar3}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#B499FF"
                d="
      M8 0
      Q8.6 0 9.1 0.5
      L15.5 6.9
      Q16 7.4 16 8
      Q16 8.6 15.5 9.1
      L9.1 15.5
      Q8.6 16 8 16
      Q7.4 16 6.9 15.5
      L0.5 9.1
      Q0 8.6 0 8
      Q0 7.4 0.5 6.9
      L6.9 0.5
      Q7.4 0 8 0
    "
              />
            </svg>
          </div>

          <div className={styles.squreStar4}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#B499FF"
                d="
      M8 0
      Q8.6 0 9.1 0.5
      L15.5 6.9
      Q16 7.4 16 8
      Q16 8.6 15.5 9.1
      L9.1 15.5
      Q8.6 16 8 16
      Q7.4 16 6.9 15.5
      L0.5 9.1
      Q0 8.6 0 8
      Q0 7.4 0.5 6.9
      L6.9 0.5
      Q7.4 0 8 0
    "
              />
            </svg>
          </div>

          <div className={styles.squreStar5}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#B499FF"
                d="
      M8 0
      Q8.6 0 9.1 0.5
      L15.5 6.9
      Q16 7.4 16 8
      Q16 8.6 15.5 9.1
      L9.1 15.5
      Q8.6 16 8 16
      Q7.4 16 6.9 15.5
      L0.5 9.1
      Q0 8.6 0 8
      Q0 7.4 0.5 6.9
      L6.9 0.5
      Q7.4 0 8 0
    "
              />
            </svg>
          </div>

          <div className={styles.squreStar6}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#B499FF"
                d="
      M8 0
      Q8.6 0 9.1 0.5
      L15.5 6.9
      Q16 7.4 16 8
      Q16 8.6 15.5 9.1
      L9.1 15.5
      Q8.6 16 8 16
      Q7.4 16 6.9 15.5
      L0.5 9.1
      Q0 8.6 0 8
      Q0 7.4 0.5 6.9
      L6.9 0.5
      Q7.4 0 8 0
    "
              />
            </svg>
          </div>

          <div className={styles.squreStar7}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#B499FF"
                d="
      M8 0
      Q8.6 0 9.1 0.5
      L15.5 6.9
      Q16 7.4 16 8
      Q16 8.6 15.5 9.1
      L9.1 15.5
      Q8.6 16 8 16
      Q7.4 16 6.9 15.5
      L0.5 9.1
      Q0 8.6 0 8
      Q0 7.4 0.5 6.9
      L6.9 0.5
      Q7.4 0 8 0
    "
              />
            </svg>
          </div>
          <div className={styles.squreStar8}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#B499FF"
                d="
      M8 0
      Q8.6 0 9.1 0.5
      L15.5 6.9
      Q16 7.4 16 8
      Q16 8.6 15.5 9.1
      L9.1 15.5
      Q8.6 16 8 16
      Q7.4 16 6.9 15.5
      L0.5 9.1
      Q0 8.6 0 8
      Q0 7.4 0.5 6.9
      L6.9 0.5
      Q7.4 0 8 0
    "
              />
            </svg>
          </div>
          <div className={styles.squreStar9}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#B499FF"
                d="
      M8 0
      Q8.6 0 9.1 0.5
      L15.5 6.9
      Q16 7.4 16 8
      Q16 8.6 15.5 9.1
      L9.1 15.5
      Q8.6 16 8 16
      Q7.4 16 6.9 15.5
      L0.5 9.1
      Q0 8.6 0 8
      Q0 7.4 0.5 6.9
      L6.9 0.5
      Q7.4 0 8 0
    "
              />
            </svg>
          </div>
        </div>
        
        {/* star */}
        <div>
          <div className={styles.smallStar1}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="white"
                d="
      M50 0
      C58 12, 66 24, 70 35
      C82 40, 94 45, 100 50
      C94 55, 82 60, 70 65
      C66 76, 58 88, 50 100
      C42 88, 34 76, 30 65
      C18 60, 6 55, 0 50
      C6 45, 18 40, 30 35
      C34 24, 42 12, 50 0
      Z
    "
              />
            </svg>
          </div>
          <div className={styles.smallStar2}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="white"
                d="
      M50 0
      C58 12, 66 24, 70 35
      C82 40, 94 45, 100 50
      C94 55, 82 60, 70 65
      C66 76, 58 88, 50 100
      C42 88, 34 76, 30 65
      C18 60, 6 55, 0 50
      C6 45, 18 40, 30 35
      C34 24, 42 12, 50 0
      Z
    "
              />
            </svg>
          </div>
          <div className={styles.smallStar3}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="white"
                d="
      M50 0
      C58 12, 66 24, 70 35
      C82 40, 94 45, 100 50
      C94 55, 82 60, 70 65
      C66 76, 58 88, 50 100
      C42 88, 34 76, 30 65
      C18 60, 6 55, 0 50
      C6 45, 18 40, 30 35
      C34 24, 42 12, 50 0
      Z
    "
              />
            </svg>
          </div>
          <div className={styles.smallStar4}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="white"
                d="
      M50 0
      C58 12, 66 24, 70 35
      C82 40, 94 45, 100 50
      C94 55, 82 60, 70 65
      C66 76, 58 88, 50 100
      C42 88, 34 76, 30 65
      C18 60, 6 55, 0 50
      C6 45, 18 40, 30 35
      C34 24, 42 12, 50 0
      Z
    "
              />
            </svg>
          </div>
          <div className={styles.smallStar5}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="white"
                d="
      M50 0
      C58 12, 66 24, 70 35
      C82 40, 94 45, 100 50
      C94 55, 82 60, 70 65
      C66 76, 58 88, 50 100
      C42 88, 34 76, 30 65
      C18 60, 6 55, 0 50
      C6 45, 18 40, 30 35
      C34 24, 42 12, 50 0
      Z
    "
              />
            </svg>
          </div>
        </div>

        {/* white line */}
        <div>
          <div className={styles.whiteLines1}></div>
          <div className={styles.whiteLines2}></div>
          <div className={styles.whiteLines3}></div>
        </div>

        {/* big star */}
        <div className={`${styles.starDiv} ${animationStage >= 1 ? styles.moveToCenter : ''}`}>
          <div className={styles.innerstarDiv}>
            <Image
              src="/starImage.png"
              alt="star image"
              width={300}
              height={300}
              className={styles.star}
            />
            <div className={`${styles.whiteStarLines} ${animationStage >= 1 ? styles.growLine : ''}`}></div>
            <div className={styles.smallStarbottom}>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="white"
                  d="
      M50 0
      C58 12, 66 24, 70 35
      C82 40, 94 45, 100 50
      C94 55, 82 60, 70 65
      C66 76, 58 88, 50 100
      C42 88, 34 76, 30 65
      C18 60, 6 55, 0 50
      C6 45, 18 40, 30 35
      C34 24, 42 12, 50 0
      Z
    "
                />
              </svg>
            </div>
            <div className={styles.squreStarBottom1}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path
                  fill="#B499FF"
                  d="
      M8 0
      Q8.6 0 9.1 0.5
      L15.5 6.9
      Q16 7.4 16 8
      Q16 8.6 15.5 9.1
      L9.1 15.5
      Q8.6 16 8 16
      Q7.4 16 6.9 15.5
      L0.5 9.1
      Q0 8.6 0 8
      Q0 7.4 0.5 6.9
      L6.9 0.5
      Q7.4 0 8 0
    "
                />
              </svg>
            </div>
            <div className={styles.squreStarBottom2}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path
                  fill="#B499FF"
                  d="
      M8 0
      Q8.6 0 9.1 0.5
      L15.5 6.9
      Q16 7.4 16 8
      Q16 8.6 15.5 9.1
      L9.1 15.5
      Q8.6 16 8 16
      Q7.4 16 6.9 15.5
      L0.5 9.1
      Q0 8.6 0 8
      Q0 7.4 0.5 6.9
      L6.9 0.5
      Q7.4 0 8 0
    "
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Congratulations Screen */}
      <div className={`${styles.congratsScreen} ${animationStage >= 3 ? styles.showCongrats : ''}`}>
        <div className={styles.congratsContent}>
          <h1 className={styles.congratsTitle}>Congratulations</h1>
          <p className={styles.congratsText}>You have made the best</p>
          <p className={styles.congratsText}>investment in you! Enjoy it.</p>
        </div>
      </div>
      </div>
    </>
  );
}

export default LastAnimatinpage;