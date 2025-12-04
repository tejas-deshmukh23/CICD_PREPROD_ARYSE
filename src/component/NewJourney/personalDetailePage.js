"use client";
import React from 'react'
import styles from "./personalDetailePage.module.css";
import { useState , useEffect} from 'react';
import Image from 'next/image';
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";

import { style } from '@mui/system';
// import { useRouter } from "next/navigation"; 
// import PersonalDetailePage2 from './personalDetailePage2';
// import PersonalDetailePage3 from './personalDetailePage3';


function PersonalDetailePage({ mainFormData = {}, setFormData, setActiveContainer }) {
    const [loading, setLoading] = useState(false);//mast the screen or loader
    // Props properly receive 
    console.log("Received mainFormData:", mainFormData); // Debug log

    const [showSheet, setShowSheet] = useState(false);
    const [employmentType, setEmploymentType] = useState(mainFormData?.employmentType || '');
    const [showSheetPayment, setShowSheetPayment] = useState(false);
    const [paymentType, setPaymentType] = useState(mainFormData?.paymentType || '');

    const [formErrors, setFormErrors] = useState({
        pinCode: "",
        address: "",
        employmentType: "",
        paymentType: "",
        monthlyIncome: "",
    });
    //       const [formData, setFormData] = useState({
    //     // Page 1
    //     pinCode: "",
    //     address: "",
    //     employmentType: "",
    //     paymentType: "",
    //     monthlyIncome: "",
    //     // Page 2
    //     panNumber: "",
    //     fullName: "",
    //     email: "",
    //     selectedGender: "",
    //     selectedDate: "",
    //     // Page 3
    //     companyName: "",
    //     workEmail: "",
    //     workPINCode: "",
    //   });


    // const [formData, setFormData] = useState({
    //     pinCode: "",
    //     address: "",
    //     employmentType: "",
    //     paymentType: "",
    //     monthlyIncome: "",
    // });

    const validateForm = () => {
        let valid = true;
        const errors = {
            pinCode: "",
            address: "",
            employmentType: "",
            paymentType: "",
            monthlyIncome: "",
        };

        // validation for PIN Code
        if (!mainFormData.pinCode) {
            errors.pinCode = "PIN Code is required";
            valid = false;
        } else if (!/^\d{6}$/.test(mainFormData.pinCode)) {
            errors.pinCode = "PIN Code must be exactly 6 digits";
            valid = false;
        }

        // validation for address
        if (!mainFormData.address) {
            errors.address = "Residential Address is required";
            valid = false;
        } else if (mainFormData.address.trim().length < 3) {
            errors.address = "Address must be at least 3 characters long";
            valid = false;
        }

        // validation for employment type
        if (!mainFormData.employmentType) {
            errors.employmentType = "Employment Type is required";
            valid = false;
        }

        // validation for payment type
        if (!mainFormData.paymentType) {
            errors.paymentType = "Payment Type is required";
            valid = false;
        }

        // validation for monthly income
        if (!mainFormData.monthlyIncome) {
            errors.monthlyIncome = "Monthly income is required";
            valid = false;
        } else if (isNaN(mainFormData.monthlyIncome)) {
            errors.monthlyIncome = "Monthly income must be a number";
            valid = false;
        } else if (Number(mainFormData.monthlyIncome) < 1000) {
            errors.monthlyIncome = "Monthly income must be at least 1000";
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    }

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear errors if any exist for this field
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    // Handle profession selection
    const handleSelectProfession = (profession) => {
        setEmploymentType(profession);
        setFormData(prev => ({ ...prev, employmentType: profession }));
        setShowSheet(false);

        // Clear errors if any exist
        if (formErrors.employmentType) {
            setFormErrors(prev => ({ ...prev, employmentType: "" }));
        }
    };

    // Handle payment type
    const handleSelectPaymentType = (paymentType) => {
        setPaymentType(paymentType);
        setFormData(prev => ({ ...prev, paymentType: paymentType }));
        setShowSheetPayment(false);

        // Clear errors if any exist
        if (formErrors.paymentType) {
            setFormErrors(prev => ({ ...prev, paymentType: "" }));
        }
    };

    // Handle next button click
    const employmentMapping = {
        "Salaried": 1,
        "Self Employed": 2,
        "Business": 3,
    };

    const paymentMapping = {
        "Bank Transfer": 2,
        "Cash": 0,
        "Cheque": 1,
    };

    const handleNext = async () => {
        console.log("Mobile Number being sent:", mainFormData.mobileNumber); // Debug log

        if (validateForm()) {
            console.log("Form is valid, sending to backend...");

            try {
                setLoading(true);
                const payload = {
                    mobileNumber: mainFormData.mobileNumber,
                    residentialPincode: mainFormData.pinCode,
                    address: mainFormData.address,
                    employmentType: employmentMapping[mainFormData.employmentType] || null,
                    paymentType: paymentMapping[mainFormData.paymentType] ?? null,
                    monthlyIncome: mainFormData.monthlyIncome,
                };

                console.log("Payload Sending:", payload);

                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/page2`,
                    payload,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=",
                        },
                    }
                );

                console.log("Backend Response:", response.data);

                if (response.data.status === "APPROVED") {
                    setActiveContainer("PersonalDetailePage2");
                } else {
                    // setActiveContainer("NewRejectionPage");
                    handleEmbeddedRedirection();
                }
            } catch (error) {
                console.error("Error while calling API:", error);
                alert("Something went wrong");
            } finally {
                setLoading(false); // stop loading
            }
        } else {
            console.log("Form has errors");
        }
    };

    const handleEmbeddedRedirection = async () => {

        try {
          const formData = new FormData();
          formData.append("mobileNumber", mainFormData.mobileNumber);
          formData.append("agent", "arysefinlead");
          formData.append("agentId", "357046965");
          const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}api/redirectUser`, formData);
    
          if(response.status === 200){
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

    const handleBack = () => {
        setActiveContainer("FirstPage");
    };
    // scroll page top 
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <>
            {/* {activeContainer === "PersonalDetailePage2" && (
        <PersonalDetailePage2
          mainFormData={formData}
          setFormData={setFormData}
          setActiveContainer={setActiveContainer}
        />
      )}

      {activeContainer === "PersonalDetailePage3" && (
        <PersonalDetailePage3
          mainFormData={formData}
          setFormData={setFormData}
          setActiveContainer={setActiveContainer}
        />
      )}
            {activeContainer === "personalDetailePage" && ( */}
            <div className={styles.container}>
            {loading && (
        <div className={styles.overlay}>
          <div className={styles.spinner}></div>
        </div>
      )}
                <div className={styles.mainHeaderPart} >
                    {/* mynew */}
                    <div className={styles.topchildren}>
                        <div className={styles.logoContainer}>
                            <Image
                                src="/AryseFin_logo.png"
                                width={80}
                                height={80}
                                className={styles.logo2}
                                alt="Aryse_Fin logo"
                                priority
                            />
                        </div>
                    </div>


                    {/* mynew */}
                </div>
                <div className={styles.mainForm}>
                    <div className={styles.header}>
                        <div className={styles.progressBarContainer}>
                            {/* first no:1 progress bar */}
                            <div className={styles.progressBar}>
                                <div className={styles.stepNumber}>1</div>
                                <div
                                    className={styles.progressBarFill}
                                // style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            {/* first no:2 progress bar */}
                            <div className={styles.progressBar}>
                                <div className={styles.stepNumber2}>2</div>
                                <div
                                    className={styles.progressBarFill2}
                                // style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            {/* first no:3 progress bar */}
                            <div className={styles.progressBarlast}>
                                <div className={styles.stepNumberLast}>3</div>
                            </div>
                        </div>
                        {/* <div className={styles.headering}><h3>personal Details</h3></div> */}
                    </div>
                    {/* form field start form here */}

                    <div className={styles.form}>
                        <div className={styles.formheading}>
                            Personal Details
                        </div>
                        {/* first field */}
                        <div className={`${styles.fields} ${formErrors.pinCode ? styles.fieldserror : ""}`}>
                            <span className={styles.fieldName}>Pincode </span>
                            <input
                                type="number"
                                name="pinCode"
                                value={mainFormData.pinCode || ''}
                                onChange={(e) => {
                                    if (e.target.value.length <= 6) {
                                        handleInputChange(e);
                                    }
                                }}
                                className={styles.inputfield}
                            />

                        </div>
                        {/* second field */}
                        <div className={`${styles.fields} ${formErrors.address ? styles.fieldserror : ""}`}>
                            <span className={styles.fieldName}>Residential address</span>
                            <input
                                type='text'
                                name='address'
                                value={mainFormData.address || ''}
                                onChange={handleInputChange}
                                className={styles.inputfield}
                            />
                            {/* {formErrors.address && (
                            <span className={styles.errorText}>{formErrors.address}</span>
                        )} */}
                        </div>
                        {/* third field */}
                        <div className={`${styles.fields2} ${formErrors.employmentType ? styles.fieldserror : ""}`}>
                            <span className={styles.fieldName}>Employment type</span>
                            <div className={styles.inputWrapper}>
                                <input
                                    type='text'
                                    name='employmentType'
                                    value={mainFormData.employmentType || ''}
                                    // value={formData.employmentType || ""}
                                    className={styles.inputfield1}
                                    readOnly
                                    onClick={() => setShowSheet(true)}
                                />
                                <div className={styles.iconContainer} onClick={() => setShowSheet(true)}>
                                    <FaChevronDown className={styles.iconInput} />
                                </div>
                            </div>
                        </div>
                        {/* fourth field */}
                        <div className={`${styles.fields2} ${formErrors.paymentType ? styles.fieldserror : ""}`}>
                            <span className={styles.fieldName}>Payment type</span>
                            <div className={styles.inputWrapper}>
                                <input
                                    type="text"
                                    name="paymentType"
                                    // value={paymentType}
                                    value={mainFormData.paymentType || ""}
                                    className={styles.inputfield1}
                                    readOnly
                                    onClick={() => setShowSheetPayment(true)}
                                />
                                <div className={styles.iconContainer} onClick={() => setShowSheetPayment(true)}>
                                    <FaChevronDown className={styles.iconInput} />
                                </div>
                            </div>
                        </div>
                        {/* fifth field */}
                        <div className={`${styles.fields} ${formErrors.monthlyIncome ? styles.fieldserror : ""}`}>
                            <span className={styles.fieldName}>Monthly income</span>
                            <input
                                type='number'
                                name='monthlyIncome'
                                value={mainFormData.monthlyIncome || ''}
                                onChange={handleInputChange}
                                className={styles.inputfield}
                            />
                        </div>
                        {/* button part here */}
                        <div className={styles.btn}>
                            {/* back button  */}
                            <div className={styles.backbtn}
                                onClick={handleBack}
                            ><span> Back </span></div>
                            {/* emptyspace */}
                            <div className={styles.emptyspace}></div>
                            {/* next button  */}
                            <div className={styles.nextbtn}
                                onClick={handleNext}
                            ><span> Next </span></div>
                        </div>
                    </div>
                    {/* BottomSheet for employ type  */}
                    {showSheet && (
                        <div
                            className={styles.bottomSheetOverlay}
                            onClick={() => setShowSheet(false)}
                        >
                            <div
                                className={styles.bottomSheet}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div
                                    className={styles.sheetOption}
                                    onClick={() => handleSelectProfession("Salaried")}
                                >
                                    Salaried
                                </div>
                                <div
                                    className={styles.sheetOption}
                                    onClick={() => handleSelectProfession("Self Employed")}
                                >
                                    Self Employed
                                </div>
                                <div
                                    className={styles.sheetOption}
                                    onClick={() => handleSelectProfession("Business")}
                                >
                                    Business
                                </div>
                            </div>
                        </div>
                    )}
                    {/* bottom sheet payment */}
                    {showSheetPayment && (
                        <div
                            className={styles.bottomSheetOverlay}
                            onClick={() => setShowSheetPayment(false)}
                        >
                            <div
                                className={styles.bottomSheet}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div
                                    className={styles.sheetOption}
                                    onClick={() => handleSelectPaymentType("Bank Transfer")}
                                >
                                    Bank Transfer
                                </div>
                                <div
                                    className={styles.sheetOption}
                                    onClick={() => handleSelectPaymentType("Cash")}
                                >
                                    Cash
                                </div>
                                <div
                                    className={styles.sheetOption}
                                    onClick={() => handleSelectPaymentType("Cheque")}
                                >
                                    Cheque
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* )} */}
        </>
    )
}

export default PersonalDetailePage;