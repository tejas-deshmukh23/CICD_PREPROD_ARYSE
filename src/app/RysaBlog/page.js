"use client";
import React from 'react'
import { useState } from 'react';
import RysaBlogPage from '@/component/Rysa/RysaBlogPage';
import RysaRightBlog from '@/component/Rysa/RysaRightBlog';
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
function page() {
  return (
    <div className={outfit.className}>
        <RysaBlogPage/>
        {/* <RysaRightBlog/> */}
    </div>
  )
}

export default page