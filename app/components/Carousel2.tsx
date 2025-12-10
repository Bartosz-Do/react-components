'use client'
import { useState, useEffect, useRef, ReactNode, createElement, Children, isValidElement } from 'react';
import styles from './styles/carousel2.module.css';

export default function Carousel({ children, interval, maxWidth = 500 } : {
    children: ReactNode[],
    interval: number,
    maxWidth?: number
}) {
    let childrenArray = Children.toArray(children);
    const [centerElement, setCenterElement] = useState<number>(0);
    const [offsetX, setOffsetX] = useState<number>(440);
    const [progressBarKey, setProgressBarKey] = useState<number>(0);

    const carousel = useRef<HTMLDivElement | null>(null);

    const TouchStartX = useRef<number>(0);
    const TouchDeltaX = useRef<number>(0);

    const changeProgressBarKey = () => {
        setProgressBarKey(prev => {
            if (prev === 0) {
                return 1;
            } else {
                return 0;
            }
        })
    }
    const nextElement = () => {
        setCenterElement(prev => {
            let newElement = prev + 1;
            if (newElement >= childrenArray.length) {
                newElement = 0;
            }
            return newElement;
        });
    };
    const prevElement = () => {
        setCenterElement(prev => {
            let newElement = prev - 1;
            if (newElement < 0) {
                newElement = childrenArray.length - 1;
            }
            return newElement;
        });
    };

    useEffect(() => {
        childrenArray = Children.toArray(children);
    }, [children]);

    useEffect(() => {
        changeProgressBarKey();
        let intervalId : any;
        if (interval !== 0) {
            intervalId = setInterval(nextElement, interval);
        }

        return () => clearInterval(intervalId);
    }, [interval, centerElement]);

    useEffect(() => {
        if (!carousel.current) return;

        const updateOffset = () => {
            if (carousel.current) {
                const width = carousel.current.clientWidth;
                setOffsetX(width - 60);
            }
        };

        updateOffset();

        const resizeObserver = new ResizeObserver(updateOffset);
        resizeObserver.observe(carousel.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    // Touch

    const touchStartHandler = (e : React.TouchEvent<HTMLDivElement>) => {
        const touch = e.touches[0];
        if (touch) {
            TouchStartX.current = touch.clientX;
            TouchDeltaX.current = 0;
        }
    };

    const touchMoveHandler = (e : React.TouchEvent<HTMLDivElement>) => {
        const touch = e.touches[0];
        if (touch && TouchStartX.current !== 0) {
            TouchDeltaX.current = touch.clientX - TouchStartX.current;
        }
    };

    const touchEndHandler = () => {
        if (Math.abs(TouchDeltaX.current) > 40) {
            if (TouchDeltaX.current < 0) {
                nextElement();
            } else if (TouchDeltaX.current > 0) {
                prevElement();
            }
        }

        TouchStartX.current = 0;
        TouchDeltaX.current = 0;
    };


    return (
        <div className={styles.carousel} style={{maxWidth: `${maxWidth}px`}} ref={carousel} onTouchStart={touchStartHandler} onTouchMove={touchMoveHandler} onTouchEnd={touchEndHandler}>
            <div className={styles.elementsDiv}>
                { childrenArray.map((el, i) => {
                    if (isValidElement(el)) {
                        return (
                            <div key={i} className={styles.carouselDiv} style={{transform: `translateX(${20 - (centerElement * offsetX)}px) ${centerElement === i ? 'scaleY(105%)' : ''}`}}>
                                { createElement(el.type, el.props ? {...el.props} : {}) }
                            </div>
                        );
                    }
                }) }
            </div>

            <div className={styles.prevButton} onClick={prevElement}>&lt;</div>
            <div className={styles.nextButton} onClick={nextElement}>&gt;</div>
            { interval !== 0 ?  <div className={styles.progressBarDiv}>
                <div className={styles.progressBarBox}>
                    <div className={styles.progressBar} key={progressBarKey} style={{animation: `${styles.load} ${interval}ms linear`}}></div>
                </div>
            </div> : '' }
            <div className={styles.dotsDiv}>
                { childrenArray.map((el, i) => {
                    return (
                        <div key={i} className={styles.dot} style={{backgroundColor: i === centerElement ? 'green' : ''}} onClick={() => setCenterElement(i)}></div>
                    );
                }) }
            </div>
        </div>
    );
}