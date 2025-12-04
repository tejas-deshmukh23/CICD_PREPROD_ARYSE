// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import dynamic from "next/dynamic";
// const Select = dynamic(() => import("react-select"), { ssr: false });
// import { useSearchParams } from "next/navigation";
// import {
//   FaUser,
//   FaBuilding,
//   FaCreditCard,
//   FaUniversity,
//   FaLandmark,
//   FaUpload,
// } from "react-icons/fa";
// import "./BankDetailsNew.css";
// import axios from "axios";
// import { Outfit } from "next/font/google";
// import Image from "next/image";
// import styles from "./BankDetailsNew.module.css";
// import CallbackListener from "../CallbackListener";
// import SelfieWaiting from "./WaitingPageforBankdetails";
// import { useRouter } from "next/navigation";
// import "react-datepicker/dist/react-datepicker.css";
// import hdb from "../Yubi/newplimages/HDB.png";

// const outfit = Outfit({
//   subsets: ["latin"],
//   weight: ["400", "700"],
//   display: "swap",
// });

// const BankDetails = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const clientLoanId = searchParams.get("clientLoanId");
//   const loanAmount = searchParams.get("loanAmount");
//   const tenure = searchParams.get("tenure");
//   const interestRate = searchParams.get("interestRate");

//   console.log("clientloanidinbankpage as:", clientLoanId);
//   console.log("tenure=", tenure);
//   console.log("interest rate=", interestRate);

//   const [formData, setFormData] = useState({
//     accountname: "",
//     IFSC: "",
//     accountNumber: "",
//     salarySlip: null,
//     bankName: "",
//     branchName: "",
//     salarySlipLink: "",
//   });

//   const [formErrors, setFormErrors] = useState({});
//   const [activeContainer, setActiveContainer] = useState("BankDetails");
//   const accountnameRef = useRef(null);
//   const bankNameRef = useRef(null);
//   const branchNameRef = useRef(null);
//   const IFSCRef = useRef(null);
//   const accountNumberRef = useRef(null);
//   const fileInputRef = useRef(null);

//   // Function to scroll to first error field
//   const scrollToFirstError = (errors) => {
//     const errorFields = Object.keys(errors);
//     if (errorFields.length === 0) return;

//     const firstErrorField = errorFields[0];
//     let targetRef = null;

//     // Map error field names to their corresponding refs
//     switch (firstErrorField) {
//       case "accountname":
//         targetRef = accountnameRef;
//         break;
//       case "bankName":
//         targetRef = bankNameRef;
//         break;
//       case "branchName":
//         targetRef = branchNameRef;
//         break;
//       case "IFSC":
//         targetRef = IFSCRef;
//         break;
//       case "accountNumber":
//         targetRef = accountNumberRef;
//         break;
//       case "salarySlipLink":
//         // For file upload, scroll to the file input
//         const fileInput = document.getElementById("salarySlipUpload");
//         if (fileInput) {
//           // Find the scrollable container
//           const cardForm = document.querySelector(".cardForm-block");
//           if (cardForm) {
//             const fieldPosition = fileInput.offsetTop;
//             cardForm.scrollTo({
//               top: fieldPosition - 100,
//               behavior: "smooth",
//             });
//           }
//         }
//         return;
//       default:
//         break;
//     }

//     // Scroll to the target field within the card container
//     if (targetRef && targetRef.current) {
//       // Find the scrollable container (.cardForm-block)
//       const cardForm = document.querySelector(".cardForm-block");
//       if (cardForm) {
//         const fieldPosition = targetRef.current.offsetTop;
//         cardForm.scrollTo({
//           top: fieldPosition - 100, // 100px offset from top
//           behavior: "smooth",
//         });
//       }

//       // Optional: Focus on the field after scrolling
//       setTimeout(() => {
//         if (targetRef.current) {
//           targetRef.current.focus();
//         }
//       }, 500);
//     }
//   };

//   const [bankOptions, setBankOptions] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}api/banks`)
//       .then((res) => {
//         setBankOptions(res.data.map((name) => ({ label: name, value: name })));
//       })
//       .catch((err) => {
//         console.error("Failed to fetch bank names:", err);
//       });
//   }, []);

//   const handleBankSelect = (selected) => {
//     setFormData({ ...formData, bankName: selected.value });
//     setFormErrors((prevErrors) => ({ ...prevErrors, bankName: "" }));
//   };

//   const CustomOption = ({
//     data,
//     innerRef,
//     innerProps,
//     selectOption,
//     isSelected,
//   }) => (
//     <div
//       ref={innerRef}
//       {...innerProps}
//       style={{
//         padding: "10px",
//         position: "relative",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <span>{data.label}</span>
//         <input
//           type="radio"
//           name={data.group}
//           value={data.value}
//           checked={isSelected}
//           onChange={() => selectOption(data)}
//         />
//       </div>
//       <hr
//         style={{
//           margin: "5px 0",
//           border: "0",
//           borderTop: "1px solid #ddd",
//         }}
//       />
//     </div>
//   );

