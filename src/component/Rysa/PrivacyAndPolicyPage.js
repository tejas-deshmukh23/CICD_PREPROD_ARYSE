import React from "react";
import styles from "./PrivacyAndPolicyPage.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaBars, 
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTimes,
  FaFacebook,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logo2 from "../../../public/arysefin-white logo.png";
import logo from "../../../public/arysefin-dark logo.png";
import ondclogo from "../../../public/ondcW_logo.png";
const TermAndCondition = () => {
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
        <main className={styles.main}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              PRIVACY AND SECURITY POLICY OF
              <br />
              <span className={styles.companyName}>ARYSEFIN</span>
            </h1>

            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>INTRODUCTION&#58;</h2>
              <p className={styles.paragraph}>
                Vibhuprada Services Private Limited (&ldquo;Aryse&rdquo;,
                &ldquo;AryseFin&rdquo;, &ldquo;We&rdquo;, &ldquo;Us&rdquo;,
                &ldquo;Our&rdquo;) is the owner of the website
                (&ldquo;Arysefin.com&rdquo;) (&ldquo;Website&rdquo;), including
                any other application or software run under the brand name
                &ndash; &lsquo;Aryse&rsquo;,
              </p>

              <p className={styles.paragraph}>
                &lsquo;AryseFin&rsquo; (&ldquo;AryseFin&rdquo;) (Website and
                AryseFin are hereinafter collectively referred to as
                &ldquo;Platform(s)&rdquo;). AryseFin
              </p>

              <p className={styles.paragraph}>
                (&ldquo;i&rdquo;) connects borrowers with its affiliates,
                financing partners, third-party service providers and lenders or
                their lending service providers (&ldquo;Third
                Party(ies)&rdquo;); and
              </p>

              <p className={styles.paragraph}>
                (&ldquo;ii&rdquo;) monitors the loans (collectively referred to
                as &ldquo;Services&rdquo;). This privacy policy
                (&ldquo;Policy&rdquo;) discloses the practices and policies
                adopted by AryseFin while accessing, collecting, storing,
                retrieving, disclosing, transferring, or using information it
                may receive from its users (&ldquo;You&rdquo;,
                &ldquo;Your&rdquo;, &ldquo;Customer&rdquo;) who access/ use the
                Portal(s) (defined below) to receive the Services. Capitalised
                terms used but not defined in this Policy shall have the meaning
                as set out in AryseFins{" "}
                <a href="https://fe.getrysa.com/Rysa" className={styles.atag}>
                  Terms and Conditions
                </a>
                .
              </p>

              <p className={styles.paragraph}>
                This Policy is published in accordance with the applicable
                provisions of law, including the Information Technology Act,
                2000 (&ldquo;IT Act&rdquo;) and the rules made thereunder, and
                the Guidelines on Digital Lending issued by the Reserve Bank of
                India dated September 2, 2022 (&ldquo;DLG&rdquo;).
              </p>

              <p className={styles.paragraph}>
                We request you to go through this Policy and the
                <a
                  href="https://fe.getrysa.com/TermAndCondition"
                  className={styles.atag}
                >
                  Terms and Conditions
                </a>{" "}
                carefully before you decide to access/use the Portals (defined
                below) and receive the Services.
              </p>

              <p className={styles.paragraph}>
                We encourage You to familiarize yourself with Our Policy and let
                Us know if You have any further questions.
              </p>

              <p className={styles.paragraph}>
                Please note that AryseFin reserves the right in its sole
                discretion to remove any content or data, information or
                material it shares on the Portals, from time to time.
              </p>

              <p className={styles.paragraph}>
                The information received from You while accessing/ using the
                Portals (defined below) through the <br />
                (&ldquo;i&rdquo;) Website; <br />
                (&ldquo;ii&rdquo;) AryseFin/Aryse; or <br />
                (&ldquo;iii&rdquo;) other facilities, including the AryseFin
                call-center facility (&ldquo;IVR&rdquo;) (Website, AryseFin and
                IVR are collectively referred to as the &ldquo;Portal(s)&rdquo;)
                will be utilised in a manner as set out in this Policy.
              </p>
            </div>
            {/* 2 div */}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>
                INFORMATION WE COLLECT&#58;
              </h2>
              <p className={styles.paragraph}>
                To register as a user on the Platforms, You will be required to
                provide Us with information about yourself, required as part of
                Our Customer identification and Customer due diligence process.{" "}
                <br />
                <br />
                The Platforms may access, collect, store, use, disclose or
                transfer the information required to provide You with customized
                services and You have explicitly consented to the same. <br />
                <br />
                Such information may include (but not limited to) Your name,
                mailing address, phone number, PAN card details, Aadhaar card
                details, employment information, financial information such as
                bank account etc., references of friends/family members. <br />
                <br />
                The Platforms may also access, collect, store, use, disclose or
                transfer the following information about You and by clicking/
                confirming on the consent screen on the Platforms, You have
                explicitly consented to the same. <br />
                <br />
                Account Information: Self-declared information like referral
                code, email, photo, address proof and identity proof.
                Additionally, for availing loans/ credit facilities with the
                Third Parties: <br />
                <br />
                Salaried individuals may have to provide: Employment details
                like company name, salary slip/offer letter on case-to-case
                basis, and the company email ID; <br />
                <br />
                Self-employed individuals may have to provide: Self-employment
                details such as profession, work location, monthly income,
                Income Tax Return details (ITR). <br />
                <br />
                SMS: We may access Your transactional SMS to provide relevant
                services/ offers/ rewards basis Your consumption pattern and to
                facilitate the credit assessment to be undertaken by the Third
                Parties. You may have restricted access to the Platforms and the
                related services available on the Platforms, if You disable/
                withdraw/ do not provide this access. <br />
                <br />
                Camera Access: We require access to Your mobile device camera
                for clicking Your selfie and to enable You to upload photos/
                videos for KYC compliance and/ or for uploading any other
                necessary documents on the Platforms as part of Our on-boarding/
                KYC compliance function. You may have restricted access to the
                Platform and the related services available on the Platform, if
                You disable/ withdraw/ do not provide this access. <br />
                <br />
                Location: We may access and monitor Your location to verify Your
                current address, to ensure/ check, serviceability of Our
                Services, and to prevent any fraudulent activity. We collect the
                location data from You in two ways: (i) on the basis of
                information provided at the time of on-boarding; and (ii) from
                Your mobile device when enabled by You to do so. We access this
                data only when Our Platforms are being used. You may have
                restricted access to the Platforms and the related services
                available on the Platforms, if You disable/ withdraw/ do not
                provide this access. <br />
                <br />
                Contact: We may periodically access Your contact(s) information
                to facilitate the credit assessment to be undertaken by the
                Third Parties and to provide You with access to additional
                features on the Platforms. We will not under any circumstance
                call or reach out to any of Your contacts for any matter related
                to Our Services. You may have restricted access to the Platforms
                and related services available on the Platforms, if You disable/
                withdraw/ do not provide this access. <br />
                <br />
                Device Data: When You browse Our Platforms, We may automatically
                receive Your device internet protocol (IP) address. This helps
                Us learn about Your browser and operating system, software, the
                date and time at which You visited the Platforms, the type of
                device being used (including the hardware models). This helps Us
                detect and prevent fraud. You may have restricted access to the
                Platforms and the related services available on the Platforms,
                if You disable/ withdraw/ do not provide this access. <br />
                Files/ Media: We may require access to Your files/ media folder
                so that Your documents can be securely downloaded and saved on
                Your phone, and so You can upload any required documents easily
                for quicker approval and disbursal of loan/ credit facility.
                This helps in providing a smooth and seamless experience while
                using the Platforms. We will not store any files from Your
                storage. We can only access the files You select in the folder.
                We may access only the metadata for the purpose of providing You
                with seamless access to loan/ credit facility. You may have
                restricted access to the Platforms and the related services
                available on the Platforms, if You disable/ withdraw/ do not
                provide this access. <br />
                <br />
                Third party information: We may share the aforementioned
                information for the purposes mentioned above, in accordance with
                applicable legal requirements for lawful business purposes of
                AryseFin or when it is necessary for the performance of the
                legal contract/ agreement to which You are a party. We work
                closely with other entities, including, financial institutions,
                credit information bureaus, account aggregators, business
                partners, technical sub-contractors, analytics providers, search
                information providers, etc. and may lawfully receive information
                about You from such sources. Such information/ data may be
                combined with information/ data collected on the Platforms to
                provide You with a customised user experience. <br />
                <br />
                The aforementioned information, as provided by You, accessed
                from Your device or received from the aforementioned third
                parties, is hereinafter collectively referred to as “Collected
                Information”. Please note that We may require You to share
                further information, at a later date, to confirm the veracity of
                Your Collected Information or pursuant to any additional
                features added to the Platforms or for compliance with
                applicable law. <br />
                <br />
                All the information that You provide to Us is voluntary,
                including the sensitive/ personal information, forming part of
                the Collected Information. You understand that We may use the
                Collected Information, including such Collected Information
                which may be designated as ‘sensitive personal data or
                information’ under the IT Act and the rules made thereunder, for
                the purpose of providing You the Services in accordance with the
                terms of this Policy for which You have provided Your consent.
                We shall use the Collected Information, in a way that is
                compatible with and relevant for the purpose for which it was
                collected, as set out in this Policy, or authorized by You.{" "}
                <br />
                <br />
                We are and will be in compliance with the applicable
                requirements stipulated under the Prevention of Money-Laundering
                Act, 2002 and its rules, including the Prevention of
                Money-Laundering (Maintenance of Records) Rules, 2005, as may be
                amended from time to time. It is further clarified that, Your
                information, if shared by Us within Our group, subject to
                compliance with applicable laws, for the purposes of client due
                diligence and money laundering and terror finance risk
                management, will be undertaken keeping in mind adequate
                safeguards on the confidentiality and use of information
                exchanged, including safeguards to prevent tipping-off. <br />
                <br />
                For users who have registered to be on the mailing list, their
                Collected Information is kept until We are notified that they no
                longer want their information stored. Customers who supply Us
                with their telephone numbers may receive communication from Us
                via telephone, RCS, WhatsApp, text message or emails, pertaining
                exclusively to new Services or any upcoming events. If You do
                not wish to be on Our mailing list/SMS/WhatsApp or any other
                advertisement, You can let Us know of Your updated preferences
                by either emailing Us at{" "}
                <a href="mailto:support@arysefin.com" className={styles.atag}>
                  support@arysefin.com
                </a>{" "}
                or choosing “unsubscribe” option or the prescribed option.{" "}
                <br />
                <br />
                If You are no longer interested in sharing the Collected
                Information, please e-mail Your request at:{" "}
                <a href="mailto:support@arysefin.com" className={styles.atag}>
                  support@arysefin.com
                </a>
                . Please note that it may take up to 72 (seventy-two) business
                hours to process Your request. Further, please note that there
                might be latency in deleting/ forgetting the Collected
                Information from Our servers and certain backed-up versions
                might exist even after deletion. <br />
                <br />
                Notwithstanding anything contained herein, please note that
                AryseFin will continue to retain Collected Information provided
                by You (a) until You specifically request AryseFin to destroy
                such Collected Information or (b) for as long as Your
                registration with Us is valid and the outstanding amount(s) in
                respect of the loan(s) availed by You are due and payable to the
                Third Party or (c) for such period as may be necessary to comply
                with applicable laws or regulations or (d) till final
                settlement/ outcome of any disputes with You or the Third Party,
                as the case may be or (e) to enforce/ exercise Our rights under
                the contract/ agreements entered into between Us and You/ the
                Third Party.
              </p>
            </div>

            {/* 3div */}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>DISCLOSURES&#58;</h2>
              <p className={styles.paragraph}>
                We will share Your Collected Information internally with those
                staff members of AryseFin who need it to carry out Your
                instructions regarding the receipt of marketing information,
                loan/credit facility processing, and recovery of loan/credit
                facilities. <br /> <br />
                Any personal information, forming part of the Collected
                Information, may be used to allow You to log in to Your account
                or to resolve specific service issues, inform You of Our new
                Services/features, for IVR verification, or to communicate with
                You in relation to Your use of the Platforms. Other information,
                forming part of the Collected Information, may be used for-{" "}
                <br />
              </p>
              <ol className={styles.orderedList} start="1">
                <li>
                  Our business purposes, which may include the viewing or
                  advertising of services or related services;
                </li>
                <li>Analytical purposes, data usage;</li>
                <li>Improving the Platforms, or Your user experience;</li>
                <li>Providing targeted advertisements to You.</li>
              </ol>
              <br />
              <p className={styles.paragraph}>
                We may share Collected Information with Third Parties, credit
                bureaus, call centres, payment gateways, authorised service
                providers, payment transaction processors, or law enforcement
                agencies for the purposes mentioned in this Policy or if it is
                to help investigate, prevent, or take action regarding unlawful
                and illegal activities, suspected fraud, a potential threat to
                the safety or security of any Customer, or as a defense against
                legal claims. <br />
                <br />
                We will keep the Collected Information confidential and limit
                access to those who specifically need it to conduct their
                business activities, except as otherwise permitted by applicable
                law. <br />
                <br />
                The Collected Information may be transferred to any destination
                within and/or outside India, to the extent permitted as per
                applicable law in force. Examples include delivering e-mails,
                analysing data, providing marketing assistance, providing search
                results and links (including paid listings and links), and
                providing Customer service. <br />
                <br />
                To clarify, AryseFin may disclose Your Collected Information,
                without obtaining Your prior consent, in the following cases:{" "}
                <br />
              </p>
              <ol className={styles.orderedList} start="1">
                <li>
                  In the event it is required to do so by law, rule, regulation,
                  governmental, legal or regulatory authorities, and statutory
                  bodies, who have appropriate authorisation to access the same
                  for any specific legal purposes;
                </li>
                <li>
                  For compliance with any judgment, decree, or order issued
                  under any law in force in India, or any judgment or order
                  relating to claims of a contractual or civil nature under any
                  law in force outside India;
                </li>
                <li>
                  If agreed by You under the contract entered into between You
                  and AryseFin;
                </li>
                <li>
                  For any other purposes required for the purposes set out under
                  this Policy.
                </li>
              </ol>
              <br />
              <p className={styles.paragraph}>
                Any Third Party to whom such Collected Information is divulged,
                shall be subject to a duty of confidentiality, and will be
                required to comply with and take appropriate security measures
                to protect Your Collected Information, in line with applicable
                laws. <br />
                <br />
                This Policy only addresses the use and disclosure of information
                We collect from You on the Platforms. Other websites/apps that
                may be accessible through the Platforms have their own privacy
                policies and data collection, use, and disclosure practices. If
                You click on the link to any such website/app, We urge You to
                review that website’s/app’s privacy policy. We are not
                responsible for the policies or practices of third parties.{" "}
                <br />
                <br />
                <span className={styles.spans}>COOKIES</span>
                <br />
                <br />
                We may set cookies to track Your use of the Portals. These are
                used to enhance Your experience while accessing Our Platforms.
                We use cookies to help Us identify who You are, so Your login
                experience is smooth each time. Cookies also allow Us to collect
                non-personally identifiable information about You, such as which
                pages You visit and which links You click on. Use of this
                information helps Us create a more user-friendly experience for
                all visitors. Please note that if You decline or delete these
                cookies, it may affect the services provided by Us.
              </p>
            </div>
            {/* 3rd div */}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>ADVERTISER&#58;</h2>
              <p className={styles.paragraph}>
                We may use Third Party advertisers to display advertisements on
                Our Platforms. <br />
                In order to provide and improve Our Services and to share
                relevant ads with You, We use and disclose to Our advertising
                and analytics partners non-personally identifiable information
                that We collect, including cookie data, log data, and mobile
                data. <br />
                <br />
                These third-party websites/advertisers/internet advertising
                companies sometimes use technology to send or provide data that
                appears on the Platforms. They automatically receive Your IP
                address when that happens. <br />
                <br />
                They may also use cookies, JavaScript, web beacons, and other
                technologies to measure the effectiveness of their
                advertisements and to personalize content, for which We are not
                responsible, including in respect of the advertisement,
                information, or content contained therein or the privacy
                practices employed by them. Please contact them directly for
                more information about their privacy policies and practices.
              </p>
            </div>
            {/*4 div*/}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>BUSINESS TRANSFERS&#58;</h2>
              <p className={styles.paragraph}>
                As We continue to develop Our Services and business, We might
                sell Our business units. <br />
                <br />
                In such transactions, Collected Information is generally one of
                the transferred business assets, but remains subject to the
                terms of the pre-existing policy(ies).
              </p>
            </div>
            {/* 5 div */}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>SECURITY INFORMATION&#58;</h2>
              <p className={styles.paragraph}>
                You can access Your personal identity details/information on Our
                Platform through Your login credentials. <br />
                <br />
                We recommend that You do not share Your login credentials with
                anyone. <br />
                <br />
                Your Collected Information is stored on a secure server located
                in India, that only selected personnel, contractors, and
                authorised agencies have access to. We encrypt certain Collected
                Information using Secure Socket Layer technology to ensure that
                such Collected Information is safe as it is transmitted to Us.{" "}
                <br />
                <br />
                Notwithstanding the aforesaid, You understand and accept that no
                data/information transmission over the internet can be
                guaranteed to be completely secure. We cannot ensure or warrant
                the security of any information that You transmit to Us, and You
                do so at Your own risk. Data pilferage due to unauthorized
                hacking, virus attacks, or technical issues is possible, and We
                take no liabilities or responsibilities for it.
              </p>
            </div>
            {/* 6 div */}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>GENERAL MATTERS&#58;</h2>
              <p className={styles.paragraph}>
                The authenticity and accuracy of the Collected Information
                submitted by You is Your responsibility. <br />
                <br />
                You are responsible for maintaining the secrecy, authenticity,
                and accuracy of Your password, email address, and Collected
                Information submitted by You at all times. <br />
                <br />
                AryseFin relies on You to disclose all relevant and accurate
                Collected Information and to inform AryseFin of any changes in
                respect of the Collected Information submitted by You. <br />
                <br />
                If You wish to make a request to correct or update any of the
                Collected Information submitted by You, You may submit Your
                request via email at{" "}
                <a href="mailto:support@arysefin.com" className={styles.atag}>
                  support@arysefin.com
                </a>
                .
              </p>
            </div>
            {/* 7div */}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>SECURITY&#58;</h2>
              <p className={styles.paragraph}>
                We value Your online privacy and security while using the
                Platforms and receiving the Services available on the Platforms.{" "}
                <br />
                <br />
                We make every effort to ensure that the Collected Information
                submitted by You will not be misused. Our security measures and
                practices are in compliance with applicable laws, and We shall
                continue to do so in the future. <br />
                <br />
                Notwithstanding the aforesaid, We cannot absolutely guarantee
                the protection of the Collected Information submitted by You.
              </p>
            </div>
            {/* 8div */}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>CONFIDENTIALITY&#58;</h2>
              <p className={styles.paragraph}>
                AryseFin will take such steps as it considers necessary to
                ensure that Your Collected Information is treated securely and
                in accordance with this Policy. <br />
                <br />
                Notwithstanding the above, We are not responsible for the
                confidentiality, security, or distribution of the Collected
                Information by Our employees, partners, agents, and Third
                Parties outside the scope of Our agreement/contract with such
                employees, partners, agents, and Third Parties. <br />
                <br />
                Further, We shall not be responsible for any breach of security
                or for any actions of any third parties or events that are
                beyond Our reasonable control, including computer hacking,
                unauthorized access to computer data and storage device,
                computer crashes, breach of security and encryption, poor
                quality of internet service, or telephone service of the user,
                etc.
              </p>
            </div>
            {/* 9div */}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>CONSENT REVOCATION&#58;</h2>
              <p className={styles.paragraph}>
                You may, at any time while using Our services or otherwise,
                withdraw the consent previously given to Us for receiving,
                analysing, and securely storing Your personal data and credit
                information from Credit Information Companies, also known as
                &ldquo;Credit Bureaus&rdquo; (such as Equifax, Experian,
                TransUnion CIBIL, or CRIF), by emailing Us at{" "}
                <a href="mailto:support@arysefin.com" className={styles.atag}>
                  support@arysefin.com
                </a>
                . The request must be sent from Your registered email address.
                <br />
                <br />
                Upon receiving and verifying Your consent withdrawal request, We
                will permanently delete any credit history and related data
                obtained from Credit Information Companies that is stored with
                Us. <br />
                <br />
                Please note that withdrawing consent will result in Your
                inability to continue using AryseFin&rsquo;s services. To resume
                services, You will need to log in again and provide fresh
                consent.
              </p>
            </div>
            {/* 10div */}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>CONTACT US&#58;</h2>
              <p className={styles.paragraph}>
                If You have any questions or suggestions, You can contact Us at
                <a href="mailto:support@arysefin.com" className={styles.atag}>
                  support@arysefin.com
                </a>{" "}
                or write to Us at the following address:
              </p>

              <ol className={styles.orderedList} start="1">
                <li>
                  Principal Officer
                  <br />
                  Vibhuprada Services Private Limited
                  <br />
                  Office No. 07 to 12, 7th Floor, Tower B, Downtown City Vista,
                  <br />
                  Survey Number 58/2, Fountain Road, Kharadi, Pune,
                  <br />
                  Pune, MH 411014, India
                </li>
                <li>Grievance Redressal Mechanism;</li>
              </ol>

              <p className={styles.paragraph}>
                If You have any complaints under this Policy or under the IT Act
                and the rules made thereunder, the DLG, or any FinTech/digital
                lending-related complaints/issues, You can reach out to Us by
                following the procedure listed under Our grievance redressal
                mechanism at
                <a href="mailto:support@arysefin.com" className={styles.atag}>
                  support@arysefin.com
                </a>
                .
              </p>
            </div>
            {/* 11 div  */}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>DISPUTE RESOLUTION&#58;</h2>
              <p className={styles.paragraph}>
                In the event of any dispute, difference, or claim arising out of
                this Policy, the same shall be settled in accordance with the
                laws of India through the regular judicial process, and the
                courts of Pune, India shall have exclusive jurisdiction.
              </p>
            </div>
            {/* 12 div */}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>CONSENT TO THIS POLICY:</h2>
              <p className={styles.paragraph}>
                We keep the Policy under regular review and may update the same
                to reflect changes to Our privacy procedures and practices. We
                encourage You to periodically review this Policy for the latest
                information on Our privacy procedures and practices. <br />
                <br />
                Your continued use and accessing of Our Platforms will be taken
                as Your acceptance of this Policy or any updated version of this
                Policy.
              </p>
            </div>
            {/* last div */}
            <div className={styles.policyContent}>
              <p className={styles.paragraph}>
                By having consented to the terms of this Policy, You hereby
                provide express consent to AryseFin to access, collect, share,
                transfer, store, retain, or use the Collected Information in
                accordance with the terms of this Policy.
              </p>
              <p className={styles.paragraph}>
                Last update date: 15<sup>th</sup> Aug, 2025
              </p>
            </div>

            {/* </div> */}
          </div>
        </main>
        {/* footer */}
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
};

export default TermAndCondition;
