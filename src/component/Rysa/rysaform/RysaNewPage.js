"use client";
import React, { useState, useRef, useEffect } from "react";
import "./NewPlPage.css";
import Image from "next/image";
// import hdb from '../../../public/Jays/HDB.png';
// import listimage1 from "./newplimages/updatedpl_jounreybannerimage.jpeg";
// import listimage2 from "./newplimages/finalimage3.png";
// import listimage3 from "./newplimages/plimage33.png";
import styles from "./NewPlFirstPage.module.css";
// import EmblaCarousel from "./Emblacarousel/js/EmblaCarousel";
import axios from "axios";
// import BLApplyLenders from "../BLApplyPrimeSecondJourney/BLApplyLenders";
import NewBlListPage from "../NewBlListPage";
// import Loader from '../BLApplyPrimeSecondJourney/LendersLoader';
import Loader from "./LendersLoader";
import ApplicationLoader from "./ApplicationLoader";
import RedirectionLoader from "./RedirectionLoader";
import ApplicationPopup from "./ApplicationPopup";
import ErrorPopup from "./ErrorPopup";
import { FaEnvelope } from "react-icons/fa";
import {
  FaUser,
  FaPhone,
  FaBriefcase,
  FaDollarSign,
  FaIdCard,
  FaRupeeSign,
} from "react-icons/fa"; // Importing icons for name, mobile number, profession, income, payment type, and PAN
// import Loader from "../NewBlJourneyD/LendersLoader";
// import RedirectionLoader from "../NewBlJourneyD/RedirectionLoader";
// import ApplicationLoader from "../NewBlJourneyD/ApplicationLoader";
// import ErrorPopup from '../NewBlJourneyD/ErrorPopup';
// import otpimage from "../SmartCoin/SmartCoin_Images/otpimage.png";
// import {Roboto} from 'next/font/google';
import { Roboto } from "next/font/google";
import OTPBottomSheet from "./NewPlOtpBottomSheet/PlOTPBottomSheet";
// import ForSelfEmployed from "../BLApplyPrimeSecondJourney/ForSelfEmployed";
// import ForSalaried from "../BLApplyPrimeSecondJourney/ForSalaried";
import RysaNewPage2 from "./RysaNewPage2";
// import NewPlApplyDS from "./NewPlApplyDS";
import debounce from "lodash.debounce";
// import RejectionPage from "../NewPlRejectionPage/NewPlRejPage";
import OtpVerifyLoader from "./OtpVerifyLoader";

import Select from "react-select";
const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

// const OPTIONS = { direction: "rtl", loop: true };
// const SLIDES = [
//   { imageUrl: listimage1 },
//   { imageUrl: listimage2 },
//   { imageUrl: listimage3 },
// ];