//   // const customStyles = {
//   //   input: (provided) => ({
//   //     ...provided,
//   //     padding: "8px",
//   //     // width: "100%",
//   //     // minHeight: "70px",
//   //     border: "none",
//   //     cursor: "pointer",
//   //     borderRadius: "50px",
//   //     fontSize: "16px",
//   //   }),
//   //   menu: (provided) => ({
//   //     ...provided,
//   //     position: "fixed",
//   //     top: "57%",
//   //     left: "50%",
//   //     transform: "translate(-50%, -50%)",
//   //     // width: "80%",
//   //     // maxWidth: "400px",
//   //     zIndex: 9999,
//   //     boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
//   //     borderRadius: "10px",
//   //     fontSize: "16px",
//   //   }),
//   //   control: (provided) => ({
//   //     ...provided,
//   //     // width: "100%",
//   //     borderRadius: "10px",
//   //     minHeight: "50px",
//   //   }),
//   //   placeholder: (provided) => ({
//   //     ...provided,
//   //     padding: "12px",
//   //     fontSize: "16px",
//   //   }),
//   //   dropdownIndicator: (provided) => ({
//   //     ...provided,
//   //     padding: "0",
//   //     fontSize: "16px",
//   //   }),
//   //   indicatorSeparator: () => ({
//   //     display: "none",
//   //   }),
//   // };
//   const customStyles = {
//     input: (provided) => ({
//       ...provided,
//       padding: "8px", // Padding for input text
//       // borderRadius: '10px',  // Border radius for input
//       // width: "100%", // Full width
//       minHeight: "70px",
//       border: "none", // Remove border for input itself
//       cursor: "pointer",
//       borderRadius: "50px",
//       fontSize: "16px",
//     }),
//     menu: (provided) => ({
//       ...provided,
//       position: "fixed", // Make the dropdown fixed relative to the viewport
//       top: "50%", // Vertically center the dropdown on the screen
//       left: "50%", // Horizontally center the dropdown on the screen
//       transform: "translate(-50%, -50%)", // Adjust the dropdown to be exactly centered
//       // width: "80%", // Set the width of the dropdown (you can adjust it)
//       // maxWidth: "400px", // Set a max width for the dropdown
//       zIndex: 9999, // Ensure the dropdown appears on top of other content
//       boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // Optional: Add shadow for a popup effect
//       borderRadius: "10px",
//     }),
//     control: (provided) => ({
//       ...provided,
//       // width: "100%", // Full width of the control
//       borderRadius: "10px",
//       minHeight: "50px",
//     }),
//     placeholder: (provided) => ({
//       ...provided,
//       padding: "12px", // Padding for placeholder text
//       fontSize: "16px",
//     }),
//     dropdownIndicator: (provided) => ({
//       ...provided,
//       padding: "0", // Optional: Adjust padding of the dropdown indicator
//       fontSize: "16px",
//     }),
//     indicatorSeparator: () => ({
//       display: "none", // Hide the indicator separator (optional)
//     }),
//   };

//   const handleSalarySlipUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setFormErrors((prevErrors) => ({ ...prevErrors, salarySlipLink: "" }));

//     setFormData((prev) => ({
//       ...prev,
//       salarySlip: file,
//     }));

//     try {
//       const presignRes = await axios.get(
//         `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}generatePresignedUrl`,
//         { params: { fileName: file.name } }
//       );

//       console.log("Presign response:", presignRes.data);

//       const { presignedUrl, publicUrl } = presignRes.data.obj;

//       await axios.put(presignedUrl, file, {
//         headers: { "Content-Type": file.type },
//       });

//       setFormData((prev) => ({
//         ...prev,
//         salarySlip: file,
//         salarySlipLink: publicUrl,
//       }));

//       console.log("Payslip uploaded to:", publicUrl);
//     } catch (err) {
//       console.error("Payslip upload failed:", err);
//     }
//   };

//   const handleFileClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleaccountnameChange = (e) => {
//     const value = e.target.value;
//     setFormData({ ...formData, accountname: value });
//     setFormErrors((prevErrors) => ({ ...prevErrors, accountname: "" }));
//   };
//   const handlebankNameChange = (e) => {
//     const value = e.target.value;
//     setFormData({ ...formData, bankName: value });
//     setFormErrors((prevErrors) => ({ ...prevErrors, bankName: "" }));
//   };
//   const handlebranchNameChange = (e) => {
//     const value = e.target.value;
//     setFormData({ ...formData, branchName: value });
//     setFormErrors((prevErrors) => ({ ...prevErrors, branchName: "" }));
//   };

//   const handleIFSCChange = (e) => {
//     const value = e.target.value.toUpperCase();
//     setFormData({ ...formData, IFSC: value });
//     setFormErrors((prevErrors) => ({ ...prevErrors, IFSC: "" }));

//     if (value && value.length === 11) {
//       if (accountNumberRef.current) {
//         accountNumberRef.current.focus();
//       }
//     }
//   };

//   const handleaccountNumberChange = (e) => {
//     const value = e.target.value;
//     setFormData({ ...formData, accountNumber: value });
//     setFormErrors((prevErrors) => ({ ...prevErrors, accountNumber: "" }));
//   };

//   const validateForm = () => {
//     const errors = {};
//     let isValid = true;
//     const data = new FormData();

//     if (!formData.accountname) {
//       errors.accountname = "Account holder name is required";
//       isValid = false;
//     } else if (formData.accountname.trim().length < 2) {
//       errors.accountname = "Account holder name must be at least 2 characters";
//       isValid = false;
//     }
//     if (!formData.bankName) {
//       errors.bankName = "Bank name is required";
//       isValid = false;
//     } else if (formData.bankName.trim().length < 2) {
//       errors.bankName = "Bank name must be at least 2 characters";
//       isValid = false;
//     }

