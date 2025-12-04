"use client";
import React, { useState, useEffect, useRef } from "react";
import "./SelfiePageNew.css";
import axios from "axios";
import { Roboto } from "@next/font/google";
import Image from "next/image";
import HeaderPart from "./HeaderPart";
import Selfie from "./newplimages/selfieimg.png";
import SelfieWaiting from "./LoadingPage";
import SelfieSuccess from "./VerifiedSelfie";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import CallbackListener from "../CallbackListener";
import hdb from "../../../public/Jays/HDB.png";
import { Typography } from "@mui/material";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const RedirectIframePage = () => {
  const [url, setUrl] = useState("");
  const [activeContainer, setActiveContainer] = useState("SelfiePageNew");

  useEffect(() => {
    const redirectUrl = localStorage.getItem("aaRedirectUrl");
    if (redirectUrl) {
      setUrl(redirectUrl);
    }
  }, []);

  return (
    <>
      {/* {activeContainer === "SelfiePageNew" && ( */}
      <div className={`${roboto.className} Four`}>
        <div>
          {url ? (
            <iframe
              src={url}
              title="AA Redirection"
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />
          ) : (
            <p>Loading iframe...</p>
          )}
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default RedirectIframePage;
