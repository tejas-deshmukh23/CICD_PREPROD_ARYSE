// "use client";
// import React, { useState, useRef, useEffect, useCallback } from "react";
// import styles from "./newladingpage.module.css";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import NewRejectionPage from "../Yubi/newrejectionpage";
// import NewPersonalDetailePage1 from "./newPersonalDetailePage1";
// import NewPersonalDetailePage2 from "./newPersonalDetailePage2";
// import NewPersonalDetailePage3 from "./newPersonalDetailePage3";
// import axios from "axios";

// function NewLandingPage() {
//   const handleBoxClick = (inputRef) => { // new11 input fuction
//     inputRef.current?.focus();
//   };
//     const mobileRef = useRef(null);
//   // less and more functions
//   const [showFullConsent, setShowFullConsent] = useState(false);
//   const [showFullConsentTwo, setShowFullConsentTwo] = useState(false);
//   const [showFullConsentThree, setShowFullConsentThree] = useState(false);
//   const [errors, setErrors] = useState({ consent: "" });

//   const router = useRouter();
//   const [showOTPbottomsheet, setShowOTPbottomsheet] = useState(false);
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [activeContainer, setActiveContainer] = useState("NewLandingPage");

//   const [otpError, setOtpError] = useState("");
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const otpRefs = useRef([]);

//   const [isLoading, setIsLoading] = useState(false);
//   const [formErrors, setFormErrors] = useState({
//     mobileNumber: "",
//   });
//   const [mainFormData, setMainFormData] = useState({
//     mobileNumber: "",
//     pinCode: "",
//     address: "",
//     employmentType: "",
//     paymentType: "",
//     monthlyIncome: "",
//     panNumber: "",
//     fullName: "",
//     email: "",
//     selectedGender: "",
//     selectedDate: "",
//     companyName: "",
//     workEmail: "",
//     workPINCode: "",
//   });

//   // Handle mobile number input
//   const handleMobileChange = (e) => {
//     const value = e.target.value;
//     if (value.length <= 13) {
//       setMobileNumber(value);
//       if (formErrors.mobileNumber) {
//         setFormErrors({ mobileNumber: "" });
//       }
//     }
//   };

//   // Enhanced validation for mobile number
//   const validateForm = () => {
//     let valid = true;
//     const errors = {
//       mobileNumber: "",
//     };

//     if (!mobileNumber.trim()) {
//       errors.mobileNumber = "Mobile number is required";
//       valid = false;
//     } else {
//       const digitsOnly = mobileNumber.replace(/\D/g, "");

//       if (digitsOnly.length < 10) {
//         errors.mobileNumber = "Mobile number must be at least 10 digits";
//         valid = false;
//       }
//     }

//     setFormErrors(errors);
//     return valid;
//   };

//   // Handle check eligibility button click
//   const handleCheckEligibility = async () => {
//     if (isLoading) return;

//     if (validateForm()) {
//       const digitsOnly = mobileNumber.replace(/\D/g, "");
//       const finalMobile = digitsOnly.slice(-10);

//       setMainFormData((prev) => ({ ...prev, mobileNumber: finalMobile }));
//       setIsLoading(true);

//       const queryParams = new URLSearchParams(window.location.search);
//       const payloadPage1 = {
//         mobileNumber: finalMobile,
//         agentId: queryParams.get("dsa")
//           ? parseInt(queryParams.get("dsa"))
//           : null,
//         agent: queryParams.get("source") || null,
//         channel: queryParams.get("channel") || null,
//         clickId: queryParams.get("clickid") || null,
//         campaign: window.location.search?.slice(1) || null,
//         subAgent: queryParams.get("sub_dsa") || null,
//         subSource: queryParams.get("sub_source") || null,
//       };

//       try {
//         // Save user info
//         const resPage1 = await axios.post(
//           `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/page1`,
//           payloadPage1,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=",
//             },
//           }
//         );
//         console.log("Page1 API response:", resPage1.data);

//         // Send OTP
//         const otpPayload = { Mobilenumber: finalMobile };
//         const resOtp = await axios.post(
//           `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/sendOtpArysefin`,
//           otpPayload,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=",
//             },
//           }
//         );
//         console.log("OTP API response:", resOtp.data);

