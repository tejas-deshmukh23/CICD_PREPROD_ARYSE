// RepaymentPage.js
"use client";

import React, { useState } from "react";
import styles from "./RepaymentPage.module.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
export default function RepaymentPage() {
  // Simulated backend values
  const emiAmount = 5000;
  const dueDate = "15 July 2025";
  const remainingAmount = 35000;
  const amountToPay = 5000;
  const paymentMethods = ["UPI", "Card", "NetBanking"];

  // States for form
  const [emiMonth, setEmiMonth] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setErrors((prev) => ({ ...prev, method: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!emiMonth) newErrors.month = "Please select an EMI month.";
    if (!selectedMethod) newErrors.method = "Please select a payment method.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted with:", {
        emiMonth,
        selectedMethod,
        emiAmount,
        amountToPay,
      });

      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000); // reset message
    }
  };

  return (
    // <div className={styles.container}>
    <div className={`${styles.container} ${outfit.className}`}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <div>
        <h2 className={styles.heading}>Repayment</h2>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.row}>
            <div>
              <div className={styles.label}>EMI Amount</div>
              <div className={styles.value}>₹{emiAmount.toLocaleString()}</div>
            </div>
            <div className={styles.right}>
              <div className={styles.label}>Due Date</div>
              <div className={styles.value}>{dueDate}</div>
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <div className={styles.label}>Remaining</div>
              <div className={styles.value}>₹{remainingAmount.toLocaleString()}</div>
            </div>
            <div className={styles.right}>
              <div className={styles.label}>Amount to Pay</div>
              <div className={styles.value}>₹{amountToPay.toLocaleString()}</div>
            </div>
          </div>

          <div className={styles.selectLabel}>Select EMI Month</div>
          <select
            className={styles.dropdown}
            value={emiMonth}
            onChange={(e) => {
              setEmiMonth(e.target.value);
              setErrors((prev) => ({ ...prev, month: "" }));
            }}
          >
            <option value="">-- Select Month --</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="July">October</option>
            <option value="July">November</option>
            <option value="July">December</option>
            
          </select>
          {errors.month && <div className={styles.error}>{errors.month}</div>}

          <div className={styles.methodLabel}>Payment Method</div>
          <div className={styles.radioGroup}>
            {paymentMethods.map((method) => (
              <label key={method} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={selectedMethod === method}
                  onChange={() => handleMethodChange(method)}
                />
                <span className={styles.radioText}>{method}</span>
              </label>
            ))}
          </div>
          <div className={styles.footer}>Need help? Contact support</div>
          {errors.method && <div className={styles.error}>{errors.method}</div>}
          <div className={styles.btnContainer}>
          <button type="submit" className={styles.nextBtn}>
            Pay Now
          </button>
          </div>
          {submitSuccess && (
            <div className={styles.success}>Payment request submitted!</div>
          )}
        </div>
      </form>
    </div>
  );
}
