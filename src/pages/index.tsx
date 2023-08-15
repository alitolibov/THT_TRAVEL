import React from 'react';
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import uz from '../../public/lang/uz';
import ru from '../../public/lang/ru';
import en from '../../public/lang/en';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Count from './components/Count';
import Team from './components/Team';
import Head from 'next/head';
import Image from 'next/image';
import {Maps} from "@/pages/components/Maps";

interface MainProps {
    
}

const Main: React.FC<MainProps> = () => {
    const visible:any = { opacity: 1, y: 0, transition: { duration: 0.7 } };
    const itemVariants:any = {
        hidden: { opacity: 0, y: 10 },
        visible
      };
    const {locale} = useRouter()
    let lang:any
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
        <>
        <Head>
            <title>THT VISA</title>
        </Head>
        <motion.div 
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 0.4 } } }}>
            <div className="space-y-[20px] h-[80vh] flex flex-col justify-center pb-[50px]">
            <motion.h1 variants={{hidden: { opacity: 0, y: -20 }, visible}} className='font-[700] text-[36px] text-white leading-[44px] w-[285px] md:text-[45px] md:leading-[55px] md:w-[360px] lg:text-[60px] lg:leading-[75px] lg:w-[480px] xl:text-[72px] xl:leading-[85px] xl:w-[580px]'>{lang.header.greetings}</motion.h1>
            <motion.div variants={itemVariants} className="flex items-center gap-x-[5px]"><p className="font-[500] text-[12px] text-white md:text-[14px] lg:text-[15px] xl:text-base xxl:text-lg">{lang.header.scroll}</p> 
            <Image src="/images/bottom.png" height={16} width={16} alt=""/>
            </motion.div>
            </div>
            <Count/>
            <Services/>
            <Maps/>
        </motion.div>
        </>
    );
};

export default Main;