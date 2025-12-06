'use client'
import { ReactNode, Children, createElement, useState, useEffect, useRef } from 'react';
import styles from './styles/carousel.module.css';

export default function Karuzela({ children, interval } : { children: ReactNode, interval: number }) {
    const elements : any[] = Children.toArray(children);
    const [translate, setTranslate] = useState(6.25);
    const [element, setElement] = useState(0);
    const [restartKey, setRestartKey] = useState<number>(0);

    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);
    const touchDeltaX = useRef<number>(0);
    const dots = (() => {
        let tab = [];
        for (let i = 0; i < elements.length; i++) {
            tab[i] = i;
        }
        return tab;
    })();

    useEffect(() => {
        setRestartKey(prev => prev + 1);
        let intervalId = setTimeout(() => {
            setTranslate(prev => {
                if (prev === 6.25 - (112.5 * (elements.length - 1))) {
                    return 6.25;
                } else {
                    return prev - 112.5
                }
            });
            setElement(prev => {
                if (prev === elements.length - 1) {
                    return 0;
                } else {
                    return prev + 1;
                }
            });
        }, interval);

        return () => clearTimeout(intervalId);
    }, [element, elements.length, interval]);

    const changeElement = (element : number) => {
        setElement(element);
        setTranslate(6.25 - (element * 112.5));
    };

    const prevHandler = () => {
        setTranslate(prev => {
            if (prev === 6.25) {
                return 6.25 - (112.5 * (elements.length - 1));
            } else {
                return prev + 112.5
            }
        });
        setElement(prev => {
            if (prev === 0) {
                return elements.length - 1;
            } else {
                return prev - 1;
            }
        });
    };

    const nextHandler = () => {
        setTranslate(prev => {
            if (prev === 6.25 - (112.5 * (elements.length - 1))) {
                return 6.25;
            } else {
                return prev - 112.5
            }
        });
        setElement(prev => {
            if (prev === elements.length - 1) {
                return 0;
            } else {
                return prev + 1;
            }
        });
    };

    const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const t = e.touches[0];
        touchStartX.current = t.clientX;
        touchStartY.current = t.clientY;
        touchDeltaX.current = 0;
    };

    const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (touchStartX.current === null || touchStartY.current === null) return;
        const t = e.touches[0];
        const dx = t.clientX - touchStartX.current;
        const dy = t.clientY - touchStartY.current;
        if (Math.abs(dx) > Math.abs(dy)) {
            touchDeltaX.current = dx;
        }
    };

    const onTouchEnd = () => {
        const dx = touchDeltaX.current;
        const SWIPE_THRESHOLD_PX = 40;
        if (Math.abs(dx) > SWIPE_THRESHOLD_PX) {
            if (dx > 0) {
                prevHandler();
            } else {
                nextHandler();
            }
        }
        touchStartX.current = null;
        touchStartY.current = null;
        touchDeltaX.current = 0;
    };

    return (
        <div className={styles.karuzela} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            { elements.map((el, i) => {
                return createElement(
                    el.type,
                    { key: i, style: {
                        transform: `translateX(${translate}%) ${i == element ? 'scale(110%)' : 'scale(100%)'}`}, 
                        className: styles.div, 
                        ...el.props },
                    [...el.props.children]
                );
            }) }
            <div className={styles.divDots}>
                { dots.map((el, i) => {
                    return (<span onClick={() => {changeElement(el)}} key={i} style={{color: `${el == element ? 'green' : '#121212'}`, transition: '0.5s', cursor: 'pointer'}}>&#9679;</span>);
                }) }
            </div>
            <div className={styles.previous} onClick={prevHandler}>
                <h2>&lt;</h2>
            </div>
            <div className={styles.next} onClick={nextHandler}>
                <h2>&gt;</h2>
            </div>

            <div className={styles.center}>
                <div className={styles.loadingBar}>
                    <div className={styles.loadingProgres} style={{'--animation-duration': `${interval / 1000}s`} as React.CSSProperties} key={restartKey}>
                    </div>
                </div>
            </div>
        </div>
    );
}