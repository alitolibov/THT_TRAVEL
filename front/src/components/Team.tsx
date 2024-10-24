import React, { useEffect, useState } from 'react';
import {motion} from 'framer-motion';
import EmployeeInfo from './EmployeeInfo';
import {useTranslation} from 'next-i18next';
import { useService } from '@/composables/useService';
import { IEmployee, PaginatedResponse } from '@/types';

interface TeamProps {}

const visible:object = { opacity: 1, y: 0, transition: { duration: 0.8 } };

const Team: React.FC<TeamProps> = () => {
    const {t} = useTranslation();
    const [employees, setEmployees] = useState<PaginatedResponse<IEmployee> | any>();
    const employeesService = useService('employees');
    
    useEffect(() => {
        const fetchEmployees = async () => {
            const data = await employeesService.find<IEmployee>();
            setEmployees(data);
        };
        
        fetchEmployees();
    }, []);
    
    return (
        <section
            className='space-y-[40px] mt-[150px] mb-[50px] md:space-y-[50px]'>
            <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ amount: 0.4, once: true}}
            className="">
                <motion.div variants={{hidden: { opacity: 0, y: -20 }, visible}} className="relative w-fit mx-auto">
                    <p className="font-[900] text-[3.14rem] text-[var(--main-color-two)] opacity-[0.5] leading-[3.5rem] sm:text-[5rem] sm:leading-[5rem]">OUR TEAM</p>
                    <p className="w-[300px] left-[50%] translate-x-[-50%] font-[600] text-[1.5rem] text-[#fff] absolute top-[20px] sm:text-[1.75rem] text-center leading-[1.5rem] sm:leading-[1.75rem] sm:left-[50%] sm:translate-x-[-50%] sm:top-[35px]">{t('team.title')}</p>
                </motion.div>
            </motion.div>
        <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ amount: 0.4, once: true}}
        className="bgImges grid grid-cols-1 gap-y-[24px] lg:grid-cols-3 lg:gap-x-[30px] lg:gap-y-[30px]">
            {
                employees?.data.map((item:IEmployee, idx:number) => <EmployeeInfo photo={item.image?.path} name={`${item.firstName} ${item.lastName}`} level={item.position} phone={item.phone} insta={item.instagram} tg={item.telegram} key={idx}/>)
            }
        </motion.div>
        </section>
    );
};

export default Team;