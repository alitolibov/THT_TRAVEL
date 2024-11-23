import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Counter from './Counter';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ISettings } from '@/types';
import { hidden, viewport, visible } from '@/constants/framer-motion-styles';

interface Item {
    num: number;
    t: number;
    value: string;
    key: string
}

interface CountProps {}

const animation = {
    hidden: {
        y:  30,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.7 }
    }
};

const Count: React.FC<CountProps> = () => {
    const {t} = useTranslation();
    const {asPath} = useRouter();
    const settings: ISettings | Record<string, any> = useSelector((state: RootState) => state.settings.settings);
    
    const [arr, setArr] = useState<Item[]>([]);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
	    setArr([
            { num: settings?.yearInTourism || 0, t: 1.5, value: '', key:  'yearInTourism'},
            { num: settings?.readyTours || 0, t: 5, value: '', key: 'readyTours' },
            { num: settings?.clients || 0, t: 3.5, value: '+', key: 'clients' },
            { num: settings?.sales || 0, t: 3, value: '%', key: 'sales' }
        ]);
    }, [settings]);

    useEffect(() => {
        const elem = document.querySelector('.scrollBlock') as HTMLElement;

        function onScroll() {
            const posTop = elem.getBoundingClientRect().top;

            if (!elem.classList.contains('visible')) {
                if (posTop + elem.clientHeight <= window.innerHeight && posTop >= 0) {
                    setIsVisible(true);
                    document.removeEventListener('scroll', onScroll);
                }
            }
        }

        document.addEventListener('scroll', onScroll);

        return () => {
            document.removeEventListener('scroll', onScroll);
        };
    }, []);


    return (
        <motion.section
            initial='hidden'
            whileInView='visible'
            viewport={viewport}
            className='space-y-[40px] mb-[150px] mt-[50px] md:space-y-[50px]'>
            <motion.div
                variants={{ hidden, visible }}
                className="relative w-fit mx-auto">
                <p className="title-backgroud-text">ABOUT</p>
                <p className="title-text">{t('about.title')}</p>
            </motion.div>
            <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={viewport}
                variants={animation}
                className="scrollBlock grid grid-cols-2 gap-[20px] md:grid-cols-4 md:gap-y-0 md:gap-x-[30px]">
                {isVisible || asPath !== '/' ? arr.map((item, index) => (
                    <Counter
                        num={item.num}
                        time={item.t}
                        value={item.value}
                        keyLang={item.key}
                        key={index}
                    />
                )) : null}
            </motion.div>
        </motion.section>
    );
};

export default Count;
