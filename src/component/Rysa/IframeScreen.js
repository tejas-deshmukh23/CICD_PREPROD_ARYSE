'use client';
import Image from 'next/image';
import styles from './IframeScreen.module.css';
import hdb from '../../../public/Jays/HDB.png';
export default function IframePage() {
  
  return (
    <main className={styles.page}>
    {/* <div className={styles.mainCard}></div> */}
      {/*—‑ हेडर ‑—*/}
      {/* <header className={styles.header}>Review Loan Application</header> */}
      <div className={styles.header}>
         <div className={styles.headerLogo}>
                  <Image
                    src={hdb}
                    alt="Hdb tag"
                    style={{alignContent:"center",width:"auto",height:"auto", top:"-4"}}
                  />
                </div>
      </div>
      {/*—‑ कार्ड ‑—*/}
      <section className={styles.card}>
        <div className={styles.iframeContainer}>
          <iframe 
            src="http://localhost:3000/myContener/ReviewLoan"  
            className={styles.iframe}
            title="Iframe"
          ></iframe>
        </div>

        <div className={styles.btnContainer}>
          <button type="button"
                    className={styles.nextBtn} >
              Next
            </button>
        </div>
      </section>
    </main>
  );
}
