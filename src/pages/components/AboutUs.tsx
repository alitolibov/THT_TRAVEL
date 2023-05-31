import React from 'react';
import {motion} from 'framer-motion'

interface AboutUsProps {
    
}

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
        <motion.section initial='hidden'
        whileInView='visible'
        viewport={{ amount: 0.2}}
        className='space-y-[20px] md:flex md:justify-between md:items-center'>
            <div className="space-y-[40px]">
                <div className="relative">
                    <p className="font-[900] text-[5rem] text-[var(--main-color-two)] opacity-[0.5] leading-[5rem]">STORY</p>
                    <p className="font-[600] text-[1.85rem] text-[#fff] absolute bottom-[5px]">Our Story</p>
                </div>
                <p className="text-[#fff]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam eveniet eos numquam placeat rem blanditiis enim? Eius, illum molestias animi aut, ullam error deleniti alias saepe vitae dolore illo ab.</p>
            </div>
            <motion.img variants={animation} src="/images/travel.png" className='aspect-square object-contain' alt="" />
        </motion.section>
    );
};

export default AboutUs;