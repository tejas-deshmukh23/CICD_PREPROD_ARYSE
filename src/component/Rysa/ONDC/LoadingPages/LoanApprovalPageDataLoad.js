// "use client";
// import React, {useState, useEffect} from 'react';
// import "./LoadingPage.css";
// import { Roboto } from 'next/font/google';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { useContext } from 'react';
// import OnSearchContext from "../context/OnSearchContext";
// import SelectedLenderContext from "../context/SelectedLenderContext";
// import { useSearchParams } from 'next/navigation';
// import UIDContext from '../../context/UIDContext';

// const roboto = Roboto({
//   weight: ["400", "700"],
//   subsets: ["latin"],
// });

// const LoadingPage = () => {

//     const { uid, setUId, isWebsocketConnectionEstablished, setIsWebsocketConnectionEstablished } = useContext(UIDContext);

//     const searchParams = useSearchParams();
//     const bppIdFromURL = searchParams.get("bppId");
//     const [minAmt, setMinAmt] = useState(searchParams.get("minAmt"));
//     const [mobileNumber, setMobileNumber] = useState(searchParams.get("mobileNumber"));
//     const [transactionId, setTransactionId] = useState(searchParams.get("transactionId"));

//     const router = useRouter();

//     const { formSubmissionData, setFormSubmissionData, payloadForSelect, setPayloadForSelect } = useContext(OnSearchContext);
//     const { SelectedLenderData, setSelectedLenderData, globalSettlementAmount, setGlobalSettlementAmount, kycForm, setKycForm } = useContext(SelectedLenderContext);

//     useEffect(()=>{
//         handleDataFetch();
//     },[])

//     useEffect(()=>{
//         if(Object.keys(SelectedLenderData).length !== 0 && Object.keys([payloadForSelect]).length !== 0){
//             console.log("redirecting to other page");
//             // window.location.href = "/ondc/loanapproval?minAmt=50000"
//             router.push(`/ondc/loanapproval?minAmt=50000`);
//         }
//     },[SelectedLenderData, payloadForSelect])

//     const handleDataFetch = async () => {
//         try {

//             setUId(searchParams.get("transactionId"));

//           const formData = new FormData();
//         //   const transactionId = "6bee1982-a766-4b0e-b6f3-746a6df15a78";
//           formData.append("transactionId", transactionId);
//           formData.append("bppId", bppIdFromURL);
//           const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}setFrontendContext`, formData);

//           console.log("The response we got from handleDataFetch is : ", response);

//           const bppId = "pahal.lenderbridge.uat.ignosis.ai";
//           // const sortedData = findLenderByBpp(bppId, transactionId, response.data);
//           const sortedData = findLenderByBppForSingleObject(bppId, transactionId, response.data);
//           console.log("sorted Data is : ",sortedData);

//         } catch (error) {
//           console.log("problem in handleDataFetch : ", error);
//         }
//       }

//       const findLenderByBppForSingleObject = (bppToFind, transactionId, backendData) => {
//           try {
//             const parsedContent = JSON.parse(backendData.content);

//             console.log("The data before setting the selected lender data is : ",SelectedLenderData);
//             setSelectedLenderData(parsedContent);

//             if (parsedContent?.context?.bpp_id === bppToFind) {
//               // Return lender/provider info
//               // return parsedContent.message?.catalog?.providers || [];
//             //   if (parsedContent?.message?.order?.items?.[0]?.xinput?.form_response?.submission_id) {
//                 const updatedPayload = {
//                   transactionId : parsedContent.context.transaction_id,
//                   bppId : parsedContent.context.bpp_id,
//                   bppUri : parsedContent.context.bpp_uri,
//                   providerId : parsedContent.message.order.provider?.id,
//                   itemId : parsedContent.message.order.items?.[0]?.id,
//                   formId : parsedContent.message.order.items?.[0]?.xinput?.form?.id,
//                   submissionId: parsedContent?.message?.order?.items?.[0]?.xinput?.form_response?.submission_id || "NA",
//                   version : parsedContent.context?.version,
//                   productName : parsedContent?.message?.order.provider.descriptor?.name || "NA",
//                   //added afterwards
//                   mobileNumber: mobileNumber,
//                   stage: 1,
//                   status: "APPROVED"
//                 };

//                 setFormSubmissionData({
//                     ...formSubmissionData,
//                     contactNumber: mobileNumber
//                 })

//                 setPayloadForSelect(updatedPayload);
//                 // handleSelectApi(updatedPayload);
//             //   }
//             }
//           } catch (err) {
//             console.error("Error parsing content:", err);
//           }
//         return [];
//       };

