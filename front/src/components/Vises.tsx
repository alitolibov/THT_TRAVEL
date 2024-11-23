import React, { useEffect } from 'react';
import {motion} from 'framer-motion';
import {useTranslation} from 'next-i18next';
import Image from 'next/image';
import { hidden, viewport, visible } from '@/constants/framer-motion-styles';

interface VisesProps {}

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible
      };

const animation = {
    hidden: {
        y: 30,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {duration: 0.7}
    }
};

const Vises: React.FC<VisesProps> = () => {
    const {t} = useTranslation();
    const text:string = t('vises.dsc');

    useEffect(() => {
            let one = document.querySelector('#one') as HTMLElement;
            one.innerHTML = text;
      }, [text]);

    return (
        <section 
        className='space-y-[20px] my-[150px] md:flex md:justify-between md:items-center md:space-y-[50px] lg:space-y-0'>
            <motion.div 
            initial='hidden'
            whileInView='visible'
            viewport={viewport}
            className="space-y-10 md:w-[50%]">
                <motion.div variants={{hidden, visible}} className="relative w-fit">
                    <p className="title-backgroud-text">VISES</p>
                    <p className="title-text whitespace-nowrap">{t('vises.title')}</p>
                </motion.div>
                    <motion.p variants={itemVariants} className="text-[#fff] xl:text-lg" id='one'></motion.p>
            </motion.div>
            <motion.div 
            initial='hidden'
            whileInView='visible'
            viewport={viewport}
            variants={animation}
            className='aspect-square md:w-4/12'>
                <Image src={'/images/visa.webp'} alt={'Photo'} width={300} height={500} className={'w-full h-full object-fit-contain'}/>
            </motion.div>
        </section>
    );
};

export default Vises;