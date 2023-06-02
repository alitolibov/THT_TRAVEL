import React from 'react';
import {motion} from 'framer-motion'
import Item from './Item';

interface ServicesProps {
    
}

const visible:object = { opacity: 1, y: 0, transition: { duration: 0.8 } };

const Services: React.FC<ServicesProps> = () => {
    return (
        <section 
        id='services'
        className='space-y-[40px] my-[48px]'>
            <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ amount: 0.5, once: true}}
            className="">
                <motion.div variants={{hidden: { opacity: 0, y: -20 }, visible}} className="relative w-fit mx-auto">
                    <p className="font-[900] text-[3.5rem] text-[var(--main-color-two)] opacity-[0.5] leading-[3.5rem] sm:text-[5rem] sm:leading-[5rem]">JOURNEY</p>
                    <p className="sm:w-[287px] font-[600] text-[1.5rem] text-[#fff] absolute top-[20px] sm:text-[1.75rem] text-center leading-[1.5rem] sm:left-[50%] sm:translate-x-[-50%] sm:top-[35px]">Your Journey Starts Here</p>
                </motion.div>
            </motion.div>
        <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ amount: 0.5, once: true}}
        className="grid grid-cols-1 gap-y-[20px] md:grid-cols-2 md:gap-x-[30px] md:gap-y-[30px] lg:grid-cols-3 xl:gap-x-[35px]">
            <Item img='bg.png'/>
            <Item img='bg.png'/>
            <Item img='bg.png'/>
            <Item img='bg.png'/>
            <Item img='bg.png'/>
            <Item img='bg.png'/>
        </motion.div>
        </section>
    );
};

export default Services;