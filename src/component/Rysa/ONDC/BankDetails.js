"use client";
import React, { useState, useRef, useCallback, useContext } from "react";
import Select from "react-select";
import { useSearchParams } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import {
  FaUser,
  FaBuilding,
  FaCreditCard,
  FaUniversity,
  FaLandmark,
} from "react-icons/fa";
// import "./BankDetails.css";
import "./BankDetailsNew.css";
import styles from "./BankDetailsNew.module.css";
import axios from "axios";
// import { Roboto } from "next/font/google";
import Image from "next/image";
import HeaderPart from "./HeaderPart";
import { init } from "./apis/ondcapi";
import useWebSocketONDCInit from "./Websocket/useWebSocketONDCInit";
// import useWebSocketONDCstatus from "./Websocket/useWebSocketONDCstatus";
import OnStatusContext from "./context/OnStatusContext";
import { bankDetailsForm } from "./formSubmitApis/FormSubmitApi";
import SelectedLenderContext from "./context/SelectedLenderContext";
import useWebSocketONDCstatus from "./Websocket/useWebSocketONDCstatus";
// import HittingApisLoader from "./LoadingPages/HittingApisLoader";
import HittingApisLoader from "./LoadingPages/HittingApisLoader";
import { useRouter } from "next/navigation";
import OnSearchContext from "./context/OnSearchContext";
import logo2 from "../../Rysa/ONDC/images/AryseFin_logo.png";
// import logo2 from "../../Rysa/ONDC/images/Rysa_logo2.png";
import FormError from "./LoadingPages/formError";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const Bankdetails = () => {
  const [showFormError, setShowFormError] = useState(false);

  //Declaring this variables so that we can use it while filling the form data again or second time
  const [globalFormUrl, setGlobalFormUrl] = useState(null);
  // formDataRef, formIdForParam, paymentId
  const [globalFormIdForParam, setGlobalFormIdForParam] = useState(null);
  const [globalPaymentId, setGlobalPaymentId] = useState(null);
  ///////////////////////////////////////////////////////////

  const initPayloadRef = useRef(null); //we are declaring this to store the form id because React's useCallback closures capture the value of variables at the time they are declared, not the updated value.

  const {
    SelectedLenderData,
    setSelectedLenderData,
    globalSettlementAmount,
    setGlobalSettlementAmount,
  } = useContext(SelectedLenderContext); //added this to send the product name from this data to init api for saving logger
  const {
    formSubmissionData,
    setFormSubmissionData,
    payloadForSelect,
    setPayloadForSelect,
  } = useContext(OnSearchContext);

  const router = useRouter();

  const lastInitRef = useRef(false);
  // 1. Define ref at the top of your component
  const externalFormWindowRef = useRef(null);
  // const externalFormWindowRef2 = useRef(null);

  const [waitingLoader, setWaitingLoader] = useState(false);

  const {
    onStatusData,
    setOnStatusData,
    initPayload,
    setInitPayload,
    onOnitData,
    setOnInitData,
  } = useContext(OnStatusContext);
  const { selectedLenderBankDetails, setSelectedLenderBankDetails } =
    useContext(SelectedLenderContext);

  const searchParams = useSearchParams();
  const clientLoanId = searchParams.get("client_loan_id");
  const [formData, setFormData] = useState({
    accountname: "",
    accountType: "",
    IFSC: "",
    accountNumber: "",
    // salarySlip: null,
    // bankName: "",
    // branchName: "",
    // salarySlipLink: "",
  });

  const formDataRef = useRef(formData);

  const [formErrors, setFormErrors] = useState({});
  const [activeContainer, setActiveContainer] = useState("BankDetails");
  const accountnameRef = useRef(null);
  const bankNameRef = useRef(null);
  const branchNameRef = useRef(null);
  const IFSCRef = useRef(null);
  const accountNumberRef = useRef(null);

  // =================new function add her ===========================
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [showSheetAccountType, setShowSheetAccountType] = useState(false);
  const [accountTypeError, setAccountTypeError] = useState(false);
  // ==================================================================
  // const CustomOption = ({
  //   data,
  //   innerRef,
  //   innerProps,
  //   selectOption,
  //   isSelected,
  // }) => (
  //   <div
  //     ref={innerRef}
  //     {...innerProps}
  //     style={{
  //       padding: "10px",
  //       position: "relative",
  //     }}
  //   >
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "space-between",
  //         alignItems: "center",
  //       }}
  //     >
  //       <span>{data.label}</span>
  //       <input
  //         type="radio"
  //         name={data.group}
  //         value={data.value}
  //         checked={isSelected}
  //         onChange={() => selectOption(data)}
  //       />
  //     </div>
  //     <hr
  //       style={{
  //         margin: "5px 0",
  //         border: "0",
  //         borderTop: "1px solid #ddd",
  //         width: "100%",
  //       }}
  //     />
  //   </div>
  // );

  // const customStyles = {
  //   input: (provided) => ({
  //     ...provided,
  //     padding: "8px",
  //     width: "100%",
  //     minHeight: "70px",
  //     // border: "none",
  //     borderRadius: "10px",
  //     cursor: "pointer",
  //     borderRadius: "50px",
  //   }),
  //   menu: (provided) => ({
  //     ...provided,
  //     position: "fixed",
  //     top: "50%",
  //     left: "50%",
  //     transform: "translate(-50%, -50%)",
  //     width: "80%",
  //     maxWidth: "400px",
  //     zIndex: 9999,
  //     boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
  //     borderRadius: "10px",
  //   }),
  //   control: (provided) => ({
  //     ...provided,
  //     width: "100%",
  //     borderRadius: "10px",
  //     minHeight: "50px",
  //   }),
  //   placeholder: (provided) => ({
  //     ...provided,
  //     padding: "12px",
  //   }),
  //   dropdownIndicator: (provided) => ({
  //     ...provided,
  //     padding: "0",
  //   }),
  //   indicatorSeparator: () => ({
  //     display: "none",
  //   }),
  // };

  // const customStyles2 = {
  //   control: (provided) => ({
  //     ...provided,
  //     minHeight: "unset",
  //     borderRadius: "10px",
  //     height: "36px", // set your desired height
  //   }),
  //   valueContainer: (provided) => ({
  //     ...provided,
  //     padding: "2px 8px",
  //   }),
  //   input: (provided) => ({
  //     ...provided,
  //     margin: 0,
  //     padding: 0,
  //   }),
  //   indicatorsContainer: (provided) => ({
  //     ...provided,
  //     height: "36px",
  //   }),
  // };
  // ===============================new add here =========
  const handleSelectAccountType = (value) => {
    setSelectedAccountType(value);
    setFormData({ ...formData, accountType: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, accountType: "" }));
    setAccountTypeError(false);
  };
  // =====================================================
  const handleaccountnameChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, accountname: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, accountname: "" }));
  };

  const handleIFSCChange = (e) => {
    const value = e.target.value.toUpperCase();
    setFormData({ ...formData, IFSC: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, IFSC: "" }));

    if (value && value.length === 11) {
      if (accountNumberRef.current) {
        accountNumberRef.current.focus();
      }
    }
  };

  const handleaccountNumberChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, accountNumber: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, accountNumber: "" }));
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;
    const data = new FormData();

    if (!formData.accountname) {
      errors.accountname = "Account holder name is required";
      isValid = false;
    } else if (formData.accountname.trim().length < 2) {
      errors.accountname = "Account holder name must be at least 2 characters";
      isValid = false;
    }

    // if (!formData.accountType) {
    //   errors.accountType = "Please select account type";
    //   isValid = false;
    // }
    // =========================new added here ==============================
    if (!formData.accountType) {
      errors.accountType = "Please select account type";
      setAccountTypeError(true); // हे line जोडा
      isValid = false;
    }
    // =======================================================================

    if (!formData.IFSC) {
      errors.IFSC = "IFSC code is required";
      isValid = false;
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.IFSC)) {
      errors.IFSC = "Please enter a valid IFSC code";
      isValid = false;
    }

    if (!formData.accountNumber) {
      errors.accountNumber = "Account number is required";
      isValid = false;
    } else if (!/^\d{9,18}$/.test(formData.accountNumber)) {
      errors.accountNumber =
        "Please enter a valid account number (9-18 digits)";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // const handleSubmit = async (e) => {

  //   // externalFormWindowRef.current = window.open("/ondc/redirecting", "_blank");

  //   formDataRef.current = formData;
  //   console.log("The formData while hitting the init api is : ", formData);
  //   e.preventDefault();

  //   console.log("Inside handleSubmit");

  //   if (validateForm()) {
  //     externalFormWindowRef.current = window.open("/ondc/redirecting", "_blank");
  //     console.log("Form submitted successfully", formData);

  //     //here we will save the data into userInfo table
  //     // const response = .{process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}saveUserInfo`);

  //     //init1 call -- calling init first time
  //     const updatedInitPayload = {
  //       ...initPayload,
  //       bankCode: formData.IFSC,//this fields are optional for the api
  //       accountNumber: formData.accountNumber,//this fields are optional for the api

  //       mobileNumber: formSubmissionData.contactNumber,
  //       stage: 4, //here in backend select methid we will check that if the stage is 2 then we will create a apply record for that user
  //       productName: SelectedLenderData.message.order.provider.descriptor.name,

  //       //form data to save
  //       formType: "KYC Form",//1 is for bank Details
  //       version: SelectedLenderData.context.version

  //       // vpa: "user@upi",
  //       // settlementAmount: "1666.67"
  //     };
  //     setWaitingLoader(true);
  //     // callinng handle init for first init1 call
  //     handleInit(updatedInitPayload);

  //   }
  // };

  //Code for ONDC ------------------------------------------------------------------------------------

  const openOrFocusWindow = () => {
    // If no window yet OR if it's closed
    if (
      !externalFormWindowRef.current ||
      externalFormWindowRef.current.closed
    ) {
      externalFormWindowRef.current = window.open(
        "/ondc/redirecting",
        "_blank"
      );
    } else {
      // If window is already open, bring it to focus
      externalFormWindowRef.current.focus();
    }
  };

  const [firstTimeSubmitFlag, setFirstTimeSubmitFlag] = useState(true); //we created this flag just to see that user is submitting the bank details form at first or is he submitting it again due to some reason

  const handleSubmit = async (e) => {
    // externalFormWindowRef.current = window.open("/ondc/redirecting", "_blank");

    formDataRef.current = formData;
    console.log("The formData while hitting the init api is : ", formData);
    e.preventDefault();

    console.log("Inside handleSubmit");

    if (firstTimeSubmitFlag === true) {
      if (validateForm()) {
        externalFormWindowRef.current = window.open(
          "/ondc/redirecting",
          "_blank"
        );
        console.log("Form submitted successfully", formData);

        //here we will save the data into userInfo table
        // const response = .{process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}saveUserInfo`);

        //init1 call -- calling init first time
        const updatedInitPayload = {
          ...initPayload,
          bankCode: formData.IFSC, //this fields are optional for the api
          accountNumber: formData.accountNumber, //this fields are optional for the api

          mobileNumber: formSubmissionData.contactNumber,
          stage: 4, //here in backend select methid we will check that if the stage is 2 then we will create a apply record for that user
          productName:
            SelectedLenderData.message.order.provider.descriptor.name,

          //form data to save
          formType: "KYC Form", //1 is for bank Details
          version: SelectedLenderData.context.version,

          // vpa: "user@upi",
          // settlementAmount: "1666.67"
        };
        setWaitingLoader(true);
        // callinng handle init for first init1 call
        handleInit(updatedInitPayload);
      }
    } else {
      if (validateForm()) {
        // externalFormWindowRef.current = window.open("/ondc/redirecting", "_blank");
        openOrFocusWindow();
        console.log("Form submitted successfully", formData);
        setWaitingLoader(true);
        handleBankDetailsForm(
          globalFormUrl,
          formDataRef,
          globalFormIdForParam,
          globalPaymentId
        );

        //here we will save the data into userInfo table
        // const response = .{process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}saveUserInfo`);

        //init1 call -- calling init first time
        // const updatedInitPayload = {
        //   ...initPayload,
        //   bankCode: formData.IFSC,//this fields are optional for the api
        //   accountNumber: formData.accountNumber,//this fields are optional for the api

        //   mobileNumber: formSubmissionData.contactNumber,
        //   stage: 4, //here in backend select methid we will check that if the stage is 2 then we will create a apply record for that user
        //   productName: SelectedLenderData.message.order.provider.descriptor.name,

        //   //form data to save
        //   formType: "KYC Form",//1 is for bank Details
        //   version: SelectedLenderData.context.version

        //   // vpa: "user@upi",
        //   // settlementAmount: "1666.67"
        // };

        // callinng handle init for first init1 call
        // handleInit(updatedInitPayload);
      }
    }
  };

  const handleInit = async (initPayload) => {
    // console.log("The init payload is : ", initPayload);
    // setSelectedLenderBankDetails(formData);

    try {
      // setWaitingLoader(true);

      console.log("The init payload before hitting is : ", initPayload);

      const initResponse = await init(initPayload);
      if (initResponse.status === 200) {
        console.log("The init Respose that we got is :: ", initResponse);
      }
    } catch (error) {
      console.log("Error while calling init api");
    }
  };

  const handleWebsocketMessageForInit = useCallback((data) => {
    console.log("Got oninit");

    // console.log("received response id of the third onselct form & i.e : ", data);
    try {
      const parsedData = JSON.parse(data.content);
      setOnInitData(parsedData);

      //here we should be creating one global variable or context which will hold this onstatus callback
      if (parsedData?.message?.order?.items?.[0]?.xinput?.form?.url) {
        setInitPayload((prev) => ({
          ...prev,
          formId: parsedData?.message?.order?.items?.[0]?.xinput?.form?.id,
          // initAttempt: 2,
          paymentId: parsedData?.message?.order?.payments?.[0]?.id,
        }));

        initPayloadRef.current = parsedData;
        //we will be passing this id in the param of handleBankDetailsForm so that from their we can call another init api with the form id of first form submission
        const formIdForParam =
          parsedData?.message?.order?.items?.[0]?.xinput?.form?.id;
        console.log(
          "Before if else ,",
          parsedData?.message?.order?.items?.[0]?.xinput?.head?.index?.cur
        );
        // if (parsedData?.message?.order?.items?.[0]?.xinput?.head?.descriptor?.name === "Account Information") {
        if (
          parsedData?.message?.order?.items?.[0]?.xinput?.head?.index?.cur === 0
        ) {
          console.log("Inside if for Account Information Form");
          console.log(
            "parsedData?.message?.order?.items?.[0]?.xinput?.head?.index?.cur for Account Information is : ",
            parsedData?.message?.order?.items?.[0]?.xinput?.head?.index?.cur
          );
          const formUrl =
            parsedData?.message?.order?.items?.[0]?.xinput?.form?.url.replace(
              "/get/",
              "/post/"
            );

          const paymentId = parsedData?.message?.order?.payments?.[0]?.id;

          setGlobalFormUrl(formUrl);
          setGlobalFormIdForParam(formIdForParam);
          setGlobalPaymentId(paymentId);

          // here we will call the bankDetailsform function
          handleBankDetailsForm(
            formUrl,
            formDataRef,
            formIdForParam,
            paymentId
          ); //inside this we will call the init2 api
          //here inside we will hit init2 where we will get the oninit api in which we get the link of emandate form
          //where else if after  this will be executed from where we will get the response of that emandate form in onStatus callback where we will call the init3 api i.e. the last init api
        }
        // else if (parsedData?.message?.order?.items?.[0]?.xinput?.head?.descriptor?.name === "Emandate") {
        else if (
          parsedData?.message?.order?.items?.[0]?.xinput?.head?.index?.cur === 1
        ) {
          const formUrl =
            parsedData?.message?.order?.items?.[0]?.xinput?.form?.url;
          // 3. Use in handleWebSocketMessageForSelect
          if (formUrl && externalFormWindowRef.current) {
            const redirectUrl = `${formUrl}`;
            externalFormWindowRef.current.location = redirectUrl;
          }
        } else if (
          parsedData?.message?.order?.items?.[0]?.xinput?.head?.index?.cur === 2
        ) {
          console.log("Inside else if for LoanAggrement form");
          console.log(
            "parsedData?.message?.order?.items?.[0]?.xinput?.head?.index?.cur for LoanAggrement is : ",
            parsedData?.message?.order?.items?.[0]?.xinput?.head?.index?.cur
          );
          const formUrl =
            parsedData?.message?.order?.items?.[0]?.xinput?.form?.url;

          if (formUrl) {
            router.push("/ondc/loanaggrement");
          } else {
            console.log("No form URL found for Loan Agreement form");
          }
        }
      } else {
        console.log("form not found in onInit");
      }
    } catch (error) {
      console.log("Error while getting onInit : ", error);
    }
  }, []);

  useWebSocketONDCInit(handleWebsocketMessageForInit);

  const handleBankDetailsForm = async (
    formUrl,
    formDataRef,
    formIdForParam,
    paymentId
  ) => {
    try {
      console.log(
        "here the form url and the id should be the same : ",
        formUrl,
        " id is : ",
        formIdForParam
      );

      const response = await bankDetailsForm(
        formUrl,
        formDataRef,
        formIdForParam
      );
      if (response?.status === 200) {
        // externalFormWindowRef.current = window.open("/ondc/waiting", "_blank");
        // externalFormWindowRef.current = window.open("/ondc/redirecting", "_blank");
        console.log("Got the response from bankDetails form : ", response);

        // if (response.data.status === "Successful" && response.data.submission_id) {
        if (response?.data?.submission_id) {
          const updatedInitPayload = {
            ...initPayload,
            formId: formIdForParam,
            submissionId: response.data.submission_id,
            //here we will write the stage and mobile number and product name

            mobileNumber: formSubmissionData.contactNumber,
            stage: 4, //here in backend select methid we will check that if the stage is 2 then we will create a apply record for that user
            productName:
              SelectedLenderData.message.order.provider.descriptor.name,

            //form data to save
            formType: "Bank Details", //1 is for bank Details
            accountname: formDataRef.current.accountname,
            accountType: formDataRef.current.accountType,
            IFSC: formDataRef.current.IFSC,
            accountNumber: formDataRef.current.accountNumber,
            version: SelectedLenderData.context.version,
            initAttempt: 2,
            paymentId: paymentId,
          };

          //here we are calling init2
          await handleInit(updatedInitPayload);
          // externalFormWindowRef.current = window.open("/ondc/waiting", "_blank");
          // externalFormWindowRef2.current = window.open("/ondc/redirecting", "_blank");
        } else {
          console.log(
            "Not hitting any apis now because of incorrect response in response.status is 200",
            response
          );
          externalFormWindowRef.current.close();
          setWaitingLoader(false);

          // alert("Try with another bank account number");
          setFirstTimeSubmitFlag(false);
          setShowFormError(true);
          // router.push("/ondc/form-error");
        }
      } else {
        console.log(
          "Not hitting any apis now because of incorrect response in response.status is not 200",
          response
        );
        externalFormWindowRef.current.close();
        setWaitingLoader(false); //here we will close the loader which is used to show the waiting for callbacks screen

        // alert("Try with another bank account number");
        setFirstTimeSubmitFlag(false); //If this is true then we hit the first init api but if we are submiting the bank details form at second time we dont need to hit the first init api so we are making it false
        setShowFormError(true); //this is used to show user that his bank details form is not accepted due to some reason please fill it again by clicking on next button of that page
        // router.push("/ondc/form-error");
      }
    } catch (error) {
      console.log(
        "error in calling bankDetails form from BankDetails.js : ",
        error
      );
      externalFormWindowRef.current.close();
      console.log(
        "Not hitting any apis now because of incorrect response in response.status is error ",
        response
      );
      setWaitingLoader(false); //here we will close the loader which is used to show the waiting for callbacks screen

      // alert("Try with another bank account number");
      setFirstTimeSubmitFlag(false); //If this is true then we hit the first init api but if we are submiting the bank details form at second time we dont need to hit the first init api so we are making it false
      setShowFormError(true); //this is used to show user that his bank details form is not accepted due to some reason please fill it again by clicking on next button of that page
      // router.push("/ondc/form-error");
    }
  };

  const handleWebSocketMessageForStatus = useCallback((data) => {
    // ✅ CLOSE FORM TAB IF OPEN
    if (
      externalFormWindowRef.current &&
      !externalFormWindowRef.current.closed
    ) {
      console.log("Inside the if of externalFormWindowRef");

      externalFormWindowRef.current.close(); // Close form tab
      window.focus(); // Focus back to loanapproval tab

      console.log("After window.focus");
    }

    console.log("received response id of form & i.e : ", data);
    try {
      const parsedData = JSON.parse(data.content);
      //here we should be creating one global variable or context which will hold this onstatus callback

      if (
        parsedData?.message?.order?.items?.[0]?.xinput?.form_response
          ?.status === "APPROVED" &&
        parsedData?.message?.order?.items?.[0]?.xinput?.form_response
          ?.submission_id
      ) {
        //so here we will take that submission id and then will hit that init api

        //here we will store the onSelect callback
        setOnStatusData(parsedData);

        //   //here we will call the init api with the values(taken from onStatus ) which it will need
        //here we are calling the 3rd init api that is the last init3 api

        console.log(
          "The onOnitData before calling the last init is : ",
          onOnitData
        );

        const initPayload = {
          transactionId: parsedData.context.transaction_id,
          bppId: parsedData.context.bpp_id,
          bppUri: parsedData.context.bpp_uri,
          providerId: parsedData.message.order.provider.id,
          itemId: parsedData.message.order.items[0].id,
          // formId: parsedData.message.order.items[0].xinput.form.id,
          formId:
            initPayloadRef.current?.message?.order?.items?.[0]?.xinput?.form
              ?.id || "NA",
          submissionId:
            parsedData.message.order.items[0].xinput.form_response
              .submission_id,
          bankCode: "HDFC",
          accountNumber: "1234567890",
          vpa: "user@upi",
          // settlementAmount: "1666.67",
          settlementAmount: globalSettlementAmount,
          mobileNumber: formSubmissionData.contactNumber,
          stage: 4, //here in backend select methid we will check that if the stage is 2 then we will create a apply record for that user
          productName:
            SelectedLenderData.message.order.provider.descriptor.name,

          //form data to save
          formType: "Emandate form", //1 is for bank Details
          version: SelectedLenderData.context.version,
          initAttempt: 3,
          paymentId: parsedData?.message?.order?.payments?.[0]?.id,
        };

        // setInitPayload(initPayload);
        // setInitPayload(prev => ({
        //   ...prev,
        //   ...initPayload
        //   // formId: parsedData?.message?.order?.items?.[0]?.xinput?.form?.id,
        //   // // initAttempt: 2,
        //   // paymentId: parsedData?.message?.order?.payments?.[0]?.id
        // }));

        if (!lastInitRef.current) {
          console.log(
            "caling handle init from onStatus and lastInitRef is : ",
            lastInitRef.current
          );
          handleInit(initPayload);
          // router.push("/ondc/loanaggrement");
          // openNewPage();
        }

        // we will get an problem if we call our init api here as we will get to this callback function again after this when we get the onstatus for our next redirected form but their we dont want to call init

        // router.push("/ondc/bankdetails");

        // const initResponse = await init(initPayload);
        // handleInit(initPayload);

        //for temporarily we are calling our init api from here but after we will be calling init api on another page after taking the bank details
        // const submissionId = parsedData.message.order.items[0].xinput.form_response.submission_id;
        // console.log("The submission id that we got is : ",submissionId);
      }else if (parsedData?.message?.order?.items?.[0]?.xinput?.form_response?.status?.toLowerCase() === "pending" && parsedData?.message?.order?.items?.[0]?.xinput?.form_response?.submission_id) {

        const baseUrl = `/ondc/ondcpending?mobilenumber=${formSubmissionData.contactNumber}`;
        const transactionId = SelectedLenderData?.context?.transaction_id;
        router.push(
          transactionId ? `${baseUrl}&transactionid=${transactionId}` : baseUrl
        );

      }
       else {
        const baseUrl = `/ondc/ondcrejection?mobilenumber=${formSubmissionData.contactNumber}`;
        const transactionId = SelectedLenderData?.context?.transaction_id;
        router.push(
          transactionId ? `${baseUrl}&transactionid=${transactionId}` : baseUrl
        );

        // console.log("Not gone in if part of handleWebSocketMessageForStatus");
        // console.log("Your application not accepted", parsedData);
        // localStorage.setItem('mobileNumberForRejection', formSubmissionData.contactNumber);
        // window.location.href = `/ondc/RejectionPage?mobilenumber=${formSubmissionData.contactNumber}`;
      }
    } catch (error) {
      console.log("Error while getting onstatus : ", error);
    }
  }, []);

  useWebSocketONDCstatus(handleWebSocketMessageForStatus);

  // const openNewPage=()=>{
  //   externalFormWindowRef.current = window.open("/ondc/waiting", "_blank");
  // }

  //------------------------------------------------------------------------------------------------------

  return (
    <>
      {!showFormError ? (
        <>
          {!waitingLoader ? (
            <>
              <div className={`${styles.container} ${outfit.className}`}>
                {/*delete*/}
                <div className={styles.mainHeaderPart}>
                  <div className={styles.topchildren}>
                    <div className={styles.logoContainer}>
                      <Image
                        src="/arysefin-white logo.png"
                        width={80}
                        height={80}
                        className={styles.logo2}
                        alt="Aryse_Fin logo"
                        priority
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.card}>
                  <form onSubmit={handleSubmit}>
                    <h3 className={styles.heading}>
                      Please provide your bank details
                    </h3>

                    <div
                      className={`${styles.fields} ${
                        formErrors.accountname ? styles.errorField : ""
                      }`}
                    >
                      <span className={styles.fieldName1}>
                        Account holder name
                      </span>
                      <input
                        type="text"
                        id="accountname"
                        name="accountname"
                        value={formData.accountname}
                        onChange={handleaccountnameChange}
                        className={styles.inputfield}
                      />
                    </div>
                    {formErrors.accountname && (
                      <span className={styles.errorText}>
                        {formErrors.accountname}
                      </span>
                    )}

                    <div
                      className={`${styles.fields2} ${
                        accountTypeError ? styles.fieldserror : ""
                      }`}
                    >
                      <span className={styles.fieldName}>Account Type</span>
                      <div className={styles.inputWrapper}>
                        <input
                          type="text"
                          name="accountType"
                          value={selectedAccountType || ""}
                          placeholder="Select"
                          className={styles.inputfield1}
                          readOnly
                          onClick={() =>
                            setShowSheetAccountType(!showSheetAccountType)
                          }
                        />
                        <div
                          className={styles.iconContainer}
                          onClick={() =>
                            setShowSheetAccountType(!showSheetAccountType)
                          }
                        >
                          <FaChevronDown className={styles.iconInput} />
                        </div>
                      </div>
                      {showSheetAccountType && (
                        <>
                          <div
                            className={styles.dropdownBackdrop}
                            onClick={() => setShowSheetAccountType(false)}
                          ></div>

                          <div className={styles.dropdownList}>
                            <div
                              className={`${styles.dropdownOption} ${
                                selectedAccountType === "Saving"
                                  ? styles.dropdownOptionSelected
                                  : ""
                              }`}
                              onClick={() => {
                                handleSelectAccountType("Saving");
                                setShowSheetAccountType(false);
                              }}
                            >
                              Saving
                            </div>
                            <div
                              className={`${styles.dropdownOption} ${
                                selectedAccountType === "Current"
                                  ? styles.dropdownOptionSelected
                                  : ""
                              }`}
                              onClick={() => {
                                handleSelectAccountType("Current");
                                setShowSheetAccountType(false);
                              }}
                            >
                              Current
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    {formErrors.accountType && (
                      <span className={styles.errorText}>
                        {formErrors.accountType}
                      </span>
                    )}

                    <div
                      className={`${styles.fields} ${
                        formErrors.IFSC ? styles.errorField : ""
                      }`}
                    >
                      <span className={styles.fieldName1}>Enter IFSC</span>
                      <input
                        ref={IFSCRef}
                        type="text"
                        id="IFSC"
                        name="IFSC"
                        value={formData.IFSC}
                        onChange={handleIFSCChange}
                        autoCapitalize="words"
                        className={styles.inputfield}
                      />
                    </div>
                    {formErrors.IFSC && (
                      <span className={styles.errorText}>
                        {formErrors.IFSC}
                      </span>
                    )}

                    <div
                      className={`${styles.fields} ${
                        formErrors.accountNumber ? styles.errorField : ""
                      }`}
                    >
                      <span className={styles.fieldName1}>
                        Enter account number
                      </span>
                      <input
                        ref={accountNumberRef}
                        type="number"
                        id="accountNumber"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleaccountNumberChange}
                        className={styles.inputfield}
                      />
                    </div>
                    {formErrors.accountNumber && (
                      <span className={styles.errorText}>
                        {formErrors.accountNumber}
                      </span>
                    )}
                    {/* Submit Button */}
                    <div className={styles.btnContainer}>
                      <button
                      type="submit"
                        // type="button"
                        className={styles.nextbtn}
                        // onClick={() => handleNextClick()}
                      >
                        <span>Next</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Processing APIs... */}
              <HittingApisLoader />
            </>
          )}
        </>
      ) : (
        <>
          {showFormError && <FormError setShowFormError={setShowFormError} />}
        </>
      )}
    </>
  );
};

export default Bankdetails;
