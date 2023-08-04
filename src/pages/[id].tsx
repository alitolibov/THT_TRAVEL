import React from 'react';
import SwiperTour from './components/SwiperTour';
import Image from 'next/image';
import {motion} from 'framer-motion'

interface tourPageProps {
    
}

const tourPage: React.FC<tourPageProps> = () => {

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
    return (
        <div className=''>
            <motion.section 
            className='justify-between space-y-10 xl:flex xl:space-y-0'
            initial='hidden'
            whileInView='visible'
            viewport={{ amount: 0.5, once: true}}
            variants={animation}>
                    <SwiperTour/>
                <div className="space-y-5">
                    <div className="flex items-center gap-x-2 w-fit mx-auto xl:mx-0">
                    <Image src="/images/location.webp" width={25} height={25} className='w-6 h-6 lt:w-9 lt:h-9' alt=""/>
                    <h1 className='text-xl text-white font-bold uppercase lt:text-3xl'>Tour Dubai</h1>
                    </div>
                    <h3 className='text-white text-center xl:text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quisquam ipsum alias voluptatum earum voluptatem, suscipit nulla quae blanditiis provident.</h3>
                </div>
            </motion.section>
        </div>
    );
};

export default tourPage;