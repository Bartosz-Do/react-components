import Clock from '../components/Clock';
import { Metadata } from 'next';

export const metadata : Metadata = {
    title: 'Clock'
};

export default function Page() {
    return (
        <main>
            <div className="center">
                <Clock />
            </div>
        </main>
    );
}