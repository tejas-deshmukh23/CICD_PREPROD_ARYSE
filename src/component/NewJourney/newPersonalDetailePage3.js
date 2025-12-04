"use client";
import React, { useState, useRef } from "react";
import styles from "./newPersonalDetailePage3.module.css";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

function NewPersonalDetailePage3({
  mainFormData = {},
  setActiveContainer,
  setFormData,
}) {
  const router = useRouter();
  const handleBoxClick = (inputRef) => {
      inputRef.current?.focus();
    };
      const companyNameRef = useRef(null); // new11
      const workEmailRef = useRef(null);
      const workpinRef = useRef(null);
      const fathernameRef = useRef(null);
      const maritalRef = useRef(null);
      const spousenameRef = useRef(null);
  // State for validation errors only (keep local)
  const [errors, setErrors] = useState({
    companyName: false,
    workEmail: false,
    workPINCode: false,
    fatherName: false,
    maritalStatus: false,
    spouseName: false,
  });

  // Autocomplete state
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSheetMaritalStatus, setShowSheetMaritalStatus] = useState(false);

  // Handle input changes → update parent formData
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }

    // Fetch company suggestions only for companyName field
    if (name === "companyName" && value.trim().length > 1) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}company/getCompanyNames`,
          {
            params: { query: value },
          }
        );
        setSuggestions(response.data || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching company names:", error);
        setSuggestions([]);
      }
    } else if (name === "companyName") {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle marital status selection
  const handleSelectMaritalStatus = (status) => {
    setFormData((prev) => ({ 
      ...prev, 
      maritalStatus: status 
    }));
   setShowSheetMaritalStatus(false);

    // Clear errors if any exist
    if (errors.maritalStatus) {
      setErrors((prev) => ({ ...prev, maritalStatus: false }));
    }

    // If not married, clear spouse name
    if (status !== "Married") {
      setFormData((prev) => ({ ...prev, spouseName: "" }));
    }
  };

  // When user selects a suggestion
  const handleSuggestionClick = (suggestion) => {
    setFormData((prev) => ({
      ...prev,
      companyName: suggestion,
    }));
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Validate form
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      companyName: !mainFormData.companyName?.trim(),
      workEmail:
        !mainFormData.workEmail?.trim() ||
        !validateEmail(mainFormData.workEmail),
      workPINCode:
        !mainFormData.workPINCode?.trim() ||
        mainFormData.workPINCode.length !== 6,
      fatherName: !mainFormData.fatherName?.trim(),
      maritalStatus: !mainFormData.maritalStatus?.trim(),
      spouseName: mainFormData.maritalStatus === "Married" && !mainFormData.spouseName?.trim(),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const mapMaritalStatus = (status) => {
    if (!status) return null;
    switch (status.trim().toLowerCase()) {
      case "married":
        return 1;
      case "unmarried":
        return 2;
      case "divorced":
        return 3;
      case "widowed":
        return 4;
      default:
        return null;
    }
  };

  const handleNext = async () => {
    if (validateForm()) {
      try {
        const payload = {
          mobileNumber: mainFormData.mobileNumber, // page 1
          companyName: mainFormData.companyName,
          workEmail: mainFormData.workEmail,
          workPincode: mainFormData.workPINCode,
          fatherName: mainFormData.fatherName,
          maritalStatus: mapMaritalStatus(mainFormData.maritalStatus),
          spouseName: mainFormData.spouseName || "",
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_ARYSEFIN}api/page4`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=",
            },
          }
        );

        router.push(`/ondc?mobilenumber=${mainFormData.mobileNumber}`);
      } catch (error) {
        console.error("Error in Page4 API:", error);
      }
    }
  };

  const handleBack = () => {
    setActiveContainer("NewPersonalDetailePage2");
  };

  return (
    <div className={styles.container}>
      <div className={styles.parentContainer}>
        {/* Header */}
        <div className={styles.mainHeaderPart}>
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
        </div>

        {/* Form */}
        <div className={styles.mainForm}>
          <div className={styles.header}>
            <div className={styles.progressBarContainer}>
              {/* first no:1 progress bar */}
              <div className={styles.progressBar}>
                <div className={styles.outerCrcileLine}>
                  {" "}
                  <div className={styles.stepNumber}>1</div>{" "}
                </div>
                <div
                  className={styles.progressBarFill}
                  // style={{ width: `${progress}%` }}
                ></div>
                <div className={styles.progressBarHeading}>
                  Personal Details
                </div>
              </div>
              {/* first no:2 progress bar */}
              <div className={styles.progressBar}>
                <div className={styles.outerCrcileLine2}>
                  <div className={styles.stepNumber2}>2</div>
                </div>
                <div
                  className={styles.progressBarFill2}
                  // style={{ width: `${progress}%` }}
                ></div>
                <div className={styles.progressBarHeading2}>
                  Personal Details
                </div>
              </div>
              {/* first no:3 progress bar */}
              <div className={styles.progressBarlast}>
                <div className={styles.outerCrcileLine3}>
                  <div className={styles.stepNumberLast}>3</div>
                </div>
                <div className={styles.progressBarHeading3}>
                  Work <br />
                  Details
                </div>
              </div>
            </div>
            {/* <div className={styles.headering}><h3>personal Details</h3></div> */}
          </div>

          <div className={styles.form}>
            <div className={styles.formheading}>Work Details</div>

            {/* Company Name */}
            <div
              className={`${styles.fields} ${
                errors.companyName ? styles.errorField : ""
              }`}
              onClick={() => handleBoxClick(companyNameRef)}
            >
              <span className={styles.fieldName1}>Company name</span>
              <input
                type="text"
                name="companyName"
                value={mainFormData.companyName || ""}
                onFocus={() =>
                  mainFormData.companyName && setShowSuggestions(true)
                }
                onChange={handleInputChange}
                className={styles.inputfieldSuggestion}
                ref={companyNameRef} 
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul className={styles.suggestionBox}>
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      className={styles.suggestionItem}
                      onClick={() => handleSuggestionClick(s)}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Work Email */}
            <div
              className={`${styles.fields} ${
                errors.workEmail ? styles.errorField : ""
              }`}
              onClick={() => handleBoxClick(workEmailRef)}
            >
              <span className={styles.fieldName1}>Work email</span>
              <input
                type="email"
                name="workEmail"
                value={mainFormData.workEmail || ""}
                onChange={handleInputChange}
                className={styles.inputfield}
                ref={workEmailRef} 
              />
            </div>

            {/* Work PIN Code */}
            <div
              className={`${styles.fields} ${
                errors.workPINCode ? styles.errorField : ""
              }`}
              onClick={() => handleBoxClick(workpinRef)}
            >
              <span className={styles.fieldName1}>Work pincode</span>
              <input
                type="number"
                name="workPINCode"
                maxLength={6}
                value={mainFormData.workPINCode || ""}
                onChange={(e) => {
                  if (e.target.value.length <= 6) {
                    handleInputChange(e);
                  }
                }}
                className={styles.inputfield}
                ref={workpinRef} 
              />
            </div>

            {/* Father Name */}
            <div
              className={`${styles.fields} ${
                errors.fatherName ? styles.errorField : ""
              }`}
              onClick={() => handleBoxClick(fathernameRef)}
            >
              <span className={styles.fieldName}>Father name</span>
              <input
                type="text"
                name="fatherName"
                value={mainFormData.fatherName || ""}
                onChange={handleInputChange}
                className={styles.inputfield}
                ref={fathernameRef} 
              />
            </div>

            {/* Marital Status */}
            <div
              className={`${styles.fields} ${
                errors.maritalStatus ? styles.errorField : ""
              }`}
              onClick={() => setShowSheetMaritalStatus(!showSheetMaritalStatus)}
            >
              <span className={styles.fieldName}>Marital status</span>
              <div className={styles.inputWrapper}
              onClick={() => setShowSheetMaritalStatus(!showSheetMaritalStatus)}> {/*add*/}
                <input
                  type="text"
                  name="maritalStatus"
                  value={mainFormData.maritalStatus || ""}
                  className={styles.inputfield1}
                  readOnly
                  // onClick={() => setShowSheetMaritalStatus(true)}
                />
                <div
                  className={styles.iconContainer}
                  // onClick={() => setShowSheetMaritalStatus(true)}
                  onClick={() => setShowSheetMaritalStatus(!showSheetMaritalStatus)} // {/*add*/}
                >
                  <FaChevronDown className={styles.iconInput} />
                </div>
              </div>
              {showSheetMaritalStatus && (
                <>
                  {/* Backdrop - बाहेर click केले तर dropdown बंद */}
                  <div
                    className={styles.dropdownBackdrop}
                    onClick={() => setShowSheetMaritalStatus(false)}
                  ></div>

                  <div className={styles.dropdownList}>
                    <div
                      className={`${styles.dropdownOption} ${
                        mainFormData.maritalStatus === "Married"
                          ? styles.dropdownOptionSelected
                          : ""
                      }`}
                      onClick={() => handleSelectMaritalStatus("Married")}
                    >
                      Married
                    </div>
                    <div
                      className={`${styles.dropdownOption} ${
                        mainFormData.maritalStatus === "Unmarried"
                          ? styles.dropdownOptionSelected
                          : ""
                      }`}
                      onClick={() => handleSelectMaritalStatus("Unmarried")}
                    >
                      Unmarried
                    </div>
                    <div
                      className={`${styles.dropdownOption} ${
                        mainFormData.maritalStatus === "Divorced"
                          ? styles.dropdownOptionSelected
                          : ""
                      }`}
                      onClick={() => handleSelectMaritalStatus("Divorced")}
                    >
                      Divorced
                    </div>
                    <div
                      className={`${styles.dropdownOption} ${
                        mainFormData.maritalStatus === "Widowed"
                          ? styles.dropdownOptionSelected
                          : ""
                      }`}
                      onClick={() => handleSelectMaritalStatus("Widowed")}
                    >
                      Widowed
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* spouseName - Only show if Married */}
            {mainFormData.maritalStatus === "Married" && (
              <div
                className={`${styles.fields} ${
                  errors.spouseName ? styles.errorField : ""
                }`}
                onClick={() => handleBoxClick(spousenameRef)}
              >
                <span className={styles.fieldName}>Spouse name</span>
                <input
                  type="text"
                  name="spouseName"
                  value={mainFormData.spouseName || ""}
                  onChange={handleInputChange}
                  className={styles.inputfield}
                  ref={spousenameRef} 
                />
              </div>
            )}

            {/* Buttons */}
            {/* button part here */}
            <div className={styles.btn}>
              {/* emptyspace */}
              <div className={styles.emptyspace}></div>
              {/* next button  */}
              <div className={styles.nextbtn} onClick={handleNext}>
                <span> Next </span>
              </div>
              {/* back button  */}
              <div className={styles.backbtn} onClick={handleBack}>
                <span> Back </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPersonalDetailePage3;