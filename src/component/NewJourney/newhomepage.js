"use client";
import { red } from "@mui/material/colors";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
  FaPhone,
  FaLinkedin,
  FaFacebook,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import logo from "../../../public/arysefin-dark logo.png";
import logo2 from "../../../public/arysefin-white logo.png";
import styles from "./newhomepage.module.css";
import { display } from "@mui/system";
function Newhomepage() {
  // humbergar function
  const [isOpen, setIsOpen] = useState(false);
  // imge silder function her
  // const images = [
  //   "/Corporate lady.jpg",
  //   "/Corporate male.jpg",
  //   "/Retail Store employee.jpg",
  // ];

  // for images
  const desktopImages = [
    "/Corporate lady.jpg",
    "/Corporate male.jpg",
    "/Retail Store employee.jpg",
  ];

  const mobileImages = [
    "/Hero Banner_Mobile 1 2.png",
    "/Hero Banner_Mobile 2 1.png",
    "/Hero Banner_Mobile 3 1.png",
  ];

  const [isMounted, setIsMounted] = useState(false);
  const [images, setImages] = useState(desktopImages);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setImages(mobileImages);
      } else {
        setImages(desktopImages);
      }
    };

    handleResize(); // initial check

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // change every 4 seconds
    return () => clearInterval(interval);
  }, []);
  const handleDotClick = (index) => {
    setCurrentImage(index);
  };
  //   EMI Calculation
  const [amount, setAmount] = useState(100000);
  const [duration, setDuration] = useState(24); // Always store in months
  const [rate, setRate] = useState(11.5);
  const [emi, setEmi] = useState(0);
  const [yearsOrMonths, setYearsOrMonths] = useState("Mo"); // "Yr" or "Mo"
  const [displayValue, setDisplayValue] = useState("");

  // Derived values for display
  const years = Math.floor(duration / 12);
  const months = duration % 12;

  // Calculate EMI whenever amount, duration, or rate changes
  useEffect(() => {
    const monthlyRate = rate / 12 / 100;
    const emiValue =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, duration)) /
      (Math.pow(1 + monthlyRate, duration) - 1);
    setEmi(Math.round(emiValue));
  }, [amount, duration, rate]);

  const totalPayable = emi * duration;
  const totalInterest = totalPayable - amount;
  const interestPercent = (totalInterest / totalPayable) * 100;

  // Handle year input change
  // const handleYearChange = (value) => {
  //   const newYears = Number(value);
  //   setDuration(newYears * 12);
  // };

  // // Handle month input change
  // const handleMonthChange = (value) => {
  //   setDuration(Number(value));
  // };

  // // Handle toggle between Year and Month
  // const handleToggle = (type) => {
  //   setYearsOrMonths(type);
  //   if (type === "Yr" && duration < 12) {
  //     setDuration(12); // Minimum 1 year when switching to years
  //   }
  // };
  // Handle year input change
  const handleYearChange = (value) => {
    const newYears = Math.max(1, Math.min(5, Number(value))); // 1-5 range madhe keep kara
    setDuration(newYears * 12);
  };

  // Handle month input change
  const handleMonthChange = (value) => {
    const newMonths = Math.max(6, Math.min(60, Number(value))); // 6-60 range madhe keep kara
    setDuration(newMonths);
  };

  // Handle toggle between Year and Month
  const handleToggle = (type) => {
    setYearsOrMonths(type);

    if (type === "Yr") {
      if (duration < 12) {
        setDuration(12);
      }
      // Display value update kara
      setDisplayValue(Math.floor(duration / 12).toString());
    } else {
      if (duration > 60) {
        setDuration(60);
      }
      // Display value update kara
      setDisplayValue(duration.toString());
    }
  };
  useEffect(() => {
    if (yearsOrMonths === "Yr") {
      setDisplayValue(Math.floor(duration / 12).toString());
    } else {
      setDisplayValue(duration.toString());
    }
  }, [duration, yearsOrMonths]);
  //   testiminal function start
  const testimonials = [
    {
      name: "John Smith",
      role: "Marketing Director at XYZ Corp",
      image: "/user1.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
    {
      name: "Sarah Johnson",
      role: "Finance Consultant",
      image: "/user2.jpg",
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excellent service and support!",
    },
    {
      name: "Amit Verma",
      role: "Entrepreneur",
      image: "/user3.jpg",
      text: "AryseFin made my loan experience smooth and transparent. Quick approval and amazing customer care. Highly recommend!",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  // goto the landing page
  //  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();

  const handleApplyClick = () => {
    router.push("/personal-loan");
  };
  return (
    <div>
      {/* nav div start */}
      <div className={styles.navdiv}>
        <nav className={styles.nav1}>
          <div className={styles.logo}>
            <Link href="/">
              <Image src={logo} alt="Logo" width={100} height={100} />
            </Link>
          </div>

          {/* Right side - Hamburger */}
          <div className={styles.menuIcon} onClick={() => setIsOpen(true)}>
            <FaBars />
          </div>

          {/* Sidebar Menu */}
          <div className={`${styles.sidebar} ${isOpen ? styles.show : ""}`}>
            {/*show  cha w kadala*/}
            <div className={styles.closeIcon} onClick={() => setIsOpen(false)}>
              <FaTimes />
            </div>

            <ul className={styles.menuList}>
              {/* <li>About us</li> */}
              {/* <li>Apply for loan</li> */}
              {/* <li>Quick pay</li> */}
            </ul>

            <button className={styles.loginBtn}>
              <Link href="/loginpage">Log in</Link>
            </button>
            <div className={styles.heightDiv}></div>
            <div className={styles.socialIcons}>
              <div className={styles.infoAndIcon2}>
                <div className={styles.socialIconBack}>
                  <FaLinkedinIn className={styles.socialIconF} />
                </div>{" "}
                <div className={styles.socialIconBack}>
                  <FaFacebookF className={styles.socialIconF} />
                </div>
              </div>
            </div>
          </div>
          {/* Right side - Hamburger  end*/}

          <div className={styles.navLinks}>
            {/* <div>About us</div> */}
            {/* <div>Apply for loan</div> */}
            {/* <div>Quick pay</div> */}
            <button className={styles.loginButton}>
              <Link href="/loginpage">Log in</Link>
            </button>
          </div>
        </nav>
      </div>
      {/* nav div end */}
      {/* hero section div start */}
      <div className="">
        <section className={styles.heroSection2}>
          {/* Background Image */}
          <div className={styles.imageContainer}>
            <Image
              src={images[currentImage]}
              alt="Loan banner"
              // width={1200}
              // height={600}
              fill
              priority
              // className={styles.bgImage}
            />
          </div>

          {/* Text Content (Static) */}
          <div className={styles.textContent}>
            <h1>
              Smart, easy, reliable loans <br /> for evolving India.
            </h1>
            <h4>
              Loans up to ₹25 Lacs. Low interest rates. <br />
              Zero paperwork. Disbursal in only 24 hours.
            </h4>
            <button className={styles.applyBtn1} onClick={handleApplyClick}>
              Apply now
            </button>
          </div>
          {/* Star Dots */}
          <div className={styles.starDots}>
            {images.map((_, index) => (
              <div
                key={index}
                className={`${styles.star} ${
                  currentImage === index ? styles.activeStar : ""
                }`}
                onClick={() => handleDotClick(index)}
              ></div>
            ))}
          </div>
        </section>
        {/* <div className={styles.bigDiv}>
          <div className={styles.smallDiv} >
            <span>FESTIVE OFFER!</span> 5% off on full repayment amount*. Apply
            before 30th October 2025.
          </div>
        </div> */}
      </div>
      {/* hero section div end */}
      {/* section1 div start */}
      <div>
        <section className={styles.trustSection}>
          {/* Top 3 Cards */}
          <h2 className={styles.headingTrust}>Trust with Confidence</h2>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <Image
                src="/Digital_Surprise.png"
                alt="Safe, Sure, Swift"
                width={300}
                height={200}
                className={styles.cardImage}
              />
              <h4>Safe. Sure. Swift.</h4>
              <p>
                Fast & reliable approvals. <br />
                Money in your account within <br />
                24 hours.
              </p>
            </div>

            <div className={styles.card}>
              <Image
                src="/Relaxed.png"
                alt="Burden Free"
                width={300}
                height={200}
                className={styles.cardImage}
              />
              <h4>Burden Free & Transparent</h4>
              <p>
                No hidden charges. No heavy EMIs. <br />
                Crystal clear terms and repayments.
              </p>
            </div>

            <div className={styles.card}>
              <Image
                src="/Handshake.png"
                alt="Built on India's Trust"
                width={300}
                height={200}
                className={styles.cardImage}
              />
              <h4>Built on India&apos;s Trust</h4>
              <p>
                Built to support <br />
                every Indian&apos;s dreams <br />
                with trust.
              </p>
            </div>
          </div>

          {/* Second Section */}
          <div className={styles.commitSection}>
            <h2>
              Aryse Fin committed <br />
              <span>makes loans easy with trust</span>
            </h2>

            <div className={styles.iconRow}>
              <div className={styles.iconBox}>
                <div className={styles.icon}>
                  <Image
                    src="/Icons-01.png"
                    alt="icon 1"
                    width={100}
                    height={50}
                    className={styles.img}
                  />
                </div>
                <h4>
                  Stress Free Loans
                  <br /> with Reliability
                </h4>
                <p>
                  AryseFin works with India&apos;s
                  <br /> top lenders – NBFCs and
                  <br /> Banks – to remove
                  <br /> the stress from your loan.
                </p>
              </div>

              <div className={styles.iconBox}>
                <div className={styles.icon}>
                  <Image
                    src="/Icons-02.png"
                    alt="icon 2"
                    width={100}
                    height={50}
                  />
                </div>
                <h4>
                  Low Interest with <br />
                  Flexible Repayment Plans
                </h4>
                <p>
                  Rates from just 13% p.a.
                  <br /> Repay in 3–60 months. <br />
                  Easy, fair and fast.
                </p>
              </div>

              <div className={styles.iconBox}>
                <div className={styles.icon}>
                  <Image
                    src="/Icons-03.png"
                    alt="icon 3"
                    width={100}
                    height={50}
                  />
                </div>
                <h4>
                  Your Reliable <br />
                  Partner
                </h4>
                <p>
                  Grow your credit
                  <br /> profile, get higher
                  <br /> limits and unlock better
                  <br />
                  offers over time.
                </p>
              </div>

              <div className={styles.iconBox}>
                <div className={styles.icon}>
                  <Image
                    src="/Icons-04.png"
                    alt="icon 4"
                    width={100}
                    height={50}
                  />
                </div>
                <h4>
                  Built for Everyone,
                  <br /> Every Day
                </h4>
                <p>
                  You don&apos;t need a perfect
                  <br /> score. AryseFin helps real
                  <br />
                  people build real credit, <br />
                  every day.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className={styles.emiSection}>
          <h2 className={styles.heading}>Tools to help you decide</h2>

          {/*  */}
          <div className={styles.maincalculatorBox}>
            <div className={styles.calculatorHeading}>
              <h2>EMI Calculator</h2>
            </div>
            <div className={styles.calculatorBox}>
              <div className={styles.left}>
                {/* <h3>EMI Calculator</h3> */}

                {/* Loan Amount */}
                <div className={styles.inputGroup}>
                  <div className={styles.inputLable}>
                    <div>
                      <label>Loan amount</label>
                    </div>
                    <div className={styles.inputRow}>
                      <span> ₹</span>
                      <input
                        type="text"
                        value={amount.toLocaleString("en-IN")}
                        onChange={(e) => {
                          const value = e.target.value.replace(/,/g, "");
                          if (value === "" || !isNaN(value)) {
                            setAmount(value === "" ? 0 : Number(value));
                          }
                        }}
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="2000000"
                    step="10000"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className={styles.inputeRangeNew}
                  />
                </div>

                {/* Duration */}
                <div className={styles.inputGroup}>
                  <div className={styles.inputLable}>
                    <div>
                      <label>Loan duration</label>
                    </div>
                    <div className={styles.durationRow}>
                      {/* <input
                        type="number"
                        value={yearsOrMonths === "Yr" ? years || 1 : duration}
                        min={yearsOrMonths === "Yr" ? 1 : 6}
                        max={yearsOrMonths === "Yr" ? 5 : 60}
                        onChange={(e) => {
                          if (yearsOrMonths === "Yr") {
                            handleYearChange(e.target.value);
                          } else {
                            handleMonthChange(e.target.value);
                          }
                        }}
                      />  */}
                      <input
                        type="number"
                        // type="text"
                        value={displayValue === "" ? "" : displayValue} // Empty asel tar empty display honar
                        min={yearsOrMonths === "Yr" ? 1 : 6}
                        max={yearsOrMonths === "Yr" ? 5 : 60}
                        // Jeva user type karto
                        onChange={(e) => {
                          const value = e.target.value;

                          // 1. Display value update kara (empty pan accept kara)
                          setDisplayValue(value);

                          // 2. Jar valid number ahe tar actual duration update kara
                          if (value !== "" && !isNaN(value)) {
                            const numValue = parseInt(value, 10);

                            if (yearsOrMonths === "Yr") {
                              handleYearChange(numValue);
                            } else {
                              handleMonthChange(numValue);
                            }
                          }
                        }}
                        // Jeva user focus hatavato (click baher karto)
                        onBlur={(e) => {
                          const value = e.target.value;

                          // Jar empty ahe tar default value set kara
                          if (value === "" || isNaN(parseInt(value, 10))) {
                            if (yearsOrMonths === "Yr") {
                              setDuration(12);
                              setDisplayValue("1"); // 1 year display
                            } else {
                              setDuration(6);
                              setDisplayValue("6"); // 6 months display
                            }
                          } else {
                            // Valid value ahe tar properly display kara
                            if (yearsOrMonths === "Yr") {
                              setDisplayValue(
                                Math.floor(duration / 12).toString()
                              );
                            } else {
                              setDisplayValue(duration.toString());
                            }
                          }
                        }}
                      />
                      <div className={styles.toggleGroup}>
                        <button
                          className={`${styles.toggleBtn} ${
                            yearsOrMonths === "Yr" ? styles.activeToggle : ""
                          }`}
                          onClick={() => handleToggle("Yr")}
                        >
                          Yr
                        </button>
                        <button
                          className={`${styles.toggleBtn} ${
                            yearsOrMonths === "Mo" ? styles.activeToggle : ""
                          }`}
                          onClick={() => handleToggle("Mo")}
                        >
                          Mo
                        </button>
                      </div>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="60"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className={styles.inputeRangeNew}
                  />
                </div>

                {/* Interest */}
                <div className={styles.inputGroup}>
                  <div className={styles.inputLable}>
                    <div>
                      <label>Rate of interest</label>
                    </div>
                    <div className={styles.inputRow2}>
                      <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                      />
                      <span> %</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="30"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className={styles.inputeRangeNew}
                  />
                </div>
              </div>

              <div className={styles.right}>
                <p className={styles.emiText}>
                  Monthly EMI: <span>₹ {emi.toLocaleString()}*</span>
                </p>

                <div className={styles.chart}>
                  {/* /// */}
                  <div className={styles.chartContainer}>
                    <svg
                      width="140"
                      height="140"
                      viewBox="0 0 36 36"
                      className={styles.donutChart}
                    >
                      {/* Outer white ring */}
                      <circle
                        className={styles.circleBg}
                        cx="18"
                        cy="18"
                        r="13.915"
                        fill="none"
                        strokeWidth="6"
                      />

                      {/* Progress ring */}
                      <circle
                        className={styles.circleProgress}
                        cx="18"
                        cy="18"
                        r="13.915"
                        fill="none"
                        strokeWidth="6"
                        strokeDasharray={`${interestPercent}, 100`}
                        //   strokeDashoffset="25"
                      />
                    </svg>
                  </div>

                  <div className={styles.legend}>
                    <div className={styles.bottomInterest}>
                      <span className={styles.dot1}></span> Total Amount Payable
                    </div>
                    <div className={styles.bottomInterest2}>
                      <span className={styles.dot2}></span> Total Interest
                      Payable
                    </div>
                  </div>
                </div>

                <button className={styles.applyBtn} onClick={handleApplyClick}>
                  Apply now
                </button>
              </div>
            </div>
            {/*  */}
          </div>

          <p className={styles.disclaimer}>
            Disclaimer: The aforementioned values, calculations and results are
            for illustrative and informational purposes only and may vary basis
            various parameters laid down by Aryse Finance.
          </p>
        </div>
      </div>
      {/* section1 div end */}
      {/* section2 div start */}
      <div className={styles.testimonialSection}>
        {/* Trusted Section */}
        {/* <div className={styles.trustedContainer}>
          <h2>Trusted by thousands</h2>
          <div className={styles.stats}>
            <div>
              <h3>50,000+</h3>
              <p>Happy Customers</p>
            </div>
            <div>
              <h3>₹100 Cr+</h3>
              <p>Loans Disbursed</p>
            </div>
            <div>
              <h3>₹100 Cr+</h3>
              <p>Quick Approval</p>
            </div>
          </div>
        </div> */}

        {/* Testimonials Section */}
        {/* <div className={styles.reviewContainer}>
          <h2>What they say about us</h2>

          <div className={styles.slider}>
            {testimonials.map((item, index) => (
              <div
                key={index}
                className={`${styles.slide} ${
                  index === current ? styles.active : ""
                }`}
              >
                <div className={styles.bubble}>
                  <p>{item.text}</p>
                </div>
                <div className={styles.userInfo}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    className={styles.userImage}
                  />
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

           Navigation 
          <div className={styles.navigation}>
            <button onClick={prevSlide}>
              <FaArrowLeft />
            </button>
            <div className={styles.dots}>
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={i === current ? styles.activeDot : ""}
                ></span>
              ))}
            </div>
            <button onClick={nextSlide}>
              <FaArrowRight />
            </button>
          </div>
        </div> */}

        <div className={styles.middleWare}>
          <div className={styles.middleWareChild}>
            <div className={styles.middlewareGap}>
              <span className={styles.middlwwarespan}>
                Join the AryseFin family today
              </span>{" "}
            </div>{" "}
            <div>
              <button className={styles.applyBtn} onClick={handleApplyClick}>
                Apply now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* section2 div end */}
      {/* footer div start */}
      <footer className={styles.footer}>
        <div className={styles.footerParent}>
          {/* first */}
          <div className={styles.fistFooterSection}>
            <div className={styles.firstChild}>
              <Link href="/">
                <Image
                  src={logo2}
                  alt="Logo"
                  width={150}
                  height={150}
                  className={styles.footerIconAysefin}
                />
              </Link>
            </div>

            <div className={styles.firstChild}>
              <div className={styles.infoAndIcon}>
                <span className={styles.iconSapan1}>
                  <FaEnvelope className={styles.iconF} />
                </span>
                <span>
                  Email:{" "}
                  <a href="mailto:support@arysefin.com">support@arysefin.com</a>{" "}
                </span>
              </div>
              <div className={styles.infoAndIcon}>
                <span className={styles.iconSapan2}>
                  <FaPhoneAlt className={styles.iconF} />
                </span>
                <a href="tel:+020-4730-4552" className={styles.phoneLink}>
                  <span>Phone: +020-4730-4552</span>
                </a>
              </div>
              <div className={styles.infoAndIcon}>
                <span className={styles.iconSapan}>
                  <FaMapMarkerAlt className={styles.iconF} />
                </span>
                <span>
                  Office No. 7 to 12, 7th Floor,
                  <br /> Tower B,Downtown City Vista,
                  <br /> Survey Number 58/2, <br />
                  Fountain Road,Kharadi <br />
                  Pune MH 411014 IN
                </span>
              </div>
              {/* <div className={styles.infoAndIcon2}>
                <div className={styles.socialIconBack}>
                  <FaLinkedinIn className={styles.socialIconF} />
                </div>{" "}
                <div className={styles.socialIconBack}>
                  <FaFacebookF className={styles.socialIconF} />
                </div>
              </div> */}
            </div>

            <div className={styles.firstChild}>
              <div className={styles.contactLink}>
                <Link href="/support">Contact Us</Link>
              </div>
              <div className={styles.contactLink}>
                <Link href="/lenderpage">Responsible Lending</Link>
              </div>
              <div className={styles.contactLink}>
                <Link href="/acquisition_partners">Acquisition partners</Link>
              </div>
              <div
                className={styles.contactLink}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                style={{ cursor: "pointer" }}
              >
                Sitemap
              </div>
            </div>

            <div className={styles.firstChild}>
              {/* <div className={styles.contactLink}>Legal</div> */}
              <div className={styles.contactLink}>
                <Link href="/TermAndCondition">Terms & Conditions</Link>
              </div>
              <div className={styles.contactLink}>
                <Link href="/PrivacyAndPolicy">Privacy Policy</Link>
              </div>
              <div className={styles.contactLink}>
                <Link href="/Grievance">Grievance Redressal</Link>
              </div>
              <div className={styles.contactLink}>
                <a href="https://sachet.rbi.org.in/" rel="noopener noreferrer">
                  RBI Sachet Portal
                </a>
              </div>
            </div>
          </div>
          {/* seconde */}
          <div className={styles.fistFooterSection2}>
            <div className={styles.firstChild2}></div>
            <div className={styles.firstChild2}>
              <div className={styles.infoAndIcon2}>
                <div className={styles.socialIconBack}>
                  <a
                    href="https://www.linkedin.com/company/arysefin/about/?viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedinIn className={styles.socialIconF} />
                  </a>
                </div>{" "}
                <div className={styles.socialIconBack}>
                  <a
                    href="https://www.facebook.com/profile.php?id=61580792857656"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF className={styles.socialIconF} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* last */}
          <div className={styles.lastChild}>
            © 2025 Arysefin. All Rights Reserved.
          </div>
        </div>
      </footer>
      {/* footer div end */}
    </div>
  );
}

