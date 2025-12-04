'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './LoanOffers.module.css';
import { Roboto } from 'next/font/google';
import clock from '../../../public/clock.png'; // Make sure this exists in public

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function LoanForm({ companies, getLoanBackendMethod, redirectLinkMethod, mobileNumber }) {
  // Slider content
  const slides = [
    {
      title: 'Simple Loans,<br> Big Smiles!',
      subtitle: 'Get money when you need it, stress‑free.',
      img: '/happy-man.png',
    },
    {
      title: 'Low‑interest,<br> Fast Approval',
      subtitle: 'Apply today, funded tomorrow.',
      img: '/happy-man.png',
    },
    {
      title: 'Flexible EMIs,<br> More Freedom',
      subtitle: 'Repay the way that suits you.',
      img: '/happy-man.png',
    },
  ];

  const [currentSlide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((i) => (i + 1) % slides.length), 3500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDataLayerStage = (stage) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ stage });
  };

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <header className={styles.hero}>
          <button className={styles.backBtn} onClick={() => history.back()}>&lt; Back</button>

          <div className={styles.heroText}>
            <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: slides[currentSlide].title }} />
            <p className={styles.subtitle} dangerouslySetInnerHTML={{ __html: slides[currentSlide].subtitle }} />
          </div>

          <div className={styles.progressBar}>
            {slides.map((_, i) => (
              <span
                key={i}
                className={i === currentSlide ? styles.dotActive : styles.dot}
                onClick={() => setSlide(i)}
              />
            ))}
          </div>

          <div className={styles.imgWrap}>
            <Image
              src={slides[currentSlide].img}
              alt="Hero visual"
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
        </header>

        {/* Lending cards section */}
        <div>
          {companies && companies.lender_details?.length > 0 ? (
            <div className={styles.allnewcardContainer}>
              {companies.lender_details.map((lender, index) => (
                <div key={index} className={styles.newcardContainer}>
                  <div className={styles.cardLogo}>
                    <Image
                      src={lender.logo}
                      alt="Logo"
                      width={100}
                      height={40}
                      className={styles.logoImage}
                      style={{ width: 'auto' }}
                    />
                  </div>

                  <div className={styles.cardBody}>
                    <h1 className={styles.amount}>INR {lender.maxloanamount}</h1>
                    <p className={styles.maxAmount}>Max. Amount</p>
                  </div>

                  <div className={styles.cardInfo}>
                    <div className={styles.infoItem}>
                      <Image
                        src={clock}
                        alt="clock"
                        width={15}
                        height={15}
                      />
                      {lender.description}
                    </div>
                    <div className={styles.infoItem}>
                      {lender.interest}
                    </div>
                  </div>

                  <div>
                    {lender.cpi === 1 ? (
                      <button
                        className={styles.cardButton}
                        onClick={() =>
                          redirectLinkMethod(lender.product, lender.applicationlink, lender.product_id)
                        }
                      >
                        Get Loan
                      </button>
                    ) : (
                      <button
                        className={styles.cardButton}
                        onClick={(e) => getLoanBackendMethod(e, lender.product)}
                      >
                        Get Loan
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>No lenders Available</div>
          )}
        </div>
      </section>
    </main>
  );
}
