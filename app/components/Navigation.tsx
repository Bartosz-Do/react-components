'use client'
import { useEffect, useState, useRef } from 'react';
import styles from './styles/navigation.module.css';
import Link from 'next/link';

export default function Navigation() {
    const sideBar = useRef<HTMLDivElement>(null);
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

    useEffect(() => {
        const clickEvent = (e : MouseEvent) => {
            if (sideBar.current && !sideBar.current.contains(e.target as Node)) {
                setTranslate(100);
            }
        };

        if (translate === 0) {
            document.addEventListener('click', clickEvent);
        }
        
        return () => {
            document.removeEventListener('click', clickEvent);
        };
    }, [translate]);

    return (
        <>
        <div className={styles.sideBar} style={{transform: `translateX(${translate}%)`}} ref={sideBar}>
            <Link className={styles.link} href='/' onClick={() => setTranslate(100)}>Home</Link>
            <Link className={styles.link} href='/carousel' onClick={() => setTranslate(100)}>Carousel</Link>
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
                <Link className={styles.link} href='/carousel'>Carousel</Link>
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