"use client"

import React, { useEffect, useState } from 'react';
import styles from "./NewBlFirstPage.module.css";
import Image from 'next/image';
import hdb from '../../../public/Jays/HDB.png';
import clock from '../../../public/clock.png';
import per from '../../../public/Group_10.png'
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const NewBlListPage = ({ companies, getLoanBackendMethod, redirectLinkMethod, mobileNumber }) => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  // const handleDataLayerStage = (stage) => {
  //   window.dataLayer = window.dataLayer || [];
  //   window.dataLayer.push({ 'stage': stage });
  // };

  // const slides = [
  //   { title: 'Simple Loans,Big<br> Smiles!', subtitle: 'Get money when you need it, stress‑free.', img: '/s141.png' },
  //   { title: 'Festive Loan,<br> Bonanza!', subtitle: 'Exclusive benefits for limited period.', img: '/s171.png' },
  //   { title: 'Easy Loans, Happy<br> Moments!', subtitle: 'Quick money,zero worries.', img: '/s11.png' },
  // ];

  // const [currentSlide, setSlide] = useState(0);
  // const [currentStep, setStep] = useState(1);

  // useEffect(() => {
  //   const id = setInterval(() => setSlide(i => (i + 1) % slides.length), 3500);
  //   return () => clearInterval(id);
  // }, []);

  return (
    <>
   <div className={styles.numberStart}>
            <div className={styles.numberOneDiv}> {/*header*/}
         <div className={styles.headerLogo}>
                  <Image
                    src={hdb}
                    alt="Hdb tag"
                    style={{alignContent:"center",width:"auto",height:"auto", top:"-4"}}
                  />
                </div>
            </div>{/*header end*/}
            <div className={styles.numberTwoDiv}>
                <div className={`${roboto.className} ${styles.listpageContainer}`}>
        {
          companies ? (
            <>
              <div className={styles.allnewcardContainer}>
                {
                  companies.lender_details.map((lender, index) => (
                    <div key={index} className={styles.newcardContainer}>
                      <div className={styles.cardLogo}>
                        <Image src={lender.logo} alt="Logo" width={100} height={40} className={styles.logoImage} style={{ width: 'auto' }} />
                      </div>
                      <div className={styles.cardBody}>
                        <h1 className={styles.amount}>INR {lender.maxloanamount}</h1>
                        <p className={styles.maxAmount}>Max. Amount</p>
                      </div>
                      <div className={styles.cardInfo}>
                        <div className={styles.infoItem}>
                          <span role="img" aria-label="clock">
                            <Image src={clock} alt='clock image' width={15} height={15} />
                          </span>{lender.description}
                        </div>
                        <div className={styles.infoItem}>
                          <span role="img" aria-label="percentage">
                            <Image src={per} alt='percentage image' width={15} height={15} />
                          </span>
                          {lender.interest}
                        </div>
                      </div>
                      <div>
                        {
                          lender.cpi === 1 ? (
                            <button className={styles.cardButton} onClick={() => redirectLinkMethod(lender.product, lender.applicationlink, lender.product_id)}>Get Loan</button>
                          ) : (
                            <button className={styles.cardButton} onClick={(e) => getLoanBackendMethod(e, lender.product)}>Get Loan</button>
                          )
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
            </>
          ) : (
            <div>No lenders Available</div>
          )
        }
      </div>
            </div>{/*secondend*/}
        </div>{/*numberStart div*/}
    </>
  );
};

export default NewBlListPage;
