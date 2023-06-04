import React, { useEffect } from 'react';
import {motion} from 'framer-motion'
import { useRouter } from 'next/router';
import uz from '../../../public/lang/uz';
import ru from '../../../public/lang/ru';
import en from '../../../public/lang/en';

interface CountProps {
    
}

const visible:object = { opacity: 1, y: 0, transition: { duration: 0.8 } };
const animation = {
    hidden: {
        y:  30,
        opacity: 0
    },
    visible: (custom: number) => ({
        y: 0,
        opacity: 1,
        transition: {duration: 0.7}
    })
}





const Count: React.FC<CountProps> = () => {

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

    const time = 1200
    const step = 1

    const outNum = (num : any, elem : any) => {
        let n = 0
        let t = Math.round(time / (num / step))
        let interval = setInterval(() => {
            n = n + step
            if (n === num) {
                clearInterval(interval)
            }
            elem.firstChild.firstChild.innerHTML = String(n)
    }, t)
    }

    useEffect(() => {
        const elem:any = document.querySelector('.scrollBlock');

        document.addEventListener('scroll', onScroll);
        
        function onScroll() {
          const posTop = elem.getBoundingClientRect().top;
          
          if(!elem.classList.contains('visible')) {
            if(posTop + elem.clientHeight <= window.innerHeight && posTop >= 0) {
                elem.childNodes.forEach((el: any) => {
                            outNum(+el.firstChild.firstChild.getAttribute('data-num'), el)
                        })
                elem.classList.add('visible');
                document.removeEventListener('scroll', onScroll);
              }
          }
        }
    }, [])

    return (
        <motion.section
        id='about'
        initial='hidden'
        whileInView='visible'
        viewport={{ amount: 0.5, once: true}}
        className='space-y-[40px] mb-[150px] mt-[50px] md:space-y-[50px]'>
                <motion.div variants={{hidden: { opacity: 0, y: -20 }, visible}} className="relative w-fit mx-auto">
                    <p className="font-[900] text-[3.5rem] text-[var(--main-color-two)] opacity-[0.5] leading-[3.5rem] sm:text-[5rem] sm:leading-[5rem]">ABOUT</p>
                    <p className="sm:w-[287px] font-[600] text-[1.5rem] text-[#fff] absolute top-[20px] sm:text-[1.75rem] text-center leading-[1.5rem] sm:leading-[1.75rem] sm:left-[50%] sm:translate-x-[-50%] sm:top-[35px]">{lang.about.title}</p>
                </motion.div>
                <motion.div 
                initial='hidden'
                whileInView='visible'
                viewport={{ amount: 0.3, once: true}}
                variants={animation}
                className="scrollBlock grid grid-cols-2 gap-[20px] md:grid-cols-4 md:gap-y-0 md:gap-x-[30px]">
                    <div id='num' className="space-y-[5px]">
                    <div className="flex justify-center text-[43px] font-bold text-center text-[var(--main-color-two)] lg:text-[53px]">
                            <p data-num="3" className="">1</p>
                        </div>
                        <p className="font-[500] text-[13px] text-center text-white md:text-[15px] lg:text-[16px] xl:text-[17px]">{lang.about.one}</p>
                    </div>
                    <div id='num' className="space-y-[5px]">
                    <div className="flex justify-center text-[43px] font-bold text-center text-[var(--main-color-two)] lg:text-[53px]">
                            <p data-num="100" className="">1</p>
                        </div>
                        <p className="font-[500] text-[13px] text-center text-white md:text-[15px] lg:text-[16px] xl:text-[17px]">{lang.about.two}</p>
                    </div>
                    <div id='num' className="space-y-[5px]">
                        <div className="flex justify-center text-[43px] font-bold text-center text-[var(--main-color-two)] lg:text-[53px]">
                            <p data-num="100" className="">1</p>
                            <span>+</span>
                        </div>
                        <p className="font-[500] text-[13px] text-center text-white md:text-[15px] lg:text-[16px] xl:text-[17px]">{lang.about.three}</p>
                    </div>
                    <div id='num' className="space-y-[5px]">
                        <div className="flex justify-center text-[43px] font-bold text-center text-[var(--main-color-two)] lg:text-[53px]">
                            <p data-num="10" className="">1</p>
                            <span>%</span>
                        </div>
                        <p className="font-[500] text-[13px] text-center text-white md:text-[15px] lg:text-[16px] xl:text-[17px]">{lang.about.four}</p>
                    </div>
                </motion.div>
        </motion.section>
    );
};

export default Count;