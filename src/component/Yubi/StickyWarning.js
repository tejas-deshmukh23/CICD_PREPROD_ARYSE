// StickyWarning.js
"use client";
import React from "react";
import "./StickyWarning.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const StickyWarning = () => {
  return (
     <div className={`${roboto.className}`}>
    <div className="sticky-warning">
      <p className="warning-text">
        Please do not press the back button or refresh the page
      </p>
    </div>
    </div>
  );
};

export default StickyWarning;