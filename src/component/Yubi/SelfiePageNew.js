// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import "./SelfiePageNew.css";
// import axios from "axios";
// import { Roboto } from "next/font/google";
// import Image from "next/image";
// import SelfieWaiting from "./LoadingPage";
// import SelfieSuccess from "./VerifiedSelfie";
// import { AlertCircle, CheckCircle } from "lucide-react";
// import { useSearchParams } from "next/navigation";
// import CallbackListener from "../CallbackListener";
// import hdb from "../../../public/Jays/HDB.png";
// import icon from "../../../public/Jays/Icon.png";
// import { Typography } from "@mui/material";

// const roboto = Roboto({
//   weight: ["400", "700"],
//   subsets: ["latin"],
// });

// const SelfiePageNew = () => {
//   const [showOptions, setShowOptions] = useState(false);
//   const [showSelfieOptions, setShowSelfieOptions] = useState(false);
//   const [activeContainer, setActiveContainer] = useState("SelfiePageNew");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const searchParams = useSearchParams();
//   const clientLoanId = searchParams.get("client_loan_id");
//   const [showCamera, setShowCamera] = useState(false);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [stream, setStream] = useState(null);
//   const [facingMode, setFacingMode] = useState("user");
//   const [isVideoReady, setIsVideoReady] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [showUploadPopup, setShowUploadPopup] = useState(false);
//   const [imageSource, setImageSource] = useState(null); // 'camera' or 'file'
//   const [isCameraActive, setIsCameraActive] = useState(false);
//   const cameraContainerRef = useRef(null);
//   const capturedImageRef = useRef(null); // New ref for captured image container
//   const popupRef = useRef(null);

//   // Start camera
//   const startCamera = async () => {
//     try {
//       setError("");
//       setSuccess("");
//       setIsVideoReady(false);
//       setShowCamera(true);
//       setIsCameraActive(true);
//       setCapturedImage(null);
//       setImageSource(null);

//       // Immediate scroll to where camera will appear
//       setTimeout(() => {
//         if (cameraContainerRef.current) {
//           cameraContainerRef.current.scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           });
//         }
//       }, 100);

//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }

//       let constraints = {
//         video: {
//           facingMode: facingMode,
//           width: { ideal: 640, max: 1280 },
//           height: { ideal: 480, max: 720 },
//         },
//         audio: false,
//       };

//       let mediaStream;

//       try {
//         mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
//       } catch (err) {
//         constraints = { video: true, audio: false };
//         mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
//       }

//       setStream(mediaStream);

//       if (videoRef.current && mediaStream) {
//         const video = videoRef.current;
//         video.srcObject = mediaStream;

//         const handleVideoReady = () => {
//           setIsVideoReady(true);
//           // Auto-scroll to camera when video is ready
//           setTimeout(() => {
//             if (cameraContainerRef.current) {
//               cameraContainerRef.current.scrollIntoView({
//                 behavior: "smooth",
//                 block: "start",
//               });
//             }
//           }, 100);
//         };

//         video.addEventListener("loadedmetadata", handleVideoReady);
//         video.addEventListener("canplay", handleVideoReady);

//         video.muted = true;
//         video.playsInline = true;
//         video.autoplay = true;

//         await video.play();
//       }
//     } catch (err) {
//       console.error("Camera access error:", err);
//       let errorMessage =
//         "Camera access denied. Please allow camera permission.";
//       setError(errorMessage);
//       setShowCamera(false);
//       setIsCameraActive(false);
//     }
//   };

//   // Stop camera
//   const stopCamera = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//       setStream(null);
//     }
//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//     }
//     setShowCamera(false);
//     setIsCameraActive(false);
//     setIsVideoReady(false);
//   };

//   // Capture photo
//   const capturePhoto = () => {
//     if (videoRef.current && canvasRef.current && isVideoReady) {
//       const canvas = canvasRef.current;
//       const video = videoRef.current;
//       const context = canvas.getContext("2d");

