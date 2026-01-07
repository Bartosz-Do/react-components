'use client'
import styles from './styles/logInForm.module.css';
import { useState } from 'react';
import { TextInput, PasswordInput, BackgroundBlurForm, SubmitButton, EmailInput } from './FormElements';

export default function CreateAccountForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        console.log(`username:\t${username}\npassword:\t${password}\nemail:\t${email}`);
    };

    return (
        <div className={styles.background}>
            <div className={styles.centerOnScreen}>
                <BackgroundBlurForm style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} onSubmit={handleSubmit}>
                    <h2 style={{color: '#F8F9F5', textAlign: 'center'}}>Sign Up!</h2>
                    <TextInput value={username} stateSetter={setUsername} labelValue='Username' colors={['#F8F9F5', 'rgba(0, 0, 0, 0)']} required={true} />
                    <PasswordInput value={password} stateSetter={setPassword} labelValue='Password' colors={['#F8F9F5', 'rgba(0, 0, 0, 0)']} required={true} />
                    <EmailInput value={email} stateSetter={setEmail} labelValue='E-mail' colors={['#F8F9F5', 'rgba(0, 0, 0, 0)']} required={true} />
                    <SubmitButton changeOnHover={false} colors={['#F8F9F5', 'rgba(0, 0, 0, 0)']}>Sign Up!</SubmitButton>
                </BackgroundBlurForm>
            </div>
        </div>
    );
}