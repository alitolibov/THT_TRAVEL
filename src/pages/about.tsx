import React from 'react';
import Count from "@/pages/components/Count";
import AboutUs from "@/pages/components/AboutUs";
import Team from "@/pages/components/Team";
import {Maps} from "@/pages/components/Maps";

const about = () => {
    return (
        <>
            <Count/>
            <AboutUs/>
            <Team/>
            <Maps/>
        </>
    )
}

export default about