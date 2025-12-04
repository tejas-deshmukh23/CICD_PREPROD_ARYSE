'use client';
import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { FaRupeeSign } from 'react-icons/fa';
import { MdOutlineAccessTime } from 'react-icons/md';
import { GiSpeedometer } from 'react-icons/gi';
import { FaLock } from 'react-icons/fa';
import styles from './RysaCityPage.module.css';
import logo from '../../../public/arysefin-dark logo.png';
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
export default function RysaCityPage() {
  const cityData = {
    name: "Mumbai",
    stats: [
      { value: "50K+", label: "Loans Approved" },
      { value: "₹10L+", label: "Max Loan Amount" },
      { value: "10.5%", label: "Starting Interest" }
      // { value: "50K&#43;", label: "Loans Approved" },
      // { value: "&#8377;10L&#43;", label: "Max Loan Amount" },
      // { value: "10.5&#37;", label: "Starting Interest" }
    ],
    description1:
      "Mumbai is not a city, but an emotion. A thriving financial hub and home to India’s biggest film industry, Mumbai is called the city of dreams for a reason. However, this is also one of the most expensive cities in the world so if you’re from Mumbai and need some financial help, you’ve come to the right place.",
    description2:
      "Affordable. Minimal documentation. Hassle-free application. Flexible repayment. All of this and more in one personal loan. Presenting Moneyview personal loans which come with a range of benefits that are beneficial to all our customers. Let us find out the eligibility criteria and how to apply for one."
    // description1:
    //   "Mumbai is not a city, but an emotion. A thriving financial hub and home to India&rsquo;s biggest film industry, Mumbai is called the city of dreams for a reason. However, this is also one of the most expensive cities in the world so if you&rsquo;re from Mumbai and need some financial help, you&rsquo;ve come to the right place.",
    // description2:
    //   "Affordable. Minimal documentation. Hassle-free application. Flexible repayment. All of this and more in one personal loan. Presenting Moneyview personal loans which come with a range of benefits that are beneficial to all our customers. Let us find out the eligibility criteria and how to apply for one."
  };
  // Feture section 
  const benefits = [
    {
      id: 1,
      icon: <FaRupeeSign />,
      title: "Flexible Loan Amount",
      description:
        "Loan amounts typically range from ₹10,000 to ₹25 lakhs, based on your eligibility.",
    },
    {
      id: 2,
      icon: <MdOutlineAccessTime />,
      title: "Convenient Tenure Options",
      description:
        "Repayment periods range from 1 to 5 years, giving you flexibility.",
    },
    {
      id: 3,
      icon: <GiSpeedometer />,
      title: "Improves Credit Score",
      description:
        "Regular and timely EMI payments can help boost your credit score.",
    },
    {
      id: 4,
      icon: <FaLock />,
      title: "No Restriction on Usage",
      description:
        "You can use the loan for any personal reason, unlike home or auto loans.",
    },
  ];

  return (
    // <div className={styles.container} >
    <div className={`${styles.container} ${outfit.className}`}>
      <div className={styles.header1}>
        <nav className={styles.navbar}>
          <div className={styles.navContainer}>
            {/* Logo */}
            <div className={styles.logoNav}>
              <Link href='/'><Image
                src={logo}
                alt="Logo"
                width={80}
                height={65}
              /></Link>
            </div>

            {/* हंबरगर बटन */}
            {/* <div className={styles.navRightHumberger}>
                <button onClick={toggleMenu} className={styles.hamburgerBtn}>
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
      </div>
      {/* Header Section */}
      <header className={styles.header}>
        {/* <div className={styles.headerBackGroundImage}>
          <Image
          src= "/city.png"
          alt="india gate image"
          />
        </div> */}
        <section className={styles.hero}>
          <div className={styles.heroImage} style={{ position: "relative", width: "400px", height: "290px", botto: "0" }}>
            <Image
              src="/city.png"
              alt="Hero Image"
              fill
              priority
              className={styles.bg}

            />
          </div> {/*/*/}
          <div className={styles.overlay1}></div>
          <section className={styles.heroContent1}>
            <h1 className={styles.cityName}>{cityData.name}</h1>
            <div className={styles.stats}>
              {cityData.stats.map((item, index) => (
                <div key={index}>
                  <strong>{item.value}</strong>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </section>
        </section>
        {/* <div className={styles.cityInfo}>
          <h1 className={styles.cityName}>{cityData.name}</h1>
          <div className={styles.stats}>
            {cityData.stats.map((item, index) => (
              <div key={index}>
                <strong>{item.value}</strong>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div> */}
      </header>
      {/* Description Section */}
      <section className={styles.description}>
        <p>{cityData.description1}</p>
        <p>{cityData.description2}</p>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2>Features and Benefits of Personal Loan in Mumbai</h2>
        <section className={styles.container2}>
          {benefits.map((item) => (
            <div key={item.id} className={styles.card2}>
              <div className={styles.icon2}>{item.icon}</div>
              <h3 className={styles.title2}>{item.title}</h3>
              <p className={styles.description2}>{item.description}</p>
            </div>
          ))}
        </section>
      </section>

      {/* Eligibility Section */}
      <section className={styles.eligibility}>
        <h2>Eligibility Criteria to Apply for a Personal Loan in Mumbai:</h2>
        <ul className={styles.list}>
          <li>Monthly in-hand salary of at least &#8377;25,000.</li>
          <li>Salary must be credited to your bank account.</li>
          <li>A healthy credit score (CIBIL 650 or higher).</li>
          <li>Applicant&rsquo;s age should be between 21 and 55 years.</li>
        </ul>
      </section>

      {/* Skyline Section */}
      <section className={styles.skyline}>
        <p>Mumbai City Skyline</p>
      </section>

      {/* FAQ Section */}
      <section className={styles.faq}>
        <h2>Personal Loan in Mumbai &ndash; Related FAQs</h2>
        <details>
          <summary>What is the interest rate for personal loans in Mumbai?&#63;</summary>
          <p>No, personal loans are collateral&ndash;free.</p>
        </details>

        <details>
          <summary>How quickly can I get a personal loan in Mumbai?</summary>
          <p>Loan approvals are quick and disbursals can happen within 24&ndash;48 hours.</p>
        </details>

        <details>
          <summary>Do I need to provide any collateral for a personal loan&#63;</summary>
          <p>No, personal loans are collateral&ndash;free.</p>
        </details>
      </section>

      {/* Footer Call to Action */}
      <footer className={styles.footer}>
        <h2>Ready to Get Your Loan in Mumbai&#63;</h2>
        <p>Join thousands of satisfied customers who have trusted us with their financial needs</p>
        <button className={styles.applyBtn}>Apply Now</button>
      </footer>
    </div>
  );
}