//   return (
//      <div className={`${roboto.className} waiting-table`}>
//       <div className="loading-circle">
//         <svg className="hourglass-icon" viewBox="0 0 24 24" fill="none">
//           <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z"
//                 fill="#6039D2" stroke="#6039D2" strokeWidth="2.5"/>
//         </svg>
//       </div>

//       <div className="loading-text">
//        <h3 style={{textAlign:"center"}}> <b>Please Wait...</b> </h3>
//        <br></br>

//        <p className='para'>Do not press the back button or refresh the page</p>
//       </div>

//         {/* Submit Button */}
//               {/* <div className="Long-button">
//                 <button
//                   type="submit"
//                   className="form-submit"
//                 >
//                   Next
//                 </button>
//               </div> */}

//           {/* Submit Button */}
//               {/* <div className="btnContainer">
//                 <button
//                   type="submit"
//                   className="nextBtn"
//                 >
//                   Next
//                 </button>
//               </div> */}

//     </div>
//   );
// };

// export default LoadingPage;

"use client";
import React, { useState, useEffect } from "react";
import styles from "./LoanApprovalPageDataLoad.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import OnSearchContext from "../context/OnSearchContext";
import SelectedLenderContext from "../context/SelectedLenderContext";
import { useSearchParams } from "next/navigation";
import UIDContext from "../../context/UIDContext";
import FinalLoanOfferContext from "../context/FinalLoanOfferContext";
import { calculateSettlement } from "../apis/settlementCalculator";
import OnStatusContext from "../context/OnStatusContext";

