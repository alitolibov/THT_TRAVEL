import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import Item from './Item';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import { ITour, PaginatedResponse } from '@/types';
import { $api } from '@/composables/useService';
import { hidden, viewport, visible } from '@/constants/framer-motion-styles';


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
            viewport={viewport}
            className="">
                <motion.div variants={{hidden, visible}} className="relative w-fit mx-auto">
                    <p className="title-backgroud-text">JOURNEY</p>
                    <p className="title-text">{t('services.title')}</p>
                </motion.div>
            </motion.div>
        <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={viewport}
            className="grid grid-cols-1 gap-y-[20px] md:grid-cols-2 md:gap-x-[30px] md:gap-y-[30px] lg:grid-cols-3 xl:gap-x-[35px]">
            {
               toursArr.map((item:ITour) => <Item key={item.id} item={item}/>)
            }
        </motion.div>
        </section>
    );
};

export default Services;
