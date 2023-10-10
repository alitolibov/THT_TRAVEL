import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import React from 'react';
import Language from './Language';
import Link from 'next/link';
import {useTranslation} from "next-i18next";

const Header = () => {
    const {asPath, locale} = useRouter()
    const {t} = useTranslation()

    return (
        <motion.header
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        className='h-[20vh] flex items-center justify-between px-4 lt:px-0 container mx-auto'>
                <Link locale={locale} href={'/'}><img src={"/images/logo.webp"} alt={'Logo'} className='w-14 md:w-20 xl:w-24'/></Link>
                <nav className="flex gap-x-[10px] md:gap-x-4 lg:gap-x-5 xxl:gap-x-6">
                <Link href={'/services'} locale={locale} className={`text-sm font-semibold duration-300 md:text-base lg:cursor-pointer lg:hover:text-[var(--main-color-two)] lg:text-lg xl:text-xl xxl:text-[22px] ${asPath == '/services' ? 'text-[var(--main-color-two)]' : 'text-[#fff]'}`}>{t('header.services')}</Link>
                <Link href={'/'} locale={locale} className="text-[#fff] text-sm font-semibold duration-300 md:text-base lg:cursor-pointer lg:hover:text-[var(--main-color-two)] lg:text-lg xl:text-xl xxl:text-[22px]">{t('header.index')}</Link>
                <Link href={'/about'} locale={locale} className={`text-[#fff] text-sm font-semibold duration-300 md:text-base lg:cursor-pointer lg:hover:text-[var(--main-color-two)] lg:text-lg xl:text-xl xxl:text-[22px] ${asPath == '/about' ? 'text-[var(--main-color-two)]' : 'text-[#fff]'}`}>{t('header.about')}</Link>
                </nav>
                <Language/>
        </motion.header>
    );
};

export default Header;