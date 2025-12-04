// loginPage.js
"use client";

import React, { useState } from "react";
import styles from "./loginPage.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function LoginPage() {
  const router = useRouter();
  const [mobilenumber, setMobileNumber] = useState("");

  const handleGetOtp = () => {
    try {
      router.push(`/myContener/LoanRequestPage?mobilenumber=${mobilenumber}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div className={styles.container}>
    <div className={`${styles.container} ${outfit.className}`}>
      <div className={styles.card}>
        <div className={styles.topSection}>
          <div className={styles.topLeft}>
            <div className={styles.user1}>
              <Image
                src="/half-boy.png"
                alt="User 1"
                width={40}
                height={40}
                className={styles.profileImage}
              />
            </div>
            <div className={styles.user2}>
              <Image
                src="/half-girl.png"
                alt="User 2"
                width={40}
                height={40}
                className={styles.profileImage}
              />
            </div>
          </div>
        </div>

        <div className={styles.formWrapper}>
          <h1 className={styles.heading}>Welcome Back!</h1>
          <p className={styles.subheading}>Enter Your Username and Password.</p>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Mobile No.</label>
            {/* <input type="text" className={styles.input} /> */}
            <input
              type="number"
              className={styles.input}
              value={mobilenumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Enter OTP</label>
            <input type="text" className={styles.input} />
          </div>

          <button className={styles.otpButton} onClick={handleGetOtp}>
            Get OTP
          </button>

          <p className={styles.resendText}>
            Resend OTP in <span className={styles.timer}>00.54</span>
          </p>

          <div className={styles.bottomText}>
            <span className={styles.link}>Resend OTP?</span> <b>OR</b>{" "}
            <span className={styles.link}>
              <a href="">Create a New Account </a>
            </span>
          </div>
        </div>

        <div className={styles.bottomShape}></div>
      </div>
    </div>
  );
}
