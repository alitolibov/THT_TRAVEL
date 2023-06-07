import React from 'react';
import {motion} from 'framer-motion'
import { useRouter } from 'next/router';
import uz from '../../../public/lang/uz';
import ru from '../../../public/lang/ru';
import en from '../../../public/lang/en';
import EmployeeInfo from './EmployeeInfo';

interface TeamProps {}

const visible:object = { opacity: 1, y: 0, transition: { duration: 0.8 } };

const arr:any = [
    {
        photo: 'photo_one2.jpeg',
        name: 'Tagiev Khusen',
        level: 'Manager',
        phone: '+998915438880',
        tg: 'https://t.me/+998915438880',
        insta: 'https://www.instagram.com/husintagiyev/'
    },
    {
        photo: 'photo_two.jpeg',
        name: 'Tagiev Khasan',
        level: 'CEO Director',
        phone: '+998978980222',
        tg: 'https://t.me/khasan_tagiev',
        insta: 'https://www.instagram.com/khasan_tagiev/'
    },{
        photo: 'photo_3.jpeg',
        name: 'Sherzod Khamidov',
        level: 'Sales Manager',
        phone: '+998907434442',
        tg: 'https://t.me/khamidov_Sher',
        insta: 'https://www.instagram.com/khamidov2o3/'
    }
]

const Team: React.FC<TeamProps> = () => {

    const {locale} = useRouter()
    let lang
    switch(locale) {
        case 'uz':
            lang = uz
          break
        case 'ru': 
        lang = ru
          break
        default:
            lang = en
          break
      }

    return (
        <section 
            id='employess'
            className='space-y-[40px] mt-[150px] mb-[50px] md:space-y-[50px]'>
            <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ amount: 0.4, once: true}}
            className="">
                <motion.div variants={{hidden: { opacity: 0, y: -20 }, visible}} className="relative w-fit mx-auto">
                    <p className="font-[900] text-[3.14rem] text-[var(--main-color-two)] opacity-[0.5] leading-[3.5rem] sm:text-[5rem] sm:leading-[5rem]">OUR TEAM</p>
                    <p className="w-[300px] left-[50%] translate-x-[-50%] font-[600] text-[1.5rem] text-[#fff] absolute top-[20px] sm:text-[1.75rem] text-center leading-[1.5rem] sm:leading-[1.75rem] sm:left-[50%] sm:translate-x-[-50%] sm:top-[35px]">{lang.team.title}</p>
                </motion.div>
            </motion.div>
        <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ amount: 0.4, once: true}}
        className="bgImges grid grid-cols-1 gap-y-[24px] lg:grid-cols-3 lg:gap-x-[30px] lg:gap-y-[30px]">
            {
                arr.map((item:any, idx:number) => <EmployeeInfo photo={item.photo} name={item.name} level={item.level} phone={item.phone} insta={item.insta} tg={item.tg} key={idx}/>)
            }
        </motion.div>
        </section>
    );
};

export default Team;