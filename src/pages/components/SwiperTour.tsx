import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {motion} from "framer-motion";
import {Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


export default function App() {
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
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                slidesPerView={'auto'}
                centeredSlides={true}
                navigation={true}
                spaceBetween={10}
                loop={true}
                initialSlide={2}
                modules={[Navigation]}
                className="mySwiper aspect-[16/7.5] md:aspect-[16/5.5] rounded-2xl"
            >
                <SwiperSlide>
                    <div className="swiper-zoom-container">
                        <img src="https://swiperjs.com/demos/images/nature-1.jpg"/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper-zoom-container">
                        <img src="https://swiperjs.com/demos/images/nature-2.jpg"/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper-zoom-container">
                        <img src="https://swiperjs.com/demos/images/nature-3.jpg"/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper-zoom-container">
                        <img src="https://swiperjs.com/demos/images/nature-4.jpg"/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper-zoom-container">
                        <img src="https://swiperjs.com/demos/images/nature-5.jpg"/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper-zoom-container">
                        <img src="https://swiperjs.com/demos/images/nature-6.jpg"/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper-zoom-container">
                        <img src="https://swiperjs.com/demos/images/nature-7.jpg"/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper-zoom-container">
                        <img src="https://swiperjs.com/demos/images/nature-8.jpg"/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper-zoom-container">
                        <img src="https://swiperjs.com/demos/images/nature-9.jpg"/>
                    </div>
                </SwiperSlide>
            </Swiper>
        </motion.div>
    );
}
