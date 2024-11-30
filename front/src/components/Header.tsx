import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import React from 'react';
import Language from './Language';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import BurgerMenu from '@/components/common/BurgerMenu';
import { ISettings } from '@/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Header = () => {
	const { locale } = useRouter();
	const { t } = useTranslation();
	
	const settings: ISettings | Record<string, any> = useSelector((state: RootState) => state.settings.settings);
	
	return (
		<motion.header
			initial="hidden"
			animate="visible"
			exit={{ opacity: 0, transition: { duration: 1 } }}
			variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
			className="py-10 flex items-center justify-between px-4 lt:px-0 container mx-auto">
			<Link locale={locale} href={'/'}>
				<img
					src={'/images/logo.webp'}
					alt={'Logo'}
					className="w-14 md:w-20 xl:w-24"
				/>
			</Link>
			
			<div className="items-center hidden gap-8 lg:flex">
				{settings.phoneFirst && (
					<h2 className="text-lg text-white font-semibold leading-none">
						<a href={`tel:${settings.phoneFirst}`}>{settings.phoneFirst}</a>
					</h2>
				)}
				
				<nav className="hidden lg:flex gap-x-5 2xl:gap-x-6">
					<Link
						href={'/about'}
						locale={locale}
						className="font-semibold duration-300 leading-none cursor-pointer hover:text-[var(--main-color-two)] lg:text-lg xl:text-xl text-white"
					>
						{t('header.about')}
					</Link>
					<Link
						href={'/vises'}
						locale={locale}
						className={'font-semibold duration-300 leading-none cursor-pointer hover:text-[var(--main-color-two)] lg:text-lg xl:text-xl text-white'}
					>
						{t('header.vises')}
					</Link>
					<Link
						href={'/tours'}
						locale={locale}
						className="font-semibold duration-300 leading-none cursor-pointer hover:text-[var(--main-color-two)] lg:text-lg xl:text-xl text-white"
					>
						{t('header.tours')}
					</Link>
				</nav>
				
				<Language />
			</div>
			
			<div className="lg:hidden">
				<BurgerMenu />
			</div>
		</motion.header>
	
	);
};

export default Header;