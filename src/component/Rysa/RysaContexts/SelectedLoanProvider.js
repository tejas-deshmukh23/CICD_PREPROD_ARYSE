'use client'

import React, { useContext, useState, useEffect } from "react";
import SelectedLoanContext from "./SelectedLoanContext";


//BadgeProvider is responsible for passing the values of badges and any function needed in BadgeContext which we can share with any other component through BadgeContext

export const SelectedLoanProvider = ({children}) =>{
    
    const [selectedLoanData, setSelectedLoanData] = useState({});

    return(
        <SelectedLoanContext.Provider value={{selectedLoanData, setSelectedLoanData}}>
            {children}
        </SelectedLoanContext.Provider>
    )

}