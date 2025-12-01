'use client'
import { useState, useEffect, useRef } from 'react';
import styles from './styles/filters.module.css';
import getProducts from '@/actions/getProducts.js';

export default function Filters() {
    const [dropdownDisplay, setDropdownDisplay] = useState<string>('none');
    const [products, setProducts] = useState<{name: string, condition: string}[]>([]);

    const [name, setName] = useState<string>('');
    const [condition, setCondition] = useState<string[]>([]);

    const filtersDropdown = useRef<HTMLDivElement>(null);
    const filtersDropdowP = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        (async () => {
            const res = await getProducts();
            setProducts(res);
        })();
    }, []);

    useEffect(() => {
        const hideDropdown = (e : MouseEvent) => {
            if (filtersDropdown.current && !filtersDropdown.current.contains(e.target as Node) && !filtersDropdowP.current?.contains(e.target as Node)) {
                setDropdownDisplay('none');
            }
        }

        if (dropdownDisplay === 'block') {
            document.addEventListener('mousedown', hideDropdown);
        }

        return () => {
            document.removeEventListener('mousedown', hideDropdown);
        }
    }, [dropdownDisplay]);

    const filtersChangeHandler = (e: any) => {
        const name = e.target.name;
        if (e.target.checked) {
            setCondition(prev => [...prev, name]);
        } else {
            setCondition(prev => prev.filter(el => el !== name));
        }
    }

    const searchBarChangeHandler = (e : any) => {
        setName(e.target.value);
    }

    return (
        <div className={styles.window}>
            <div className={styles.header}>
                <h2>Search for products</h2>

                <div className={styles.filters}>
                    <div className={styles.dropdown}>
                        <p onClick={() => setDropdownDisplay(prev => prev === 'none' ? 'block' : 'none')} ref={filtersDropdowP}>Filters</p>

                        <div className={styles.dropdownMenu} style={{display: dropdownDisplay}} ref={filtersDropdown}>
                            <div className={styles.option}>
                                <span style={{color: 'gray'}}>Condition</span>
                            </div>
                            <div className={styles.option}>
                                <input type="checkbox" name="new" id="new" onChange={filtersChangeHandler} />
                                <label htmlFor="new">new</label>
                            </div>
                            <div className={styles.option}>
                                <input type="checkbox" name="second hand" id="second_hand" onChange={filtersChangeHandler} />
                                <label htmlFor="nowy">second hand</label>
                            </div>
                        </div>

                    </div>

                    <div className={styles.searchBar}>
                        <input type="text" name="searchBar" id="searchBar" placeholder='What are you searching for...' onChange={searchBarChangeHandler} value={name} />
                    </div>
                </div>
            </div>

            <div className={styles.products}>
                { products[0] ? products.map((el, i) => {
                    if (el.name.toLowerCase().includes(name.toLowerCase())) {
                        if (!condition[0]) {
                            return (
                                <div key={i}>{el.name} : {el.condition}</div>
                            );
                        } else {
                            if (condition.includes(el.condition)) {
                                return (
                                    <div key={i}>{el.name} : {el.condition}</div>
                                );
                            };
                        }
                    }
                }) : 'Loading ...' }
            </div>
        </div>
    )
}