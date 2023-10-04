import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {motion} from "framer-motion";
import {Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


function SwiperTour(props:any) {
    const img = props?.obj?.img
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
    }
    return (
        <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{amount: 0.5, once: true}}
            variants={animation}
        >
            <Swiper
                slidesPerView={'auto'}
                centeredSlides={true}
                navigation={true}
                spaceBetween={10}
                loop={true}
                initialSlide={1}
                modules={[Navigation]}
                className="mySwiper aspect-[16/8.5] md:aspect-[16/5.5] rounded-2xl"
            >
                {
                    [1,2,3,4].map((item:number) =>
                        <SwiperSlide key={item}>
                            <div className={`bg-cover bg-center w-full h-full`} style={{backgroundImage: `url("/images/toursImage/${img + item}.webp")`}}></div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </motion.div>
    );
}

export default SwiperTour
