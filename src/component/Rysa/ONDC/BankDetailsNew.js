// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Select from "react-select";
// import { useSearchParams } from "next/navigation";
// import {
//   FaUser,
//   FaBuilding,
//   FaCreditCard,
//   FaUniversity,
//   FaLandmark,
// } from "react-icons/fa";
// import "./BankDetailsNew.css";
// // import axios from "axios";
// import { Roboto } from "next/font/google";
// import Image from "next/image";
// import HeaderPart from "./HeaderPart";
// // import CallbackListener from "../CallbackListener";
// import SelfieWaiting from "./WaitingPage";
// import { useRouter } from "next/navigation";
// import "react-datepicker/dist/react-datepicker.css";
// import hdb from "../Yubi/newplimages/HDB.png";

// const roboto = Roboto({
//   weight: ["400", "700"],
//   subsets: ["latin"],
// });

// const bankdetails = () => {
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
//     salarySlipLink: "", // 👈 ADD THIS!
//   });

//   const [formErrors, setFormErrors] = useState({});
//   const [activeContainer, setActiveContainer] = useState("BankDetails");
//   const accountnameRef = useRef(null);
//   const bankNameRef = useRef(null);
//   const branchNameRef = useRef(null);
//   const IFSCRef = useRef(null);
//   const accountNumberRef = useRef(null);

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
//           width: "100%",
//         }}
//       />
//     </div>
//   );

//   const customStyles = {
//     input: (provided) => ({
//       ...provided,
//       padding: "8px",
//       width: "100%",
//       minHeight: "70px",
//       border: "none",
//       cursor: "pointer",
//       borderRadius: "50px",
//     }),
//     menu: (provided) => ({
//       ...provided,
//       position: "fixed",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       width: "80%",
//       maxWidth: "400px",
//       zIndex: 9999,
//       boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
//       borderRadius: "10px",
//     }),
//     control: (provided) => ({
//       ...provided,
//       width: "100%",
//       borderRadius: "10px",
//       minHeight: "50px",
//     }),
//     placeholder: (provided) => ({
//       ...provided,
//       padding: "12px",
//     }),
//     dropdownIndicator: (provided) => ({
//       ...provided,
//       padding: "0",
//     }),
//     indicatorSeparator: () => ({
//       display: "none",
//     }),
//   };

//   const handleSalarySlipUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

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
//       errors.bankName = "Bank Name is required";
//       isValid = false;
//     } else if (formData.bankName.trim().length < 2) {
//       errors.bankName = "Bank Name must be at least 2 characters";
//       isValid = false;
//     }
//     if (!formData.branchName) {
//       errors.branchName = "Branch Name is required";
//       isValid = false;
//     }
//     if (!formData.salarySlipLink) {
//       errors.salarySlipLink = "Salary slip must be uploaded";
//       isValid = false;
//     } else if (formData.branchName.trim().length < 2) {
//       errors.branchName = "Branch Name must be at least 2 characters";
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
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log("Form submitted successfully", formData);
//       console.log("client load for bankdetailspage is:", clientLoanId);

//       try {
//         const response = await axios.post(
//           `http://localhost:8080/submitBankDetails`,
//           {
//             clientLoanId: clientLoanId, // 👈 Safe and dynamic
//             bankName: formData.bankName,
//             branchName: formData.branchName,
//             accountName: formData.accountname,
//             ifscCode: formData.IFSC,
//             accountNumber: formData.accountNumber,
//           }
//         );

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
//       {/* <CallbackListener
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
//       /> */}
//       {activeContainer === "SelfieWaiting" && <SelfieWaiting />}

