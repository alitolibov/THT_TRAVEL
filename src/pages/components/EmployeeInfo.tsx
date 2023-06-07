import React from 'react';
import { motion } from 'framer-motion'

interface EmployeeInfoProps {
    photo?: string
    name?: string
    level?: string
    insta?: string
    tg?: string
    phone?: string
}

const animation:{hidden: object, visible: object} = {
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

const EmployeeInfo: React.FC<EmployeeInfoProps> = ({photo, name, level, insta, tg, phone}) => {
    return (
        <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ amount: 0.4, once: true}}
        variants={animation}
        className='space-y-[24px]'>
            <div className={`mx-auto w-[260px] h-[260px] bg-cover bg-top bgImg`} style={{backgroundImage: `url('/images/${photo}')`}}></div>
            <div className="space-y-[2px] w-fit mx-auto">
                <h1 className='text-[18px] font-semibold text-[var(--main-color-two)] text-center'>{name}</h1>
                <h2 className='text-[14px] text-[#fff] spacing_two uppercase text-center'>{level}</h2>
            </div>
            <div className="gap-x-[8px] w-fit mx-auto flex items-center">
                <a href={`tel:${phone}`} className="lg:cursor-pointer rounded-full bg-[var(--main-color-two)] lg:hover:brightness-[.8] duration-300 flex items-center justify-center w-[50px] h-[50px]">
                <svg height="20px" version="1.1" viewBox="0 0 512 512" width="20px"><path d="M415.9,335.5c-14.6-15-56.1-43.1-83.3-43.1c-6.3,0-11.8,1.4-16.3,4.3c-13.3,8.5-23.9,15.1-29,15.1c-2.8,0-5.8-2.5-12.4-8.2  l-1.1-1c-18.3-15.9-22.2-20-29.3-27.4l-1.8-1.9c-1.3-1.3-2.4-2.5-3.5-3.6c-6.2-6.4-10.7-11-26.6-29l-0.7-0.8  c-7.6-8.6-12.6-14.2-12.9-18.3c-0.3-4,3.2-10.5,12.1-22.6c10.8-14.6,11.2-32.6,1.3-53.5c-7.9-16.5-20.8-32.3-32.2-46.2l-1-1.2  c-9.8-12-21.2-18-33.9-18c-14.1,0-25.8,7.6-32,11.6c-0.5,0.3-1,0.7-1.5,1c-13.9,8.8-24,20.9-27.8,33.2c-5.7,18.5-9.5,42.5,17.8,92.4  c23.6,43.2,45,72.2,79,107.1c32,32.8,46.2,43.4,78,66.4c35.4,25.6,69.4,40.3,93.2,40.3c22.1,0,39.5,0,64.3-29.9  C442.3,370.8,431.5,351.6,415.9,335.5z" fill='#fff'/></svg> 
                </a>
                <a href={insta} className="lg:cursor-pointer rounded-full bg-[var(--main-color-two)] lg:hover:brightness-[.8] duration-300 flex items-center justify-center w-[50px] h-[50px]">
                <svg fill='#fff' width="25px" height="25px" version="1.1" viewBox="0 0 56.7 56.7"><g><path d="M28.2,16.7c-7,0-12.8,5.7-12.8,12.8s5.7,12.8,12.8,12.8S41,36.5,41,29.5S35.2,16.7,28.2,16.7z M28.2,37.7c-4.5,0-8.2-3.7-8.2-8.2s3.7-8.2,8.2-8.2s8.2,3.7,8.2,8.2S32.7,37.7,28.2,37.7z"/><circle cx="41.5" cy="16.4" r="2.9"/><path d="M49,8.9c-2.6-2.7-6.3-4.1-10.5-4.1H17.9c-8.7,0-14.5,5.8-14.5,14.5v20.5c0,4.3,1.4,8,4.2,10.7c2.7,2.6,6.3,3.9,10.4,3.9h20.4c4.3,0,7.9-1.4,10.5-3.9c2.7-2.6,4.1-6.3,4.1-10.6V19.3C53,15.1,51.6,11.5,49,8.9z M48.6,39.9c0,3.1-1.1,5.6-2.9,7.3s-4.3,2.6-7.3,2.6H18c-3,0-5.5-0.9-7.3-2.6C8.9,45.4,8,42.9,8,39.8V19.3c0-3,0.9-5.5,2.7-7.3c1.7-1.7,4.3-2.6,7.3-2.6h20.6c3,0,5.5,0.9,7.3,2.7c1.7,1.8,2.7,4.3,2.7,7.2V39.9L48.6,39.9z"/></g></svg>
                </a>
                <a href={tg} className="lg:cursor-pointer rounded-full bg-[var(--main-color-two)] lg:hover:brightness-[.8] duration-300 flex items-center justify-center w-[50px] h-[50px]">
                    <img src="/images/tg_bio.png" height='25px' width='25px' className='object-[-2px]'/>
                </a>
            </div>
        </motion.div>
    )
};

export default EmployeeInfo;