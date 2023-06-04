import React, { useEffect } from 'react';
import {motion} from 'framer-motion'
import { useRouter } from 'next/router';
import uz from '../../../public/lang/uz';
import ru from '../../../public/lang/ru';
import en from '../../../public/lang/en';

interface VisesProps {
    
}

const visible:object = { opacity: 1, y: 0, transition: { duration: 0.8 } };
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible
      };

const animation = {
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

const Vises: React.FC<VisesProps> = () => {

    const {locale} = useRouter()
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
            let one:any = document.querySelector('#one')
            let two:any = document.querySelector('#two')
            let three:any = document.querySelector('#three')
            one.innerHTML = lang.vises.one
            two.innerHTML = lang.vises.two
            three.innerHTML = lang.vises.three
      }, [lang])

    return (
        <section 
        className='space-y-[20px] my-[100px] md:flex md:justify-between md:items-center md:space-y-[50px]'>
            <motion.div 
            initial='hidden'
            whileInView='visible'
            viewport={{ amount: 0.5, once: true}}
            className="space-y-[40px] md:w-[50%]">
                <motion.div variants={{hidden: { opacity: 0, y: -20 }, visible}} className="relative">
                    <p  className="font-[900] text-[3.5rem] text-[var(--main-color-two)] opacity-[0.5] leading-[3.5rem] sm:text-[5rem] sm:leading-[5rem]">VISES</p>
                    <p  className="font-[600] text-[1.5rem] text-[#fff] absolute bottom-[5px] sm:bottom-[12px] sm:text-[1.75rem] text-center leading-[1.5rem] sm:leading-[1.75rem]">{lang.vises.title}</p>
                </motion.div>
                <motion.div variants={itemVariants} className="text-[#fff]">
                    <p id='one'></p>
                    <br/>
                    <p id='two'></p>
                    <br/>
                    <p id='three'></p>
                </motion.div>

            </motion.div>
            <motion.div 
            initial='hidden'
            whileInView='visible'
            viewport={{ amount: 0.5, once: true}}
            variants={animation} className='aspect-square md:w-[40%] bg-[url("/images/visa.png")] bg-center bg-no-repeat bg-contain' />
        </section>
    );
};

export default Vises;