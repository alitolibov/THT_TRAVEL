import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ITour } from '@/types';
import { getValue } from '@/utils';
import Money from '@/components/common/Money';
import { viewport } from '@/constants/framer-motion-styles';


interface ItemProps {
    item: ITour
}

const animation:{hidden: object, visible: object} = {
    hidden: {
        y: 40,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {duration: 0.8}
    }
};

const Item: React.FC<ItemProps> = ({item}) => {
    
    // @ts-ignore
    const tourName = item[getValue('nameDirection')] || 'Текст не найден';
    const image = item.hasOwnProperty('images') ? item?.images[0].path : null;

    const {locale} = useRouter();
    return (
           <motion.div
               initial='hidden'
               whileInView='visible'
               viewport={viewport}
               whileHover={{ scale: 0.95 }}
               whileTap={{ scale: 0.95 }}
               variants={animation}
               className={'aspect-[1/1.15] rounded-xl overflow-hidden duration-75 ease-linear'}>
                <Link locale={locale} href={`tour/${item?.id}`} className={'bg-cover h-full bg-center bg-no-repeat flex flex-col justify-end items-center duration-300 lg:cursor-pointer'} style={{backgroundImage: `url(${image})`}}>
                    <div className={'w-full py-1 bg-[var(--main-color-two)] text-white'}>
                        <p className="text-sm md:text-base text-center font-semibold 2xl:text-lg tracking-wide">{tourName}</p>
                        <p className="text-sm text-center font-medium 2xl:text-base">
                            <Money value={item?.price}/>
                        </p>
                    </div>
                </Link>
           </motion.div>
    );
};

export default Item;