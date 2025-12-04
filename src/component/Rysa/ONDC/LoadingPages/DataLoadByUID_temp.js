"use client"

//here we will need to write the logic if select api is not hitted

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useContext } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { onSearchForm } from "../formSubmitApis/FormSubmitApi";
import useWebSocketONDCSelect from "../Websocket/useWebSocketONDCSelect";
// import UIDContext from "../context/UIDContext";
import UIDContext from '../../context/UIDContext';
import OnSearchContext from "../context/OnSearchContext";
// import LendersLoader from './LendersLoader';
import LendersLoader from "./Auto_start_timer";
// import clock from "./images/clock.png";
// import clock from "../images/clock.png";
import SelectedLenderContext from '../context/SelectedLenderContext';
// import styles from "./styleondclist.module.css";
import styles from "../styleondclist.module.css";
import { Outfit } from "next/font/google";
import logo2 from "../images/AryseFin_logo.png";
import clock from "../images/clock.png";
import Image from "next/image";
import { select } from "../apis/ondcapi";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap",
});

const DataLoadByUID = () => {

    // const [hdbFound, setHdbFound] = useState(false);
    const [hdbRecord, setHdbRecord] = useState([]);

    const lendersRef = useRef([]);

    const [loading, setLoading] = useState(true);

    const [consentDetails, setConsentDetails] = useState([]);
    const [globalMinValue, setGlobalMinValue] = useState(0);

    const {
        uid,
        setUId,
        isWebsocketConnectionEstablished,
        setIsWebsocketConnectionEstablished,
    } = useContext(UIDContext);

    const { SelectedLenderData, setSelectedLenderData, bff, setBff } = useContext(
        SelectedLenderContext
    );

    const [lenders, setLenders] = useState([]);
    const [backendProducts, setBackendProducts] = useState([]);
    const {
        formSubmissionData,
        setFormSubmissionData,
        payloadForSelect,
        setPayloadForSelect,
    } = useContext(OnSearchContext);
    const [confirmLenders, setConfirmLenders] = useState([]);

    const searchParams = useSearchParams();
    const router = useRouter();
    const mobile = searchParams.get("mobilenumber");

    const [mobileNumber, setMobileNumber] = useState(mobile);
    // 8810550688

    useEffect(() => {
        const timer = setTimeout(() => {
            // console.log("⏰ Callback executed after 50 seconds!");
            // setLoading(false);
            // console.log("The confirm lenders length is : ",confirmLendersRef.current.length," and is : ",confirmLendersRef);
            if (confirmLendersRef.current.length === 0) {
                handleMISStatus();
                handleEmbeddedRedirection(); //temporary just for testing purpose we are commenting it
                // router.push(`/ondc/rejection?mobileNumber=${mobileNumber}`);
                // router.push(`https://app.credithaat.com/embedded_journey?mobileNumber=${mobileNumber}`);
            }
            setTimeout(() => {
                setLoading(false);
            }, 1000);
            // ✅ Place your logic here (API call, state update, etc.)
        }, 60000); // 50,000 ms = 30 seconds

        return () => clearTimeout(timer); // cleanup if component unmounts
    }, []);

    useEffect(() => {
        if (Object.keys(formSubmissionData).length === 0) {
            getONDCFormData();
        }
        callbacksLoadByMobileNumber();
        getHdbProduct(mobileNumber);
    }, [])

    const confirmLendersRef = useRef([]);

    useEffect(() => {
        console.log("confirm lenders updated and they are :: ", confirmLenders);
        confirmLendersRef.current = confirmLenders;
    }, [confirmLenders]);

    const getONDCFormData = async () => {
        try {
            const formData = new FormData();
            formData.append("mobileNumber", mobileNumber);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}getONDCFormDataDTO`, formData);
            if (response.status === 200) {
                setFormSubmissionData(response.data);
            }
        } catch (error) {
            console.log("error in getONDCFormData function : ", error);
        }
    }

    useEffect(() => {
        if (Object.keys(lenders).length > 0 && Object.keys(backendProducts).length > 0) {
            handleLenders();
        }
    }, [lenders, backendProducts])

    //check if data is present of the user
    const callbacksLoadByMobileNumber = async () => {
        try {
            const formData = new FormData();
            formData.append("mobileNumber", mobileNumber);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}getFirstPageData`, formData);

            if (response.status === 200) {
                console.log("The response that we got is : ", response);
                if (response.data && response.data.length > 0) {
                    console.log("The transaction id is : ", response.data?.[0]?.context?.transaction_id);
                    setUId(response.data?.[0]?.context?.transaction_id);
                    const processDataResponse = await processData(response.data);
                    console.log("The processDataResponse is : ", processDataResponse);
                } else {

                    handleMISStatus();
                    //here if we didn't get any record then we will redirect the user to the embedded journey 
                    handleEmbeddedRedirection();

                    // router.push(`/ondc?mobilenumber=${mobileNumber}`);
                    //here if we want we can hit the search api and generate a new transaction id
                }

            }

        } catch (error) {
            console.log("getting errors while loading the callbacks : ", error);
        }
    }

    const handleMISStatus = async () => {
        try {
            const formData = new FormData();
            formData.append("mobileNumber", mobileNumber);
            formData.append("status", "99"); //99 stands for user is redirected to embedded
            const response = axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}api/mis/updateBeforeTransaction`, formData);
            if (response.status === 200) {
                console.log("status updated");
            }
        } catch (error) {
            console.log("error while saving the MISStatus", error);
        }
    }

    //if present then load the list of the lenders which have successfully given two onselect for that user
    const processData = async (data) => {
        try {
            const response = data.filter(item => !item.error)
            // here we will set the on_search responses with no error in lenders
            setLenders(response.filter(item => item.context.action === "on_search"));
            //this response contains lenders without error parameter
            if (response.length > 0) {
                // console.log("the response that we got is : ",response.length," and response is : ",response);
                const selectResponse = response.filter(item => item.context.action === "on_select")
                console.log("The on_select response is : ", selectResponse);
                //this response2 contains the on_select of lenders
                if (selectResponse.length > 0) {
                    //here we will get the products for that user and then get the onselect for that 
                    console.log("The select response is : ", selectResponse);
                    //we will need to call thi function in loop for each select response

                    for (const [index, item] of selectResponse.entries()) {
                        console.log(`Processing item ${index + 1}:`, item);
                        await handleWebSocketMessageForSelectManual(item);
                    }


                    // handleWebSocketMessageForSelectManual(selectResponse);


                } else {
                    //as we didn't got the older onselect for this partiular user then now we will fetch the products for the lenders by checking their bre and then we will match that particular lenders and will call the select api for that lenders
                    //inside this function we get a sorted products from backend and set them into backendProducts
                    getSortedLenders(mobileNumber);
                }
            } else {
                handleMISStatus();
                //here we will redirect the user to the embedded page as we didn't got any onsearch without error
                handleEmbeddedRedirection();
            }
        } catch (error) {
            console.log("error while processing data : ", error);
        }
    }
    //if data of within 7 days are not present then generate the new transaction id and begin new journey

    //This function is to save user data in loan.credithaat.com and then return the user to app.credithaat.com/embedded_journey
    const handleEmbeddedRedirection = async () => {

        try {
            const formData = new FormData();
            formData.append("mobileNumber", mobileNumber);
            formData.append("agent", "arysefinlead");
            formData.append("agentId", "357046965");
            const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}api/redirectUser`, formData);

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

    //we will call this if we already got the select api else we wont call this
    const handleWebSocketMessageForSelectManual = async (data) => {

        console.log("Received from WebSocket:", data);

        try {
            const parsedData = data;
            // const parsedData = JSON.parse(data);//here we will not get the data.content as we are sendin here data maually which is not in content parameter
            console.log(
                "The callback that we got from the on_select is :: ",
                parsedData
            );

            //here we will be setting the final lenders of which we got the first onselect if the user is without account aggregator and second onselect if user is with account aggregator
            //now temporarily we will create this only for users which are without account aggregator
            if (parsedData?.message?.order?.items?.[0]?.price?.value) {
                console.log("confirmLenders:", confirmLenders);

                setConfirmLenders((prev) => {
                    const confirmPresent = prev.some(
                        (cf) => cf.context.bpp_id === parsedData.context.bpp_id
                    );

                    if (confirmPresent) {
                        // remove old and add new
                        return [
                            ...prev.filter(
                                (lender) => lender.context.bpp_id !== parsedData.context.bpp_id
                            ),
                            parsedData,
                        ];
                    } else {
                        // just add
                        return [...prev, parsedData];
                    }
                });

            }

            if (parsedData?.message?.order?.items?.[0]?.tags?.[0]?.list?.[0]?.descriptor?.code === "CONSENT_HANDLER") {
                console.log("Entered in setting consent handler block");
                const consentHandler = parsedData?.message?.order?.items?.[0]?.tags?.[0]?.list?.[0]?.value || null;
                console.log("setting consent handler : ", consentHandler);

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
        } catch (error) {
            console.error("Error parsing on_select content:", error);
        }
    }

    const handleAARedirect = async (transactionId, consentHandlerId, mobileNumber, bppId) => {

        var minValue = 0;
        try {
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

    //If we didn't get a old onselect then we will hit the select api again for the lenders by submitting their forms
    const handleLenders = async () => {
        if (lenders) {
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
                // setBackendProducts(response.data);
                console.log(
                    "The response that we got from the getSortedProducts is : ",
                    response
                );
                if (Object.keys(response.data).length >= 1) {
                    console.log("setting the sortedProduct flag as true");
                    //here as we got the products from our product table we can hit the select api for that lenders
                    // handleLenders(response.data);
                    // setGotSortedProductFlag(true);
                    setBackendProducts(response.data);
                    //here we will check if hdb lender is present in list if present we will add that in confirmLenders
                    // find HDB object
                    // const hdbObject = response.data.find(item => item.productName === "HDB");


                    // const hdbObject = response.data.find(
                    //     item => item.productName?.toLowerCase() === "hdb"
                    //   );
                    //   if (hdbObject) {
                    //     setConfirmLenders((prev) => {
                    //       const alreadyPresent = prev.some(
                    //         (l) => l.productName?.toLowerCase() === "hdb"
                    //       );
                    //       if (!alreadyPresent) {
                    //         return [...prev, hdbObject];
                    //       }
                    //       return prev; // no duplicates
                    //     });
                    //     setHdbRecord([hdbObject]);
                    //   }



                    // if (hdbObject) {
                    //     // setConfirmLenders([hdbObject]);
                    //     setConfirmLenders((prev) => [...prev, hdbObject]);
                    //     setHdbRecord([hdbObject]);
                    //     // setHdbFound(true);
                    // }

                }
                else if (Object.keys(response.data).length === 0) {
                    handleMISStatus();
                    handleEmbeddedRedirection();
                }
            }
            console.log("response from fetchLendersByPincode : ", response);
        } catch (error) {
            console.log("error in fetching lenders by pincode : ", error);
        }
    };

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

    const handleWebSocketMessageForSelect = useCallback((data) => {
        console.log("Received from WebSocket:", data);

        try {
            const parsedData = JSON.parse(data.content);
            console.log(
                "The callback that we got from the on_select is :: ",
                parsedData
            );
            // setOnSelectResponses((prev) => [...prev, parsedData]);
            if (parsedData?.message?.order?.items?.[0]?.price?.value) {
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
        } catch (error) {
            console.error("Error parsing on_select content:", error);
        }
    }, []);

    useWebSocketONDCSelect(handleWebSocketMessageForSelect);

    const handleGetLoanClick = (lender) => {

        try {
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

                            //this is for non AA lenders
                            // router.push(`/ondc/loanapprovefetch?bppId=${lender.context.bpp_id}&transactionId=${lender.context.transaction_id}&mobileNumber=${mobileNumber}&minAmt=${minValue}`);
                            // https://www.arysefin.com/ondc/loanapprovefetch?bppId=app-gateway.paywithring.com&transactionId=19405f8b-3ebe-41df-bfb9-d4bdb3aa1158&mobileNumber=8870192503&minAmt=20000
                            console.log(
                                "No matching consent found for bppId:",
                                lender.context.bpp_id,
                                "in consentDetails:",
                                consentDetails
                            );
                            router.push(`/ondc/loanapprovefetch?bppId=${lender.context.bpp_id}&transactionId=${lender.context.transaction_id}&mobileNumber=${mobileNumber}&minAmt=${minValue}`);
                            // router.push(`/ondc/loanapproval?minAmt=${minValue}`);

                        }
                    }
                }
            } else {
                console.log("url not present in the form : ", lender);
            }
        } catch (error) {
            console.log("error : ", error);
        }
    };

    const handleGetLoanClickForHdb = () => {
        console.log("clicked hdb ...");
    }

    const getHdbProduct=async(mobilenumber)=>{
        try{
            const formData = new FormData();
            formData.append("mobile", mobilenumber);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}getHdbProduct`,
                {
                    params: {
                        mobile: mobilenumber,
                    },
                }
            );

            if(response.status === 200){
                // setConfirmLenders([response.data]);
                setConfirmLenders((prev) => [...prev, response.data]);
                setHdbRecord([response.data]);
            }

        }catch(error){
            console.log("error while getting the hdb product : ",error);
        }
    }

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

                                {hdbRecord && hdbRecord.length > 0 && (
                                    <div className={styles.allnewcardContainer}>
                                        {hdbRecord.map((lender, index) => (
                                            <div className={styles.newcardContainer} key={lender.id || index}>
                                                {!lender.error && (
                                                    <div className="newcard-container">
                                                        <div className={styles.cardLogo}>
                                                            <img
                                                                src={lender.url || "/default-logo.png"} // fallback image
                                                                alt="Lender Logo"
                                                                width={100}
                                                                height={40}
                                                                style={{ objectFit: "contain" }}
                                                            />
                                                        </div>

                                                        <div className={styles.cardBody}>
                                                            <h1 className={styles.amount}>
                                                                INR {lender.max_loanamount || "N/A"}
                                                            </h1>
                                                            <p className={styles.maxAmount}>Max. Amount</p>
                                                        </div>

                                                        <div className={styles.cardInfo}>
                                                            <div className={styles.infoItem}>
                                                                <Image src={clock} width={15} height={15} alt="clock" />
                                                                {lender.maxTenure || "NA"}
                                                            </div>
                                                            <div className={styles.infoItem}>
                                                                <Image src={per} alt="percentage image" width={15} height={15} />
                                                                <p>Interest {lender.maxInterest || "N/A"}</p>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <button
                                                                className={styles.cardButton}
                                                                onClick={() => handleGetLoanClickForHdb(lender)}
                                                            >
                                                                Get Loan
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}


                                {confirmLenders.length > 0 ? (
                                    <>
                                        <div className={styles.allnewcardContainer}>
                                            {confirmLenders.filter(lender => lender.productName?.toLowerCase() !== "hdb").map((lender, index) => (
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
    )
}

export default DataLoadByUID