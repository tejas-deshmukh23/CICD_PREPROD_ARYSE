'use client'

import React, { useContext, useState, useEffect } from "react";
import UIDContext from "./UIDContext";


//BadgeProvider is responsible for passing the values of badges and any function needed in BadgeContext which we can share with any other component through BadgeContext

export const UIDProvider = ({children}) =>{
    
    const [uid, setUId] = useState(null);
    const [isWebsocketConnectionEstablished, setIsWebsocketConnectionEstablished] = useState(false);

    return(
        <UIDContext.Provider value={{uid, setUId, isWebsocketConnectionEstablished, setIsWebsocketConnectionEstablished}}>
            {children}
        </UIDContext.Provider>
    )

}

//This we can use in any other component where we need badgeData as 
// import {useContext} from React; and import BadgeContext from "./BadgeContext"; and then
// we can set it their as const a = useContext(BadgeContext) we are setting it here only and directly returning it through useBadges

export const useUId=()=>{
    return useContext(UIDContext);
}