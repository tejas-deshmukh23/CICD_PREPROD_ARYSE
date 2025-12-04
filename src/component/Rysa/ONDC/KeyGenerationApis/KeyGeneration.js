import React from "react";
import axios from "axios";

export const generateTransactionId = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}createTransactionId`);
        if (response.status === 200) {
            console.log("Transaction Id created successfully");
            // setUId(response.data);
            return response;
        } else {
            console.log("Transaction Id not created");
        }
    } catch (error) {
        console.log("Error in creating transactionId : ", error);
    }
}