//         // Show OTP bottom sheet
//         setOtp(["", "", "", "", "", ""]);
//         setOtpError("");
//         setShowOTPbottomsheet(true);
//         setTimeout(() => otpRefs.current[0]?.focus(), 100);
//       } catch (err) {
//         console.error("Error in API calls:", err);
//         alert("Failed to save user info or send OTP, please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   // Handle OTP input change
//   const handleOtpChange = (value, index) => {
//     const numericValue = value.replace(/[^0-9]/g, "");

//     if (numericValue.length <= 1) {
//       const newOtp = [...otp];
//       newOtp[index] = numericValue;
//       setOtp(newOtp);

//       if (otpError) {
//         setOtpError("");
//       }

//       // Auto-focus next input if digit entered
//       if (numericValue && index < 5) {
//         otpRefs.current[index + 1]?.focus();
//       }
//     }
//   };

//   // Handle backspace
//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       otpRefs.current[index - 1]?.focus();
//     }
//   };

//   // Handle paste event
//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData('text');
//     const numericValue = pastedData.replace(/[^0-9]/g, '').slice(0, 6);

//     if (numericValue.length === 6) {
//       const otpArray = numericValue.split('');
//       setOtp(otpArray);
//       setOtpError('');

//       // Focus last input
//       setTimeout(() => {
//         otpRefs.current[5]?.focus();
//       }, 10);
//     }
//   };

//   // Reset OTP input
//   const resetOtp = useCallback(() => {
//     setOtp(["", "", "", "", "", ""]);
//     setTimeout(() => {
//       otpRefs.current[0]?.focus();
//     }, 10);
//   }, []);

//   // Verify OTP (wrapped in useCallback)
//   const handleVerifyOTP = useCallback(async () => {
//     const otpString = otp.join("");

