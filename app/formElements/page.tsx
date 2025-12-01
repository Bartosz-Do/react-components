import { Metadata } from "next";
import PrevievForm from './form';

export const metadata : Metadata = {
    title: 'Form Elements'
};

export default function Page() {
    return (
        <main>
            <PrevievForm />
        </main>
    )
}