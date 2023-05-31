import React from 'react';
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import uz from '../../public/lang/uz';
import ru from '../../public/lang/ru';
import en from '../../public/lang/en';

interface MainProps {
    
}

const Main: React.FC<MainProps> = () => {
    const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible
      };
    const {locale} = useRouter()
    let lang
    switch(locale) {
        case 'uz':
            lang = uz
          break
        case 'ru': 
        lang = ru
          break
        default:
            lang = en
          break
      }
    return (
        <motion.div 
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}>
            <div className="space-y-[20px] h-[80vh] flex flex-col justify-center">
            <motion.h1 variants={{hidden: { opacity: 0, y: -20 }, visible}} className='font-[700] text-[36px] text-white leading-[44px] w-[285px] md:text-[45px] md:leading-[55px] md:w-[360px]'>{lang.header.greetings}</motion.h1>
            <motion.div variants={itemVariants} className="flex items-center gap-x-[5px]"><p className="font-[500] text-[12px] text-white md:text-[14px]">{lang.header.scroll}</p> <img className='h-[16px]' src="/images/bottom.png" alt="" /></motion.div>
            </div>
        </motion.div>
    );
};

export default Main;