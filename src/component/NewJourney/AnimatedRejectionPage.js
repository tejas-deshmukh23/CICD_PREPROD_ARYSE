"use client";
import React, { useState, useEffect } from "react";
import styles from "./AnimatedRejectionPage.module.css";
import Image from "next/image";

function LastAnimatinpage() {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    // Step 0: Show full purple screen (1.5 seconds)
    const timer1 = setTimeout(() => setAnimationStep(1), 1500);

    // Step 1: Star moves up from bottom (2.5 seconds)
    const timer2 = setTimeout(() => setAnimationStep(2), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className={styles.mainWrapper}>
      {/* Background layer - changes color after animation */}
      <div
        className={`${styles.backgroundLayer} ${
          animationStep >= 2 ? styles.backgroundVisible : ""
        }`}
      />

      {/* Main container that shrinks */}
      <div
        className={`${styles.container} ${
          animationStep >= 2 ? styles.shrinkToCircle : ""
        }`}
      >
        {/* Multiple falling lines */}
        <div className={styles.linesWrapper}>
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} className={styles.lineDrop}></div>
          ))}
        </div>

        {/* big star - with animation */}
        <div
          className={`${styles.mojiDiv} ${
            animationStep >= 1 ? styles.mojiMoveUp : ""
          }`}
        >
          <div className={styles.innermojiDiv}>
            <Image
              src="/sadEmoji.png"
              alt="sad emoji image"
              width={200}
              height={200}
              className={styles.moji}
            />
          </div>
        </div>
      </div>

      {/* Congratulations Text - appears after shrink */}
      <div
        className={`${styles.sadText} ${
          animationStep >= 2 ? styles.sadVisible : ""
        }`}
      >
        <h2 className={styles.sadTitle}>Oop&rsquo;s sorry!</h2>
        <p className={styles.sadSubtitle}>
          Your loan application <br/>could not be approved..
        </p>
        <p className={styles.lasstMessage}>But don&rsquo;t worry - you can still explore offers<br/> from other trusted partners.</p>
        <div className={styles.buttonWrapper}>
          <button className={styles.btnOffer}>Check offers</button>
        </div>
      </div>
    </div>
  );
}

export default LastAnimatinpage;
