import React from 'react';
import {motion} from 'framer-motion'

interface AboutUsProps {
    
}
const visible:object = { opacity: 1, y: 0, transition: { duration: 0.5 } };
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

const AboutUs: React.FC<AboutUsProps> = () => {
    
    return (
        <motion.section 
        id='about'
        initial='hidden'
        whileInView='visible'
        viewport={{ amount: 0.4, once: true}}
        className='space-y-[20px] sm:flex sm:justify-between sm:items-center'>
            <div className="space-y-[40px] sm:w-[50%]">
                <motion.div variants={{hidden: { opacity: 0, y: -20 }, visible}} className="relative">
                    <p  className="font-[900] text-[5rem] text-[var(--main-color-two)] opacity-[0.5] leading-[5rem]">STORY</p>
                    <p  className="font-[600] text-[1.85rem] text-[#fff] absolute bottom-[5px]">Our Story</p>
                </motion.div>
                <motion.p variants={itemVariants} className="text-[#fff]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam eveniet eos numquam placeat rem blanditiis enim? Eius, illum molestias animi aut, ullam error deleniti alias saepe vitae dolore illo ab.</motion.p>
            </div>
            <motion.div 
            initial='hidden'
            whileInView='visible'
            viewport={{ amount: 0.4, once: true}}
            variants={animation} className='aspect-square sm:w-[40%] bg-[url("/images/traveler.png")] bg-center bg-no-repeat bg-contain' />
        </motion.section>
    );
};

export default AboutUs;