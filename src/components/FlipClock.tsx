'use client';

import { useEffect, useRef } from 'react';
import styles from './FlipClock.module.css';

export function FlipClock() {
  const minTensRef = useRef<HTMLDivElement>(null);
  const minOnesRef = useRef<HTMLDivElement>(null);
  const secTensRef = useRef<HTMLDivElement>(null);
  const secOnesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let totalSeconds = 1800; // 30 minutes

    function getDigits(seconds: number) {
      if (seconds < 0) seconds = 1800;
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return {
        mT: Math.floor(m / 10),
        mO: m % 10,
        sT: Math.floor(s / 10),
        sO: s % 10
      };
    }

    function flipDigit(container: HTMLDivElement | null, nextDigit: number, maxDigit: number) {
      if (!container) return;
      const activeCard = container.querySelector(`.${styles.active}`) as HTMLElement;
      const nextBg = container.querySelector(`.${styles.nextBg}`) as HTMLElement;
      
      if (!activeCard || !nextBg) return;

      activeCard.classList.add(styles.flipped);

      setTimeout(() => {
        activeCard.style.transition = 'none';
        activeCard.classList.remove(styles.flipped);
        
        container.setAttribute('data-bottom', nextDigit.toString());
        activeCard.setAttribute('data-num', nextDigit.toString());
        
        const nextNextDigit = (nextDigit - 1 < 0) ? maxDigit : nextDigit - 1;
        activeCard.setAttribute('data-num-next', nextNextDigit.toString());
        nextBg.setAttribute('data-num', nextNextDigit.toString());
        
        void activeCard.offsetWidth; // Force DOM reflow
        activeCard.style.transition = '';
      }, 600);
    }

    const interval = setInterval(() => {
      const current = getDigits(totalSeconds);
      totalSeconds--;
      if (totalSeconds < 0) {
        totalSeconds = 1800;
      }
      const next = getDigits(totalSeconds);

      if (current.sO !== next.sO) flipDigit(secOnesRef.current, next.sO, 9);
      if (current.sT !== next.sT) flipDigit(secTensRef.current, next.sT, 5);
      if (current.mO !== next.mO) flipDigit(minOnesRef.current, next.mO, 9);
      if (current.mT !== next.mT) flipDigit(minTensRef.current, next.mT, 5);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.clockWrapper}>
      <div className={styles.container}>
        {/* Minutes Tens */}
        <div className={styles.nums} ref={minTensRef} data-bottom="3">
          <div className={`${styles.num} ${styles.nextBg}`} data-num="2" data-num-next="2"></div>
          <div className={`${styles.num} ${styles.active}`} data-num="3" data-num-next="2"></div>
        </div>
        
        {/* Minutes Ones */}
        <div className={styles.nums} ref={minOnesRef} data-bottom="0">
          <div className={`${styles.num} ${styles.nextBg}`} data-num="9" data-num-next="9"></div>
          <div className={`${styles.num} ${styles.active}`} data-num="0" data-num-next="9"></div>
        </div>
        
        <div className={styles.colon}>:</div>

        {/* Seconds Tens */}
        <div className={styles.nums} ref={secTensRef} data-bottom="0">
          <div className={`${styles.num} ${styles.nextBg}`} data-num="5" data-num-next="5"></div>
          <div className={`${styles.num} ${styles.active}`} data-num="0" data-num-next="5"></div>
        </div>
        
        {/* Seconds Ones */}
        <div className={styles.nums} ref={secOnesRef} data-bottom="0">
          <div className={`${styles.num} ${styles.nextBg}`} data-num="9" data-num-next="9"></div>
          <div className={`${styles.num} ${styles.active}`} data-num="0" data-num-next="9"></div>
        </div>
      </div>
    </div>
  );
}