//     if (!formData.branchName) {
//       errors.branchName = "Branch name is required";
//       isValid = false;
//     } else if (formData.branchName.trim().length < 2) {
//       errors.branchName = "Branch name must be at least 2 characters";
//       isValid = false;
//     }

//     if (!formData.salarySlipLink) {
//       errors.salarySlipLink = "Salary slip must be uploaded";
//       isValid = false;
//     }

//     if (!formData.IFSC) {
//       errors.IFSC = "IFSC code is required";
//       isValid = false;
//     } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.IFSC)) {
//       errors.IFSC = "Please enter a valid IFSC code";
//       isValid = false;
//     }

//     if (!formData.accountNumber) {
//       errors.accountNumber = "Account number is required";
//       isValid = false;
//     } else if (!/^\d{9,18}$/.test(formData.accountNumber)) {
//       errors.accountNumber =
//         "Please enter a valid account number (9-18 digits)";
//       isValid = false;
//     }
//     if (formData.salarySlip) {
//       data.append("salarySlip", formData.salarySlip);
//     }

//     setFormErrors(errors);

//     if (!isValid) {
//       setTimeout(() => {
//         scrollToFirstError(errors);
//       }, 100); // Small delay to ensure error messages are rendered
//     }
//     return isValid;
//   };

//   // const handleFinalSubmit = (e) => {
//   //   e.preventDefault();
//   //   if (validateForm()) {
//   //     setActiveContainer("SelfieWaiting"); // ✅ This switches to waiting page

//   //     setTimeout(() => {
//   //       router.push(`/yubi/Referencedetailspage`);
//   //     }, 1500);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log("Form submitted successfully", formData);
//       console.log("client load for bankdetailspage is:", clientLoanId);

