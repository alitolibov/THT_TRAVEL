import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import React from 'react';
import uz from '../../../public/lang/uz';
import ru from '../../../public/lang/ru';
import Language from './Language';
import en from '../../../public/lang/en';

interface HeaderProps {
    
}

const Header: React.FC<HeaderProps> = () => {
    const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible
      };
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

    return (
        <motion.header
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        className='px-[15px] h-[20vh] flex items-center justify-between md:px-[25px] xl:px-0 xl:w-[1250px] xl:mx-auto'>
                <img src="/images/logo.png" className='w-[60px] md:w-[77px] xl:w-[85px]' alt="" />
                <nav className="flex gap-x-[10px] md:gap-x-[15px]">
                <p className="text-[#fff] text-[13px] duration-300 md:text-[15px] lg:cursor-pointer lg:hover:text-[var(--main-color-two)] lg:text-[15px]">{lang.header.services}</p>
                <p className="text-[#fff] text-[13px] duration-300 md:text-[15px] lg:cursor-pointer lg:hover:text-[var(--main-color-two)] lg:text-[15px]">{lang.header.about}</p>
                <p className="text-[#fff] text-[13px] duration-300 md:text-[15px] lg:cursor-pointer lg:hover:text-[var(--main-color-two)] lg:text-[15px]">{lang.header.employees}</p>
                </nav>
                <Language/>
        </motion.header>
    );
};

export default Header;