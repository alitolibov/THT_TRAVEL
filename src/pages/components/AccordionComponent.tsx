import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface AccordionComponentProps {
    title: string;
    desc: string
}

export const AccordionComponent: React.FC<AccordionComponentProps> = ({title, desc}) => {

    return (
        <div>
            <Accordion sx={{border: '1px solid var(--main-color-two)', backgroundColor: 'var(--main-color-two)'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: '#fff'}} />}
                    aria-controls="panel1a-content"
                    sx={{ borderRadius: '15px'}}
                >
                    <Typography className={'text-white'}>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails className={'bg-[var(--main-color-two)]'}>
                    <Typography className={'text-white font-'}>
                        {desc}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
