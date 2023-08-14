import React from 'react';
import { useRouter } from 'next/router';
import Services from "@/pages/components/Services";
import Vises from "@/pages/components/Vises";

const servicesPage = () => {
    return (
        <>
            <Services/>
            <Vises/>
        </>
    )
}

export default servicesPage;