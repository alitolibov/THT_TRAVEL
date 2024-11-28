import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { stagger, useAnimate } from 'framer-motion';
import OutsideClickHandler from 'react-outside-click-handler';
import { ISettings } from '@/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Path = (props:any) => (
	<path
		fill="transparent"
		strokeWidth="2"
		stroke="#fff"
		strokeLinecap="round"
		{...props}
	/>
);

const BurgerMenu: React.FC = () => {
	const [toggle, setToggle] = useState(false);
	const { asPath, locale } = useRouter();
	const { t } = useTranslation();
	
	const [scope, animate] = useAnimate();
	const settings: ISettings | Record<string, any> = useSelector((state: RootState) => state.settings.settings);
	
	useEffect(() => {
		const menuAnimations = toggle
			? [
				[
					'.menu',
					{ right: '0', opacity: 1},
					{ ease: [0.08, 0.65, 0.53, 0.96], duration: 0.5, }
				],
				[
					'li',
					{ transform: 'scale(1)', opacity: 1, filter: 'blur(0px)' },
					{ delay: stagger(0.05), at: '-0.1' }
				],
				[
					'h2',
					{ transform: 'scale(1)', opacity: 1, filter: 'blur(0px)' },
					{ delay: stagger(0.05), at: '-0.1' }
				]
			]
			: [
				[
					'li',
					{ transform: 'scale(0.5)', opacity: 0, filter: 'blur(10px)' },
					{ delay: stagger(0.05, { from: 'last' }), at: '<' }
				],
				[
					'h2',
					{ transform: 'scale(0.5)', opacity: 0, filter: 'blur(10px)' },
					{ delay: stagger(0.05, { from: 'last' }), at: '<' }
				],
				['.menu', { right: '-100%', opacity: 0 }, { at: '-0.05' }]
			];
		
			animate([
				[
					'path.top',
					{ d: toggle ? 'M 3 16.5 L 17 2.5' : 'M 2 2.5 L 20 2.5' },
					{ at: '<' }
				],
				['path.middle', { opacity: toggle ? 0 : 1 }, { at: '<' }],
				[
					'path.bottom',
					{ d: toggle ? 'M 3 2.5 L 17 16.346' : 'M 2 16.346 L 20 16.346' },
					{ at: '<' }
				],
				...menuAnimations
			]);
		
	}, [animate, toggle]);
	
	useEffect(() => {
		const body = document.body as HTMLElement;
		toggle ? body.style.overflowY = 'hidden' : body.style.overflowY = 'scroll';
	}, [toggle]);
	
	return (
		<div ref={scope}>
			<OutsideClickHandler onOutsideClick={() => setToggle(false)}>
				<button onClick={() => setToggle(!toggle)} className={'button !z-[100000] relative'}>
					<svg width="25" height="20" viewBox="0 0 23 18">
						<Path
							d="M 2 2.5 L 20 2.5"
							className="top"
						/>
						<Path d="M 2 9.423 L 20 9.423" opacity="1" className="middle" />
						<Path
							d="M 2 16.346 L 20 16.346"
							className="bottom"
						/>
					</svg>
				</button>
				<div
					className={'menu fixed flex flex-col items-end justify-between z-10 top-0 bg-[var(--main-color-two)] h-screen w-2/3 max-w-xs opacity-0 pt-24 pb-7 px-5'}>
					<div className={'space-y-10'}>
						<nav>
							<ul className="flex flex-col items-end gap-4">
								<li onClick={() => setToggle(false)}>
									<Link href={'/services'} locale={locale}
									      className={'font-semibold text-xl text-white'}>{t('header.services')}</Link>
								</li>
								<li onClick={() => setToggle(false)}>
									<Link href={'/about'} locale={locale}
									      className={'font-semibold text-xl text-white'}>{t('header.about')}</Link>
								</li>
								<li onClick={() => setToggle(false)}>
									<Link href={'/tours'} locale={locale}
									      className={'font-semibold text-xl text-white'}>{t('header.tours')}</Link>
								</li>
							</ul>
						</nav>
						<ul className={'flex justify-end font-semibold divide-x-2 divide-[var(--main-color)]'}>
							<li><Link className={`px-2 duration-300 ${locale === 'en' ? 'text-[ver(--main-color)]' : 'text-white'}`} href={asPath} locale={'en'}>EN</Link></li>
							<li><Link className={`px-2 duration-300 ${locale === 'uz' ? 'text-[ver(--main-color)]' : 'text-white'}`} href={asPath} locale={'uz'}>UZ</Link></li>
							<li><Link className={`px-2 duration-300 ${locale === 'ru' ? 'text-[ver(--main-color)]' : 'text-white'}`} href={asPath} locale={'ru'}>RU</Link></li>
						</ul>
					</div>
					<div>
						{settings.phoneFirst && (
							<h2 className="text-lg text-white font-semibold leading-none">
								<a href={`tel:${settings.phoneFirst}`}>{settings.phoneFirst}</a>
							</h2>
						)}
					</div>
				</div>
			</OutsideClickHandler>
		</div>
	);
};

export default BurgerMenu;
