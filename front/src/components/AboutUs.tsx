import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getValue } from '@/utils';
import { hidden, viewport, visible } from '@/constants/framer-motion-styles';

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
        transition: { duration: 0.7 }
    }
};

const AboutUs = () => {
    const { t } = useTranslation();
    const settings = useSelector((state: RootState) => state.settings.settings);

    // @ts-ignore
    const aboutUsText = settings[getValue('aboutUs')] || 'Текст не найден';

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="space-y-[20px] mb-[150px] md:flex md:justify-between md:items-center md:space-y-[50px] lg:space-y-0">
            <div className="space-y-[40px] md:w-[50%]">
                <motion.div variants={{ hidden, visible }} className="relative w-fit">
                    <p className="title-backgroud-text">STORY</p>
                    <p className="title-text whitespace-nowrap">{t('story.title')}</p>
                </motion.div>
                <motion.div variants={itemVariants} className="text-[#fff]">
                    <p id="dsc" className="xl:text-lg">{aboutUsText}</p>
                </motion.div>
            </div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={animation} className="aspect-square w-11/12 mx-auto md:mx-0 md:w-[35%]">
                <Image src={'/images/travelerPhoto.webp'} alt={'Photo'} width={250} height={250}
                       className={'w-full h-full'} />
            </motion.div>
        </motion.section>
    );
};

export default AboutUs;