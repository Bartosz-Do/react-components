'use client'
import { FormEvent, useState } from 'react';
import { BackgroundBlurForm, TextInput, PasswordInput, SubmitButton } from './FormElements';
import styles from './styles/logInForm.module.css';

export default function LogInForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(`username:\t${username}\npassword:\t${password}`);
    };

    return (
        <>
            <div className={styles.background}>
                <div className={styles.centerOnScreen}>
                    <BackgroundBlurForm style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} onSubmit={handleSubmit}>
                        <h2 style={{color: '#F8F9F5', textAlign: 'center'}}>Sign In!</h2>
                        <TextInput value={username} labelValue='Username' stateSetter={setUsername} colors={['#F8F9F5', 'rgba(0, 0, 0, 0)']} />
                        <PasswordInput value={password} stateSetter={setPassword} labelValue='Password' colors={['#F8F9F5', 'rgba(0, 0, 0, 0)']} />
                        <SubmitButton changeOnHover={false} colors={['#F8F9F5', 'rgba(0, 0, 0, 0)']}>Sign In!</SubmitButton>
                    </BackgroundBlurForm>
                </div>
            </div>
        </>
    )
}