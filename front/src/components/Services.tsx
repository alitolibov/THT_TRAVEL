import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Item from './Item';
import {useTranslation} from 'next-i18next';
import { ITour, PaginatedResponse } from '@/types';
import { $api } from '@/composables/useService';
import { hidden, viewport, visible } from '@/constants/framer-motion-styles';
import { useTailwindBreakpoints } from '@/composables/tailwind';
import Link from 'next/link';


const Services: React.FC<any> = () => {
    const {t} = useTranslation();
    const [toursArr, setToursArr] = useState<ITour[] | any[]>([]);
	const breakpoints = useTailwindBreakpoints();
	
	useEffect(() => {
		const fetchTours = async () => {
			try {
				const data = await $api.get('tours').json<PaginatedResponse<ITour>>();
				setToursArr(data.data);
			} catch (error) {
				console.error('Error fetching tours:', error);
			}
		};
		
		fetchTours();
	}, []);
	
	const allowedTourCount = useMemo(() => {
		if (breakpoints.xl) return 8;
		if (breakpoints.sm) return 6;
		if (breakpoints.xs) return 5;
		return 8;
	}, [breakpoints]);
	
	const displayedTours = useMemo(() => {
		return toursArr.slice(0, allowedTourCount);
	}, [toursArr, allowedTourCount]);

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
            className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {
	            displayedTours.map((item:ITour) => <Item key={item.id} item={item}/>)
            }
        </motion.div>
	        <button className={'text-lg text-white hover:bg-[var(--main-color-two)] duration-300 font-medium rounded-xl w-1/3 py-3 block mx-auto'}>
		        <Link href={'/tours'}>
			        {t('tours.show')}
		        </Link>
	        </button>
        </section>
    );
};

export default Services;
