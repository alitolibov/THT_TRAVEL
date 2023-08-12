/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import SwiperTour from './components/SwiperTour';
import {motion, useCycle} from "framer-motion";
import TourAbout from './components/TourAbout';
import uz from '../../public/lang/uz';
import ru from '../../public/lang/ru';
import en from '../../public/lang/en';
import {useRouter} from 'next/router';
import Book from './components/Book';
import {AccordionComponent} from "@/pages/components/AccordionComponent";

const modal = {
    open: {
        y: 0,
        transition: {
            type: "spring",
            stiffness: 30,
        }
    },
    closed: {
        y: '100%',
        transition: {
            type: "spring",
            stiffness: 30,
        }
    }
};


const tourPage = () => {
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
    const accordionArr = lang.dynamicPage.accordionQuestion

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
    const [isOpen, toggleOpen] = useCycle<boolean>(false, true);

    useEffect(() => {
        const body = document.body as HTMLElement
        isOpen ? body.style.overflowY = 'hidden' : body.style.overflowY = 'scroll'
    }, [isOpen])

    const [open, setOpen] = useState(false);
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
                    <div className="relative">
                        <p className="font-[900] uppercase text-[3.5rem] text-[var(--main-color-two)] opacity-[0.5] leading-[3.5rem] sm:text-[5rem] sm:leading-[5rem]">TOUR</p>
                        <p className="font-[600] text-[1.5rem] text-[#fff] absolute bottom-[5px] sm:bottom-[12px] sm:text-[1.75rem] text-center leading-[1.5rem] sm:leading-[1.75rem]">ЧУДЕСА
                            ГРУЗИИ</p>
                    </div>
                    <div className="mt-5 flex justify-between">
                        <div className={'space-y-6 w-full lg:w-3/5 xl:w-8/12'}>
                            <div
                                className="grid h-fit grid-cols-2 gap-3.5 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 xl:gap-y-0 xl:w-[95%]">
                                {
                                    aboutTourArr.map((item: any, index: number) => <TourAbout key={index}
                                                                                              icon={item.icon}
                                                                                              title={item.title}/>)
                                }
                            </div>
                            <div className={'border-t border-[var(--main-color-two)]'}></div>
                            <h1 className={'text-white text-2xl font-semibold lg:text-[26px]'}>О туре</h1>
                            <p className={'text-base text-white md:max-w-lg'}>
                                ОАЭ — удивительная страна, в которой гармонично переплетены незыблемые восточные
                                традиции с ультрасовременной архитектурой и инфраструктурой.
                            </p>
                            <h2 className={'text-white text-xl font-semibold lg:text-2xl]'}>Продолжительность:</h2>
                            <p className={'text-base text-white'}>7day/8nights</p>
                            <h2 className={'text-white text-xl font-semibold lg:text-2xl]'}>Цена:</h2>
                            <p className={'text-base text-white'}>от 2 000 000 UZS</p>
                            <div className={'border-t border-[var(--main-color-two)]'}></div>
                            <h1 className={'text-white text-2xl font-semibold lg:text-[26px]'}>Часто задаваемые вопросы</h1>
                            {
                                accordionArr.map((item:{title:string, desc:string},index:number) => <AccordionComponent title={item.title} desc={item.desc} key={index}/>)
                            }
                        </div>
                        <div className={'hidden relative lg:block lg:max-w-[340px] xl:max-w-[350px]'}>
                            <div className={'sticky top-0 bottom-0 w-full'}>
                                <Book/>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
            <motion.div initial={false} animate={isOpen ? "open" : "closed"} variants={modal}
                        className={`w-full bg-[var(--main-color)] overflow-y-scroll rounded-2xl overflow-hidden border-t border-[#ffffff] bottom-[75px] fixed left-0 z-10 h-4/5 lg:hidden`}>
                <Book/>
            </motion.div>
            <motion.div
                className='fixed z-50 bottom-0 left-0 w-full h-[75px] bg-[var(--main-color)] border-t border-[#ffffff] lg:hidden'>
                <div className="flex items-center justify-between px-4 h-full">
                    <p className="text-sm text-[var(--main-color-two)]">From:<span
                        className='text-lg mx-2 font-semibold text-white'>6000000 UZS</span></p>
                    <button onClick={() => toggleOpen()}
                            className='rounded-3xl text-white px-4 py-2 bg-[var(--main-color-two)] font-medium'>Book
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default tourPage;