//     if (otpString.length !== 6) {
//       setOtpError("Please enter complete 6-digit OTP");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const payload = {
//         Mobilenumber: mainFormData.mobileNumber,
//         OTP: otpString,
//       };
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/verifyArysefinOtp`,
//         payload
//       );
//       if (res.data.code === 0) {
//         setShowOTPbottomsheet(false);
//         setMainFormData((prev) => ({
//           ...prev,
//           mobileNumber: mainFormData.mobileNumber,
//         }));
//         setActiveContainer("NewPersonalDetailePage1");
//       } else {
//         setOtpError(res.data.msg || "Invalid OTP, please try again.");
//         resetOtp();
//       }
//     } catch (err) {
//       console.error("Error verifying OTP:", err.response?.data || err.message);
//       setOtpError("Verification failed, please try again.");
//       resetOtp();
//     } finally {
//       setIsLoading(false);
//     }
//   }, [otp, mainFormData.mobileNumber, resetOtp]);

//   // Close bottom sheet
//   const closeBottomSheet = () => {
//     setShowOTPbottomsheet(false);
//     resetOtp();
//     setOtpError("");
//   };

//   // WebOTP API for auto-fill (Android Chrome)
//   useEffect(() => {
//     if (showOTPbottomsheet && 'OTPCredential' in window) {
//       const abortController = new AbortController();

//       navigator.credentials.get({
//         otp: { transport: ['sms'] },
//         signal: abortController.signal
//       })
//       .then((otp) => {
//         if (otp && otp.code) {
//           // Auto-fill OTP
//           const otpArray = otp.code.split('');
//           setOtp(otpArray);
//           setOtpError('');

//           // Optional: Auto verify after filling
//           setTimeout(() => {
//             handleVerifyOTP();
//           }, 500);
//         }
//       })
//       .catch((err) => {
//         console.log('OTP auto-fill error:', err);
//       });

//       return () => {
//         abortController.abort();
//       };
//     }
//   }, [showOTPbottomsheet, handleVerifyOTP]);

//   if (activeContainer === "NewPersonalDetailePage1") {
//     return (
//       <NewPersonalDetailePage1
//         mainFormData={mainFormData}
//         setFormData={setMainFormData}
//         setActiveContainer={setActiveContainer}
//       />
//     );
//   }
//   if (activeContainer === "NewRejectionPage") {
//     return (
//       <NewRejectionPage
//         mainFormData={mainFormData}
//         setFormData={setMainFormData}
//         setActiveContainer={setActiveContainer}
//       />
//     );
//   }

//   if (activeContainer === "NewPersonalDetailePage2") {
//     return (
//       <NewPersonalDetailePage2
//         mainFormData={mainFormData}
//         setFormData={setMainFormData}
//         setActiveContainer={setActiveContainer}
//       />
//     );
//   }

//   if (activeContainer === "NewPersonalDetailePage3") {
//     return (
//       <NewPersonalDetailePage3
//         mainFormData={mainFormData}
//         setFormData={setMainFormData}
//         setActiveContainer={setActiveContainer}
//       />
//     );
//   }

//   return (
//     <>
//       <div className={styles.topdiv}>
//         <div className={styles.mainContainer}>
//           <div className={styles.container}>
//             {/* first div */}
//             <div className={styles.topchildren}>
//               <div className={styles.logoContainer}>
//                 <Image
//                   src="/arysefin-dark logo.png"
//                   width={80}
//                   height={80}
//                   className={styles.logo}
//                   alt="Aryse_Fin logo"
//                   priority
//                 />
//               </div>
//             </div>

//             {/* second div */}
//             <div className={styles.topBannerDiv}>
//               <div className={styles.bannerText}>
//                 <h3>
//                   Loans
//                   <br />
//                   Upto ₹25 Lacs,
//                   <br />
//                   Starting
//                   <br /> 10.99 % p.a
//                 </h3>
//               </div>
//             </div>
//             <div className={styles.children}>
//               <div className={styles.topColorPrt}>
//                 <div className={styles.imageSection}>
//                   <div className={styles.imageComponet}>
//                     <Image
//                       src="/Icons-stopwatch.png"
//                       width={60}
//                       height={60}
//                       className={styles.logosection}
//                       alt="timer"
//                       priority
//                     />
//                     <h3>
//                       Sanction <br /> <span>in 2 minutes</span>
//                     </h3>
//                   </div>
//                   <div className={styles.imageComponet}>
//                     <Image
//                       src="/Icons-calendar.png"
//                       width={60}
//                       height={60}
//                       className={styles.logosection2}
//                       alt="calender"
//                       priority
//                     />
//                     <h3 className={styles.imageh3}>
//                       Flexible EMI tenure <br />
//                       <span>upto 60 months</span>
//                     </h3>
//                   </div>
//                 </div>

//                 <div className={styles.newMobileFildAdd}>
//                   <div
//                     className={`${styles.fields} ${
//                       formErrors.mobileNumber ? styles.fieldserror : ""
//                     }`}
//                     onClick={() => handleBoxClick(mobileRef)}
//                   >
//                     <input
//                       type="tel"
//                       name="mobileNo"
//                       value={mobileNumber}
//                       inputMode="numeric"
//                       onChange={handleMobileChange}
//                       placeholder="Enter mobile number"
//                       className={`${styles.inputfield} ${
//                         formErrors.mobileNumber ? styles.inputError : ""
//                       }`}
//                       maxLength={13}
//                       ref={mobileRef}
//                     />
//                   </div>
//                   <div className={styles.mobileFieldMessage}>
//                     An OTP will be sent to your number
//                     <br /> for verification.
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* third div */}
//             <div className={styles.children3}>
//               <div className={styles.mobilefield}>
//                 <div>
//                   <button
//                     className={`${styles.btnelig} ${
//                       isLoading ? styles.loading : ""
//                     }`}
//                     onClick={handleCheckEligibility}
//                     disabled={isLoading}
//                   >
//                     <span>{isLoading ? "Checking..." : "Check eligibility"}</span>
//                   </button>
//                   <h3 className={styles.termText}>
//                     By proceeding, you agree to our{" "}
//                     <a href="/TermAndCondition">Terms & Conditions</a> and{" "}
//                     <a href="/PrivacyAndPolicy">Privacy Policy</a>
//                   </h3>
//                 </div>
//                 {/* less and more componet add here*/}
//                 <div>
//                   <div className={styles.formGroup1}>
//                     <div className={styles.showText}>
//                       {showFullConsent ? (
//                         <>
//                           You hereby consent to AryseFin being appointed as your
//                           authorized representative to receive your Credit
//                           Information from Experian for the purpose of accessing
//                           credit worthiness and availing pre-approved offers
//                           {` ("End Use Purpose").`}
//                           <span
//                             onClick={() => setShowFullConsent(false)}
//                             style={{
//                               color: "#6039d2",
//                               cursor: "pointer",
//                               textDecoration: "none",
//                             }}
//                           >
//                             {" "}Show Less
//                           </span>
//                         </>
//                       ) : (
//                         <>
//                           You hereby consent to AryseFin being appointed as your
//                           author...
//                           <span
//                             onClick={() => setShowFullConsent(true)}
//                             style={{
//                               color: "#6039d2",
//                               cursor: "pointer",
//                               textDecoration: "none",
//                             }}
//                           >
//                             {" "}Read More
//                           </span>
//                         </>
//                       )}
//                     </div>
//                     {errors.consent && (
//                       <p style={{ color: "red" }}>{errors.consent}</p>
//                     )}
//                   </div>
//                   <div className={styles.formGroup}>
//                     <div className={styles.showText}>
//                       {showFullConsentTwo ? (
//                         <>
//                           I authorize Vibhuprada Services Private Limited
//                           (AryseFin), its partner financial institutes/lenders
//                           and their representatives to Call, SMS or communicate
//                           via WhatsApp regarding my application. This consent
//                           overrides any registration for DNC / NDNC. I confirm I
//                           am in India, I am a major and a resident of India
//                           <span
//                             onClick={() => setShowFullConsentTwo(false)}
//                             style={{
//                               color: "#6039d2",
//                               cursor: "pointer",
//                               textDecoration: "none",
//                             }}
//                           >
//                             {" "}Show Less
//                           </span>
//                         </>
//                       ) : (
//                         <>
//                           I authorize Vibhuprada Services Private Limited
//                           (AryseFin), its...
//                           <span
//                             onClick={() => setShowFullConsentTwo(true)}
//                             style={{
//                               color: "#6039d2",
//                               cursor: "pointer",
//                               textDecoration: "none",
//                             }}
//                           >
//                             {" "}Read More
//                           </span>
//                         </>
//                       )}
//                     </div>
//                     {errors.consent && (
//                       <p style={{ color: "red" }}>{errors.consent}</p>
//                     )}
//                   </div>
//                   <div className={styles.formGroup}>
//                     <div className={styles.showText}>
//                       {showFullConsentThree ? (
//                         <>
//                           You provide your express consent to AryseFin
//                           (Vibhuprada Services Private Limited) and its partners
//                           to access the credit bureaus and credit information
//                           report and credit score. You also hereby irrevocably
//                           and unconditionally consent to usage of such credit
//                           information being provided by credit bureaus.
//                           <span
//                             onClick={() => setShowFullConsentThree(false)}
//                             style={{
//                               color: "#6039d2",
//                               cursor: "pointer",
//                               textDecoration: "none",
//                             }}
//                           >
//                             {" "}Show Less
//                           </span>
//                         </>
//                       ) : (
//                         <>
//                           You provide your express consent to AryseFin and its
//                           partners...
//                           <span
//                             onClick={() => setShowFullConsentThree(true)}
//                             style={{
//                               color: "#6039d2",
//                               cursor: "pointer",
//                               textDecoration: "none",
//                             }}
//                           >
//                             {" "}Read More
//                           </span>
//                         </>
//                       )}
//                     </div>
//                     {errors.consent && (
//                       <p style={{ color: "red" }}>{errors.consent}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* fourth div */}
//             <div className={styles.children5}>
//               <div className={styles.textContainer}>
//                 <h3 className={styles.hedingEliText}>
//                   Loan eligibility criteria
//                 </h3>
//                 <ul className={styles.customList} type="desc">
//                   <li>Loan Amount Upto ₹25 lacs.</li>
//                   <li>Tenure: 3 to 60 months.</li>
//                   <li>
//                     Rate of Interest (ROI): Starting from 10.99% per annum.
//                   </li>
//                   <li>Maximum APR: 45%.</li>
//                   <li>
//                     Processing Fee: 2.5% of loan amount + taxes as applicable.
//                   </li>
//                 </ul>
//               </div>

