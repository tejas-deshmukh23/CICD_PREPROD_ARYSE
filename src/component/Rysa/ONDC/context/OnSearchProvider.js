"use client"
import OnSearchContext from "./OnSearchContext";
import {useState} from "react";

export const OnSearchProvider=({children})=>{
    const [formSubmissionData, setFormSubmissionData] = useState({});
    const [payloadForSelect, setPayloadForSelect] = useState({
        transactionId: null,
        bppId: null,
        bppUri: null,
        providerId: null,
        itemId: null,
        formId: null,
        // submissionId: null,
        status: null
    });

    return(
        <OnSearchContext.Provider value={{formSubmissionData, setFormSubmissionData, payloadForSelect, setPayloadForSelect}}>
            {children}
        </OnSearchContext.Provider>
    )
}