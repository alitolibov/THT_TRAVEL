import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import React from 'react';
import Language from './Language';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import BurgerMenu from '@/components/common/BurgerMenu';

const Header = () => {
	const { asPath, locale } = useRouter();
	const { t } = useTranslation();
	
	return (
		<>
			<motion.header
				initial="hidden"
				animate="visible"
				exit={{ opacity: 0, transition: { duration: 1 } }}
				variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
				className="py-10 flex items-center justify-between px-4 lt:px-0 container mx-auto">
				<Link locale={locale} href={'/'}><img src={'/images/logo.webp'} alt={'Logo'}
				                                      className="w-14 md:w-20 xl:w-24" /></Link>
				<nav className="hidden lg:flex gap-x-5 2xl:gap-x-6">
					<Link href={'/services'} locale={locale}
					      className={'font-semibold duration-300cursor-pointer hover:text-[var(--main-color-two)] lg:text-lg xl:text-xl text-white'}>{t('header.services')}</Link>
					<Link href={'/about'} locale={locale}
					      className={'font-semibold duration-300cursor-pointer hover:text-[var(--main-color-two)] lg:text-lg xl:text-xl text-white'}>{t('header.about')}</Link>
					<Link href={'/tours'} locale={locale}
					      className={'font-semibold duration-300cursor-pointer hover:text-[var(--main-color-two)] lg:text-lg xl:text-xl text-white'}>{t('header.tours')}</Link>
				</nav>
				<div className={'hidden lg:block'}>
					<Language/>
				</div>
				<div className={'lg:hidden'}>
					<BurgerMenu/>
				</div>
			</motion.header>
		</>
	);
};

export default Header;