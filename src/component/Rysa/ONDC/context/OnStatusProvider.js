"use client"
import {useState} from "react";
import OnStatusContext from "./OnStatusContext";

export const OnStatusProvider=({children})=>{
    
    const [onStatusData, setOnStatusData] = useState({});
    const [initPayload, setInitPayload] = useState({});
    const [onOnitData, setOnInitData] = useState(null);
    
    return(
        <OnStatusContext.Provider value={{onStatusData, setOnStatusData, initPayload, setInitPayload,onOnitData, setOnInitData}}>
            {children}
        </OnStatusContext.Provider>
    )
}