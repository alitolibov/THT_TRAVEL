import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Montserrat} from 'next/font/google';

interface AccordionComponentProps {
    title: string;
    desc: string
}
const montserrat = Montserrat({ subsets: ['vietnamese'] });

const AccordionComponent: React.FC<AccordionComponentProps> = ({title, desc}) => {

    return (
        <div>
            <Accordion sx={{border: '1px solid var(--main-color-two)', backgroundColor: 'var(--main-color-two)'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: '#fff'}} />}
                    aria-controls="panel1a-content"
                    sx={{ borderRadius: '15px'}}
                >
                    <Typography className={`text-sm lg:text-base text-white ${montserrat.className} w-11/12`}>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails className={'bg-[var(--main-color-two)]'}>
                    <Typography className={`text-sm lg:text-base text-white ${montserrat.className}`}>
                        {desc}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default AccordionComponent;