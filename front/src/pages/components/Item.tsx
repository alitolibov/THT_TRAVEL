import React from 'react';
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import Image from "next/image";
import Link from "next/link";

interface ItemProps {
    item: {
        id: number;
        country: string;
        typeTour: string;
        duration: string;
        price: string;
        peoples: string;
        lang: string;
        img: string;
        desc: string;
    }
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
}

const Item: React.FC<ItemProps> = ({item}) => {

    const {locale} = useRouter()
    return (
           <motion.div
               initial='hidden'
               whileInView='visible'
               viewport={{ amount: 0.4, once: true}}
               whileHover={{ scale: 0.97 }}
               whileTap={{ scale: 0.93 }}
               variants={animation}
               className={`aspect-[1/1.33]`}>
                <Link locale={locale} href={`tour/${item?.id}`} className={'h-full bg-center flex flex-col relative justify-end items-center overflow-hidden  lg:cursor-pointer'}>
                    <Image src={`/images/toursImage/${item?.img}.webp`} alt={'Tour Image'} width={120} height={120} className={'absolute -z-10 w-full h-full'}/>
                    <div className={"w-full py-2 bg-[var(--main-color-two)] text-[#fff]"}>
                        <p className="text-lg text-center font-[500]">{item?.country}</p>
                        <p className="text-base text-center font-[500]">{item?.price}</p>
                    </div>
                </Link>
           </motion.div>
    );
};

export default Item