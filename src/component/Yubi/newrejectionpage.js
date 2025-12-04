"use client";
import React from 'react';
import styles from "./newrejectionpage.module.css";
import { useEffect, useState } from "react";
import { FaExclamationCircle } from 'react-icons/fa';
import { Outfit } from "next/font/google";
import { useSearchParams } from "next/navigation";
import axios from 'axios';
const outfit = Outfit({
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap",
});

function NewRejectionPage({mainFormData}) {
    

     const employmentMapping = {
        "Salaried": 1,
        "Self employed": 2,
        "Business": 3,
    };

    const paymentMapping = {
        "Bank Transfer": 2,
        "Cash": 0,
        "Cheque": 1,
    };

    const fetchData2 = async () =>{
        try{
            const userDetails = {
                // workPincode: userDetailsResponse?.data?.workPincode || "",
                // maritalStatus: userDetailsResponse?.data?.maritalStatus || "",
                // paymentType: userDetailsResponse?.data?.paymentType ?? "",
                mobilenumber: mainFormData?.mobileNumber || "" ,
                // dob: userDetailsResponse?.data?.dob || "",
                profession: mainFormData?.employmentType || "",
                income: mainFormData?.monthlyIncome || "",
                payment_type: mainFormData?.paymentType ?? "",
                pincode: mainFormData?.pinCode || "",
                // firstname: userDetailsResponse?.data?.firstNameFromPan || "",
                // lastname: userDetailsResponse?.data?.lastNameFromPan || "",
                // pan: userDetailsResponse?.data?.pan || "",
                // gender: userDetailsResponse?.data?.gender || "",
                addressline1: mainFormData?.address || "",
                // email: userDetailsResponse?.data?.email || "",
                // officeaddresspincode: userDetailsResponse?.data?.workPincode || "",
                // maritalstatus: userDetailsResponse?.data?.maritalStatus || "",
                // company: userDetailsResponse?.data?.company || "",
                // creditProfile: userDetailsResponse?.data?.creditProfile || ""

            };

            const payload = {
                mobilenumber: userDetails.mobilenumber,
                // dob: userDetails.dob,
                //profession: userDetails.profession,
                income: userDetails.income,
                profession: userDetails?.profession, //
                payment_type: paymentMapping[userDetails?.payment_type] ?? null,
                //profession: employmentMapping[userDetails?.profession] ?? null,

                pincode: userDetails.pincode,
                // firstname: userDetails.firstname,
                // lastname: userDetails.lastname,
                // pan: userDetails.pan,
                // gender: userDetails.gender,
                addressline1: userDetails.addressline1,
                // email: userDetails.email,
                // officeaddresspincode: userDetails.officeaddresspincode, 
                // maritalstatus: userDetails.maritalstatus, //
                // company: userDetails.company,
                // agent_id: formData.agentId,
                // agent: formData.agent,
                // email: ONDCFormData.email,
                agentid: 357046965,
                agent: "arysefinlead",
        //                 agentid : "1246569",
        // agent :"BTI",
                // creditprofile: userDetails.creditProfile
              };

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_REACT_UAT_BASE_URL_CH}user/reg/embeddedarysefin`,
                payload,
                {
                  headers: {
                    "Content-Type": "application/json",
                    token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=", // your token
                  },
                }
              );

              if (response.data.data?.redirectionlink) {
                let redirectUrl = response.data.data.redirectionlink;
                // If URL already has ?, append with &, otherwise add ?
                redirectUrl += redirectUrl.includes("?") ? "&sso=yes" : "?sso=yes";
                window.location.href = redirectUrl;
              }
        }catch(error){
            console.log("the error is : ",error);
        }
    }

    const [refNo, setRefNo] = useState("");
    const [amount, setAmount] = useState("");
    const [account, setAccount] = useState("");
    const [tenure, setTenure] = useState("");
    const [interestRate, setInterestRate] = useState("");



    const [mobileNumber, setMobileNumber] = useState();

    const handleNextClick = () => {
        // window.location.href = "https://app.credithaat.com/pl_journey";
        // fetchData();
        fetchData2();

    };

    // const fetchData = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const formData = new FormData();
    //         formData.append("mobileNumber", mobileNumber);
    //         const userDetailsResponse = await axios.post(
    //             `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}getUserDetails`,
    //             formData
    //         );
    //         const userDetails = {
    //             // workPincode: userDetailsResponse?.data?.workPincode || "",
    //             // maritalStatus: userDetailsResponse?.data?.maritalStatus || "",
    //             // paymentType: userDetailsResponse?.data?.paymentType ?? "",
    //             mobilenumber: mobileNumber,
    //             dob: userDetailsResponse?.data?.dob || "",
    //             profession: userDetailsResponse?.data?.profession || "",
    //             income: userDetailsResponse?.data?.income || "",
    //             payment_type: userDetailsResponse?.data?.paymentType ?? "",
    //             pincode: userDetailsResponse?.data?.pincode || "",
    //             firstname: userDetailsResponse?.data?.firstNameFromPan || "",
    //             lastname: userDetailsResponse?.data?.lastNameFromPan || "",
    //             pan: userDetailsResponse?.data?.pan || "",
    //             gender: userDetailsResponse?.data?.gender || "",
    //             addressline1: userDetailsResponse?.data?.addressline1 || "",
    //             email: userDetailsResponse?.data?.email || "",
    //             officeaddresspincode: userDetailsResponse?.data?.workPincode || "",
    //             maritalstatus: userDetailsResponse?.data?.maritalStatus || "",
    //             company: userDetailsResponse?.data?.company || "",
    //             creditProfile: userDetailsResponse?.data?.creditProfile || ""

    //         };

    //         const payload = {
    //             mobilenumber: mobileNumber,
    //             dob: userDetails.dob,
    //             profession: userDetails.profession,
    //             income: userDetails.income,
    //             payment_type: userDetails?.payment_type, //
    //             pincode: userDetails.pincode,
    //             firstname: userDetails.firstname,
    //             lastname: userDetails.lastname,
    //             pan: userDetails.pan,
    //             gender: userDetails.gender,
    //             addressline1: userDetails.addressline1,
    //             email: userDetails.email,
    //             officeaddresspincode: userDetails.officeaddresspincode, //
    //             maritalstatus: userDetails.maritalstatus, //
    //             company: userDetails.company,
    //             // agent_id: formData.agentId,
    //             // agent: formData.agent,
    //             // email: ONDCFormData.email,
    //             agentid: 357046965,
    //             agent: "arysefinlead",
    //             creditprofile: userDetails.creditProfile
    //           };

    //         const response = await axios.post(
    //             `${process.env.NEXT_PUBLIC_REACT_UAT_BASE_URL_CH}user/reg/embeddedarysefin`,
    //             payload,
    //             {
    //               headers: {
    //                 "Content-Type": "application/json",
    //                 token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=", // ✅ your token
    //               },
    //             }
    //           );

    //     } catch (error) {
    //         console.log("error while fetchData : ", error);
    //     }
    // }
    return (
        // <div className={styles.MainContainer}>
        <div className={`${styles.MainContainer} ${outfit.className}`}>
            <div className={styles.container}>

                <div className={styles.wrongDiv}>
                    <div className={styles.Xcross}>
                        <div className={styles.red}>
                            {/* <div className={`${styles.statusicon} ${styles.statusfailed}`}>✕</div> */}
                            < FaExclamationCircle />
                        </div>
                    </div>
                    {/* <div> */}
                    <h3>Oop&apos;s sorry!</h3>
                    <h3>Your loan application could not be approved.</h3>
                    <p>But don&apos;t worry — you can still explore offers from other trusted
                        partners!</p>
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
    )
}

export default NewRejectionPage;