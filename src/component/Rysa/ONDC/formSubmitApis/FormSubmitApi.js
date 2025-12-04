import axios from 'axios';
import { useContext, useCallback } from 'react';
import OnSearchContext from "../../ONDC/context/OnSearchContext";
import { select } from "../apis/ondcapi";

export const onSearchForm = async (formUrl, setFormSubmissionData, formSubmissionData, setPayloadForSelect, payloadForSelect, version) => {

    try {
        // Basic null or empty check
        if (!formSubmissionData || Object.keys(formSubmissionData).length === 0) {
            console.warn("❌ formSubmissionData is empty or undefined.");
            return "return because of empty formSubmissionData";
        }

        // Optional: required field validation
        const requiredFields = [
            "firstName", "lastName", "dob", "gender", "pan", "contactNumber",
            "email", "employmentType", "endUse", "income", "companyName",
            "addressL1", "city", "state", "pincode", "aa_id", "bureauConsent"
        ];

        const missingFields = requiredFields.filter(
            (field) => !formSubmissionData[field]
        );

        if (missingFields.length > 1) {
            console.warn("❌ Missing required fields:", missingFields);
            return "return because of missing fields";
        }

        if (version === "2.0.1") {

            const formData = new URLSearchParams();

            // const formData = new FormData();
            // for (const [key, value] of Object.entries(formSubmissionData)) {
            //     formData.append(key, value);
            // }

            for (const [key, value] of Object.entries(formSubmissionData)) {
                if (key === "dob" && value) {
                    const dateObj = new Date(value); // value is in yyyy-MM-dd
                    const day = String(dateObj.getDate()).padStart(2, "0");
                    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
                    const year = dateObj.getFullYear();
                    formData.append(key, `${day}/${month}/${year}`);
                }
                else if (key === "income" && (payloadForSelect.bppId === "bfl.ondcprod.ignosis.ai" || payloadForSelect.bppId === "pahal.ondcprod.ignosis.ai")) {
                    const incomeNum = Number(value);
                    if (!isNaN(incomeNum)) {
                        formData.append(key, incomeNum * 12);
                    } else {
                        // Handle invalid income string
                        console.error("Invalid income value:", value);
                    }
                }
                else if(key === "aa_id"){
                // formData.append(key, value*12);
                } 

                else {
                    formData.append(key, value);
                }
            }

            const response = await axios.post(formUrl, formData.toString(), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            // const response = await axios.post(formUrl, formData, {
            //     headers: {

            //     },
            // });
            console.log("The response after submitting the 2.0.1 ", formUrl, " form is : ", response);

            //here we called select api with updated submission_id
            if (response.status === 200) {
                console.log("Before handleWithoutAccount Aggregator in 2.0.1");

                // if (payloadForSelect.bppId === "pramaan.ondc.org/beta/preprod/mock/seller") {

                //     //for lenders without account aggregator
                //     const withAccountAggregatorResponse = await handleWithAccountAggregator(response, formSubmissionData, payloadForSelect, setPayloadForSelect, version);
                //     console.log("The response from handle with Account Aggregator for 2.0.1 is : ", withAccountAggregatorResponse);
                //     return withAccountAggregatorResponse;

                // } else {
                //for lenders without account aggregator
                const withoutAccountAggregatorResponse = await handleWithoutAccountAggregator(response, formSubmissionData, payloadForSelect, setPayloadForSelect, version);
                console.log("The response from handleWithout Account Aggregator for 2.0.1 is : ", response);

                const formSubmissionStatus = "approved";
                writeFormLogs(payloadForSelect.transactionId, formSubmissionData, response, formUrl, formSubmissionStatus, payloadForSelect.productName);


                return withoutAccountAggregatorResponse;
                // }

            } else {
                const formSubmissionStatus = "rejected";
                console.log("The form response that we got in else is : ", response);
                writeFormLogs(payloadForSelect.transactionId, formSubmissionData, response, formUrl, formSubmissionStatus, payloadForSelect.productName);
            }

        }

        //changing for 2.0.0-----------------------------------------------

        if (version === "2.0.0") {
            const formData = new FormData();
            Object.entries(formSubmissionData).forEach(([key, value]) => {
                if (key !== "panName") {
                    formData.append(key, value);
                }
            });

            const response = await axios.post(formUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Let Axios set boundary
                },
            });
            console.log("The response after submitting the 2.0.0 ", formUrl, " form is : ", response);

            //here we called select api with updated submission_id
            if (response.status === 200) {

                console.log("Before handleWithoutAccount Aggregator in 2.0.0");

                //for lenders without account aggregator
                const withoutAccountAggregatorResponse = await handleWithoutAccountAggregator(response, formSubmissionData, payloadForSelect, setPayloadForSelect, version);
                console.log("The response from handleWithout Account Aggregator for 2.0.1 is : ", response);

                const formSubmissionStatus = "approved";
                writeFormLogs(payloadForSelect.transactionId, formSubmissionData, response, formUrl, formSubmissionStatus, payloadForSelect.productName);

                return withoutAccountAggregatorResponse;
            } else {
                const formSubmissionStatus = "rejected";
                writeFormLogs(payloadForSelect.transactionId, formSubmissionData, response, formUrl, formSubmissionStatus, payloadForSelect.productName);
                // return withoutAccountAggregatorResponse;
            }

        }

        return null;
    } catch (error) {
        console.log("error in onsearch : ", error);
        const formSubmissionStatus = "rejected";
        console.log("The form response that we got in catch is : ", error);
        writeFormLogs(payloadForSelect.transactionId, formSubmissionData, error?.response?.data || error, formUrl, formSubmissionStatus, payloadForSelect.productName);

    }
};

