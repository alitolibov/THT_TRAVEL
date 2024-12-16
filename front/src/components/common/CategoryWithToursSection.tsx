import React, { useEffect, useMemo, useState } from 'react';
import { ICategoryTour, ITour } from '@/types';
import { getValue } from '@/utils';
import Item from '@/components/Item';
import { useTranslation } from 'next-i18next';
import { useTailwindBreakpoints } from '@/composables/tailwind';

interface CategoryWithToursSectionProps {
	category: ICategoryTour;
}

const CategoryWithToursSection: React.FC<CategoryWithToursSectionProps> = ({ category }) => {
	const { t } = useTranslation();
	
	const keyName = getValue('name') as keyof ICategoryTour;
	const categoryName = String(category[keyName]);
	const breakpoints = useTailwindBreakpoints();
	
	const [isShowMore, setShowMore] = useState<boolean>(false);
	const [tours, setTours] = useState<ITour[]>([]);
	
	const allowedTourCount = useMemo(() => getAllowCountTours(breakpoints), [breakpoints]);
	
	useEffect(() => {
		const validTours = Array.isArray(category.tours) ? category.tours : [];
		const slicedTours = isShowMore ? validTours : validTours.slice(0, allowedTourCount);
		setTours(slicedTours);
	}, [category, isShowMore, allowedTourCount]);
	
	function getAllowCountTours(breakpoints: any): number {
		if (breakpoints.xl) return 8;
		if (breakpoints.sm) return 6;
		if (breakpoints.xs) return 5;
		return 8;
	}
	
	return (
		<section className={'space-y-4 md:space-y-8'}>
			<div className={'flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-5'}>
				<p className="text-white text-lg lg:text-[26px] font-medium">{categoryName}</p>
				<div className={'border-t grow border-[var(--main-color-two)]'} />
				<button onClick={() => setShowMore(!isShowMore)}
				        className={'hidden lg:block text-white underline duration-300 hover:text-[var(--main-color-two)]'}>
					{isShowMore ? t('tours.hide') : t('tours.show')}
				</button>
			</div>
			<div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
				{
					tours.map((tour: ITour) => (
						<Item item={tour} key={tour.id} />
					))
				}
			</div>
			<button onClick={() => setShowMore(!isShowMore)} className={'text-white block rounded-xl bg-[var(--main-color-two)] font-semibold w-full py-3'}>
				{isShowMore ? t('tours.hide') : t('tours.show')}
			</button>
		</section>
	);
};

export default CategoryWithToursSection;