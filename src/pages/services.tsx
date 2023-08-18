import React from 'react';
import { useRouter } from 'next/router';
import Services from "@/pages/components/Services";
import Vises from "@/pages/components/Vises";
import Head from "next/head";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const ServicesPage = () => {

    return (
        <>
            <Head>
                <title>THT VISA - Services</title>
            </Head>
            <Services/>
            <Vises/>
        </>
    )
}
export async function getStaticProps(props:{locale:string}) {
    return {
        props: {
            ...(await serverSideTranslations(props.locale, ['common']))
        },
    };
}

export default ServicesPage;