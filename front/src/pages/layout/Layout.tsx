import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {

    const {pathname} = useRouter()
    
    return (
        <div className={pathname === '/' ? "bg" : ''}>
            <Header/>
            <main className='px-4 lt:px-0 container mx-auto'>
            {children}
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;