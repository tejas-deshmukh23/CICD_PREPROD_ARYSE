"use client";
import React, { useRef, useCallback, useState } from "react";
import Image from "next/image";
import styles from "./ReviewLoan.module.css";
// import hdb from '../../../public/Jays/HDB.png';
import ondclogo from "./images/ondc_registered_logo.png";
import logo2 from "../../Rysa/ONDC/images/AryseFin_logo.png";
// import logo2 from "./images/Rysa_logo2.png";
import { useRouter } from "next/navigation";
import FinalLoanOfferContext from "./context/FinalLoanOfferContext";
import { useContext } from "react";
import OnStatusContext from "./context/OnStatusContext";
import SelectedLenderContext from "./context/SelectedLenderContext";
import useWebSocketONDCstatus from "./Websocket/useWebSocketONDCstatus";
import CallbackLoader from "./LoadingPages/CallbackLoader";
import OnSearchContext from "./context/OnSearchContext";
import axios from "axios";
import { Outfit } from "next/font/google";
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
export default function ReviewLoanPage() {
  const externalFormWindowRef = useRef(null);

  const { formSubmissionData } = useContext(OnSearchContext);
  const { finalLoanOffer, setFinalLoanOffer } = useContext(
    FinalLoanOfferContext
  );
  const { onStatusData, setOnStatusData, initPayload, setInitPayload } =
    useContext(OnStatusContext);
  const {
    SelectedLenderData,
    setSelectedLenderData,
    globalSettlementAmount,
    setGlobalSettlementAmount,
    kycForm,
    setKycForm,
  } = useContext(SelectedLenderContext);
  const [waitingForCallback, setWaitingForCallback] = useState(false);

  const router = useRouter();
  //   const summary = {
  //     loanAmount: 50000,
  //     processingFees: 966.42,
  //     interestRate: 20,
  //     interestPayable: 6000,
  //     totalPayable: 56000,
  //     emi: 6000,
  //     emiTenure: 36,
  //     numInstallments: 9,
  //   };
  //   const contCharges={
  //   closureCharge: "3%",
  //   latePaymentCharge: "4%",
  // };
  // // const contCharges={
  // //   closureCharge: 3%,
  // //   latePaymentCharge: 4%,
  // // };
  //   const gro = {
  //     name: 'Kiran Deshmukh',
  //     designation: 'Software engineer',
  //     mobile: '9999999999',
  //     address: 'Kharadi pune maharashtra',
  //     email: 'Kiran@gmail.com',
  //   };

  // const summary = {
  //   loanAmount: finalLoanOffer.loanAmount || 50000,
  //   processingFees: 966.42,
  //   interestRate: 20,
  //   interestPayable: 6000,
  //   totalPayable: 56000,
  //   emi: 6000,
  //   emiTenure: 36,
  //   numInstallments: 9,
  // };
  const summary = {
    loanAmount: finalLoanOffer?.loanAmount || "NA", //this is net_disbursed_amount
    processingFees: finalLoanOffer?.processingFees || "NA",
    interestRate: finalLoanOffer?.interestRate || "NA",
    interestPayable: finalLoanOffer?.interest || "NA",
    totalPayable: finalLoanOffer?.TotalAmountPayable || "NA",
    emi: finalLoanOffer?.installmentAmount || "NA",
    emiTenure: finalLoanOffer?.tenure || "NA",
    numInstallments: finalLoanOffer?.repaymentInstallments || "NA",
    netDisbursedAmount: finalLoanOffer?.netDisbursedAmount || "NA",
  };
  //   const contCharges={
  //   closureCharge: "3%",
  //   latePaymentCharge: "4%",
  // };
  const contCharges = {
    closureCharge: finalLoanOffer?.foreClosurePenalty || "NA",
    latePaymentCharge: finalLoanOffer?.delayPaymentPenalty || "NA",
  };
  // const contCharges={
  //   closureCharge: 3%,
  //   latePaymentCharge: 4%,
  // };
  // const gro = {
  //   name: 'Kiran Deshmukh',
  //   designation: 'Software engineer',
  //   mobile: '9999999999',
  //   address: 'Kharadi pune maharashtra',
  //   email: 'Kiran@gmail.com',
  // };

  const gro = {
    name: finalLoanOffer?.groName || "NA",
    designation: finalLoanOffer?.groDesignation || "NA",
    mobile: finalLoanOffer?.groContactNo || "NA",
    address: finalLoanOffer?.groAddress || "NA",
    email: finalLoanOffer?.groEmail || "NA",
  };

  const cur = (n) => `₹ ${n.toLocaleString()}`;

  const handleNextClick = () => {
    // router.push("/ondc/bankdetails");
    handleStageChange();
    externalFormWindowRef.current = window.open(kycForm, "_blank");
    setWaitingForCallback(true);
  };

  const handleStageChange = async () => {
    try {
      const formData = new FormData();
      formData.append("stage", 3);
      formData.append("transactionId", finalLoanOffer.transactionId);
      formData.append("mobileNumber", formSubmissionData.contactNumber);
      formData.append("gatewayUrl", "https://www.arysefin.com/ondc/loanoffer");
      formData.append("platformId", "O");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}saveStage`,
        formData
      );

      console.log(
        "The response that we got from the handleStageChange is :  ",
        response
      );
    } catch (error) {
      console.log("error while saving data");
    }
  };

  const handleWebSocketMessageForStatus = useCallback((data) => {
    console.log("When we got the status callback");

    // alert("The onstatus is called");

    try {
      // ✅ CLOSE FORM TAB IF OPEN
      if (
        externalFormWindowRef.current &&
        !externalFormWindowRef.current.closed
      ) {
        externalFormWindowRef.current.close(); // Close form tab
        window.focus(); // Focus back to loanapproval tab
      }

      const parsedData = JSON.parse(data.content);

      if (
        parsedData.message.order.items[0].xinput.form_response.status ===
        "APPROVED" &&
        parsedData.message.order.items[0].xinput.form_response.submission_id
      ) {
        //so here we will take that submission id and then will hit that init api

        //here we will store the onSelect callback
        setOnStatusData(parsedData);

        //   //here we will call the init api with the values(taken from onStatus ) which it will need
        //here we are only setting the value which we get from onStatus needed for calling init1 api which we call in bankDetails page
        const initPayload2 = {
          transactionId: parsedData.context.transaction_id,
          bppId: parsedData.context.bpp_id,
          bppUri: parsedData.context.bpp_uri,
          providerId: parsedData.message.order.provider.id,
          itemId: parsedData.message.order.items[0].id,
          // formId: parsedData.message.order.items[0].xinput.form.id,
          submissionId:
            parsedData.message.order.items[0].xinput.form_response
              .submission_id,
          bankCode: "HDFC",
          accountNumber: "1234567890",
          vpa: "user@upi",
          // settlementAmount: "1666.67",
          settlementAmount: globalSettlementAmount,
          initAttempt: 1,
        };

        // setInitPayload(...initPayload,initPayload2);
        setInitPayload((prev) => ({
          ...prev,
          ...initPayload2,
        }));

        // setFinalLoanOffer(parsedData);

        // router.push("/ondc/bankdetails");
        // router.push("/ondc/loanoffer");
        // here instead of redirecting the user to the bank details page firstly we will show him the loan offer and then from that loanoffer page user will be redirected to bankDetails page

        // const initResponse = await init(initPayload);
        // handleInit(initPayload);

        //for temporarily we are calling our init api from here but after we will be calling init api on another page after taking the bank details
        const submissionId =
          parsedData.message.order.items[0].xinput.form_response.submission_id;
        console.log("The submission id that we got is : ", submissionId);
        router.push("/ondc/bankdetails");
      } else if (
        parsedData?.message?.order?.items?.[0]?.xinput?.form_response?.status?.toLowerCase() === "pending" &&
        parsedData.message.order.items[0].xinput.form_response.submission_id
      ) {
        // Here we will redirect the user to the pending page
        // alert("Your application is pending. In the meantime, you can view our other offers by clicking on show offers button.");

        //here we will add new pending page instead of this rejection page

        const baseUrl = `/ondc/ondcpending?mobilenumber=${formSubmissionData.contactNumber}`;
        const transactionId = SelectedLenderData?.context?.transaction_id;
        router.push(
          transactionId ? `${baseUrl}&transactionid=${transactionId}` : baseUrl
        );
      }
      else {
        const baseUrl = `/ondc/ondcrejection?mobilenumber=${formSubmissionData.contactNumber}`;
        const transactionId = SelectedLenderData?.context?.transaction_id;
        router.push(
          transactionId ? `${baseUrl}&transactionid=${transactionId}` : baseUrl
        );
        // console.log("Your application not accepted");
        // console.log("Your application not accepted", parsedData);
        // localStorage.setItem('mobileNumberForRejection', formSubmissionData.contactNumber);
        // window.location.href = `/ondc/RejectionPage?mobilenumber=${formSubmissionData.contactNumber}`;
      }
    } catch (error) {
      console.log("Error while getting onstatus : ", error);
    }
  }, []);

  useWebSocketONDCstatus(handleWebSocketMessageForStatus);
  // comma function here
  const formatINR = (value) => { // change11
    if (value === null || value === undefined || value === "") return "N/A";
    const num = Number(value);
    return isNaN(num) ? "N/A" : new Intl.NumberFormat("en-IN").format(num);
  };
  return (
    <>
      {!waitingForCallback ? (
        <>
          <main className={`${styles.container} ${outfit.className}`}>
            {/* <div className={styles.mainCard}></div> */}
            {/*—‑ हेडर ‑—*/}
            {/* <header className={styles.header}>Review Loan Application</header> */}
            {/* <div className={styles.header}>
         <div className={styles.headerLogo}>
                  <Image
                  src={logo2}
                  alt="NA"
                  style={{
                    alignContent: "center",
                    width: "auto",
                    height: "auto",
                    // top: "",
                  }}
                height={150}
                width={150}
                />
                </div>
      </div> */}
            {/* ============= */}
            <div className={styles.mainHeaderPart}>
              {/* header */}
              <div className={styles.topchildren}>
                <div className={styles.logoContainer}>
                  <Image
                    src="/arysefin-white logo.png"
                    width={80}
                    height={80}
                    className={styles.logo2}
                    alt="Aryse_Fin logo"
                    priority
                  />
                </div>
              </div>
            </div>
            {/* =============================== */}
            {/*—‑ कार्ड ‑—*/}
            <section className={styles.card}>
              {/* ========== Amount you get ========== */}
              <h3 className={styles.sectionTitle}>Amount you get</h3>
              <div className={styles.row}>
                <span>Loan Amount</span>{" "}
                <span className={styles.valueAm}>
                  {/* {cur(summary.loanAmount)} */}
                  ₹ {formatINR(summary.loanAmount)} {/*change11*/}
                </span>
              </div>
              <div className={styles.row}>
                <span>Processing Fees</span>{" "}
                <span className={styles.valueAm}>
                  {/* {cur(summary.processingFees)}  */}
                  ₹ {formatINR(summary.processingFees)} {/*change11*/}
                </span>
              </div>

              <hr className={styles.divider} />

              <div className={styles.row}>
                <span className={styles.netLabel}>Net disbursed amount</span>{" "}
                <span className={styles.netValue}>
                  {/* {cur(summary.netDisbursedAmount)} */}
                  ₹ {formatINR(summary.netDisbursedAmount)} {/*change11*/}
                </span>
              </div>

              {/* ========== Amount you pay ========== */}
              <h3 className={styles.sectionTitle}>Amount you pay</h3>
              <div className={styles.row}>
                <span>Loan Amount</span>{" "}
                <span className={styles.valueAm}>
                  {/* {cur(summary.loanAmount)} */}
                  ₹ {formatINR(summary.loanAmount)}{/*change11*/}
                </span>
              </div>
              <div className={styles.row}>
                <span>
                  Interest payable
                  <br />
                  (with interest rate {summary.interestRate})
                </span>
                <span className={styles.valueAm}>
                  {/* {cur(summary.interestPayable)} */}
                  ₹ {formatINR(summary.interestPayable)}{/*change11*/}
                </span>
              </div>
              <div className={styles.row}>
                <span>Total amount payable</span>{" "}
                <span className={styles.valueAm}>
                  {/* {cur(summary.totalPayable)} */}
                  ₹ {formatINR(summary.totalPayable)} {/*change11*/}
                </span>
              </div>
              <div className={styles.row}>
                <span>EMI Amount</span>{" "}
                <span className={styles.valueAm}>
                  {/* {cur(summary.emi)} */}
                  ₹ {formatINR(summary.emi)} {/*change11*/}
                </span>
              </div>
              {/* <div className={styles.row}>
          <span>EMI Payable</span> <span className={styles.valueAm}>{cur(summary.emi)}</span>
        </div> */}
              <div className={styles.row}>
                <span>EMI Tenure</span>{" "}
                <span className={styles.valueAm}>{summary.emiTenure}</span>
              </div>
              <div className={styles.row}>
                <span>Number of installment</span>{" "}
                <span className={styles.valueAm}>
                  {summary.numInstallments}
                </span>
              </div>

              <hr className={styles.divider} />

              {/* ========== Contigent charges ========== */}
              <h3 className={styles.sectionTitle}>Contigent charges</h3>
              <div className={styles.row}>
                <span>Foreclosure charge</span>{" "}
                <span className={styles.valueAm}>
                  {contCharges.closureCharge}
                </span>
              </div>
              <div className={styles.row}>
                <span>Late payment charge</span>{" "}
                <span className={styles.valueAm}>
                  {contCharges.latePaymentCharge}
                </span>
              </div>

              <hr className={styles.divider} />

              {/* ========== GRO Details ========== */}
              <h3 className={styles.sectionTitle}>GRO Details</h3>

              <div className={styles.field}>
                <label>Name</label>
                <input
                  readOnly
                  value={gro.name}
                  className={styles.readonlyInput}
                />
              </div>

              <div className={styles.field}>
                <label>Designation</label>
                <input
                  readOnly
                  value={gro.designation}
                  className={styles.readonlyInput}
                />
              </div>

              <div className={styles.field}>
                <label>Mobile No.</label>
                <input
                  readOnly
                  value={gro.mobile}
                  className={styles.readonlyInput}
                />
              </div>

              <div className={styles.field}>
                <label>Postal address</label>
                <input
                  readOnly
                  value={gro.address}
                  className={styles.readonlyInput}
                />
              </div>

              <div className={styles.field}>
                <label>Email</label>
                <input
                  readOnly
                  value={gro.email}
                  className={styles.readonlyInput}
                />
              </div>
              <div className={styles.btnContainer}>
                <button
                  type="button"
                  className={styles.nextbtn}
                  onClick={() => handleNextClick()}
                >
                  <span>Next</span>
                </button>
              </div>
            </section>
          </main>
        </>
      ) : (
        <>
          {" "}
          <CallbackLoader />{" "}
        </>
      )}
    </>
  );
}
