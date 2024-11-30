import Head from 'next/head';
import React from 'react';
import { $api } from '@/composables/useService';
import { IVisa, PaginatedResponse } from '@/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { hidden, viewport, visible } from '@/constants/framer-motion-styles';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import VisaItem from '@/components/common/VisaItem';
import VisaApplicationModal from '@/components/common/VisaApplicationModal';

interface VisesPageProps {
	vises: PaginatedResponse<IVisa>
}

const VisesPage:React.FC<VisesPageProps> = ({vises}) => {
	const {t} = useTranslation();
	
	return (
		<>
			<Head>
				<title>THT VISA - Vises</title>
			</Head>
			<main>
				<motion.div
					initial='hidden'
					whileInView='visible'
					viewport={viewport}
					className="">
					<motion.div variants={{hidden, visible}} className="relative w-fit mx-auto">
						<p className="title-backgroud-text">VISES</p>
						<p className="title-text">{t('vises.title')}</p>
					</motion.div>
				</motion.div>
				<section className={'my-6 md:my-12 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4'}>
					{
						vises.total && vises.data.map((visa:IVisa) => (
							<VisaItem key={visa.id} visa={visa}/>
						))
					}
				</section>
				<VisaApplicationModal/>
			</main>
		</>
	);
};

export async function getServerSideProps(context: { locale: string }) {
	const { locale } = context;
	
	try {
		const vises = await $api.get('vises').json<PaginatedResponse<IVisa>>();
		
		return {
			props: {
				vises,
				...(await serverSideTranslations(locale, ['common']))
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
}

export default VisesPage;