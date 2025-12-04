"use client";
import React from 'react';
import "./LoadingPage.css";
import { Roboto } from 'next/font/google';
import { useRouter } from "next/navigation";

const roboto = Roboto({
    weight: ["400", "700"],
    subsets: ["latin"],
});

const FormError = ({setShowFormError}) => {

    const router = useRouter();

    const handleButtonClick=()=>{
        // router.push("/ondc/bankdetails")
        setShowFormError(false);
    }

    return (
        <div className={`${roboto.className} waiting-table`}>
            <div className="loading-circle">
                <svg className="hourglass-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z"
                        fill="#6039D2" stroke="#6039D2" strokeWidth="2.5" />
                </svg>
            </div>

            <div className="loading-text">
                <h3 style={{ textAlign: "center" }}>
                    <b>Account Verification Failed</b>
                </h3>
                <br />
                <p className="para">
                    {/* The account number you entered is already registered in our system. */}
                    Please try with a different account number.
                </p>
                <p className="para">
                    {/* Please fill the form again using a different account number. */}
                </p>
                <p className="para">
                    Click <b>Next</b> to fill again.
                </p>
            </div>


            {/* Submit Button */}
            {/* <div className="Long-button">
                <button
                  type="submit"
                  className="form-submit"
                >
                  Next
                </button>
              </div> */}

            {/* Submit Button */}
            {/* <div className="btnContainer">
                <button
                  type="submit"
                  className="nextBtn"
                >
                  Next
                </button>
              </div> */}

            <div className="Long-button">
                <button
                    type="submit"
                    className="form-submit"
                    onClick={() => handleButtonClick()}
                >
                    Next
                </button>
            </div>


        </div>
    );
};

export default FormError;