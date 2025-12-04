"use client";

import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import Link from "next/link";
import "./HDBNavBar.css";
// import i from "../../HDB/newplimages/logo1-removebg-preview.png";
import i from "../newplimages/logo1-removebg-preview.png";
import Image from "next/image";

function HDBNavBar() {
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          {/* <img className="nav-logo.icon" src={i} alt="logo_pic" height={'40px'} width={'45px'} style={{marginLeft:'30px'}}/> */}
          <Image
            src={i}
            className="nav-logo.icon"
            width={45}
            height={45}
            style={{ marginLeft: "30px" }}
            alt="logo_pic"
          />
        </div>
      </nav>
    </>
  );
}

export default HDBNavBar;
