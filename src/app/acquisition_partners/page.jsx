"use client";
import React from 'react'
import { useState } from 'react';
import Acquisition_partners from '../../component/Rysa/Acquisition_partners';
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

function page() {
  return (
    <div className={outfit.className}>
        <Acquisition_partners/>
    </div>
  )
}

export default page