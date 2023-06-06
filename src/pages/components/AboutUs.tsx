import React, { useEffect, useState } from 'react';
import {motion} from 'framer-motion'
import { useRouter } from 'next/router';
import uz from '../../../public/lang/uz';
import ru from '../../../public/lang/ru';
import en from '../../../public/lang/en';

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
        transition: {duration: 0.7}
    })
}

const AboutUs: React.FC<AboutUsProps> = () => {

    const {locale} = useRouter()
    const [show, setShow] = useState<boolean>(false)
    let lang:any
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

      useEffect(() => {
        let dsc:any = document.querySelector('#dsc')
        let dsc2:any = document.querySelector('#dsc2')
        dsc.innerHTML = lang.about.dsc
        dsc2.innerHTML = lang.about.dsc2
      }, [lang])


    return (
        <motion.section 
        initial='hidden'
        whileInView='visible'
        viewport={{ amount: 0.4, once: true}}
        className='space-y-[20px] md:flex md:justify-between md:items-center md:space-y-[50px] lg:space-y-0'>
            <div className="space-y-[40px] md:w-[50%]">
                <motion.div variants={{hidden: { opacity: 0, y: -20 }, visible}} className="relative">
                    <p  className="font-[900] text-[3.5rem] text-[var(--main-color-two)] opacity-[0.5] leading-[3.5rem] sm:text-[5rem] sm:leading-[5rem]">STORY</p>
                    <p  className="font-[600] text-[1.5rem] text-[#fff] absolute bottom-[5px] sm:bottom-[12px] sm:text-[1.75rem] text-center leading-[1.5rem] sm:leading-[1.75rem]">{lang.story.title}</p>
                </motion.div>
                <motion.div variants={itemVariants} className="text-[#fff]">
                    <p id='dsc'></p>
                    <p className={`${show ? 'block' : 'hidden'}`} id='dsc2'></p>
                    <div onClick={() => setShow(!show)} className="flex items-center gap-x-[8px] lg:cursor-pointer mt-[15px]">
                        <p className='text-[var(--main-color-two)]'>{show ? lang.about.hidden : lang.about.show}</p>
                        <img src="/images/arrow_bottom.png" className={`invert h-[15px] duration-300 ${show ? 'rotate-[-180deg]' : 'rotate-0'}`} />
                    </div>
                </motion.div>
            </div>
            <motion.div 
            initial='hidden'
            whileInView='visible'
            viewport={{ amount: 0.4, once: true}}
            variants={animation} className='aspect-square md:w-[40%] bg-[url("/images/traveler.png")] bg-center bg-no-repeat bg-contain' />
        </motion.section>
    );
};

export default AboutUs;