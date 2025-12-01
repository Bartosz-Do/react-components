'use client'
import styles from './styles/formElements.module.css';
import { useState, useEffect, useRef, ReactNode } from 'react';


// ---FORM--- //

export function Form({ action, method = 'GET', children, colors, style } : {
    action? : string | ((formData: FormData) => void | Promise<void>),
    method? : string,
    children? : ReactNode,
    colors? : string[],
    style? : React.CSSProperties
}) {
    return (
        <form action={action} method={method} className={styles.form} style={{...style, borderColor: colors ? colors[0] : '', backgroundColor: colors ? (colors[1] ? colors[1] : '') : ''}}>
            {children}
        </form>
    )
}


// ---INPUT--- //

export function Input({ value, labelValue, onChange, required, colors, name, id } : { 
    value : string | number,
    labelValue: string,
    onChange : any,
    required? : boolean,
    colors?: string[],
    name? : string,
    id? : string
}) {
    const [inputStyle, setInputStyle] = useState<React.CSSProperties>({ color: `${colors ? colors[0] : ''}`, backgroundColor: `${colors ? colors[1] : ''}` });

    useEffect(() => {
        if (value) {
            setInputStyle(prev => {
                let newStyle = {...prev};
                newStyle.top = '-22px';
                newStyle.fontSize = 'small';
                return newStyle;
            });
        } else {
            setInputStyle(prev => {
                let newStyle = {...prev};
                newStyle.top = '';
                newStyle.fontSize = '';
                return newStyle;
            });
        }
    }, [value]);
    
    return (
        <div className={styles.inputBox}>
            <label htmlFor={id} className={styles.inputLabel} style={{...inputStyle, color: `${colors ? colors[0] : ''}`, backgroundColor: colors ? (colors[1] ? colors[1] : '') : ''}}>{ labelValue } { required ? <span style={{color: '#C21807'}}>*</span> : '' }</label>
            <input type='text' id={id} name={name} value={value} className={styles.input} style={{backgroundColor: `${colors ? ( colors[1] ? colors[1] : '' ) : ''}`, color: `${colors ? colors[0] : ''}`, borderColor: `${colors ? colors[0] : ''}`}} onChange={onChange} required={ required } />
        </div>
    )
}


// ---BUTTON--- //