export default Newhomepage;

{
  /* <div className={styles.topSection}>
          <div className={styles.logoSection}>
            <h2 className={styles.logo}>
              <span>ARYSE</span> Fin
            </h2>
            <p>
              <FaEnvelope className={styles.icon} /> Email: hello@arysefin.com
            </p>
            <p>
              <FaPhoneAlt className={styles.icon} /> Phone: +91 99999 99999
            </p>
            <p>
              <FaMapMarkerAlt className={styles.icon} /> Address: 1234 Main St
              <br />
              Moonstone City, Gurgaon 12345
            </p>

            <div className={styles.socialIcons}>
              <FaLinkedinIn />
              <FaFacebookF />
              <FaTwitter />
            </div>
          </div>

          <div className={styles.linkSection}>
            <div>
              <h4>Company</h4>
              <ul>
                <li>Contact Us</li>
                <li>FAQ</li>
                <li>Responsible Lending</li>
                <li>Sitemap</li>
              </ul>
            </div>

            <div>
              <h4>Legal</h4>
              <ul>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
                <li>Grievance Redressal</li>
                <li>Corporate Social Responsibility Policy</li>
                <li>Security Centre</li>
                <li>Corporate Information</li>
              </ul>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.middleSection}>
          <div className={styles.column}>
            <h4>Type of Personal Loans</h4>
            <p>
              Instant Loan | Fast Cash Loan | EMI without Credit Card | Personal
              Loan for Proprietorship | Personal Loan for Surgery | Personal
              Loan for Hair Transplant | Personal Loan for Chartered Accountants
              | Personal Loan for Teachers | Low Credit Score | Private Loans |
              Quick Loans | Personal Loan for Women | Small Loan | Money Loan |
              Business Loan | Loan Against Property
            </p>
          </div>

          <div className={styles.column}>
            <h4>Personal Loans by Amount</h4>
            <p>
              ₹ 10,000 Personal Loan | ₹ 15,000 Personal Loan | ₹ 20,000
              Personal Loan | ₹ 25,000 Personal Loan | ₹ 30,000 Personal Loan |
              ₹ 50,000 Personal Loan | ₹ 1 Lakh Personal Loan | ₹ 2 Lakh
              Personal Loan | ₹ 5 Lakh Personal Loan
            </p>
          </div>

          <div className={styles.column}>
            <h4>Loan for Personal Needs</h4>
            <p>
              Personal Loan For Travel | Personal Loan For Medical Emergency |
              Personal Loan For Shopping | Personal Loan For Maternity |
              Personal Loan For Hobbies | Personal Loan For Occasion | Personal
              Loan For Gifting | Personal Loan For Opportunity | Personal Loan
              For Low Salary | Personal Loan For Wedding | Personal Loan For
              Education | Two Wheeler Loan
            </p>
          </div>

          <div className={styles.column}>
            <h4>Loans by Location</h4>
            <p>
              Personal Loan In Bangalore | Personal Loan In Kolkata | Personal
              Loan In Jaipur | Personal Loan In Coimbatore | Personal Loan In
              Ahmedabad | Personal Loan In Delhi | Personal Loan In Mumbai |
              Personal Loan In Chennai | Personal Loan In Hyderabad | Personal
              Loan In Pune | Personal Loan In Surat | Personal Loan In Indore |
              Personal Loan In Vadodara
            </p>
          </div>

          <div className={styles.column}>
            <h4>Bank EMI Calculators</h4>
            <p>
              HDFC Loan EMI Calculator | SBI Loan EMI Calculator | Axis Loan EMI
              Calculator | Canara Loan EMI Calculator | ICICI Loan EMI
              Calculator | BOI Loan EMI Calculator | Kotak Loan EMI Calculator |
              PNB Loan EMI Calculator | IndusInd Loan EMI Calculator
            </p>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.locationButtons}>
            <button className={`${styles.btn} ${styles.active}`}>East ⬆</button>
            <button className={styles.btn}>West ⬇</button>
            <button className={styles.btn}>North ⬇</button>
            <button className={styles.btn}>South ⬇</button>
          </div>

          <p className={styles.cities}>
            Kolkata | Howrah | Agartala | Bhubaneswar | Shillong | Guwahati |
            Gwalior | Jabalpur
          </p>
          <hr className={styles.divider} />
          <p className={styles.copy}>© 2025 Arysefin. All Rights Reserved.</p>
        </div> */
}
