import React from 'react';
import { IVisa } from '@/types';
import { viewport } from '@/constants/framer-motion-styles';
import { motion } from 'framer-motion';
import { getValue } from '@/utils';
import { useTranslation } from 'next-i18next';
import { Icon } from '@iconify-icon/react';
import { bus } from '@/utils/bus';

interface VisaItemProps {
	visa: IVisa;
}

const animation:{hidden: object, visible: object} = {
	hidden: {
		y: 40,
		opacity: 0
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: {duration: 0.8}
	}
};

const VisaItem:React.FC<VisaItemProps> = ({visa}) => {
	const {t} = useTranslation();
	
	
	// @ts-ignore
	const nameVisa = visa[getValue('nameVisa')] || 'Текст не найден';
	// @ts-ignore
	const description = visa[getValue('description')] || 'Текст не найден';
	// @ts-ignore
	const location = visa[getValue('location')] || 'Текст не найден';
	
	function openModal() {
		bus.emit('modalOpen', {id: 'visaApplicationModal', visaName: visa.nameVisaRu});
	}
	
	return (
		<div>
			<motion.div
				initial='hidden'
				whileInView='visible'
				viewport={viewport}
				whileHover={{ scale: 0.95 }}
				whileTap={{ scale: 0.95 }}
				onClick={() => openModal()}
				variants={animation} className={'aspect-[1/1.1] sm:aspect-[1/1.2] lg:aspect-[1/1.4] rounded-xl overflow-hidden cursor-pointer'}>
				<div className={'bg-cover bg-no-repeat bg-center h-2/5'} style={{backgroundImage: `url(${visa.image?.path})`}}/>
				<div className={'h-3/5 px-2 bg-[var(--main-color-two)] flex flex-col justify-evenly'}>
					<h4 className={'text-white font-semibold text-xl lg:text-2xl text-center'}>{nameVisa}</h4>
					<p className={'text-white font-semibold'}>{t('vises.reviewPeriods')} {visa.reviewPeriods} {t('vises.days')}</p>
					<p className={'text-white textEllipsisForVisa'}>{description}</p>
					<p className={'text-white flex items-center gap-1 font-semibold'}><Icon icon="mdi:location" className={'text-xl'}/> {location}</p>
				</div>
			</motion.div>
		</div>
	);
};

export default VisaItem;