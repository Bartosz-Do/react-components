import LogInForm from '../components/LogInForm';
import { Metadata } from 'next';

export const metadata : Metadata = {
    title: 'Log In Form'
};

export default function Page() {
    return (
        <LogInForm />
    )
}