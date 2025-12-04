"use client";
import React from 'react'
import { useState } from 'react';
import LenderPage from '../../component/Rysa/landerpage';
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

function page() {
  return (
    <div className={outfit.className}>
        <LenderPage/>
    </div>
  )
}

export default page