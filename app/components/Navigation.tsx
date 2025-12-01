'use client'
import { useState } from 'react';
import styles from './styles/navigation.module.css';
import Link from 'next/link';

export default function Navigation() {
    const [translate, setTranslate] = useState(100);

    const handleClick = () => {
        setTranslate(prev => {
            if (prev === 0) {
                return 100;
            }
            else {
                return 0;
            }
        })
    };

    return (
        <>
        <div className={styles.sideBar} style={{transform: `translateX(${translate}%)`}}>
            <Link className={styles.link} href='/' onClick={() => setTranslate(100)}>Home</Link>
            <Link className={styles.link} href='/logInForm' onClick={() => setTranslate(100)}>Log In Form</Link>
            <Link className={styles.link} href='/createAccountForm' onClick={() => setTranslate(100)}>Create Account Form</Link>
            <Link className={styles.link} href='/clock' onClick={() => setTranslate(100)}>Clock</Link>
            <Link className={styles.link} href='/filters' onClick={() => setTranslate(100)}>Filters</Link>
            <Link className={styles.link} href='/formElements' onClick={() => setTranslate(100)}>Form Elements</Link>
        </div>
        <nav className={styles.nav}>
            <Link href='/' className={styles.h2link} onClick={() => setTranslate(100)}><h2 className={styles.h2}>React components</h2></Link>
            <div className={styles.links}>
                <Link className={styles.link} href='/'>Home</Link>
                <Link className={styles.link} href='/logInForm'>Log In Form</Link>
                <Link className={styles.link} href='/createAccountForm'>Create Account Form</Link>
                <Link className={styles.link} href='/clock'>Clock</Link>
                <Link className={styles.link} href='/filters'>Filters</Link>
                <Link className={styles.link} href='/formElements'>Form Elements</Link>
            </div>

            <div className={styles.relative}>
            <div className={styles.button} onClick={handleClick}>
                <img src="/menuIcon.svg" alt="menu icon" />
            </div>
            </div>
        </nav>
        </>
    )
}