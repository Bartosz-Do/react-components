import { Metadata } from 'next';
import Filters from '../components/Filters';

export const metadata : Metadata = {
    title: 'Filters'
};

export default function Page() {
    return (
        <main>
            <div className="center">
                <Filters />
            </div>
        </main>
    )
}