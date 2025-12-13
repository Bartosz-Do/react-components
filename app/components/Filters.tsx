'use client'
import { useState, useEffect, useRef } from 'react';
import styles from './styles/filters.module.css';
import getProducts from '@/actions/getProducts.js';

import { TextInput } from './FormElements';

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
                        <TextInput 
                            value={name}
                            stateSetter={setName}
                            labelValue='Search...'
                            colors={['#F7F8F5', '#121212']}
                            image={{
                                viewBox: '23.060344 10.772654 68.487137 68.487289',
                                path: 'm 66.547095,10.772654 a 25,25 0 0 0 -17.677474,7.32255 25,25 0 0 0 -2.300635,32.706014 l -23.508642,23.508643 4.949568,4.950085 23.508643,-23.508643 a 25,25 0 0 0 32.706531,-2.300634 25,25 0 0 0 0,-35.355465 25,25 0 0 0 -17.677991,-7.32255 z m 0,5.000211 a 20,20 0 0 1 14.142289,5.858041 20,20 0 0 1 0,28.284062 20,20 0 0 1 -28.284062,0 20,20 0 0 1 1e-6,-28.284062 20,20 0 0 1 14.141772,-5.858041 z'
                            }}
                            style={{
                                margin: '20px 0px 25px 0px'
                            }}
                        />
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