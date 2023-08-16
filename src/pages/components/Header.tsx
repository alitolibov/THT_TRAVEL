import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import React from 'react';
import uz from '../../../public/lang/uz.json';
import ru from '../../../public/lang/ru.json';
import Language from './Language';
import en from '../../../public/lang/en.json';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
    
}

const Header: React.FC<HeaderProps> = () => {
    const {locale, asPath} = useRouter()
    let lang
    switch(locale) {
        case 'uz':
            lang = uz
          break
        case 'ru': 
        lang = ru
          break
        default:
            lang = en
          break
      }
      
      const anchor = (e:any) => {
        e.preventDefault()
        const blockID = e.target.getAttribute('href') as HTMLElement
        document.querySelector('' + blockID)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
      }


    return (
        <motion.header
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        className='h-[20vh] flex items-center justify-between px-[15px] lt:max-w-lg lt:mx-auto lt:px-0 md:max-w-[745px] lg:max-w-[980px] xl:max-w-[1180px] xxl:max-w-7xl'>
                <Link href={'/'}><Image src="/images/logo.webp" width={60} height={60} className='w-14 md:w-20 xl:w-24' alt=""/></Link>
                <nav className="flex gap-x-[10px] md:gap-x-4 lg:gap-x-5 xxl:gap-x-6">
                <Link href={'/services'} className={`text-[13px] font-semibold duration-300 md:text-[15px] lg:cursor-pointer lg:hover:text-[var(--main-color-two)] lg:text-[17px] xl:text-lg xxl:text-xl ${asPath == '/services' ? 'text-[var(--main-color-two)]' : 'text-[#fff]'}`}>{lang.header.services}</Link>
                <Link href={'/'} className="text-[#fff] text-[13px] font-semibold duration-300 md:text-[15px] lg:cursor-pointer lg:hover:text-[var(--main-color-two)] lg:text-[17px] xl:text-lg xxl:text-xl">{lang.header.index}</Link>
                <Link href={'/about'} className={`text-[#fff] text-[13px] font-semibold duration-300 md:text-[15px] lg:cursor-pointer lg:hover:text-[var(--main-color-two)] lg:text-[17px] xl:text-lg xxl:text-xl ${asPath == '/about' ? 'text-[var(--main-color-two)]' : 'text-[#fff]'}`}>{lang.header.about}</Link>
                </nav>
                <Language/>
        </motion.header>
    );
};

export default Header;