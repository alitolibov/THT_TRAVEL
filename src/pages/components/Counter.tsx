import React, {useEffect} from 'react';
import {motion, useMotionValue, useTransform, animate} from 'framer-motion';
import {useRouter} from 'next/router';
import uz from '../../../public/lang/uz.json';
import ru from '../../../public/lang/ru.json';
import en from '../../../public/lang/en.json';
import {useTranslation} from "next-i18next";

interface CounterProps {
    num: number;
    time: number;
    value: string;
    language: string;
}

const Counter: React.FC<CounterProps> = ({num, time, value, language}) => {
    const {t} = useTranslation()
    const count = useMotionValue(1);
    const rounded = useTransform(count, Math.round);
    useEffect(() => {
        const animation = animate(count, num, {duration: time});
        return () => {
            animation.stop();
        };
    }, [count, num, time]);

    return (
        <div className="space-y-[5px]">
            <div
                className="flex justify-center text-[43px] font-bold text-center text-[var(--main-color-two)] lg:text-[53px]">
                <motion.p>{rounded}</motion.p>
                <span style={{display: value === '' ? 'none' : 'inline'}}>{value}</span>
            </div>
            <p className="font-[500] text-[13px] text-center text-white md:text-[15px] lg:text-[16px] xl:text-[17px]">
                {language}
            </p>
        </div>
    );
};

export default Counter;
