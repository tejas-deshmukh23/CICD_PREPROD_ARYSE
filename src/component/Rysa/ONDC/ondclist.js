"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import useWebSocketONDC from "../../Rysa/ONDC/Websocket/useWebSocketONDC";
import { useContext } from "react";
import UIDContext from "../context/UIDContext";
import clock from "./images/clock.png";
import Image from "next/image";
import { onSearchForm } from "./formSubmitApis/FormSubmitApi";
import OnSearchContext from "./context/OnSearchContext";
import useWebSocketONDCSelect from "./Websocket/useWebSocketONDCSelect";
import SelectedLenderContext from "./context/SelectedLenderContext";
import { useRouter } from "next/navigation";
// import LendersLoader from "./LoadingPages/LendersLoader";
import styles from "./styleondclist.module.css";
import "./NewBlFirstPage.module.css";
import per from "../../../../public/Group_10.png";
import { Handlee, Roboto } from "next/font/google";
import { useSearchParams } from "next/navigation";
import logo2 from "./images/AryseFin_logo.png";
import LendersLoader from "./LoadingPages/Auto_start_timer";
import { select } from "./apis/ondcapi";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// const roboto = Roboto({
//   weight: ["400", "700"],
//   subsets: ["latin"],
// });

const Ondclist = () => {

  const router = useRouter();

  const [consentDetails, setConsentDetails] = useState([]);
  const [globalMinValue, setGlobalMinValue] = useState(0);

  const [gotSortedProductFlag, setGotSortedProductFlag] = useState(false);

  const [backendProducts, setBackendProducts] = useState([]);

  const searchParams = useSearchParams();
  const mno = searchParams.get("mobilenumber");
  // const [mno1, setMno1] = useState(mno);
  const [mobileNumber, setMobileNumber] = useState(mno); //we will be changing this afterwards

  useEffect(() => {
    console.log("The mobile number before if is : ", mobileNumber);
    if (mobileNumber === null) {
      return;
    }
    console.log("mno is : ", mobileNumber);
  }, [mobileNumber]);

  const slides = [
    {
      title: "Simple Loans,Big<br> Smiles!",
      subtitle: "Get money when you need it,<br>stress‑free.",
      img: "/s12.png",
    },
    {
      title: "Festive Loan,<br> Bonanza!",
      subtitle: "Exclusive benefits for limited period.",
      img: "/s171.png",
    },
    {
      title: "Easy Loans, Happy<br> Moments!",
      subtitle: "Quick money,zero worries.",
      img: "/s11.png",
    },
  ];

  const [currentSlide, setSlide] = useState(0);
  const [currentStep, setStep] = useState(1);

  useEffect(() => {
    const id = setInterval(
      () => setSlide((i) => (i + 1) % slides.length),
      3500
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      // console.log("⏰ Callback executed after 50 seconds!");
      // setLoading(false);
      // console.log("The confirm lenders length is : ",confirmLendersRef.current.length," and is : ",confirmLendersRef);
      if (confirmLendersRef.current.length === 0) {
        // handleEmbeddedRedirection();
        // router.push(`/ondc/rejection?mobileNumber=${mobileNumber}`);
        // router.push(`https://app.credithaat.com/embedded_journey?mobileNumber=${mobileNumber}`);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      // ✅ Place your logic here (API call, state update, etc.)
    }, 75000); // 50,000 ms = 30 seconds

    return () => clearTimeout(timer); // cleanup if component unmounts
  }, []);

  // const [mobileNumber, setMobileNumber] = useState("8329223729");//we will be changing this afterwards

  const handleEmbeddedRedirection = async () => {

    try {
      const formData = new FormData();
      formData.append("mobileNumber", mobileNumber);
      formData.append("agent", "arysefinlead");
      formData.append("agentId", "357046965");
      const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}api/redirectUser`, formData);

      if(response.status === 200){

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

  const [loading, setLoading] = useState(true);

  const {
    uid,
    setUId,
    isWebsocketConnectionEstablished,
    setIsWebsocketConnectionEstablished,
  } = useContext(UIDContext);
  const {
    formSubmissionData,
    setFormSubmissionData,
    payloadForSelect,
    setPayloadForSelect,
  } = useContext(OnSearchContext);
  const { SelectedLenderData, setSelectedLenderData, bff, setBff } = useContext(
    SelectedLenderContext
  );

  const [lenders, setLenders] = useState([]);
  // Track if search has been called to prevent multiple calls
  const [hasSearched, setHasSearched] = useState(false);
  const searchTimeoutRef = useRef(null);
  const lendersRef = useRef([]);
  const [receivedCallbacks, setReceivedCallbacks] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const searchCalledRef = useRef(false); // <-- Add this line
  const [gotAllCallbacks, setGotAllCallbacks] = useState(false);
  // const submissionIdOfForm = useRef([]);
  const [confirmLenders, setConfirmLenders] = useState([]);
  const [onSelectResponses, setOnSelectResponses] = useState([]);
  var onSelectResponsesTemp;

  const confirmLendersRef = useRef([]);

  //making this just to set the confirmlendersref so that we can use the loan offer form it
  // const confirmLendersRef = useRef(null);

  useEffect(() => {
    console.log("confirm lenders updated and they are :: ", confirmLenders);
    confirmLendersRef.current = confirmLenders;
  }, [confirmLenders]);

  // Update ref whenever lenders state changes
  useEffect(() => {
    lendersRef.current = lenders;
  }, [lenders]);

  useEffect(() => {
    const handleLenders = async () => {
      if (gotAllCallbacks && lenders) {
        // alert("We got all the callbacks");

        for (const lender of lenders) {
          if (
            !lender.error &&
            (lender.context?.version === "2.0.1" ||
              lender.context?.version === "2.0.0")
          ) {
            const transactionId = lender.context.transaction_id;
            const bppId = lender.context.bpp_id;
            const bppUri = lender.context.bpp_uri;
            const providerId = lender.message.catalog.providers?.[0]?.id;
            const itemId =
              lender.message.catalog.providers?.[0]?.items?.[0]?.id;
            const formId =
              lender.message.catalog.providers?.[0]?.items?.[0]?.xinput?.form
                ?.id;
            const submissionId = null;
            const status = "SUCCESS";

            //creating a version variable to check and manage form according to version i.e. 2.0.0 or 2.0.1
            const version = lender.context?.version;

            const productName =
              lender?.message?.catalog?.descriptor?.name || "NA";

            for (const product of backendProducts) {
              if (product.bppId === bppId) {
                console.log("Matched Product:", product);

                const response = await onSearchForm(
                  lender.message.catalog.providers?.[0]?.items?.[0]?.xinput?.form?.url.replace(
                    "/get/",
                    "/post/"
                  ),
                  setFormSubmissionData,
                  formSubmissionData,
                  setPayloadForSelect,
                  {
                    transactionId,
                    bppId,
                    bppUri,
                    providerId,
                    itemId,
                    formId,
                    submissionId,
                    status,
                    productName,
                  },
                  version
                );
                console.log(
                  "The response we are getting from the select2api is :: ",
                  response
                );
                // if (response?.status === 200 && response.data.gateway_response.message.ack === "ACK") {
                //   console.log("Still correct transactionId:", transactionId);
                //   setConfirmLenders(prev => [...prev, lender]);
                // }
                if (
                  response !== undefined &&
                  response !== null &&
                  response.status === 200
                ) {
                  if (
                    response.data.gateway_response.message.ack.status === "ACK"
                  ) {
                    console.log("Still correct transactionId:", transactionId);
                    // setConfirmLenders(prev => [...prev, lender]);
                    //tejas deshmukh
                    //here we store the lenders whose ack will be ACK into a confirmLendesr ref variable and then we will display that variable to the user screen then when user will click on any of the lender then we will show him a loan amount adjustment screen annd when he will adjust and submit loan amount then we'll be taking that particular lenders form from the response and hit that loan adjustment amount to select loan amount form
                    // showConfirmLenders(true);
                  }
                } else {
                  //logic loading ...
                }
              }
            }
          }
        }
      }
    };

    handleLenders();
  }, [gotAllCallbacks]);

  // Improved WebSocket message handler
  const handleWebSocketMessage = useCallback((data) => {
    console.log("Received from WebSocket:", data);

    try {
      const parsedData = JSON.parse(data.content);
      // onSearchForm("https://pramaan.ondc.org/beta/staging/mock/seller/form/post/7f960a02-9856-43c6-a59b-99f55f627815");
      // if(!parsedData.error){
      //     console.log("Before calling the onSearch api");
      //     onSearchForm(parsedData.message.catalog.providers[0].items[0].xinput.form.url);
      // }else{console.log("We got error in our parsedData");}
      // Use functional update to ensure we have the latest state

      console.log("receiived from websocket and setting the lender");
      setLenders((prevLenders) => {
        const newLenders = [parsedData, ...prevLenders];
        console.log(`Total lenders after callback: ${newLenders.length}`);
        return newLenders;
      });

      // Update callback counter
      setReceivedCallbacks((prev) => prev + 1);
    } catch (error) {
      console.error("Error parsing content:", error);
      // You might want to still add invalid data for debugging
      setLenders((prevLenders) => [
        {
          error: "Invalid JSON",
          rawData: data.content,
          timestamp: new Date().toISOString(),
        },
        ...prevLenders,
      ]);
    }
  }, []);

  useWebSocketONDC(handleWebSocketMessage, gotSortedProductFlag);
  // Use the WebSocket hook with the improved handler

  // Fixed getContent function
  const getContent = useCallback(() => {
    const bankNames = lenders.map((item) => {
      try {
        // Fixed: should be JSON.parse, not json.parse
        // Also, the item might already be parsed
        if (typeof item === "string") {
          return JSON.parse(item);
        }
        return item;
      } catch (error) {
        console.error("Error parsing content:", error);
        return "Invalid JSON";
      }
    });
    return bankNames;
  }, [lenders]);

  // Improved search function with better error handling
  const search = useCallback(async () => {
    // Prevent multiple calls using ref
    if (searchCalledRef.current || isSearching) {
      console.log("Search already called or in progress, skipping...");
      return;
    }

    if (uid === null || uid === undefined) {
      console.log("UID is not available, skipping search");
      return;
    }

    searchCalledRef.current = true; // Mark as called
    setIsSearching(true);
    setHasSearched(true);
    setReceivedCallbacks(0); // Reset callback counter

    try {
      console.log("Starting search with UID:", uid);

      //here uid refers to the transactionId of the api

      // if(gotSortedProductFlag !== true){
      //   console.log("Returning before search beacuse gotSortedProductFlag is false");
      //   return;
      // }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}search`,
        {
          transactionId: uid,
          mobileNumber: mobileNumber,
          stage: 1,
        },
        {
          headers: {
            "Content-Type": "application/json", // ✅ Proper header
          },
        }
      );

      console.log("Search response:", response);

      if (response.status === 200) {
        console.log("Search API call successful");

        if (response.data.gateway_response?.message?.ack?.status === "ACK") {
          console.log("Search acknowledged, waiting for callbacks...");

          // Set data dynamically from response
          const formData = response.data.ONDCFormData;

          console.log("The formData is : ", formData);

          // alert("tejas");

          if (formData) {
            setFormSubmissionData(formData);
          } else {
            console.warn("No form data returned from backend.");
          }

          // Set a timeout to check if we received all callbacks
          if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
          }

          searchTimeoutRef.current = setTimeout(() => {
            console.log(
              `Search completed. Received ${receivedCallbacks} callbacks`
            );
            setIsSearching(false);
            setGotAllCallbacks(true);
          }, 10000); // Wait 10 seconds for all callbacks
        } else {
          console.log("Search not acknowledged:", response.data);
          setIsSearching(false);
        }
      }
    } catch (error) {
      console.error("Search API error:", error);
      setIsSearching(false);
    }
  }, [uid]); // Only depend on uid

  // Effect to handle WebSocket connection and search - ONLY ONCE
  useEffect(() => {
    if (
      isWebsocketConnectionEstablished &&
      !hasSearched &&
      !searchCalledRef.current
    ) {
      console.log("WebSocket connection established, starting search...");

      // Add a small delay to ensure WebSocket is fully ready
      setTimeout(() => {
        search();
      }, 1000);
    }
  }, [isWebsocketConnectionEstablished, hasSearched]); // Only depend on connection and hasSearched

  // Effect to monitor lenders updates
  useEffect(() => {
    if (lenders.length > 0) {
      console.log(`Total lenders received: ${lenders.length}`, lenders);
    }
  }, [lenders]);

  // Effect to monitor callback count
  useEffect(() => {
    console.log(`Callbacks received: ${receivedCallbacks}`);
  }, [receivedCallbacks]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Manual search trigger for debugging
  const manualSearch = () => {
    console.log("Manual search triggered - resetting search state");
    searchCalledRef.current = false; // Reset the ref
    setHasSearched(false); // Reset the state
    setIsSearching(false);
    search();
  };

  const handleGetLoanClick = (lender) => {
    //here we will set all the data of the particular lender into one object which we will be using for our whole journey
    console.log(
      "get loan button clicked and onSelectResponses are : ",
      onSelectResponses
    );
    console.log("get loan button clicked and the lender is : ", lender);

    try {
      // console.log("The lender.context.bpp_id : ", lender.context.bpp_id, " and onSelectResponse : ", onSelectResponse.context.bpp_id);

      // if (lender.context.bpp_id === onSelectResponse.context.bpp_id) {
      var minValue = 0;
      if (lender.message?.order?.items[0]?.xinput?.form?.url) {
        console.log("Inside the else if");
        setSelectedLenderData(lender);
        for (const tempLender of lenders) {
          if (tempLender.context.bpp_id === lender.context.bpp_id) {
            minValue =
              tempLender?.message?.catalog?.providers?.[0]?.items?.[0]
                ?.tags?.[0]?.list?.[4]?.value;

            setGlobalMinValue(minValue);

            console.log("The min value that we got is : ", minValue);

            const matchedConsent = consentDetails?.find(
              (consent) => consent.bppId === lender.context.bpp_id
            );

            if (matchedConsent) {
              console.log("The matched consent is : ", matchedConsent);
              window.location.href = matchedConsent.redirectUrl;
              // window.open(matchedConsent.redirectUrl, "_blank");

            } else {
              console.log(
                "No matching consent found for bppId:",
                lender.context.bpp_id,
                "in consentDetails:",
                consentDetails
              );

              router.push(`/ondc/loanapproval?minAmt=${minValue}`);

            }

          }
        }
        // if(lender.context.bpp_id === "go-app-gateway.qa1.paywithr.io"){
        //     //here we will not show the loan offer page, we will directly hit the second select api

        // }else{
        // ✅ Navigate to the next page
        // router.push(`/ondc/loanapproval?minAmt=${minValue}`);
        // }

        // console.log("after router.push");
      } else {
        console.log("url not present in the form : ", lender);
      }
      // } else {
      //     console.log("lender is : ", lender);
      //     console.log("on select response is : ", onSelectResponse);
      // }
    } catch (error) {
      console.log("error : ", error);
    }

    // for (const onSelectResponse of onSelectResponses) {

    //     console.log("Entered for loop and onSelectResponse is : ", onSelectResponse);
    //     //
    //     try {

    //         console.log("The lender.context.bpp_id : ", lender.context.bpp_id, " and onSelectResponse : ", onSelectResponse.context.bpp_id);

    //         // if (lender.context.bpp_id === "pramaan.ondc.org/beta/preprod/mock/seller") { //for lenders with aa
    //         //     if (lender.context.bpp_id === onSelectResponse.context.bpp_id) {
    //         //         if (onSelectResponse.message?.order?.items?.[0]?.xinput?.form_response?.status === "PENDING") {
    //         //             console.log("tejas inside if");
    //         //             // exit;
    //         //         } else if (onSelectResponse.message?.order?.items[0]?.xinput?.form?.url) {
    //         //             console.log("Inside the else if");
    //         //             setSelectedLenderData(onSelectResponse);
    //         //             // ✅ Navigate to the next page
    //         //             router.push("/ondc/loanapproval");
    //         //             // console.log("after router.push");
    //         //         }
    //         //     } else {
    //         //         console.log("lender is : ", lender);
    //         //         console.log("on select response is : ", onSelectResponse);
    //         //     }
    //         // }
    //         //for lenders without aa
    //             if (lender.context.bpp_id === onSelectResponse.context.bpp_id) {
    //                 if (onSelectResponse.message?.order?.items[0]?.xinput?.form?.url) {
    //                     console.log("Inside the else if");
    //                     setSelectedLenderData(onSelectResponse);
    //                     // ✅ Navigate to the next page
    //                     router.push("/ondc/loanapproval");
    //                     // console.log("after router.push");
    //                 } else {
    //                     console.log("url not present in the form : ", onSelectResponse);
    //                 }
    //             } else {
    //                 console.log("lender is : ", lender);
    //                 console.log("on select response is : ", onSelectResponse);
    //             }

    //     } catch (error) {
    //         console.log("error : ", error);
    //     }

    // }
  };

  // Improved WebSocket message handler
  const handleWebSocketMessageForSelect = useCallback((data) => {
    console.log("Received from WebSocket:", data);

    try {
      const parsedData = JSON.parse(data.content);
      console.log(
        "The callback that we got from the on_select is :: ",
        parsedData
      );

      // const secondOn_select=((prev)=>[...prev, parsedData]);
      setOnSelectResponses((prev) => [...prev, parsedData]);

      //here we will be setting the final lenders of which we got the first onselect if the user is without account aggregator and second onselect if user is with account aggregator
      //now temporarily we will create this only for users which are without account aggregator
      if (parsedData?.message?.order?.items?.[0]?.price?.value) {
        // tejas deshmukh

        setConfirmLenders((prev) => [...prev, parsedData]);
      }

      if (parsedData?.message?.order?.items?.[0]?.tags?.[0]?.list?.[0]?.descriptor?.code === "CONSENT_HANDLER") {
        console.log("Entered in setting consent handler block");
        const consentHandler = parsedData?.message?.order?.items?.[0]?.tags?.[0]?.list?.[0]?.value || null;
        console.log("setting consent handler : ", consentHandler);
        // setConsentHandler(consentHandler);
        // setConsentHandler({
        //     bppId: parsedData.context.bpp_id,

        // })

        handleAARedirect(parsedData.context.transaction_id, consentHandler, mobileNumber, parsedData.context.bpp_id);

        //here we will call the second select api for with AA lender
        if (parsedData?.message?.order?.items?.[0]?.xinput?.form_response?.submission_id) {
          const updatedPayload = {
            transactionId: parsedData.context.transaction_id,
            bppId: parsedData.context.bpp_id,
            bppUri: parsedData.context.bpp_uri,
            providerId: parsedData.message.order.provider?.id,
            itemId: parsedData.message.order.items?.[0]?.id,
            formId: parsedData.message.order.items?.[0]?.xinput?.form?.id,
            submissionId: parsedData?.message?.order?.items?.[0]?.xinput?.form_response?.submission_id,
            version: parsedData.context?.version,
            productName: parsedData?.message?.order.provider.descriptor?.name || "NA",
            //added afterwards
            mobileNumber: mobileNumber,
            stage: 1,
            status: "APPROVED"
          };

          setPayloadForSelect(updatedPayload);
          handleSelectApi(updatedPayload);
        }


      } else {
        console.log("consent handler not present");
      }

      // setLenders((prevLenders) => {
      //     const newLenders = [parsedData, ...prevLenders];
      //     console.log(`Total lenders after callback: ${newLenders.length}`);
      //     return newLenders;
      // });

      // Update callback counter
      // setReceivedCallbacks(prev => prev + 1);
    } catch (error) {
      console.error("Error parsing on_select content:", error);
      // You might want to still add invalid data for debugging
      // setLenders((prevLenders) => [{
      //     error: "Invalid JSON",
      //     rawData: data.content,
      //     timestamp: new Date().toISOString()
      // }, ...prevLenders]);
    }
  }, []);

  const handleSelectApi = async (updatedPayload) => {
    try {
      const selectResponse = await select(updatedPayload);

      //   setConsentDetails([...consentDetails, {
      //     bppId : updatedPayload.bppId,
      //     redirectUrl : selectResponse.data
      //   }])

      console.log("The value that we got from aa second select response is : ", selectResponse);
    } catch (error) {
      console.log("error we are getting while calling select api from ondcList : ", error);
    }
  }

  useWebSocketONDCSelect(handleWebSocketMessageForSelect);

  const handleAARedirect = async (transactionId, consentHandlerId, mobileNumber, bppId) => {

    var minValue = 0;
    try {
      // for (const tempLender of lenders) {
      //   if (tempLender.context.bpp_id === bppId) {

      //     minValue =
      //       tempLender?.message?.catalog?.providers?.[0]?.items?.[0]
      //         ?.tags?.[0]?.list?.[4]?.value;
      //   }
      // }
      const lenderFound = lendersRef.current.find(
        (l) => l.context?.bpp_id === bppId
      );

      if (lenderFound) {
        minValue =
          lenderFound?.message?.catalog?.providers?.[0]?.items?.[0]?.tags?.[0]
            ?.list?.[4]?.value || 0;
      }
    } catch (error) {
      console.log("error while iterating lenders array");
    }

    try {

      const frontendUrl = "https://www.arysefin.com/";
      // const redirectUrl = `http://localhost:3000/ondc/loanapprovefetch?minAmt=${minValue}&bppId=${bppId}&transactionId=${transactionId}&mobileNumber=${mobileNumber}`;
      const redirectUrl = `${frontendUrl}ondc/loanapprovefetch?minAmt=${minValue}&bppId=${bppId}&transactionId=${transactionId}&mobileNumber=${mobileNumber}`;

      // encode the URL so it won't break on &
      const safeRedirectUrl = encodeURIComponent(redirectUrl);

      const formData = new FormData();
      formData.append("transactionId", transactionId);
      formData.append("srcref", consentHandlerId);
      formData.append("mobileNumber", mobileNumber);
      formData.append("redirectUrl", safeRedirectUrl);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}finvuRedirect`, formData);

      setConsentDetails((prevConsentDetails) => [
        ...prevConsentDetails,
        {
          bppId: bppId,
          redirectUrl: response.data
        }
      ]);

      console.log("The response that we got from finvu is : ", response);
    } catch (error) {
      console.log("error in handleAARedirect : ", error);
    }

  }

  useEffect(() => {
    if (onSelectResponses.length > 0) {
      console.log("The on select responses are : ", onSelectResponses);
      // setLoading(false);
    }
  }, [onSelectResponses]);

  useEffect(() => {
    // if (Object.keys(SelectedLenderData).length !== 0) {
    console.log("The selectedLenderData is : ", SelectedLenderData);
    //   }
  }, [SelectedLenderData]);

  useEffect(() => {
    // fetchLendersByPincode(411014);
    getSortedLenders(mobileNumber);
  }, []);

  // const fetchLendersByPincode=async(pincode)=>{
  //     try{
  //         const formData = new FormData();
  //         formData.append("pincode", pincode);
  //         const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}fetchByPincode`,formData);

  //         if(response.status === 200){
  //             setBackendProducts(response.data);
  //         }

  //         console.log("response from fetchLendersByPincode : ",response);
  //     }catch(error){
  //         console.log("error in fetching lenders by pincode : ",error);
  //     }
  // }

  const getSortedLenders = async (mobilenumber) => {
    try {
      const formData = new FormData();
      console.log(
        "mobilenumber we are sending to getSortedLenders is : ",
        mobilenumber
      );
      formData.append("mobile", mobilenumber);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}getSortedProducts`,
        {
          params: {
            mobile: mobilenumber,
          },
        }
      );

      if (response.status === 200) {
        setBackendProducts(response.data);
        console.log(
          "The response that we got from the getSortedProducts is : ",
          response
        );
        // if (Object.keys(response.data).length > 1) {
        //   console.log("setting the sortedProduct flag as true");
        //   setGotSortedProductFlag(true);
        //   // useWebSocketONDC(handleWebSocketMessage);
        // }
        // else if(Object.keys(response.data).length === 0) {
        //   window.location.href = `https://app.credithaat.com/RejectionPage?$mobileNumber=${mobilenumber}`;
        // }
        if (Object.keys(response.data).length >= 1) {
          console.log("setting the sortedProduct flag as true");
          setGotSortedProductFlag(true);
          // useWebSocketONDC(handleWebSocketMessage);
        }
        else if(Object.keys(response.data).length === 0) {

          handleEmbeddedRedirection();

          // getLendersListRysa();
          // router.push(`ondc/rejection?mobileNumber=${mobilenumber}`);
          // window.location.href = `https://app.credithaat.com/RejectionPage?$mobileNumber=${mobilenumber}`;
          //here we will call the rejection page of yogita
        }
      }

      console.log("response from fetchLendersByPincode : ", response);
    } catch (error) {
      console.log("error in fetching lenders by pincode : ", error);
    }
  };

  // const handleGetLoanClickForElsePart=async(e)=>{
  //     await getLendersListRysa(e);
  // }

  const getLendersListRysa = async (e) => {
    e.preventDefault();
    //here firstly we will call arysfin getUserInfo api where we will get all the details of that user
    // try {

    // } catch (error) {
    //     console.log("got error while fetching lenders", error);
    // }

    // setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("mobileNumber", mobileNumber);
      const userDetailsResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}getUserDetails`,
        formData
      );
      const userDetails = {
        // workPincode: userDetailsResponse?.data?.workPincode || "",
        // maritalStatus: userDetailsResponse?.data?.maritalStatus || "",
        // paymentType: userDetailsResponse?.data?.paymentType ?? "",
        mobilenumber: mobileNumber,
        dob: userDetailsResponse?.data?.dob || "",
        profession: userDetailsResponse?.data?.profession || "",
        income: userDetailsResponse?.data?.income || "",
        payment_type: userDetailsResponse?.data?.paymentType ?? "",
        pincode: userDetailsResponse?.data?.pincode || "",
        firstname: userDetailsResponse?.data?.firstNameFromPan || "",
        lastname: userDetailsResponse?.data?.lastNameFromPan || "",
        pan: userDetailsResponse?.data?.pan || "",
        gender: userDetailsResponse?.data?.gender || "",
        addressline1: userDetailsResponse?.data?.addressline1 || "",
        email: userDetailsResponse?.data?.email || "",
        officeaddresspincode: userDetailsResponse?.data?.workPincode || "",
        maritalstatus: userDetailsResponse?.data?.maritalStatus || "",
        company: userDetailsResponse?.data?.company || "",
        creditProfile: userDetailsResponse?.data?.creditProfile || ""

      };
      if (userDetailsResponse.status === 200) {
        console.log(
          "The response that we got from getUserInfo is : ",
          userDetailsResponse
        );
      }

      const payload = {
        mobilenumber: mobileNumber,
        dob: formSubmissionData?.dob || userDetails.dob,
        profession: formSubmissionData?.employmentType || userDetails.profession,
        income: formSubmissionData?.income || userDetails.income,
        payment_type: userDetails?.payment_type, //
        pincode: formSubmissionData?.pincode || userDetails.pincode,
        firstname: formSubmissionData?.firstName || userDetails.firstname,
        lastname: formSubmissionData?.lastName || userDetails.lastname,
        pan: formSubmissionData?.pan || userDetails.pan,
        gender: formSubmissionData?.gender || userDetails.gender,
        addressline1: formSubmissionData?.addressL1 || userDetails.addressline1,
        email: formSubmissionData?.email || userDetails.email,
        officeaddresspincode: userDetails?.workPincode || userDetails.officeaddresspincode, //
        maritalstatus: userDetails?.maritalstatus || userDetails.maritalstatus, //
        company: formSubmissionData?.companyName || userDetails.company,
        // agent_id: formData.agentId,
        // agent: formData.agent,
        // email: ONDCFormData.email,
        agentid: 357046965,
        agent: "arysefinlead",
        creditprofile: userDetails.creditProfile
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_UAT_BASE_URL_CH}user/reg/embeddedarysefin`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=", // ✅ your token
          },
        }
      );

      if (response.data.data?.redirectionlink) {
        let redirectUrl = response.data.data.redirectionlink;
        // If URL already has ?, append with &, otherwise add ?
        redirectUrl += redirectUrl.includes("?") ? "&sso=yes" : "?sso=yes";
        window.location.href = redirectUrl;
      }

      if (response.data.code === 200 && response.data.data?.redirectionlink) {
        let redirectUrl = response.data.data.redirectionlink;

        // If URL already has ?, append with &, otherwise add ?
        redirectUrl += redirectUrl.includes("?") ? "&sso=yes" : "?sso=yes";

        window.location.href = redirectUrl;
      } else {
        console.error(
          "API did not return a valid redirect link",
          response.data
        );
      }
    } catch (error) {
      console.error("Error calling user/reg/embedded API:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <>
      {!loading ? (
        <>
          {/* <div className={styles.numberStart}>  */}
          <div className={`${styles.numberStart} ${outfit}`}> 
            <div className={styles.numberOneDiv}>
              {" "}
              {/*header*/}
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
            </div>
            {/*header end*/}
            <div className={styles.numberTwoDiv}>
              <div
                className={`${outfit.className} ${styles.listpageContainer}`}
              >
                {/* <div> */}
                {/* <div>
                                    <p>WebSocket Connected: {isWebsocketConnectionEstablished ? 'Yes' : 'No'}</p>
                                    <p>Searching: {isSearching ? 'Yes' : 'No'}</p>
                                    <p>Has Searched: {hasSearched ? 'Yes' : 'No'}</p>
                                    <p>Callbacks Received: {receivedCallbacks}</p>
                                    <p>Total Lenders: {lenders.length}</p>
                                    <button onClick={manualSearch} disabled={isSearching}>
                                        {isSearching ? 'Searching...' : 'Manual Search'}
                                    </button>
                                </div> */}

                {/* Display lenders data */}
                {confirmLenders.length > 0 ? (
                  <>
                    <div className={styles.allnewcardContainer}>
                      {confirmLenders.map((lender, index) => (
                        <div className={styles.newcardContainer} key={index}>
                          {!lender.error ? (
                            <>
                              <div className="newcard-container">
                                {/* {!lender.error?(<> */}

                                <div className={styles.cardLogo}>
                                  {/* <Image
                                                    src={lender?.message?.catalog?.providers?.[0]?.descriptor?.images?.[0]?.url || clock}
                                                    // src={clock}
                                                    alt="Logo"
                                                    width={100}
                                                    height={40}
                                                    className="logo-image"
                                                    style={{ width: "auto" }}
                                                    /> */}
                                  <img
                                    // src={lender?.message?.catalog?.providers?.[0]?.descriptor?.images?.[0]?.url}
                                    src={
                                      lender?.message?.order?.provider
                                        ?.descriptor?.images?.[0]?.url
                                    }
                                    //   alt="Lender Logo"
                                    alt={
                                      lender?.message?.order?.provider
                                        ?.descriptor?.name || "Lender Logo"
                                    }
                                    width={100}
                                    height={40}
                                    //   onError={(e) => { e.currentTarget.src = clock }}
                                    style={{ objectFit: "contain" }}
                                  />{" "}
                                  {/* Display image here */}
                                </div>
                                {/* <div className="subcardheader">
                                                    <p className="card-subtitle">{lender.product}</p>
                                                    </div> */}
                                <div className={styles.cardBody}>
                                  {/* <h1 className={styles.amount}>INR {lender?.message?.catalog?.providers?.[0]?.items?.[0]?.tags?.[0]?.list?.[5]?.value || "N/A"} */}

                                  {/* <h1 className={styles.amount}>INR {lender?.message?.order?.items?.[0]?.price?.value || "N/A"} */}
                                  <h1 className={styles.amount}>
                                    INR{" "}
                                    {lender?.message?.order?.quote?.breakup?.[0]
                                      ?.price?.value || "N/A"}
                                  </h1>
                                  <p className={styles.maxAmount}>
                                    Max. Amount
                                  </p>
                                </div>
                                <div className={styles.cardInfo}>
                                  <div className={styles.infoItem}>
                                    {/* <span role="img" aria-label="clock">⏱</span>{lender.description} */}
                                    <span role="img" aria-label="clock">
                                      <Image
                                        src={clock}
                                        width={15}
                                        height={15}
                                        alt="clock"
                                      />
                                    </span>
                                    {lender?.message?.order?.items?.[0]
                                      ?.tags?.[0]?.list?.[1]?.value || "NA"}
                                  </div>
                                  <div className={styles.infoItem}>
                                    {/* <span role="img" aria-label="interest">💰</span>{lender.interest} */}
                                    {/* <span role="img" aria-label="interest"></span> */}
                                    <span role="img" aria-label="percentage">
                                      <Image
                                        src={per}
                                        alt="percentage image"
                                        width={15}
                                        height={15}
                                      />
                                    </span>
                                    {
                                      /* {lender.interest} */ <p>
                                        Interest{" "}
                                        {
                                          lender?.message?.order?.items[0]
                                            ?.tags[0]?.list[0]?.value
                                        }
                                      </p>
                                    }
                                  </div>
                                </div>
                                <div>
                                  {
                                    <button
                                      className={styles.cardButton}
                                      onClick={() => handleGetLoanClick(lender)}
                                    >
                                      Get Loan
                                    </button>
                                  }
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  // <div>Finding the lenders suitable for you...</div>
                  //here we will show the credithaat lender to the lender i.e if no lender is present for that user

                  <>
                    <div className={styles.allnewcardContainer}>
                      {backendProducts
                        .filter((lender) => lender.productName === "CreditHaat")
                        .map((lender, index) => (
                          <div className={styles.newcardContainer} key={index}>
                            {!lender.error ? (
                              <>
                                <div className="newcard-container">
                                  {/* {!lender.error?(<> */}

                                  <div className={styles.cardLogo}>
                                    {/* <Image
                                                    src={lender?.message?.catalog?.providers?.[0]?.descriptor?.images?.[0]?.url || clock}
                                                    // src={clock}
                                                    alt="Logo"
                                                    width={100}
                                                    height={40}
                                                    className="logo-image"
                                                    style={{ width: "auto" }}
                                                    /> */}
                                    <img
                                      // src={lender?.message?.catalog?.providers?.[0]?.descriptor?.images?.[0]?.url}
                                      src={lender.logo}
                                      //   alt="Lender Logo"
                                      alt="Lender Logo"
                                      width={100}
                                      height={40}
                                      //   onError={(e) => { e.currentTarget.src = clock }}
                                      style={{ objectFit: "contain" }}
                                    />{" "}
                                    {/* Display image here */}
                                  </div>
                                  {/* <div className="subcardheader">
                                                    <p className="card-subtitle">{lender.product}</p>
                                                    </div> */}
                                  <div className={styles.cardBody}>
                                    {/* <h1 className={styles.amount}>INR {lender?.message?.catalog?.providers?.[0]?.items?.[0]?.tags?.[0]?.list?.[5]?.value || "N/A"} */}

                                    {/* <h1 className={styles.amount}>INR {lender?.message?.order?.items?.[0]?.price?.value || "N/A"} */}
                                    <h1 className={styles.amount}>
                                      INR {lender.maxAmount || "N/A"}
                                    </h1>
                                    <p className={styles.maxAmount}>
                                      Max. Amount
                                    </p>
                                  </div>
                                  <div className={styles.cardInfo}>
                                    <div className={styles.infoItem}>
                                      {/* <span role="img" aria-label="clock">⏱</span>{lender.description} */}
                                      <span role="img" aria-label="clock">
                                        <Image
                                          src={clock}
                                          width={15}
                                          height={15}
                                          alt="clock"
                                        />
                                      </span>
                                      {lender.tenureRange || "NA"}
                                    </div>
                                    <div className={styles.infoItem}>
                                      {/* <span role="img" aria-label="interest">💰</span>{lender.interest} */}
                                      {/* <span role="img" aria-label="interest"></span> */}
                                      <span role="img" aria-label="percentage">
                                        <Image
                                          src={per}
                                          alt="percentage image"
                                          width={15}
                                          height={15}
                                        />
                                      </span>
                                      {
                                        /* {lender.interest} */ <p>
                                          Interest {lender.interestRange}
                                        </p>
                                      }
                                    </div>
                                  </div>
                                  <div>
                                    {
                                      <button
                                        className={styles.cardButton}
                                        onClick={(e) => getLendersListRysa(e)}
                                      >
                                        <span>Get Loan</span>
                                      </button>
                                    }
                                  </div>
                                </div>
                              </>
                            ) : null}
                          </div>
                        ))}
                    </div>
                  </>
                )}
                {/* </div> */}
              </div>
            </div>
            {/*secondend*/}
          </div>
          {/*numberStart div*/}
        </>
      ) : (
        <>
          <LendersLoader />
        </>
      )}
    </>
  );
};

export default Ondclist;
