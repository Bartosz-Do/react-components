'use client'
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './styles/logInForm.module.css';

export default function LogInForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    const handleChangeUn = ({ target } : ChangeEvent<HTMLInputElement>) => {
        setUsername(target.value);
    };

    const handleChangePw = ({ target } : ChangeEvent<HTMLInputElement>) => {
        setPassword(target.value);
    };

    return (
        <>
        <div className={styles.background}>
            <form className={styles.form} method='POST' onSubmit={handleSubmit}>
            <h2>Sign In!</h2>
                <label htmlFor="username">Username</label>
                <input type="text" id='username' value={username} onChange={handleChangeUn} />
                <label htmlFor="password">Password</label>
                <input type="password" id='password' value={password} onChange={handleChangePw} />
                <button type='submit'>Sign In!</button>
            </form>
        </div>
        </>
    )
}