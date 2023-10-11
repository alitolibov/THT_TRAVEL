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
               whileTap={{ scale: 0.95 }}
               variants={animation}
               className={`aspect-[1/1.33]`}>
                <Link locale={locale} href={`tour/${item?.id}`} className={'bg-full h-full bg-center flex flex-col justify-end items-center lg:hover:bg-org duration-300 lg:cursor-pointer'} style={{backgroundImage: `url("/images/toursImage/${item?.img}.webp")`}}>
                    <div className={"w-full py-2 bg-[var(--main-color-two)] text-[#fff]"}>
                        <p className="text-lg text-center font-[500]">{item?.country}</p>
                        <p className="text-base text-center font-[500]">{item?.price}</p>
                    </div>
                </Link>
           </motion.div>
    );
};

export default Item