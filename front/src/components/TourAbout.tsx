import React from 'react';
import Image from 'next/image';
import {useTranslation} from 'next-i18next';

interface TourAboutProps {
    item: any
}

const TourAbout: React.FC<TourAboutProps> = ({item}) => {
    const {t} = useTranslation();
    return (
        <div className="grid h-fit grid-cols-2 gap-3.5 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 xl:gap-y-0">
            <div className="flex items-center gap-x-3">
                <div className="rounded-lg w-10 h-10 p-2 md:p-2.5 md:w-11 md:h-11 flex items-center justify-center border border-[var(--main-color-two)]">
                    <Image src={'/images/time.webp'} width={21} height={21} alt={''} className='w-full h-full'/>
                </div>
                <div className="space-y-[2%]">
                    <p className='font-semibold text-sm text-white xl:text-[15px]'>{t('dynamicPage.title1')}</p>
                    <p className='text-xs text-[#c4c4c4] xl:text-[13px]'>{item?.typeTour}</p>
                </div>
            </div>
            <div className="flex items-center gap-x-3">
                <div className="rounded-lg w-10 h-10 p-2 md:p-2.5 md:w-11 md:h-11 flex items-center justify-center border border-[var(--main-color-two)]">
                    <Image src={'/images/group.webp'} width={21} height={21} alt={''} className='w-full h-full'/>
                </div>
                <div className="space-y-[2%]">
                    <p className='font-semibold text-sm text-white xl:text-[15px]'>{t('dynamicPage.title2')}</p>
                    <p className='text-xs text-[#c4c4c4] xl:text-[13px]'>{item?.peoples}</p>
                </div>
            </div><div className="flex items-center gap-x-3">
            <div className="rounded-lg w-10 h-10 p-2 md:p-2.5 md:w-11 md:h-11 flex items-center justify-center border border-[var(--main-color-two)]">
                <Image src={'/images/lang.webp'} width={21} height={21} alt={''} className='w-full h-full'/>
            </div>
            <div className="space-y-[2%]">
                <p className='font-semibold text-sm text-white xl:text-[15px]'>{t('dynamicPage.title3')}</p>
                <p className='text-xs text-[#c4c4c4] xl:text-[13px]'>{item?.lang}</p>
            </div>
        </div><div className="flex items-center gap-x-3">
            <div className="rounded-lg w-10 h-10 p-2 md:p-2.5 md:w-11 md:h-11 flex items-center justify-center border border-[var(--main-color-two)]">
                <Image src={'/images/money.webp'} width={21} height={21} alt={''} className='w-full h-full'/>
            </div>
            <div className="space-y-[2%]">
                <p className='font-semibold text-sm text-white xl:text-[15px]'>{t('dynamicPage.title4')}</p>
                <p className='text-xs text-[#c4c4c4] xl:text-[13px]'>{item?.price}</p>
            </div>
        </div>


        </div>
    );
};

export default TourAbout;