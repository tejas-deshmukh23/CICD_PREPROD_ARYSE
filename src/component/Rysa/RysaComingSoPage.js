'use client'
import React from 'react'
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import styles from './RysaComingSo.module.css';
import logo from "../../../public/Aryse_Fin.png";
import logo2 from "../../../public/logo2_3.png";
function RysaComingSoPage() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // const handleApplyClick = () => {
    //     router.push('/');
    // };
    return (

        <div className={styles.container}>
            {/* Navigation Header */}
            <nav className={styles.navbar}>
          <div className={styles.navContainer}>
            {/* Logo */}
            <div className={styles.logoNav}>
              <Image
                src={logo}
                alt="Logo"
                width={80}
                height={65}
                //   className="object-contain"
              />
            </div>

            {/* हंबरगर बटन */}
            {/* <div className={styles.navRightHumberger}> */}
              {/* हंबरगर आयकॉन */}
              {/* <button onClick={toggleMenu} className={styles.hamburgerBtn}>
              &#9776; 
            </button> */}
              {/* <button onClick={toggleMenu} className={styles.hamburgerBtn}>
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {isOpen && (
              <div className={styles.humberView}>
                <a href="#" className={styles.navLinkHumberger}>
                  Home
                </a>
                <a href="#" className={styles.navLinkHumberger}>
                  Loans
                </a>
                <a href="#" className={styles.navLinkHumberger}>
                  About
                </a>
              </div>
            )} */}

            {/* Navigation Links */}
            {/* <div className={styles.navRight}>
              <div className={styles.navLinks}>
                <div className={styles.navAncor}>
                  <a href="#" className={styles.navLink}>
                    Home
                  </a>
                </div>
                <div className={styles.navAncor}>
                  <a href="#" className={styles.navLink}>
                    Loans
                  </a>
                </div>
                <div className={styles.navAncor}>
                  <a href="#" className={styles.navLink}>
                    About
                  </a>
                </div>
              </div>
              <button className={styles.loginBtn}>Login</button>
            </div> */}
            {/* Login Button */}
          </div>
        </nav>

            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContainer}>
                    {/* Left Content */}
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            Smart Credit for Ambitious Indians
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Loans up to ₹10Lacs. Low interest and zero paperwork.
                            Disbursal in 24 hours.
                        </p>
                        {/* <button className={styles.applyBtn} onClick={handleApplyClick}>
                            Apply Now
                        </button> */}
                    </div>
                    <div className={styles.comingDiv}>
                        <h3 >Coming soon...</h3>
                    </div>
                    {/* Right Image */}
                    <div className={styles.heroImageContainer}>
                        <Image
                            src="/girls2.png"
                            alt="Happy woman with hands up"
                            width={500}
                            height={600}
                            className={styles.heroImage}
                        />
                    </div>
                </div>
            </section>
            {/* footer part start */}
            <footer className={styles.footer}>
                    <div className={styles.footerlogoAndText}>
                        <div className={styles.footerLogo}>
                            <Image
                                src="/Aryse_Fin_w.png"
                                alt="Logo"
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>
                        <p className={styles.footeraboutText}>Aryse Fin is a lending service platform (LSP) that makes borrowing easy, transparent, and  human.
                            Backed by trusted NBFCs and banks.</p>
                    </div>
                <div className={styles.footerTermText}>
                    <h3 className="footerText1"> <button className={styles.footerSpan1}>Terms &amp; Conditions </button> And <button className={styles.footerSpan}>Privacy Policy</button></h3>
                </div>
                {/* <div className={styles.footersocialIcons}>
                    <a href="#" className="hover:text-pink-300">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="hover:text-blue-400">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="#" className="hover:text-blue-300">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div> */}
            </footer>
        </div>
    )
}

export default RysaComingSoPage