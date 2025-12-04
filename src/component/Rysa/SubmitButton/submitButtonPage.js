'use client';
import { useState, useEffect } from 'react';
import { FaPhoneAlt,FaUser, FaHome,FaUsers, FaEnvelope} from 'react-icons/fa';
import Image from 'next/image';
import styles from './submitButtonPage.module.css';

export default function SubmitButtonPage() {
  // slider 
  const slides = [
    { title: 'Simple Loans,<br> Big Smiles!', subtitle: 'Get money when you need it, stress‑free.', img: '/happy-man.png' },
    { title: 'Low‑interest,<br> Fast Approval', subtitle: 'Apply today, funded tomorrow.', img: '/happy-man.png' },
    { title: 'Flexible EMIs,<br> More Freedom', subtitle: 'Repay the way that suits you.', img: '/happy-man.png' },
  ];

  const [currentSlide, setSlide] = useState(0);
  const [currentStep, setStep] = useState(1);

  useEffect(() => {
    const id = setInterval(() => setSlide(i => (i + 1) % slides.length), 3500);
    return () => clearInterval(id);
  }, []);

  // step data
  const [stepOneData, setStepOne] = useState({ name: '', phone: '', Occupation: '', income: '', Payment_type: '' });
  const [stepTwoData, setStepTwo] = useState({ father: '', email: '', address: '' });

  // error messages
  const [completedStepOne, setCompletedStepOne] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    if (currentStep === 1 && ['name', 'phone', 'Occupation', 'income', 'Payment_type'].includes(name)) {
    setStepOne(prev => ({ ...prev, [name]: value }));
    } else if (currentStep === 2 && ['father', 'email', 'address'].includes(name)) {
    setStepTwo(prev => ({ ...prev, [name]: value }));
    }
    // if (currentStep === 1) {
    //   setStepOne(prev => ({ ...prev, [name]: value }));
    //   setErrors(prev => ({ ...prev, [name]: '' }));
    // } else {
    //   setStepTwo(prev => ({ ...prev, [name]: value }));
    //   setErrors(prev => ({ ...prev, [name]: '' }));
    // }
  };

  const filledOne = Object.values(stepOneData).filter(v => v.trim()).length;
  const percentOne = Math.round((filledOne / 5) * 100);
  const filledTwo = Object.values(stepTwoData).filter(v => v.trim()).length;
  const percentTwo = Math.round((filledTwo / 3) * 100);

  // dropdown states
  const [occupation, setOccupation] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [isOccupationOpen, setIsOccupationOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const occupationOptions = ['Self‑employed', 'Salaried', 'Student', 'Other'];
  const paymentOptions = ['Bank Transfer', 'UPI', 'Cheque'];

  // simple validations
  const validateStepOne = () => {
    const newErrors = {};

    if (stepOneData.name.trim().length < 2) {
      newErrors.name = 'Name should be at least 2 characters';
    }
    if (stepOneData.phone.trim().length !== 10) {
      newErrors.phone = 'Mobile number must be 10 digits';
    }
    if (!stepOneData.Occupation) {
      newErrors.Occupation = 'Select occupation';
    }
    if (!stepOneData.income || Number(stepOneData.income) < 1000) {
      newErrors.income = 'Income must be at least ₹1000';
    }
    if (!stepOneData.Payment_type) {
      newErrors.Payment_type = 'Select payment type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepTwo = () => {
    const newErrors = {};

    if (stepTwoData.father.trim().length < 2) {
      newErrors.father = 'Enter father/spouse name';
    }
    if (!stepTwoData.email.includes('@') || !stepTwoData.email.includes('.')) {
      newErrors.email = 'Enter valid email';
    }
    if (stepTwoData.address.trim().length < 5) {
      newErrors.address = 'Address should be at least 5 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderError = (field) => {
    return errors[field] ? (
      <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
        {errors[field]}
      </div>
    ) : null;
  };
  // more and less content
  const [readMore1, setReadMore1] = useState(false);
  const [readMore2, setReadMore2] = useState(false);


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
              <span key={i}
                    className={i === currentSlide ? styles.dotActive : styles.dot}
                    onClick={() => setSlide(i)} />
            ))}
          </div>
          <div className={styles.imgWrap}>
            <Image src={slides[currentSlide].img} alt="Hero visual" fill priority style={{ objectFit: 'cover' }} />
          </div>
        </header>

        <div className={styles.formBlock}>
          <div className={styles.steps}>
            {[1, 2].map(step => (
              <div key={step} className={styles.stepContainer}>
                <button type="button"
                        onClick={() => setStep(step)}
                        className={step === currentStep ?
                                  `${styles.step} ${styles.stepActive}` : styles.step}>
                  {step}
                </button>
                <div className={styles.underLineNO}>
                  <div className={styles.underLineFill}
                  style={{
  width:
    step === 1
      ? completedStepOne
        ? '100%'
        : `${percentOne}%`
      : step === 2
        ? `${percentTwo}%`
        : '0%',
}}
                      //  style={{
                      //    width: step === 1 && currentStep === 1
                      //           ? `${percentOne}%`
                      //           : step === 2 && currentStep === 2
                      //             ? `${percentTwo}%`
                      //             : '0%',
                      //  }} 
                       />
                </div>
              </div>
            ))}
          </div>

          <form className={styles.form}>
            {currentStep === 1 ? (
              <>
                <div className={styles.field}>
                  <input name="name"
                         onChange={handleChange}
                         value={stepOneData.name || ''}
                         className={styles.input}
                         placeholder="Name as per PAN" />
                         <span className={styles.icon}><FaUser /></span>
                  {/* <span className={styles.icon}>👤</span> */}
                  {renderError('name')}
                </div>

                <div className={styles.field}>
                  <input name="phone"
                         type="tel"
                         onChange={handleChange}
                         value={stepOneData.phone || ''}
                         className={styles.input}
                         placeholder="Mobile Number" />
                         <span className={styles.icon}><FaPhoneAlt /></span>
                  {/* <span className={styles.icon}>📞</span> */}
                  {renderError('phone')}
                </div>

                <div className={styles.dropdownContainer2}>
                  <div className={styles.dropdownHeader2}
                       onClick={() => setIsOccupationOpen(!isOccupationOpen)}
                       style={{ color: occupation === '' ? '#888' : '#000' }}>
                    {occupation || 'Select occupation'}
                    <span className={styles.icon}>⏷</span>
                  </div>
                  {renderError('Occupation')}
                  {isOccupationOpen && (
                    <ul className={styles.dropdownList2}>
                      {occupationOptions.map((option, i) => (
                        <li key={i}
                            className={styles.option}
                            onClick={() => {
                              setOccupation(option);
                              setStepOne(prev => ({ ...prev, Occupation: option }));
                              setIsOccupationOpen(false);
                            }}>
                          <span>{option}</span>
                          <input type="radio"
                                 name="Occupation"
                                 checked={occupation === option}
                                 readOnly />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className={styles.field}>
                  <input name="income"
                         onChange={handleChange}
                         type="number"
                         className={styles.input}
                         placeholder="Monthly income" />
                  <span className={styles.icon}>₹</span>
                  {renderError('income')}
                </div>

                <div className={styles.dropdownContainer}>
                  <div className={styles.dropdownHeader}
                       onClick={() => setIsPaymentOpen(!isPaymentOpen)}
                       style={{ color: paymentType === '' ? '#888' : '#000' }}>
                    {paymentType || 'Select payment type'}
                    <span className={styles.icon}>⏷</span>
                  </div>
                  {renderError('Payment_type')}
                  {isPaymentOpen && (
                    <ul className={styles.dropdownList}>
                      {paymentOptions.map((option, i) => (
                        <li key={i}
                            className={styles.option}
                            onClick={() => {
                              setPaymentType(option);
                              setStepOne(prev => ({ ...prev, Payment_type: option }));
                              setIsPaymentOpen(false);
                            }}>
                          <span>{option}</span>
                          <input type="radio"
                                 name="Payment_type"
                                 checked={paymentType === option}
                                 readOnly />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* last contenct */}
                   <small className={styles.note}>
  {readMore1 ? (
    <>
      You hereby consent to CreditHaat being appointed as your 
      authorized representative to receive your Credit Information 
      from Experian for the purpose of accessing credit worthiness 
      and availing pre-approved offers (“End Use Purpose”). You hereby 
      agree to Terms and Conditions. I authorize CreditHaat, its 
      partner financial institutes/lenders and their representatives 
      to Call, SMS or communicate via WhatsApp regarding my application. 
      This consent overrides any registration for DNC / NDNC. I confirm 
      I am in India, I am a major and a resident of India and I have 
      read and I accept CreditHaat Privacy Policy Click here to read the 
      PRIVACY POLICY & TERMS OF SERVICE.
      {/* <br /> */}
      <button type="button" onClick={() => setReadMore1(false)} style={{ color: '#007bff', background: 'none', border: 'none', padding: 0 }}>
        Show Less
      </button>
    </>
  ) : (
    <>
      You hereby consent to CreditHaat being appointed as your authorized representative...
      {/* <br /> */}
      <button type="button" onClick={() => setReadMore1(true)} style={{ color: '#007bff', background: 'none', border: 'none', padding: 0 }}>
        Show More
      </button>
    </>
  )}
  <br /><br />
  {readMore2 ? (
    <>
      By agreeing and accepting the terms and conditions set out herein,
       you provide your express consent to Social Worth Technologies Private Limited,
       Whizdm Innovations Pvt Ltd, Upwards Fintech Services Pvt Ltd, 
       Tata Capital Financial Services Ltd, SmartCoin Financials Pvt Ltd,
       MWYN Tech Pvt Ltd, L&T Finance Ltd, Krazybee Services Pvt Ltd, 
       Infocredit Services Pvt. Ltd, Incred Financial Services, 
       IIFL Finance Ltd, EQX Analytics Pvt Ltd, EPIMoney Pvt Ltd, 
       Bhanix finance and Investment LTd, Aditya Birla Finance Ltd to 
       access the credit bureaus and credit information report and credit score. 
       You also hereby irrevocably and unconditionally consent to usage of such 
       credit information being provided by credit bureaus.
      {/* <br /> */}
      <button type="button" onClick={() => setReadMore2(false)} style={{ color: '#007bff', background: 'none', border: 'none', padding: 0 }}>
        Show Less
      </button>
    </>
  ) : (
    <>
      By agreeing and accepting the terms and conditions set out herein...
      {/* <br /> */}
      <button type="button" onClick={() => setReadMore2(true)} style={{ color: '#007bff', background: 'none', border: 'none', padding: 0 }}>
        Show More
      </button>
    </>
  )}
  <br /><br />
  Sample: ₹10 k for 1 yr @13 % p.a.<br />
  <span className={styles.calc}>
    Processing fee (2 %) = ₹200 + GST = ₹236
  </span>
</small>
              </>
            ) : (
              <>
                <div className={styles.field}>
                  <input name="father"
                         onChange={handleChange}
                         value={stepTwoData.father || ''}
                         className={styles.input}
                         placeholder="Father / Spouse Name" />
                         <span className={styles.icon}><FaUsers /></span>
                  {/* <span className={styles.icon}>👥</span> */}
                  {renderError('father')}
                </div>

                <div className={styles.field}>
                  <input name="email"
                         type="email"
                         onChange={handleChange}
                         value={stepTwoData.email || ''}
                         className={styles.input}
                         placeholder="Email address" />
                         <span className={styles.icon}><FaEnvelope /></span>
                  {/* <span className={styles.icon}>✉️</span> */}
                  {renderError('email')}
                </div>

                <div className={styles.field}>
                  <input name="address"
                         onChange={handleChange}
                         value={stepTwoData.address || ''}
                         className={styles.input}
                         placeholder="Current Address" />
                         <span className={styles.icon}><FaHome /></span>
                  {/* <span className={styles.icon}>🏠</span> */}
                  {renderError('address')}
                </div>
                   {/* last contenct */}
                   <small className={styles.note}>
  {readMore1 ? (
    <>
      You hereby consent to CreditHaat being appointed as your 
      authorized representative to receive your Credit Information 
      from Experian for the purpose of accessing credit worthiness 
      and availing pre-approved offers (“End Use Purpose”). You hereby 
      agree to Terms and Conditions. I authorize CreditHaat, its 
      partner financial institutes/lenders and their representatives 
      to Call, SMS or communicate via WhatsApp regarding my application. 
      This consent overrides any registration for DNC / NDNC. I confirm 
      I am in India, I am a major and a resident of India and I have 
      read and I accept CreditHaat Privacy Policy Click here to read the 
      PRIVACY POLICY & TERMS OF SERVICE.
      {/* <br /> */}
      <button type="button" onClick={() => setReadMore1(false)} style={{ color: '#007bff', background: 'none', border: 'none', padding: 0 }}>
        Show Less
      </button>
    </>
  ) : (
    <>
      You hereby consent to CreditHaat being appointed as your authorized representative...
      {/* <br /> */}
      <button type="button" onClick={() => setReadMore1(true)} style={{ color: '#007bff', background: 'none', border: 'none', padding: 0 }}>
        Show More
      </button>
    </>
  )}
  <br /><br />
  {readMore2 ? (
    <>
      By agreeing and accepting the terms and conditions set out herein,
       you provide your express consent to Social Worth Technologies Private Limited,
       Whizdm Innovations Pvt Ltd, Upwards Fintech Services Pvt Ltd, 
       Tata Capital Financial Services Ltd, SmartCoin Financials Pvt Ltd,
       MWYN Tech Pvt Ltd, L&T Finance Ltd, Krazybee Services Pvt Ltd, 
       Infocredit Services Pvt. Ltd, Incred Financial Services, 
       IIFL Finance Ltd, EQX Analytics Pvt Ltd, EPIMoney Pvt Ltd, 
       Bhanix finance and Investment LTd, Aditya Birla Finance Ltd to 
       access the credit bureaus and credit information report and credit score. 
       You also hereby irrevocably and unconditionally consent to usage of such 
       credit information being provided by credit bureaus.
      {/* <br /> */}
      <button type="button" onClick={() => setReadMore2(false)} style={{ color: '#007bff', background: 'none', border: 'none', padding: 0 }}>
        Show Less
      </button>
    </>
  ) : (
    <>
      By agreeing and accepting the terms and conditions set out herein...
      {/* <br /> */}
      <button type="button" onClick={() => setReadMore2(true)} style={{ color: '#007bff', background: 'none', border: 'none', padding: 0 }}>
        Show More
      </button>
    </>
  )}
  <br /><br />
  Sample: ₹10 k for 1 yr @13 % p.a.<br />
  <span className={styles.calc}>
    Processing fee (2 %) = ₹200 + GST = ₹236
  </span>
</small>

                {/* <small className={styles.note}>
                  You hereby consent to CreditHaat being appointed as your authorized representative to receive your Credit Information from Experian for the purpose of accessing credit worthiness and availing pre-approved offers (“End Use Purpose”). You hereby agree to Terms and Conditions. I authorize CreditHaat, its partner financial institutes/lenders and their representatives to Call, SMS or communicate via WhatsApp regarding my application. This consent overrides any registration for DNC / NDNC. I confirm I am in India, I am a major and a resident of India and I have read and I accept CreditHaat Privacy Policy Click here to read the PRIVACY POLICY & TERMS OF 
                  SERVICEShow Less&nbsp;
                  <a href="#">Read more…</a><br />
                  By agreeing and accepting the terms and conditions set out herein, you provide your express consent to Social Worth Technologies Private Limited, Whizdm Innovations Pvt Ltd, Upwards Fintech Services Pvt Ltd, Tata Capital Financial Services Ltd, SmartCoin Financials Pvt Ltd, MWYN Tech Pvt Ltd, L&T Finance Ltd, Krazybee Services Pvt Ltd, Infocredit Services Pvt. Ltd, Incred Financial Services, IIFL Finance Ltd, EQX Analytics Pvt Ltd, EPIMoney Pvt Ltd, Bhanix finance and Investment LTd, Aditya Birla Finance Ltd to access the credit bureaus and credit information report and credit score. You also hereby irrevocably and unconditionally consent to usage of such credit information being provided by credit bureaus.Show Less&nbsp;<a href="#">Read more…</a><br /><br />
                  Sample: ₹10 k for 1 yr @13 % p.a.<br />
                  <span className={styles.calc}>
                    Processing fee (2 %) = ₹200 + GST = ₹236
                  </span>
                </small> */}
              </>
            )}
            <div className={styles.btnContainer}>
            <button type="button"
                    className={styles.nextBtn}
                    onClick={() => {
                      if (currentStep === 1 && validateStepOne()) {
                  setCompletedStepOne(true);
                  setStep(2);
                } else if (currentStep === 2 && validateStepTwo()) {
                  alert("Form Submitted Successfully");
                }
                      // if (currentStep === 1 && validateStepOne()) {
                      //   setStep(2);
                      // } else if (currentStep === 2 && validateStepTwo()) {
                      //   alert("Form Submitted Successfully");
                      // }
                    }}>
              {currentStep === 1 ? 'Next' : 'Submit'}
            </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
