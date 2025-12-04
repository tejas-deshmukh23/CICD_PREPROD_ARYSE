"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
// import "./LoanApprovalPage.css";
// import "../../Yubi/LoanApprovalPageNew.css";
import styles from "./newLoanApprovalPage.module.css";
import axios from "axios";
import Image from "next/image";
// import hdb from "../../components/Yubi/newplimages/HDB.png";
import ondclogo from "./images/ondc_registered_logo.png";
import logo2 from "../../Rysa/ONDC/images/AryseFin_logo.png";
// import logo2 from './images/Rysa_logo2.png';
// import { Roboto } from "next/font/google";
import SelectedLenderContext from "./context/SelectedLenderContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { selectLoanAmountForm } from "./formSubmitApis/FormSubmitApi";
import { select } from "./apis/ondcapi";
import OnSearchContext from "./context/OnSearchContext";
import useWebSocketONDCSelect from "./Websocket/useWebSocketONDCSelect";
import useWebSocketONDCstatus from "./Websocket/useWebSocketONDCstatus";
import OnStatusContext from "./context/OnStatusContext";
import { init } from "./apis/ondcapi";
import useWebSocketONDCInit from "./Websocket/useWebSocketONDCInit";
import CallbackLoader from "./LoadingPages/CallbackLoader";
import FinalLoanOfferContext from "./context/FinalLoanOfferContext";
import { Roboto } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { calculateSettlement } from "./apis/settlementCalculator";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const LoanApprovalPage = () => {
  const bffPercentage = 1;

  const searchParams = useSearchParams();

  // const minAmt = searchParams.get("mobilenumber");

  // 1. Define ref at the top of your component
  const externalFormWindowRef = useRef(null);

  const { finalLoanOffer, setFinalLoanOffer } = useContext(
    FinalLoanOfferContext
  );
  const {
    formSubmissionData,
    setFormSubmissionData,
    payloadForSelect,
    setPayloadForSelect,
  } = useContext(OnSearchContext);
  const { onStatusData, setOnStatusData, initPayload, setInitPayload } =
    useContext(OnStatusContext);

  const router = useRouter();

  // const [loanAmount, setLoanAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState(""); // changes11
  const [loanAmountDisplay, setLoanAmountDisplay] = useState("");

  const [tenure, setTenure] = useState("0 months");

  const [minAmt, setMinAmt] = useState(searchParams.get("minAmt"));

  // setMinAmt(searchParams.get("minAmt"));

  const [maxAmt, setMaxAmt] = useState(0);

  const [enteredTenure, setEnteredTenure] = useState();

  const {
    SelectedLenderData,
    setSelectedLenderData,
    globalSettlementAmount,
    setGlobalSettlementAmount,
    kycForm,
    setKycForm,
  } = useContext(SelectedLenderContext);

  const [onSelectResponse, setOnSelectResponses] = useState(null);
  const [waitingForCallback, setWaitingForCallback] = useState(false);
  const [hittingInitApi, setHittingInitApi] = useState(false);

  // let externalFormWindow = null; // define this outside the function or in component scope

  //////////////////////////////////////////////////////////

  // useEffect(()=>{
  //   handleCalculate();
  // },[])

  const handleCalculate = (
    principal,
    processingFee,
    loanTermMonths,
    bffPercent
  ) => {
    console.log("Inside the handleCalculate");
    // const principal = 400000;
    // const processingFee = 1800;
    // const loanTermMonths = 5;
    // const bffPercent = 1; // 1% annualized

    // principal = 400000;
    // processingFee = 1800;
    // loanTermMonths = 5;
    // bffPercent = 1; // 1% annualized

    console.log("principal : ", principal);
    console.log("processingFee", processingFee);
    console.log("loanTermMonths", loanTermMonths);
    console.log("bffPercent", bffPercent);

    const bapAmount = calculateSettlement(
      principal,
      processingFee,
      loanTermMonths,
      bffPercent,
      "BAP"
    );
    const bppAmount = calculateSettlement(
      principal,
      processingFee,
      loanTermMonths,
      bffPercent,
      "BPP"
    );

    console.log("The bapamount is : ", bapAmount);
    console.log("The bpp amount is : ", bppAmount);

    // setSettlementAmount(bppAmount);
    setGlobalSettlementAmount(bppAmount);

    // setSettlementBAP(bapAmount);
    // setSettlementBPP(bppAmount);
  };

  /////////////////////////////////////////////////////////

  useEffect(() => {
    console.log(
      "After loading the loanapproval page the selectedLenderData is :: ",
      SelectedLenderData
    );
    if (SelectedLenderData != null) {
      // setMaxAmt(SelectedLenderData.message.order.items[0].price.value);
      setMaxAmt(SelectedLenderData.message.order.quote.breakup[0].price.value);
      setTenure(
        SelectedLenderData.message.order.items[0].tags[0].list[1].value
      );
    }

    // pramaan.ondc.org/beta/preprod/mock/seller
    if (
      SelectedLenderData.context.bpp_id === "go-app-gateway.qa1.paywithr.io"
    ) {
      // if(SelectedLenderData.context.bpp_id === "xyz"){
      setWaitingForCallback(true);
      console.log(
        "The selected Lender data loan amunt is :",
        SelectedLenderData.message.order.quote.breakup[0].price.value
      );
      setLoanAmount(
        SelectedLenderData.message.order.quote.breakup[0].price.value
      );
      doSubmit();
    }

    console.log("The payload for select is : ", payloadForSelect);
  }, []);

  //this is dosubmit function which we will only use for the ring lender as their we dont need to submit form we will not need any e hence we are creating seperate function for it
  // const doSubmit = async () => {
  //   // e.preventDefault();
  //   // externalFormWindowRef.current = window.open("", "_blank");
  //   // externalFormWindowRef.current = window.open("/ondc/waiting", "_blank");
  //   externalFormWindowRef.current = window.open("/ondc/redirecting", "_blank");

  //   try {

  //     const formUrl = SelectedLenderData.message.order.items[0].xinput.form.url.replace("/get/", "/post/");
  //     const formId = SelectedLenderData.message.order.items[0].xinput.form.id;
  //     const response = await selectLoanAmountForm(formUrl, loanAmount, formId);
  //     console.log("The response of loanAmount form is : ", response);
  //     if (response.data.submission_id) {

  //       // await handleApplyRecord();

  //       const updatedPayload = {
  //         bppId: SelectedLenderData.context.bpp_id,
  //         bppUri: SelectedLenderData.context.bpp_uri,
  //         formId: SelectedLenderData.message.order.items[0].xinput.form.id,
  //         itemId: SelectedLenderData.message.order.items[0].id,
  //         providerId: SelectedLenderData.message.order.provider.id,
  //         status: "SUCCESS",
  //         submissionId: response.data.submission_id,
  //         transactionId: SelectedLenderData.context.transaction_id,
  //         mobileNumber: formSubmissionData.contactNumber,
  //         stage: 2, //here in backend select methid we will check that if the stage is 2 then we will create a apply record for that user
  //         productName: SelectedLenderData.message.order.provider.descriptor.name,
  //         loanAmount: SelectedLenderData.message.order.quote.breakup[0].price.value, //this loan amount will be stored in userInfo table
  //         version: SelectedLenderData.context.version
  //       };

  //       console.log("The updated payload before sending to the select is : ", updatedPayload);
  //       setWaitingForCallback(true);
  //       const selectResponse = await select(updatedPayload);

  //       console.log("The select response that we got is : ", selectResponse);

  //       if (selectResponse.status === 200) {
  //         if (selectResponse.data.gateway_response.message.ack.status === "ACK") {

  //           console.log("Got the success response of select and that is : ", selectResponse);

  //         }

  //       }
  //     }
  //     //else to write a logger of form problem
  //     else {
  //       console.log("Error in loanAmount Form");
  //       //here we will write the user in apply fail as we haven't created the apply record for the user
  //       // await handleApplyFail();
  //     }

  //   } catch (error) {
  //     console.log("The error is : ", error);
  //   }

  // };

  const doSubmit = async () => {
    // e.preventDefault();
    // externalFormWindowRef.current = window.open("", "_blank");
    // externalFormWindowRef.current = window.open("/ondc/waiting", "_blank");

    //now as we dont want to redirect the user to kyc so here we will not open the new tab
    // externalFormWindowRef.current = window.open("/ondc/redirecting", "_blank");

    try {
      const formUrl =
        SelectedLenderData.message.order.items[0].xinput.form.url.replace(
          "/get/",
          "/post/"
        );
      const formId = SelectedLenderData.message.order.items[0].xinput.form.id;
      const loanAmount =
        SelectedLenderData.message.order.quote.breakup[0].price.value;
      const response = await selectLoanAmountForm(formUrl, loanAmount, formId);
      console.log("The response of loanAmount form is : ", response);
      if (response.data.submission_id) {
        // await handleApplyRecord();

        const updatedPayload = {
          bppId: SelectedLenderData.context.bpp_id,
          bppUri: SelectedLenderData.context.bpp_uri,
          formId: SelectedLenderData.message.order.items[0].xinput.form.id,
          itemId: SelectedLenderData.message.order.items[0].id,
          providerId: SelectedLenderData.message.order.provider.id,
          status: "SUCCESS",
          submissionId: response.data.submission_id,
          transactionId: SelectedLenderData.context.transaction_id,
          mobileNumber: formSubmissionData.contactNumber,
          stage: 2, //here in backend select methid we will check that if the stage is 2 then we will create a apply record for that user
          productName:
            SelectedLenderData.message.order.provider.descriptor.name,
          loanAmount:
            SelectedLenderData.message.order.quote.breakup[0].price.value, //this loan amount will be stored in userInfo table
          version: SelectedLenderData.context.version,
        };
        // const updatedPayload = {
        //   bppId: SelectedLenderData.context.bpp_id,
        //   bppUri: SelectedLenderData.context.bpp_uri,
        //   formId: SelectedLenderData.message.order.items[0].xinput.form.id,
        //   itemId: SelectedLenderData.message.order.items[0].id,
        //   providerId: SelectedLenderData.message.order.provider.id,
        //   status: "SUCCESS",
        //   submissionId: response.data.submission_id,
        //   transactionId: SelectedLenderData.context.transaction_id,
        //   mobileNumber: formSubmissionData.contactNumber,
        //   stage: 2, //here in backend select methid we will check that if the stage is 2 then we will create a apply record for that user
        //   productName: SelectedLenderData.message.order.provider.descriptor.name,
        //   loanAmount: loanAmount, //this loan amount will be stored in userInfo table
        //   version: SelectedLenderData.context.version
        // };

        console.log(
          "The updated payload before sending to the select is : ",
          updatedPayload
        );
        setWaitingForCallback(true);
        const selectResponse = await select(updatedPayload);

        console.log("The select response that we got is : ", selectResponse);

        if (selectResponse.status === 200) {
          if (
            selectResponse.data.gateway_response.message.ack.status === "ACK"
          ) {
            console.log(
              "Got the success response of select and that is : ",
              selectResponse
            );
          }
        }
      }
      //else to write a logger of form problem
      else {
        console.log("Error in loanAmount Form");
        //here we will write the user in apply fail as we haven't created the apply record for the user
        // await handleApplyFail();
      }
    } catch (error) {
      console.log("The error is : ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // externalFormWindowRef.current = window.open("", "_blank");
    // externalFormWindowRef.current = window.open("/ondc/waiting", "_blank");

    //now as we dont want to redirect the user to kyc so here we will not open the new tab
    // externalFormWindowRef.current = window.open("/ondc/redirecting", "_blank");

    try {
      const formUrl =
        SelectedLenderData.message.order.items[0].xinput.form.url.replace(
          "/get/",
          "/post/"
        );
      const formId = SelectedLenderData.message.order.items[0].xinput.form.id;
      const response = await selectLoanAmountForm(formUrl, loanAmount, formId);
      console.log("The response of loanAmount form is : ", response);
      if (response.data.submission_id) {
        // await handleApplyRecord();

        const updatedPayload = {
          bppId: SelectedLenderData.context.bpp_id,
          bppUri: SelectedLenderData.context.bpp_uri,
          formId: SelectedLenderData.message.order.items[0].xinput.form.id,
          itemId: SelectedLenderData.message.order.items[0].id,
          providerId: SelectedLenderData.message.order.provider.id,
          status: "SUCCESS",
          submissionId: response.data.submission_id,
          transactionId: SelectedLenderData.context.transaction_id,
          mobileNumber: formSubmissionData.contactNumber,
          stage: 2, //here in backend select methid we will check that if the stage is 2 then we will create a apply record for that user
          productName:
            SelectedLenderData.message.order.provider.descriptor.name,
          loanAmount: loanAmount, //this loan amount will be stored in userInfo table
          version: SelectedLenderData.context.version,
        };

        console.log(
          "The updated payload before sending to the select is : ",
          updatedPayload
        );
        setWaitingForCallback(true);
        const selectResponse = await select(updatedPayload);

        console.log("The select response that we got is : ", selectResponse);

        if (selectResponse.status === 200) {
          if (
            selectResponse.data.gateway_response.message.ack.status === "ACK"
          ) {
            console.log(
              "Got the success response of select and that is : ",
              selectResponse
            );
          }
        }
      }
      //else to write a logger of form problem
      else {
        console.log("Error in loanAmount Form");
        //here we will write the user in apply fail as we haven't created the apply record for the user
        // await handleApplyFail();
      }
    } catch (error) {
      console.log("The error is : ", error);
    }
  };

  //code to get the latest callback
  const handleWebSocketMessageForSelect = useCallback((data) => {
    console.log("Received from WebSocket for 3rd onselect callback:", data);
    try {
      const parsedData = JSON.parse(data.content);
      console.log(
        "The callback that we got from the 3rd on_select is :: ",
        parsedData
      );
      setOnSelectResponses(parsedData);

      if (parsedData.message.order.items[0].xinput.form.url) {
        //here we will call the function to generate settlementAmount
        // 1. Extract Principal (Loan Amount) from on_select breakup
        const principalEntry = parsedData?.message?.order?.quote?.breakup?.find(
          (item) => item.title === "PRINCIPAL"
        );
        const principal = parseFloat(principalEntry?.price?.value || 0);

        // 2. Extract Processing Fee (PF)
        const processingFeeEntry =
          parsedData?.message?.order?.quote?.breakup?.find(
            (item) => item.title === "PROCESSING_FEE"
          );
        const processingFee = parseFloat(processingFeeEntry?.price?.value || 0);

        // const term = parsedData?.message?.order?.items?.[0]?.tags?.[0]?.list?.[1]?.value;
        const termRaw =
          parsedData?.message?.order?.items?.[0]?.tags?.[0]?.list?.[1]?.value ||
          "";
        // Extract digits only
        const term = termRaw.replace(/\D/g, "");
        console.log(term); // "5"
        console.log("The loan term that we are getting is : ", term);

        handleCalculate(principal, processingFee, term, bffPercentage);

        // const tenureEntry = parsedData?.message?.order?.quote?.breakup?.find(
        //   (item) => item.title === "TENURE"
        // );
        // if (tenureEntry?.price?.value) {
        //   loanTermMonths = parseInt(tenureEntry.price.value, 10);
        // }

        // // OR it may come inside items[0].xinput.form.submission.data
        // if (!loanTermMonths) {
        //   loanTermMonths =
        //   parsedData?.message?.order?.items?.[0]?.xinput?.form?.submission?.data
        //       ?.loan_tenure_months || null;
        // }

        // 5. Calculate amounts
        const bffAmount = (processingFee * bffPercentage) / 100;
        const settlementAmount = processingFee - bffAmount;

        // 4. Calculate correctly
        // const bffAmount = (principal * bffPercentage) / 100;   // ✅ BFF on principal
        // const settlementAmount = processingFee - bffAmount;    // ✅ PF - BFF

        setInitPayload({
          ...initPayload,
          formId: parsedData.message.order.items[0].xinput.form.id,
        });

        setSelectedLenderData(parsedData);

        console.log("When we got the url of the form");

        // window.location.href = parsedData.message.order.items[0].xinput.form.url;
        //         const returnUrl = encodeURIComponent(window.location.href); // or a specific route
        // const formUrl = parsedData?.message?.order?.items?.[0]?.xinput?.form?.url;

        // if (formUrl) {
        //   const redirectUrl = `${formUrl}?return_url=${returnUrl}`;
        //   console.log("Redirecting to:", redirectUrl);
        //   // window.location.href = redirectUrl;
        //   window.open(redirectUrl);
        // }

        const formUrl =
          parsedData?.message?.order?.items?.[0]?.xinput?.form?.url;
        console.log("The form url is : ", formUrl);
        // const returnUrl = encodeURIComponent(window.location.href);
        // console.log("The return url of the form is : ", returnUrl);

        //Instead of redirecting the user from here we will redirect the user to the kyc when user will click on the next button of reviewLoan Details page
        //here we will show the review loan details page

        //here we will store the kyc form
        setKycForm(formUrl);

        // // 3. Use in handleWebSocketMessageForSelect
        // if (formUrl && externalFormWindowRef.current) {
        //   const redirectUrl = `${formUrl}`;
        //   externalFormWindowRef.current.location = redirectUrl;
        // }

        setFinalLoanOffer({
          loanAmount: parsedData.message.order.quote.breakup[0].price.value, //This is the principal loan amount
          processingFees: parsedData.message.order.quote.breakup[2].price.value, //This is processing_fee
          interest: parsedData.message.order.quote.breakup[1].price.value, //Interest
          otherUpfrontCharges:
            parsedData.message.order.quote.breakup[3].price.value,
          insuranceCharges:
            parsedData.message.order.quote.breakup[4].price.value,
          netDisbursedAmount:
            parsedData.message.order.quote.breakup[5].price.value,
          otherCharges: parsedData.message.order.quote.breakup[6].price.value,

          // netDisbursedAmount: parsedData.message.order.quote.breakup

          //Loan Information
          interestRate: parsedData.message.order.items[0].tags[0].list[0].value,
          tenure: parsedData.message.order.items[0].tags[0].list[1].value, //emi tenure
          foreClosurePenalty:
            parsedData.message.order.items[0].tags[0].list[4].value,
          delayPaymentPenalty:
            parsedData.message.order.items[0].tags[0].list[6].value,
          repaymentInstallments:
            parsedData.message.order.items[0].tags[0].list[10].value, //no of installments
          installmentAmount:
            parsedData.message.order.items[0].tags[0].list[13].value, //emiAmount
          tncLink: parsedData.message.order.items[0].tags[0].list[11].value,
          // kfsLink: parsedData.message.order.items[0].tags[0].list[14].value,
          TotalAmountPayable: parsedData.message.order.items[0].price.value,

          //GRO Information
          groName: parsedData.message.order.provider.tags[0].list[0].value,
          groDesignation:
            parsedData.message.order.provider.tags[0].list[3].value,
          groContactNo: parsedData.message.order.provider.tags[0].list[2].value,
          groAddress: parsedData.message.order.provider.tags[0].list[4].value,
          groEmail: parsedData.message.order.provider.tags[0].list[1].value,

          // emiAmount: ,
          // emiTenure:
          //passing transactionId
          transactionId: parsedData.context.transaction_id,
        });

        router.push("/ondc/loanoffer");
      } else if (
        parsedData?.error ||
        parsedData?.message?.ack?.status === "NACK"
      ) {
        window.location.href = `/yubi/RejectionPage`;
      }

      // setWaitingForCallback(false);
    } catch (error) {
      console.error("Error parsing on_select content:", error);
    }
  }, []);

  useWebSocketONDCSelect(handleWebSocketMessageForSelect);

  //first we was calling the onStatus websocket here now we will call it in next reviewloanoffer page
  // commas function here add change11
  const formatINR = (value) => {
    if (value === null || value === undefined || value === "") return "N/A";
    const num = Number(value);
    return isNaN(num) ? "N/A" : new Intl.NumberFormat("en-IN").format(num);
  };
  const cleanNumber = (value) => value.replace(/,/g, "");

  const formatInputINR = (value) => {
    if (!value) return "";
    const num = Number(value.replace(/,/g, ""));
    return isNaN(num) ? "" : num.toLocaleString("en-IN");
  };

  return (
    <>
      {!SelectedLenderData || Object.keys(SelectedLenderData).length === 0 ? (
        <>loading data .........</>
      ) : (
        <></>
      )}
      {/* {
      hittingInitApi && (<>processing.....</>)
    } */}
      {!waitingForCallback ? (
        <>
          <div className={`${styles.container} ${outfit.className}`}>
            <div className={styles.mainHeaderPart}>
              {/* header */}
              <div className={styles.topchildren}>
                <div className={styles.logoContainer}>
                  <Image
                    src="/arysefin-dark logo.png"
                    width={80}
                    height={80}
                    className={styles.logo2}
                    alt="Aryse_Fin logo"
                    priority
                  />
                </div>
              </div>
            </div>
            {/* text div */}
            <div className={styles.textDiv}>
              {/* <h3>Popular loans</h3>
              <p>
                Here are some best loan providers suggested for you,
                <br /> please check according to your requirement.
              </p> */}
            </div>

            {/* floder svg */}
            <form onSubmit={handleSubmit}>
              <div className={styles.svgDiv}>
                <svg
                  width="400"
                  height="630"
                  viewBox="0 0 400 630"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* ✅ Step 1: Define gradient inside <defs> */}
                  <defs>
                    <linearGradient
                      id="folderGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#FFFFFF" /> {/* Top color */}
                      <stop offset="100%" stopColor="#EFEAFF" />{" "}
                      {/* Bottom color */}
                    </linearGradient>
                  </defs>
                  <path
                    d="M 10 22 
           Q 10 2, 30 2 
           L 120 2 
           L 140 30 
           L 210 30 
           Q 220 30, 230 30 
           L 360 30
           Q 380 30, 380 50
           L 380 600
           Q 380 620, 360 620 
           L 30 620 
           Q 10 620, 10 600 
           Z"
                    fill="url(#folderGradient)"
                    // fillOpacity="0.6"
                    // fill="white"
                    // stroke="black"
                    // stroke-width="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className={styles.lenderInfo}>
                {/* card image */}
                <div className={styles.cardLogo}>
                  <Image
                    //   src={lender.url || "/default-logo.png"} // fallback image
                    src="/ondc_registered_logo.png"
                    alt="Lender Logo"
                    width={100}
                    height={40}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className={styles.messageDiv}>
                  <h3>
                    Congratulations! You have been <br />
                    approved a loan of
                  </h3>
                </div>
                {/* card amount */}
                <div className={styles.amount}>
                  {/* <h1>₹ 4,00,000INR {lender.max_loanamount || "N/A"}</h1> */}
                  {/* <h1>₹{maxAmt}</h1> */}
                  <h1>₹ {formatINR(maxAmt)}</h1> {/*change11*/}
                </div>

                {/* input box */}
                <div className={styles.inputeL}>
                  <p className={styles.pTagMessage}>Choose loan amount</p>
                  {/* <div className={styles.placeholderAndInput}> */}
                  {/* <input
                    type="number"
                    value={loanAmount}
                    className={styles.amountInput}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="Enter Loan Amount"
                    min={10000}
                    max={maxAmt}
                    // onInput="validateAmount(this)"
                    required
                  /> */}
                  <input //change11
                    type="text" // ✅ "number" ऐवजी "text"
                    value={loanAmountDisplay} // ✅ comma format
                    className={styles.amountInput}
                    inputMode="numeric" // ✅ mobile वर number keyboard
                    placeholder="Enter Loan Amount"
                    onChange={(e) => {
                      const raw = cleanNumber(e.target.value); // ✅ commas काढतो

                      if (raw === "") {
                        setLoanAmount("");
                        setLoanAmountDisplay("");
                        return;
                      }

                      const num = Number(raw);

                      // ✅ max limit check
                      if (num > maxAmt) return;

                      setLoanAmount(raw); // ✅ backend साठी plain number
                      setLoanAmountDisplay(formatInputINR(raw)); // ✅ UI साठी comma format
                    }}
                    required
                  />
                  {/* </div> */}
                  <div>
                    <p className={styles.inputeMessage}>
                      You can enter up to ₹ {formatINR(maxAmt)} {/*changes11*/}
                    </p>
                  </div>
                </div>

                {/* रक्कम स्लायडर */}
                <div className={styles.sliderDiv}>
                  <input
                    type="range"
                    min={minAmt}
                    max={maxAmt}
                    step={5000}
                    value={loanAmount}
                    // onChange={(e) => setLoanAmount(Number(e.target.value))}
                    onChange={(e) => { // change11
                      setLoanAmount(e.target.value);
                      setLoanAmountDisplay(formatInputINR(e.target.value));
                    }}
                    className={styles.slider}
                  />
                  <div className={styles.lables}>
                    {/* <div>₹ {minAmt}</div> */}
                    {/* <div>₹ {maxAmt}</div> */}
                    <div>₹ {formatINR(minAmt)}</div> {/*changes11 */}
                    <div>₹ {formatINR(maxAmt)}</div>
                  </div>
                </div>
                {/* button */}
                <div className={styles.btnDiv}>
                  {/* <div> */}
                    <button className={styles.btn}>Next</button>
                  {/* </div> */}
                </div>
              </div>
            </form>
            {/* form add here */}
          </div>
        </>
      ) : (
        <>
          {/* waiting for callback */}
          <CallbackLoader />
        </>
      )}
    </>
  );
};
export default LoanApprovalPage;

// {/* <div className={`${styles.container} ${outfit.className}`}>
//   <div className={styles.mainHeaderPart}>
//     {/* header */}
//     <div className={styles.topchildren}>
//       <div className={styles.logoContainer}>
//         <Image
//           src="/arysefin-dark logo.png"
//           width={80}
//           height={80}
//           className={styles.logo2}
//           alt="Aryse_Fin logo"
//           priority
//         />
//       </div>
//     </div>
//   </div>
//   {/* text div */}
//   <div className={styles.textDiv}>
//     {/* <h3>Popular loans</h3>
//               <p>
//                 Here are some best loan providers suggested for you,
//                 <br /> please check according to your requirement.
//               </p> */}
//   </div>

//   {/* floder svg */}
//   <form onSubmit={handleSubmit}>
//     <div className={styles.svgDiv}>
//       <svg
//         width="400"
//         height="630"
//         viewBox="0 0 400 630"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         {/* ✅ Step 1: Define gradient inside <defs> */}
//         <defs>
//           <linearGradient id="folderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#FFFFFF" /> {/* Top color */}
//             <stop offset="100%" stopColor="#EFEAFF" /> {/* Bottom color */}
//           </linearGradient>
//         </defs>
//         <path
//           d="M 10 22
//            Q 10 2, 30 2
//            L 120 2
//            L 140 30
//            L 210 30
//            Q 220 30, 230 30
//            L 360 30
//            Q 380 30, 380 50
//            L 380 600
//            Q 380 620, 360 620
//            L 30 620
//            Q 10 620, 10 600
//            Z"
//           fill="url(#folderGradient)"
//           // fillOpacity="0.6"
//           // fill="white"
//           // stroke="black"
//           // stroke-width="2.5"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//         />
//       </svg>
//     </div>

//     <div className={styles.lenderInfo}>
//       {/* card image */}
//       <div className={styles.cardLogo}>
//         <Image
//           //   src={lender.url || "/default-logo.png"} // fallback image
//           src="/ondc_registered_logo.png"
//           alt="Lender Logo"
//           width={100}
//           height={40}
//           style={{ objectFit: "contain" }}
//         />
//       </div>
//       <div className={styles.messageDiv}>
//         <h3>
//           Congratulations! You have been <br />
//           approved a loan of
//         </h3>
//       </div>
//       {/* card amount */}
//       <div className={styles.amount}>
//         {/* <h1>₹ 4,00,000INR {lender.max_loanamount || "N/A"}</h1> */}
//         <h1>₹{maxAmt}</h1>
//       </div>

//       {/* input box */}
//       <div className={styles.inputeL}>
//         <p className={styles.pTagMessage}>Choose loan amount</p>
//         {/* <div className={styles.placeholderAndInput}> */}
//         <input
//           type="number"
//           value={loanAmount}
//           // onChange={(e) => setLoanAmount(e.target.value)}
//           placeholder="Enter Loan Amount"
//           min={10000}
//           max={maxAmt}
//           // onInput="validateAmount(this)"
//           required
//         />
//         {/* </div> */}
//         <div>
//           <p className={styles.inputeMessage}>You can enter up to {maxAmt}</p>
//         </div>
//       </div>

//       {/* रक्कम स्लायडर */}
//       <div className={styles.sliderDiv}>
//         <input
//           type="range"
//           min={minAmt}
//           max={maxAmt}
//           step={5000}
//           value={loanAmount}
//           // onChange={(e) => setLoanAmount(Number(e.target.value))}
//           className={styles.slider}
//         />
//         <div className={styles.lables}>
//           <div>₹ {minAmt}</div>
//           <div>₹ {maxAmt}</div>
//         </div>
//       </div>
//       {/* button */}
//       <div className={styles.btnDiv}>
//         <div>
//           <button className={styles.btn}>Next</button>
//         </div>
//       </div>
//     </div>
//   </form>
//   {/* form add here */}
// </div>; */}
