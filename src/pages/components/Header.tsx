import { useRouter } from 'next/router';
import React from 'react';
import uz from '../../../public/lang/uz';
import ru from '../../../public/lang/ru';
import eng from '../../../public/lang/eng';

interface HeaderProps {
    
}

const Header: React.FC<HeaderProps> = () => {
    const {locale} = useRouter()
    let lang
    if(locale === 'uz') {
        lang = uz
    } else if(locale === 'ru') {
        lang = ru
    } else {
        lang = eng
    }

    return (
        <header className='px-[24px] pt-[27px] flex w-full items-center justify-between h-[57px]'>
            <div className="h-full w-[37px] bg-cover bg-no-repeat bg-[url('/images/logo.png')]"></div>
            <div className="flex items-center gap-[5px]">
                <p className="text-[#fff] text-[8px]">{lang.header.about}</p>
                <p className="text-[#fff] text-[8px]">{lang.header.employees}</p>
            </div>
        </header>
    );
};

export default Header;