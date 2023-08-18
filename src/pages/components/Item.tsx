import React from 'react';
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import Image from "next/image";

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
        y: 30,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {duration: 0.8}
    }
}

const Item: React.FC<ItemProps> = ({item}) => {

    const {push} = useRouter()
    return (
        <motion.div
        onClick={() => push('tour/' + item?.id )}
        initial='hidden'
        whileInView='visible'
        viewport={{ amount: 0.4, once: true}}
        variants={animation}
        className={`gradient relative bg-center aspect-[1/1.33] bg-full flex flex-col justify-end items-center lg:hover:bg-org duration-300 lg:cursor-pointer`} style={{backgroundImage: `url("/images/toursImage/${item?.img}.webp")`}}>
            <div className={"w-full py-2 bg-[var(--main-color-two)] text-[#fff]"}>
                <p className="text-lg text-center font-[500]">{item?.country}</p>
                <p className="text-base text-center font-[500]">{item?.price}</p>
            </div>
        </motion.div>
    );
};

export default Item