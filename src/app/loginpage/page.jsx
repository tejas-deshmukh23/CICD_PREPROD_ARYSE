"use client";
import React from 'react'
import { useState } from 'react';
// import LenderPage from '../../component/Rysa/landerpage';
import { Outfit } from "next/font/google";
import LoginPage from '@/component/Rysa/LoginPage';

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

function page() {
  return (
    <div className={outfit.className}>
        <LoginPage/>
    </div>
  )
}

export default page