//       canvas.width = video.videoWidth || video.offsetWidth;
//       canvas.height = video.videoHeight || video.offsetHeight;

//       if (facingMode === "user") {
//         context.scale(-1, 1);
//         context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
//       } else {
//         context.drawImage(video, 0, 0, canvas.width, canvas.height);
//       }

//       canvas.toBlob(
//         (blob) => {
//           if (blob) {
//             const imageUrl = URL.createObjectURL(blob);
//             setCapturedImage(imageUrl);
//             setImageSource("camera");
//             setSuccess("Selfie captured successfully!");
//             stopCamera();

//             // Scroll to captured image after a short delay
//             setTimeout(() => {
//               if (capturedImageRef.current) {
//                 capturedImageRef.current.scrollIntoView({
//                   behavior: "smooth",
//                   block: "start",
//                 });
//               }
//             }, 300);
//           }
//         },
//         "image/jpeg",
//         0.9
//       );
//     }
//   };

//   // Handle file upload from gallery
//   const handleFileFromGallery = (event) => {
//     const file = event.target.files[0];
//     setError("");
//     setSuccess("");

//     if (file) {
//       if (!file.type.startsWith("image/")) {
//         setError("Please select only image files (jpg, png, etc).");
//         event.target.value = "";
//         return;
//       }

//       const imageUrl = URL.createObjectURL(file);
//       setCapturedImage(imageUrl);
//       setImageSource("file"); // Set source as file
//       setSuccess("Image selected successfully!");
//       event.target.value = ""; // Reset input

//       // Scroll to captured image after a short delay
//       setTimeout(() => {
//         if (capturedImageRef.current) {
//           capturedImageRef.current.scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           });
//         }
//       }, 300);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!capturedImage) {
//       setError("Please capture a selfie or select an image first.");
//       return;
//     }

//     setIsSubmitting(true);
//     setError("");

//     try {
//       // Convert captured image back to file for upload
//       const response = await fetch(capturedImage);
//       const blob = await response.blob();
//       const file = new File([blob], `selfie_${Date.now()}.jpg`, {
//         type: "image/jpeg",
//       });

//       await handleFileUpload(file);
//     } catch (err) {
//       console.error("Error submitting selfie:", err);
//       setError("Failed to submit selfie. Please try again.");
//       setIsSubmitting(false);
//     }
//   };

//   // Handle file upload (original function)
//   const handleFileUpload = async (file) => {
//     localStorage.setItem("hdbClientLoanId", clientLoanId);
//     setActiveContainer("SelfieWaiting");

//     try {
//       const presignResp = await axios.get(
//         `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}generatePresignedUrl`,
//         { params: { fileName: file.name } }
//       );
//       const { presignedUrl, publicUrl } = presignResp.data.obj;

//       await axios.put(presignedUrl, file, {
//         headers: { "Content-Type": file.type },
//       });

//       // await axios.post(`http://localhost:8080/updateKYC`, {
//       //   clientLoanId,
//       //   selfieImageUrl: publicUrl,
//       // });
//       const updateKycResp = await axios.post(
//         `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}updateKYC`,
//         {
//           clientLoanId,
//           selfieImageUrl: publicUrl,
//         }
//       );

//       // 🚨 Check if API returned rejection
//       if (updateKycResp.data.code === -1) {
//         window.location.href = `/yubi/RejectionPage`;
//       }

//       setActiveContainer("SelfieWaiting");
//     } catch (err) {
//       console.error("Error updating KYC:", err);
//       setError("Failed to update KYC. Please try again.");
//       setActiveContainer("SelfiePageNew");
//       setIsSubmitting(false);
//     }
//   };

