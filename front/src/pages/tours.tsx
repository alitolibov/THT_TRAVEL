import Head from 'next/head';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { $api } from '@/composables/useService';
import { ICategoryTour, PaginatedResponse } from '@/types';
import CategoryWithToursSection from '@/components/common/CategoryWithToursSection';
import { hidden, visible } from '@/constants/framer-motion-styles';
import qs from 'qs';


interface ToursPageProps {
    categoryWithTours: PaginatedResponse<ICategoryTour>;
}

const Tours: React.FC<ToursPageProps>  = ({categoryWithTours}) => {
    const {t} = useTranslation();
	
    return (
        <>
            <Head>
                <title>THT VISA - Tours</title>
            </Head>
            <main>
                <motion.div variants={{hidden, visible}} className="relative w-fit mx-auto">
                    <p className="title-backgroud-text">TOURS</p>
                    <p className="title-text">{t('tours.title')}</p>
                </motion.div>
                <div className={'space-y-16 lg:space-y-24 my-6 md:my-12'}>
                    {
                        categoryWithTours.total && categoryWithTours.data.map((category: ICategoryTour) => (
                            <CategoryWithToursSection category={category} key={category.id}/>
                        ))
                    }
                </div>
            </main>
        </>
    );
};

export async function getServerSideProps(context: { locale: string }) {
    const { locale } = context;
	
    try {
        const params = qs.stringify({sortBy: {priority: -1}});
        const categoryWithTours = await $api.get(`category-tours?${params}`).json<PaginatedResponse<ICategoryTour>>();

        return {
            props: {
                categoryWithTours,
                ...(await serverSideTranslations(locale, ['common']))
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}

export default Tours;