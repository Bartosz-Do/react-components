'use client'
import { useState, useEffect } from 'react';
import styles from './styles/clock.module.css';

export default function Clock() {
    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);
    const [second, setSecond] = useState<number>(0);

    useEffect(() => {
        const setCurrentTime = () => {
            const now = new Date();
            setHour(now.getHours());
            setMinute(now.getMinutes());
            setSecond(now.getSeconds());
        }
        
        setCurrentTime();

        const intervalId = setInterval(setCurrentTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.clock}>
            <div className={styles.number} style={{left: '50%', transform: 'translateX(-50%)'}}>
                12
            </div>
            <div className={styles.number} style={{right: '25%', top: '6.7%'}}>
                1
            </div>
            <div className={styles.number} style={{right: '6.7%', top: '25%', transform: 'translateY(-25%) translateX(-25%)'}}>
                2
            </div>
            <div className={styles.number} style={{right: '0', top: '50%', transform: 'translateY(-50%)'}}>
                3
            </div>
            <div className={styles.number} style={{right: '6.7%', bottom: '25%', transform: 'translateY(25%) translateX(-25%)'}}>
                4
            </div>
            <div className={styles.number} style={{right: '25%', bottom: '6.7%'}}>
                5
            </div>
            <div className={styles.number} style={{left: '50%', bottom: '0', transform: 'translateX(-50%)'}}>
                6
            </div>
            <div className={styles.number} style={{left: '25%', bottom: '6.7%'}}>
                7
            </div>
            <div className={styles.number} style={{left: '6.7%', bottom: '25%', transform: 'translateX(25%) translateY(25%)'}}>
                8
            </div>
            <div className={styles.number} style={{left: '0', top: '50%', transform: 'translateY(-50%)'}}>
                9
            </div>
            <div className={styles.number} style={{left: '6.7%', top: '25%', transform: 'translateX(25%) translateY(-25%)'}}>
                10
            </div>
            <div className={styles.number} style={{left: '25%', top: '6.7%'}}>
                11
            </div>

            <div className={styles.centerDot}></div>
            <div className={styles.hourHand} style={{transform: `translateX(-50%) translateY(-110%) rotate(${((hour % 12) * 30) + (minute % 60) * 0.5}deg)`}}></div>
            <div className={styles.minuteHand} style={{transform: `translateX(-50%) translateY(-107.5%) rotate(${minute * 6}deg)`}}></div>
            <div className={styles.secondHand} style={{transform: `translateX(-50%) translateY(-105%) rotate(${second * 6}deg)`}}></div>
        </div>
    )
}