//   // Handle click outside popup to close it
//   const handlePopupOverlayClick = (e) => {
//     // Check if the click is on the overlay (not on the popup content)
//     if (popupRef.current && !popupRef.current.contains(e.target)) {
//       setShowUploadPopup(false);
//     }
//   };
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   if (!capturedImage) {
//   //     setError("Please capture a selfie or select an image first.");
//   //     return;
//   //   }

//   //   setIsSubmitting(true);
//   //   setError("");

//   //   try {
//   //     setActiveContainer("SelfieWaiting"); // Show waiting screen

//   //     // Simulate processing delay, then show success screen
//   //     setTimeout(() => {
//   //       setActiveContainer("SelfieSuccess");
//   //     }, 2000); // 2 seconds delay
//   //   } catch (err) {
//   //     console.error("Error during fake submit:", err);
//   //     setError("Something went wrong. Please try again.");
//   //     setIsSubmitting(false);
//   //   }
//   // };

//   // Updated retake/reupload function
//   const handleImageAction = () => {
//     setCapturedImage(null);
//     setSuccess("");
//     setError("");
//     setImageSource(null);

//     if (imageSource === "camera") {
//       startCamera(); // Start camera again for retake
//     } else {
//       // For file upload, just clear the image - user will need to click upload button again
//       // Or you can directly trigger file input
//       document.getElementById("fileInput").click();
//     }
//   };

//   // ✅ Poll for KYC callback status
//   useEffect(() => {
//     if (activeContainer !== "SelfieWaiting") return;

//     const interval = setInterval(() => {
//       const kycStatus = localStorage.getItem("kycCallbackStatus");
//       console.log("🔍 Polling kycCallbackStatus:", kycStatus);

//       if (kycStatus && kycStatus.toLowerCase() === "success") {
//         clearInterval(interval);
//         setActiveContainer("SelfieSuccess");
//       }
//     }, 2000);

//     return () => clearInterval(interval);
//   }, [activeContainer]);

//   // Clean up camera on unmount
//   useEffect(() => {
//     return () => {
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//       // Clean up captured image URL
//       if (capturedImage) {
//         URL.revokeObjectURL(capturedImage);
//       }
//     };
//   }, [stream, capturedImage]);

//   return (
//     <>
//       <CallbackListener clientLoanId={clientLoanId} />
//       {activeContainer === "SelfiePageNew" && (
//         <div className={`${roboto.className} Four`}>
//           <div
//             className={`selfie-block ${isCameraActive ? "camera-active" : ""}`}
//           >
//             <div
//               className={`selfie-card ${isCameraActive ? "camera-active" : ""}`}
//             >
//               <div className="header-selfie">
//                 <div className="LogoPart-selfie">
//                   <Image
//                     src={hdb}
//                     alt="Hdb tag"
//                     style={{
//                       alignContent: "center",
//                       width: "auto",
//                       height: "auto",
//                     }}
//                   />
//                 </div>
//               </div>
//               <div
//                 className={`selfieForm-card ${
//                   isCameraActive ? "camera-active" : ""
//                 }`}
//               >
//                 <div className="selfiecontent-card">
//                   <form className="selfie-box" onSubmit={handleSubmit}>
//                     {/* Replaced Image with Icon */}
//                     <div className="selfie-icon-section">
//                       <div className="selfie-icon-container">
//                         <div className="selfie-circle-bg"></div>
//                         <div
//                           style={{
//                             width: "100px",
//                             height: "100px",
//                             background:
//                               "linear-gradient(45deg, #6039D2, #8B5FD6)",
//                             borderRadius: "50%",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             color: "white",
//                             fontSize: "36px",
//                             fontWeight: "bold",
//                             position: "relative",
//                             zIndex: 1,
//                           }}
//                         >
//                           <Image
//                             src={icon}
//                             alt="Icon"
//                             style={{
//                               width: "auto",
//                               height: "auto",
//                               color: "white",
//                             }}
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div
//                       className="texthead"
//                       style={{ marginTop: "150px", alignItems: "center" }}
//                     >
//                       <h3 style={{ fontSize: "22px", color: "#777777" }}>
//                         <b>Take a Selfie</b>
//                       </h3>
//                       <p style={{ fontSize: "16px", color: "#777777" }}>
//                         Capture a clear selfie or choose an existing one for
//                         identity verification. Avoid glasses and background
//                         lights.
//                       </p>
//                     </div>

//                     <div>
//                       {/* Show captured image preview */}
//                       {capturedImage && (
//                         <div
//                           ref={capturedImageRef}
//                           style={{
//                             marginBottom: "20px",
//                             textAlign: "center",
//                             // border: '2px solid #4CAF50',
//                             borderRadius: "15px",
//                             padding: "10px",
//                             background: "#f9f9f9",
//                           }}
//                         >
//                           <Image
//                             src={capturedImage}
//                             alt="Captured selfie"
//                             width={300}
//                             height={200}
//                             unoptimized
//                             style={{
//                               width: "100%",
//                               height: "200px",
//                               objectFit: "cover",
//                               borderRadius: "10px",
//                               border: "2px solid #ddd",
//                             }}
//                           />

//                           {/* Success Message - Moved inside captured image container */}
//                           {success && (
//                             <div
//                               className="success"
//                               style={{
//                                 color: "#4CAF50",
//                                 marginTop: "15px",
//                                 marginBottom: "10px",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 gap: "8px",
//                                 fontSize: "16px",
//                                 fontWeight: "bold",
//                               }}
//                             >
//                               <CheckCircle size={20} />
//                               <span>{success}</span>
//                             </div>
//                           )}

//                           <button
//                             type="button"
//                             onClick={handleImageAction}
//                             style={{
//                               marginTop: "10px",
//                               color: "#6039d2",
//                               border: "none",
//                               padding: "8px 16px",
//                               borderRadius: "5px",
//                               cursor: "pointer",
//                               textDecoration: "underline",
//                             }}
//                           >
//                             {imageSource === "camera"
//                               ? " Retake Selfie"
//                               : " Reupload Selfie"}
//                           </button>
//                         </div>
//                       )}

//                       {/* Camera Preview */}
//                       {showCamera && (
//                         <div
//                           ref={cameraContainerRef}
//                           className="camera-container"
//                           style={{
//                             position: "relative",
//                             marginBottom: "20px",
//                             background: "#000",
//                             borderRadius: "15px",
//                             overflow: "hidden",
//                             minHeight: "300px",
//                           }}
//                         >
//                           {!isVideoReady && (
//                             <div
//                               style={{
//                                 position: "absolute",
//                                 top: "50%",
//                                 left: "50%",
//                                 transform: "translate(-50%, -50%)",
//                                 color: "white",
//                                 textAlign: "center",
//                                 zIndex: 10,
//                               }}
//                             >
//                               <p>Starting camera...</p>
//                             </div>
//                           )}

//                           <video
//                             ref={videoRef}
//                             autoPlay
//                             playsInline
//                             muted
//                             style={{
//                               width: "100%",
//                               height: "300px",
//                               objectFit: "cover",
//                               opacity: isVideoReady ? 1 : 0,
//                               transform:
//                                 facingMode === "user"
//                                   ? "scaleX(-1)"
//                                   : "scaleX(1)",
//                             }}
//                           />
//                           <canvas ref={canvasRef} style={{ display: "none" }} />

//                           {/* Camera Controls */}
//                           <div
//                             style={{
//                               position: "absolute",
//                               bottom: "15px",
//                               left: "0",
//                               right: "0",
//                               display: "flex",
//                               justifyContent: "center",
//                               gap: "15px",
//                             }}
//                           >
//                             <button
//                               type="button"
//                               onClick={capturePhoto}
//                               disabled={!isVideoReady}
//                               style={{
//                                 background: "white",
//                                 border: "none",
//                                 borderRadius: "50%",
//                                 width: "55px",
//                                 height: "55px",
//                                 cursor: "pointer",
//                               }}
//                             >
//                               📷
//                             </button>

//                             <button
//                               type="button"
//                               onClick={stopCamera}
//                               style={{
//                                 background: "rgba(255, 255, 255, 0.9)",
//                                 border: "none",
//                                 borderRadius: "50%",
//                                 width: "45px",
//                                 height: "45px",
//                                 cursor: "pointer",
//                               }}
//                             >
//                               ✕
//                             </button>
//                           </div>
//                         </div>
//                       )}

//                       {/* Hidden file input for gallery selection */}
//                       <input
//                         id="fileInput"
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileFromGallery}
//                         style={{ display: "none" }}
//                       />

