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

    const {locale} = useRouter();
    return (
           <motion.div
               initial='hidden'
               whileInView='visible'
               viewport={viewport}
               whileTap={{ scale: 0.95 }}
               variants={animation}
               className={'aspect-[1/1.33] rounded-lg overflow-hidden'}>
                <Link locale={locale} href={`tour/${item?.id}`} className={'bg-full h-full bg-center flex flex-col justify-end items-center lg:hover:bg-org duration-300 lg:cursor-pointer'} style={{backgroundImage: `url(${item.images[0].path})`}}>
                    <div className={'w-full py-2 bg-[var(--main-color-two)] text-[#fff]'}>
                        <p className="text-lg text-center font-semibold lg:text-xl tracking-wide">{tourName}</p>
                        <p className="text-base text-center font-medium lg:text-lg">
                            <Money value={item?.price}/>
                        </p>
                    </div>
                </Link>
           </motion.div>
    );
};

export default Item;