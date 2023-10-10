import { motion } from "framer-motion";
import React from 'react';
import Link from "next/link";
import {useTranslation} from "next-i18next";
import Image from "next/image";

interface FooterProps {
    
}

const animation = {
    hidden: {
        y: 20,
        opacity: 0
    },
    visible: (custom: number) => ({
        y: 0,
        opacity: 1,
        transition: {delay: custom * 0.5}
    })
}

const Footer: React.FC<FooterProps> = () => {
    const {t} = useTranslation()

    return (
        <motion.footer
        initial='hidden'
        whileInView='visible'
        viewport={{ amount: 0.4, once: true}}
         className=' py-[27px] flex flex-col items-center space-y-[20px] lg:flex-row lg:justify-between px-4 lt:px-0 container mx-auto'>
            <motion.img custom={0.7} variants={animation} src="/images/logo.webp" className='h-[75px] md:h-[85px]' alt="" />
            <motion.nav custom={1} variants={animation} className='space-y-[5px]'>
                <Link href={'/about'} className="block text-[#fff] text-sm text-center md:text-base lg:cursor-pointer lg:hover:text-[var(--main-color-two)] duration-500 lg:text-left lg:text-lg">{t('header.about')}</Link>
                <Link href='/services' className="block text-[#fff] text-sm text-center md:text-base lg:cursor-pointer lg:hover:text-[var(--main-color-two)] duration-500 lg:text-left lg:text-lg">{t('header.services')}</Link>
                <Link href='/' className="block text-[#fff] text-sm text-center md:text-base lg:cursor-pointer lg:hover:text-[var(--main-color-two)] duration-500 lg:text-left lg:text-lg">{t('header.index')}</Link>
            </motion.nav>
            <div className="gap-y-[5px] lg:hidden">
            <motion.a custom={1.3} variants={animation} className="flex items-center gap-x-[7px]" href="tel:+998953238880">
            <svg height="20px" version="1.1" viewBox="0 0 512 512" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M415.9,335.5c-14.6-15-56.1-43.1-83.3-43.1c-6.3,0-11.8,1.4-16.3,4.3c-13.3,8.5-23.9,15.1-29,15.1c-2.8,0-5.8-2.5-12.4-8.2  l-1.1-1c-18.3-15.9-22.2-20-29.3-27.4l-1.8-1.9c-1.3-1.3-2.4-2.5-3.5-3.6c-6.2-6.4-10.7-11-26.6-29l-0.7-0.8  c-7.6-8.6-12.6-14.2-12.9-18.3c-0.3-4,3.2-10.5,12.1-22.6c10.8-14.6,11.2-32.6,1.3-53.5c-7.9-16.5-20.8-32.3-32.2-46.2l-1-1.2  c-9.8-12-21.2-18-33.9-18c-14.1,0-25.8,7.6-32,11.6c-0.5,0.3-1,0.7-1.5,1c-13.9,8.8-24,20.9-27.8,33.2c-5.7,18.5-9.5,42.5,17.8,92.4  c23.6,43.2,45,72.2,79,107.1c32,32.8,46.2,43.4,78,66.4c35.4,25.6,69.4,40.3,93.2,40.3c22.1,0,39.5,0,64.3-29.9  C442.3,370.8,431.5,351.6,415.9,335.5z" fill='#F6B011'/></svg> 
            <p className="text-[#fff] text-sm md:text-base">+998 (95) 323-88-80</p>
            </motion.a>
            <motion.a custom={1.3} variants={animation} className="flex items-center gap-x-[7px]" href="tel:+998953230222">
            <svg height="20px" version="1.1" viewBox="0 0 512 512" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M415.9,335.5c-14.6-15-56.1-43.1-83.3-43.1c-6.3,0-11.8,1.4-16.3,4.3c-13.3,8.5-23.9,15.1-29,15.1c-2.8,0-5.8-2.5-12.4-8.2  l-1.1-1c-18.3-15.9-22.2-20-29.3-27.4l-1.8-1.9c-1.3-1.3-2.4-2.5-3.5-3.6c-6.2-6.4-10.7-11-26.6-29l-0.7-0.8  c-7.6-8.6-12.6-14.2-12.9-18.3c-0.3-4,3.2-10.5,12.1-22.6c10.8-14.6,11.2-32.6,1.3-53.5c-7.9-16.5-20.8-32.3-32.2-46.2l-1-1.2  c-9.8-12-21.2-18-33.9-18c-14.1,0-25.8,7.6-32,11.6c-0.5,0.3-1,0.7-1.5,1c-13.9,8.8-24,20.9-27.8,33.2c-5.7,18.5-9.5,42.5,17.8,92.4  c23.6,43.2,45,72.2,79,107.1c32,32.8,46.2,43.4,78,66.4c35.4,25.6,69.4,40.3,93.2,40.3c22.1,0,39.5,0,64.3-29.9  C442.3,370.8,431.5,351.6,415.9,335.5z" fill='#F6B011'/></svg> 
            <p className="text-[#fff] text-sm md:text-base">+998 (95) 323-02-22</p>
            </motion.a>
            </div>
            <motion.div custom={1.3} variants={animation} className="lg:space-y-[8px]">
            <div className="flex space-x-[12px] md:space-x-[15px]">
                <a href="https://t.me/thtagency02">
                    <Image width={25} height={25} src="/images/tg.webp" className='h-[25px] md:h-[27px] lg:cursor-pointer' alt="" />
                </a>
                <a href="https://www.instagram.com/tht_viza/">
                    <Image width={25} height={25} src="/images/insta.webp" className='h-[25px] md:h-[27px] lg:cursor-pointer' alt="" />
                </a>
                <a href="mailto:thtagency02@gmail.com">
                    <Image width={25} height={25} src="/images/gmail.webp" className='h-[25px] md:h-[27px] lg:cursor-pointer' alt="" />
                </a>
            </div>
            <div className="space-y-[5px] hidden lg:block">
            <a className="gap-x-[7px] flex items-center cursor-pointer telHover" href="tel:+998953238880">
            <svg height="20px" version="1.1" viewBox="0 0 512 512" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M415.9,335.5c-14.6-15-56.1-43.1-83.3-43.1c-6.3,0-11.8,1.4-16.3,4.3c-13.3,8.5-23.9,15.1-29,15.1c-2.8,0-5.8-2.5-12.4-8.2  l-1.1-1c-18.3-15.9-22.2-20-29.3-27.4l-1.8-1.9c-1.3-1.3-2.4-2.5-3.5-3.6c-6.2-6.4-10.7-11-26.6-29l-0.7-0.8  c-7.6-8.6-12.6-14.2-12.9-18.3c-0.3-4,3.2-10.5,12.1-22.6c10.8-14.6,11.2-32.6,1.3-53.5c-7.9-16.5-20.8-32.3-32.2-46.2l-1-1.2  c-9.8-12-21.2-18-33.9-18c-14.1,0-25.8,7.6-32,11.6c-0.5,0.3-1,0.7-1.5,1c-13.9,8.8-24,20.9-27.8,33.2c-5.7,18.5-9.5,42.5,17.8,92.4  c23.6,43.2,45,72.2,79,107.1c32,32.8,46.2,43.4,78,66.4c35.4,25.6,69.4,40.3,93.2,40.3c22.1,0,39.5,0,64.3-29.9  C442.3,370.8,431.5,351.6,415.9,335.5z" fill='#F6B011'/></svg> 
            <p className="text-[#fff] text-[14px] md:text-[16px] leading-[14px]">+998 (95) 323-88-80</p>
            </a>
            <a className="gap-x-[7px] flex items-center cursor-pointer telHover" href="tel:+998953230222">
            <svg height="20px" version="1.1" viewBox="0 0 512 512" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M415.9,335.5c-14.6-15-56.1-43.1-83.3-43.1c-6.3,0-11.8,1.4-16.3,4.3c-13.3,8.5-23.9,15.1-29,15.1c-2.8,0-5.8-2.5-12.4-8.2  l-1.1-1c-18.3-15.9-22.2-20-29.3-27.4l-1.8-1.9c-1.3-1.3-2.4-2.5-3.5-3.6c-6.2-6.4-10.7-11-26.6-29l-0.7-0.8  c-7.6-8.6-12.6-14.2-12.9-18.3c-0.3-4,3.2-10.5,12.1-22.6c10.8-14.6,11.2-32.6,1.3-53.5c-7.9-16.5-20.8-32.3-32.2-46.2l-1-1.2  c-9.8-12-21.2-18-33.9-18c-14.1,0-25.8,7.6-32,11.6c-0.5,0.3-1,0.7-1.5,1c-13.9,8.8-24,20.9-27.8,33.2c-5.7,18.5-9.5,42.5,17.8,92.4  c23.6,43.2,45,72.2,79,107.1c32,32.8,46.2,43.4,78,66.4c35.4,25.6,69.4,40.3,93.2,40.3c22.1,0,39.5,0,64.3-29.9  C442.3,370.8,431.5,351.6,415.9,335.5z" fill='#F6B011'/></svg> 
            <p className="text-[#fff] text-[14px] md:text-[16px] leading-[14px]">+998 (95) 323-02-22</p>
            </a>
            </div>
            </motion.div>
        </motion.footer>
    );
};

export default Footer;