const LoadingPage = () => {
  const [onStatusFormStatus, setOnStatusFormStatus] = useState(null);

  const [showPage, setShowPage] = useState(null);
  const [submissionId, setSubmissionId] = useState(null);

  const {
    uid,
    setUId,
    isWebsocketConnectionEstablished,
    setIsWebsocketConnectionEstablished,
  } = useContext(UIDContext);

  const searchParams = useSearchParams();
  const bppIdFromURL = searchParams.get("bppId");
  const [minAmt, setMinAmt] = useState(searchParams.get("minAmt"));
  const [mobileNumber, setMobileNumber] = useState(
    searchParams.get("mobileNumber")
  );
  const [transactionId, setTransactionId] = useState(
    searchParams.get("transactionId")
  );

  const router = useRouter();

  const {
    formSubmissionData,
    setFormSubmissionData,
    payloadForSelect,
    setPayloadForSelect,
  } = useContext(OnSearchContext);
  const {
    SelectedLenderData,
    setSelectedLenderData,
    globalSettlementAmount,
    setGlobalSettlementAmount,
    kycForm,
    setKycForm,
  } = useContext(SelectedLenderContext);
  const { onStatusData, setOnStatusData, initPayload, setInitPayload } =
    useContext(OnStatusContext);

  const { finalLoanOffer, setFinalLoanOffer } = useContext(
    FinalLoanOfferContext
  );

  useEffect(() => {
    handleDataFetch();
  }, []);

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
    return bppAmount;
  };

  //   useEffect(()=>{
  //     if(Object.keys(SelectedLenderData).length !== 0 && submissionId !== null && Object.keys(initPayload).length !== 0){

  //         if(showPage === "BankDetails"){
  //             //here we will redirect the user to the bankDetailsPage if submission id is present in onStatus
  //             router.push("/ondc/bankdetails");
  //         }

  //     }
  // },[SelectedLenderData, showPage, initPayload])

  useEffect(() => {
    // 1) PENDING
    if (onStatusFormStatus?.toLowerCase() === "pending") {
      // alert("Your application is pending. In the meantime, you can view our other offers by clicking on show offers button.");

      //here we will add new pending page instead of this rejection page

      const baseUrl = `/ondc/ondcpending?mobilenumber=${mobileNumber}`;
      const tId = transactionId;

      router.push(transactionId ? `${baseUrl}&transactionid=${tId}` : baseUrl);
    }

    // 2) REJECTED (must come BEFORE "not rejected" logic)
    else if (onStatusFormStatus?.toLowerCase() === "rejected") {
      const baseUrl = `/ondc/ondcrejection?mobilenumber=${mobileNumber}`;
      const tId = transactionId;

      router.push(transactionId ? `${baseUrl}&transactionid=${tId}` : baseUrl);
    }

    // 3) NOT REJECTED
    else if (
      Object.keys(SelectedLenderData).length !== 0 &&
      submissionId !== null &&
      Object.keys(initPayload).length !== 0 &&
      onStatusFormStatus
    ) {
      if (showPage === "BankDetails") {
        router.push("/ondc/bankdetails");
      }
    }
  }, [SelectedLenderData, showPage, initPayload, onStatusFormStatus]);

  useEffect(() => {
    if (
      Object.keys(SelectedLenderData).length !== 0 &&
      Object.keys([payloadForSelect]).length !== 0
    ) {
      console.log("redirecting to other page");
      // window.location.href = "/ondc/loanapproval?minAmt=50000"
      // router.push(`/ondc/loanapproval?minAmt=${minAmt}`);

      //here we will write code to check the callback that we got from the backend is on_select and if on_select if its cur is 1 that means we have to show the user a loanDetails page
      if (
        showPage === "BeforeBankDetails" &&
        SelectedLenderData?.message?.order?.items?.[0]?.xinput?.head?.index
          ?.cur === 1 &&
        SelectedLenderData?.context?.action === "on_select"
      ) {
        const bffPercentage = 1;

        const parsedData = SelectedLenderData;
        //here we will need to add some more details which are required for loandetails page
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

        if (parsedData.message.order.items[0].xinput.form.url) {
          //here we will call the function to generate settlementAmount
          // 1. Extract Principal (Loan Amount) from on_select breakup
          const principalEntry =
            parsedData?.message?.order?.quote?.breakup?.find(
              (item) => item.title === "PRINCIPAL"
            );
          const principal = parseFloat(principalEntry?.price?.value || 0);

          // 2. Extract Processing Fee (PF)
          const processingFeeEntry =
            parsedData?.message?.order?.quote?.breakup?.find(
              (item) => item.title === "PROCESSING_FEE"
            );
          const processingFee = parseFloat(
            processingFeeEntry?.price?.value || 0
          );

          // const term = parsedData?.message?.order?.items?.[0]?.tags?.[0]?.list?.[1]?.value;
          const termRaw =
            parsedData?.message?.order?.items?.[0]?.tags?.[0]?.list?.[1]
              ?.value || "";
          // Extract digits only
          const term = termRaw.replace(/\D/g, "");
          console.log(term); // "5"
          console.log("The loan term that we are getting is : ", term);

          handleCalculate(principal, processingFee, term, bffPercentage);

          setKycForm(parsedData.message.order.items[0].xinput.form.url);

          setInitPayload({
            ...initPayload,
            formId: parsedData.message.order.items[0].xinput.form.id,
          });

          // setSelectedLenderData(parsedData);

          router.push(`/ondc/loanoffer`);
        }
      } else if (
        SelectedLenderData?.message?.order?.items?.[0]?.xinput?.head?.index
          ?.cur === 0 &&
        SelectedLenderData?.context?.action === "on_select"
      ) {
        router.push(`/ondc/loanapproval?minAmt=${minAmt}`);
      }
    }
  }, [SelectedLenderData, payloadForSelect, showPage]);

  const handleDataFetch = async () => {
    try {
      setUId(searchParams.get("transactionId"));

      const formData = new FormData();
      //   const transactionId = "6bee1982-a766-4b0e-b6f3-746a6df15a78";
      formData.append("transactionId", transactionId);
      formData.append("bppId", bppIdFromURL);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}setFrontendContext`,
        formData
      );

      console.log("The response we got from handleDataFetch is : ", response);

      const bppId = "pahal.lenderbridge.uat.ignosis.ai";
      // const sortedData = findLenderByBpp(bppId, transactionId, response.data);
      const sortedData = findLenderByBppForSingleObject(
        bppIdFromURL,
        transactionId,
        response.data
      );
      console.log("sorted Data is : ", sortedData);
    } catch (error) {
      console.log("problem in handleDataFetch : ", error);
    }
  };

  const findLenderByBppForSingleObject = (
    bppToFind,
    transactionId,
    backendData
  ) => {
    try {
      //here content2 will be on_status if we have on_status in our backendData then we will check for api type
      if (backendData?.content2) {
        //here first we will get the onStatus from content2 and then will check the submissionId is present or not
        //present then ok else we will return the user from here
        const onStatusData = JSON.parse(backendData?.content2?.content);
        if (
          onStatusData?.message?.order?.items?.[0]?.xinput?.form_response
            ?.submission_id
        ) {
          setSubmissionId(
            onStatusData?.message?.order?.items?.[0]?.xinput?.form_response
              ?.submission_id
          );

          //added by tejas on 27/11/2025
          setOnStatusFormStatus(
            onStatusData?.message?.order?.items?.[0]?.xinput?.form_response
              ?.status || "NA"
          );

          const parsedData = onStatusData;

          const initPayload2 = {
            transactionId: parsedData.context.transaction_id,
            bppId: parsedData.context.bpp_id,
            bppUri: parsedData?.context?.bpp_uri || "NA",
            providerId: parsedData?.message?.order?.provider?.id || "NA",
            itemId: parsedData?.message?.order?.items?.[0]?.id || "NA",
            // formId: parsedData?.message?.order?.items?.[0]?.xinput?.form?.id,
            submissionId:
              parsedData?.message?.order?.items?.[0]?.xinput?.form_response
                ?.submission_id || "NA",
            bankCode: "NA",
            accountNumber: "NA",
            vpa: "user@upi",
            // settlementAmount: "1666.67",
            settlementAmount: globalSettlementAmount,
            initAttempt: 1,
          };

          setInitPayload((prev) => ({
            ...prev,
            ...initPayload2,
          }));
        } else {
          return;
        }

        const onSelectData = JSON.parse(backendData?.content1?.content);
        if (onSelectData?.context?.action === "on_select") {
          const bffPercentage = 1;
          //here we will set the neccessary data for bankDetails page
          // const onSelectData = backendData?.content1.content.context;
          setSelectedLenderData(onSelectData);

          const parsedData = onSelectData;

          //here we will write a logic to set the settlementAmount
          const principalEntry =
            parsedData?.message?.order?.quote?.breakup?.find(
              (item) => item.title === "PRINCIPAL"
            );
          const principal = parseFloat(principalEntry?.price?.value || 0);

          // 2. Extract Processing Fee (PF)
          const processingFeeEntry =
            parsedData?.message?.order?.quote?.breakup?.find(
              (item) => item.title === "PROCESSING_FEE"
            );
          const processingFee = parseFloat(
            processingFeeEntry?.price?.value || 0
          );

          // const term = parsedData?.message?.order?.items?.[0]?.tags?.[0]?.list?.[1]?.value;
          const termRaw =
            parsedData?.message?.order?.items?.[0]?.tags?.[0]?.list?.[1]
              ?.value || "";
          // Extract digits only
          const term = termRaw.replace(/\D/g, "");
          console.log(term); // "5"
          console.log("The loan term that we are getting is : ", term);

          const returnSettlementAmount = handleCalculate(
            principal,
            processingFee,
            term,
            bffPercentage
          );

          // setKycForm(parsedData.message.order.items[0].xinput.form.url);

          // setInitPayload({ ...initPayload, formId: parsedData.message.order.items[0].xinput.form.id, settlementAmount: returnSettlementAmount });
          setInitPayload((prev) => ({
            ...prev,
            formId: parsedData.message.order.items[0].xinput.form.id,
            settlementAmount: returnSettlementAmount,
          }));
          // setShowBankDetailsPage(true);
          setShowPage("BankDetails");
          setFormSubmissionData({
            ...formSubmissionData,
            contactNumber: mobileNumber,
          });

          return;
        }
      }

      const parsedContent = JSON.parse(backendData.content);

      console.log(
        "The data before setting the selected lender data is : ",
        SelectedLenderData
      );
      setSelectedLenderData(parsedContent);

      if (parsedContent?.context?.bpp_id === bppToFind) {
        // Return lender/provider info
        // return parsedContent.message?.catalog?.providers || [];
        //   if (parsedContent?.message?.order?.items?.[0]?.xinput?.form_response?.submission_id) {
        const updatedPayload = {
          transactionId: parsedContent.context.transaction_id,
          bppId: parsedContent.context.bpp_id,
          bppUri: parsedContent.context.bpp_uri,
          providerId: parsedContent.message.order.provider?.id,
          itemId: parsedContent.message.order.items?.[0]?.id,
          formId: parsedContent.message.order.items?.[0]?.xinput?.form?.id,
          submissionId:
            parsedContent?.message?.order?.items?.[0]?.xinput?.form_response
              ?.submission_id || "NA",
          version: parsedContent.context?.version,
          productName:
            parsedContent?.message?.order.provider.descriptor?.name || "NA",
          //added afterwards
          mobileNumber: mobileNumber,
          stage: 1,
          status: "APPROVED",
        };

        setFormSubmissionData({
          ...formSubmissionData,
          contactNumber: mobileNumber,
        });

        setPayloadForSelect(updatedPayload);
        setShowPage("BeforeBankDetails");
        // handleSelectApi(updatedPayload);
        //   }
      }
    } catch (err) {
      console.error("Error parsing content:", err);
    }
    return [];
  };

  // timer css function here
  const [showFact, setShowFact] = useState(false);
  const [showFactText, setShowFactText] = useState(false);

  useEffect(() => {
    // Show fun fact title at 5 sec
    const factTimer = setTimeout(() => {
      setShowFact(true);
    }, 5000);

    // Show fun fact text at 7 sec
    const factTextTimer = setTimeout(() => {
      setShowFactText(true);
    }, 7000);

    return () => {
      clearTimeout(factTimer);
      clearTimeout(factTextTimer);
    };
  }, []);

  return (
    // <div className={styles.loaderContainer}>
    //   <div className={styles.content}>
    //     <h1 className={styles.title}>Please wait</h1>
    //     <p className={styles.subtitle}>
    //       We are processing your
    //       <br />
    //       best investment in you...
    //     </p>

    //     <div className={styles.timerWrapper}>
    //       {/* Purple gradient background with pulse animation */}
    //       <div className={styles.purpleGlow}></div>

    //       {/* Rotating sun circle - moves clockwise */}
    //       <div
    //         className={styles.sunGlow}
    //         style={{
    //           transform: `rotate(${sunRotation}deg)`,
    //           transition: 'transform 1s linear'
    //         }}
    //       ></div>

    //       {/* Timer circle with animated border (clockwise) */}
    //       <div className={styles.timerCircle}>
    //         <svg className={styles.progressRing} width="200" height="200">
    //           {/* Background circle - static */}
    //           <circle
    //             stroke="rgba(255, 255, 255, 0.3)"
    //             strokeWidth="2"
    //             fill="transparent"
    //             r={radius}
    //             cx="100"
    //             cy="100"
    //           />
    //           {/* Progress circle - moves clockwise */}
    //           <circle
    //             className={styles.progressRingCircle}
    //             stroke="white"
    //             strokeWidth="3"
    //             fill="transparent"
    //             r={radius}
    //             cx="100"
    //             cy="100"
    //             style={{
    //               strokeDasharray: circumference,
    //               strokeDashoffset: strokeDashoffset,
    //             }}
    //           />
    //         </svg>
    //         {/* <div className={styles.timerText}>
    //           <div className={styles.secondsNumber}>{seconds}</div>
    //           <div className={styles.secondsLabel}>seconds</div>
    //         </div> */}
    //       </div>
    //     </div>

    //     {/* Fun fact sliding from bottom to top */}
    //     <div>
    //       <div className={`${styles.factContainer} ${showFact ? styles.factVisible : ''}`}>
    //         <p className={styles.factTitle}>Here is a fun fact:</p>
    //       </div>

    //       <div className={`${styles.factContainer} ${showFactText ? styles.factVisible : ''}`}>
    //         <p className={styles.factText}>
    //           {/* A Red Door Can Mean a Paid-Off Mortgage:
    //           <br />
    //           In Scotland, a tradition exists where painting
    //           <br />
    //           one&#39;s front door red signifies that the
    //           <br />
    //           homeowner has fully paid off their mortgage. */}
    //           Because sometimes, the shortest distance between<br />
    //            you and your goals is a quick loan, not <br />divine intervention.
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className={styles.loaderContainer}>
      <div className={styles.content}>
        <h1 className={styles.title}>Please wait</h1>
        <p className={styles.subtitle}>
          We are processing your
          <br />
          best investment in you...
        </p>

        <div className={styles.timerWrapper}>
          {/* Purple gradient background with pulse animation */}
          <div className={styles.purpleGlow}></div>

          {/* Rotating sun circle - moves clockwise INFINITE LOOP */}
          <div className={styles.sunGlow}></div>

          {/* Timer circle with animated border (clockwise) */}
          <div className={styles.timerCircle}>
            <svg className={styles.progressRing} width="200" height="200">
              {/* Background circle - thin white line (patli line) */}
              <circle
                className={styles.progressRingBg}
                r="90"
                cx="100"
                cy="100"
                fill="none"
                stroke="white"
              />
              <circle
                className={styles.progressRingCircle}
                r="90"
                cx="100"
                cy="100"
                fill="none"
                stroke="white"
                strokeWidth="3"
              />
            </svg>
            <div className={styles.timerText}>
              {/* <div className={styles.secondsNumber}></div> */}
              {/* <div className={styles.secondsLabel}>seconds</div> */}
            </div>
          </div>
        </div>

        {/* Fun fact sliding from bottom to top */}
        <div>
          <div
            className={`${styles.factContainer} ${
              showFact ? styles.factVisible : ""
            }`}
          >
            <p className={styles.factTitle}>Here is a fun fact:</p>
          </div>

          <div
            className={`${styles.factContainer} ${
              showFactText ? styles.factVisible : ""
            }`}
          >
            <p className={styles.factText}>
              Because sometimes, the shortest distance between
              <br />
              you and your goals is a quick loan, not <br />
              divine intervention.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
