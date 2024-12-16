import React, { useEffect, useState } from 'react';
import { ITour } from '@/types';
import { motion } from 'framer-motion';
import Book from '@/components/Book';
import Money from '@/components/common/Money';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getValue } from '@/utils';
import OutsideClickHandler from 'react-outside-click-handler';

interface FooterTourPageProps {
	tour: ITour;
}

const modal = {
	open: {
		y: 0,
		transition: {
			type: 'spring',
			stiffness: 30
		}
	},
	closed: {
		y: '100%',
		transition: {
			type: 'spring',
			stiffness: 30
		}
	}
};

const FooterTourPage: React.FC<FooterTourPageProps> = ({ tour }) => {
	const { asPath } = useRouter();
	const [isOpen, toggleOpen] = useState(false);
	const { t } = useTranslation('common');

	const key = getValue('nameDirection') as keyof ITour;
	const tourName = String(tour[key]);
	
	useEffect(() => {
		const body = document.body as HTMLElement;
		isOpen ? body.style.overflowY = 'hidden' : body.style.overflowY = 'scroll';
	}, [isOpen]);
	
	return (
		<>
			<OutsideClickHandler onOutsideClick={() => toggleOpen(false)}>
				<motion.div initial={false} animate={isOpen ? 'open' : 'closed'} variants={modal}
				            className={'w-full bg-[var(--main-color)] overflow-y-scroll rounded-2xl overflow-hidden border-t border-[#ffffff] bottom-[75px] fixed left-0 z-10 h-3/5 lg:hidden'}>
					<Book tourName={tourName}/>
				</motion.div>
				<motion.div
					className={`fixed bottom-0 left-0 w-full h-[75px] bg-[var(--main-color)] border-t border-[#ffffff] lg:hidden ${asPath.includes('tour/') ? 'z-50' : 'z-0'}`}>
					<div className="flex items-center justify-between px-4 h-full">
						<p className="text-lg font-semibold text-[var(--main-color-two)]">
							<Money value={tour?.price} />
						</p>
						<button onClick={() => toggleOpen(!isOpen)}
						        className="rounded-3xl text-white px-4 py-2 bg-[var(--main-color-two)] font-medium">{t('dynamicPage.bookForm.btnBook')}
						</button>
					</div>
				</motion.div>
			</OutsideClickHandler>
		</>
	);
};

export default FooterTourPage;