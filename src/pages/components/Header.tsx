import { useRouter } from 'next/router';
import React from 'react';
import uz from '../../../public/lang/uz';
import ru from '../../../public/lang/ru';
import Language from './Language';
import en from '../../../public/lang/en';

interface HeaderProps {
    
}

const Header: React.FC<HeaderProps> = () => {
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
        <header className='bg px-[15px] pt-[27px] relative'>
            <div className="flex w-full items-center justify-between max-h-[57px] h-[57px]">
                <img src="/images/logo.png" className='w-[60px]' alt="" />
                <nav className="flex gap-x-[10px]">
                <p className="text-[#fff] text-[13px]">{lang.header.about}</p>
                <p className="text-[#fff] text-[13px]">{lang.header.services}</p>
                <p className="text-[#fff] text-[13px]">{lang.header.employees}</p>
                </nav>
                <Language/>
            </div>
            <div className="absolute translate-y-[-50%] top-[50%] space-y-[20px]">
            <h1 className='font-[700] text-[36px] text-white leading-[44px]'>{lang.header.greetings}<br/>THT TRAVEL</h1>
            <div className="flex items-center gap-x-[5px]"><p className="font-[500] text-[12px] text-white">Пролистываете вниз</p> <img className='h-[16px]' src="/images/bottom.png" alt="" /></div>
            </div>
        </header>
    );
};

export default Header;