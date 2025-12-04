'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './LoanRange.module.css';
import hdb from '../../../public/Jays/HDB.png';

export default function LoanRangePage() {
  /* ——— कॉन्स्टंट्स ——— */
  const  minAmt= 0;
  const  maxAmt= 50000;
  const  amtStep = 500;

  const MIN_TENURE = 12;
  const MAX_TENURE = 48;
  const TENURE_STEP = 12;

  /* ——— स्टेट ——— */
  const [amount, setAmount] = useState(maxAmt);
  const [tenure, setTenure] = useState(24);

  /* ——— हँडलर ——— */
  const onAmountSlider = e => setAmount(Number(e.target.value));

  const onAmountInput = e => {
    /* ‘₹ xx,xxx’ → केवळ अंक काढा */
    let val = Number(e.target.value.replace(/[^\d]/g, ''));
    if (isNaN(val)) val =  minAmt;
    val = Math.max(minAmt, Math.min(maxAmt, val));
    setAmount(val);
  };

  const onTenureSlider = e => setTenure(Number(e.target.value));
 // sumbmit buttun code
 const [currentStep, setCurrentStep] = useState(1);
  /* ——— UI ——— */
  return (
    <main className={styles.page}>
      {/* वरचा ग्रॅडियंट हेडर */}
      {/* <header className={styles.header}>
        Congratulations ! You have been Approved a loan of&nbsp;
        <strong>₹ {maxAmt}</strong> 
      </header> */}
        <div className={styles.header}>
         <div className={styles.headerLogo}>
                  <Image
                    src={hdb}
                    alt="Hdb tag"
                    style={{alignContent:"center",width:"auto",height:"auto", top:"-4"}}
                  />
                </div>
      </div>
      <section className={styles.card}>
        {/* लोगो */}
        <div className={styles.logo}>
          <Image
            src="/ondc-logo.png"       /* public/… मध्ये स्वतःचा फाइल ठेवा */
            alt="ONDC"
            fill
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* रक्कम इन्पुट */}
        <div className={styles.inputWrap}>
          <div className={styles.placeholderAndInput}>
          <h3 className={styles.h3Tag}>Choose loan amount</h3>
          <input
            type="text"
            value={`₹ ${amount.toLocaleString()}`}
            onChange={onAmountInput}
            className={styles.amountInput}
            placeholder="₹ 5,000- ₹ 50,000"
          />
          </div>
          <small>You can enter up to {maxAmt}</small>
        </div>

        {/* रक्कम स्लायडर */}
        <div className={styles.sliderBlock}>
          <input
            type="range"
            min={ minAmt}
            max={ maxAmt}
            step={ amtStep}
            value={amount}
            onChange={onAmountSlider}
            className={styles.slider}
          />
          <div className={styles.labels}>
            <span>₹ {minAmt}</span>
            <span>₹ {maxAmt}</span>
          </div>
        </div>

        {/* टेन्योर स्लायडर */}
        <div className={styles.sliderBlock}>
          <input
            type="range"
            min={MIN_TENURE}
            max={MAX_TENURE}
            step={TENURE_STEP}
            value={tenure}
            onChange={onTenureSlider}
            className={styles.slider}
          />
          <div className={styles.labels}>
            <span>12</span><span>24</span><span>36</span><span>48</span>
          </div>
        </div>
        <div className={styles.btnContainer}>
         <button type="button"
                    className={styles.nextBtn}
                    onClick={() => {
                      if (validateForm()) {
                        alert("Validation passed — proceed!");
                      }
                    }}>
              {currentStep === 1 ? 'Next' : 'Submit'}
            </button>
        </div>
      </section>
    </main>
  );
}
