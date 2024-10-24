import React, { useEffect, useState } from 'react';
import {motion} from 'framer-motion';
import {useTranslation} from 'next-i18next';
import Image from 'next/image';
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getValue } from "@/utils";

interface AboutUsProps {

}
const visible:object = { opacity: 1, y: 0, transition: { duration: 0.8 } };
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible
      };

const animation = {
    hidden: {
        x: -30,
        opacity: 0
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {duration: 0.7}
    }
};

const AboutUs: React.FC<AboutUsProps> = () => {
    const {t} = useTranslation();
	const settings = useSelector((state: RootState) => state.settings.settings);
    
    const aboutUsText = settings[getValue('aboutUs')] || 'Текст не найден';
    
    return (
        <motion.section
        initial='hidden'
        whileInView='visible'
        viewport={{ amount: 0.4, once: true}}
        className='space-y-[20px] mb-[150px] md:flex md:justify-between md:items-center md:space-y-[50px] lg:space-y-0'>
            <div className="space-y-[40px] md:w-[50%]">
                <motion.div variants={{hidden: { opacity: 0, y: -20 }, visible}} className="relative">
                    <p  className="font-[900] text-[3.5rem] text-[var(--main-color-two)] opacity-[0.5] leading-[3.5rem] sm:text-[5rem] sm:leading-[5rem]">STORY</p>
                    <p  className="font-[600] text-[1.5rem] text-[#fff] absolute bottom-[5px] sm:bottom-[12px] sm:text-[1.75rem] text-center leading-[1.5rem] sm:leading-[1.75rem]">{t('story.title')}</p>
                </motion.div>
                <motion.div variants={itemVariants} className="text-[#fff]">
                    <p id='dsc' className='xl:text-lg'>{aboutUsText}</p>
                </motion.div>
            </div>
            <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ amount: 0.4, once: true}}
            variants={animation} className='aspect-square md:w-[40%]'>
                <Image src={'/images/traveler.webp'} alt={'Photo'} width={200} height={200} className={'w-full h-full'}/>
            </motion.div>
        </motion.section>
    );
};

export default AboutUs;