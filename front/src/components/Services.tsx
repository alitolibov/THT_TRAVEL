import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import Item from './Item';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import { ITour, PaginatedResponse } from '@/types';
import { $api } from '@/composables/useService';

const visible:object = { opacity: 1, y: 0, transition: { duration: 0.8 } };

const Services: React.FC<any> = () => {
    const {locale} = useRouter();
    const {t} = useTranslation();
    const [toursArr, setToursArr] = useState<ITour[] | any[]>([]);

    useEffect(() => {
	    const fetchSettings = async () => {
		    const data = await $api.get('tours').json<PaginatedResponse<ITour>>();
			setToursArr(data.data);
	    };
	    
	    fetchSettings();
    }, [locale]);

    return (
        <section
            className='space-y-[40px] mb-[50px] md:space-y-[50px]'>
            <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ amount: 0.4, once: true}}
            className="">
                <motion.div variants={{hidden: { opacity: 0, y: -20 }, visible}} className="relative w-fit mx-auto">
                    <p className="font-[900] text-[3.5rem] text-[var(--main-color-two)] opacity-[0.5] leading-[3.5rem] sm:text-[5rem] sm:leading-[5rem]">JOURNEY</p>
                    <p className="sm:w-[287px] font-[600] text-[1.5rem] text-[#fff] absolute top-[20px] sm:text-[1.75rem] text-center leading-[1.5rem] sm:leading-[1.75rem] sm:left-[50%] sm:translate-x-[-50%] sm:top-[35px]">{t('services.title')}</p>
                </motion.div>
            </motion.div>
        <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ amount: 0.2, once: true}}
            className="grid grid-cols-1 gap-y-[20px] md:grid-cols-2 md:gap-x-[30px] md:gap-y-[30px] lg:grid-cols-3 xl:gap-x-[35px]">
            {
               toursArr.map((item:ITour) => <Item key={item.id} item={item}/>)
            }
        </motion.div>
        </section>
    );
};

export default Services;