//               <div className={styles.textContainer1}>
//                 <h3 className={styles.hedingEliText}>Credit score partner</h3>
//                 <Image
//                   src="/Experiannew.png"
//                   width={100}
//                   height={100}
//                   className={styles.logoExperian}
//                   alt="Experiannew"
//                   priority
//                 />
//               </div>
//             </div>

//             {/* sixth div */}
//             <div className={styles.children}>
//               <div className={styles.textContainer2}>
//                 <h4 className={styles.hedingCal}>
//                   AryseFin does not charge any fees from the user.
//                   <br />
//                 </h4>
//                 <span>
//                   <br />
//                   <p className={styles.linegap}>
//                     Calculation: A sample loan calculation for ₹1,00,000
//                     borrowed for 1 year, with interest rate @13% per annum*, is
//                     as provided below:
//                   </p>
//                   <p className={styles.linegap}>
//                     Processing fee (@ 2%) = ₹2,000 + GST = ₹2,360
//                   </p>
//                   <p className={styles.linegap}>Interest = ₹7,181</p>
//                   <p className={styles.linegap}>EMI = ₹8,932</p>
//                   <p className={styles.linegap} style={{ marginBottom: "10px" }}>
//                     Total amount to be repaid after a year = ₹1,10,129/-
//                   </p>
//                   <p className={styles.linegap} style={{ marginBottom: "10px" }}>
//                     *Interest Rate varies based on your risk profile
//                     <br />
//                     The maximum Annual Interest Rate (APR) can go up to 36%
//                   </p>
//                 </span>
//               </div>
//             </div>

