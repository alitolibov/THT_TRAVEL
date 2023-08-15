import React from 'react';
import { useRouter } from 'next/router';
import Services from "@/pages/components/Services";
import Vises from "@/pages/components/Vises";
import Head from "next/head";

const servicesPage = () => {

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

export default servicesPage;