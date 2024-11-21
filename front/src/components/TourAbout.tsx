import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Money from '@/components/common/Money';
import { Icon } from '@iconify-icon/react';
import { ITour } from '@/types';
import { getValue } from '@/utils';

interface TourAboutProps {
	item: ITour;
}

const TourAbout: React.FC<TourAboutProps> = ({ item }) => {
	const { t } = useTranslation();
	
	const [categoryName, setCategoryName] = useState('');
	
	useEffect(() => {
		if(Object.keys(item).length) {
			// @ts-ignore
			setCategoryName(item.categoryTour[getValue('name')]);
		}
	}, [item]);
	
	return (
		<div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
			<div className="flex items-center gap-x-3">
				<div
					className="rounded-lg w-10 h-10 p-2 md:p-2.5 md:w-11 md:h-11 flex items-center justify-center border border-[var(--main-color-two)]">
					<Icon icon={'mdi:clock-outline'} className={'text-white text-2xl'} />
				</div>
				<div className="space-y-[2%]">
					<p className="font-semibold text-sm text-white xl:text-[15px]">{t('dynamicPage.title1')}</p>
					<p className="text-xs text-[#c4c4c4] xl:text-[13px]">{item.durationDays} {t('services.days')} {item.durationNights ? `/ ${item.durationNights} ${t('services.night')}` : ''}</p>
				</div>
			</div>
			<div className="flex items-center gap-x-3">
				<div
					className="rounded-lg w-10 h-10 p-2 md:p-2.5 md:w-11 md:h-11 flex items-center justify-center border border-[var(--main-color-two)]">
					<Icon icon="qlementine-icons:money-16" className={'text-white text-2xl'} />
				</div>
				<div className="space-y-[2%]">
					<p className="font-semibold text-sm text-white xl:text-[15px]">{t('dynamicPage.title4')}</p>
					<p className="text-xs text-[#c4c4c4] xl:text-[13px]">
						<Money value={item?.price} />
					</p>
				</div>
			</div>
            <div className="flex items-center gap-x-3">
                <div
                    className="rounded-lg w-10 h-10 p-2 md:p-2.5 md:w-11 md:h-11 flex items-center justify-center border border-[var(--main-color-two)]">
                    <Icon icon="vaadin:globe" className={'text-white text-2xl'} />
                </div>
                <div className="space-y-[2%]">
                    <p className="font-semibold text-sm text-white xl:text-[15px]">{t('services.category')}</p>
                    <p className="text-xs text-[#c4c4c4] xl:text-[13px]">
	                    {categoryName ? categoryName : t('services.categoryCommon')}
                    </p>
                </div>
            </div>
		</div>
	);
};

export default TourAbout;