const RaysaNewPage = ({ params, searchParams }) => {
  const [mounted, setMounted] = useState(false); //added by tejas to prevent hydration error
  useEffect(() => setMounted(true), []); //added by tejas to prevent hydration error

  const [submitButtonText, setSubmitButtonText] = useState("next");

  const [link, setLink] = useState();

  // const [genderFlag, setGenderFlag] = useState(false);
  // const [addressFlag, setAddressFlag] = useState(false);

  const [formErrors, setFormErrors] = useState({
    fullname: "",
    mobileNumber: "",
    profession: "",
    paymentType: "",
    monthlyIncome: "",
    pan: "",
  });

  const [formData, setFormData] = useState({
    fullname: "",
    mobileNumber: "",
    profession: "",
    paymentType: "",
    monthlyIncome: "",
    pan: "",
  });
  // const [showOTPModal, setShowOTPModal] = useState(false);
  const [activeContainer, setActiveContainer] = useState("newplfirstpage");
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = useRef([]);
  const [otpStatus, setOtpStatus] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [activeSecondForm, setActiveSecondForm] = useState(false);
  // const [residentialPincodeFlag, setResidentialPincodeFlag] = useState(false);
  const [isCameFromBackend, setIsCameFromBackend] = useState(false);
  const [isOtpBottomSheetVisible, setIsOtpBottomSheetVisible] = useState(false);
  const [consent, setConsent] = useState(false);
  const [terms, setTerms] = useState(false);
  const [showFullConsent, setShowFullConsent] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [errors, setErrors] = useState({}); // Object to store error messages
  const formRef = useRef(null);
  const [stgOneHitId, setStgOneHitId] = useState(null);
  const [stgTwoHitId, setstgTwoHitId] = useState(null);
  const [t_experian_log_id, sett_experian_log_id] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  // const [dobFlag, setDobFlag] = useState(false);
  // const [emailFlag, setEmailFlag] = useState(false);
  const [cpi, setCpi] = useState(0);
  const [lenderProduct, setLenderProduct] = useState(null);
  const [lenderDetails, setLenderDetails] = useState(null);
  const [apiExecutionLoader, setApiExecutionLoader] = useState(false);
  const [redirectionLinkLoader, setRedirectionLinkLoader] = useState(false);
  const [applicationPopup, setApplicationPopup] = useState(false);
  var json = null;
  const [otpVerifyLoader, setOtpVerifyLoader] = useState(false);
  const [lastname, setLastname] = useState(null);
  const [fatherName, setFatherName] = useState(null);
  const [firstName, setFirstName] = useState(null);

  // const [rejectionPage, setRejectionPage] = useState(false);

  // useEffect(() => {
  //   // Initialize refs array with refs to each OTP input field
  //   otpInputRefs.current = otpInputs.map(
  //     (_, i) => otpInputRefs.current[i] || React.createRef()
  //   );
  // }, [otpInputs]);

  // const [panValue, setPanValue] = useState('');
  const [panValue, setPanValue] = useState("");
  const [inputStage, setInputStage] = useState("alphabets");

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
  }, []);

  const handlePanChange = (inputValue, e) => {
    // Convert the input value to uppercase and limit it to 10 characters
    const formattedValue = inputValue.toUpperCase().slice(0, 10); // Limit to 10 characters

    // Check for deletion and adjust the input stage accordingly
    if (formattedValue.length < panValue.length) {
      setPanValue(formattedValue);
      if (formattedValue.length < 5) {
        setInputStage("alphabets");
      } else if (formattedValue.length < 9) {
        setInputStage("numbers");
      } else {
        setInputStage("lastAlphabet");
      }
      return;
    }

    // Update the PAN value directly, without trimming it to alphabets or numbers only
    setPanValue(formattedValue);

    // Ensure proper formatting of PAN number:
    let newFormattedValue = "";

    if (formattedValue.length <= 10) {
      // Handle first 5 characters (alphabets only)
      if (formattedValue.length <= 5) {
        newFormattedValue = formattedValue.replace(/[^A-Z]/g, ""); // Only allow uppercase alphabets
        if (newFormattedValue.length === 5) {
          setInputStage("numbers");
        }
      }

      // Handle next 4 characters (numbers only)
      else if (formattedValue.length <= 9) {
        const alphabetPart = formattedValue.slice(0, 5); // First 5 alphabets
        const numberPart = formattedValue.slice(5).replace(/[^0-9]/g, ""); // Next 4 numbers
        newFormattedValue = alphabetPart + numberPart;
        if (newFormattedValue.length === 9) {
          setInputStage("lastAlphabet");
        }
      }

      // Handle last character (alphabet only)
      else {
        const alphabetPart = formattedValue.slice(0, 5); // First 5 alphabets
        const numberPart = formattedValue.slice(5, 9); // Next 4 numbers
        const lastChar = formattedValue.slice(9).replace(/[^A-Z]/g, ""); // Last alphabet
        newFormattedValue = alphabetPart + numberPart + lastChar;
      }

      setPanValue(newFormattedValue); // Update formatted value
      setFormData((prevData) => ({
        ...prevData,
        pan: newFormattedValue, // Update the form data
      }));
    }

    // Clear errors if any exist
    if (formErrors.pan) {
      setFormErrors({ ...formErrors, pan: "" });
    }
  };

  // Input change handler
  const handleInputChange = (e) => {
    const inputValue = e.target.value; // Get the full value from the input field
    handlePanChange(inputValue, e); // Pass the input value to handlePanChange for further processing

    // Close keyboard if PAN is complete (length 10)
    if (inputValue.length === 10) {
      e.target.blur(); // Remove focus, causing the keyboard to close
    }
  };

  // Determine inputMode based on the length of the PAN entered
  const getInputMode = () => {
    // const panLength = formData.pan.length;
    const panLength = panValue.length;

    // Character input mode for the first 5 characters (letters)
    if (panLength < 5) {
      return "text"; // Character keyboard
    }

    // Numeric input mode after 5 characters (numbers)
    if (panLength >= 5 && panLength <= 8) {
      return "numeric"; // Numeric keyboard
    }

    // Switch back to character input mode after entering 4 numbers (to allow the last character)
    return "text"; // Character keyboard after 4 numbers
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fullname") {
      // Allow alphabets and spaces (keep trailing space intact)
      const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, "");

      // Capitalize each word BUT don’t trim trailing space while typing
      const words = sanitizedValue.split(" ");
      const capitalizedWords = words.map(
        (word, index) =>
          word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : "" // keep empty string for trailing space
      );
      const capitalizedValue = capitalizedWords.join(" ");

      // Split for first / father / last name (ignore empty parts here)
      const nameParts = capitalizedValue.trim().split(/\s+/);

      let fname = "";
      let fathername = "";
      let lname = "";

      if (nameParts.length === 1) {
        fname = nameParts[0];
      } else if (nameParts.length === 2) {
        fname = nameParts[0];
        lname = nameParts[1];
      } else if (nameParts.length >= 3) {
        fname = nameParts[0];
        lname = nameParts[nameParts.length - 1];
        fathername = nameParts.slice(1, nameParts.length - 1).join(" ");
      }

      // Set states
      setFirstName(fname);
      setLastname(lname);
      setFatherName(fathername);

      // Validation
      if (capitalizedValue.trim() === "") {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          fullname: "Name is required",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          fullname: "",
        }));
      }

      setFormData((prevData) => ({ ...prevData, [name]: capitalizedValue }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name === "fullname") {
  //     // Remove non-alphabetical characters except spaces
  //     const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, "");

  //     // Capitalize first letter of each word
  //     const capitalizedValue = sanitizedValue
  //       .split(" ") // Split the name by spaces
  //       .map(
  //         (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  //       ) // Capitalize first letter and make the rest lowercase
  //       .join(" "); // Join the words back into a single string

  //     // Split the capitalized value into first name and last name
  //     // const nameParts = capitalizedValue.trim().split(" ");
  //     // const fname = nameParts.length > 0 ? nameParts[0] : "";
  //     // const surname =
  //     //   nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  //     // // Update first name and last name
  //     // setLastname(surname);
  //     // setFirstName(fname);

  //     //
  //     const nameParts = capitalizedValue.trim().split(" ").filter(Boolean);

  //     const fname = nameParts[0] || "";
  //     const lname = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
  //     const fathername =
  //       nameParts.length > 2
  //         ? nameParts.slice(1, nameParts.length - 1).join(" ")
  //         : "";

  //     // Set states
  //     setFirstName(fname);
  //     setLastname(lname);
  //     setFatherName(fathername);
  //     //
  //     // Validate name
  //     if (capitalizedValue.trim() === "") {
  //       setFormErrors((prevErrors) => ({
  //         ...prevErrors,
  //         fullname: "Name is required",
  //       }));
  //     } else {
  //       setFormErrors((prevErrors) => ({
  //         ...prevErrors,
  //         fullname: "",
  //       }));
  //     }

  //     // Update form data with the formatted capitalized name
  //     setFormData((prevData) => ({ ...prevData, [name]: capitalizedValue }));
  //   } else {
  //     // For other fields (if needed)
  //     setFormData((prevData) => ({ ...prevData, [name]: value }));
  //   }

  //   // Optionally, you can call updateProgress() if necessary
  // };

  const handleKeyDown = (e) => {
    if (e.target.name === "fullname" && !/^[a-zA-Z\s]*$/.test(e.key)) {
      e.preventDefault(); // Prevent input if the key is not a letter or space
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = {
      fullname: "",
      mobileNumber: "",
      profession: "",
      paymentType: "",
      monthlyIncome: "",
      pan: "",
    };

    // if (!formData.fullname) {
    //   errors.fullname = "Name is required";
    //   valid = false;
    // }
    if (!formData.fullname) {
      errors.fullname = "Full name is required";
      valid = false;
    } else {
      const nameParts = formData.fullname.trim().split(/\s+/); // split by whitespace
      if (nameParts.length < 2) {
        errors.fullname = "Please enter full name";
        valid = false;
      }
    }

    // Mobile Number validation
    if (!formData.mobileNumber.trim()) {
      errors.mobileNumber = "Mobile number is required";
      valid = false;
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.trim())) {
      errors.mobileNumber = "Mobile number should start with 6 to 9 digit";
      valid = false;
    }

    // Check profession validation again to ensure it's correct before moving forward
    if (!formData.profession || formData.profession === "NA") {
      errors.profession = "Profession is required"; // Set the error message
      valid = false;
    } else {
      errors.profession = ""; // Clear error if the profession is valid
    }

    if (!formData.paymentType || formData.paymentType === "NA") {
      errors.paymentType = "Payment type is required";
      valid = false;
    }

    if (!formData.monthlyIncome) {
      errors.monthlyIncome = "Monthly income is required";
      valid = false;
    } else if (isNaN(formData.monthlyIncome)) {
      errors.monthlyIncome = "Monthly income must be a number";
      valid = false;
    } else if (Number(formData.monthlyIncome) < 1000) {
      errors.monthlyIncome = "Monthly income must be at least 1000";
      valid = false;
    }

    // PAN validation with regex
    if (!formData.pan) {
      errors.pan = "PAN is required";
      valid = false;
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan.trim())) {
      // PAN format validation (5 letters, 4 digits, 1 letter)
      errors.pan = "PAN should be in the format: AAAAA9999A";
      valid = false;
    }
    if (!panValue) {
      errors.pan = "PAN is required";
      valid = false;
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panValue.trim())) {
      errors.pan = "PAN should be in the format: AAAAA9999A";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleDataLayerStage = (stage) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ stage: stage });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleFormSubmit(e);
    }
  };

  const [upotp, setUpOtp] = useState(""); // OTP value input from the user

  const handleNextClick = () => {
    setUpOtp("");
    // Check if the form is valid before showing the OTP bottom sheet
    if (validateForm()) {
      // Show OTP Bottom Sheet if the form is valid
      setIsOtpBottomSheetVisible(true);
    }
  };

  const handleFormSubmit = async (e) => {
    console.log("Inside this function 1");
    e.preventDefault();

    console.log("Inside this function");
    try {
      const queryParams = new URLSearchParams(location.search);

      // Retrieve values for the specified parameters
      const channel = queryParams.get("channel") || "";
      const dsa = queryParams.get("dsa") || "";
      const source = queryParams.get("source") || "";
      const subSource = queryParams.get("sub_source") || "";
      const subDsa = queryParams.get("sub_dsa") || "";

      const urllink = location.search?.split("?")[1] || "null";

      // try {
      // Build payload as per backend LeadController
      const payload2 = {
        mobilenumber: formData.mobileNumber, // ✅ backend expects "mobilenumber" (lowercase)
        firstname: firstName,
        lastname: lastname,
        father_name: fatherName, // ✅ backend expects "father_name"
        pan: formData.pan,
        panName: formData.fullname,
        monthlyIncome: formData.monthlyIncome,
        paymentType: formData.paymentType, // ✅ must be integer in backend
        occupation: formData.profession, // ✅ backend maps salaried/self_employed/etc.
      };

      const response2 = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/leadcreate`,
        payload2,
        {
          headers: {
            token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=", // ✅ backend requires token header
          },
        }
      );

      const payload = {
        Mobilenumber: formData.mobileNumber,
        firstname: firstName,
        fathername: fatherName,
        lastname: lastname,
        profession: formData.profession,
        monthlyIncome: formData.monthlyIncome,
        paymentType: formData.paymentType,
        pan: formData.pan,
        dsa,
        channel,
        source,
        sub_source: subSource,
        campaign: urllink,
        sub_dsa: subDsa,
        agent_id: "1246569", // if mandatory
        agent: "BTI", // if mandatory
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/send`,
        payload
      );
      console.log("response is", response);
      console.log("response of send api is stg:", response.data.stgOneHitId);
      if (response.data.code === 0 || response.data.code === 200) {
        console.log("response of the send api code is", response.data.code);
        setStgOneHitId(response.data.stgOneHitId);
        setstgTwoHitId(response.data.stgTwoHitId);
        sett_experian_log_id(response.data.t_experian_log_id);

        localStorage.setItem("stgOneHitId", response.data.stgOneHitId);
        localStorage.setItem("stgTwoHitId", response.data.stgTwoHitId);
        // handleDataLayerStart(
        //   response.data.obj.user_exist,
        //   formData.mobileNumber,
        //   formData.profession
        // );
      }

      if (response.status === 200) {
      } else {
        console.error("Submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleVerifyOTP = () => {
    verify_otp_credithaat_from_backend();
    // setIsOtpBottomSheetVisible(false);
  };
  const [isVerifying, setIsVerifying] = useState(false);

  const verify_otp_credithaat_from_backend = async (e) => {
    if (isVerifying) {
      console.log("Already verifying, skipping duplicate call...");
      return;
    }

    setIsVerifying(true);
    // e.preventDefault();
    const finalStgOneHitId = stgOneHitId || localStorage.getItem("stgOneHitId");
    const finalStgTwoHitId = stgTwoHitId || localStorage.getItem("stgTwoHitId");

    console.log(
      "Using final IDs for verify:",
      finalStgOneHitId,
      finalStgTwoHitId
    );

    if (!finalStgOneHitId || !finalStgTwoHitId) {
      console.error("Missing Stage IDs");
      setIsVerifying(false);
      return;
    }

    setOtpLoader(true);
    try {
      const payload = {
        Mobilenumber: formData.mobileNumber, // match backend field name
        OTP: upotp, // backend expects OTP
        stgOneHitId: finalStgOneHitId,
        stgTwoHitId: finalStgTwoHitId,
        otpGenerationStatusfromexperian: "1", // required in backend validation
        agent_id: "1246569",
        agent: "BTI",
      };

      // axios2otp
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/verify`,
        payload
      );

      console.log("The otp response is :: ", response);

      console.log("Otp response code is : ", response.data.code);

      if (
        response.data.code === 0 ||
        response.data.code === 1 ||
        response.data.code === 2 ||
        response.data.code === 3
      ) {
        setOtpVerified(true);
        setOtpLoader(false);
        // const data = response.data;

        // if (!data.dob || data.dob === "") {
        //   setDobFlag(true);
        // }
        // if (!data.gender || data.gender === "") {
        //   setGenderFlag(true);
        // }
        // if (!data.email || data.email === "") {
        //   setEmailFlag(true);
        // }
        // if (!data.pincode || data.pincode === "") {
        //   setResidentialPincodeFlag(true);
        // }
        setIsOtpBottomSheetVisible(false);

        if (formData.profession === "Salaried") {
          setActiveContainer("RysaNewPage2"); // Display RysaNewPage2 if salaried
        } else {
          setActiveContainer("RysaNewPage2"); // Display NewPlApplyDS if self-employed
        }
      } else if (
        response.data.code === -1 &&
        response?.data?.isExperianOtp === "true"
      ) {
        // ❌ Invalid OTP
        setOtpLoader(false);
        setOtpStatus("Incorrect OTP! Try Again..");
        setUpOtp("");
        setOtpInputs(["", "", "", "", "", ""]);

        setSubmitButtonText("Resend OTP");

        setTimeout(() => {
          setOtpStatus("");
          setIsOtpBottomSheetVisible(false);
        }, 2000); //for two seconds show incorrect otp text and then close that otp Bottom sheet
      } else if (response.data.code === -1) {
        // ❌ Invalid OTP
        setOtpLoader(false);
        setOtpStatus("Incorrect OTP! Try Again..");
        setUpOtp("");
        setOtpInputs(["", "", "", "", "", ""]);
      } else {
        // setOtpLoader(false);
        // // setOtpStatus("Incorrect OTP! Try Again..");
        // setOtpStatus("Incorrect OTP! Try Again..");
        // console.log("Otp incorrect");
        // setUpOtp("");
        // setOtpInputs(["", "", "", "", "", ""]);
        // // setOtpInputs(new Array(6).fill(""));

        setOtpLoader(false);
        // Clear OTP status first, then set the error message
        setOtpStatus("");
        setTimeout(() => {
          setOtpStatus("Incorrect OTP! Try Again..");
        }, 50);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsVerifying(false); // unlock for next attempt
    }
  };

  const getLendersList = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    try {
      const formData1 = new FormData();
      formData1.append("mobilenumber", formData.mobileNumber);

      // Windows.location.href = `https://www.arysefin.com/ondc?mobilenumber=${formData.mobileNumber}`;

      // axios3lenderlist
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_UAT_BASE_URL}lenderslistnew`,
        formData1,
        {
          headers: {
            "Content-Type": "application/json",
            token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=", // Add your token here
          },
        }
      );

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      if (response.data.code === 200) {
        json = response.data.data;
        setLenderDetails(json);

        // // setShowAddInfo(false);
        // setShowLendersList(true);
        setActiveContainer("LendersList");
      }

      if (response.status === 200) {
      } else {
        console.error("Submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const redirectLinkMethod = (lenderProduct, applicationLink, productId) => {
    console.log("Lender Product Is :::::: ", lenderProduct);
    console.log("Application LInk is :::::::: ", applicationLink);
    setCpi(1); //HERE WE SET THE CPI to see if we have to redirect the user or to hit the api if cpi is 1 then we will set the redirection link else we will hit the api
    console.log("Inside the redirect link method");
    localStorage.setItem("applicationLink", applicationLink);
    handleDataLayerStage(4);
    apiExecutionBackend(lenderProduct, 1, productId);
    // if(formData.occupation === "Salaried"){
    //   handleDataLayerStage(3); // Track step 2 when the form is submitted
    //   setActiveContainer("forSalaried");
    // }else{
    //   setActiveContainer("forSelfEmployed");
    //   handleDataLayerStage(3);
    // }
  };
  const nextInputRef = useRef(null);
  const paymentTypeRef = useRef(null);
  // const [isProfessionMenuOpen, setIsProfessionMenuOpen] = useState(false);
  // const [isPaymentTypeMenuOpen, setIsPaymentTypeMenuOpen] = useState(false);
  const monthlyIncomeRef = useRef(null); // Reference for the monthly income field
  const mobileNumberRef = useRef(null);

  const CustomOption = (props) => {
    const { data, innerRef, innerProps, selectOption, isSelected } = props;

    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          padding: "10px",
          position: "relative",
          cursor: "pointer",
          backgroundColor: isSelected ? "#f0f0f0" : "white",
        }}
        onClick={() => {
          selectOption(data); // ✅ This will trigger onChange and close menu
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{data.label}</span>
          <input
            type="radio"
            name={data.name || "option"}
            value={data.value}
            checked={isSelected}
            readOnly
            style={{ pointerEvents: "none" }}
          />
        </div>

        <hr
          style={{
            margin: "5px 0",
            border: "0",
            borderTop: "1px solid #ddd",
            width: "100%",
          }}
        />
      </div>
    );
  };

  // Options for profession
  const professionOptions = [
    { value: "NA", label: "Select occupation" },
    { value: "Salaried", label: "Salaried" },
    { value: "Self employed", label: "Self employed" },
    { value: "Business", label: "Business" },
  ];
  const paymentTypeOptions = [
    { value: "NA", label: "Select Payment Type" },
    { value: "2", label: "Bank Transfer" },
    { value: "1", label: "Cheque" },
    { value: "0", label: "Cash" },
  ];
  const customStyles = {
    input: (provided) => ({
      ...provided,
      padding: "8px", // Padding for input text
      // borderRadius: '10px',  // Border radius for input
      width: "100%", // Full width
      minHeight: "70px",
      border: "none", // Remove border for input itself
      cursor: "pointer",
      borderRadius: "50px",
    }),
    menu: (provided) => ({
      ...provided,
      position: "fixed", // Make the dropdown fixed relative to the viewport
      top: "50%", // Vertically center the dropdown on the screen
      left: "50%", // Horizontally center the dropdown on the screen
      transform: "translate(-50%, -50%)", // Adjust the dropdown to be exactly centered
      width: "80%", // Set the width of the dropdown (you can adjust it)
      maxWidth: "400px", // Set a max width for the dropdown
      zIndex: 9999, // Ensure the dropdown appears on top of other content
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // Optional: Add shadow for a popup effect
      borderRadius: "10px",
    }),
    control: (provided) => ({
      ...provided,
      width: "100%", // Full width of the control
      borderRadius: "10px",
      minHeight: "50px",
    }),
    placeholder: (provided) => ({
      ...provided,
      padding: "12px", // Padding for placeholder text
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0", // Optional: Adjust padding of the dropdown indicator
    }),
    indicatorSeparator: () => ({
      display: "none", // Hide the indicator separator (optional)
    }),
  };

  // Handle changes in the mobile number
  const handleMobileNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10); // Allow only 10 digits
    setFormData({ ...formData, mobileNumber: value });

    if (formErrors.mobileNumber) {
      setFormErrors({ ...formErrors, mobileNumber: "" });
    }

    // if (value.length === 10) {
    //   // Automatically focus and open the profession dropdown when mobile number has 10 digits
    //   setTimeout(() => {
    //     if (nextInputRef.current) {
    //       mobileNumberRef.current.blur();
    //       nextInputRef.current.focus(); // Focus on the Profession field
    //       setIsProfessionMenuOpen(true); // Open the dropdown
    //     }
    //   }, 100); // Small delay to ensure focus is set first
    // }
  };

  const handleProfessionChange = (selectedOption) => {
    // console.log("Selected profession:", selectedOption);

    // ✅ Update state
    setFormData({
      ...formData,
      profession: selectedOption.value,
    });

    // ✅ Clear error if valid option selected
    if (selectedOption.value !== "NA") {
      setFormErrors({
        ...formErrors,
        profession: "",
      });
    } else {
      setFormErrors({
        ...formErrors,
        profession: "Profession is required",
      });
    }

    // ✅ Menu will automatically close after selection due to react-select default behavior
  };

  // Handle profession field interactions
  // const handleProfessionFocus = () => {
  //   setIsProfessionMenuOpen(true); // Open dropdown menu
  // };

  // const handleProfessionBlur = () => {
  //   setIsProfessionMenuOpen(false); // Close dropdown menu when focus leaves
  // };

  // const handleProfessionClick = (e) => {
  //   e.stopPropagation(); // Prevent the keyboard from opening when clicking on the profession field
  //   setIsProfessionMenuOpen(true); // Open dropdown menu
  // };

  const handlePaymentTypeChange = (selectedOption) => {
    // console.log("Selected payment type:", selectedOption);

    // ✅ Update state
    setFormData({
      ...formData,
      paymentType: selectedOption.value,
    });

    // ✅ Clear error if valid option selected
    if (selectedOption.value !== "NA") {
      setFormErrors({
        ...formErrors,
        paymentType: "",
      });
    } else {
      setFormErrors({
        ...formErrors,
        paymentType: "Payment type is required",
      });
    }

    // ✅ Menu will automatically close after selection
  };

  // Handle Payment Type field interactions
  // const handlePaymentTypeFocus = () => {
  //   setIsPaymentTypeMenuOpen(true); // Open dropdown menu when focused
  // };

  // const handlePaymentTypeBlur = () => {
  //   setIsPaymentTypeMenuOpen(false); // Close dropdown menu when blurred
  // };

  // const handlePaymentTypeClick = (e) => {
  //   e.stopPropagation(); // Prevent the keyboard from opening when clicking on the Payment Type field
  //   setIsPaymentTypeMenuOpen(true); // Open dropdown menu
  // };

  function handleDataLayerStart(flag, mobile_number, emptype) {
    console.log("INside handledatalayer , ", flag, mobile_number, emptype);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      mobileNumber: mobile_number,
      flag: flag,
      employmentType: emptype,
    });
  }

  const getLoanBackendMethod = (e, lenderProduct) => {
    console.log("cpi is set as 0");
    setCpi(0);
    setLenderProduct(lenderProduct);
    handleDataLayerStage(4); // Track step 2 when the form is submitted
    // setActiveContainer("forSalaried");
    apiExecutionBackend(lenderProduct, 0);
    // if(formData.occupation === "Salaried"){
    //   getLendersList(e)
    //   setActiveContainer("forSalaried");
    // }else{
    //   setActiveContainer("forSelfEmployed");
    // }
  };

  const apiExecutionBackend = async (productname, lenderCpi, productId) => {
    console.log(productname);

    // If lenderCpi is 1, redirect to lender.applicationlink

    console.log(cpi);

    if (lenderCpi === 1) {
      // if (productname === "HDB") {
      try {
        const savedData = localStorage.getItem("userFormData");
        if (!savedData) {
          console.error("❌ No user data found in localStorage");
          return;
        }
        const userFormData = JSON.parse(savedData);

        // ✅ Map formData to match LeadController expected field names
        const leadPayload = {
          mobilenumber: userFormData.mobileNumber,
          firstname: userFormData.firstName,
          lastname: userFormData.lastName,
          father_name: userFormData.fatherName,
          dob: userFormData.dob,
          occupation: userFormData.profession, // "salaried", "self_employed", etc.
          paymentType: userFormData.paymentType,
          monthlyIncome: userFormData.monthlyIncome,
          pan: userFormData.pan,
          gender: userFormData.gender,
          residentialPincode: userFormData.pincode,
          email: userFormData.email,
          loanAmount: userFormData.loanAmount,
          spouseName: userFormData.spouseName,
          maritalStatus: userFormData.maritalStatus,
          address: userFormData.address,
          company_name: userFormData.companyName,
          workEmail: userFormData.officeemail,
          workPincode: userFormData.officePincode,
        };

        console.log("📤 Sending Lead Create Payload:", leadPayload);

        // ✅ STEP 0: Create lead on RYSA
        const createLeadResponse = await axios.post(
          `http://localhost:8080/api/leadcreate`,
          leadPayload,
          {
            headers: {
              "Content-Type": "application/json",
              token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=", // valid token
            },
          }
        );

        console.log("✅ RYSA Lead Created:", createLeadResponse.data);

        if (createLeadResponse.data.code !== 200) {
          console.log(
            "❌ Failed to create RYSA lead:",
            createLeadResponse.data.msg
          );
          setRedirectionLinkLoader(false);
          return;
        }

        console.log("👉 Starting HDB flow");
        const mobile = formData.mobileNumber;
        window.location.href = `https://uat.getrysa.com/yubi/Start?mobileNumber=${mobile}`;
      } catch (err) {
        console.error("❌ HDB API Error:", err);
      }

      // setRedirectionLinkLoader(false);
      return;
      // }

      setRedirectionLinkLoader(true);
      const lenderApplicationLink = localStorage.getItem("applicationLink");

      // const timer = setTimeout(() => {
      //   // setRedirectionLinkLoader(false);
      //   const lenderApplicationLink = localStorage.getItem('applicationLink');
      //   window.location.href = lenderApplicationLink;
      //   // window.location.href = lenderApplicationLink;
      // }, 3000);

      try {
        const formData2 = new FormData();

        console.log(
          "phone : ",
          formData.mobileNumber,
          "and product id : ",
          productId
        );

        formData2.append("userId", "");
        formData2.append("phone", formData.mobileNumber);
        formData2.append("productId", productId);
        formData2.append("channel", "creditHaat");

        console.log("before cpiclikc");
        // axios4apiClick
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_UAT_BASE_URL}h5/cpiClickNew`,
          formData2
        );
        console.log("after cpiclick");

        // Call the SMS API before redirection
        await sendSmsApi(formData.mobileNumber, productId);

        const timer = setTimeout(() => {
          setRedirectionLinkLoader(false);
          window.location.href = lenderApplicationLink;
        }, 3000);
      } catch (Error) {
        console.log("Error while writing in cpiclicknew : ", Error);
      }

      // setRedirectionLinkLoader(false);
      // return; // Exit the function to avoid further execution
    } else {
      // if (productname === "HDB") {
      try {
        const savedData = localStorage.getItem("userFormData");
        if (!savedData) {
          console.error("❌ No user data found in localStorage");
          return;
        }
        const userFormData = JSON.parse(savedData);

        // ✅ Map formData to match LeadController expected field names
        const leadPayload = {
          mobilenumber: userFormData.mobileNumber,
          firstname: userFormData.firstName,
          lastname: userFormData.lastName,
          father_name: userFormData.fatherName,
          dob: userFormData.dob,
          occupation: userFormData.profession, // "salaried", "self_employed", etc.
          paymentType: userFormData.paymentType,
          monthlyIncome: userFormData.monthlyIncome,
          pan: userFormData.pan,
          gender: userFormData.gender,
          residentialPincode: userFormData.pincode,
          email: userFormData.email,
          loanAmount: userFormData.loanAmount,
          spouseName: userFormData.spouseName,
          maritalStatus: userFormData.maritalStatus,
          address: userFormData.address,
          company_name: userFormData.companyName,
          workEmail: userFormData.officeemail,
          workPincode: userFormData.officePincode,
        };

        console.log("📤 Sending Lead Create Payload:", leadPayload);

        // ✅ STEP 0: Create lead on RYSA
        const createLeadResponse = await axios.post(
          `http://localhost:8080/api/leadcreate`,
          leadPayload,
          {
            headers: {
              "Content-Type": "application/json",
              token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=", // valid token
            },
          }
        );

        console.log("✅ RYSA Lead Created:", createLeadResponse.data);

        if (createLeadResponse.data.code !== 200) {
          console.log(
            "❌ Failed to create RYSA lead:",
            createLeadResponse.data.msg
          );
          setRedirectionLinkLoader(false);
          return;
        }

        console.log("👉 Starting HDB flow");
        const mobile = formData.mobileNumber;
        window.location.href = `http://localhost:3001/yubi/Start?mobileNumber=${mobile}`;
      } catch (err) {
        console.error("❌ HDB API Error:", err);
      }
      console.log("Inside get Loan Backend");
      // e.preventDefault();

      setApiExecutionLoader(true);

      console.log("Inside get Loan Backend");

      try {
        const formData1 = new FormData();
        formData1.append("mobilenumber", formData.mobileNumber);
        formData1.append("product", productname);

        // setlenderName(productname);
        // axios5apiExecution
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_UAT_BASE_URL}apiExecution`,
          formData1,
          {
            headers: {
              "Content-Type": "application/json",
              token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=", // Add your token here
            },
          }
        );

        if (response.data.code === 0) {
          console.log("Inside get Loan Backend when code is 0");
          // setIsCameFromBackend(true);
          setApplicationPopup(true);
          const timer = setTimeout(() => {
            setApiExecutionLoader(false);
          }, 3000);
          var redirectionlink =
            response.data.data.lender_details[0].applicationlink;
          // console.log(redirectionLink);
          setLink(redirectionlink);
          // {!setIsLoading && <ApplicationPopup link={link}/>}
        } else if (response.data.code === -1) {
          console.log(-1);
          // setErrorPopup(true);
          localStorage.setItem(
            "mobileNumberForRejection",
            formData.mobileNumber
          );
          // setRejectionPage(true);
          const timer = setTimeout(() => {
            setApiExecutionLoader(false);
          }, 3000);

          // setErrorPopup(true); //This will be true when the code will be -1
        } else {
          const timer = setTimeout(() => {
            setApiExecutionLoader(false);
          }, 3000);
        }

        console.log("for partner page", response);
      } catch (error) { }
    }
  };

  // Function to send SMS via API
  const sendSmsApi = async (phone, productId) => {
    try {
      // asios6SMSplJ

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_UAT_BASE_URL}h5/sms_pl_journey`,
        {
          params: {
            phone: phone,
            // link: link,
            dsa: "214394238",
            productId: productId,
          },
        }
      );

      console.log("SMS API response:", response.data);
    } catch (error) {
      console.log("Error while calling SMS API: ", error);
    }
  };

  const [otpLoader, setOtpLoader] = useState(false);
  // i am added this
  // setTimeout(() => {
  //   // इथे अधिक UI अपडेट करा
  // }, 1000);

  // State for progress calculation
  const [progress, setProgress] = useState(0);

  // Function to handle form field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Calculate the completion percentage whenever formData changes
  useEffect(() => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(
      (value) => value !== ""
    ).length;
    const completionPercentage = (filledFields / totalFields) * 100;

    setProgress(completionPercentage);
  }, [formData]);

  //slider
  // const slides = [
  //   {
  //     title: "Simple Loans,Big<br> Smiles!",
  //     subtitle: "Get money when you need it, stress‑free.",
  //     img: "/s141.png",
  //   },
  //   {
  //     title: "Festive Loan,<br> Bonanza!",
  //     subtitle: "Exclusive benefits for limited period.",
  //     img: "/s171.png",
  //   },
  //   {
  //     title: "Easy Loans, Happy<br> Moments!",
  //     subtitle: "Quick money,zero worries.",
  //     img: "/s11.png",
  //   },
  // ];

  const slides = [
    {
      title: "Get upto ₹25 Lacs.</br> Disbursal within</br> 24 Hours.",
      img: "/s6.png",
    },
    {
      title: "Get upto ₹25 Lacs.</br> Disbursal within</br> 24 Hours.",
      img: "/s6.png",
    },
    {
      title: "Get upto ₹25 Lacs.</br> Disbursal within</br> 24 Hours.",
      img: "/s6.png",
    },
  ];

  const [currentSlide, setSlide] = useState(0);
  const [currentStep, setStep] = useState(1);

  useEffect(() => {
    const id = setInterval(
      () => setSlide((i) => (i + 1) % slides.length),
      3500
    );
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null; // or a fallback skeleton //added by tejas to prevent hydration error

  return (
    <>
      {/* {rejectionPage && <RejectionPage lenderName={lenderProduct} />} */}
      {errorPopup && (
        <ErrorPopup
          lenderName={lenderProduct}
          formData={formData}
          setErrorPopup={setErrorPopup}
        />
      )}
      {applicationPopup && <ApplicationPopup link={link} />}

      {apiExecutionLoader && <ApplicationLoader />}
      {redirectionLinkLoader && <RedirectionLoader />}

      {isLoading && <Loader />}
      {otpLoader && <OtpVerifyLoader />}
      {activeContainer === "LendersList" && (
        // <LendersList companies={lenderDetails} formData={formData} redirectLinkMethod={redirectLinkMethod} getLoanBackendMethod={getLoanBackendMethod}/>
        <NewBlListPage
          companies={lenderDetails}
          formData={formData}
          redirectLinkMethod={redirectLinkMethod}
          getLoanBackendMethod={getLoanBackendMethod}
        />
      )}
      {/* {activeContainer === "NewPlApplyDS" && (
        <NewPlApplyDS
          cpi={cpi}
          lenderProduct={lenderProduct}
          mainFormData={formData}
          dobFlag={dobFlag}
          residentialPincodeFlag={residentialPincodeFlag}
          genderFlag={genderFlag}
          addressFlag={addressFlag}
          setActiveContainer={setActiveContainer}
          getLendersList={getLendersList}
        />
      )} */}

      {activeContainer === "RysaNewPage2" && (
        <RysaNewPage2
          cpi={cpi}
          lenderProduct={lenderProduct}
          mainFormData={formData}
          firstName={firstName}
          lastName={lastname}
          fatherName={fatherName}
          // dobFlag={dobFlag}
          // residentialPincodeFlag={residentialPincodeFlag}
          // genderFlag={genderFlag}
          // emailFlag={emailFlag}
          // addressFlag={addressFlag}
          setActiveContainer={setActiveContainer}
          getLendersList={getLendersList}
        />
      )}
      {isVisible && (
        <OTPBottomSheet
          isVisible={isVisible}
          verifyOTP={verifyOTP}
          upotp={upotp}
          otpStatus={otpStatus}
          setUpOtp={setUpOtp}
        />
      )}
      {activeContainer === "newplfirstpage" && (
        <div className={`${roboto.className} page-container`}>
          {/* <div className="carousel-background"> 
            home add
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
          </div> */}
          <div
            className={styles.header}
            style={{
              width: "100%",
              maxWidth: "414px",
              // height: '200px',
              background: "linear-gradient(to right, #f3b2f5 50%, #a78afa)",
              boxSizing: "border-box",
              margin: "0 auto",
              position: "relative",
              padding: "24px 20px 10px 20px",
              minHeight: "190px",
              color: "black",
              marginBottom: "-35px",
              top: "-100px",
              // border:'2px solid ',
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0px",
                left: "2px",
                zIndex: 10,
              }}
            >
              <Image
                src="/Aryse_Fin.png"
                alt="image_logo"
                width={50}
                height={50}
              />
            </div>
            <div
              className={styles.heroText}
              style={{
                paddingTop: "15px",
                position: "relative",
                zIndex: 2,
              }}
            >
              <h1
                className={styles.title}
                dangerouslySetInnerHTML={{ __html: slides[currentSlide].title }}
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              />
              <p
                className={styles.subtitle}
                dangerouslySetInnerHTML={{
                  __html: slides[currentSlide].subtitle,
                }}
                style={{
                  fontSize: "14px",
                  marginTop: "4px",
                }}
              />
            </div>
            {/* <div
              className={styles.progressBar}
              style={{
                justifyContent: "center",
                marginTop: "35px",
                display: "flex",
                gap: "6px",
              }}
            >
              {slides.map((_, i) => (
                <span
                  key={i}
                  style={{
                    alignItems: "center",
                    paddingLeft: "10px",
                    width: "28px",
                    height: "6px",
                    borderRadius: "2px",
                    background: i === currentSlide ? "#ffffff" : "#ffffff66", // Conditional background
                    cursor: "pointer",
                  }}
                  onClick={() => setSlide(i)}
                />
              ))}
            </div>  */}
            <div
              className={styles.imgWrap}
              style={{
                position: "absolute",
                right: "2px",
                bottom: "0px",
                width: "180px",
                height: "170px",
                borderRadius: "8px",
                overflow: "hidden",
                marginBottom: "20px",
              }}
            >
              <Image
                src={slides[currentSlide].img}
                alt="Hero visual"
                fill
                priority
                style={{ objectFit: "cover" }}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          {/* 👉 Move Apply Now here */}
          <div
            className="newfirstcard-container"
          // style={{ top:'0px',boxSizing: "content-box" }}
          >
            <div
              style={{
                textAlign: "center",
                top: "0px",
                color: "#777777",
                position: "absolute",
                fontSize: "16px",
                paddingTop: "30px",
              }}
            >
              Please provide your personal information
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div className="step-number1">1</div>
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="progress-bar">
                <div className="step-number1">2</div>
                <div
                  className="progress-bar-fill"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
              {/* First Name Field */}
              <div
                className={styles.formGroup}
                style={{ position: "relative" }}
              >
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Name as per PAN"
                  value={formData.fullname}
                  className={styles.input}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  autoCapitalize="words"
                />
                <span
                  className={styles.icon}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#00000061",
                  }}
                >
                  <FaUser />
                </span>
                {formErrors.fullname && (
                  <span
                    className="error"
                    style={{ position: "absolute", top: "100%", left: 0 }}
                  >
                    {formErrors.fullname}
                  </span>
                )}
              </div>

              <div>
                {/* Mobile Number Field */}
                <div
                  className={styles.formGroup}
                  style={{ position: "relative" }}
                >
                  <input
                    ref={mobileNumberRef}
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    inputMode="numeric"
                    value={formData.mobileNumber}
                    className={styles.input}
                    onChange={handleMobileNumberChange}
                  />
                  <span
                    className={styles.icon}
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#00000061",
                    }}
                  >
                    <FaPhone />
                  </span>
                  {formErrors.mobileNumber && (
                    <span
                      className="error"
                      style={{ position: "absolute", top: "100%", left: 0 }}
                    >
                      {formErrors.mobileNumber}
                    </span>
                  )}
                </div>

                <div
                  className={styles.formGroup}
                  style={{ position: "relative" }}
                >
                  <Select
                    instanceId="profession"
                    id="profession"
                    name="profession"
                    value={professionOptions.find(
                      (option) => option.value === formData.profession
                    )}
                    options={professionOptions}
                    ref={nextInputRef}
                    onChange={handleProfessionChange}
                    styles={customStyles}
                    placeholder="Select Occupation"
                    isSearchable={false}
                    menuPosition="absolute"
                    components={{ Option: CustomOption }}
                  // ✅ REMOVED: menuIsOpen, onFocus, onBlur, onClick - let react-select handle menu state
                  />

                  {formErrors.profession && (
                    <span
                      className="error"
                      style={{ position: "absolute", top: "100%", left: 0 }}
                    >
                      {formErrors.profession}
                    </span>
                  )}
                </div>
              </div>

              {/* Payment Type Field (react-select) */}
              <div
                className={styles.formGroup}
                style={{ position: "relative" }}
              >
                <Select
                  instanceId="paymentType"
                  id="paymentType"
                  name="paymentType"
                  value={paymentTypeOptions.find(
                    (option) => option.value === formData.paymentType
                  )}
                  options={paymentTypeOptions}
                  ref={paymentTypeRef}
                  onChange={handlePaymentTypeChange}
                  styles={customStyles}
                  placeholder="Select Payment Type"
                  isSearchable={false}
                  menuPosition="absolute"
                  components={{ Option: CustomOption }}
                // ✅ REMOVED: menuIsOpen, onFocus, onBlur, onClick - let react-select handle menu state
                />

                {formErrors.paymentType && (
                  <span
                    className="error"
                    style={{ position: "absolute", top: "100%", left: 0 }}
                  >
                    {formErrors.paymentType}
                  </span>
                )}
              </div>

              {/* Monthly Income Field */}
              <div
                className={styles.formGroup}
                style={{ position: "relative" }}
              >
                <input
                  type="number"
                  id="monthlyIncome"
                  name="monthlyIncome"
                  placeholder="Monthly Income"
                  value={formData.monthlyIncome}
                  inputMode="numeric"
                  className={styles.input}
                  ref={monthlyIncomeRef}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // Allow only digits
                    setFormData({ ...formData, monthlyIncome: value });
                    if (formErrors.monthlyIncome) {
                      setFormErrors({ ...formErrors, monthlyIncome: "" });
                    }
                  }}
                />
                <span
                  className={styles.icon}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#00000061",
                  }}
                >
                  <FaRupeeSign />
                </span>
                {formErrors.monthlyIncome && (
                  <span
                    className="error"
                    style={{ position: "absolute", top: "100%", left: 0 }}
                  >
                    {formErrors.monthlyIncome}
                  </span>
                )}
              </div>

              <div
                className={styles.formGroup}
                style={{ position: "relative" }}
              >
                <input
                  // type="text"
                  type={
                    inputStage === "alphabets"
                      ? "text"
                      : inputStage === "numbers"
                        ? "tel"
                        : "text"
                  }
                  inputMode="text"
                  id="pan"
                  name="pan"
                  placeholder="Enter PAN"
                  // value={formData.pan}
                  value={panValue}
                  className={styles.input}
                  onChange={handleInputChange}
                  pattern={inputStage === "numbers" ? "[0-9]*" : undefined}
                  // inputMode={getInputMode()}
                  autoCapitalize="characters"
                />
                <span
                  className={styles.icon}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#00000061",
                  }}
                >
                  <FaIdCard />
                </span>
                {formErrors.pan && (
                  <span
                    className="error"
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      marginTop: "5px",
                    }}
                  >
                    {formErrors.pan}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>
                  {/* <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  setErrors((prevErrors) => ({ ...prevErrors, consent: "" }));
                }}
              /> */}
                  {showFullConsent ? (
                    <>
                      You hereby consent to Aryse Fin being appointed as your
                      authorized representative to receive your Credit
                      Information from Experian for the purpose of accessing
                      credit worthiness and availing pre-approved offers (“End
                      Use Purpose”). You hereby agree to Terms and Conditions. I
                      authorize CreditHaat, its partner financial
                      institutes/lenders and their representatives to Call, SMS
                      or communicate via WhatsApp regarding my application. This
                      consent overrides any registration for DNC / NDNC. I
                      confirm I am in India, I am a major and a resident of
                      India and I have read and I accept Aryse Fin Privacy
                      Policy Click here to read the PRIVACY POLICY & TERMS OF
                      SERVICE
                      <span
                        onClick={() => setShowFullConsent(false)}
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          textDecoration: "none",
                        }}
                      >
                        Show Less
                      </span>
                    </>
                  ) : (
                    <>
                      You hereby consent to Aryse Fin being appointed as your
                      authorized representative...
                      <span
                        onClick={() => setShowFullConsent(true)}
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          textDecoration: "none",
                        }}
                      >
                        Read More
                      </span>
                    </>
                  )}
                </label>
                {errors.consent && (
                  <p style={{ color: "red" }}>{errors.consent}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>
                  {/* <input
                type="checkbox"
                checked={terms}
                onChange={(e) => {
                  setTerms(e.target.checked);
                  setErrors((prevErrors) => ({ ...prevErrors, terms: "" }));
                }}
              /> */}
                  {showConsent ? (
                    <>
                      By agreeing and accepting the terms and conditions set out
                      herein, you provide your express consent to Social Worth
                      Technologies Private Limited, Whizdm Innovations Pvt Ltd,
                      Upwards Fintech Services Pvt Ltd, Tata Capital Financial
                      Services Ltd, SmartCoin Financials Pvt Ltd, MWYN Tech Pvt
                      Ltd, L&T Finance Ltd, Krazybee Services Pvt Ltd,
                      Infocredit Services Pvt. Ltd, Incred Financial Services,
                      IIFL Finance Ltd, EQX Analytics Pvt Ltd, EPIMoney Pvt Ltd,
                      Bhanix finance and Investment LTd, Aditya Birla Finance
                      Ltd to access the credit bureaus and credit information
                      report and credit score. You also hereby irrevocably and
                      unconditionally consent to usage of such credit
                      information being provided by credit bureaus.
                      <span
                        onClick={() => setShowConsent(false)}
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          textDecoration: "none",
                        }}
                      >
                        Show Less
                      </span>
                    </>
                  ) : (
                    <>
                      By agreeing and accepting the terms and conditions set out
                      herein, you provide your...
                      <span
                        onClick={() => setShowConsent(true)}
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          textDecoration: "none",
                        }}
                      >
                        Read More
                      </span>
                    </>
                  )}
                </label>
                {errors.terms && <p style={{ color: "red" }}>{errors.terms}</p>}
              </div>
              <div style={{ marginBottom: "50px" }}>
                Calculation:
                <br /> Aryse Fin does not charge any fees from the user.
                <br /> A sample loan calculation for ₹1,00,000 borrowed for 1
                year, with interest rate @13% per annum*, is as provided below:{" "}
                <br />
                Processing fee (@ 2%) = ₹2,000 + GST = ₹2,360
              </div>
              <div className={styles.stickyButton}>
                <button
                  type="submit"
                  className={`${styles.button} ${styles.submitButton}`}
                  onClick={handleNextClick}
                >
                  {/* Next */}
                  {submitButtonText}
                </button>
                {/* className={`w-full  ${styles.submitButton}`} */}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OTP Bottom Sheet Modal */}
      {isOtpBottomSheetVisible && (
        <OTPBottomSheet
          isVisible={isOtpBottomSheetVisible}
          verifyOTP={handleVerifyOTP}
          upotp={upotp}
          otpStatus={otpStatus}
          setUpOtp={setUpOtp}
        />
      )}
    </>
  );
};

export default RaysaNewPage;
