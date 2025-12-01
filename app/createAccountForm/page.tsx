import CreateAccountForm from "../components/createAccountForm"
import { Metadata } from 'next';

export const metadata : Metadata = {
    title: 'Create Account Form'
};

export default function Page() {
    return (
            <CreateAccountForm />
    )
}