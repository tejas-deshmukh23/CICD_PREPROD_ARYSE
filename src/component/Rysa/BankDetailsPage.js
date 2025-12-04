'use client';
import { useState, useEffect } from 'react';
import { FaUser, FaUniversity, FaKey, FaCreditCard} from 'react-icons/fa';
import Image from 'next/image';
import styles from './BankDetails.module.css';

export default function BankDetailsPage() {
  // slider 
  const slides = [
    { title: 'Simple Loans,Big<br> Smiles!', subtitle: 'Get money when you need it, stress‑free.', img: '/s141.png' },
    { title: 'Festive Loan,<br> Bonanza!', subtitle: 'Exclusive benefits for limited period.', img: '/s171.png' },
    { title: 'Easy Loans, Happy<br> Moments!', subtitle: 'Quick money,zero worries.', img: '/s11.png' },
  ];

  const [currentSlide, setSlide] = useState(0);
  const [currentStep, setStep] = useState(1);

  useEffect(() => {
    const id = setInterval(() => setSlide(i => (i + 1) % slides.length), 3500);
    return () => clearInterval(id);
  }, [slides.length]);

  // step data
  const [stepOneData, setStepOne] = useState({ name: '', Bank: '', branchName: '', IFSC: '', accountNumber: '' });
  // error messages
  const [errors, setErrors] = useState({});

  // validation logic
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!stepOneData.name.trim()) {
      newErrors.name = "Account holder name is required";
      isValid = false;
    } else if (stepOneData.name.trim().length < 2) {
      newErrors.name = "Account holder name must be at least 2 characters";
      isValid = false;
    }

    if (!stepOneData.Bank.trim()) {
      newErrors.Bank = "Bank name is required";
      isValid = false;
    } else if (stepOneData.Bank.trim().length < 2) {
      newErrors.Bank = "Bank name must be at least 2 characters";
      isValid = false;
    }

    if (!stepOneData.branchName.trim()) {
      newErrors.branchName = "Branch name is required";
      isValid = false;
    } else if (stepOneData.branchName.trim().length < 2) {
      newErrors.branchName = "Branch name must be at least 2 characters";
      isValid = false;
    }

    if (!stepOneData.IFSC) {
      newErrors.IFSC = "IFSC code is required";
      isValid = false;
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(stepOneData.IFSC)) {
      newErrors.IFSC = "Please enter a valid IFSC code";
      isValid = false;
    }

    if (!stepOneData.accountNumber) {
      newErrors.accountNumber = "Account number is required";
      isValid = false;
    } else if (!/^\d{9,18}$/.test(stepOneData.accountNumber)) {
      newErrors.accountNumber = "Please enter a valid account number (9-18 digits)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // input handler
  const handleChange = e => {
    const { name, value } = e.target;
    setStepOne(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const renderError = (field) => {
    return errors[field] ? (
      <div style={{ color: 'red', fontSize: '12px', marginTop: '0px', fontWeight:'600', position:'absolute'}}>
        {errors[field]}
      </div>
    ) : null;
  };

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <div className={styles.numberOneDiv}>{/*onediv start*/}
          <header className={styles.hero1} >
            {/* <button className={styles.backBtn1} onClick={() => history.back()}>&lt; Back</button> */}
            <div className={styles.heroText1}>
              <h1 className={styles.title1} dangerouslySetInnerHTML={{ __html: slides[currentSlide].title }} />
              <p className={styles.subtitle1} dangerouslySetInnerHTML={{ __html: slides[currentSlide].subtitle }} />
            </div>
            <div className={styles.progressBar1}>
              {slides.map((_, i) => (
                <span key={i} className={i === currentSlide ? styles.dotActive1 : styles.dot1} onClick={() => setSlide(i)} />
              ))}
            </div>
            <div className={styles.imgWrap1}>
              <Image src={slides[currentSlide].img} alt="Hero visual" fill priority style={{ objectFit: 'cover' }} />
            </div>
          </header>
        </div>{/*onediv end*/}
        <div className={styles.numberTwoDiv}>
        <div className={styles.formBlock}>
          <div style={{ textAlign:'center', top:'0px',color: '#777777', fontSize:'16px', paddingBottom:'14px'}}>
              Please provide your bank details
            </div>
          <form className={styles.form}>
            <>
              <div className={styles.field}>
                <input name="name"
                       onChange={handleChange}
                       value={stepOneData.name}
                       className={styles.input}
                       placeholder="Account Holder Name" />
                       <span className={styles.icon}><FaUser /></span>
                {/* <span className={styles.icon}>👤</span> */}
                {renderError('name')}
              </div>

              <div className={styles.field}>
                <input name="Bank"
                       type="text"
                       onChange={handleChange}
                       value={stepOneData.Bank}
                       className={styles.input}
                       placeholder="Bank Name" />
                       <span className={styles.icon}><FaUniversity /></span>
                {/* <span className={styles.icon}>🏦</span> */}
                {renderError('Bank')}
              </div>

              <div className={styles.field}>
                <input name="IFSC"
                       onChange={handleChange}
                       type="text"
                       className={styles.input}
                       placeholder="IFSC Code" />
                       <span className={styles.icon}><FaKey /></span>
                {/* <span className={styles.icon}>🔑</span> */}
                {renderError('IFSC')}
              </div>

              <div className={styles.field}>
                <input name="accountNumber"
                       onChange={handleChange}
                       type="text"
                       className={styles.input}
                       placeholder="Account No." />
                       <span className={styles.icon}><FaCreditCard /></span>
                {/* <span className={styles.icon}>💳</span> */}
                {renderError('accountNumber')}
              </div>

              <div className={styles.field}>
                <input name="branchName"
                       onChange={handleChange}
                       type="text"
                       className={styles.input}
                       placeholder="Bank Branch Name" />
                       <span className={styles.icon}><FaUniversity /></span>
                {/* <span className={styles.icon}>🏦</span> */}
                {renderError('branchName')}
              </div>
            </>
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
          </form>
        </div>
        </div>{/*secondDiv end*/}
      </section>{/*startDiv end*/}
    </main>
  );
}

// 'use client';
// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import styles from './BankDetails.module.css';

// export default function LoanForm() {
//   // slider 
//   const slides = [
//     { title: 'Simple Loans,<br> Big Smiles!', subtitle: 'Get money when you need it, stress‑free.', img: '/businessman.png' },
//     { title: 'Low‑interest,<br> Fast Approval', subtitle: 'Apply today, funded tomorrow.', img: '/businessman.png' },
//     { title: 'Flexible EMIs,<br> More Freedom', subtitle: 'Repay the way that suits you.', img: '/businessman.png' },
//   ];

//   const [currentSlide, setSlide] = useState(0);
//   const [currentStep, setStep] = useState(1);

//   useEffect(() => {
//     const id = setInterval(() => setSlide(i => (i + 1) % slides.length), 3500);
//     return () => clearInterval(id);
//   }, []);

//   // step data
//   const [stepOneData, setStepOne] = useState({ name: '', phone: '', Occupation: '', income: '', Payment_type: '' });
//   // const [stepTwoData, setStepTwo] = useState({ father: '', email: '', address: '' });

//   // error messages
//   // const [completedStepOne, setCompletedStepOne] = useState(false);
//   // const [errors, setErrors] = useState({});

//   // const handleChange = e => {
//   //   const { name, value } = e.target;
//   //   if (currentStep === 1 && ['name', 'phone', 'Occupation', 'income', 'Payment_type'].includes(name)) {
//   //   setStepOne(prev => ({ ...prev, [name]: value }));
//   //   } else if (currentStep === 2 && ['father', 'email', 'address'].includes(name)) {
//   //   setStepTwo(prev => ({ ...prev, [name]: value }));
//   //   }
    
//   // };
//   // simple validations
//   const validateStepOne = () => {
//     const newErrors = {};

//     if (stepOneData.name.trim().length < 2) {
//       newErrors.name = 'Name should be at least 2 characters';
//     }
//     if (stepOneData.phone.trim().length !== 10) {
//       newErrors.phone = 'Mobile number must be 10 digits';
//     }
//     if (!stepOneData.Occupation) {
//       newErrors.Occupation = 'Select occupation';
//     }
//     if (!stepOneData.income || Number(stepOneData.income) < 1000) {
//       newErrors.income = 'Income must be at least ₹1000';
//     }
//     if (!stepOneData.Payment_type) {
//       newErrors.Payment_type = 'Select payment type';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const renderError = (field) => {
//     return errors[field] ? (
//       <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
//         {errors[field]}
//       </div>
//     ) : null;
//   };
//   return (
//     <main className={styles.container}>
//       <section className={styles.card}>
//         <header className={styles.hero}>
//           <button className={styles.backBtn} onClick={() => history.back()}>&lt; Back</button>
//           <div className={styles.heroText}>
//             <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: slides[currentSlide].title }} />
//             <p className={styles.subtitle} dangerouslySetInnerHTML={{ __html: slides[currentSlide].subtitle }} />
//           </div>
//           <div className={styles.progressBar}>
//             {slides.map((_, i) => (
//               <span key={i}
//                     className={i === currentSlide ? styles.dotActive : styles.dot}
//                     onClick={() => setSlide(i)} />
//             ))}
//           </div>
//           <div className={styles.imgWrap}>
//             <Image src={slides[currentSlide].img} alt="Hero visual" fill priority style={{ objectFit: 'cover' }} />
//           </div>
//         </header>

//         <div className={styles.formBlock}>
//           <form className={styles.form}>
//               <>
//                 <div className={styles.field}>
//                   <input name="name"
//                          onChange={handleChange}
//                          value={stepOneData.name || ''}
//                          className={styles.input}
//                          placeholder="Account holder name" />
//                   <span className={styles.icon}>👤</span>
//                   {renderError('name')}
//                 </div>

//                 <div className={styles.field}>
//                   <input name="Bank"
//                          type="text"
//                          onChange={handleChange}
//                          value={stepOneData.phone || ''}
//                          className={styles.input}
//                          placeholder="Bank name" />
//                   <span className={styles.icon}>🏦</span>
//                   {renderError('phone')}
//                 </div>
//                 <div className={styles.field}>
//                   <input name="income"
//                          onChange={handleChange}
//                          type="text"
//                          className={styles.input}
//                          placeholder="IFSC code" />
//                   <span className={styles.icon}>🔑</span>
//                   {renderError('income')}
//                 </div>
                
//                 <div className={styles.field}>
//                   <input name="number"
//                          onChange={handleChange}
//                          type="text"
//                          className={styles.input}
//                          placeholder="Account no." />
//                   <span className={styles.icon}>💳</span>
//                   {renderError('income')}
//                 </div>
//                 <div className={styles.field}>
//                   <input name="income"
//                          onChange={handleChange}
//                          type="text"
//                          className={styles.input}
//                          placeholder="Bank branch name" />
//                   <span className={styles.icon}>🏦</span>
//                   {renderError('income')}
//                 </div>
//               </>
//             <button type="button"
//                     className={styles.nextBtn}
//                     onClick={() => {
//                       if (currentStep === 1 && validateStepOne()) {
//                   setCompletedStepOne(true);
//                   setStep(2);
//                 } else if (currentStep === 2 && validateStepTwo()) {
//                   alert("Form Submitted Successfully");
//                 }
//                     }}>
//               {currentStep === 1 ? 'Next' : 'Submit'}
//             </button>
//           </form>
//         </div>
//       </section>
//     </main>
//   );
// }
