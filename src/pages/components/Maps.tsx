import React from 'react';
import { motion } from 'framer-motion'
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

interface ServicesProps {

}

export const Maps = () => {
    const {locale, asPath} = useRouter()
    const {t} = useTranslation()
    const visible:object = { opacity: 1, y: 0, transition: { duration: 0.8 } };
    return (
        <motion.section
            className={'space-y-[30px] mt-[150px]'}
            initial='hidden'
            whileInView='visible'
            viewport={{ amount: 0.4, once: true}}>
            <motion.div variants={{hidden: { opacity: 0, y: -20 }, visible}} className="relative w-fit mx-auto">
                <p className="font-[900] text-[3.5rem] text-[var(--main-color-two)] opacity-[0.5] leading-[3.5rem] uppercase sm:text-[5rem] sm:leading-[5rem]">MAPS</p>
                <p className="sm:w-[287px] font-[600] text-[1.5rem] text-[#fff] absolute top-[20px] sm:text-[1.75rem] text-center leading-[1.5rem] sm:leading-[1.75rem] sm:left-[50%] sm:translate-x-[-50%] sm:top-[35px]">{t('mapsTitle')}</p>
            </motion.div>
            <motion.iframe variants={{hidden: { opacity: 0, y: 20 }, visible}} src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae9d2f1456ce42f2f42a0d3665070c6601e32ff1899cc12c552131a574330f2ac&amp;source=constructor" className={'aspect-video lg:aspect-[16/6] w-full'}></motion.iframe>
        </motion.section>
    )
}
