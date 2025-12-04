// pages/grievance.js or components/GrievancePage.js
import styles from './GrievancePage.module.css';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/arysefin-dark logo.png';
import {useState } from "react";
import {FaBars, FaInstagram, FaFacebookF, FaLinkedinIn, FaTimes, FaFacebook, FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import logo2 from "../../../public/arysefin-white logo.png";
import ondclogo from '../../../public/ondcW_logo.png';
export default function GrievancePage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
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
    <div className={styles.container}>
      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.content}>
          {/* Title */}
          <h1 className={styles.title}>
            GRIEVANCE REDRESSAL PROCESS OF <br />
            <span className={styles.companyNameheading}>ARYSEFIN</span>

          </h1>

          {/* Introduction */}
          <p className={styles.intro}>
            We aim to delight our customers and work hard to make sure that
            we help our customers avail the best credit solutions from our
            vast network of lending partners. However we understand that
            even with our best efforts we may get it wrong some times. If you
            have a complaint or would like us to address any concerns please
            reach out to us at <a href="mailto:support@arysefin.com" className={styles.atag}>support@arysefin.com</a>  or send a letter to -
          </p>

          {/* Company Info */}
          <div className={styles.companyInfo}>
            <h2 className={styles.companyName}>
              VIBHUPRADA SERVICES PRIVATE LIMITED
            </h2>

            <div className={styles.address}>
              <p>Office No. 7 to 12, 7th Floor, Tower B,</p>
              <p>Downtown City Vista, Survey Number 58&#47;2,</p>
              <p>Fountain Road,</p>
              <p>Kharadi Pune MH 411014 IN.</p>
            </div>
          </div>

          {/* Escalation Process */}
          <div className={styles.escalation}>
            <h3 className={styles.escalationTitle}>Escalation process:</h3>
            <p className={styles.escalationText}>
              If your query&#47;complaint has not been addressed
              within 7 working days; please reach out to our Grievance Redressal
              Officer as provided below -
            </p>
          </div>

          {/* Grievance Officer Details */}
          <div className={styles.grievanceOfficer}>
            <h3 className={styles.officerTitle}>
              Grievance Redressal Officer: <span className={styles.officerName}>Monika Kaushik</span>
            </h3>

            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <span className={styles.label}>Tel:</span>
                <span className={styles.value}>020-4730-4552</span>
              </div>

              <div className={styles.contactItem}>
                <span className={styles.label}>Email id:</span>
                <span className={styles.value}><a href="mailto:support@arysefin.com" className={styles.atag}>support@arysefin.com</a> </span>
              </div>

              <div className={styles.contactItem}>
                <span className={styles.label}>Designation:</span>
                <span className={styles.value}>GRO</span>
              </div>

              <div className={styles.contactItem}>
                <span className={styles.label}>Office address:</span>
                {/* <span className={styles.value}>HO</span> */}
                <div className={styles.address}>
                  <p>Office No. 7 to 12, 7th Floor, Tower B,</p>
                  <p>Downtown City Vista, Survey Number 58&#47;2,</p>
                  <p>Fountain Road,</p>
                  <p>Kharadi Pune MH 411014 IN.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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
    </div>
    </>
  );
}