const writeFormLogs = async (transactionId, formSubmissionData, responseparam, gatewayUrl, formSubmissionStatus, productName) => {
    try {
        const formLogRequest = {
            transactionId,
            "ondcFormDataDTO": formSubmissionData,
            "response": responseparam,
            gatewayUrl,
            formSubmissionStatus,
            productName
        }
        const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}WriteFormLogs`, formLogRequest);
    } catch (error) {
        console.log("Error while saving the formSubmissionData");
    }
}

export const selectLoanAmountForm = async (formUrl, amount, formId) => {

    try {
        const response = await axios.get(formUrl, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        console.log("the response that we got from the loanAmount is : ", response);
    } catch (error) {
        console.log("Error in getting the loanAmount form");
    }

    try {
        // const formData = new URLSearchParams();
        const formData = new FormData();
        formData.append("requestAmount", amount);
        // formData.append("requestTerm", 5);
        formData.append("formId", formId);
        // formData.append("")

        console.log("The formUrl in selectLoanAmountForm is : ", formUrl);

        // const response = await axios.post(formUrl, formData.toString(), {
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded",
        //     },
        // });
        const response = await axios.post(formUrl, formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        console.log("The response that we got in selectLoanAmountForm is : ", response);

        //from here we will save this form Data in our journey log table and logger table
        // pending ...

        if (response.status === 200) {

            return response;

        }
    } catch (error) {
        console.log("Error in selectLoanAmountForm :: ", error);
    }
}

export const bankDetailsForm = async (formUrl, formData, formIdForParam) => {
    try {

        console.log("The form url before hitting is : ", formUrl);
        console.log("The formData before hitting is : ", formData);

        console.log("The formData.IFSC is : ", formData.current.IFSC);
        // const formData2 = new URLSearchParams();
        const formData2 = new FormData();
        formData2.append("formId", formIdForParam);
        formData2.append("accHolderName", formData.current.accountname);
        formData2.append("acctype", formData.current.accountType);
        formData2.append("accNo", formData.current.accountNumber);
        formData2.append("ifscCode", formData.current.IFSC);

        const response = await axios.post(formUrl, formData2, {
            headers: {
                // "Content-Type": "application/x-www-form-urlencoded",
                // "Content-Type": "multipart/form-data"
            },
        });

        console.log("The response that we got after the form submission is : ", response);
        return response;

        // return null;

    } catch (error) {
        console.log("Error in submitting bankDetails form to lender", error);
        if (error.response) {
            return error.response;
        }
        return null;
    }
}

const handleWithoutAccountAggregator = async (response, formSubmissionData, payloadForSelect, setPayloadForSelect, version) => {

    console.log("Inside handle without account aggregator");

    try {
        if (response.data?.submission_id) {

            const updatedPayload = {
                ...payloadForSelect,
                submissionId: response.data.submission_id,
                //added afterwards
                mobileNumber: formSubmissionData.contactNumber,
                stage: 1,
                version: version
            };
            setPayloadForSelect(updatedPayload); // This is fine to keep, if needed globally
            const selectResponse = await select(updatedPayload);

            console.log("The first select response is : ", selectResponse);

            return selectResponse;

        }
    } catch (error) {
        console.log("error in handleWithout AccountAggregator : ", error);
    }

}

const handleWithAccountAggregator = async (response, formSubmissionData, payloadForSelect, setPayloadForSelect, version) => {

    try {
        if (response.data?.submission_id) {

            const updatedPayload = {
                ...payloadForSelect,
                submissionId: response.data.submission_id,
                //added afterwards
                mobileNumber: formSubmissionData.contactNumber,
                stage: 1,
                version: version

            };
            setPayloadForSelect(updatedPayload); // This is fine to keep, if needed globally
            const selectResponse = await select(updatedPayload);
            console.log("The first select response is : ", selectResponse);
            //here we will be calling that select api again with same details but with different status i.e. APPROVED
            //we have to call this select api after getting the first select callback not after 
            if (selectResponse.status === 200) {
                if (selectResponse.data.gateway_response.message.ack.status === "ACK") {
                    // const updatedPayload2 = {
                    //     ...payloadForSelect,
                    //     submissionId: response.data.submission_id,
                    //     status: "APPROVED"
                    // };
                    const updatedPayload2 = {
                        ...updatedPayload,
                        status: "APPROVED",
                        version: version
                    };


                    setPayloadForSelect(updatedPayload2);

                    console.log("Before await ");

                    //we have to change this timer here we have to wait till we dont get the callback of our first select then we have to hit this second select

                    await new Promise(res => setTimeout(res, 5000)); // 1 second delay

                    console.log("Going ahead after 5 seconds");

                    const select2Response = await select(updatedPayload2);
                    // console.log("The select2Response is :: ", select2Response);

                    //from here we are returning the response of the second select api
                    console.log("Returning the select2Response and i.e. : ", select2Response);

                    //here we will call the function to get the callback through websoket
                    // const useWebSocketONDCSelect = useCallback(() => {

                    //   },
                    //   [],)


                    return select2Response;

                }
            }

        }
    } catch (error) {
        console.log("error in handleWithAccountAggregator : ", error);
    }



}


