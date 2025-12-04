"use client";
import React, { useEffect, useState } from "react";
import styles from "./FinalLoanAmountNew.css";
import Image from "next/image";
import hdb from "../Yubi/newplimages/HDB.png";
import { Roboto } from "next/font/google";
import StickyWarning from "../../component/Yubi/StickyWarning";
import { useSearchParams, useRouter } from "next/navigation";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function SubmitPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const clientLoanId = searchParams.get("clientLoanId") || "";

  useEffect(() => {
    const fetchSanctionDetails = async () => {
      if (!clientLoanId) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}sanction/${clientLoanId}`
        );
        if (!response.ok) throw new Error("Failed to fetch sanction details");

        const data = await response.json();
        setLoanAmount(data.loanAmount);
        setTenure(data.tenure);
        setInterestRate(data.interestRate);
      } catch (error) {
        console.error("❌ Error fetching sanction details:", error);
      }
    };

    fetchSanctionDetails();
  }, [clientLoanId]);

  // useEffect(() => {
  //   // ✅ Fetch from localStorage after component mounts
  //   const storedLoanAmount = localStorage.getItem("sanctionLoanAmount");
  //   const storedTenure = localStorage.getItem("sanctionTenure");
  //   const storedInterestRate = localStorage.getItem("sanctionInterestRate");
  //   // const storedClientLoanId = localStorage.getItem("clientLoanId");

  //   if (storedLoanAmount) setLoanAmount(storedLoanAmount);
  //   if (storedTenure) setTenure(storedTenure);
  //   if (storedInterestRate) setInterestRate(storedInterestRate);
  //   // if (storedClientLoanId) setClientLoanId(storedClientLoanId);
  // }, []);

  const handleAgree = () => {
    console.log("✅ User agreed to final sanction details");
    // ✅ Navigate immediately
    router.push(
      `/yubi/Smswaitingpage?clientLoanId=${clientLoanId}&loanAmount=${loanAmount}&tenure=${tenure}&interestRate=${interestRate}`
    );
  };

  // Format currency function
  const formatCurrency = (amount) => {
    return amount != null
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(amount)
      : "";
  };
  const [isLoading, setIsLoading] = useState(true);
  const [loanData, setLoanData] = useState({
    refNo: "",
    amount: "",
    account: "",
    tenure: "",
    interestRate: "",
  });

  useEffect(() => {
    // 🟩 Simulate backend fetch (you can replace with fetch/axios)
    const fetchData = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const data = {
          ref: "D1102345",
          amount: loanAmount, // Backend se plain number format mein amount
          accountNumber: "1298656789",
          tenure: tenure,
          interestRate: interestRate,
        };

        setLoanData({
          refNo: data.ref,
          amount: data.amount,
          account: maskAccount(data.accountNumber),
          tenure: data.tenure,
          interestRate: data.interestRate,
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [loanAmount, tenure, interestRate]);

  // ✅ Mask account number: show first 2 and last 4 digits only
  const maskAccount = (accNum) => {
    if (!accNum || accNum.length < 6) return accNum;
    const first2 = accNum.slice(0, 2);
    const last4 = accNum.slice(-4);
    return `${first2}XX${last4}`;
  };

  // ✅ Format amount in Indian currency style (with commas and rupee symbol)
  const formatIndianCurrency = (amount) => {
    if (!amount) return "";

    // Remove any existing currency symbols or commas
    const cleanAmount = amount.toString().replace(/[₹,]/g, "");

    // Convert to number and back to string to handle any formatting
    const numAmount = parseInt(cleanAmount);

    // Use Indian number formatting with commas
    return `₹${numAmount.toLocaleString("en-IN")}`;
  };

  // Show loading state until all data is ready
  if (isLoading) {
    return (
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
            fontSize: "16px",
            color: "#777777",
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`${roboto.className} container-block`}>
        <div className="card-block">
          <div className="header-block">
            <div className="LogoPart-block">
              <Image
                src={hdb}
                alt="Hdb tag"
                style={{
                  alignContent: "center",
                  width: "auto",
                  height: "auto",
                }}
              />
            </div>
          </div>
          <div className="cardForm-block">
            {/* Updated Success Checkmark with KFS styling */}
            <div className="professionalCheckmarkContainer">
              <div className="status-icon status-completed">✓</div>
            </div>

            <h1 className="title">
              Congratulations!
              <br />
              Your final approved loan details are below
            </h1>

            <div className="loanDetails">
              {/* Subtle Card Layout for Loan Details */}
              <div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "18px",
                  }}
                >
                  {/* Loan Amount - Green theme for money */}
                  <div
                    style={{
                      background: "White",
                      borderRadius: "15px",
                      padding: "20px",
                      textAlign: "center",
                      border: "1px solid rgb(96, 57, 210)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        right: "0",
                        height: "3px",
                        background: "rgb(96, 57, 210)",
                      }}
                    ></div>
                    <div
                      style={{
                        fontSize: "16px",
                        color: "rgb(96, 57, 210)",
                        marginBottom: "8px",
                        fontWeight: "600",
                      }}
                    >
                      💰 Loan Amount
                    </div>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#777777",
                        minHeight: "30px",
                      }}
                    >
                      {formatIndianCurrency(loanData.amount)}
                    </div>
                  </div>

                  {/* Two columns for Tenure and Interest Rate */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "15px",
                    }}
                  >
                    {/* Tenure - Blue theme */}
                    <div
                      style={{
                        background: "white",
                        borderRadius: "15px",
                        padding: "18px",
                        textAlign: "center",
                        border: "1px solid rgb(96, 57, 210)",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          right: "0",
                          height: "3px",
                          background: "rgb(96, 57, 210)",
                        }}
                      ></div>
                      <div
                        style={{
                          fontSize: "16px",
                          color: "rgb(96, 57, 210)",
                          marginBottom: "8px",
                          fontWeight: "600",
                        }}
                      >
                        📅 Tenure
                      </div>
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#777777",
                          minHeight: "30px",
                        }}
                      >
                        {loanData.tenure}
                      </div>
                    </div>

                    {/* Interest Rate - Orange theme */}
                    <div
                      style={{
                        background: "white",
                        borderRadius: "15px",
                        padding: "18px",
                        textAlign: "center",
                        border: "1px solid rgb(96, 57, 210)",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          right: "0",
                          height: "3px",
                          background: "rgb(96, 57, 210)",
                        }}
                      ></div>
                      <div
                        style={{
                          fontSize: "16px",
                          color: "rgb(96, 57, 210)",
                          marginBottom: "8px",
                          fontWeight: "600",
                        }}
                      >
                        📈 Interest Rate
                      </div>
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#777777",
                          minHeight: "30px",
                        }}
                      >
                        {loanData.interestRate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div
              style={{
                position: "fixed",
                bottom: "0",
                left: "0",
                right: "0",
                padding: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                backgroundColor: "white",
                borderTop: "1px solid #e5e7eb",
              }}
            >
              <button
                onClick={handleAgree}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#6039D2",
                  color: "white",
                  border: "none",
                  borderRadius: "15px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <StickyWarning />
    </>
  );
}
