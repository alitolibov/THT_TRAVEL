import React from 'react';
import Services from '@/components/Services';
import Vises from '@/components/Vises';
import Head from 'next/head';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

const ServicesPage = () => {

    return (
        <>
            <Head>
                <title>THT VISA - Services</title>
            </Head>
            <Services/>
            <Vises/>
        </>
    );
};
export async function getStaticProps(props:{locale:string}) {
    return {
        props: {
            ...(await serverSideTranslations(props.locale, ['common']))
        },
    };
}

export default ServicesPage;