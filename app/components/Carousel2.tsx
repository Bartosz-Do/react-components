'use client'
import { useState, useEffect, useRef, ReactNode, createElement, Children, isValidElement } from 'react';
import styles from './styles/carousel2.module.css';

export default function Carousel({ children, interval } : {
    children: ReactNode[],
    interval: number
}) {
    const childrenArray = Children.toArray(children);
    const [centerElement, setCenterElement] = useState<number>(0);
    const [offsetX, setOffsetX] = useState<number>(440);

    const carousel = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let intervalId : any;
        if (interval != 0) {
            intervalId = setInterval(() => {
                setCenterElement(prev => {
                    let newElement = prev + 1;
                    if (newElement >= childrenArray.length) {
                        newElement = 0;
                    }
                    return newElement;
                });
            }, interval);
        }

        return () => clearInterval(intervalId);
    }, [interval]);

    useEffect(() => {
        if (!carousel.current) return;

        const updateDimensions = () => {
            if (carousel.current) {
                const width = carousel.current.clientWidth;
                setOffsetX(width - 60);
            }
        };

        updateDimensions();

        const resizeObserver = new ResizeObserver(updateDimensions);
        resizeObserver.observe(carousel.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div className={styles.carousel} ref={carousel}>
            { childrenArray.map((el, i) => {
                if (isValidElement(el)) {
                    return (
                        <div key={i} className={styles.carouselDiv} style={{transform: `translateX(${20 - (centerElement * offsetX)}px) ${centerElement === i ? 'scale(105%)' : ''}`}}>
                            { createElement(el.type, el.props ? {...el.props} : {}) }
                        </div>
                    );
                }
            }) }
        </div>
    );
}