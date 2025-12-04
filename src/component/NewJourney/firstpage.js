"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./firstpage.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PersonalDetailePage from "./personalDetailePage";
// import RejectPage from '../Yubi/rejectionpage';
import NewRejectionPage from "../Yubi/newrejectionpage";
import PersonalDetailePage2 from "./personalDetailePage2";
import PersonalDetailePage3 from "./personalDetailePage3";
import axios from "axios";

function FirstPage() {
  // less and more functions
  const [showFullConsent, setShowFullConsent] = useState(false);
  const [showFullConsentTwo, setShowFullConsentTwo] = useState(false);
  const [showFullConsentThree, setShowFullConsentThree] = useState(false);
//   const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({ consent: "" });

  const router = useRouter();
  const [showOTPbottomsheet, setShowOTPbottomsheet] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [activeContainer, setActiveContainer] = useState("FirstPage");

  const [otp, setOtp] = useState(""); // Changed from array to string
  const [otpError, setOtpError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    mobileNumber: "",
  });
  const [mainFormData, setMainFormData] = useState({
    mobileNumber: "",
    pinCode: "",
    address: "",
    employmentType: "",
    paymentType: "",
    monthlyIncome: "",
    panNumber: "",
    fullName: "",
    email: "",
    selectedGender: "",
    selectedDate: "",
    companyName: "",
    workEmail: "",
    workPINCode: "",
  });
  // Create ref for single OTP input
  const otpRef = useRef();

  // Handle mobile number input
  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (value.length <= 13) {
      setMobileNumber(value);
      // Clear error when user starts typing
      if (formErrors.mobileNumber) {
        setFormErrors({ mobileNumber: "" });
      }
    }
  };

  // Enhanced validation for mobile number
  const validateForm = () => {
    let valid = true;
    const errors = {
      mobileNumber: "",
    };

    if (!mobileNumber.trim()) {
      errors.mobileNumber = "Mobile number is required";
      valid = false;
    } else {
      const digitsOnly = mobileNumber.replace(/\D/g, "");

      if (digitsOnly.length < 10) {
        errors.mobileNumber = "Mobile number must be at least 10 digits";
        valid = false;
      }
    }

    setFormErrors(errors);
    return valid;
  };

  // Handle check eligibility button click
  const handleCheckEligibility = async () => {
    if (isLoading) return;

    if (validateForm()) {
      const digitsOnly = mobileNumber.replace(/\D/g, "");
      const finalMobile = digitsOnly.slice(-10);

      setMainFormData((prev) => ({ ...prev, mobileNumber: finalMobile }));
      setIsLoading(true);

      const queryParams = new URLSearchParams(window.location.search);
      const payloadPage1 = {
        mobileNumber: finalMobile,
        //parameter mapping
        agentId: queryParams.get("dsa")
          ? parseInt(queryParams.get("dsa"))
          : null, // dsa → agent_id
        agent: queryParams.get("source") || null, // source → agent field
        channel: queryParams.get("channel") || null, // channel → channel
        clickId: queryParams.get("clickid") || null,  // clickId
        
        // Campaign(after ? mark all string as it is)
        campaign: window.location.search?.slice(1) || null,
        subAgent: queryParams.get("sub_dsa") || null,
        subSource: queryParams.get("sub_source") || null,
      };

      try {
        // Save user info
        const resPage1 = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/page1`,
          payloadPage1,
          {
            headers: {
              "Content-Type": "application/json",
              token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=",
            },
          }
        );
        console.log("Page1 API response:", resPage1.data);

        // Send OTP
        const otpPayload = { Mobilenumber: finalMobile };
        const resOtp = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/sendOtpArysefin`,
          otpPayload,
          {
            headers: {
              "Content-Type": "application/json",
              token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=",
            },
          }
        );
        console.log("OTP API response:", resOtp.data);

        // Show OTP bottom sheet
        // Clear OTP input before showing popup
        setOtp("");
        setOtpError("");
        setShowOTPbottomsheet(true);
        setTimeout(() => otpRef.current?.focus(), 100);
      } catch (err) {
        console.error("Error in API calls:", err);
        alert("Failed to save user info or send OTP, please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };
  // const handleCheckEligibility = () => {
  //     if (isLoading) return;

  //     // Always validate form when button is clicked
  //     if (validateForm()) {
  //         const digitsOnly = mobileNumber.replace(/\D/g, '');
  //         const finalMobile = digitsOnly.slice(-10); // last 10 digits

  //         console.log("OTP sending to:", finalMobile);

  //         setIsLoading(true);
  //         setTimeout(() => {
  //             setIsLoading(false);
  //             setShowOTPbottomsheet(true);
  //             setTimeout(() => {
  //                 otpRef.current?.focus();
  //             }, 100);
  //         }, 500);
  //     }
  //     // If validation fails, the error state will automatically make the input red
  // };

  // Handle single OTP input change
  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Only allow numeric input and limit to 6 digits
    const numericValue = value.replace(/[^0-9]/g, "").slice(0, 6);
    setOtp(numericValue);

    // Clear error when user starts typing
    if (otpError) {
      setOtpError("");
    }
  };

  // Handle OTP verification
  // const handleVerifyOTP = () => {
  //     if (otp.length !== 6) {
  //         setOtpError('Please enter complete 6-digit OTP');
  //         return;
  //     }

  //     setIsLoading(true);

  //     // Simulate API call
  //     setTimeout(() => {
  //         const correctOtp = '123456'; // In real app, this would come from backend

  //         if (otp === correctOtp) {
  //             // OTP is correct, navigate to next page
  //             setIsLoading(false);
  //             setShowOTPbottomsheet(false);
  //             setActiveContainer("PersonalDetailePage");
  //             // router.push('/personalDetailePage');
  //         } else {
  //             // OTP is incorrect, reset OTP input
  //             setIsLoading(false);
  //             setOtpError('Invalid OTP. Please try again.');
  //             resetOtp();
  //         }
  //     }, 1500);
  // };
  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setOtpError("Please enter complete 6-digit OTP");
      return;
    }
    setIsLoading(true);
    try {
      const payload = { Mobilenumber: mainFormData.mobileNumber, OTP: otp };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/verifyArysefinOtp`,
        payload
      );
      if (res.data.code === 0) {
        setShowOTPbottomsheet(false);
        setMainFormData((prev) => ({
          ...prev,
          mobileNumber: mainFormData.mobileNumber,
        }));
        setActiveContainer("PersonalDetailePage");
      } else {
        setOtpError(res.data.msg || "Invalid OTP, please try again.");
        resetOtp();
      }
    } catch (err) {
      console.error("Error verifying OTP:", err.response?.data || err.message);
      setOtpError("Verification failed, please try again.");
      resetOtp();
    } finally {
      setIsLoading(false);
    }
  };

  // Reset OTP input
  const resetOtp = () => {
    setOtp("");
    setTimeout(() => {
      otpRef.current?.focus();
    }, 10);
  };

  // Handle resend OTP
  // const handleResendOTP = () => {
  //     resetOtp();
  //     setOtpError('');
  //     // Here you would call API to resend OTP
  //     console.log('Resending OTP to:', mobileNumber);
  //     alert('OTP sent successfully!');
  // };

  // Close bottom sheet
  const closeBottomSheet = () => {
    setShowOTPbottomsheet(false);
    resetOtp();
    setOtpError("");
  };

  if (activeContainer === "PersonalDetailePage") {
    return (
      <PersonalDetailePage
        mainFormData={mainFormData}
        setFormData={setMainFormData}
        setActiveContainer={setActiveContainer}
      />
    );
  }
  if (activeContainer === "NewRejectionPage") {
    return (
      <NewRejectionPage
        mainFormData={mainFormData}
        setFormData={setMainFormData}
        setActiveContainer={setActiveContainer}
      />
    );
  }

  if (activeContainer === "PersonalDetailePage2") {
    return (
      <PersonalDetailePage2
        mainFormData={mainFormData}
        setFormData={setMainFormData}
        setActiveContainer={setActiveContainer}
      />
    );
  }

  if (activeContainer === "PersonalDetailePage3") {
    return (
      <PersonalDetailePage3
        mainFormData={mainFormData}
        setFormData={setMainFormData}
        setActiveContainer={setActiveContainer}
      />
    );
  }
  return (
    <>
      {/* {activeContainer === "PersonalDetailePage" && (
        <PersonalDetailePage
          mainFormData={mainformData}
          setFormData={setMainFormData}
          setActiveContainer={setActiveContainer}
        />
      )}
         {activeContainer === "PersonalDetailePage2" && (
        <PersonalDetailePage2
          mainFormData={mainformData}
          setFormData={setMainFormData}
          setActiveContainer={setActiveContainer}
        />
      )}

      {activeContainer === "PersonalDetailePage3" && (
        <PersonalDetailePage3
          mainFormData={mainformData}
          setFormData={setMainFormData}
          setActiveContainer={setActiveContainer}
        />
      )}
            {activeContainer === "FirstPage" && ( */}
      <div className={styles.topdiv}>
        <div className={styles.mainContainer}>
          <div className={styles.container}>
            {/* first div */}
            <div className={styles.topchildren}>
              <div className={styles.logoContainer}>
                <Image
                  src="/AryseFin_logo.png"
                  width={80}
                  height={80}
                  className={styles.logo}
                  alt="Aryse_Fin logo"
                  priority
                />
              </div>
            </div>

            {/* second div */}
            <div className={styles.children}>
              <div className={styles.section}>
                <h3>
                  Loans Upto{" "}
                  <span className={styles.spanSection}>₹25 Lacs,</span> <br />{" "}
                </h3>{" "}
                <h3>
                  Starting{" "}
                  <span className={styles.spanSection}> 10.99 % p.a</span>{" "}
                </h3>
              </div>
              <div className={styles.imageSection}>
                <div className={styles.imageComponet}>
                  <Image
                    src="/clock2.png"
                    width={50}
                    height={50}
                    className={styles.logosection}
                    alt="timer"
                    priority
                  />
                  <h3>
                    Sanction <br /> <span>in 2 minutes</span>
                  </h3>
                </div>
                <div className={styles.imageComponet}>
                  <Image
                    src="/calendar2.png"
                    width={50}
                    height={50}
                    className={styles.logosection2}
                    alt="calender"
                    priority
                  />
                  <h3 className={styles.imageh3}>
                    Flexible EMI tenure <br />
                    <span>upto 60 months</span>
                  </h3>
                </div>
              </div>
            </div>

            {/* third div */}
            <div className={styles.children}>
              <div className={styles.mobilefield}>
                {/* <h3>Enter Mobile Number</h3> */}
                <div>
                  {/* <input
                                        type='tel'
                                        name='mobileNo'
                                        value={mobileNumber}
                                        inputMode="numeric"
                                        onChange={handleMobileChange}
                                        placeholder='Enter Mobile number'
                                        className={`${styles.inputfield} ${formErrors.mobileNumber ? styles.inputError : ''}`}
                                        maxLength={13}
                                    /> */}
                  <div
                    className={`${styles.fields} ${
                      formErrors.mobileNumber ? styles.fieldserror : ""
                    }`}
                  >
                    <span className={styles.fieldName}>
                      Enter mobile number
                    </span>
                    <input
                      type="tel"
                      name="mobileNo"
                      value={mobileNumber}
                      inputMode="numeric"
                      onChange={handleMobileChange}
                      placeholder=" "
                      className={`${styles.inputfield} ${
                        formErrors.mobileNumber ? styles.inputError : ""
                      }`}
                      maxLength={13}
                    />
                  </div>
                  <span>OTP will be send to your number for verification.</span>
                </div>

                <div>
                  <button
                    className={`${styles.btnelig} ${
                      isLoading ? styles.loading : ""
                    }`}
                    onClick={handleCheckEligibility}
                    disabled={isLoading}
                  >
                    <span>
                      {isLoading ? "Checking..." : "Check eligibility"}
                    </span>
                  </button>
                  {/* <div className={styles.textBottomSheText}>
  <p>
    You hereby consent to AryseFin being appointed as your authorized representative to receive your Credit 
    Information from Experian for the purpose of accessing credit worthiness and availing pre-approved 
    offers (“End Use Purpose”). You hereby agree to Terms and Conditions. I authorize Vibhuprada Services 
    Private Limited (AryseFin), its partner financial institutes/lenders and their representatives to Call, 
    SMS or communicate via WhatsApp regarding my application. This consent overrides any registration for
    DNC / NDNC. I confirm I am in India, I am a major and a resident of India and I have read and I accept
    AryseFin’s Privacy Policy Click here to read the <a href='/PrivacyAndPolicy' className={styles.ancBtoom}>PRIVACY POLICY</a> & <a href='/PrivacyAndPolicy' className={styles.ancBtoom}>TERMS OF SERVICE</a><br/> 
    By agreeing and accepting the<a href='/PrivacyAndPolicy' className={styles.ancBtoom}> terms and conditions </a> set 
    out herein, you provide your express consent to AryseFin (Vibhuprada Services Private Limited)
    and its partners to access the credit bureaus and credit information report and credit score. 
    You also hereby irrevocably and unconditionally consent to usage of such credit information 
    being provided by credit bureaus.
  </p>
</div> */}
                  <h3 className={styles.termText}>
                    By proceeding, you agree to our{" "}
                    <a href="/TermAndCondition">Terms & Conditions</a> and{" "}
                    <a href="/PrivacyAndPolicy">Privacy Policy</a>
                  </h3>
                </div>
                {/* less and more componet add here*/}
                <div>
                  <div className={styles.formGroup1}>
                    <div>
                      {showFullConsent ? (
                        <>
                          You hereby consent to AryseFin being appointed as your
                          authorized representative to receive your Credit
                          Information from Experian for the purpose of accessing
                          credit worthiness and availing pre-approved offers
                          (“End Use Purpose”).
                          <span
                            onClick={() => setShowFullConsent(false)}
                            style={{
                              color: "#6039d2",
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            Show Less
                          </span>
                        </>
                      ) : (
                        <>
                          You hereby consent to AryseFin being appointed as your
                          author...
                          <span
                            onClick={() => setShowFullConsent(true)}
                            style={{
                              color: "#6039d2",
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            Read More
                          </span>
                        </>
                      )}
                    </div>
                    {errors.consent && (
                      <p style={{ color: "red" }}>{errors.consent}</p>
                    )}
                  </div>
                  <div className={styles.formGroup}>
                    <div>
                      {showFullConsentTwo ? (
                        <>
                          I authorize Vibhuprada Services Private Limited
                          (AryseFin), its partner financial institutes/lenders
                          and their representatives to Call, SMS or communicate
                          via WhatsApp regarding my application. This consent
                          overrides any registration for DNC / NDNC. I confirm I
                          am in India, I am a major and a resident of India
                          <span
                            onClick={() => setShowFullConsentTwo(false)}
                            style={{
                              color: "#6039d2",
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            Show Less
                          </span>
                        </>
                      ) : (
                        <>
                          I authorize Vibhuprada Services Private Limited
                          (AryseFin), its...
                          <span
                            onClick={() => setShowFullConsentTwo(true)}
                            style={{
                              color: "#6039d2",
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            Read More
                          </span>
                        </>
                      )}
                    </div>
                    {errors.consent && (
                      <p style={{ color: "red" }}>{errors.consent}</p>
                    )}
                  </div>
                  <div className={styles.formGroup}>
                    <div>
                      {showFullConsentThree ? (
                        <>
                          You provide your express consent to AryseFin
                          (Vibhuprada Services Private Limited) and its partners
                          to access the credit bureaus and credit information
                          report and credit score. You also hereby irrevocably
                          and unconditionally consent to usage of such credit
                          information being provided by credit bureaus.
                          <span
                            onClick={() => setShowFullConsentThree(false)}
                            style={{
                              color: "#6039d2",
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            Show Less
                          </span>
                        </>
                      ) : (
                        <>
                          You provide your express consent to AryseFin
                           and its partners...
                          <span
                            onClick={() => setShowFullConsentThree(true)}
                            style={{
                              color: "#6039d2",
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            Read More
                          </span>
                        </>
                      )}
                    </div>
                    {errors.consent && (
                      <p style={{ color: "red" }}>{errors.consent}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* fourth div */}
            <div className={styles.children}>
              <div className={styles.textContainer}>
                <h3 className={styles.hedingEliText}>
                  Loan eligibility criteria
                </h3>
                <ul className={styles.customList} type="none">
                  <li>Loan Amount Upto ₹25 lacs.</li>
                  <li>Tenure: 3 to 60 months.</li>
                  <li>
                    Rate of Interest (ROI): Starting from 10.99% per year.
                  </li>
                  <li>Maximum APR: 45%.</li>
                  <li>
                    Processing Fee: 2.5% of loan amount + taxes as applicable.
                  </li>
                </ul>
              </div>
            </div>

            {/* fifth div */}
            <div className={styles.children}>
              <div className={styles.textContainer1}>
                <h3 className={styles.hedingEliText}>Credit score partner</h3>
                <Image
                  src="/Experiannew.png"
                  width={100}
                  height={100}
                  className={styles.logoExperian}
                  alt="Experiannew"
                  priority
                />
              </div>
            </div>

            {/* sixth div */}
            <div className={styles.children}>
              <div className={styles.textContainer2}>
                {/* <h3>calculation</h3><br /> */}
                <p>
                  <i>
                    <strong>
                      AryseFin does not charge any fees from the user.
                    </strong>
                  </i>
                  <br />
                  Calculation: A sample loan calculation for ₹1,00,000 borrowed
                  for 1 year, with interest rate @13% per annum*, is as provided
                  below:
                  <br />
                  Processing fee (@ 2%) = ₹2,000 + GST = ₹2,360
                  <br />
                  Interest = ₹7,181
                  <br />
                  EMI = ₹8,932
                  <br />
                  Total amount to be repaid after a year = ₹1,10,129/-
                  <br />
                  *Interest Rate varies based on your risk profile
                  <br />
                  The maximum Annual Interest Rate (APR) can go up to 36%
                </p>
              </div>
            </div>

            {/* seventh div */}
            <div className={styles.footer}>
              <div className={styles.companyText}>
                <h3>
                  © Vibhuprada Services Private Limited | All Rights Reserved
                  with Copyright & TradeMarks
                </h3>
              </div>
              <div className={styles.tandC}>
                <div>
                  <a href="/TermAndCondition">Terms & Conditions</a>
                </div>
                <div>
                  <a href="/PrivacyAndPolicy">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>

          {/* OTP Bottom Sheet */}
          {showOTPbottomsheet && (
            <div
              className={styles.bottomSheetOverlay}
              onClick={closeBottomSheet}
            >
              <div
                className={styles.otpBottomSheet}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Cross Button */}
                <button
                  className={styles.crossButton}
                  onClick={closeBottomSheet}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M13 1L1 13M1 1L13 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div className={styles.otpHeader}>
                  <h2>Please check message</h2>
                  <p>
                    We have sent a code on{" "}
                    <span className={styles.otpSpan}>
                      {mobileNumber.replace(/\D/g, "").slice(-10)}
                    </span>
                  </p>
                </div>

                <div className={styles.otpInputContainer}>
                  <input
                    ref={otpRef}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="Enter 6-digit OTP"
                    className={`${styles.otpSingleInput} ${
                      otpError ? styles.otpInputError : ""
                    }`}
                    maxLength="6"
                    autoComplete="one-time-code"
                  />
                </div>

                {otpError && (
                  <div className={styles.errorMessage}>{otpError}</div>
                )}

                <button
                  className={`${styles.nextButton} ${
                    isLoading ? styles.loading : ""
                  }`}
                  onClick={handleVerifyOTP}
                  disabled={isLoading}
                >
                  <span>{isLoading ? "Verifying..." : "Verify"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* )} */}
    </>
  );
}

export default FirstPage;
