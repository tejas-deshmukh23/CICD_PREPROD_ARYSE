"use client";
import React, {
  useState,
  useRef,
  useCallback,
  useContext,
  useEffect,
} from "react";
import styles from "./ClickToRedirectLoader.module.css";
import { Outfit } from "next/font/google";
// import useWebSocketONDCstatus from "./Websocket/useWebSocketONDCstatus";
import useWebSocketONDCInit from "../Websocket/useWebSocketONDCInit";
import useWebSocketONDCstatus from "../Websocket/useWebSocketONDCstatus";
import OnStatusContext from "../context/OnStatusContext";
import { confirm } from "../apis/ondcapi";
import useWebSocketONDCConfirm from "../Websocket/useWebSocketONDCConfirm";
import ConfirmingLoader from "./ConfirmingLoader";
import { useRouter } from "next/navigation";
// import OnSearchContext from "./context/OnSearchContext";
import OnSearchContext from "../context/OnSearchContext";
// import SelectedLenderContext from "../context/SelectedLenderContext";
import SelectedLenderContext from "../context/SelectedLenderContext";

const roboto = Outfit({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const ClickToRedirectLoader = () => {
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
  } = useContext(SelectedLenderContext);

  const router = useRouter();

  const [loanApproved, setLoanApproved] = useState(false);
  const [confirming, setConfirming] = useState(false);

  // 1. Define ref at the top of your component
  const externalFormWindowRef = useRef(null);

  const {
    onStatusData,
    setOnStatusData,
    initPayload,
    setInitPayload,
    onOnitData,
    setOnInitData,
  } = useContext(OnStatusContext);

  const handleWebSocketMessageForStatus = useCallback((data) => {
    console.log(
      "received response id of form in ClickToRedirectLoader & i.e : ",
      data
    );
    try {
      const parsedData = JSON.parse(data.content);
      //here we should be creating one global variable or context which will hold this onstatus callback

      if (
        parsedData?.message?.order?.items?.[0]?.xinput?.form_response
          ?.status === "APPROVED" &&
        parsedData?.message?.order?.items?.[0]?.xinput?.form_response
          ?.submission_id
      ) {
        setConfirming(true);
        console.log("Calling the confirm api");
        //so here we will take that submission id and then will hit that init api

        //here we will store the onSelect callback
        setOnStatusData(parsedData);

        //from here we will call the last confirm api
        const confirmPayload = {
          transactionId: parsedData.context.transaction_id,
          bppId: parsedData.context.bpp_id,
          bppUri: parsedData.context.bpp_uri,
          providerId: parsedData.message.order.provider.id,
          itemId: parsedData.message.order.items[0].id,
          // formId: parsedData.message.order.items[0].xinput.form.id,
          formId:
            parsedData?.message?.order?.items?.[0]?.xinput?.form?.id ||
            onOnitData?.message?.order?.items?.[0]?.xinput?.form?.id ||
            "NA",
          submissionId:
            parsedData.message.order.items[0].xinput.form_response
              .submission_id,
          bankCode: "HDFC",
          accountNumber: "1234567890",
          vpa: "user@upi",
          // settlementAmount: "1666.67",
          settlementAmount: globalSettlementAmount,
          version: parsedData.context.version,
          paymentId: parsedData.message.order.payments[0].id,
          mobileNumber: formSubmissionData.contactNumber,
          stage: 200, //here in backend select methid we will check that if the stage is 2 then we will create a apply record for that user
          productName:
            SelectedLenderData.message.order.provider.descriptor.name,
        };

        handleCofirm(confirmPayload);
      } else {
        console.log("Not gone in if part of handleWebSocketMessageForStatus");
      }
    } catch (error) {
      console.log("Error while getting onstatus : ", error);
    }
  }, []);

  useWebSocketONDCstatus(handleWebSocketMessageForStatus);

  const handleCofirm = async (confirmPayload) => {
    try {
      const response = await confirm(confirmPayload);
      if (response.status === 200) {
        console.log("The confirm response is : ", response);
        // router.push("/ondc/submitpage");
      }
    } catch (error) {
      console.log("error in handleConfirm : ", error);
    }
  };

  const handleButtonClick = () => {
    // console.log("The onstatus data after clicking the button is : ",onStatusData);
    const formUrl = onOnitData?.message?.order?.items?.[0]?.xinput?.form?.url;

    if (formUrl) {
      if (
        !externalFormWindowRef.current ||
        externalFormWindowRef.current.closed
      ) {
        externalFormWindowRef.current = window.open(formUrl, "_blank");
      } else {
        externalFormWindowRef.current.location = formUrl;
      }
    } else {
      console.log("No form URL found for Loan Agreement form");
    }
  };

  //function to handle onConfirm callback

  const handleWebSocketMessageForConfirm = useCallback((data) => {
    const parsedData = JSON.parse(data.content);

    // ✅ CLOSE FORM TAB IF OPEN
    if (
      externalFormWindowRef.current &&
      !externalFormWindowRef.current.closed
    ) {
      console.log("Inside the if of externalFormWindowRef");

      externalFormWindowRef.current.close(); // Close form tab
      window.focus(); // Focus back to loanapproval tab

      console.log("After window.focus");
    }

    // console.log("received response id of form in ClickToRedirectLoader & i.e : ", data);
    console.log("received onconfirm");
    setConfirming(false);
    setLoanApproved(true);

    setSelectedLenderData(parsedData);

    //here we will call the status api for now since we now dont have any lender with aa if we have any lender with aa then we will need to call the update api first and then the status api
    // Extract fields from on_confirm data
    const statusPayload = {
      transactionId: parsedData?.context?.transaction_id,
      bppId: parsedData?.context?.bpp_id,
      bppUri: parsedData?.context?.bpp_uri,
      refId: parsedData?.message?.order?.id,
      version: parsedData?.context?.version,
    };

    //here we will make status call

    // handleStatusCall(statusPayload);

    // router.push("/ondc/loanapproved");

    // setConfirmLender();

    router.push("/ondc/submitpage");
  }, []);

  useWebSocketONDCConfirm(handleWebSocketMessageForConfirm);

  const handleStatusCall = async (statusPayload) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}status`,
        statusPayload
      );
      console.log("The status api call response is : ", response);
      if (response.status === 200) {
        router.push("/ondc/submitpage");
      }
    } catch (error) {
      console.log("error in making status call", error);
    }
  };
  //   animation function
  // const [seconds, setSeconds] = useState(60);
  // const [showFact, setShowFact] = useState(false);
  // const [showFactText, setShowFactText] = useState(false);

  // useEffect(() => {
  //   // Timer countdown - 60 seconds to 0
  //   const timer = setInterval(() => {
  //     setSeconds((prev) => {
  //       if (prev <= 1) {
  //         // clearInterval(timer);
  //         return 60;
  //       }
  //       return prev - 1;
  //     });
  //   }, 100);

  //   // Show fun fact after 5 seconds (bottom to top animation)
  //   const factTimer = setTimeout(() => {
  //     setShowFact(true);
  //   }, 1000);

  //   // Show paragraph text 2 seconds after fun fact title
  //   const factTextTimer = setTimeout(() => {
  //     setShowFactText(true);
  //   }, 1000); // 5 seconds + 2 seconds = 7 seconds

  //   return () => {
  //     clearInterval(timer);
  //     clearTimeout(factTimer);
  //     clearTimeout(factTextTimer);
  //   };
  // }, []);

  // // Calculate rotation angle for the sun (clockwise: 0-360 degrees)
  // const sunRotation = ((60 - seconds) / 60) * 360; // 720 1080

  // // Calculate stroke dash offset for circular progress (clockwise)
  // const radius = 90;
  // const circumference = 2 * Math.PI * radius;
  // const strokeDashoffset = circumference * (seconds / 60); //20 30
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
    <>
      {!confirming ? (
        <>
          {/* <div className={styles.loaderContainer}>
            <div className={styles.content}>
              <h1 className={styles.title}>Please wait</h1>
              <p className={styles.subtitle}>
                We are processing your
                <br />
                best investment in you...
              </p>

              <div className={styles.timerWrapper}>
                <div className={styles.purpleGlow}></div>
                <div
                  className={styles.sunGlow}
                  style={{
                    transform: `rotate(${sunRotation}deg)`,
                    transition: "transform 1s linear",
                  }}
                ></div>
                <div className={styles.timerCircle}>
                  <svg className={styles.progressRing} width="200" height="200">
                    <circle
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="2"
                      fill="transparent"
                      r={radius}
                      cx="100"
                      cy="100"
                    />
                    <circle
                      className={styles.progressRingCircle}
                      stroke="white"
                      strokeWidth="3"
                      fill="transparent"
                      r={radius}
                      cx="100"
                      cy="100"
                      style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: strokeDashoffset,
                      }}
                    />
                  </svg>
                </div>
              </div>
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

                    Good credit score? Your loan gets approved <br/>
                    faster than your mom replies,<br/> “Kaha ho?”
                  </p>
                </div>
                <div className={styles.btnDiv}>
                  <button
                    type="submit"
                    className={styles.btn}
                    onClick={() => handleButtonClick()}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div> */}
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
                    Good credit score? Your loan gets approved <br/>
                    faster than your mom replies,<br/> “Kaha ho?”
                  </p>
                </div>
                <div className={styles.btnDiv}>
                  <button
                    type="submit"
                    className={styles.btn}
                    onClick={() => handleButtonClick()}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <ConfirmingLoader />
        </>
      )}
    </>
  );
};

export default ClickToRedirectLoader;
