"use client";
import React from "react";
// import styles from "./newrejectionpage.module.css";
import styles from "./ONDCPendingpage.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaExclamationCircle } from "react-icons/fa";
import { Outfit } from "next/font/google";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const ONDCPendingPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mobileNumber = searchParams.get("mobilenumber");
  const transactionId = searchParams.get("transactionid");

  useEffect(() => {
    console.log(
      "Executing the useEffect and the transactionid value is : ",
      transactionId
    );
    if (transactionId) {
      handleMISStatus();
    }
  }, [transactionId]);

  const handleNextClick = async () => {
    try {
      handleEmbeddedRedirection();
    } catch (error) {
      console.log("error in handleNextClick");
    }
  };

  const handleMISStatus = async () => {
    try {
      const formData = new FormData();
      formData.append("transactionId", transactionId);
      formData.append("status", "-99");
      const response = axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}api/mis/updateAfterTransaction`,
        formData
      );
      if (response.status === 200) {
        console.log("status updated");
      }
    } catch (error) {
      console.log("error while saving the MISStatus", error);
    }
  };

  const handleEmbeddedRedirection = async () => {
    try {
      const formData = new FormData();
      formData.append("mobileNumber", mobileNumber);
      formData.append("agent", "arysefinlead");
      formData.append("agentId", "357046965");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}api/redirectUser`,
        formData
      );

      if (response.status === 200) {
        if (response.data.data?.redirectionlink) {
          let redirectUrl = response.data.data.redirectionlink;
          // If URL already has ?, append with &, otherwise add ?
          redirectUrl += redirectUrl.includes("?") ? "&sso=yes" : "?sso=yes";
          window.location.href = redirectUrl;
        }

        if (response.data.code === 200 && response.data.data?.redirectionlink) {
          let redirectUrl = response.data.data.redirectionlink;

          //     // If URL already has ?, append with &, otherwise add ?
          redirectUrl += redirectUrl.includes("?") ? "&sso=yes" : "?sso=yes";

          window.location.href = redirectUrl;
        } else {
          console.error(
            "API did not return a valid redirect link",
            response.data
          );
        }
      }
    } catch (error) {
      console.log("error in handleEmbeddedRedirection : ", error);
    }
  };

// animation function
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
    <>
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
            Your loan application <br />
            is pending...
          </p>
          <p className={styles.lasstMessage}>
            In meantime you can explore offers from other trusted partners!
          </p>
          <div className={styles.buttonWrapper}>
            <button className={styles.btnOffer} onClick={handleNextClick}>
              Check offers
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ONDCPendingPage;
