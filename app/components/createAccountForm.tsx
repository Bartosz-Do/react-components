'use client'
import styles from './styles/logInForm.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function CreateAccountForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        switch (e.target.id) {
            case 'username':
                setUsername(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            default:
                return;
        }
    }

    const handleSubmit = (e : FormEvent) => {
        e.preventDefault();
        console.log(username);
    }

    return (
        <div className={styles.background}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Sign Up!</h2>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' value={username} onChange={inputChangeHandler} />
                <label htmlFor='password'>Password</label>
                <input type="password" id="password" value={password} onChange={inputChangeHandler} />
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" value={email} onChange={inputChangeHandler} />
                <button type="submit">Sign Up!</button>
            </form>
        </div>
    );
}