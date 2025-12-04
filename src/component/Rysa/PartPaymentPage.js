// PartPaymentPage.js
"use client";

import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import styles from "./PartPaymentPage.module.css";
import SelectedLoanContext from "./RysaContexts/SelectedLoanContext";
import axios from "axios";
import useWebSocketONDCUpdate from "./ONDC/Websocket/useWebSocketONDCUpdate";
import CallbackLoader from "./ONDC/LoadingPages/CallbackLoader";
// import UIDContext from "../context/UIDContext";
import UIDContext from "./context/UIDContext";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function PartPaymentPage() {


  const { uid, setUId, isWebsocketConnectionEstablished, setIsWebsocketConnectionEstablished } = useContext(UIDContext);

  const { selectedLoanData } = useContext(SelectedLoanContext);

  const [outstandingBalance, setOutstandingBalance] = useState(0);
  const [emiAmount, setEmiAmount] = useState(0);
  const [installmentStatus, setInstallmentStatus] = useState("");

  const [amountToPay, setAmountToPay] = useState("");
  const [adjustment, setAdjustment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [installmentJSON, setInstallmentJSON] = useState(null);

  const [paymentLink, setPaymentLink] = useState(null);
  const [waitingForCallback, setWaitingForCallback] = useState(null);

  const externalFormWindowRef = useRef(null);

  useEffect(() => {
    if (selectedLoanData?.loanNumber) {
      setUId(selectedLoanData.transactionId);
      getUpcomingInstallment(selectedLoanData.loanNumber);
    }
  }, [selectedLoanData]);

  const getUpcomingInstallment = async (loanNumber) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}fetchInstallmentByEndDate`,
        { loanNumber }
      );

      if (response.status === 200) {
        console.log("The response got is : ", response);
        const data = response.data; // backend returns { data: { ... } }
        setInstallmentJSON(data);
        console.log("Upcoming installment response:", data);

        setOutstandingBalance(data.disbursedLoan.outstandingAmount);
        setEmiAmount(data.installmentAmount);
        setInstallmentStatus(data.status);
      }

    } catch (error) {
      console.log("Error while getting upcoming installment", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amountToPay || isNaN(amountToPay) || amountToPay <= 0) {
      setError("Please enter a valid amount to pay.");
      return;
    }
    // if (!adjustment) {
    //   setError("Please select an adjustment option.");
    //   return;
    // }

    setError("");
    setSuccess("Part payment submitted successfully.");
    console.log("Submitted:", { amountToPay, adjustment });

    setTimeout(() => {
      setSuccess("");
      setAmountToPay("");
      setAdjustment("");
    }, 3000);
    externalFormWindowRef.current = window.open("/ondc/redirecting", "_blank");
    handleUpdatePartPayment();
  };

  const handleUpdatePartPayment = async () => {
    try {
      setWaitingForCallback(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}update-payment`,
        {
          transactionId: installmentJSON.disbursedLoan.transactionId,
          bppId: installmentJSON.disbursedLoan.bppId,
          bppUri: installmentJSON.disbursedLoan.bppUri,
          orderId: selectedLoanData.loanNumber,
          amount: amountToPay,
          currency: "INR",
          version: installmentJSON.disbursedLoan.version
        }
      );

      console.log("Update payment response :: ", response);

      if(response?.data?.gateway_response?.error?.code || response?.data?.gateway_response?.error?.message){
        externalFormWindowRef.current.close();
        alert(response.data.gateway_response.error.message);
      }

    } catch (error) {
      console.log("Error while handling update of part payment : ", error);
    }
  };

  const handleWebSocketMessageForUpdate = useCallback((data) => {
    console.log('Received from WebSocket:', data);
    setWaitingForCallback(false);

    try {
      const parsedData = JSON.parse(data.content);
      console.log("The callback that we got from the on_select is :: ", parsedData);

      const formUrl = parsedData?.message?.order?.payments?.[0]?.url || null;

      if (formUrl && externalFormWindowRef.current) {
        const redirectUrl = `${formUrl}`;
        externalFormWindowRef.current.location = redirectUrl;
      }

    } catch (error) {
      console.error("Error parsing on_update content:", error);
    }

  }, []);

  useWebSocketONDCUpdate(handleWebSocketMessageForUpdate);




  return (
    <>
      {
        !waitingForCallback ? (<> 
        {/* <div className={styles.container}> */}
        <div className={`${styles.container} ${outfit.className}`}>
          <div className={styles.headingDiv}>
            <h2 className={styles.heading}>Part Payment</h2>
          </div>
          <form className={styles.card} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.label}>Outstanding Balance</div>
              <div className={styles.value}>₹{outstandingBalance}</div>
            </div>

            <div className={styles.row}>
              <div className={styles.label}>Your EMI</div>
              <div className={styles.value}>₹{emiAmount.toLocaleString()}</div>
            </div>

            <div className={styles.row}>
              <div className={styles.label}>Installment Status</div>
              <div className={styles.value}>{installmentStatus}</div>
            </div>

            <input
              type="text"
              placeholder={`[ Enter Amount to Pay: ₹${emiAmount} ]`}
              className={styles.input}
              value={amountToPay}
              onChange={(e) => setAmountToPay(e.target.value)}
            />

            {/* <div className={styles.label} style={{ marginTop: "14px" }}>
              Choose Adjustment
            </div>

            <div className={styles.radioGroup}>
              {["Reduce EMI", "Reduce Tenure"].map((option) => (
                <label key={option} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="adjustment"
                    value={option}
                    checked={adjustment === option}
                    onChange={() => {
                      setAdjustment(option);
                      setError("");
                    }}
                  />
                  <span className={styles.radioText}>{option}</span>
                </label>
              ))}
            </div>

            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>} */}

            <div className={styles.btnContainer}>
              <button type="submit" className={styles.nextBtn}>
                Pay Now
              </button>
            </div>
          </form>

          <div className={styles.footer}>
            Note: This helps reduce your loan burden faster.
          </div>
        </div></>) : (<><CallbackLoader /></>)
      }

    </>

  );
}
