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

    const carousel = useRef<HTMLDivElement | null>(null);

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
        let intervalId : any;
        if (interval != 0) {
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

    return (
        <div className={styles.carousel} style={{maxWidth: `${maxWidth}px`}} ref={carousel}>
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