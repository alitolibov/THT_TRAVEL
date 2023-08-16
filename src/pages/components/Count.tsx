import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import uz from '../../../public/lang/uz.json';
import ru from '../../../public/lang/ru.json';
import en from '../../../public/lang/en.json';
import Counter from './Counter';

interface Item {
    num: number;
    t: number;
    value: string;
    lang: string;
}

interface Language {
    about: {
        title: string;
    };
}

interface CountProps {}

const visible: object = { opacity: 1, y: 0, transition: { duration: 0.8 } };
const animation = {
    hidden: {
        y:  30,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.7 }
    }
};

const Count: React.FC<CountProps> = () => {
    const arr: Item[] = [
        { num: 3, t: 3, value: '', lang: 'one' },
        { num: 100, t: 5.5, value: '', lang: 'two' },
        { num: 100, t: 5, value: '+', lang: 'three' },
        { num: 10, t: 5, value: '%', lang: 'four' }
    ];
    const { locale } = useRouter();
    let lang: Language;
    switch (locale) {
        case 'uz':
            lang = uz;
            break;
        case 'ru':
            lang = ru;
            break;
        default:
            lang = en;
            break;
    }

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const elem = document.querySelector('.scrollBlock') as HTMLElement;

        function onScroll() {
            const posTop = elem.getBoundingClientRect().top;

            if (!elem.classList.contains('visible')) {
                if (posTop + elem.clientHeight <= window.innerHeight && posTop >= 0) {
                    setIsVisible(true);
                    document.removeEventListener('scroll', onScroll);
                }
            }
        }

        document.addEventListener('scroll', onScroll);
        onScroll();

        return () => {
            document.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <motion.section
            id='about'
            initial='hidden'
            whileInView='visible'
            viewport={{ amount: 0.4, once: true }}
            className='space-y-[40px] mb-[150px] mt-[50px] md:space-y-[50px]'>
            <motion.div
                variants={{ hidden: { opacity: 0, y: -20 }, visible }}
                className="relative w-fit mx-auto">
                <p className="font-[900] text-[3.5rem] text-[var(--main-color-two)] opacity-[0.5] leading-[3.5rem] sm:text-[5rem] sm:leading-[5rem]">ABOUT</p>
                <p className="sm:w-[287px] font-[600] text-[1.5rem] text-[#fff] absolute top-[20px] sm:text-[1.75rem] text-center leading-[1.5rem] sm:leading-[1.75rem] sm:left-[50%] sm:translate-x-[-50%] sm:top-[35px]">{lang.about.title}</p>
            </motion.div>
            <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ amount: 0.4, once: true }}
                variants={animation}
                className="scrollBlock grid grid-cols-2 gap-[20px] md:grid-cols-4 md:gap-y-0 md:gap-x-[30px]">
                {isVisible ? arr.map((item, index) => (
                    <Counter
                        num={item.num}
                        t={item.t}
                        value={item.value}
                        desc={item.lang}
                        language={lang.about}
                        key={index}
                    />
                )) : null}
            </motion.div>
        </motion.section>
    );
};

export default Count;
