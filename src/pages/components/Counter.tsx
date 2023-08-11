import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useRouter } from 'next/router';
import uz from '../../../public/lang/uz';
import ru from '../../../public/lang/ru';
import en from '../../../public/lang/en';

interface CounterProps {
    num: number
    t: number
    value: string
    langs: string
}

const Counter: React.FC<CounterProps> = ({num, t, value, langs}) => {
    const count = useMotionValue(1);
    const rounded = useTransform(count, Math.round);
    useEffect(() => {
        const animation = animate(count, num, { duration: t });   
        return animation.stop;
    })

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
      const text = lang.about[langs]
      
    return (
        <div className="space-y-[5px]">
        <div className="flex justify-center text-[43px] font-bold text-center text-[var(--main-color-two)] lg:text-[53px]">
                <motion.p>{rounded}</motion.p>
                <span style={{display: value === '' ? 'none' : 'inline'}}>{value}</span>
            </div>
            <p className="font-[500] text-[13px] text-center text-white md:text-[15px] lg:text-[16px] xl:text-[17px]">{text}</p>
        </div>
    );
};

export default Counter;