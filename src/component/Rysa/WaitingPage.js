import React from 'react';
import styles from './WaitingPage.module.css';
import { FaHourglassHalf } from 'react-icons/fa';

export default function WaitingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <FaHourglassHalf className={styles.icon} />
      </div>
      <h1 className={styles.waitingText}>Waiting</h1>
      <hr className={styles.line} />
      <p className={styles.subText}>Be patient , this page will redirect soon.</p>
    </div>
  );
}