export function SubmitButton({ children, colors } : {
    children? : ReactNode,
    colors? : string[]
}) {
    const [buttonStyle, setButtonStyle] = useState<React.CSSProperties>({});

    const handleMouseOver = () => {
        setButtonStyle(prev => {
            let newStyle = { ...prev };
            newStyle.color = colors ? (colors[1] ? colors[1] : '') : '';
            newStyle.backgroundColor = colors ? colors[0] : '';
            return newStyle;
        });
    };

    const handleMouseOut = () => {
        setButtonStyle(prev => {
            let newStyle = { ...prev };
            delete newStyle.color;
            delete newStyle.backgroundColor;
            return newStyle;
        });
    };

    return (
        <div>
        <button type='submit' className={styles.button} style={{backgroundColor: `${colors ? ( colors[1] ? colors[1] : '' ) : ''}`, color: `${colors ? colors[0] : ''}`, borderColor: `${colors ? colors[0] : ''}`, ...buttonStyle}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{ children }</button>
        </div>
    )
}


// ---COLOR INPUT--- //

export function ColorInput({ value = 'black', labelValue, onChange, colors, name, id } : {
    value : string,
    labelValue : string,
    onChange : any,
    colors? : string[],
    name? : string,
    id? : string
}) {
    return (
        <div className={styles.colorInputBox}>
            <input type="color" name={name} id={id} value={value} onChange={onChange} className={styles.colorInput} style={{
                borderColor: colors ? colors[0] : '',
                backgroundColor: colors ? (colors[1] ? colors[1] : '') : ''
            }} />
            <label htmlFor={id} className={styles.colorInputLabel} style={{color: colors ? colors[0] : ''}}>{ labelValue }</label>
        </div>
    )
}


// ---DATE INPUT--- //

export function DateInput({ name, id, value, onChange, labelValue, colors, required } : {
    name? : string,
    id? : string,
    value : string,
    onChange : any,
    labelValue : string,
    colors? : string[],
    required? : boolean
}) {
    // new Date
    function isValidDate(date : string) : boolean {
        let dateArray = date.split('-');
        if (dateArray.length === 3) {
            if (!isNaN(parseInt(dateArray[0])) && ( parseInt(dateArray[0]).toString() === dateArray[0] )) {
                let year = parseInt(dateArray[0]);
                let month = parseInt(dateArray[1]);
                if (!isNaN(month) && dateArray[1].length == 2 && month > 0 && month <= 12) {
                    let day = parseInt(dateArray[2]);
                    let lastDay = (new Date(year, month, 0)).getDate();
                    if (!isNaN(day) && dateArray[2].length == 2 && day > 0 && day <= lastDay) {
                        return true;
                    } else return false;
                } else return false;
            } else return false;
        } else return false;
    }

    function parseDate(date : string) : string {
        let dateArray = date.split('-');
        return `${parseInt(dateArray[0])}-${parseInt(dateArray[1]).toString().padStart(2, '0')}-${parseInt(dateArray[2]).toString().padStart(2, '0')}`;
    }

    const [isCD, setIsCD] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const calendarRef = useRef<HTMLDivElement>(null);

    const [date, setDate] = useState<string>(value);
    const handleChange = (e : any) => {
        let Date = e.target.value;
        setDate(Date);
        if (isValidDate(Date)) {
            onChange(parseDate(Date));
            setDateOnCalendar(parseDate(Date));
            setMonthOnCalendar(() => {
                let dateArray = Date.split('-');
                let newArray = [];
                newArray[0] = parseInt(dateArray[0]);
                newArray[1] = parseInt(dateArray[1]);
                return newArray;
            });
        }
    };

    const handleBlur = (e : any) => {
        setDate(value);
        setIsFocused(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsCD(false);
            }
        };

        if (isCD) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCD]);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [dateOnCalendar, setDateOnCalendar] = useState<string>(value);
    const [monthOnCalendar, setMonthOnCalendar] = useState<number[]>(() => {
        let dateArray = value.split('-');
        let newArray = [];
        newArray[0] = parseInt(dateArray[0]);
        newArray[1] = parseInt(dateArray[1]);
        return newArray;
    });

    const nextMonth = (e: React.MouseEvent) => {
        e.stopPropagation();
        setMonthOnCalendar(prev => {
            const newArray = [...prev];
            newArray[1]++;
            if (newArray[1] >= 13) {
                newArray[0]++;
                newArray[1] = 1;
            }
            return newArray;
        });
    }
    const prevMonth = (e: React.MouseEvent) => {
        e.stopPropagation();
        setMonthOnCalendar(prev => {
            const newArray = [...prev];
            newArray[1]--;
            if (newArray[1] <= 0) {
                newArray[0]--;
                newArray[1] = 12;
            }
            return newArray;
        });
    }

    const setDateFromCalendar = (e : any) => {
        setDate(e.target.id);
        setDateOnCalendar(e.target.id);
        onChange(e.target.id);
    }

    const monthAndYear = (date : string) : string => {
        let dateArray = date.split('-');
        return `${months[parseInt(dateArray[1]) - 1]}  ${dateArray[0]}`;
    };

    const daysOfMonth = (date : string) : ReactNode => {
        let days : string[] = [];
        let dateArray = date.split('-');
        for (let i = 0; i < (new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, 1)).getDay() - 1; i++) {
            days[i] = '';
        }
        for (let i = 1; i <= (new Date(parseInt(dateArray[0]), parseInt(dateArray[1]), 0)).getDate(); i++) {
            days[i + (new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, 1)).getDay()] = `${i}`;
        }
        return (
            <>
            {days.map((el : string, i : number) => {
                if (el !== '') {
                    if (`${(new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(el))).getFullYear()}-${((new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(el))).getMonth() + 1).toString().padStart(2, '0')}-${((new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(el))).getDate()).toString().padStart(2, '0')}` === dateOnCalendar) {
                        return <div id={ `${(new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(el))).getFullYear()}-${((new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(el))).getMonth() + 1).toString().padStart(2, '0')}-${((new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(el))).getDate()).toString().padStart(2, '0')}` } key={ `${(new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(el))).getFullYear()}-${((new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(el))).getMonth() + 1).toString().padStart(2, '0')}-${((new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(el))).getDate()).toString().padStart(2, '0')}` } className={`${styles.days} ${styles.selected}`} onClick={setDateFromCalendar}>{ el }</div>
                    } else {
                        return <div id={`${(new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(el))).getFullYear()}-${((new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(el))).getMonth() + 1).toString().padStart(2, '0')}-${((new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(el))).getDate()).toString().padStart(2, '0')}`} key={ `${(new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(el))).getFullYear()}-${((new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(el))).getMonth() + 1).toString().padStart(2, '0')}-${((new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(el))).getDate()).toString().padStart(2, '0')}` } className={styles.days}  onClick={setDateFromCalendar}>{ el }</div>
                    }
                } else {
                    return <div className={styles.daysPlaceHolder} key={i}>{ el }</div>
                }
            })}
            </>
        )
    };

    return (
        <div className={styles.dateInputBox}>
            <label htmlFor={id} className={styles.dateInputLabel} style={{fontSize: 'small'}}>{ labelValue } { required ? <span style={{color: '#C21807'}}>*</span> : ''  }</label>
            <input type="text" id={id} name={name} className={styles.dateInput} value={date} onChange={handleChange} required={required} onFocus={() => {setIsCD(true); setIsFocused(true); setMonthOnCalendar(() => {
                let dateArray = value.split('-');
                let newArray = [];
                newArray[0] = parseInt(dateArray[0]);
                newArray[1] = parseInt(dateArray[1]);
                return newArray;
            });}} onBlur={handleBlur} />
            <div ref={calendarRef} className={styles.dateInputCalendar} style={{display: isCD || isFocused ? 'block' : 'none'}}>
                <div className={styles.dateInputCalendarHeader}>
                    <div className={styles.dateInputCalendarHeaderButton} onClick={prevMonth}>&lt;</div>
                    <p>{ monthAndYear(`${monthOnCalendar[0]}-${monthOnCalendar[1]}`) }</p>
                    <div className={styles.dateInputCalendarHeaderButton} onClick={nextMonth}>&gt;</div>
                </div>

                <div className={styles.dateInputCalendarDays}>
                    <div className={styles.firstRow}>mon</div>
                    <div className={styles.firstRow}>tue</div>
                    <div className={styles.firstRow}>wed</div>
                    <div className={styles.firstRow}>thu</div>
                    <div className={styles.firstRow}>fri</div>
                    <div className={styles.firstRow}>sat</div>
                    <div className={styles.firstRow}>sun</div>
                    { daysOfMonth(`${monthOnCalendar[0]}-${monthOnCalendar[1]}`) }
                </div>
            </div>
        </div>
    )
}