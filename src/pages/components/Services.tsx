import React from 'react';
import {motion} from 'framer-motion'

interface ServicesProps {
    
}

const visible:object = { opacity: 1, y: 0, transition: { duration: 0.8 } };
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible
      };

const animation = {
    hidden: {
        x: -30,
        opacity: 0
    },
    visible: (custom: number) => ({
        x: 0,
        opacity: 1,
        transition: {duration: 1}
    })
}

const Services: React.FC<ServicesProps> = () => {
    return (
        <motion.section 
        initial='hidden'
        whileInView='visible'
        viewport={{ amount: 0.5, once: true}}
        className='space-y-[20px] sm:flex sm:justify-between sm:items-center my-[48px]'
        >
                <motion.div variants={{hidden: { opacity: 0, y: -20 }, visible}} className="relative w-fit mx-auto">
                    <p  className="font-[900] text-[3.5rem] text-[var(--main-color-two)] opacity-[0.5] leading-[3.5rem] sm:text-[5rem] sm:leading-[5rem]">JOURNEY</p>
                    <p  className="font-[600] text-[1.5rem] text-[#fff] absolute top-[20px] sm:text-[1.75rem] text-center leading-[1.5rem]">Your Journey Starts Here</p>
                </motion.div>
                

        </motion.section>
    );
};

export default Services;