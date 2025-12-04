"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaMoneyBillWave, FaChartLine, FaHandHoldingUsd } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import styles from "./singlePage.module.css";
import logo from "../../../public/arysefin-dark logo.png";
import { useRouter } from "next/navigation";
import { Outfit } from "next/font/google";
import ondclogo from '../../../public/ondcW_logo.png';

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
export default function SinglePage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();

  const handleApplyClick = () => {
    router.push("/personal-loan");
  };

  return (
    <>
      {/* <div className={styles.topMostDiv}> */}
      <div className={`${styles.topMostDiv} ${outfit.className}`}>

        {/* Navigation Header */}
        <header className={styles.header}>
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
            </div>
          </nav>
        </header>
        <div className={styles.container}>
          {/* Hero Section */}
          <section className={styles.heroSection}>
            <div className={styles.heroContainer}>
              {/* Left Content */}
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  Smart credit for ambitious <br/>indians
                </h1>
                <div className={styles.heroSubtitle}>
                  <div className={styles.subtitleChecks}><FaCheck /><div>Unsecured personal loan upto ₹25 lacs</div></div>
                  <div className={styles.subtitleChecks}><FaCheck /><div>Interest rate starting from 10.99% p.a {/* par annum */}</div></div>
                  <div className={styles.subtitleChecks}><FaCheck /><div>Zero paperwork | 100% digital process</div></div>
                  <div className={styles.subtitleChecks}><FaCheck /><div>Disbursal within 24 hours</div></div>
                </div>
                <button className={styles.applyBtn} onClick={handleApplyClick}>
                  <span>Apply now</span>
                </button>
              </div>

              {/* Right Image */}
              <div className={styles.heroImageContainer}>
                <Image
                  src="/girls2.png"
                  alt="Happy woman with hands up"
                  width={500}
                  height={600}
                  priority 
                  className={styles.heroImage}
                />
              </div>
            </div>
          </section>

          {/* Features Section */}
          {/* <section > className={styles.featuresSection} */}
          {/* Features Section */}
          <div className={styles.loanFeaturesSection}>
            {/* feature 1st */}
            <div className={styles.featureBox}>
              <div className={styles.emptychild1}></div>
              <div className={styles.featureBox1}>
                <FaMoneyBillWave className={styles.icon} />
                <h3>Quick as a click</h3>
                <p>
                  Loan approvals so fast, you&apos;ll barely blink -<br />
                  money in your account within 24-hours.
                </p>
              </div>
            </div>

            {/* feature 2nd */}
            <div className={styles.featureBox}>
              <div className={styles.emptychild2}></div>
              <div className={styles.featureBox2}>
                <FaChartLine className={styles.icon} />
                <h3>Loan that breathe easy</h3>
                <p>
                  No heavy EMIs, no hidden drama. Just clear terms and repayments
                  that work for you..
                </p>
              </div>
            </div>

            {/* feature 3rd */}
            <div className={styles.featureBox}>
              <div className={styles.emptychild3}></div>
              <div className={styles.featureBox3}>
                <FaHandHoldingUsd className={styles.icon} />
                <h3>Indian trusts us</h3>
                <p>
                  From tier-1 cities to towns,
                  <br />
                  AryseFin supports every borrower.
                </p>
              </div>
            </div>
          </div>
          {/* </section> */}
        </div>

        {/* middle page */}
        <div className={styles.mainDiv}>
          <div className={styles.stickyContainer}>
            {/* first Card */}
            <div className={styles.firstPart}>
              <div className={styles.circle}></div>
              <div className={styles.textBox}>
                <h2 className={styles.htag}>No tension loans</h2>
                <p className={styles.ptag}>
                  AryseFin works with India&rsquo;s top lenders &mdash; NBFCs and
                  Banks &mdash; to remove the stress from your loan.
                </p>
              </div>
              <div className={styles.imageContainer}>
                <Image
                  src="/medium-shot-smiley-man-posing.jpg"
                  alt="No Tension Loans"
                  width={600}
                  height={700}
                  priority 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            {/* second card */}
            <div className={styles.secondPart}>
              <div className={styles.imageContainer}>
                <Image
                  src="/woman-teaching-classroom.jpg"
                  alt="Low Interest"
                  width={900}
                  height={1000}
                  priority 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className={styles.textBox}>
                <h3 className={styles.htag}>
                  Low interest, <br /> flexible repayment
                </h3>
                <p className={styles.ptag}>
                  Rates from just 13% pa. Repay in 3&ndash;60 months. Simple,
                  fair, and fast.
                </p>
              </div>
              <div className={styles.circleLine}></div>
            </div>
            {/* thired card */}
            <div className={styles.thirdPart}>
              <div className={styles.circle}></div>
              <div className={styles.textBox}>
                <h3 className={styles.htag}>Your financial companion</h3>
                <p className={styles.ptag}>
                  Grow your credit profile, get higher limits, and unlock better
                  offers over time.
                </p>
              </div>
              <div className={styles.imageContainer}>
                <Image
                  src="/successful-businessman.jpg"
                  alt="Easy Use"
                  width={900}
                  height={1000}
                  priority 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            {/* fourth part */}
            <div className={styles.fourthPart}>
              <div className={styles.imageContainer}>
                <Image
                  src="/happy-businesswoman-talking-phone-writing.jpg"
                  alt="Future with LSP"
                  width={900}
                  height={1000}
                  priority 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className={styles.textBox}>
                <h3 className={styles.htag}>Built for everyday people.</h3>
                <p className={styles.ptag}>
                  You don&rsquo;t need a perfect score. AryseFin helps real people
                  build real credit
                </p>
              </div>
              <div className={styles.circleLine}></div>
            </div>
          </div>
        </div>
        {/*  */}
        {/* <div className={styles.mainDiv}>
        <div className={styles.stickyContainer}> */}
        {/* First Card */}
        {/* <div className={`${styles.Card} ${activeCard === 1 ? styles.show : ""}`}> */}
        {/* <div className={styles.Card}>
            <div className={styles.firstPart}>
              <div className={styles.circle}></div>
              <div className={styles.textBox}>
                <h2 className={styles.htag}>No Tension Loans</h2>
                <p className={styles.ptag}>
                  Rysa works with India&rsquo;s top lenders &mdash; NBFCs and Banks &mdash; to remove the stress from your loan.
                </p>
              </div>
              <div className={styles.imageContainer}>
                <Image
                  src="/medium-shot-smiley-man-posing.jpg"
                  alt="No Tension Loans"
                  width={600}
                  height={700}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div> */}

        {/* Second Card */}
        {/* <div className={`${styles.Card} ${activeCard === 2 ? styles.show : ""}`}> */}
        {/* <div className={styles.Card}>
            <div className={styles.secondPart}>
              <div className={styles.imageContainer}>
                <Image
                  src="/woman-teaching-classroom.jpg"
                  alt="Low Interest"
                  width={900}
                  height={1000}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className={styles.textBox}>
                <h3 className={styles.htag}>Low Interest, <br /> Flexible Repayment</h3>
                <p className={styles.ptag}>
                  Rates from just 13% pa. Repay in 3&ndash;60 months. Simple, fair, and fast.
                </p>
              </div>
              <div className={styles.circleLine}></div>
            </div>
          </div> */}

        {/* Third Card */}
        {/* <div className={`${styles.Card} ${activeCard === 3 ? styles.show : ""}`}> */}
        {/* <div className={styles.Card}>
            <div className={styles.thirdPart}>
              <div className={styles.circle}></div>
              <div className={styles.textBox}>
                <h3 className={styles.htag}>Your Financial Companion</h3>
                <p className={styles.ptag}>
                  Grow your credit profile, get higher limits, and unlock better offers over time.
                </p>
              </div>
              <div className={styles.imageContainer}>
                <Image
                  src="/successful-businessman.jpg"
                  alt="Easy Use"
                  width={900}
                  height={1000}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div> */}

        {/* Fourth Card */}
        {/* <div className={`${styles.Card} ${activeCard === 4 ? styles.show : ""}`}> */}
        {/* <div className={styles.Card}>
            <div className={styles.fourthPart}>
              <div className={styles.imageContainer}>
                <Image
                  src="/happy-businesswoman-talking-phone-writing.jpg"
                  alt="Future with LSP"
                  width={900}
                  height={1000}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className={styles.textBox}>
                <h3 className={styles.htag}>Built for Everyday People.</h3>
                <p className={styles.ptag}>
                  You don&rsquo;t need a perfect score. Rysa helps real people build real credit
                </p>
              </div>
              <div className={styles.circleLine}></div>
            </div>
          </div>
        </div>
      </div> */}
        {/* footer page*/}
        <main className={styles.footerMain}>
          <div className={styles.footerHeroSection}>
            <h1 className={styles.footerHeroText}>
              Fueling the dreams
              <br /> of working India
            </h1>
          </div>

          {/* ✅ STATS SECTION with U-SHAPE */}
          {/* <section className={styles.footerStatsSection}>
             <div className={styles.footerStatsText}> 
              <h2 className="text-4xl font-bold text-black mt-12">
                Trusted by Thousands
              </h2>
              <p className="text-md text-gray-600 mt-5 mb-8">
                Join the AryseFin family today
              </p>
             </div> 

            <div className={styles.footerstatsItems}>
              <div>
                <p className={styles.footerstatsNumber}>50,000+</p>
                <p className={styles.footerstatsLabel}>Happy Customers</p>
              </div>
              <div>
                <p className={styles.footerstatsNumber}>₹100 Cr+</p>
                <p className={styles.footerstatsLabel}>Loans Disbursed</p>
              </div>
              <div>
                <p className={styles.footerstatsNumber}>24 Hours</p>
                <p className={styles.footerstatsLabel}>Quick Approval</p>
              </div>
             </div>
          </section> */}

          {/* White Box Section */}
          <div className="w-full h-[50px] bg-[#f7f6fd]"></div>
          {/* footer part start */}
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
        </main>
      </div>
    </>
  );
}
{
  /* <div className={styles.socialIcons}>
          <a href="#" className="hover:text-pink-300">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="hover:text-blue-400">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="hover:text-blue-300">
            <i className="fab fa-linkedin"></i>
          </a>
        </div> */
}
// last edited
