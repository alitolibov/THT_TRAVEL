import React from 'react';
import SwiperTour from './components/SwiperTour';
import Image from 'next/image';

interface tourPageProps {
    
}

const tourPage: React.FC<tourPageProps> = () => {
    return (
        <div className='justify-between items-center space-y-10 xl:flex xl:space-y-0'>
            <SwiperTour/>
            <div className="space-y-5">
                <div className="flex items-center gap-x-2 w-fit mx-auto xl:mx-0">
                <Image src="/images/location.webp" width={25} height={25} className='w-6 h-6 lt:w-9 lt:h-9' alt=""/>
                <h1 className='text-xl text-white font-bold uppercase lt:text-3xl'>Tour Dubai</h1>
                </div>
                <h3 className='text-white text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quisquam ipsum alias voluptatum earum voluptatem, suscipit nulla quae blanditiis provident.</h3>
            </div>
        </div>
    );
};

export default tourPage;