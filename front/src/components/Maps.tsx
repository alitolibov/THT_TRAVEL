import React from 'react';
import { motion } from 'framer-motion';
import {useTranslation} from 'next-i18next';
import { hidden, viewport, visible } from '@/constants/framer-motion-styles';

const Maps = () => {
    const {t} = useTranslation();
    return (
        <motion.section
            className={'space-y-10 mt-[150px]'}
            initial='hidden'
            whileInView='visible'
            viewport={viewport}>
            <motion.div variants={{hidden, visible}} className="relative w-fit mx-auto">
                <p className="title-backgroud-text">MAPS</p>
                <p className="title-text">{t('mapsTitle')}</p>
            </motion.div>
            <motion.iframe variants={{hidden, visible}} src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae9d2f1456ce42f2f42a0d3665070c6601e32ff1899cc12c552131a574330f2ac&amp;source=constructor" className={'aspect-video lg:aspect-[16/6] w-full'}></motion.iframe>
        </motion.section>
    );
};

export default Maps;