//       {activeContainer === "BankDetails" && (
//         <div className={`${roboto.className} container-block`}>
//           <div className="card-block">
//             <div className="header-block">
//               <div className="LogoPart-block">
//                 <Image
//                   src={hdb}
//                   alt="Hdb tag"
//                   style={{ alignContent: "center", width: "auto", height: "auto" }}
//                 />
//               </div>
//             </div>
//             <div className="cardForm-block">
//               <div className="content-block">
//                 <form onSubmit={handleSubmit}>
//                   <p className="para">Please provide your bank details</p>
//                   <div className="fill-form">
//                     <div className="fill-form" style={{ position: "relative" }}>
//                       <input
//                         type="text"
//                         id="accountname"
//                         name="accountname"
//                         placeholder="Account holder name"
//                         value={formData.accountname}
//                         className="enter-field"
//                         onChange={handleaccountnameChange}
//                       />
//                       <span
//                         className="enter-icon"
//                         style={{
//                           position: "absolute",
//                           right: "15px",
//                           top: "50%",
//                           transform: "translateY(-50%)",
//                           cursor: "pointer",
//                           color: "#00000061",
//                         }}
//                       >
//                         <FaUser />
//                       </span>
//                     </div>
//                     {formErrors.accountname && (
//                       <span className="error">{formErrors.accountname}</span>
//                     )}
//                   </div>
//                   {/*Bank Name Field */}
//                   <div className="fill-form">
//                     <div className="fill-form" style={{ position: "relative" }}>
//                       <input
//                         type="text"
//                         id="bankName"
//                         name="bankName"
//                         placeholder="Bank Name"
//                         value={formData.bankName}
//                         className="enter-field"
//                         onChange={handlebankNameChange}
//                       />
//                       <span
//                         className="enter-icon"
//                         style={{
//                           position: "absolute",
//                           right: "15px",
//                           top: "50%",
//                           transform: "translateY(-50%)",
//                           cursor: "pointer",
//                           color: "#00000061",
//                         }}
//                       >
//                         <FaUniversity />
//                       </span>
//                     </div>
//                     {formErrors.bankName && (
//                       <span className="error">{formErrors.bankName}</span>
//                     )}
//                   </div>
//                   {/*Branch Name Field */}
//                   <div className="fill-form">
//                     <div className="fill-form" style={{ position: "relative" }}>
//                       <input
//                         type="text"
//                         id="branchName"
//                         name="branchName"
//                         placeholder="Branch Name"
//                         value={formData.branchName}
//                         className="enter-field"
//                         onChange={handlebranchNameChange}
//                       />
//                       <span
//                         className="enter-icon"
//                         style={{
//                           position: "absolute",
//                           right: "15px",
//                           top: "50%",
//                           transform: "translateY(-50%)",
//                           cursor: "pointer",
//                           color: "#00000061",
//                         }}
//                       >
//                         <FaLandmark />
//                       </span>
//                     </div>
//                     {formErrors.branchName && (
//                       <span className="error">{formErrors.branchName}</span>
//                     )}
//                   </div>

//                   {/* IFSC Field */}
//                   <div className="fill-form">
//                     <div
//                       //   className={styles.inputWrapper}
//                       style={{ position: "relative" }}
//                     >
//                       <input
//                         ref={IFSCRef}
//                         type="text"
//                         id="IFSC"
//                         name="IFSC"
//                         placeholder="Enter IFSC"
//                         value={formData.IFSC}
//                         onChange={handleIFSCChange}
//                         className="enter-field"
//                         autoCapitalize="words"
//                       />

//                       <span
//                         className="enter-icon"
//                         style={{
//                           position: "absolute",
//                           right: "10px",
//                           top: "50%",
//                           transform: "translateY(-50%)",
//                           color: "#00000061",
//                         }}
//                       >
//                         <FaBuilding />
//                       </span>
//                     </div>
//                     {formErrors.IFSC && (
//                       <span className="error">{formErrors.IFSC}</span>
//                     )}
//                   </div>

//                   {/* Account number Field */}
//                   <div className="fill-form">
//                     <div
//                       //   className={styles.inputWrapper}
//                       style={{ position: "relative" }}
//                     >
//                       <input
//                         ref={accountNumberRef}
//                         type="number"
//                         id="accountNumber"
//                         name="accountNumber"
//                         placeholder="Enter account number"
//                         value={formData.accountNumber}
//                         onChange={handleaccountNumberChange}
//                         className="enter-field"
//                       />
//                       <span
//                         className="enter-icon"
//                         style={{
//                           position: "absolute",
//                           right: "10px",
//                           top: "50%",
//                           transform: "translateY(-50%)",
//                           color: "#00000061",
//                         }}
//                       >
//                         <FaCreditCard />
//                       </span>
//                     </div>
//                     {formErrors.accountNumber && (
//                       <span className="error">{formErrors.accountNumber}</span>
//                     )}
//                   </div>
//                   {/* Salary Slip Upload */}
//                   <div className="fill-form">
//                     <label
//                       htmlFor="salarySlipUpload"
//                       style={{
//                         display: "block",
//                         marginBottom: "8px",
//                         fontWeight: "500",
//                         color: "#777777",
//                       }}
//                     >
//                       Upload Salary Slip
//                     </label>
//                     <input
//                       id="salarySlipUpload"
//                       type="file"
//                       accept=".pdf, .jpg, .jpeg, .png"
//                       onChange={handleSalarySlipUpload}
//                       className="enter-field"
//                     />
//                   </div>

//                   {/* Submit Button */}

//                   <div className="short-button">
//                     <button
//                       type="submit"
//                       className="short-submit"
//                     >
//                       Next
//                     </button>
//                   </div>

//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default bankdetails;
