import React, { useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className='bg'>
            <Header/>
            <main className='px-[15px] md:px-[25px] xl:px-0 xl:w-[1250px] xl:mx-auto'>
            {children}
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;