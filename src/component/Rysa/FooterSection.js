"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import styles from "./FooterSection.module.css";
import { Outfit } from "next/font/google";
import ondclogo from '../../../public/ondcW_logo.png';
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
export default function FooterSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is the minimum salary required for a personal loan?",
      answer: "The minimum salary varies by lender, but generally ranges from ₹15,000 to ₹25,000 per month."
    },
    {
      question: "Does a personal loan affect my credit score?",
      answer: "Yes, timely repayments improve your CIBIL score, while delays harm it. Always repay EMIs on time."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className={`${styles.container} ${outfit.className}`}>
        {/* About Author */}
        <div className={styles.authorBox}>
          <h3 className={styles.authorTitle}>About the Author</h3>
          <p className={styles.authorText}>
            Written by Riya Sharma, a fintech specialist with 5+ years of experience helping individuals make smarter loan &amp; investment choices.
          </p>
        </div>

        {/* FAQs */}
        <div className={styles.faqSection}>
          <h3 className={styles.faqHeading}>FAQs</h3>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
              >
                <span className={styles.icon}>
                  {openIndex === index ? "▾" : "▸"}
                </span>
                {faq.question}
              </button>
              {openIndex === index && (
                <p className={styles.faqAnswer}>{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
            <div className={styles.mainFD}>
              <div className={styles.combineThree}>
                <div className={styles.flogo}>
                  <Link href='/'><Image
                    src="/AryseFin_logo.png"
                    alt="Logo"
                    width={80}
                    height={80}
                    className="object-contain"
                  /></Link>
                  <p className={styles.logoText}>
                    AryseFin is a lending service platform (LSP) that makes borrowing
                    easy, transparent, and human.
                  </p>
                </div>
                <div className={styles.fresource}>
                  <div className={styles.textDecore}>
                    <h3 className={styles.heading}>Resources</h3>
                    <h4><Link href="/lenderpage">Lending partners</Link></h4>
                    <h4><Link href="/acquisition_partners">Acquisition partners</Link></h4>
                    <h4><Link href="/Grievance">Grievance Redressal process</Link></h4>
                    <h4>
                      <a href="https://sachet.rbi.org.in/" rel="noopener noreferrer">
                        RBI Sachet Portal
                      </a>
                    </h4>
                  </div>
                </div>
                {/*  */}
                <div className={styles.fcity}>
                  <div className={styles.textDecore}>
                    <h3 className={styles.heading}>Quick links</h3>
                    <h4>
                      <Link href="/TermAndCondition">
                        Terms of service
                      </Link>
                    </h4>
                    <h4>
                      <Link href="/PrivacyAndPolicy">
                        Privacy policy
                      </Link>
                    </h4>
                    <h4>
                      <Link href="/support">
                        Contact us
                      </Link>
                    </h4>
                  </div>
                </div>
                {/* combine 2 end */}
              </div>
              <div className={styles.ondcLogoDiv}>
                <p>Powered by</p>
                <Image
                  src={ondclogo}
                  alt="Logo"
                  width={80}
                  height={65}
                />
                
              </div>
              <div className={styles.lastMD}>
                <div className={styles.iconAndCopyRight}>
                  <div>©2025 Vibhuprada Services Private Limited.</div>
                  <div className={styles.middleText}> <p>All rights reserved</p></div>

                  <div className={styles.iconF}>
                    {/* <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                      <FaInstagram />
                    </a> */}
                    <a href="https://www.facebook.com/profile.php?id=61580792857656" target="_blank" rel="noopener noreferrer">
                      <FaFacebook />
                    </a>
                    <a href="https://www.linkedin.com/company/arysefin/about/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
    </>
  );
}