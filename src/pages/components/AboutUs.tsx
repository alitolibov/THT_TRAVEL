import React from 'react';
import {motion} from 'framer-motion'

interface AboutUsProps {
    
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

const AboutUs: React.FC<AboutUsProps> = () => {
    
    return (
        <motion.section 
        initial='hidden'
        whileInView='visible'
        viewport={{ amount: 0.5, once: true}}
        className='space-y-[20px] md:flex md:justify-between md:items-center md:space-y-[50px]'>
            <div className="space-y-[40px] md:w-[50%]">
                <motion.div variants={{hidden: { opacity: 0, y: -20 }, visible}} className="relative">
                    <p  className="font-[900] text-[3.5rem] text-[var(--main-color-two)] opacity-[0.5] leading-[3.5rem] sm:text-[5rem] sm:leading-[5rem]">STORY</p>
                    <p  className="font-[600] text-[1.5rem] text-[#fff] absolute bottom-[5px] sm:bottom-[12px] sm:text-[1.75rem] text-center leading-[1.5rem] sm:leading-[1.75rem]">Our Story</p>
                </motion.div>
                <motion.p variants={itemVariants} className="text-[#fff]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam eveniet eos numquam placeat rem blanditiis enim? Eius, illum molestias animi aut, ullam error deleniti alias saepe vitae dolore illo ab.</motion.p>
            </div>
            <motion.div 
            initial='hidden'
            whileInView='visible'
            viewport={{ amount: 0.5, once: true}}
            variants={animation} className='aspect-square md:w-[40%] bg-[url("/images/traveler.png")] bg-center bg-no-repeat bg-contain' />
        </motion.section>
    );
};

export default AboutUs;