//       try {
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}submitBankDetails`,
//           {
//             clientLoanId: clientLoanId,
//             bankName: formData.bankName,
//             branchName: formData.branchName,
//             accountName: formData.accountname,
//             ifscCode: formData.IFSC,
//             accountNumber: formData.accountNumber,
//           }
//         );

//         if (response.data.code === -1) {
//           window.location.href = `/yubi/RejectionPage`;
//           return;
//         }

//         if (response.data.code === 0) {
//           console.log("Disbursement API Response:", response.data.obj);
//           // ✅ Redirect or show success
//           // setActiveContainer("LoanApprovalPage");
//           setActiveContainer("SelfieWaiting");
//         } else {
//           console.error("Error:", response.data.msg);
//         }
//       } catch (error) {
//         console.error("API Error:", error);
//       }
//     }
//   };

//   return (
//     <>
//       <CallbackListener
//         clientLoanId={clientLoanId}
//         onDisbursementSuccess={() => {
//           console.log("✅ Disbursement success webhook received");
//           if (clientLoanId) {
//             router.push(
//               `/yubi/Referencedetailspage` +
//                 `?client_loan_id=${clientLoanId}` +
//                 `&loanAmount=${loanAmount}` +
//                 `&tenure=${tenure}` +
//                 `&interestRate=${interestRate}` +
//                 `&salarySlipLink=${encodeURIComponent(formData.salarySlipLink)}`
//             );
//           } else {
//             console.error("No clientLoanId found for LoanApproval redirect!");
//           }
//         }}
//       />
//       {activeContainer === "SelfieWaiting" && <SelfieWaiting />}

//       {activeContainer === "BankDetails" && (
//         // <div className={`${roboto.className} container-block`}>
//         //   <div className="card-block">
//         //     <div className="header-block">
//         //       <div className="LogoPart-block">
//         //         <Image
//         //           src={hdb}
//         //           alt="Hdb tag"
//         //           style={{
//         //             alignContent: "center",
//         //             width: "auto",
//         //             height: "auto",
//         //           }}
//         //         />
//         //       </div>
//         //     </div>
//         //    <div className="cardForm-block">
//         // <div className="content-block">
//         //     <form onSubmit={handleSubmit}>
//         //       <p className="para">Please provide your bank details</p>
//         //       <div className="fill-form">
//         //         <div className="fill-form" style={{ position: "relative" }}>
//         //           <input
//         //             ref={accountnameRef}
//         //             type="text"
//         //             id="accountname"
//         //             name="accountname"
//         //             placeholder="Account Holder Name"
//         //             value={formData.accountname}
//         //             onChange={handleaccountnameChange}
//         //             className="input-field"
//         //           />
//         //           <span
//         //             className="enter-icon"
//         //             style={{
//         //               position: "absolute",
//         //               right: "15px",
//         //               top: "50%",
//         //               transform: "translateY(-50%)",
//         //               cursor: "pointer",
//         //               color: "#00000061",
//         //             }}
//         //           >
//         //             <FaUser />
//         //           </span>
//         //         </div>
//         //         {formErrors.accountname && (
//         //           <div className="Message">{formErrors.accountname}</div>
//         //         )}
//         //       </div>
//         //       {/*Bank Name Field */}
//         //       <div className="fill-form">
//         //         <div className="fill-form" style={{ position: "relative" }}>
//         //           <input
//         //             ref={bankNameRef}
//         //             type="text"
//         //             id="bankName"
//         //             name="bankName"
//         //             placeholder="Bank Name"
//         //             value={formData.bankName}
//         //             onChange={handlebankNameChange}
//         //             className="input-field"
//         //           />
//         //           <span
//         //             className="enter-icon"
//         //             style={{
//         //               position: "absolute",
//         //               right: "15px",
//         //               top: "50%",
//         //               transform: "translateY(-50%)",
//         //               cursor: "pointer",
//         //               color: "#00000061",
//         //             }}
//         //           >
//         //             <FaUniversity />
//         //           </span>
//         //         </div>
//         //         {formErrors.bankName && (
//         //           <div className="Message">{formErrors.bankName}</div>
//         //         )}
//         //       </div>
//         //       {/*Branch Name Field */}
//         //       <div className="fill-form">
//         //         <div className="fill-form" style={{ position: "relative" }}>
//         //           <input
//         //             ref={branchNameRef}
//         //             type="text"
//         //             id="branchName"
//         //             name="branchName"
//         //             placeholder="Branch Name"
//         //             value={formData.branchName}
//         //             onChange={handlebranchNameChange}
//         //             className="input-field"
//         //           />
//         //           <span
//         //             className="enter-icon"
//         //             style={{
//         //               position: "absolute",
//         //               right: "15px",
//         //               top: "50%",
//         //               transform: "translateY(-50%)",
//         //               cursor: "pointer",
//         //               color: "#00000061",
//         //             }}
//         //           >
//         //             <FaLandmark />
//         //           </span>
//         //         </div>
//         //         {formErrors.branchName && (
//         //           <div className="Message">{formErrors.branchName}</div>
//         //         )}
//         //       </div>

//         //       {/* IFSC Field */}
//         //       <div className="fill-form">
//         //         <div
//         //           style={{ position: "relative" }}
//         //         >
//         //           <input
//         //             ref={IFSCRef}
//         //             type="text"
//         //             id="IFSC"
//         //             name="IFSC"
//         //             placeholder="Enter IFSC"
//         //             value={formData.IFSC}
//         //             onChange={handleIFSCChange}
//         //             autoCapitalize="words"
//         //             className="input-field"
//         //           />

//         //           <span
//         //             className="enter-icon"
//         //             style={{
//         //               position: "absolute",
//         //               right: "10px",
//         //               top: "50%",
//         //               transform: "translateY(-50%)",
//         //               color: "#00000061",
//         //             }}
//         //           >
//         //             <FaBuilding />
//         //           </span>
//         //         </div>
//         //         {formErrors.IFSC && (
//         //           <span className="error">{formErrors.IFSC}</span>
//         //         )}
//         //       </div>

//         //       {/* Account number Field */}
//         //       <div className="fill-form">
//         //         <div
//         //           style={{ position: "relative" }}
//         //         >
//         //           <input
//         //             ref={accountNumberRef}
//         //             type="number"
//         //             id="accountNumber"
//         //             name="accountNumber"
//         //             placeholder="Enter Account Number"
//         //             value={formData.accountNumber}
//         //             onChange={handleaccountNumberChange}
//         //             className="input-field"
//         //           />
//         //           <span
//         //             className="enter-icon"
//         //             style={{
//         //               position: "absolute",
//         //               right: "10px",
//         //               top: "50%",
//         //               transform: "translateY(-50%)",
//         //               color: "#00000061",
//         //             }}
//         //           >
//         //             <FaCreditCard />
//         //           </span>
//         //         </div>
//         //         {formErrors.accountNumber && (
//         //           <span className="error">{formErrors.accountNumber}</span>
//         //         )}
//         //       </div>

//         //       {/* Custom Salary Slip Upload */}
//         //       <div className="fill-form">
//         //         <div
//         //           className="input-field"
//         //           onClick={handleFileClick}
//         //           style={{
//         //             position: "relative",
//         //             cursor: "pointer",
//         //             display: "flex",
//         //             alignItems: "center",
//         //             backgroundColor: formData.salarySlip ? "#fff" : "#fff",
//         //           }}
//         //         >
//         //           <div style={{
//         //             flex: 1,
//         //             color: formData.salarySlip ? "#000000" : "#777777",
//         //             fontWeight: formData.salarySlip ? "500" : "normal",
//         //             overflow: "hidden",
//         //             textOverflow: "ellipsis",
//         //             whiteSpace: "nowrap",
//         //             paddingRight: "40px",
//         //           }}>
//         //             {formData.salarySlip ? // not added
//         //               ` ${formData.salarySlip.name}` :
//         //               "Upload Salary Slip"
//         //             }
//         //           </div>
//         //           <div
//         //             style={{
//         //               position: "absolute",
//         //               right: "15px",
//         //               top: "50%",
//         //               transform: "translateY(-50%)",
//         //               color: formData.salarySlip ? "#00000061" : "#00000061",
//         //             }}
//         //           >
//         //             <FaUpload />
//         //           </div>
//         //           <input
//         //             ref={fileInputRef}
//         //             type="file"
//         //             accept=".pdf, .jpg, .jpeg, .png"
//         //             onChange={handleSalarySlipUpload}
//         //             style={{ display: "none" }}
//         //             id="salarySlipUpload"
//         //           />
//         //         </div>
//         //         {/* {formData.salarySlip && (
//         //           <div style={{
//         //             color: "#4CAF50",
//         //             fontSize: "12px",
//         //             marginLeft: "2%",
//         //             marginTop: "5px"
//         //           }}>
//         //             File selected successfully
//         //           </div>
//         //         )} */}
//         //         {formErrors.salarySlipLink && (
//         //           <div className="File-Error">{formErrors.salarySlipLink}</div> // not added
//         //         )}
//         //       </div>

//         //       {/* Submit Button */}
//         //         <div className="short-button">
//         //         <button
//         //           type="submit"
//         //           className="short-submit"
//         //         >
//         //           Next
//         //         </button>
//         //       </div>

//         //     </form>
//         //     </div>
//         //   </div>
//         //   </div>
//         // </div>

//         //
//         <div className={`${styles.container} ${outfit.className}`}>
//           {/*delete*/}
//           <div className={styles.mainHeaderPart}>
//             <div className={styles.topchildren}>
//               <div className={styles.logoContainer}>
//                 <Image
//                   src={hdb}
//                   alt="Hdb tag"
//                   width={250}
//                   height={250}
//                   className={styles.logo2}
//                   // alt="Aryse_Fin logo"
//                   priority
//                 />
//               </div>
//             </div>
//           </div>

//           <div className={styles.card}>
//             <form onSubmit={handleSubmit}>
//               <h3 className={styles.heading}>
//                 Please provide your bank details
//               </h3>

//               <div
//                 className={`${styles.fields} ${
//                   formErrors.accountname ? styles.errorField : ""
//                 }`}
//               >
//                 <span className={styles.fieldName1}>Account holder name</span>
//                 <input
//                   ref={accountnameRef}
//                   type="text"
//                   id="accountname"
//                   name="accountname"
//                   // placeholder="Account Holder Name"
//                   value={formData.accountname}
//                   onChange={handleaccountnameChange}
//                   className={styles.inputfield}
//                 />
//               </div>
//               {formErrors.accountname && (
//                 <span className={styles.errorText}>
//                   {formErrors.accountname}
//                 </span>
//               )}

//               <div
//                 className={`${styles.fields} ${
//                   formErrors.accountname ? styles.errorField : ""
//                 }`}
//               >
//                 <span className={styles.fieldName1}>Bank name</span>
//                 <input
//                   ref={bankNameRef}
//                   type="text"
//                   id="bankName"
//                   name="bankName"
//                   value={formData.bankName}
//                   onChange={handlebankNameChange}
//                   className={styles.inputfield}
//                 />
//               </div>
//               {formErrors.accountname && (
//                 <span className={styles.errorText}>
//                   {formErrors.accountname}
//                 </span>
//               )}

//               <div
//                 className={`${styles.fields} ${
//                   formErrors.accountname ? styles.errorField : ""
//                 }`}
//               >
//                 <span className={styles.fieldName1}>Branch name</span>
//                 <input
//                   ref={branchNameRef}
//                   type="text"
//                   id="branchName"
//                   name="branchName"
//                   value={formData.branchName}
//                   onChange={handlebranchNameChange}
//                   className={styles.inputfield}
//                 />
//               </div>
//               {formErrors.accountname && (
//                 <span className={styles.errorText}>
//                   {formErrors.accountname}
//                 </span>
//               )}

//               <div
//                 className={`${styles.fields} ${
//                   formErrors.IFSC ? styles.errorField : ""
//                 }`}
//               >
//                 <span className={styles.fieldName1}>Enter IFSC</span>
//                 <input
//                   ref={IFSCRef}
//                   type="text"
//                   id="IFSC"
//                   name="IFSC"
//                   value={formData.IFSC}
//                   onChange={handleIFSCChange}
//                   autoCapitalize="words"
//                   className={styles.inputfield}
//                 />
//               </div>
//               {formErrors.IFSC && (
//                 <span className={styles.errorText}>{formErrors.IFSC}</span>
//               )}

//               <div
//                 className={`${styles.fields} ${
//                   formErrors.accountNumber ? styles.errorField : ""
//                 }`}
//               >
//                 <span className={styles.fieldName1}>Enter account number</span>
//                 <input
//                   ref={accountNumberRef}
//                   type="number"
//                   id="accountNumber"
//                   name="accountNumber"
//                   value={formData.accountNumber}
//                   onChange={handleaccountNumberChange}
//                   className={styles.inputfield}
//                 />
//               </div>
//               {formErrors.accountNumber && (
//                 <span className={styles.errorText}>
//                   {formErrors.accountNumber}
//                 </span>
//               )}
//               <div
//                 className={`${styles.fields1} ${
//                   formErrors.accountNumber ? styles.errorField : ""
//                 }`}
//               >
//                 <span className={styles.fieldName1}>Upload salary slip</span>
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept=".pdf, .jpg, .jpeg, .png"
//                   onChange={handleSalarySlipUpload}
//                   style={{ display: "none" }}
//                   id="salarySlipUpload"
//                   className={styles.inputfield1}
//                 />
//                 <div className={styles.slipIcons}>
//                   <div className={styles.slipOpenIcon}>
//                     <svg
//                       width="20"
//                       height="20"
//                       viewBox="0 0 200 200"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M100 20 L30 90 H70 V160 H130 V90 H170 Z"
//                         fill="#7A7A7D"
//                       />

//                       <path
//                         d="M100 45 L75 90 H90 V145 H110 V90 H125 Z"
//                         fill="#FFFFFF"
//                       />

//                       <rect
//                         x="30"
//                         y="165"
//                         width="140"
//                         height="20"
//                         fill="#7A7A7D"
//                       />
//                     </svg>
//                   </div>
//                   <div className={styles.slipCloseIcon}>
//                     <svg
//                       width="18"
//                       height="18"
//                       viewBox="0 0 50 50"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <circle
//                         cx="25"
//                         cy="25"
//                         r="23"
//                         stroke="red"
//                         strokeWidth="4"
//                         fill="white"
//                       />
//                       <line
//                         x1="16"
//                         y1="16"
//                         x2="34"
//                         y2="34"
//                         stroke="red"
//                         strokeWidth="4"
//                         strokeLinecap="round"
//                       />
//                       <line
//                         x1="34"
//                         y1="16"
//                         x2="16"
//                         y2="34"
//                         stroke="red"
//                         strokeWidth="4"
//                         strokeLinecap="round"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//               {formErrors.accountNumber && (
//                 <span className={styles.errorText}>
//                   {formErrors.accountNumber}
//                 </span>
//               )}
//               {/* Submit Button */}
//               <div className={styles.btnContainer}>
//                 <button
//                   type="submit"
//                   // type="button"
//                   className={styles.nextbtn}
//                   // onClick={() => handleNextClick()}
//                 >
//                   <span>Next</span>
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default BankDetails;

"use client";
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), { ssr: false });
import { useSearchParams } from "next/navigation";
import {
  FaUser,
  FaBuilding,
  FaCreditCard,
  FaUniversity,
  FaLandmark,
  FaUpload,
} from "react-icons/fa";
import "./BankDetailsNew.css";
import axios from "axios";
import { Outfit } from "next/font/google";
import Image from "next/image";
import styles from "./BankDetailsNew.module.css";
import CallbackListener from "../CallbackListener";
import SelfieWaiting from "./WaitingPageforBankdetails";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import hdb from "../Yubi/newplimages/HDB.png";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const BankDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientLoanId = searchParams.get("clientLoanId");
  const loanAmount = searchParams.get("loanAmount");
  const tenure = searchParams.get("tenure");
  const interestRate = searchParams.get("interestRate");

  console.log("clientloanidinbankpage as:", clientLoanId);
  console.log("tenure=", tenure);
  console.log("interest rate=", interestRate);

  const [formData, setFormData] = useState({
    accountname: "",
    IFSC: "",
    accountNumber: "",
    salarySlip: null,
    bankName: "",
    branchName: "",
    salarySlipLink: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [activeContainer, setActiveContainer] = useState("BankDetails");
  
  // ✅ Modal control
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // Refs
  const accountnameRef = useRef(null);
  const bankNameRef = useRef(null);
  const branchNameRef = useRef(null);
  const IFSCRef = useRef(null);
  const accountNumberRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // ✅ Camera & Gallery Refs
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // Function to scroll to first error field
  const scrollToFirstError = (errors) => {
    const errorFields = Object.keys(errors);
    if (errorFields.length === 0) return;

    const firstErrorField = errorFields[0];
    let targetRef = null;

    switch (firstErrorField) {
      case "accountname":
        targetRef = accountnameRef;
        break;
      case "bankName":
        targetRef = bankNameRef;
        break;
      case "branchName":
        targetRef = branchNameRef;
        break;
      case "IFSC":
        targetRef = IFSCRef;
        break;
      case "accountNumber":
        targetRef = accountNumberRef;
        break;
      case "salarySlipLink":
        const fileInput = document.getElementById("salarySlipUpload");
        if (fileInput) {
          const cardForm = document.querySelector(".cardForm-block");
          if (cardForm) {
            const fieldPosition = fileInput.offsetTop;
            cardForm.scrollTo({
              top: fieldPosition - 100,
              behavior: "smooth",
            });
          }
        }
        return;
      default:
        break;
    }

    if (targetRef && targetRef.current) {
      const cardForm = document.querySelector(".cardForm-block");
      if (cardForm) {
        const fieldPosition = targetRef.current.offsetTop;
        cardForm.scrollTo({
          top: fieldPosition - 100,
          behavior: "smooth",
        });
      }

      setTimeout(() => {
        if (targetRef.current) {
          targetRef.current.focus();
        }
      }, 500);
    }
  };

  const [bankOptions, setBankOptions] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}api/banks`)
      .then((res) => {
        setBankOptions(res.data.map((name) => ({ label: name, value: name })));
      })
      .catch((err) => {
        console.error("Failed to fetch bank names:", err);
      });
  }, []);

  const handleBankSelect = (selected) => {
    setFormData({ ...formData, bankName: selected.value });
    setFormErrors((prevErrors) => ({ ...prevErrors, bankName: "" }));
  };

  const CustomOption = ({
    data,
    innerRef,
    innerProps,
    selectOption,
    isSelected,
  }) => (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        padding: "10px",
        position: "relative",
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
          name={data.group}
          value={data.value}
          checked={isSelected}
          onChange={() => selectOption(data)}
        />
      </div>
      <hr
        style={{
          margin: "5px 0",
          border: "0",
          borderTop: "1px solid #ddd",
        }}
      />
    </div>
  );

  const customStyles = {
    input: (provided) => ({
      ...provided,
      padding: "8px",
      minHeight: "70px",
      border: "none",
      cursor: "pointer",
      borderRadius: "50px",
      fontSize: "16px",
    }),
    menu: (provided) => ({
      ...provided,
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 9999,
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
      borderRadius: "10px",
    }),
    control: (provided) => ({
      ...provided,
      borderRadius: "10px",
      minHeight: "50px",
    }),
    placeholder: (provided) => ({
      ...provided,
      padding: "12px",
      fontSize: "16px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0",
      fontSize: "16px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  // ✅ Camera Option Click Handler
  const handleCameraClick = () => {
    cameraInputRef.current?.click();
    setShowUploadModal(false);
  };

  // ✅ Gallery Option Click Handler
  const handleGalleryClick = () => {
    galleryInputRef.current?.click();
    setShowUploadModal(false);
  };

  // ✅ File Upload Handler
  const handleSalarySlipUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormErrors((prevErrors) => ({ ...prevErrors, salarySlipLink: "" }));

    setFormData((prev) => ({
      ...prev,
      salarySlip: file,
    }));

    try {
      const presignRes = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}generatePresignedUrl`,
        { params: { fileName: file.name } }
      );

      console.log("Presign response:", presignRes.data);

      const { presignedUrl, publicUrl } = presignRes.data.obj;

      await axios.put(presignedUrl, file, {
        headers: { "Content-Type": file.type },
      });

      setFormData((prev) => ({
        ...prev,
        salarySlip: file,
        salarySlipLink: publicUrl,
      }));

      console.log("Payslip uploaded to:", publicUrl);
    } catch (err) {
      console.error("Payslip upload failed:", err);
    }
  };

  // ✅ Remove File Handler
  const handleRemoveFile = () => {
    setFormData((prev) => ({
      ...prev,
      salarySlip: null,
      salarySlipLink: "",
    }));
    if (cameraInputRef.current) cameraInputRef.current.value = "";
    if (galleryInputRef.current) galleryInputRef.current.value = "";
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleaccountnameChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, accountname: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, accountname: "" }));
  };

  const handlebankNameChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, bankName: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, bankName: "" }));
  };

  const handlebranchNameChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, branchName: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, branchName: "" }));
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

    if (!formData.bankName) {
      errors.bankName = "Bank name is required";
      isValid = false;
    } else if (formData.bankName.trim().length < 2) {
      errors.bankName = "Bank name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.branchName) {
      errors.branchName = "Branch name is required";
      isValid = false;
    } else if (formData.branchName.trim().length < 2) {
      errors.branchName = "Branch name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.salarySlipLink) {
      errors.salarySlipLink = "Salary slip must be uploaded";
      isValid = false;
    }

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

    if (formData.salarySlip) {
      data.append("salarySlip", formData.salarySlip);
    }

    setFormErrors(errors);

    if (!isValid) {
      setTimeout(() => {
        scrollToFirstError(errors);
      }, 100);
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formData);
      console.log("client load for bankdetailspage is:", clientLoanId);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}submitBankDetails`,
          {
            clientLoanId: clientLoanId,
            bankName: formData.bankName,
            branchName: formData.branchName,
            accountName: formData.accountname,
            ifscCode: formData.IFSC,
            accountNumber: formData.accountNumber,
          }
        );

        if (response.data.code === -1) {
          window.location.href = `/yubi/RejectionPage`;
          return;
        }

        if (response.data.code === 0) {
          console.log("Disbursement API Response:", response.data.obj);
          setActiveContainer("SelfieWaiting");
        } else {
          console.error("Error:", response.data.msg);
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    }
  };

  return (
    <>
      <CallbackListener
        clientLoanId={clientLoanId}
        onDisbursementSuccess={() => {
          console.log("✅ Disbursement success webhook received");
          if (clientLoanId) {
            router.push(
              `/yubi/Referencedetailspage` +
                `?client_loan_id=${clientLoanId}` +
                `&loanAmount=${loanAmount}` +
                `&tenure=${tenure}` +
                `&interestRate=${interestRate}` +
                `&salarySlipLink=${encodeURIComponent(formData.salarySlipLink)}`
            );
          } else {
            console.error("No clientLoanId found for LoanApproval redirect!");
          }
        }}
      />
      
      {activeContainer === "SelfieWaiting" && <SelfieWaiting />}

      {activeContainer === "BankDetails" && (
        <div className={`${styles.container} ${outfit.className}`}>
          <div className={styles.mainHeaderPart}>
            <div className={styles.topchildren}>
              <div className={styles.logoContainer}>
                <Image
                  src={hdb}
                  alt="Hdb tag"
                  width={250}
                  height={250}
                  className={styles.logo2}
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

              {/* Account Holder Name */}
              <div
                className={`${styles.fields} ${
                  formErrors.accountname ? styles.errorField : ""
                }`}
              >
                <span className={styles.fieldName1}>Account holder name</span>
                <input
                  ref={accountnameRef}
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

              {/* Bank Name */}
              <div
                className={`${styles.fields} ${
                  formErrors.bankName ? styles.errorField : ""
                }`}
              >
                <span className={styles.fieldName1}>Bank name</span>
                <input
                  ref={bankNameRef}
                  type="text"
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handlebankNameChange}
                  className={styles.inputfield}
                />
              </div>
              {formErrors.bankName && (
                <span className={styles.errorText}>{formErrors.bankName}</span>
              )}

              {/* Branch Name */}
              <div
                className={`${styles.fields} ${
                  formErrors.branchName ? styles.errorField : ""
                }`}
              >
                <span className={styles.fieldName1}>Branch name</span>
                <input
                  ref={branchNameRef}
                  type="text"
                  id="branchName"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handlebranchNameChange}
                  className={styles.inputfield}
                />
              </div>
              {formErrors.branchName && (
                <span className={styles.errorText}>
                  {formErrors.branchName}
                </span>
              )}

              {/* IFSC Code */}
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
                <span className={styles.errorText}>{formErrors.IFSC}</span>
              )}

              {/* Account Number */}
              <div
                className={`${styles.fields} ${
                  formErrors.accountNumber ? styles.errorField : ""
                }`}
              >
                <span className={styles.fieldName1}>Enter account number</span>
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

              {/* ✅ Hidden Camera Input */}
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleSalarySlipUpload}
                style={{ display: "none" }}
              />

              {/* ✅ Hidden Gallery Input */}
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*,application/pdf"
                onChange={handleSalarySlipUpload}
                style={{ display: "none" }}
              />

              {/* ✅ Upload Salary Slip Field - VERTICAL ICONS */}
              <div
                className={`${styles.fields1} ${
                  formErrors.salarySlipLink ? styles.errorField : ""
                }`}
                onClick={() => setShowUploadModal(true)}  
              >
                <span className={styles.fieldName1}>Upload salary slip</span>

                <div className={styles.uploadContainer}>
                  
                  {/* ✅ Left Side - File Icon + Name */}
                  <div className={styles.fileInfo}>
                    {/* <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill={formData.salarySlip ? "#27ae60" : "#7A7A7D"}
                      style={{ marginRight: '8px', flexShrink: 0, transition: 'fill 0.3s' }}
                    >
                      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                    </svg> */}
                    <span className={styles.fileName}>
                      {formData.salarySlip ? formData.salarySlip.name : "Select file"}
                    </span>
                  </div>

                  {/* ✅ Right Side - Icons Vertical (वर Upload, खाली Close) */}
                  <div className={styles.slipIconsVertical}>
                    {/* ✅ Upload Icon - TOP */}
                    <div
                      className={styles.slipOpenIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowUploadModal(true);
                      }}
                      title="Upload file"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 20 L30 90 H70 V160 H130 V90 H170 Z"
                          fill="#7A7A7D"
                        />
                        <path
                          d="M100 45 L75 90 H90 V145 H110 V90 H125 Z"
                          fill="#FFFFFF"
                        />
                        <rect
                          x="30"
                          y="165"
                          width="140"
                          height="20"
                          fill="#7A7A7D"
                        />
                      </svg>
                    </div>

                    {/* ✅ Close Icon - BOTTOM (फक्त file असेल तर) */}
                    {formData.salarySlip && (
                      <div
                        className={styles.slipCloseIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile();
                        }}
                        title="Remove file"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 50 50"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{marginTop: "2px"}}
                        >
                          <circle
                            cx="25"
                            cy="25"
                            r="23"
                            stroke="red"
                            strokeWidth="4"
                            fill="white"
                          />
                          <line
                            x1="16"
                            y1="16"
                            x2="34"
                            y2="34"
                            stroke="red"
                            strokeWidth="4"
                            strokeLinecap="round"
                          />
                          <line
                            x1="34"
                            y1="16"
                            x2="16"
                            y2="34"
                            stroke="red"
                            strokeWidth="4"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {formErrors.salarySlipLink && (
                <span className={styles.errorText}>
                  {formErrors.salarySlipLink}
                </span>
              )}

              {/* Submit Button */}
              <div className={styles.btnContainer}>
                <button type="submit" className={styles.nextbtn}>
                  <span>Next</span>
                </button>
              </div>
            </form>
          </div>

          {/* ✅ Upload Modal - Camera & Gallery Options */}
          {showUploadModal && (
            <div
              className={styles.modalOverlay}
              onClick={() => setShowUploadModal(false)}
            >
              <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className={styles.modalTitle}>Choose an option</h3>

                {/* ✅ Camera Option */}
                <div className={styles.alignCenter}>
                <div className={styles.flexDiv}>
                <div
                  className={styles.modalOption}
                  onClick={handleCameraClick}
                >
                  <div
                    className={styles.modalIconCircle}
                    style={{ background: "#6039d2" }}
                  >
                    <Image
                  src="/camera.png"
                  alt="camera png"
                  width={350}
                  height={350}
                  className={styles.logo3}
                  priority
                />
                    {/* <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M12 15.5c1.93 0 3.5-1.57 3.5-3.5s-1.57-3.5-3.5-3.5-3.5 1.57-3.5 3.5 1.57 3.5 3.5 3.5z" />
                      <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                    </svg> */}
                  </div>
                  <span className={styles.modalOptionText}>Camera</span>
                </div>

                {/* ✅ Gallery Option */}
                <div
                  className={styles.modalOption}
                  onClick={handleGalleryClick}
                >
                  <div
                    className={styles.modalIconCircle}
                    style={{ background: "#6039d2" }}
                  >
                    <Image
                  src="/file.png"
                  alt="file png"
                  width={350}
                  height={350}
                  className={styles.logo3}
                  priority
                />
                    {/* <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
                    </svg> */}
                  </div>
                  <span className={styles.modalOptionText}>Gallery</span>
                </div>
                </div>
                </div>
                {/* ✅ Cancel Button */}
                {/* <button
                  className={styles.modalCancelBtn}
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </button> */}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BankDetails;