//             {/* seventh div */}
//             <div className={styles.footer}>
//               <div className={styles.companyText}>
//                 <h3>
//                   © Vibhuprada Services Private Limited <br /> All Rights
//                   Reserved with Copyright & TradeMarks
//                 </h3>
//               </div>
//               <div className={styles.tandC}>
//                 <div>
//                   <a href="/TermAndCondition">Terms & Conditions</a>
//                 </div>
//                 <div>
//                   <a href="/PrivacyAndPolicy">Privacy Policy</a>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* OTP Bottom Sheet */}
//           {showOTPbottomsheet && (
//             <div
//               className={styles.bottomSheetOverlay}
//               onClick={closeBottomSheet}
//             >
//               <div
//                 className={styles.otpBottomSheet}
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {/* Cross Button */}
//                 <button
//                   className={styles.crossButton}
//                   onClick={closeBottomSheet}
//                 >
//                   <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//                     <path
//                       d="M13 1L1 13M1 1L13 13"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </button>

//                 <div className={styles.otpHeader}>
//                   <h2>
//                     Check your messages
//                     <br /> for the OTP
//                   </h2>
//                   <p>
//                     We have sent a code on <br />
//                     <span className={styles.otpSpan}>
//                       {mobileNumber.replace(/\D/g, "").slice(-10)}
//                     </span>
//                   </p>
//                 </div>

//                 <div className={styles.otpInputContainer}>
//                   {otp.map((digit, index) => (
//                     <input
//                       key={index}
//                       ref={(el) => (otpRefs.current[index] = el)}
//                       type="tel"
//                       inputMode="numeric"
//                       pattern="[0-9]*"
//                       value={digit}
//                       onChange={(e) => handleOtpChange(e.target.value, index)}
//                       onKeyDown={(e) => handleKeyDown(e, index)}
//                       onPaste={index === 0 ? handlePaste : undefined}
//                       className={`${styles.otpBox} ${
//                         otpError ? styles.otpInputError : ""
//                       }`}
//                       maxLength="1"
//                       autoComplete="one-time-code"
//                     />
//                   ))}
//                 </div>

//                 {otpError && (
//                   <div className={styles.errorMessage}>{otpError}</div>
//                 )}

//                 <button
//                   className={`${styles.nextButton} ${
//                     isLoading ? styles.loading : ""
//                   }`}
//                   onClick={handleVerifyOTP}
//                   disabled={isLoading}
//                 >
//                   <span>{isLoading ? "Verifying..." : "Verify"}</span>
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default NewLandingPage;

