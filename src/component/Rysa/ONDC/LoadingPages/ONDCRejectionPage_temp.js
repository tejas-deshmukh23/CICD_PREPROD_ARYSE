"use client";
import React from "react";
// import styles from "./newrejectionpage.module.css";
import styles from "../../../Yubi/newrejectionpage.module.css";
import { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { Outfit } from "next/font/google";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

const ONDCRejectionPage = () => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const mobileNumber = searchParams.get("mobilenumber");
    const transactionId = searchParams.get("transactionid");

    useEffect(()=>{
        console.log("Executing the useEffect and the transactionid value is : ",transactionId);
        if(transactionId){
            handleMISStatus();
        }
    },[transactionId])

    const handleNextClick=async()=>{
        try{
            handleEmbeddedRedirection();
        }catch(error){
            console.log("error in handleNextClick");
        }
    }

    const handleMISStatus=async()=>{
        try{
            const formData = new FormData();
            formData.append("transactionId", transactionId);
            formData.append("status", "-99");
            const response = axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}api/mis/updateAfterTransaction`,formData);
            if(response.status === 200){
                console.log("status updated");
            }
        }catch(error){
            console.log("error while saving the MISStatus",error);
        }
    }

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

    return (
        <>
            <div className={styles.MainContainer}>
                <div className={styles.container}>
                    <div className={styles.wrongDiv}>
                        <div className={styles.Xcross}>
                            <div className={styles.red}>
                                {/* <div className={`${styles.statusicon} ${styles.statusfailed}`}>✕</div> */}
                                <FaExclamationCircle />
                            </div>
                        </div>
                        {/* <div> */}
                        <h3>Oop&apos;s sorry!</h3>
                        <h3>Your loan application could not be approved.</h3>
                        <p>
                            But don&apos;t worry — you can still explore offers from other
                            trusted partners!
                        </p>
                        {/* </div> */}
                    </div>
                    <div className={styles.stickyButton}>
                        <button
                            type="submit"
                            className={styles.button}
                            onClick={handleNextClick}
                        >
                            <span>Check Offers</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ONDCRejectionPage