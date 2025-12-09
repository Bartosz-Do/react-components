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
    const [divWidth, setDivWidth] = useState<number>(400);

    const carousel = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const width = window.innerWidth;
        setDivWidth(width - 120);
    }, []);

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
        if (carousel.current) {
            const width = carousel.current.clientWidth;
            setOffsetX(width - 60);
            setDivWidth(width - 100);
        }     
    }, [carousel.current]);

    return (
        <div className={styles.carousel} ref={carousel}>
            { childrenArray.map((el, i) => {
                if (isValidElement(el)) {
                    return (
                        <div key={i} className={styles.carouselDiv} style={{minWidth: `${divWidth}px`, maxWidth: `${divWidth}px`, transform: `translateX(${20 - (centerElement * offsetX)}px) ${centerElement === i ? 'scale(105%)' : ''}`}}>
                            { createElement(el.type, el.props ? {...el.props} : {}) }
                        </div>
                    );
                }
            }) }
        </div>
    );
}