//                       {/* Upload Popup */}
//                       {showUploadPopup && (
//                         <div
//                           style={{
//                             position: "fixed",
//                             top: 0,
//                             left: 0,
//                             right: 0,
//                             bottom: 0,
//                             backgroundColor: "rgba(0, 0, 0, 0.5)",
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             zIndex: 1000,
//                           }}
//                           onClick={handlePopupOverlayClick}
//                         >
//                           <div
//                             ref={popupRef}
//                             style={{
//                               backgroundColor: "white",
//                               borderRadius: "15px",
//                               padding: "30px",
//                               width: "300px",
//                               maxWidth: "90%",
//                               textAlign: "center",
//                               boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
//                             }}
//                           >
//                             <h3 style={{ marginBottom: "30px", color: "#333" }}>
//                               Choose Option
//                             </h3>

//                             <div
//                               style={{
//                                 display: "flex",
//                                 justifyContent: "space-around",
//                                 marginBottom: "20px",
//                               }}
//                             >
//                               {/* Camera Option */}
//                               <div
//                                 onClick={() => {
//                                   setShowUploadPopup(false);
//                                   startCamera();
//                                 }}
//                                 style={{
//                                   cursor: "pointer",
//                                   textAlign: "center",
//                                   padding: "20px",
//                                   borderRadius: "10px",
//                                   transition: "background-color 0.3s",
//                                 }}
//                                 onMouseEnter={(e) =>
//                                   (e.target.style.backgroundColor = "#f0f0f0")
//                                 }
//                                 onMouseLeave={(e) =>
//                                   (e.target.style.backgroundColor =
//                                     "transparent")
//                                 }
//                               >
//                                 <div
//                                   style={{
//                                     width: "60px",
//                                     height: "60px",
//                                     borderRadius: "50%",
//                                     backgroundColor: "#333",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     margin: "0 auto 10px",
//                                     fontSize: "24px",
//                                   }}
//                                 >
//                                   📷
//                                 </div>
//                                 <p
//                                   style={{
//                                     margin: 0,
//                                     fontSize: "14px",
//                                     color: "#333",
//                                   }}
//                                 >
//                                   Camera
//                                 </p>
//                               </div>

