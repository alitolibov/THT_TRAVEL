import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { $api } from '@/composables/useService';
import { ISettings } from '@/types';
import { update } from '@/store/features/settings';
import { bus } from '@/utils/bus';
import Toast from '@/components/common/Toast';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { pathname, locale } = useRouter();
	
	const dispatch = useDispatch();
	
	bus.emit('updateLocale', locale);
	
	useEffect(() => {
		const fetchSettings = async () => {
			const data = await $api.get('settings').json<ISettings>();
			dispatch(update(data));
			
		};
		
		fetchSettings();
	}, []);
	
	return (
		<div className={pathname === '/' ? 'bg-start' : ''}>
			<Header />
			<main className="px-4 lt:px-0 container mx-auto">
				{children}
			</main>
			<Footer />
			<Toast/>
		</div>
	);
};

export default Layout;