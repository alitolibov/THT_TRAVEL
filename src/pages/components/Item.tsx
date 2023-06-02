import React from 'react';
import { motion } from "framer-motion";

interface ItemProps {
    img: string
    price?: number
    title?: string
}

const animation:{hidden: object, visible: object} = {
    hidden: {
        y: 30,
        opacity: 0
    },
    visible: (custom: number) => ({
        y: 0,
        opacity: 1,
        transition: {duration: 0.5}
    })
}

const Item: React.FC<ItemProps> = ({img, price, title}) => {
    return (
        <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ amount: 0.2, once: true}}
        variants={animation}
        className={`gradient aspect-[1/1.33] bg-org lg:hover:bg-full duration-300 flex flex-col justify-end items-center text-[#fff] pb-[20px]`} style={{backgroundImage: `url('/images/${img}')`}}>
            <div className="space-y-[16px] flex flex-col items-center">
                <div className="px-[16px] py-[5px] bg-[var(--main-color-two)] flex items-center justify-center w-fit text-[12px] rounded-[30px] spacing">$250.00</div>
                <p className="text-[18px] font-[500]">Samarkand tour</p>
            </div>
        </motion.div>
    );
};

export default Item