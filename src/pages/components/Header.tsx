import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import React from 'react';
import uz from '../../../public/lang/uz';
import ru from '../../../public/lang/ru';
import Language from './Language';
import en from '../../../public/lang/en';
import Image from 'next/image';

interface HeaderProps {
    
}

const Header: React.FC<HeaderProps> = () => {
    const {locale} = useRouter()
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
        className='h-[20vh] flex items-center justify-between px-[15px] lt:max-w-[510px] lt:mx-auto lt:px-0 md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]'>
                <Image src="/images/logo.webp" width={60} height={60} className='w-[60px] md:w-[77px] xl:w-[85px]' alt=""/>
                <nav className="flex gap-x-[10px] md:gap-x-[15px] lg:gap-x-[20px]">
                <a onClick={(e) => anchor(e)} href='#services' className="text-[#fff] text-[13px] duration-300 md:text-[15px] lg:cursor-pointer lg:hover:text-[var(--main-color-two)] lg:text-[15px] xl:font-semibold xl:text-[16px]">{lang.header.services}</a>
                <a onClick={(e) => anchor(e)} href='#about' className="text-[#fff] text-[13px] duration-300 md:text-[15px] lg:cursor-pointer lg:hover:text-[var(--main-color-two)] lg:text-[15px] xl:font-semibold xl:text-[16px]">{lang.header.about}</a>
                <a onClick={(e) => anchor(e)} href='#employess' className="text-[#fff] text-[13px] duration-300 md:text-[15px] lg:cursor-pointer lg:hover:text-[var(--main-color-two)] lg:text-[15px] xl:font-semibold xl:text-[16px]">{lang.header.employees}</a>
                </nav>
                <Language/>
        </motion.header>
    );
};

export default Header;