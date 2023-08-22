import React from 'react';
import Count from "@/pages/components/Count";
import AboutUs from "@/pages/components/AboutUs";
import Team from "@/pages/components/Team";
import Maps from "@/pages/components/Maps";
import Head from "next/head";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const About = () => {
    return (
        <>
            <Head>
                <title>THT VISA - About</title>
            </Head>
            <Count/>
            <AboutUs/>
            <Team/>
            <Maps/>
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
export default About