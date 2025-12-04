import React from "react";
import styles from "./TermAndConditionPage.module.css";
import Image from "next/image";
import logo from "../../../public/arysefin-dark logo.png";
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
import Link from "next/link";
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
              TERMS &amp; CONDITION OF
              <br />
              <span className={styles.companyName}>ARYSEFIN</span>
            </h1>
            {/* 2 div */}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>GENERAL TERMS OF USE&#58;</h2>
              <p className={styles.paragraph}>
                This agreement sets forth the terms and conditions that apply to
                the access and use of the Website &quot;
                <a href="https://fe.getrysa.com" className={styles.atag}>
                  arysefin.com
                </a>
                &quot; and its Mobile site (collectively be referred to as
                &quot;Website&quot;/&quot;Platform&quot;), which is managed and
                operated by Vibhuprada Services Private Limited, (hereinafter
                collectively be referred to as &quot;Company&quot;/
                &quot;AryseFin&quot; / &quot;Aryse&quot;), incorporated under
                the laws of India and registered under the Companies Act, 2013.
                <br />
                <br />
                This document/agreement/understanding is a computer-generated
                electronic record published in terms of Rule 3 of the
                Information Technology (Intermediaries Guidelines) Rules, 2011
                read with Information Technology Act, 2000 and does not require
                any physical or digital signatures.
                <br />
                <br />
                Before you may use the Website, you must read all of these
                General Terms of Use (&quot;Terms&quot;) herein and the Privacy
                Policy provided on the Website. By using AryseFin&#39;s
                products, software, services, and the Website or by availing any
                products offered by AryseFin&#39;s partner institutions or third
                parties (&quot;Services&quot;), you understand and agree that
                AryseFin will treat your use of the Services as acceptance of
                these Terms from such point of usage. You may not use the
                Services if you do not accept the Terms. If you do not agree to
                be bound by these Terms and the Privacy Policy, you may not use
                the Website in any way. It is strongly recommended for you to
                return to this page periodically to review the most current
                version of the Terms in force. AryseFin reserves the right at
                any time, at its sole discretion, to change or otherwise modify
                the Terms without prior notice, and your continued access or use
                of this Website signifies your assent/ratification of the
                updated or modified Terms. If you object to these Terms or any
                subsequent modifications to these Terms in any way, your only
                recourse is to immediately terminate use of the Website. We may
                require you to agree to additional terms (if any) between you
                and AryseFin in connection with specific services that you may
                avail from time to time. The service provided by AryseFin
                through the Website is available and appropriate only for use in
                India.
              </p>
            </div>

            {/* 3div */}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>USAGE OF THE WEBSITE&#58;</h2>
              <p className={styles.paragraph}>
                The website is intended for personal and non-commercial use. You
                shall register to become a member of the Website only if you are
                of the age of 18 or above and can enter into binding contracts
                as per applicable laws. You are responsible for maintaining the
                secrecy of your passwords, login and account information. You
                will be responsible for all use of the Website by you and anyone
                using your password and login information (with or without your
                permission).
                <br />
                <br />
                You also agree to provide true, accurate, current and complete
                information about yourself as and when prompted by the Website.
                If you provide any information that is untrue, inaccurate, not
                updated or incomplete (or becomes untrue, inaccurate, not
                updated or incomplete), or AryseFin has reasonable grounds to
                suspect that such information is untrue, inaccurate, not updated
                or incomplete, AryseFin shall have the right to suspend or
                terminate your account and/or refuse any and all current or
                future use of the Website (or any portion thereof) or Services
                in connection thereto.
                <br />
                <br />
                By making use of the Website, and furnishing your
                personal/contact details, you hereby agree that you are
                interested in knowing more or availing and/or purchasing various
                products, services, offers, campaigns or other promotional
                material that AryseFin or any other third party may
                offer/provide/share/send you from time to time through any means
                including but not limited to telephone, SMS (short messaging
                service), electronic mail (e-mail), WhatsApp, RCS or any other
                messaging service/mobile application or any other physical,
                electronic or digital means/mode. You hereby agree that AryseFin
                may contact you either electronically or through phone, to
                understand your interest in the selected products and Services
                and to fulfil your demand or complete your application.
                <br />
                <br />
                Further you also expressly agree and authorize AryseFin and its
                partners, service providers, vendors and other third parties to
                contact you for the purpose of offering or inviting your
                interest in availing other products or services offered by third
                parties, or for sending other marketing campaigns, offers, or
                any other information either on the Website or through other
                means including but not limited to telephone, SMS (short
                messaging service), electronic mail (e-mail), WhatsApp or any
                other messaging service/mobile application or any other
                physical, electronic or digital means/mode.
                <br />
                <br />
                You specifically understand and agree that by using the Website
                you authorize AryseFin, its affiliates, partners and third
                parties to contact you for any follow up calls in relation to
                the Services provided through the Website and for offering or
                inviting your interest in availing any other product or service
                offered by AryseFin or such third parties. You agree and consent
                to receive communications relating to all of the above on your
                phone/mobile number provided by you on the Website and expressly
                waive any registration or preference made under DND/NCPR list
                under the applicable TRAI regulations.
                <br />
                <br />
                You agree and authorize AryseFin to share your information, with
                its group companies, vendors, service providers of AryseFin and
                other third parties, in so far as required for marketing
                purposes/offering/cross-selling various products and services
                and/or to provide you with various value-added services, in
                association with the Services selected by you or generally
                otherwise. You agree to receive communications through e-mails,
                telephone, WhatsApp, RCS and/or SMS, from AryseFin or third
                parties.
                <br />
                <br />
                You also agree that AryseFin reserves the right to make your
                details available to its partner banks/financial institutions,
                vendors, service providers, business partners, agents or any
                other third party and that you may be contacted by such partners
                and/or the third party for information through email, telephone
                and/or SMS. If you request not to receive such
                communication/marketing material any further, it shall be
                applicable prospectively only and shall not apply in respect to
                your data already shared by AryseFin with its partners upon your
                prior consent. In case you do not wish to receive any such
                communication/marketing materials from our partner
                banks/financial institutions/third parties, we request you to
                kindly get in touch with them independently, without involving
                AryseFin.
                <br />
                <br />
                You agree and acknowledge that for undertaking any financial
                transaction through the Website, AryseFin may undertake
                client/customer due diligence measures and seek mandatory
                information required for Know-Your-Customer (&quot;KYC&quot;)
                purpose which as a customer you are obliged to give, while
                facilitating your request of loan/credit card and other
                financial product requirements with the banks/financial
                institutions, in accordance with applicable law and regulations.
                <br />
                <br />
                AryseFin may obtain sufficient information to establish, to its
                satisfaction or the banks/financial institutions, the identity
                of each new customer/user, and to ascertain the purpose of the
                intended nature of relationship between you and the
                bank/financial institution. You agree and acknowledge that
                AryseFin can undertake enhanced due diligence measures
                (including any documentation), to satisfy itself relating to
                customer due diligence requirements in line with the
                requirements and obligations under applicable laws and
                regulations.
                <br />
                <br />
                The usage of the Website may also require you to provide consent
                for keying in your Personal Information (&quot;PI&quot;)
                (including but not limited to any personal data or sensitive
                personal data as defined under applicable law) or to authorize
                AryseFin to derive your data/information from any source or
                public registry, as may be necessary to complete your profile or
                your application on the Website, conduct due diligence on you,
                assessing your eligibility for the products/services,
                undertaking KYC checks by AryseFin or any other third party
                and/or to process your application through this Website.
                <br />
                <br />
                Your PI may also be used or shared with third parties, including
                but not limited to our vendors, service providers, analytics and
                research partners in India and abroad, with the sole objective
                of making your experience on the Website better, faster,
                friction-less and paperless to the extent possible. However,
                AryseFin shall adhere to best industry practices including
                information security, data protection and privacy law while
                processing such applications. However, AryseFin shall not be
                liable to you against any liability or claims which may arise
                out of such transactions as any such PI is being collected,
                used, processed and shared with your explicit consent.
                <br />
                <br />
                You shall not sell AryseFin&#39;s Services, information, or
                software associated with or derived from it or use any robot,
                spider, other automatic device, or manual process to monitor or
                copy the Website and or its content or interfere or disrupt the
                Website; take any action that imposes an unreasonably or
                disproportionately large load on AryseFin&#39;s
                infrastructure/network or use any device, or interfere or
                attempt to interfere with the AryseFin Services or forge headers
                or manipulate identifiers or other data in order to disguise the
                origin of any content transmitted through AryseFin or to
                manipulate your presence on the Website.
                <br />
                <br />
                You may only use the Website to search for and to apply for
                loans and other financial products as may be displayed on the
                Website from time to time and you shall not use the Website to
                make a fraudulent application for any products listed on the
                Website. You agree not to use the Website for any purpose that
                is unlawful, illegal or forbidden by these Terms, or any local
                laws that might apply to you. Since the Website is in operation
                in India, while using the Website, you shall agree to comply
                with laws that apply to India and your own country (in case of
                you being a foreign national). We may, at our sole discretion,
                at any time and without advance notice or liability, suspend,
                terminate or restrict your access to all or any component of the
                Website. AryseFin does not provide any Service to individuals
                resident in the European Union, European Economic Area,
                Switzerland, Guernsey and Jersey.
                <br />
                <br />
                You are prohibited from posting or transmitting to or through
                this Website: (i) any unlawful, threatening, libellous,
                defamatory, obscene, pornographic, or other material or content
                that would violate rights of publicity and/or privacy or that
                would violate any law; (ii) any commercial material or content
                (including, but not limited to, solicitation of funds,
                advertising, or marketing of any good or services); and (iii)
                any material or content that infringes, misappropriates or
                violates any copyright, trademark, patent right or other
                proprietary right of any third party. You shall be solely liable
                for any damages resulting from any violation of the foregoing
                restrictions, or any other harm resulting from your posting of
                content to this Website.
              </p>
            </div>
            {/* 3rd div */}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>PRIVACY POLICY&#58;</h2>
              <p className={styles.paragraph}>
                By using the Website, you hereby consent to the use of your
                information as we have outlined in our{" "}
                <a
                  href="https://fe.getrysa.com/PrivacyAndPolicy"
                  className={styles.atag}
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
            {/*4 div*/}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>
                THIRD PARTY LINKS&#47;OFFERS&#58;
              </h2>
              <p className={styles.paragraph}>
                This Website may provide links to other websites or
                resources&#46; Since AryseFin has no control over such third
                party websites and resources&#44; you acknowledge and agree that
                AryseFin is not responsible for the availability of such
                external sites or resources&#44; and does not endorse and is not
                responsible or liable for any content&#44; advertising&#44;
                products or other materials on or available from such sites or
                resources&#46; You further acknowledge and agree that AryseFin
                shall not be responsible or liable&#44; directly or
                indirectly&#44; for any damage or loss caused or alleged to be
                caused by or in connection with use of or reliance on any such
                content&#44; goods or services available on or through any such
                site or resource&#46; Your interaction with any third party
                accessed through the Website is at your own risk&#44; and
                AryseFin will have no liability with respect to the acts&#44;
                omissions&#44; errors&#44; representations&#44; warranties&#44;
                breaches or negligence of any such third parties or for any
                personal injuries&#44; death&#44; property damage&#44; or other
                damages or expenses resulting from your interactions with the
                third parties&#46;
              </p>
            </div>
            {/* 5 div */}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>OUR PARTNERS&#58;</h2>
              <ul className={styles.listDisc1}>
                <li>
                  Display of loan and other financial products&#44; offered by
                  third parties&#44; on the Website does not in any way
                  imply&#44; suggest&#44; or constitute any sponsorship&#44;
                  recommendation&#44; opinion&#44; advice or approval of
                  AryseFin in favour&#47;against such third parties or their
                  products&#46; You agree that AryseFin is in no way responsible
                  for the accuracy&#44; timeliness or completeness of
                  information it may obtain from these third parties&#46;
                </li>

                <li>
                  Your interaction with any third party accessed through the
                  Website is at your own risk&#44; and AryseFin will have no
                  liability with respect to the acts&#44; omissions&#44;
                  errors&#44; representations&#44; warranties&#44; breaches or
                  negligence of any such third parties or for any personal
                  injuries&#44; death&#44; property damage&#44; or other damages
                  or expenses resulting from your interactions with the third
                  parties&#46;
                </li>

                <li>
                  You agree and acknowledge that the credit shall be at the sole
                  discretion of AryseFin and AryseFin&#39;s financial partners
                  (lenders) while making any application through the Website for
                  a financial product offered by such financial partners&#59;
                  AryseFin shall not be held liable for any delay&#44; rejection
                  or approval of any application made through its Website&#46;
                </li>
              </ul>
            </div>
            {/* 6 div */}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>
                DISCLAIMER OF WARRANTY&#58;
              </h2>
              <ul className={styles.listDisc1}>
                <li>
                  The Website and all content and Services provided on the
                  Website are provided on an &quot;as is&quot; and &quot;as
                  available&quot; basis&#46; AryseFin expressly disclaims all
                  warranties of any kind&#44; whether express or implied&#44;
                  including&#44; but not limited to&#44; the implied warranties
                  of merchantability&#44; fitness for a particular purpose&#44;
                  title&#44; non-infringement&#44; and security and
                  accuracy&#44; as well as all warranties arising by usage of
                  trade&#44; course of dealing&#44; or course of
                  performance&#46;
                </li>

                <li>
                  AryseFin makes no warranty&#44; and expressly disclaims any
                  obligation&#44; that&#58;
                  <ol className={`${styles.orderedList} ${styles.upperAlpha}`}>
                    {/* <ol type="A" className={styles.orderedList}> */}
                    <li>
                      the content will be up-to-date&#44; complete&#44;
                      comprehensive&#44; accurate or applicable to your
                      circumstances&#59;
                    </li>
                    <li>
                      the Website will meet your requirements or will be
                      available on an uninterrupted&#44; timely&#44; secure&#44;
                      or error-free basis&#59;
                    </li>
                    <li>
                      the results that may be obtained from the use of the
                      Website or any Services offered through the Website will
                      be accurate or reliable&#59; or
                    </li>
                    <li>
                      the quality of any products&#44; services&#44;
                      information&#44; or other material obtained by you through
                      the Website will meet your expectations&#46;
                    </li>
                  </ol>
                </li>

                <li>
                  Some of the content on the Website may be aimed at spreading
                  general awareness about various financial and ancillary
                  services but does not constitute any investment advice&#44;
                  and the same shall not be construed as any solicitation&#44;
                  endorsement&#44; advertising&#44; marketing or promotion of
                  such services by AryseFin&#46; These content and&#47;or
                  information are derived from publicly available sources and
                  AryseFin cannot verify or confirm the genuineness&#44;
                  authenticity or veracity of such information&#46;
                </li>

                <li>
                  AryseFin&#44; either directly&#44; or through its business
                  partners&#47;vendors may enter into agreements with third
                  party payment gateway aggregators and financial institutions
                  authorized by the Reserve Bank of India for collection&#44;
                  refund and remittance and to facilitate payment between
                  you&#44; AryseFin and its business partners&#44; as the case
                  may be&#46;
                </li>

                <li>
                  AryseFin shall initiate the remittance of the payments made by
                  you and the date of completion of transaction shall be after
                  the products are delivered to you or after the Services are
                  rendered to you and such other additional time as may be
                  agreed between Website and its business partners&#44; as the
                  case may be&#46;
                </li>

                <li>
                  While availing any of the payment method&#47;s available on
                  the Website&#44; AryseFin will not be responsible or assume
                  any liability&#44; whatsoever in respect of any loss or damage
                  arising directly or indirectly to you due to&#58;
                  <ol
                    className={`${styles.orderedList} ${styles.number}`}
                    start="1"
                  >
                    {/* <ol className={styles.orderedList} start="1"> */}
                    <li>
                      Lack of authorization for any transaction&#47;s&#44;
                      or&#59;
                    </li>
                    <li>
                      Any payment issues arising out of the transaction&#44;
                      or&#59;
                    </li>
                    <li>
                      Illegitimacy of the payment methods (credit&#47;debit card
                      frauds etc.) being used by you&#59;
                    </li>
                    <li>
                      Decline of transaction for any other
                      reason&#40;s&#41;&#46;
                    </li>
                  </ol>
                </li>

                <li>
                  Notwithstanding anything contained herein&#44; the Website
                  reserves the right to conduct additional verification for
                  security or other reasons if it is not satisfied with the
                  credibility of you&#47;your transaction&#46;
                </li>

                <li>
                  Use of the payment facilities provided by the Website shall
                  not render the Website liable or responsible for the
                  non-delivery&#44; non-receipt&#44; non-payment&#44;
                  damage&#44; breach of representations and warranties&#44;
                  non-provision of after sales or warranty services or fraud as
                  regards the products or services listed on the Website&#46;
                  The Website shall not be responsible for any damages&#44;
                  interests or claims arising from not processing a
                  transaction&#46;
                </li>

                <li>
                  You hereby agree to provide accurate information&#44; such as
                  credit&#47;debit information for purchasing any Service or
                  product on or through the Website&#46; You further warrant
                  that you shall not use payment information or instruments that
                  are not lawfully owned by you&#46;
                </li>

                <li>
                  In addition to these terms of use&#44; the terms and
                  conditions of the bank or other financial institution shall
                  also be applicable to every user&#46; The Website disclaims
                  any liability arising out of declining of payment by such bank
                  or financial institution&#46;
                </li>

                <li>
                  No deliveries of the products&#47;services shall be made
                  outside the territorial boundaries of India&#46;
                </li>
              </ul>
            </div>
            {/* 7div */}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>
                LIMITATION OF LIABILITY&#58;
              </h2>

              <ul className={styles.listDisc1}>
                <li>
                  AryseFin (including its officers, directors, employees,
                  representatives, affiliates, and providers) will not be
                  responsible or liable for (a) any injury, death, loss, claim,
                  act of god, accident, delay, or any direct, special,
                  exemplary, punitive, indirect, incidental or consequential
                  damages of any kind (including without limitation lost profits
                  or lost savings), whether based in contract, tort, strict
                  liability or otherwise, that arise out of or is in any way
                  connected with
                </li>

                <li>
                  (i) any failure or delay (including without limitation the use
                  of or inability to use any component of the Website), or
                </li>
                <li>(ii) any use of the Website or content, or</li>
                <li>
                  (iii) the performance or non-performance by us or any
                  provider, even if we have been advised of the possibility of
                  damages to such parties or any other party, or (b) any damages
                  to or viruses that may infect your computer equipment or other
                  property as the result of your access to the Website or your
                  downloading of any content from the Website. The Website may
                  provide links to other third-party websites. However, since
                  AryseFin has no control over such third-party websites, you
                  acknowledge and agree that AryseFin is not responsible for the
                  availability of such third-party websites and does not endorse
                  and is not responsible or liable for any content, advertising,
                  products or other materials on or available from such
                  third-party websites. You further acknowledge and agree that
                  AryseFin shall not be responsible or liable, directly or
                  indirectly, for any damage or loss caused or alleged to be
                  caused by or in connection with use of or reliance on any such
                  content, goods or services available on or through any such
                  third-party websites. Such third-party websites may have
                  separate terms and conditions and privacy policy, and which
                  are independent of AryseFin and therefore, we advise you to
                  read the terms and conditions available on such websites
                  before you access any such third-party website.
                </li>
              </ul>
            </div>
            {/* 8div */}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>INDEMNITY&#58;</h2>
              <p className={styles.paragraph}>
                You agree to indemnify and hold AryseFin (and its officers,
                directors, agents and employees) harmless from any and against
                any claims, causes of action, demands, recoveries, losses,
                damages, fines, penalties or other costs or expenses of any kind
                or nature, including reasonable attorneys&#39; fees, or arising
                out of or related to your breach of this Terms, your violation
                of any law or the rights of a third party, or your use of the
                Website.
              </p>
            </div>
            {/* 9div */}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>WAIVER&#58;</h2>
              <p className={styles.paragraph}>
                Any failure or delay by AryseFin to enforce or exercise any
                provision of these Terms, or any related right, shall not
                constitute a waiver by AryseFin of that provision or right. The
                exercise of one or more of AryseFin&#39;s rights hereunder shall
                not be a waiver of, or preclude the exercise of, any rights or
                remedies available to AryseFin under these Terms or in law or at
                equity. Any waiver of any provision shall only be effective if
                made in writing and executed by a duly authorized officer of
                AryseFin.
              </p>
            </div>
            {/* 10div */}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>FORCE MAJEURE&#58;</h2>
              <p className={styles.paragraph}>
                If performance of Services&#47;Website by AryseFin is prevented,
                restricted, delayed or interfered with by reason of labour
                disputes, strikes, acts of God, floods, lightning, severe
                weather, shortages of materials, rationing, inducement of any
                virus, malware, trojan or other disruptive mechanisms, any event
                of hacking or illegal usage of the Website, utility or
                communication failures, earthquakes, war, revolution, acts of
                terrorism, civil commotion, acts of public enemies, blockade,
                embargo or any law, order, proclamation, regulation, ordinance,
                demand or requirement having legal effect of any government or
                any judicial authority or representative of any such government,
                or any other act whatsoever, whether similar or dissimilar to
                those referred to in this clause, which are beyond the
                reasonable control of AryseFin and could not have been prevented
                by reasonable precautions, then AryseFin shall be excused and
                discharged from such performance to the extent of and during the
                period of such force majeure event, and such non-performance
                shall, in no manner whosoever, amount to a breach by AryseFin of
                its obligations herein or incur any legal liability on AryseFin.
              </p>
            </div>
            {/* 11 div  */}
            <div className={styles.policyContent}>
              <h2 className={styles.sectionTitle}>ADDITIONAL TERMS&#58;</h2>
              <ul className={styles.listDisc1}>
                <li>
                  You may not assign or otherwise transfer your rights or
                  obligations under these Terms. AryseFin may assign its rights
                  and duties under these Terms without any such assignment being
                  considered a change to the Terms and without any notice to
                  you. If we fail to act on your breach or anyone else&#39;s
                  breach on any occasion, we are not waiving our right to act
                  with respect to future or similar breaches. Other terms and
                  conditions may apply to loans or other financial products that
                  you may apply on the Website. You will observe these other
                  terms and conditions. The laws of India, without regard to its
                  conflict of laws rules, will govern these Terms, as well as
                  your and our observance of the same. If you take any legal
                  action relating to your use of the Website or these Terms, you
                  agree to file such action only in the courts located in Pune,
                  India. In any such action that we may initiate, the prevailing
                  party will be entitled to recover all legal expenses incurred
                  in connection with the legal action, including but not limited
                  to costs, both taxable and non-taxable, and reasonable
                  attorney fees. You acknowledge that you have read and have
                  understood these Terms, and that these Terms have the same
                  force and effect as a signed agreement. This paragraph shall
                  survive termination of this agreement.
                </li>

                <li>
                  AryseFin reserves the right to make changes to the Website,
                  related policies and agreements, this terms of use and the
                  Privacy Policy at any time as it deems fit and proper,
                  including but not limited to comply with changes in law or
                  regulation, correct inaccuracies, omissions, errors or
                  ambiguities, reflect changes in the process flow, scope and
                  nature of the Services and ancillary services, company
                  re-organization, market practice or customer requirements.
                </li>

                <li>
                  Upon any change, AryseFin will notify the updated Terms on the
                  Website or other means. Your continued use of the Services and
                  ancillary services constitutes acceptance of the changes and
                  an agreement to be bound by Terms, as amended. If you do not
                  agree to the changes, you may please discontinue your use of
                  the Services.
                </li>

                <li>
                  These terms of use were last updated on 15 August, 2025.
                </li>
              </ul>
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
