'use client';
import React, { useEffect, useState, useContext } from 'react';
import styles from './SubmitPageNew.module.css';
import confetti from 'canvas-confetti';
import Image from 'next/image';
import SelectedLenderContext from "./context/SelectedLenderContext";

export default function SubmitPage() {
  const [refNo, setRefNo] = useState('');
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');

  useEffect(() => {
    //  Confetti animation
    // confetti({
    //   particleCount: 200,
    //   spread: 50,
    //   origin: { y: 0.6 }
    // });

    // 🟩 Simulate backend fetch (you can replace with fetch/axios)
    const fetchData = async () => {
      const data = {
        ref: 'D1102345',
        amount: '50000',
        accountNumber: '1298656789'
      };

      setRefNo(data.ref);
      setAmount(data.amount);
      setAccount(maskAccount(data.accountNumber));
    };

    fetchData();
  }, []);

  // ✅ Mask account number: show first 2 and last 4 digits only
  const maskAccount = (accNum) => {
    if (!accNum || accNum.length < 6) return accNum;
    const first2 = accNum.slice(0, 2);
    const last4 = accNum.slice(-4);
    return `${first2}XX${last4}`;
  };

  const { SelectedLenderData, setSelectedLenderData } = useContext(SelectedLenderContext);//added this to send the product name from this data to init api for saving logger

  useEffect(()=>{
    console.log("The selected lender data in submitpage is : ",SelectedLenderData);
  },[])

  // effect function 
    const [animationStep, setAnimationStep] = useState(0);
  
    useEffect(() => {
      // Step 0: Show full purple screen (1.5 seconds)
      const timer1 = setTimeout(() => setAnimationStep(1), 1500);
      
      // Step 1: Star moves up from bottom (2.5 seconds)
      const timer2 = setTimeout(() => setAnimationStep(2), 4000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }, []);
  return (
    <div className={styles.mainWrapper}>
      {/* Background layer - changes color after animation */}
      <div className={`${styles.backgroundLayer} ${animationStep >= 2 ? styles.backgroundVisible : ''}`} />
      
      {/* Main container that shrinks */}
      <div className={`${styles.container} ${animationStep >= 2 ? styles.shrinkToCircle : ''}`}>
        {/* square star */}
        <div>
          <div className={styles.squreStar1}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#B499FF"
                d="M8 0 Q8.6 0 9.1 0.5 L15.5 6.9 Q16 7.4 16 8 Q16 8.6 15.5 9.1 L9.1 15.5 Q8.6 16 8 16 Q7.4 16 6.9 15.5 L0.5 9.1 Q0 8.6 0 8 Q0 7.4 0.5 6.9 L6.9 0.5 Q7.4 0 8 0"
              />
            </svg>
          </div>
          <div className={styles.squreStar2}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#B499FF"
                d="M8 0 Q8.6 0 9.1 0.5 L15.5 6.9 Q16 7.4 16 8 Q16 8.6 15.5 9.1 L9.1 15.5 Q8.6 16 8 16 Q7.4 16 6.9 15.5 L0.5 9.1 Q0 8.6 0 8 Q0 7.4 0.5 6.9 L6.9 0.5 Q7.4 0 8 0"
              />
            </svg>
          </div>
          <div className={styles.squreStar3}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#B499FF"
                d="M8 0 Q8.6 0 9.1 0.5 L15.5 6.9 Q16 7.4 16 8 Q16 8.6 15.5 9.1 L9.1 15.5 Q8.6 16 8 16 Q7.4 16 6.9 15.5 L0.5 9.1 Q0 8.6 0 8 Q0 7.4 0.5 6.9 L6.9 0.5 Q7.4 0 8 0"
              />
            </svg>
          </div>
          <div className={styles.squreStar4}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#B499FF"
                d="M8 0 Q8.6 0 9.1 0.5 L15.5 6.9 Q16 7.4 16 8 Q16 8.6 15.5 9.1 L9.1 15.5 Q8.6 16 8 16 Q7.4 16 6.9 15.5 L0.5 9.1 Q0 8.6 0 8 Q0 7.4 0.5 6.9 L6.9 0.5 Q7.4 0 8 0"
              />
            </svg>
          </div>
          <div className={styles.squreStar5}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#B499FF"
                d="M8 0 Q8.6 0 9.1 0.5 L15.5 6.9 Q16 7.4 16 8 Q16 8.6 15.5 9.1 L9.1 15.5 Q8.6 16 8 16 Q7.4 16 6.9 15.5 L0.5 9.1 Q0 8.6 0 8 Q0 7.4 0.5 6.9 L6.9 0.5 Q7.4 0 8 0"
              />
            </svg>
          </div>
          <div className={styles.squreStar6}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#B499FF"
                d="M8 0 Q8.6 0 9.1 0.5 L15.5 6.9 Q16 7.4 16 8 Q16 8.6 15.5 9.1 L9.1 15.5 Q8.6 16 8 16 Q7.4 16 6.9 15.5 L0.5 9.1 Q0 8.6 0 8 Q0 7.4 0.5 6.9 L6.9 0.5 Q7.4 0 8 0"
              />
            </svg>
          </div>
          <div className={styles.squreStar7}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#B499FF"
                d="M8 0 Q8.6 0 9.1 0.5 L15.5 6.9 Q16 7.4 16 8 Q16 8.6 15.5 9.1 L9.1 15.5 Q8.6 16 8 16 Q7.4 16 6.9 15.5 L0.5 9.1 Q0 8.6 0 8 Q0 7.4 0.5 6.9 L6.9 0.5 Q7.4 0 8 0"
              />
            </svg>
          </div>
          <div className={styles.squreStar8}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#B499FF"
                d="M8 0 Q8.6 0 9.1 0.5 L15.5 6.9 Q16 7.4 16 8 Q16 8.6 15.5 9.1 L9.1 15.5 Q8.6 16 8 16 Q7.4 16 6.9 15.5 L0.5 9.1 Q0 8.6 0 8 Q0 7.4 0.5 6.9 L6.9 0.5 Q7.4 0 8 0"
              />
            </svg>
          </div>
          <div className={styles.squreStar9}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#B499FF"
                d="M8 0 Q8.6 0 9.1 0.5 L15.5 6.9 Q16 7.4 16 8 Q16 8.6 15.5 9.1 L9.1 15.5 Q8.6 16 8 16 Q7.4 16 6.9 15.5 L0.5 9.1 Q0 8.6 0 8 Q0 7.4 0.5 6.9 L6.9 0.5 Q7.4 0 8 0"
              />
            </svg>
          </div>
          <div className={styles.squreStar10}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#B499FF"
                d="M8 0 Q8.6 0 9.1 0.5 L15.5 6.9 Q16 7.4 16 8 Q16 8.6 15.5 9.1 L9.1 15.5 Q8.6 16 8 16 Q7.4 16 6.9 15.5 L0.5 9.1 Q0 8.6 0 8 Q0 7.4 0.5 6.9 L6.9 0.5 Q7.4 0 8 0"
              />
            </svg>
          </div>
          <div className={styles.squreStar11}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                fill="#B499FF"
                d="M8 0 Q8.6 0 9.1 0.5 L15.5 6.9 Q16 7.4 16 8 Q16 8.6 15.5 9.1 L9.1 15.5 Q8.6 16 8 16 Q7.4 16 6.9 15.5 L0.5 9.1 Q0 8.6 0 8 Q0 7.4 0.5 6.9 L6.9 0.5 Q7.4 0 8 0"
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
                d="M50 0 C58 12, 66 24, 70 35 C82 40, 94 45, 100 50 C94 55, 82 60, 70 65 C66 76, 58 88, 50 100 C42 88, 34 76, 30 65 C18 60, 6 55, 0 50 C6 45, 18 40, 30 35 C34 24, 42 12, 50 0 Z"
              />
            </svg>
          </div>
          <div className={styles.smallStar2}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="white"
                d="M50 0 C58 12, 66 24, 70 35 C82 40, 94 45, 100 50 C94 55, 82 60, 70 65 C66 76, 58 88, 50 100 C42 88, 34 76, 30 65 C18 60, 6 55, 0 50 C6 45, 18 40, 30 35 C34 24, 42 12, 50 0 Z"
              />
            </svg>
          </div>
          <div className={styles.smallStar3}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="white"
                d="M50 0 C58 12, 66 24, 70 35 C82 40, 94 45, 100 50 C94 55, 82 60, 70 65 C66 76, 58 88, 50 100 C42 88, 34 76, 30 65 C18 60, 6 55, 0 50 C6 45, 18 40, 30 35 C34 24, 42 12, 50 0 Z"
              />
            </svg>
          </div>
          <div className={styles.smallStar4}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="white"
                d="M50 0 C58 12, 66 24, 70 35 C82 40, 94 45, 100 50 C94 55, 82 60, 70 65 C66 76, 58 88, 50 100 C42 88, 34 76, 30 65 C18 60, 6 55, 0 50 C6 45, 18 40, 30 35 C34 24, 42 12, 50 0 Z"
              />
            </svg>
          </div>
          <div className={styles.smallStar5}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="white"
                d="M50 0 C58 12, 66 24, 70 35 C82 40, 94 45, 100 50 C94 55, 82 60, 70 65 C66 76, 58 88, 50 100 C42 88, 34 76, 30 65 C18 60, 6 55, 0 50 C6 45, 18 40, 30 35 C34 24, 42 12, 50 0 Z"
              />
            </svg>
          </div>
          <div className={styles.smallStar6}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="white"
                d="M50 0 C58 12, 66 24, 70 35 C82 40, 94 45, 100 50 C94 55, 82 60, 70 65 C66 76, 58 88, 50 100 C42 88, 34 76, 30 65 C18 60, 6 55, 0 50 C6 45, 18 40, 30 35 C34 24, 42 12, 50 0 Z"
              />
            </svg>
          </div>
        </div>

        {/* white line */}
        <div>
          <div className={styles.whiteLines1}></div>
          <div className={styles.whiteLines2}></div>
          <div className={styles.whiteLines3}></div>
          <div className={styles.whiteLines4}></div>
        </div>
        
        {/* big star - with animation */}
        <div className={`${styles.starDiv} ${animationStep >= 1 ? styles.starMoveUp : ''}`}>
          <div className={styles.innerstarDiv}>
            <Image
              src="/starImage.png"
              alt="star image"
              width={300}
              height={300}
              className={styles.star}
            />
            <div className={styles.StarLines}></div>
          </div>
        </div>
      </div>

      {/* Congratulations Text - appears after shrink */}
      <div className={`${styles.congratsText} ${animationStep >= 2 ? styles.congratsVisible : ''}`}>
        <h2 className={styles.congratsTitle}>Congratulations</h2>
        <h3 className={styles.oldMessage}>The amount will be credited<br/>to your account shortly</h3>
        <p className={styles.congratsSubtitle}>
          You have made the best
          investment in your Enjoy it.
        </p>
      </div>
    </div>
  );
}