//                               {/* Files Option */}
//                               <div
//                                 onClick={() => {
//                                   setShowUploadPopup(false);
//                                   document.getElementById("fileInput").click();
//                                 }}
//                                 style={{
//                                   cursor: "pointer",
//                                   textAlign: "center",
//                                   padding: "20px",
//                                   borderRadius: "10px",
//                                   transition: "background-color 0.3s",
//                                 }}
//                                 onMouseEnter={(e) =>
//                                   (e.target.style.backgroundColor = "#f7f6fd")
//                                 }
//                                 onMouseLeave={(e) =>
//                                   (e.target.style.backgroundColor = "f7f6fd")
//                                 }
//                               >
//                                 <div
//                                   style={{
//                                     width: "60px",
//                                     height: "60px",
//                                     borderRadius: "10px",
//                                     backgroundColor: "#4285f4",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     margin: "0 auto 10px",
//                                     fontSize: "24px",
//                                   }}
//                                 >
//                                   📁
//                                 </div>
//                                 <p
//                                   style={{
//                                     margin: 0,
//                                     fontSize: "14px",
//                                     color: "#333",
//                                   }}
//                                 >
//                                   Files
//                                 </p>
//                               </div>
//                             </div>

//                             {/* Cancel Button */}
//                             {/* <button
//                               onClick={() => setShowUploadPopup(false)}
//                               style={{
//                                 background: "#f5f5f5",
//                                 border: "none",
//                                 padding: "10px 30px",
//                                 borderRadius: "25px",
//                                 cursor: "pointer",
//                                 color: "#666",
//                                 fontSize: "14px",
//                               }}
//                             >
//                               Cancel
//                             </button> */}
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Main Action Button */}
//                     <div className="Long-button">
//                       {!capturedImage ? (
//                         // Show Upload button when no image is captured
//                         <button
//                           type="button"
//                           className="form-submit"
//                           onClick={() => setShowUploadPopup(true)}
//                         >
//                           📤 Upload Selfie
//                         </button>
//                       ) : (
//                         // Show Next button when image is captured
//                         <button
//                           type="submit"
//                           className="form-submit"
//                           disabled={isSubmitting}
//                           style={{
//                             opacity: isSubmitting ? 0.6 : 1,
//                             cursor: isSubmitting ? "not-allowed" : "pointer",
//                           }}
//                         >
//                           {isSubmitting ? "⏳ Submitting..." : "Next"}
//                         </button>
//                       )}
//                     </div>

