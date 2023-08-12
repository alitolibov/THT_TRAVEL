import React from 'react';
import Image from 'next/image';

interface TourAboutProps {
    icon: string
    title: string
}

const TourAbout: React.FC<TourAboutProps> = ({icon, title}) => {
    return (
        <div className="flex items-center gap-x-3">
            <div className="rounded-lg w-10 h-10 p-2 md:p-2.5 md:w-11 md:h-11 flex items-center justify-center border border-[var(--main-color-two)]">
                <Image src={icon} width={21} height={21} alt={''} className='w-full h-full'/>
            </div>
            <div className="space-y-[2%]">
                <p className='font-semibold text-sm text-white xl:text-[15px]'>{title}</p>
                <p className='text-xs text-[#c4c4c4] xl:text-[13px]'>Ежедневный тур</p>
            </div>
        </div>
    );
};

export default TourAbout;