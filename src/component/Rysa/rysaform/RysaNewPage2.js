"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import "./NewPlPage2.css";
import styles from "./NewPIFirstPage2.module.css";
// import EmblaCarousel from "./Emblacarousel/js/EmblaCarousel";
// import NewBlListPage from "./NewBlJourneyD/NewBlListPage";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Loader from "./NewBlJourneyD/LendersLoader";
import { useRouter } from "next/navigation";
import RedirectionLoader from "./NewBlJourneyD/RedirectionLoader";
import ApplicationLoader from "./NewBlJourneyD/ApplicationLoader";
import ApplicationPopup from "./NewBlJourneyD/ErrorPopup";
import {
  FaEnvelope,
  FaHome,
  FaBuilding,
  FaCalendar,
  FaMapPin,
  FaArrowLeft,
  FaRupeeSign,
  FaUser,
  FaChevronDown,
} from "react-icons/fa"; // Font Awesome icons for React
import Select from "react-select";
// import ApplicationPopup from "../NewBlJourneyD/ApplicationPopup";
import ErrorPopup from "./NewBlJourneyD/ErrorPopup";
// import {Roboto} from 'next/font/google';
import { Roboto } from "next/font/google";
const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});
const RysaNewPage2 = ({
  // dobFlag,
  mainFormData,
  firstName,
  fatherName,
  lastName,
  getLendersList,
  // genderFlag,
  // emailFlag,
  // addressFlag,
  // residentialPincodeFlag,
  setActiveContainer,
}) => {
  const [formErrors, setFormErrors] = useState({
    email: "",
    address: "",
    dob: "",
    gender: "",
    companyName: "",
    officeemail: "",
    officePincode: "",
    residentialPincode: "",
    // loanAmount: "",
    // maritalStatus: "",
    // spouseName: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    address: "",
    dob: "",
    gender: "",
    companyName: "",
    officeemail: "",
    officePincode: "",
    residentialPincode: "",
    // loanAmount: "",
    // maritalStatus: "",
    // spouseName: "",
  });

  const [consent, setConsent] = useState(false);
  const [terms, setTerms] = useState(false);
  const [showFullConsent, setShowFullConsent] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [errors, setErrors] = useState({}); // Object to store error messages
  const formRef = useRef(null);

  // const[ActiveContainer, setActiveContainer]= useState("NewBlFirstPage");
  const [isLoading, setIsLoading] = useState(false);
  var json = null;
  const [lenderDetails, setLenderDetails] = useState(null);

  const [lenderProduct, setLenderProduct] = useState(null);
  const [cpi, setCpi] = useState(0);
  const [redirectionLinkLoader, setRedirectionLinkLoader] = useState(false);
  const [apiExecutionLoader, setApiExecutionLoader] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [applicationPopup, setApplicationPopup] = useState(false);
  const [progress, setProgress] = useState(0);
  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [link, setLink] = useState(""); // added new code
  const [officialInfoVisible, setOfficialInfoVisible] = useState(false); // adde new code
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
  }, []);

  const maritalStatusOptions = [
    { value: "NA", label: "Select Marital Status" },
    { value: "married", label: "Married" },
    { value: "unmarried", label: "Unmarried" },
    { value: "divorced", label: "Divorced" },
    { value: "widowed", label: "Widowed" },
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

  const handleMaritalStatusChange = (selectedOption) => {
    // Set the form data with the selected value
    setFormData({ ...formData, maritalStatus: selectedOption.value });

    // Check if the selected value is not 'NA' (Select Payment Type)
    if (selectedOption.value !== "NA") {
      // Clear any error if a valid option is selected
      setFormErrors({ ...formErrors, maritalStatus: "" });
    } else {
      // Show error if 'Select Payment Type' is selected
      setFormErrors({
        ...formErrors,
        maritalStatus: "Marital status is required",
      });
    }

    // Optionally close the menu after selection
    setIsMaritalStatusMenuOpen(false);
  };

  const [isMaritalStatusMenuOpen, setIsMaritalStatusMenuOpen] = useState(false);

  // Handle Payment Type field interactions
  const handleMaritalStatusFocus = () => {
    setIsMaritalStatusMenuOpen(true); // Open dropdown menu when focused
  };

  const handleMaritalStatusBlur = () => {
    setIsMaritalStatusMenuOpen(false); // Close dropdown menu when blurred
  };

  const handleMaritalStatusClick = (e) => {
    e.stopPropagation(); // Prevent the keyboard from opening when clicking on the Payment Type field
    setIsMaritalStatusMenuOpen(true); // Open dropdown menu
  };

  const CustomOption = (props) => {
    const { data, innerRef, innerProps, selectOption, isSelected } = props;

    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          padding: "10px",
          position: "relative", // Ensures that the radio button is placed on the right side
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between", // Space between label and radio button
            alignItems: "center", // Aligns the label and radio button
          }}
        >
          <span>{data.label}</span> {/* Label on the left */}
          <input
            type="radio"
            name="profession"
            value={data.value}
            checked={isSelected}
            onChange={() => selectOption(data)} // Select option when radio button is clicked
          />
        </div>

        {/* Horizontal line below the option and radio button */}
        <hr
          style={{
            margin: "5px 0",
            border: "0",
            borderTop: "1px solid #ddd", // Optional styling for the horizontal line
            width: "100%", // Ensure the line spans the entire width
          }}
        />
      </div>
    );
  };

  const validateForm = () => {
    let valid = true;
    const errors = {
      email: "",
      address: "",
      dob: "",
      gender: "",
      companyName: "",
      officeemail: "",
      officePincode: "",
      residentialPincode: "",
      // loanAmount: "",
      // maritalStatus: "",
      // spouseName: "",
    };

    // if (dobFlag && !formData.dob) {
    if (!formData.dob) {
      errors.dob = "Date of birth is required";
      valid = false;
    }
    // }

    // if (emailFlag) {
    if (!formData.email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
      valid = false;
    }
    // }

    // if (addressFlag) {
    // Validate Address
    if (!formData.address.trim()) {
      errors.address = "Address is required";
      valid = false;
    }
    // }

    // if (genderFlag) {
    if (!formData.gender) {
      errors.gender = "Gender is required";
      valid = false;
    }
    // }

    // if (!formData.maritalStatus) {
    //   errors.maritalStatus = "Marital status is required";
    //   valid = false;
    // }

    // if (!formData.loanAmount.trim()) {
    //   errors.loanAmount = "Loan amount is required";
    //   valid = false;
    // }

    // if (!formData.maritalStatus) {
    //   errors.maritalStatus = "Marital status is required";
    //   valid = false;
    // }

    // if (formData.maritalStatus === "married" && !formData.spouseName.trim()) {
    //   errors.spouseName = "Spouse name is required";
    //   valid = false;
    // }

    // if (residentialPincodeFlag) {
    if (!formData.residentialPincode) {
      errors.residentialPincode = "Home pincode is required";
    }
    // }

    // if (!formData.ITR) errors.ITR = 'ITR is required';

    // Validate Company Name
    if (!formData.companyName.trim()) {
      errors.companyName = "Company name is required";
      valid = false;
    }

    if (!formData.officeemail) {
      errors.officeemail = "Office email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.officeemail)) {
      errors.officeemail = "Invalid email address";
      valid = false;
    }

    // Validate Office Pincode
    if (!formData.officePincode.trim()) {
      errors.officePincode = "Office pincode is required";
      valid = false;
    } else if (
      formData.officePincode.length !== 6 ||
      !/^\d{6}$/.test(formData.officePincode)
    ) {
      errors.officePincode = "Invalid pincode format";
      valid = false;
    }

    setFormErrors(errors);
    console.log("The form errors are ", errors);
    return valid;
  };

  const handleDateChange2 = (date) => {
    console.log("Inside handle date change");
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    setFormData({ ...formData, dob: formattedDate });

    console.log("The changed date is :: ", formattedDate);
  };

  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const sixtyYearsAgo = new Date(
    today.getFullYear() - 60,
    today.getMonth(),
    today.getDate()
  );

  const handleDataLayerStage = (stage) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ stage: stage });
  };
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const query = formData.companyName.trim();
      if (query.length >= 1) {
        fetch(
          `${
            process.env.NEXT_PUBLIC_REACT_APP_BASE_URL
          }company/getCompanyNames?query=${encodeURIComponent(query)}`
        )
          // fetch(
          //   `${
          //     process.env.NEXT_PUBLIC_REACT_UAT_BASE_URL
          //   }getCompanyNames?query=${encodeURIComponent(query)}`
          // )
          .then((res) => res.json())
          .then((data) => {
            console.log("✅ API returned:", data);

            // ✅ Filter out exact match!
            const filtered = data.filter(
              (name) => name.toLowerCase() !== query.toLowerCase()
            );

            if (filtered.length > 0) {
              setCompanySuggestions(filtered);
              setShowSuggestions(true);
            } else {
              setCompanySuggestions([]);
              setShowSuggestions(false);
            }
          })
          .catch((err) => console.error(err));
      } else {
        setCompanySuggestions([]);
        setShowSuggestions(false);
      }
    }, 150);

    return () => clearTimeout(handler);
  }, [formData.companyName]);

  const suggestionsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Calculate the completion percentage whenever formData changes
  useEffect(() => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(
      (value) => value !== ""
    ).length;
    const completionPercentage = (filledFields / totalFields) * 100;

    setProgress(completionPercentage);
  }, [formData]);

  const handleSubmit = (e) => {
    console.log("Inside handle Submit");
    e.preventDefault();
    if (validateForm()) {
      console.log("Inside validate form");
      // Process form data and navigate to the next page
      handleDataLayerStage(3); // Track step 2 when the form is submitted
      console.log("After Data layer stage");
      console.log("Form data:", formData);
      StoreDataToBackendForSalaried(e);
      // getLendersList(e);
      // setActiveContainer('LendersList');

      // router.push('/next-page'); // Uncomment and modify the route as needed
    } else {
      console.log("form not validated");
    }
  };
  const toggleOfficialInfo = () => {
    setOfficialInfoVisible((prev) => !prev);
  };

  const StoreDataToBackendForSalaried = async (e) => {
    // setIsLoading2(true);
    console.log("Inside handle form submit");
    e.preventDefault();
    try {
      const payload = {
        mobilenumber: mainFormData.mobileNumber, // must always be included
        gender: formData.gender,
        address: formData.address,
        dob: formData.dob,
        email: formData.email,
        workEmail: formData.officeemail, // backend expects "workEmail"
        workPincode: formData.officePincode, // backend expects "workPincode"
        company_name: formData.companyName, // backend expects "company_name"
        residentialPincode: formData.residentialPincode,
        // loanAmount: formData.loanAmount,
        // maritalStatus: formData.maritalStatus,
        // spouseName: formData.spouseName,
      };

      const response2 = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/leadcreate`,
        payload,
        {
          headers: {
            token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=", // required
            "Content-Type": "application/json",
          },
        }
      );

      const formData1 = new FormData();
      formData1.append("mobileNumber", mainFormData.mobileNumber);
      formData1.append("firstName", firstName);
      formData1.append("fatherName", fatherName);
      formData1.append("lastName", lastName);
      formData1.append("profession", mainFormData.profession);
      formData1.append("paymentType", mainFormData.paymentType);
      formData1.append("monthlyIncome", mainFormData.monthlyIncome);
      formData1.append("pan", mainFormData.pan);
      formData1.append("gender", formData.gender);
      formData1.append("address", formData.address);
      formData1.append("dob", formData.dob);
      formData1.append("email", formData.email);
      formData1.append("officeemail", formData.officeemail);
      formData1.append("officePincode", formData.officePincode);
      formData1.append("companyName", formData.companyName);
      formData1.append("pincode", formData.residentialPincode);
      // formData1.append("loanAmount", formData.loanAmount);
      // formData1.append("maritalStatus", formData.maritalStatus);
      // formData1.append("spouseName", formData.spouseName);

      // setIsLoadingforLoader(true);

      // const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_REACT_UAT_BASE_URL}PlApplyNew_SalariedRysa`,
      //   formData1
      // );

      const formDataObject = {};
      formData1.forEach((value, key) => {
        formDataObject[key] = value;
      });

      // Store the plain object in localStorage
      localStorage.setItem("userFormData", JSON.stringify(formDataObject));
      // if(cpi===1){
      // apiExecutionBackend(lenderProduct);
      // }

      if (response2.data.code === 200) {
        //Here when the code is 0 we are calling lendersList backend which will give us lendersList accrding to user
        // getLendersListRysa(e);
        // window.location.href = `https://www.arysefin.com/ondc?mobilenumber=${mainFormData.mobileNumber}`;
        window.location.href = `https://www.arysefin.com/ondc?mobilenumber=${mainFormData.mobileNumber}`;
      }

      // if (response.status === 200) {
      // } else {
      //   console.error("Submission failed:", response.statusText);
      // }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const getLendersListRysa = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        mobilenumber: mainFormData.mobileNumber,
        dob: formData.dob,
        profession: mainFormData.profession,
        income: mainFormData.monthlyIncome,
        payment_type: mainFormData.paymentType,
        pincode: formData.residentialPincode,
        firstname: firstName,
        lastname: lastName,
        pan: mainFormData.pan,
        gender: formData.gender,
        addressline1: formData.address,
        email: formData.email,
        officeaddresspincode: formData.officePincode,
        maritalstatus: formData.maritalStatus,
        company: formData.companyName,
        // agent_id: formData.agentId,
        // agent: formData.agent,
        // email: formData.email,
        agentid: 3534873,
        agent: "arysefinlead",
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_UAT_BASE_URL_CH}user/reg/embeddedarysefin`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=", // ✅ your token
          },
        }
      );

      if (response.data.code === 200 && response.data.data?.redirectionlink) {
        let redirectUrl = response.data.data.redirectionlink;

        // If URL already has ?, append with &, otherwise add ?
        redirectUrl += redirectUrl.includes("?") ? "&sso=yes" : "?sso=yes";

        window.location.href = redirectUrl;
      } else {
        console.error(
          "API did not return a valid redirect link",
          response.data
        );
      }
    } catch (error) {
      console.error("Error calling user/reg/embedded API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const dobInputRef = useRef(null); // Reference for the DatePicker input element

  const handleSpouseNameChange = (e) => {
    setFormData({ ...formData, spouseName: e.target.value });
    if (formErrors.spouseName) {
      setFormErrors({ ...formErrors, spouseName: "" });
    }
  };

  // Handle gender selection
  const handleGenderChange = (e) => {
    const genderValue = e.target.value;
    setFormData({ ...formData, gender: genderValue });

    // Clear gender error
    setFormErrors({ ...formErrors, gender: "" });

    // Focus on DOB field after gender is selected
    if (dobInputRef.current) {
      // Add a small delay before focusing on the DOB input to ensure it's rendered
      setTimeout(() => {
        if (dobInputRef.current) {
          dobInputRef.current.setFocus(); // Focus on the DatePicker input element
        }
      }, 100); // Small delay of 100ms to ensure the DatePicker is rendered
    }
  };

  const apiExecutionBackend = async (productname) => {
    console.log(productname);

    // If lenderCpi is 1, redirect to lender.applicationlink

    console.log(cpi);

    if (cpi === 1) {
      setRedirectionLinkLoader(true);
      const timer = setTimeout(() => {
        // setRedirectionLinkLoader(false);
        const lenderApplicationLink = localStorage.getItem("applicationLink");
        window.location.href = lenderApplicationLink;
        // window.location.href = lenderApplicationLink;
      }, 3000);

      // setRedirectionLinkLoader(false);
      // return; // Exit the function to avoid further execution
    } else {
      console.log("Inside get Loan Backend");
      // e.preventDefault();

      setApiExecutionLoader(true);

      console.log("Inside get Loan Backend");

      try {
        const formData1 = new FormData();
        formData1.append("mobilenumber", mainFormData.mobileNumber);
        formData1.append("product", productname);

        // setlenderName(productname);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_UAT_BASE_URL}apiExecution_bl_apply_prime_master`,
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
          setLink(redirectionlink);
          // {!setIsLoading && <ApplicationPopup link={link}/>}
        } else if (response.data.code === -1) {
          console.log(-1);
          setErrorPopup(true);
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
      } catch (error) {}
    }
  };
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

  //next button
  const router = useRouter();
  const handleApplyClick = () => {
    if (validateForm()) {
      // ✅ All fields are filled, navigate
      router.push("/LoanList");
    } else {
      // ❌ Do not navigate
      console.warn("Form has errors. Fix them first.");
    }
  };
  //   const handleApplyClick = () => {
  //   router.push('/LoanList');
  // };
  const handleBackButton = () => {
    router.push("/personal-loan");
    // setActiveContainer("RysaNewPage"); // Switch the active container to 'NewPlPage'
  };
  return (
    <>
      {apiExecutionLoader && <ApplicationLoader />}
      {redirectionLinkLoader && <RedirectionLoader />}
      {applicationPopup && <ApplicationPopup link={link} />}
      {errorPopup && (
        <ErrorPopup
          lenderName={lenderProduct}
          formData={mainFormData}
          setErrorPopup={setErrorPopup}
        />
      )}
      <div className={`${roboto.className} page-container`}>
        {/* <div className="carousel-background">
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
          </div> */}
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

        <div
          className="plsecfnewfirstcard-container"
          style={{ boxSizing: "content-box" }}
        >
          <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div className="step-number">1</div>
                <div className="progress-bar-fill"></div>
              </div>
              <div className="progress-bar">
                <div className="step-number">2</div>
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* {emailFlag && ( */}
            <div style={{ marginBottom: "25px" }}>
              <div
                className={styles.inputWrapper}
                style={{ position: "relative" }}
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  className={styles.input}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (formErrors.email) {
                      setFormErrors({ ...formErrors, email: "" });
                    }
                  }}
                />
                <span
                  className={styles.icon}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    color: "#00000061",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  <FaEnvelope />
                </span>
              </div>
              {formErrors.email && (
                <span className="error">{formErrors.email}</span>
              )}
            </div>
            {/*  )} */}

            {/* {addressFlag && ( */}
            {/* <> */}
            <div className={styles.formGroup} style={{ marginBottom: "30px" }}>
              <div
                className={styles.inputWrapper}
                style={{ position: "relative" }}
              >
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter residential address"
                  value={formData.address}
                  className={styles.input}
                  onChange={(e) => {
                    setFormData({ ...formData, address: e.target.value });
                    if (formErrors.address) {
                      setFormErrors({ ...formErrors, address: "" });
                    }
                  }}
                />
                <span
                  className={styles.icon}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    color: "#00000061", // Adjusting the icon color
                    transform: "translateY(-50%)", // Center the icon vertically
                    cursor: "pointer",
                  }}
                >
                  <FaHome />
                </span>
              </div>
              {formErrors.address && (
                <span className="error">{formErrors.address}</span>
              )}
            </div>
            {/* </> */}
            {/* )} */}

            <div>
              {/* Gender Selection */}
              {/* {genderFlag && ( */}
              <div className={styles.formGroup}>
                <label style={{ fontWeight: "bold" }}>Gender</label>
                <div className={styles.radioGroup}>
                  {["Male", "Female", "Other"].map((gender) => (
                    <label
                      key={gender}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <input
                        type="radio"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleGenderChange}
                        style={{ marginRight: "8px" }}
                      />
                      {gender}
                    </label>
                  ))}
                </div>
                {formErrors.gender && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "700",
                      position: "absolute",
                    }}
                  >
                    {formErrors.gender}
                  </p>
                )}
              </div>
              {/* )} */}

              {/* DOB Date Picker */}
              {/* {dobFlag && ( */}
              <div className={styles.formGroup}>
                <label style={{ fontWeight: "bold" }}>Date of Birth</label>
                <div className="input-wrapper" style={{ position: "relative" }}>
                  <DatePicker
                    selected={formData.dob}
                    onChange={handleDateChange2}
                    dateFormat="dd/MM/yyyy"
                    className={styles.input}
                    placeholderText="DD/MM/YYYY"
                    ref={dobInputRef} // Use the ref for the actual input element
                    showYearDropdown // This enables the year selection dropdown
                    yearDropdownItemNumber={50} // This controls how many years are shown in the dropdown
                    scrollableYearDropdown // Allows you to scroll through years in the dropdown
                  />
                  <span
                    className="icon"
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      color: "#00000061",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    <FaCalendar />
                  </span>
                </div>
                {formErrors.dob && (
                  <div
                    className="error-message"
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "700",
                      position: "absolute",
                    }}
                  >
                    {formErrors.dob}
                  </div>
                )}
              </div>
              {/*  )} */}
            </div>

            <>
              <div
                className={styles.formGroup}
                style={{ position: "relative" }}
              >
                <div
                  className={styles.inputWrapper}
                  style={{ position: "relative" }}
                >
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    placeholder="Enter Company Name"
                    value={formData.companyName}
                    className={styles.input}
                    onChange={(e) => {
                      setFormData({ ...formData, companyName: e.target.value });

                      // Clear error if needed
                      if (formErrors.companyName) {
                        setFormErrors({ ...formErrors, companyName: "" });
                      }

                      // 👇 Optionally: reset suggestions if empty
                      if (e.target.value.trim().length === 0) {
                        setCompanySuggestions([]);
                        setShowSuggestions(false);
                      }
                    }}
                    onFocus={() => {
                      if (companySuggestions.length > 0)
                        setShowSuggestions(true);
                    }}
                  />

                  <span
                    className={styles.icon}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      color: "#00000061",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    <FaBuilding />
                  </span>

                  {showSuggestions && companySuggestions.length > 0 && (
                    <ul
                      ref={suggestionsRef}
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        background: "#fff",
                        border: "1px solid #ddd",
                        zIndex: 1000,
                        maxHeight: "200px",
                        overflowY: "auto",
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {companySuggestions.map((name) => (
                        <li
                          key={name}
                          onClick={() => {
                            setFormData({ ...formData, companyName: name });
                            setShowSuggestions(false); // ✅ Hide after selecting
                            setCompanySuggestions([]); // ✅ Optional: clear array too
                          }}
                          onMouseDown={(e) => e.preventDefault()} // ✅ Prevent blur
                          style={{
                            padding: "8px 12px",
                            cursor: "pointer",
                          }}
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {formErrors.companyName && (
                  <span className="error">{formErrors.companyName}</span>
                )}
              </div>

              {/* <div className={styles.formGroup}>
                <div
                  className={styles.inputWrapper}
                  style={{ position: "relative" }}
                >
                  <input
                    type="text"
                    id="loanAmount"
                    name="loanAmount"
                    placeholder="Enter Loan Amount"
                    value={formData.loanAmount}
                    className={styles.input}
                    onChange={(e) => {
                      setFormData({ ...formData, loanAmount: e.target.value });
                      if (formErrors.loanAmount) {
                        setFormErrors({ ...formErrors, loanAmount: "" });
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
                </div>
                {formErrors.loanAmount && (
                  <span loanAmount="error" className="error">
                    {formErrors.loanAmount}
                  </span>
                )}
              </div> */}

              <div className={styles.formGroup}>
                <div
                  className={styles.inputWrapper}
                  style={{ position: "relative" }}
                >
                  <input
                    type="email"
                    id="officeemail"
                    name="officeemail"
                    placeholder="Enter Work Email"
                    value={formData.officeemail}
                    className={styles.input}
                    onChange={(e) => {
                      setFormData({ ...formData, officeemail: e.target.value });
                      if (formErrors.officeemail) {
                        setFormErrors({ ...formErrors, officeemail: "" });
                      }
                    }}
                  />
                  <span
                    className={styles.icon}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      color: "#00000061",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    <FaEnvelope /> {/* Envelope (email) icon */}
                  </span>
                </div>
                {formErrors.officeemail && (
                  <span className="error">{formErrors.officeemail}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <div
                  className={styles.inputWrapper}
                  style={{ position: "relative" }}
                >
                  <input
                    type="text"
                    id="officePincode"
                    name="officePincode"
                    placeholder="Enter Work Pincode"
                    inputMode="numeric"
                    value={formData.officePincode}
                    className={styles.input}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6); // Keep only digits and limit to 6
                      setFormData({ ...formData, officePincode: value });
                      // Close keyboard when 6 digits are entered
                      if (value.length === 6) {
                        e.target.blur(); // This will close the keyboard
                      }
                      if (formErrors.officePincode) {
                        setFormErrors({ ...formErrors, officePincode: "" });
                      }
                    }}
                  />
                  <span
                    className={styles.icon}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      color: "#00000061",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    <FaMapPin /> {/* Map pin (location) icon */}
                  </span>
                </div>
                {formErrors.officePincode && (
                  <span className="error">{formErrors.officePincode}</span>
                )}
              </div>

              {/* {residentialPincodeFlag && ( */}
              <>
                <div className={styles.formGroup}>
                  <div
                    className={styles.inputWrapper}
                    style={{ position: "relative" }}
                  >
                    <input
                      type="text"
                      id="residentialPincode"
                      name="residentialPincode"
                      placeholder="Enter Home Pincode"
                      inputMode="numeric"
                      value={formData.residentialPincode}
                      className={styles.input}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6); // Keep only digits and limit to 6
                        setFormData({
                          ...formData,
                          residentialPincode: value,
                        });
                        if (formErrors.residentialPincode) {
                          setFormErrors({
                            ...formErrors,
                            residentialPincode: "",
                          });
                        }
                      }}
                    />
                    <span
                      className={styles.icon}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        color: "#00000061",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                    >
                      <FaMapPin /> {/* Map pin (location) icon */}
                    </span>
                  </div>
                  {formErrors.residentialPincode && (
                    <span className="error">
                      {formErrors.residentialPincode}
                    </span>
                  )}
                </div>
              </>
              {/*  )} */}

              {/* <div
                className={styles.formGroup}
                style={{ position: "relative" }}
              >
                <Select
                  id="maritalStatus"
                  name="maritalStatus"
                  instanceId="maritalStatus-select"
                  value={maritalStatusOptions.find(
                    (option) => option.value === formData.maritalStatus
                  )}
                  options={maritalStatusOptions}
                  onChange={handleMaritalStatusChange}
                  styles={customStyles}
                  placeholder="Select Marital Status"
                  // menuIsOpen={isMaritalStatusMenuOpen}
                  // onFocus={handleMaritalStatusFocus}
                  // onBlur={handleMaritalStatusBlur}
                  // onClick={handleMaritalStatusClick}
                  isSearchable={false}
                  menuPosition="auto"
                  components={{ Option: CustomOption }}
                />
                {formErrors.maritalStatus && (
                  <span
                    className="error"
                    style={{ position: "absolute", top: "100%", left: 0 }}
                  >
                    {formErrors.maritalStatus}
                  </span>
                )}
              </div> */}

              {/* {formData.maritalStatus === "married" && (
                <div className={styles.formGroup}>
                  <div
                    className={styles.inputWrapper}
                    style={{ position: "relative" }}
                  >
                    <input
                      type="text"
                      id="spouseName"
                      name="spouseName"
                      placeholder="Enter Spouse's Name"
                      value={formData.spouseName}
                      className={styles.input}
                      onChange={handleSpouseNameChange}
                    />
                    <span
                      className={styles.icon}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        color: "#00000061",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                    >
                      <FaUser />
                    </span>
                  </div>
                  {formErrors.spouseName && (
                    <span className="error">{formErrors.spouseName}</span>
                  )}
                </div>
              )} */}

              <button onClick={handleBackButton} className="back-button">
                <FaArrowLeft />
              </button>
            </>
            <div className={styles.stickyButton}>
              <button
                type="submit"
                // onClick={handleApplyClick}
                className={`${styles.button} ${styles.submitButton}`}
              >
                Next
              </button>
              {/* className={`w-full  ${styles.submitButton}`} */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RysaNewPage2;