//                     {/* Error Message */}
//                     {error && (
//                       <div
//                         className="errors"
//                         style={{ color: "red", marginTop: "10px" }}
//                       >
//                         <AlertCircle className="cps" />
//                         <span>{error}</span>
//                       </div>
//                     )}
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {activeContainer === "SelfieWaiting" && <SelfieWaiting />}
//       {activeContainer === "SelfieSuccess" && <SelfieSuccess />}
//     </>
//   );
// };

// export default SelfiePageNew;

"use client";
import React, { useState, useEffect, useRef } from "react";
import "./SelfiePageNew.css";
import styles from "./SelfiePageNew.module.css"
import axios from "axios";
import Image from "next/image";
import SelfieWaiting from "./LoadingPage";
import SelfieSuccess from "./VerifiedSelfie";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import CallbackListener from "../CallbackListener";
import hdb from "../../../public/Jays/HDB.png";
import icon from "../../../public/Jays/Icon.png";
import { Typography } from "@mui/material";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const SelfiePageNew = () => {
// ref =======================
// const handleBoxClick = (inputRef) => {
//     if (inputRef && inputRef.current) {
//       inputRef.current.focus();
//     }
//   };
  
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
const [showUploadModal, setShowUploadModal] = useState(false);
// =================================

  const [showOptions, setShowOptions] = useState(false);
  const [showSelfieOptions, setShowSelfieOptions] = useState(false);
  const [activeContainer, setActiveContainer] = useState("SelfiePageNew");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const clientLoanId = searchParams.get("client_loan_id");
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [stream, setStream] = useState(null);
  const [facingMode, setFacingMode] = useState("user");
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [imageSource, setImageSource] = useState(null); // 'camera' or 'file'
  const [isCameraActive, setIsCameraActive] = useState(false);
  const cameraContainerRef = useRef(null);
  const capturedImageRef = useRef(null); // New ref for captured image container
  const popupRef = useRef(null);

  // Start camera
  const startCamera = async () => {
    try {
      setError("");
      setSuccess("");
      setIsVideoReady(false);
      setShowCamera(true);
      setIsCameraActive(true);
      setCapturedImage(null);
      setImageSource(null);

      // Immediate scroll to where camera will appear
      setTimeout(() => {
        if (cameraContainerRef.current) {
          cameraContainerRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      let constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 640, max: 1280 },
          height: { ideal: 480, max: 720 },
        },
        audio: false,
      };

      let mediaStream;

      try {
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (err) {
        constraints = { video: true, audio: false };
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      }

      setStream(mediaStream);

      if (videoRef.current && mediaStream) {
        const video = videoRef.current;
        video.srcObject = mediaStream;

        const handleVideoReady = () => {
          setIsVideoReady(true);
          // Auto-scroll to camera when video is ready
          setTimeout(() => {
            if (cameraContainerRef.current) {
              cameraContainerRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }, 100);
        };

        video.addEventListener("loadedmetadata", handleVideoReady);
        video.addEventListener("canplay", handleVideoReady);

        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;

        await video.play();
      }
    } catch (err) {
      console.error("Camera access error:", err);
      let errorMessage =
        "Camera access denied. Please allow camera permission.";
      setError(errorMessage);
      setShowCamera(false);
      setIsCameraActive(false);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
    setIsCameraActive(false);
    setIsVideoReady(false);
  };

  // Capture photo
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current && isVideoReady) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth || video.offsetWidth;
      canvas.height = video.videoHeight || video.offsetHeight;

      if (facingMode === "user") {
        context.scale(-1, 1);
        context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
      } else {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const imageUrl = URL.createObjectURL(blob);
            setCapturedImage(imageUrl);
            setImageSource("camera");
            setSuccess("Selfie captured successfully!");
            stopCamera();

            // Scroll to captured image after a short delay
            setTimeout(() => {
              if (capturedImageRef.current) {
                capturedImageRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }, 300);
          }
        },
        "image/jpeg",
        0.9
      );
    }
  };

  // Handle file upload from gallery
  const handleFileFromGallery = (event) => {
    const file = event.target.files[0];
    setError("");
    setSuccess("");

    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select only image files (jpg, png, etc).");
        event.target.value = "";
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setCapturedImage(imageUrl);
      setImageSource("file"); // Set source as file
      setSuccess("Image selected successfully!");
      event.target.value = ""; // Reset input

      // Scroll to captured image after a short delay
      setTimeout(() => {
        if (capturedImageRef.current) {
          capturedImageRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!capturedImage) {
      setError("Please capture a selfie or select an image first.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Convert captured image back to file for upload
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      const file = new File([blob], `selfie_${Date.now()}.jpg`, {
        type: "image/jpeg",
      });

      await handleFileUpload(file);
    } catch (err) {
      console.error("Error submitting selfie:", err);
      setError("Failed to submit selfie. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Handle file upload (original function)
  const handleFileUpload = async (file) => {
    localStorage.setItem("hdbClientLoanId", clientLoanId);
    setActiveContainer("SelfieWaiting");

    try {
      const presignResp = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}generatePresignedUrl`,
        { params: { fileName: file.name } }
      );
      const { presignedUrl, publicUrl } = presignResp.data.obj;

      await axios.put(presignedUrl, file, {
        headers: { "Content-Type": file.type },
      });

      // await axios.post(`http://localhost:8080/updateKYC`, {
      //   clientLoanId,
      //   selfieImageUrl: publicUrl,
      // });
      const updateKycResp = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}updateKYC`,
        {
          clientLoanId,
          selfieImageUrl: publicUrl,
        }
      );

      // 🚨 Check if API returned rejection
      if (updateKycResp.data.code === -1) {
        window.location.href = `/yubi/RejectionPage`;
      }

      setActiveContainer("SelfieWaiting");
    } catch (err) {
      console.error("Error updating KYC:", err);
      setError("Failed to update KYC. Please try again.");
      setActiveContainer("SelfiePageNew");
      setIsSubmitting(false);
    }
  };

  // Handle click outside popup to close it
  const handlePopupOverlayClick = (e) => {
    // Check if the click is on the overlay (not on the popup content)
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setShowUploadPopup(false);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!capturedImage) {
  //     setError("Please capture a selfie or select an image first.");
  //     return;
  //   }

  //   setIsSubmitting(true);
  //   setError("");

  //   try {
  //     setActiveContainer("SelfieWaiting"); // Show waiting screen

  //     // Simulate processing delay, then show success screen
  //     setTimeout(() => {
  //       setActiveContainer("SelfieSuccess");
  //     }, 2000); // 2 seconds delay
  //   } catch (err) {
  //     console.error("Error during fake submit:", err);
  //     setError("Something went wrong. Please try again.");
  //     setIsSubmitting(false);
  //   }
  // };

  // Updated retake/reupload function
  const handleImageAction = () => {
    setCapturedImage(null);
    setSuccess("");
    setError("");
    setImageSource(null);

    if (imageSource === "camera") {
      startCamera(); // Start camera again for retake
    } else {
      // For file upload, just clear the image - user will need to click upload button again
      // Or you can directly trigger file input
      document.getElementById("fileInput").click();
    }
  };

  // ✅ Poll for KYC callback status
  useEffect(() => {
    if (activeContainer !== "SelfieWaiting") return;

    const interval = setInterval(() => {
      const kycStatus = localStorage.getItem("kycCallbackStatus");
      console.log("🔍 Polling kycCallbackStatus:", kycStatus);

      if (kycStatus && kycStatus.toLowerCase() === "success") {
        clearInterval(interval);
        setActiveContainer("SelfieSuccess");
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeContainer]);

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      // Clean up captured image URL
      if (capturedImage) {
        URL.revokeObjectURL(capturedImage);
      }
    };
  }, [stream, capturedImage]);
  // =======================================
   //  Camera Option Click Handler
  const handleCameraClick = () => {
    cameraInputRef.current?.click();
    setShowUploadModal(false);
  };

  // ✅ Gallery Option Click Handler
  const handleGalleryClick = () => {
    galleryInputRef.current?.click();
    setShowUploadModal(false);
  };
  const handleSelfieUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // ✅ File select झाली, capturedImage set करा
  const imageUrl = URL.createObjectURL(file);
  setCapturedImage(imageUrl);
  setImageSource("file");
  setSuccess("Image selected successfully!");
  setError("");
  
  // ✅ Modal बंद करा
  setShowUploadModal(false);
};

  return (
    <>
      <CallbackListener clientLoanId={clientLoanId} />
      {activeContainer === "SelfiePageNew" && (
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
                      <div className={styles.selfieIconContainer}>
                        <div className={styles.selfieCirclebg}></div>
                        <div
                        className={styles.imageDiv}
                        >
                          <Image
                            src={icon}
                            alt="Icon"
                            style={{
                              width: "auto",
                              height: "auto",
                              color: "white",
                            }}
                          />
                        </div>
                      </div>

                    <div
                      className={styles.texthead}
                    >
                      <h3>
                        <b>Take a Selfie</b>
                      </h3>
                      <p>
                        Capture a clear selfie or choose an existing one for
                        identity verification. Avoid glasses and background
                        lights.
                      </p>
                    </div>


                      {/* Hidden Camera Input */}
                      <input
                        ref={cameraInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleSelfieUpload}
                        style={{ display: "none" }}
                      />
        
                      {/* Hidden Gallery Input */}
                      <input
                        ref={galleryInputRef}
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleSelfieUpload}
                        style={{ display: "none" }}
                      />
                      {/* Submit Button */}
                      <div className={styles.btnContainer} 
                      onClick={() => setShowUploadModal(true)}
                              // onClick={(e) => {
                              //   e.stopPropagation();
                              //   setShowUploadModal(true);
                              // }}
                              title="Upload file">
                        <button type="button" className={styles.nextbtn}>
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
                          </div>
                          <span className={styles.modalOptionText}>Gallery</span>
                        </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
      )}
      {activeContainer === "SelfieWaiting" && <SelfieWaiting />}
      {activeContainer === "SelfieSuccess" && <SelfieSuccess />}
    </>
  );
};

export default SelfiePageNew;