"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./newladingpage.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NewRejectionPage from "../Yubi/newrejectionpage";
import NewPersonalDetailePage1 from "./newPersonalDetailePage1";
import NewPersonalDetailePage2 from "./newPersonalDetailePage2";
import NewPersonalDetailePage3 from "./newPersonalDetailePage3";
import axios from "axios";

function NewLandingPage() {
  const handleBoxClick = (inputRef) => {
    inputRef.current?.focus();
  };
  const mobileRef = useRef(null);

  const [showFullConsent, setShowFullConsent] = useState(false);
  const [showFullConsentTwo, setShowFullConsentTwo] = useState(false);
  const [showFullConsentThree, setShowFullConsentThree] = useState(false);
  const [errors, setErrors] = useState({ consent: "" });

  const router = useRouter();
  const [showOTPbottomsheet, setShowOTPbottomsheet] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [activeContainer, setActiveContainer] = useState("NewLandingPage");

  const [otpError, setOtpError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);

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

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (value.length <= 13) {
      setMobileNumber(value);
      if (formErrors.mobileNumber) {
        setFormErrors({ mobileNumber: "" });
      }
    }
  };

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
        agentId: queryParams.get("dsa")
          ? parseInt(queryParams.get("dsa"))
          : null,
        agent: queryParams.get("source") || null,
        channel: queryParams.get("channel") || null,
        clickId: queryParams.get("clickid") || null,
        campaign: window.location.search?.slice(1) || null,
        subAgent: queryParams.get("sub_dsa") || null,
        subSource: queryParams.get("sub_source") || null,
      };

      try {
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

        setOtp(["", "", "", "", "", ""]);
        setOtpError("");
        setShowOTPbottomsheet(true);
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
      } catch (err) {
        console.error("Error in API calls:", err);
        alert("Failed to save user info or send OTP, please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // ✅ COMPLETE FIX FOR OTP INPUT - handles all paste scenarios
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");

    // Full 6 digit paste (mobile keyboard auto-fill/paste button)
    if (numericValue.length === 6) {
      const newOtp = numericValue.split("");
      setOtp(newOtp);
      setOtpError("");
      setTimeout(() => otpRefs.current[5]?.focus(), 0);
      return;
    }

    // Multiple digits but less than 6 (partial paste)
    if (numericValue.length > 1) {
      const newOtp = [...otp];
      const digits = numericValue.split("");
      
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });
      
      setOtp(newOtp);
      setOtpError("");
      
      const nextIndex = Math.min(index + digits.length, 5);
      setTimeout(() => otpRefs.current[nextIndex]?.focus(), 0);
      return;
    }

    // Single digit entry (normal typing)
    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);
    
    if (otpError) {
      setOtpError("");
    }

    if (numericValue && index < 5) {
      setTimeout(() => otpRefs.current[index + 1]?.focus(), 0);
    }
  };

  // ✅ FIXED BACKSPACE HANDLER
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (newOtp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        setTimeout(() => otpRefs.current[index - 1]?.focus(), 0);
      }
      
      if (otpError) {
        setOtpError("");
      }
    }
  };

  // ✅ COMPLETE PASTE FIX (handles long-press paste)
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const numericValue = pastedText.replace(/[^0-9]/g, "");

    if (numericValue.length >= 6) {
      const newOtp = numericValue.slice(0, 6).split("");
      setOtp(newOtp);
      setOtpError("");
      setTimeout(() => otpRefs.current[5]?.focus(), 0);
    } else if (numericValue.length > 0) {
      const newOtp = [...otp];
      const digits = numericValue.split("");
      
      digits.forEach((digit, i) => {
        if (i < 6) {
          newOtp[i] = digit;
        }
      });
      
      setOtp(newOtp);
      setOtpError("");
      
      const nextEmptyIndex = newOtp.findIndex((val, idx) => !val && idx > 0);
      const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : Math.min(digits.length, 5);
      
      setTimeout(() => otpRefs.current[focusIndex]?.focus(), 0);
    }
  };

  const resetOtp = useCallback(() => {
    setOtp(["", "", "", "", "", ""]);
    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 10);
  }, []);

  const handleVerifyOTP = useCallback(async () => {
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setOtpError("Please enter complete 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        Mobilenumber: mainFormData.mobileNumber,
        OTP: otpString,
      };
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
        setActiveContainer("NewPersonalDetailePage1");
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
  }, [otp, mainFormData.mobileNumber, resetOtp]);

  const closeBottomSheet = () => {
    setShowOTPbottomsheet(false);
    resetOtp();
    setOtpError("");
  };

  // ✅ IMPROVED WebOTP API - Multiple attempts for better compatibility
  useEffect(() => {
    if (!showOTPbottomsheet) return;

    let abortController = new AbortController();

    // Method 1: WebOTP API (Chrome Android)
    if ('OTPCredential' in window) {
      navigator.credentials
        .get({
          otp: { transport: ['sms'] },
          signal: abortController.signal,
        })
        .then((otpCredential) => {
          if (otpCredential && otpCredential.code) {
            const code = otpCredential.code;
            console.log('WebOTP detected:', code);
            
            if (code.length === 6) {
              const otpArray = code.split('');
              setOtp(otpArray);
              setOtpError('');
              
              // Auto verify after 300ms
              setTimeout(() => {
                handleVerifyOTP();
              }, 300);
            }
          }
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            console.log('WebOTP error:', err.message);
          }
        });
    }

    // Method 2: Check clipboard for OTP (fallback for some Android devices)
    const checkClipboard = async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.readText) {
          const text = await navigator.clipboard.readText();
          const otpMatch = text.match(/\b\d{6}\b/);
          
          if (otpMatch) {
            const otpCode = otpMatch[0];
            console.log('Clipboard OTP detected:', otpCode);
            
            const otpArray = otpCode.split('');
            setOtp(otpArray);
            setOtpError('');
          }
        }
      } catch (err) {
        // Clipboard access denied or not available
        console.log('Clipboard check failed:', err.message);
      }
    };

    // Try clipboard check after 500ms
    const clipboardTimer = setTimeout(checkClipboard, 500);

    return () => {
      abortController.abort();
      clearTimeout(clipboardTimer);
    };
  }, [showOTPbottomsheet, handleVerifyOTP]);

  if (activeContainer === "NewPersonalDetailePage1") {
    return (
      <NewPersonalDetailePage1
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

  if (activeContainer === "NewPersonalDetailePage2") {
    return (
      <NewPersonalDetailePage2
        mainFormData={mainFormData}
        setFormData={setMainFormData}
        setActiveContainer={setActiveContainer}
      />
    );
  }

  if (activeContainer === "NewPersonalDetailePage3") {
    return (
      <NewPersonalDetailePage3
        mainFormData={mainFormData}
        setFormData={setMainFormData}
        setActiveContainer={setActiveContainer}
      />
    );
  }

  return (
    <>
      <div className={styles.topdiv}>
        <div className={styles.mainContainer}>
          <div className={styles.container}>
            {/* first div */}
            <div className={styles.topchildren}>
              <div className={styles.logoContainer}>
                <Image
                  src="/arysefin-dark logo.png"
                  width={80}
                  height={80}
                  className={styles.logo}
                  alt="Aryse_Fin logo"
                  priority
                />
              </div>
            </div>

            {/* second div */}
            <div className={styles.topBannerDiv}>
              <div className={styles.bannerText}>
                <h3>
                  Loans
                  <br />
                  Upto ₹25 Lacs,
                  <br />
                  Starting
                  <br /> 10.99 % p.a
                </h3>
              </div>
            </div>
            <div className={styles.children}>
              <div className={styles.topColorPrt}>
                <div className={styles.imageSection}>
                  <div className={styles.imageComponet}>
                    <Image
                      src="/Icons-stopwatch.png"
                      width={60}
                      height={60}
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
                      src="/Icons-calendar.png"
                      width={60}
                      height={60}
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

                <div className={styles.newMobileFildAdd}>
                  <div
                    className={`${styles.fields} ${
                      formErrors.mobileNumber ? styles.fieldserror : ""
                    }`}
                    onClick={() => handleBoxClick(mobileRef)}
                  >
                    <input
                      type="tel"
                      name="mobileNo"
                      value={mobileNumber}
                      inputMode="numeric"
                      onChange={handleMobileChange}
                      placeholder="Enter mobile number"
                      className={`${styles.inputfield} ${
                        formErrors.mobileNumber ? styles.inputError : ""
                      }`}
                      maxLength={13}
                      ref={mobileRef}
                    />
                  </div>
                  <div className={styles.mobileFieldMessage}>
                    An OTP will be sent to your number
                    <br /> for verification.
                  </div>
                </div>
              </div>
            </div>

            {/* third div */}
            <div className={styles.children3}>
              <div className={styles.mobilefield}>
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
                  <h3 className={styles.termText}>
                    By proceeding, you agree to our{" "}
                    <a href="/TermAndCondition">Terms & Conditions</a> and{" "}
                    <a href="/PrivacyAndPolicy">Privacy Policy</a>
                  </h3>
                </div>
                <div>
                  <div className={styles.formGroup1}>
                    <div className={styles.showText}>
                      {showFullConsent ? (
                        <>
                          You hereby consent to AryseFin being appointed as your
                          authorized representative to receive your Credit
                          Information from Experian for the purpose of accessing
                          credit worthiness and availing pre-approved offers
                          {` ("End Use Purpose").`}
                          <span
                            onClick={() => setShowFullConsent(false)}
                            style={{
                              color: "#6039d2",
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            {" "}
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
                            {" "}
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
                    <div className={styles.showText}>
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
                            {" "}
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
                            {" "}
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
                    <div className={styles.showText}>
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
                            {" "}
                            Show Less
                          </span>
                        </>
                      ) : (
                        <>
                          You provide your express consent to AryseFin and its
                          partners...
                          <span
                            onClick={() => setShowFullConsentThree(true)}
                            style={{
                              color: "#6039d2",
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            {" "}
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
            <div className={styles.children5}>
              <div className={styles.textContainer}>
                <h3 className={styles.hedingEliText}>
                  Loan eligibility criteria
                </h3>
                <ul className={styles.customList} type="desc">
                  <li>Loan Amount Upto ₹25 lacs.</li>
                  <li>Tenure: 3 to 60 months.</li>
                  <li>
                    Rate of Interest (ROI): Starting from 10.99% per annum.
                  </li>
                  <li>Maximum APR: 45%.</li>
                  <li>
                    Processing Fee: 2.5% of loan amount + taxes as applicable.
                  </li>
                </ul>
              </div>

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
                <h4 className={styles.hedingCal}>
                  AryseFin does not charge any fees from the user.
                  <br />
                </h4>
                <span>
                  <br />
                  <p className={styles.linegap}>
                    Calculation: A sample loan calculation for ₹1,00,000
                    borrowed for 1 year, with interest rate @13% per annum*, is
                    as provided below:
                  </p>
                  <p className={styles.linegap}>
                    Processing fee (@ 2%) = ₹2,000 + GST = ₹2,360
                  </p>
                  <p className={styles.linegap}>Interest = ₹7,181</p>
                  <p className={styles.linegap}>EMI = ₹8,932</p>
                  <p
                    className={styles.linegap}
                    style={{ marginBottom: "10px" }}
                  >
                    Total amount to be repaid after a year = ₹1,10,129/-
                  </p>
                  <p
                    className={styles.linegap}
                    style={{ marginBottom: "10px" }}
                  >
                    *Interest Rate varies based on your risk profile
                    <br />
                    The maximum Annual Interest Rate (APR) can go up to 36%
                  </p>
                </span>
              </div>
            </div>

            {/* seventh div */}
            <div className={styles.footer}>
              <div className={styles.companyText}>
                <h3>
                  © Vibhuprada Services Private Limited <br /> All Rights
                  Reserved with Copyright & TradeMarks
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
                  <h2>
                    Check your messages
                    <br /> for the OTP
                  </h2>
                  <p>
                    We have sent a code on <br />
                    <span className={styles.otpSpan}>
                      {mobileNumber.replace(/\D/g, "").slice(-10)}
                    </span>
                  </p>
                </div>

                <div className={styles.otpInputContainer}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={digit}
                      maxLength={6}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={handlePaste}
                      className={`${styles.otpBox} ${
                        otpError ? styles.otpInputError : ""
                      }`}
                      autoComplete="one-time-code"
                      data-form-type="other"
                    />
                  ))}
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
    </>
  );
}

export default NewLandingPage;