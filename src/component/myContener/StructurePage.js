import React from 'react'
import styles from './StructurePage.module.css';
function StructurePage() {
  return (
        <>
        <div className={styles.numberStart}>
            <div className={styles.numberOneDiv}></div>
            <div className={styles.numberTwoDiv}>
                <div className={styles.fromDiv}>
                    <form className={styles.fromContaier}>
                        <div className={styles.btnContainer}>
                            <button className={styles.nextBtn}>Next</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    
  )
}

export default StructurePage