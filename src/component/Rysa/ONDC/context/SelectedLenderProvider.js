"use client"
import {useState} from "react";
import SelectedLenderContext from "./SelectedLenderContext";

export const SelectedLenderProvider=({children})=>{
    
    const [SelectedLenderData, setSelectedLenderData] = useState({});
    const [selectedLenderBankDetails, setSelectedLenderBankDetails] = useState({});
    const [bff, setBff] = useState(1);

    const [globalSettlementAmount, setGlobalSettlementAmount] = useState("1667");

    const [kycForm, setKycForm] = useState(null);

    return(
        <SelectedLenderContext.Provider value={{SelectedLenderData, setSelectedLenderData, selectedLenderBankDetails, setSelectedLenderBankDetails, globalSettlementAmount, setGlobalSettlementAmount, bff, setBff, kycForm, setKycForm}}>
            {children}
        </SelectedLenderContext.Provider>
    )
}