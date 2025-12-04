"use client"
import {useState} from "react";
import FinalLoanOfferContext from "./FinalLoanOfferContext";

export const FinalLoanOfferProvider=({children})=>{
    
    // const [onStatusData, setOnStatusData] = useState({});
    // const [initPayload, setInitPayload] = useState({});
    // const [onOnitData, setOnInitData] = useState(null);
    const [finalLoanOffer, setFinalLoanOffer] = useState(null);
    
    return(
        <FinalLoanOfferContext.Provider value={{finalLoanOffer, setFinalLoanOffer}}>
            {children}
        </FinalLoanOfferContext.Provider>
    )
}