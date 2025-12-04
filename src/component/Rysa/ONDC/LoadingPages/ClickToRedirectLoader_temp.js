"use client";
import React, { useState, useRef, useCallback, useContext } from "react";
import "./LoadingPage.css";
import { Roboto } from 'next/font/google';
// import useWebSocketONDCstatus from "./Websocket/useWebSocketONDCstatus";
import useWebSocketONDCInit from "../Websocket/useWebSocketONDCInit";
import useWebSocketONDCstatus from "../Websocket/useWebSocketONDCstatus";
import OnStatusContext from "../context/OnStatusContext";
import { confirm } from "../apis/ondcapi";
import useWebSocketONDCConfirm from "../Websocket/useWebSocketONDCConfirm";
import ConfirmingLoader from "../LoadingPages/ConfirmingLoader";
import { useRouter } from "next/navigation";
// import OnSearchContext from "./context/OnSearchContext";
import OnSearchContext from "../context/OnSearchContext";
// import SelectedLenderContext from "../context/SelectedLenderContext";
import SelectedLenderContext from "../context/SelectedLenderContext";

const roboto = Roboto({
    weight: ["400", "700"],
    subsets: ["latin"],
});

const ClickToRedirectLoader = () => {

    const { formSubmissionData, setFormSubmissionData, payloadForSelect, setPayloadForSelect } = useContext(OnSearchContext);
    const { SelectedLenderData, setSelectedLenderData, globalSettlementAmount , setGlobalSettlementAmount } = useContext(SelectedLenderContext);

    const router = useRouter();

    const [loanApproved, setLoanApproved] = useState(false);
    const [confirming, setConfirming] = useState(false);

    // 1. Define ref at the top of your component
    const externalFormWindowRef = useRef(null);

    const { onStatusData, setOnStatusData, initPayload, setInitPayload, onOnitData, setOnInitData } = useContext(OnStatusContext);

    const handleWebSocketMessageForStatus = useCallback((data) => {

        console.log("received response id of form in ClickToRedirectLoader & i.e : ", data);
        try {

            const parsedData = JSON.parse(data.content);
            //here we should be creating one global variable or context which will hold this onstatus callback

            if (parsedData?.message?.order?.items?.[0]?.xinput?.form_response?.status === "APPROVED" && parsedData?.message?.order?.items?.[0]?.xinput?.form_response?.submission_id) {
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
                    formId: parsedData?.message?.order?.items?.[0]?.xinput?.form?.id
                        || onOnitData?.message?.order?.items?.[0]?.xinput?.form?.id
                        || "NA",
                    submissionId: parsedData.message.order.items[0].xinput.form_response.submission_id,
                    bankCode: "HDFC",
                    accountNumber: "1234567890",
                    vpa: "user@upi",
                    // settlementAmount: "1666.67",
                    settlementAmount: globalSettlementAmount,
                    version: parsedData.context.version,
                    paymentId: parsedData.message.order.payments[0].id,
                    mobileNumber: formSubmissionData.contactNumber,
                    stage: 200, //here in backend select methid we will check that if the stage is 2 then we will create a apply record for that user
                    productName: SelectedLenderData.message.order.provider.descriptor.name,
                }


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
    }

    const handleButtonClick = () => {
        // console.log("The onstatus data after clicking the button is : ",onStatusData);
        const formUrl = onOnitData?.message?.order?.items?.[0]?.xinput?.form?.url;


        if (formUrl) {
            if (!externalFormWindowRef.current || externalFormWindowRef.current.closed) {
                externalFormWindowRef.current = window.open(formUrl, "_blank");
            } else {
                externalFormWindowRef.current.location = formUrl;
            }
        } else {
            console.log("No form URL found for Loan Agreement form");
        }

    }

    //function to handle onConfirm callback

    const handleWebSocketMessageForConfirm = useCallback((data) => {

        const parsedData = JSON.parse(data.content);

        // ✅ CLOSE FORM TAB IF OPEN
        if (externalFormWindowRef.current && !externalFormWindowRef.current.closed) {

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

    const handleStatusCall= async (statusPayload)=>{
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}status`,statusPayload);
            console.log("The status api call response is : ",response);
            if(response.status === 200){
                router.push("/ondc/submitpage");
            }
        }catch(error){
            console.log("error in making status call",error);
        }
    }

    return (
        <>

            {!confirming ? (<>
                <div className={`${roboto.className} waiting-table`}>
                    {/* <div className="loading-circle">
                <svg className="hourglass-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z"
                        fill="#6039D2" stroke="#6039D2" strokeWidth="2.5" />
                </svg>
            </div>

            <div className="loading-text">
                <h3 style={{ textAlign: "center" }}> <b>Please Wait...</b> </h3>
                <br></br>
                <p className='para'>Click Next to Fill your last form and get a loan</p>
                {/* <button onClick={()=>handleButtonClick()}>Loan Aggrement</button> */}
                    {/* <p className='para'>Do not press the back button or refresh the page</p>
            </div>  */}
                    <div className="loading-circle">
                        <svg className="redirect-icon" viewBox="0 0 24 24" fill="none" width="64" height="64">
                            <path d="M10 17l5-5-5-5v10zM19 3H5c-1.1 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                                fill="#6039D2" stroke="#6039D2" strokeWidth="1.5" />
                        </svg>
                    </div>

                    <div className="loading-text">
                        <h3 style={{ textAlign: "center" }}> <b>Preparing Your Final Step...</b> </h3>
                        <br />
                        <p className='para'>We are redirecting you to the final form. Please follow the instructions carefully.</p>
                        <p className='para'>Avoid going back or refreshing the page to prevent any data loss.</p>
                    </div>


                    {/* Submit Button */}
                    <div className="Long-button">
                        <button
                            type="submit"
                            className="form-submit"
                            onClick={() => handleButtonClick()}
                        >
                            Next
                        </button>
                    </div>

                    {/* Submit Button */}
                    {/* <div className="btnContainer">
                <button
                  type="submit"
                  className="nextBtn"
                >
                  Next
                </button>
              </div> */}


                </div>
            </>) : (<><ConfirmingLoader /></>)}
        </>
    );
};

export default ClickToRedirectLoader;

