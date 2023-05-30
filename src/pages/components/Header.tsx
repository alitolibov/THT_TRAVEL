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
        <header className='bg px-[15px] pt-[27px]'>
            <div className="flex w-full items-center justify-between max-h-[57px] h-[57px]">
                <img src="/images/logo.png" className='w-[60px]' alt="" />
                <div className="flex gap-x-[10px]">
                <p className="text-[#fff] text-[14px]">{lang.header.about}</p>
                <p className="text-[#fff] text-[14px]">{lang.header.employees}</p>
                </div>
                <Language/>
            </div>
        </header>
    );
};

export default Header;