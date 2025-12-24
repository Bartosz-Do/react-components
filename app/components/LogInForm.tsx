'use client'
import { ChangeEvent, FormEvent, useState } from 'react';
import { BackgroundBlurForm, TextInput, SubmitButton } from './FormElements';
import styles from './styles/logInForm.module.css';

export default function LogInForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(`username:\t${username}\npassword:\t${password}`);
    };

    const handleChangeUn = ({ target } : ChangeEvent<HTMLInputElement>) => {
        setUsername(target.value);
    };

    const handleChangePw = ({ target } : ChangeEvent<HTMLInputElement>) => {
        setPassword(target.value);
    };

    return (
        <>
        {/*<div className={styles.background}>
            <form className={styles.form} method='POST' onSubmit={handleSubmit}>
            <h2>Sign In!</h2>
                <label htmlFor="username">Username</label>
                <input type="text" id='username' value={username} onChange={handleChangeUn} />
                <label htmlFor="password">Password</label>
                <input type="password" id='password' value={password} onChange={handleChangePw} />
                <button type='submit'>Sign In!</button>
            </form>
        </div>*/}
        <div className={styles.background}>
            <div className={styles.centerOnScreen}>
                <BackgroundBlurForm style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} onSubmit={handleSubmit}>
                    <h2 style={{color: '#F8F9F5', textAlign: 'center'}}>Sign In!</h2>
                    <TextInput value={username} labelValue='Username' stateSetter={setUsername} colors={['#F8F9F5', 'rgba(0, 0, 0, 0)']} />
                    <SubmitButton changeOnHover={false} colors={['#F8F9F5', 'rgba(0, 0, 0, 0)']}>Sign In!</SubmitButton>
                </BackgroundBlurForm>
            </div>
        </div>
        </>
    )
}