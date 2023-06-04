import React from 'react';
import { motion } from "framer-motion";

interface ItemProps {
    img: string
    id: number
    title: string
}

const animation:{hidden: object, visible: object} = {
    hidden: {
        y: 30,
        opacity: 0
    },
    visible: (custom: number) => ({
        y: 0,
        opacity: 1,
        transition: {duration: 0.7}
    })
}

const Item: React.FC<ItemProps> = ({img, id, title}) => {
    return (
        <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ amount: 0.3, once: true}}
        variants={animation}
        className={`gradient relative bg-center aspect-[1/1.33] bg-org lg:hover:bg-full duration-300 flex flex-col justify-end items-center pb-[20px]`} style={{backgroundImage: `url('${img}')`}}>
            <p className="text-[20px] text-center font-[500] text-[#fff]">{title}</p>
        </motion.div>
    );
};

export default Item