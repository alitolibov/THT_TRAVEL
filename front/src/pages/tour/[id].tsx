import React from 'react';
import SwiperTour from '@/components/SwiperTour';
import { motion } from 'framer-motion';
import TourAbout from '@/components/TourAbout';
import Book from '@/components/Book';
import AccordionComponent from '@/components/AccordionComponent';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ToastContainer } from 'react-toastify';
import { ITour } from '@/types';
import { getValue } from '@/utils';
import Money from '@/components/common/Money';
import FooterTourPage from '@/components/common/FooterTourPage';
import { $api } from '@/composables/useService';

interface TourPageProps {
	tour: ITour;
}

export const getServerSideProps = async (context: { params: { id: string }; locale: string }) => {
	const { id } = context.params;
	const { locale } = context;
	
	try {
		const res = await $api.get(`tours/${id}`).json<ITour>();
		
		const translations = await serverSideTranslations(locale, ['common']);
		
		return {
			props: {
				tour: res,
				...translations,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

const TourPage: React.FC<TourPageProps> = ({ tour }) => {
	const { t } = useTranslation();
	
	const accordionArr = t('dynamicPage.accordionQuestion', {returnObjects: true});
	
	const animation: {
		hidden: object,
		visible: object
	} = {
		hidden: {
			y: 30,
			opacity: 0
		},
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.7 }
		}
	};
	
	return (
		<>
			<ToastContainer
				style={{ fontSize: '14px' }}
				autoClose={5000}
				hideProgressBar={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<div className="">
				<Head>
					<title>THT VISA - {tour.nameDirectionEn}</title>
				</Head>
				<section
					className="space-y-10">
					<SwiperTour tour={tour} />
					<div className="">
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ amount: 0.5, once: true }}
							variants={animation}
							className="relative">
							<p className="font-[900] uppercase text-[3.5rem] text-[var(--main-color-two)] opacity-[0.3] leading-[3.5rem] sm:text-[5rem] sm:leading-[5rem]">TOUR</p>
							<p className="font-[600] text-[1.5rem] text-[#fff] absolute bottom-[5px] sm:bottom-[12px] sm:text-[1.75rem] text-center leading-[1.5rem] sm:leading-[1.75rem]">{tour[getValue('nameDirection')]}</p>
						</motion.div>
						<div className="mt-5 flex justify-between">
							<motion.div
								initial="hidden"
								whileInView="visible"
								viewport={{ amount: 0.3, once: true }}
								variants={animation}
								className={'space-y-6 w-full lg:w-3/5 xl:w-8/12'}>
								<TourAbout item={tour} />
								<div className={'border-t border-[var(--main-color-two)]'}></div>
								<h1 className={'text-white text-2xl font-semibold lg:text-[26px]'}>{t('dynamicPage.aboutTour')}</h1>
								<p className={'text-base text-white md:max-w-lg'}>{tour[getValue('description')]}</p>
								<h2 className={'text-white text-xl font-semibold lg:text-2xl]'}>{t('dynamicPage.duration')}</h2>
								<p className={'text-lg text-white'}>{tour.durationDays} {t('services.days')} {!!tour.durationNights && `/ ${tour.durationNights} ${t('services.night')}`}</p>
								<h2 className={'text-white text-xl font-semibold lg:text-2xl]'}>{t('dynamicPage.price')}</h2>
								<p className={'text-lg text-white'}>
									<Money value={tour?.price} />
								</p>
								<div className={'border-t border-[var(--main-color-two)]'}></div>
								<h1 className={'text-white text-2xl font-semibold lg:text-[26px]'}>{t('dynamicPage.question')}</h1>
									{
										!!accordionArr.length && accordionArr.map((item: Record<string, any>) => (
											<AccordionComponent title={item.title} desc={item.desc} key={item.title}/>
										))
									}
							</motion.div>
							<motion.div
								initial="hidden"
								whileInView="visible"
								viewport={{ amount: 0.4, once: true }}
								variants={animation}
								className={'hidden relative lg:block lg:max-w-[340px] xl:max-w-[350px]'}>
								<div className={'sticky top-0 bottom-0 w-full'}>
									<Book tourName={tour[getValue('nameDirection')]}/>
								</div>
							</motion.div>
						</div>
					</div>
				</section>
				<FooterTourPage tour={tour} />
			</div>
		</>
	);
};

export default TourPage;