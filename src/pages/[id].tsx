/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import SwiperTour from './components/SwiperTour';
import {motion} from "framer-motion";
import TourAbout from './components/TourAbout';
import uz from '../../public/lang/uz';
import ru from '../../public/lang/ru';
import en from '../../public/lang/en';
import {useRouter} from 'next/router';

interface tourPageProps {

}


const tourPage: React.FC<tourPageProps> = () => {
    const {locale} = useRouter()
    let lang: any
    switch (locale) {
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
    const aboutTourArr = lang.dynamicPage.tourAbout

    const animation: { hidden: object, visible: object } = {
        hidden: {
            y: 30,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {duration: 0.7}
        }
    }

    const visible: object = {opacity: 1, y: 0, transition: {duration: 0.8}};
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <div className=''>
            <motion.section
                className='space-y-10'
                initial='hidden'
                whileInView='visible'
                viewport={{amount: 0.5, once: true}}
                variants={animation}>
                <SwiperTour/>
                <div className="">
                    <motion.div variants={{hidden: {opacity: 0, y: -20}, visible}} className="relative">
                        <p className="font-[900] uppercase text-[3.5rem] text-[var(--main-color-two)] opacity-[0.5] leading-[3.5rem] sm:text-[5rem] sm:leading-[5rem]">TOUR</p>
                        <p className="font-[600] text-[1.5rem] text-[#fff] absolute bottom-[5px] sm:bottom-[12px] sm:text-[1.75rem] text-center leading-[1.5rem] sm:leading-[1.75rem]">ЧУДЕСА
                            ГРУЗИИ</p>
                    </motion.div>
                    <div className="mt-[3%] ">
                        <div className="grid grid-cols-2 gap-y-[10%] lg:grid-cols-4 lg:gap-y-0">
                            {
                                aboutTourArr.map((item: any, index: number) => <TourAbout key={index} icon={item.icon}
                                                                                          title={item.title}/>)
                            }
                        </div>
                    </div>
                </div>
            </motion.section>
            <div className={`w-full bg-[var(--main-color)] duration-500 border-t border-[#ffffff] fixed bottom-[75px] left-0 z-10 h-[70%] ${isOpen ? 'block' : 'hidden'}`}>
                <h1 className={'text-2xl text-red-50'}>hello world</h1>
            </div>
            <motion.div
                className='fixed z-50 bottom-0 left-0 w-full h-[75px] bg-[var(--main-color)] border-t border-[#ffffff]'>
                <div className="flex items-center justify-between px-4 h-full">
                    <p className="text-sm text-[var(--main-color-two)]">From:<span
                        className='text-lg mx-2 font-semibold text-white'>6000000 UZS</span></p>
                    <button onClick={() => setIsOpen((!isOpen))}
                            className='rounded-3xl text-white px-4 py-2 bg-[var(--main-color-two)] font-mediu'>Book
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default tourPage;