import React from 'react';
import { motion } from 'framer-motion';
import Services from '@/components/Services';
import Count from '@/components/Count';
import Head from 'next/head';
import { Icon } from '@iconify-icon/react';
import Maps from '@/components/Maps';
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

interface MainProps {
    
}

const Main: React.FC<MainProps> = () => {
    const {t} = useTranslation();
    const visible:any = { opacity: 1, y: 0, transition: { duration: 0.7 } };
	
    const itemVariants:any = {
        hidden: { opacity: 0, y: 10 },
        visible
      };
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
            <motion.h1 variants={{hidden: { opacity: 0, y: -20 }, visible}} className='font-[700] text-[36px] text-white leading-[44px] w-[285px] md:text-[45px] md:leading-[55px] md:w-[360px] lg:text-[60px] lg:leading-[75px] lg:w-[480px] xl:text-[72px] xl:leading-[85px] xl:w-[580px]'>{t('header.greetings')}</motion.h1>
            <motion.div variants={itemVariants} className="flex items-center gap-x-[5px]"><p className="font-[500] text-[12px] text-white md:text-[14px] lg:text-[15px] xl:text-base xxl:text-lg">{t('header.scroll')}</p>
                <Icon icon="ep:bottom" className={'text-white text-lg'}/>
            </motion.div>
            </div>
            <Count/>
            <Services/>
            <Maps/>
        </motion.div>
        </>
    );
};

export async function getStaticProps(props:{locale:string}) {
    return {
        props: {
            ...(await serverSideTranslations(props.locale, ['common']))
        },
    };
}

export default Main;