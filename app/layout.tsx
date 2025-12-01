import { Metadata } from 'next';
import { ReactNode } from 'react';
import './styles/globals.css';
import Navigation from './components/Navigation';

export const metadata : Metadata = {
    title: 'React components',
    description: 'Karuzela'
};

export default function Layout({ children } : { children : ReactNode }) {
    return (
        <html lang='pl'>
            <body>
                <Navigation />
                { children }
            </body>
        </html>
    );
}