import React from 'react';
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import Image from "next/image";

interface ItemProps {
    img: string
    id: number
    title: string
    price: string
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

const Item: React.FC<ItemProps> = ({img, id, title, price}) => {

    const {push} = useRouter()
    return (
        <motion.div
        onClick={() => push('tour/' + id)}
        initial='hidden'
        whileInView='visible'
        viewport={{ amount: 0.4, once: true}}
        variants={animation}
        className={`gradient relative bg-center aspect-[1/1.33] bg-full flex flex-col justify-end items-center lg:hover:bg-org duration-300 lg:cursor-pointer`} style={{backgroundImage: `url("/images/toursImage/${img}.webp")`}}>
            <div className={"w-full py-2 bg-[var(--main-color-two)] text-[#fff]"}>
                <p className="text-lg text-center font-[500]">{title}</p>
                <p className="text-base text-center font-[500]">{price}</p>
            </div>
        </motion.div>
    );
};

export default Item