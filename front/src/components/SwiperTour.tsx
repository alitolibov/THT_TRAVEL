import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {motion} from 'framer-motion';
import {Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ITour, IUpload } from '@/types';
import { viewport } from '@/constants/framer-motion-styles';


interface SwiperProps {
    tour: ITour
}

const SwiperTour: React.FC<SwiperProps> = ({tour}) => {
    const images= tour.images || [];
    const animation: { hidden: object, visible: object } = {
        hidden: {
            y: -30,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {duration: 0.7}
        }
    };
    return (
        <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={viewport}
            variants={animation}
        >
            <Swiper
                slidesPerView={1.3}
                centeredSlides
                navigation
                spaceBetween={15}
                loop
                initialSlide={1}
                modules={[Navigation]}
                className="mySwiper aspect-[16/8.5] md:aspect-[16/5.5] rounded-2xl"
            >
                {
                    images.map((item:IUpload) =>
                        <SwiperSlide key={item.id}>
                            <div className={'bg-cover bg-center w-full h-full'} style={{backgroundImage: `url("${item.path}")`}}></div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </motion.div>
    );
};

export default SwiperTour;
