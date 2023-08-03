import React from 'react';
import SwiperTour from './components/SwiperTour';

interface tourPageProps {
    
}

const tourPage: React.FC<tourPageProps> = () => {
    return (
        <div className='justify-between items-center space-y-6 xl:flex'>
            <SwiperTour/>
            <div className=""></div>
        </div>
    );
};

export default tourPage;