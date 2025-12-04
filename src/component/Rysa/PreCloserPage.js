"use client";
import React, { useState, useContext, useRef, useEffect, useCallback } from "react";
import styles from "./PreCloserPage.module.css";
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

export default function PreCloserPage() {

  
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

  const [nextEmiDate, setNextEmiDate] = useState(false);

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

        //here we will get the next upcoming date that is next emi date 
        setNextEmiDate(data.endDate);

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
    // if (!amountToPay || isNaN(amountToPay) || amountToPay <= 0) {
    //   setError("Please enter a valid amount to pay.");
    //   return;
    // }
    // if (!adjustment) {
    //   setError("Please select an adjustment option.");
    //   return;
    // }

    // setError("");
    setSuccess("Part payment submitted successfully.");
    // console.log("Submitted:", { amountToPay, adjustment });

    // setTimeout(() => {
    //   setSuccess("");
    //   setAmountToPay("");
    //   setAdjustment("");
    // }, 3000);
    externalFormWindowRef.current = window.open("/ondc/redirecting", "_blank");
    handlePreClosePayment();
  };

  const handlePreClosePayment = async () => {
    try {
      setWaitingForCallback(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}update-foreclosure`,
        {
          transactionId: installmentJSON.disbursedLoan.transactionId,
          bppId: installmentJSON.disbursedLoan.bppId,
          bppUri: installmentJSON.disbursedLoan.bppUri,
          orderId: selectedLoanData.loanNumber,
          // amount: amountToPay,
          // currency: "INR",
          paymentLabel: "FORECLOSURE",
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
      console.log("The callback that we got from the on_update is :: ", parsedData);

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

  const [paymentMethod, setPaymentMethod] = useState("");
  // const [error, setError] = useState("");

  // const handleSubmit = () => {
  //   if (!paymentMethod) {
  //     setError("Please select a payment method.");
  //   } else {
  //     setError("");
  //     alert(`Payment method selected: ${paymentMethod}`);
  //   }
  // };

  return (
    // <div className={styles.firstContainer}>
    <div className={`${styles.firstContainer} ${outfit.className}`}>
    <div className={styles.container}>
      <div  className={styles.header}>
      <h1 className={styles.heading}>Loan Pre-Closure</h1>
      </div>
      <div className={styles.card}>
        <div className={styles.row}>
          <div className={styles.item}>
            <p className={styles.label}>Total Loan Taken</p>
            <p className={styles.value}>{selectedLoanData.totalAmount}</p>
          </div>
          <div className={styles.item}>
            <p className={styles.label}>Interest</p>
            <p className={styles.value}>{selectedLoanData.interestRate}</p>
          </div>
        </div>

        <div className={styles.row}>
          {/* <div className={styles.item}>
            <p className={styles.label}>Total Paid</p>
            <p className={styles.value}>₹{selectedLoanData.totalAmount - selectedLoanData.remainingAmount}</p>
          </div> */}
          <div className={styles.item}>
            <p className={styles.label}>Remaining Amount</p>
            {/* <p className={styles.value}>₹{selectedLoanData.remainingAmount}</p> */}
            <p className={styles.value}>NA</p>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.item}>
            <p className={styles.label}>Next EMI Date</p>
            <p className={styles.value}>{nextEmiDate}</p>
          </div>
          <div className={styles.item}>
            <p className={styles.label}>Last EMI</p>
            <p className={styles.value}>{selectedLoanData.endDate}</p>
          </div>
        </div>

        <div className={styles.payment}>
          {/* <p className={styles.label}>Payment Method</p> */}
          {/* <label className={styles.radio}>
            <input
              type="radio"
              name="payment"
              value="UPI"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI
          </label> */}
          {/* <label className={styles.radio}>
            <input
              type="radio"
              name="payment"
              value="Card"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Card
          </label> */}
          {/* <label className={styles.radio}>
            <input
              type="radio"
              name="payment"
              value="NetBanking"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            NetBanking
          </label> */}
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.btnContainer}>
            <button className={styles.nextBtn} onClick={handleSubmit}>
          Pay Now
        </button>
          </div>
        </div>
      </div>
      <div className={styles.newContainer}>
      <p className={styles.note}>
          Note: Closing now cancels auto-debit/EMI schedul
        </p>
      </div>
    </div>
    </div>
  );
}
