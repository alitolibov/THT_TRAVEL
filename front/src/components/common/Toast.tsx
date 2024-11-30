import { bus } from '@/utils/bus';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Icon } from '@iconify-icon/react';

interface ToastData {
	type: 'success' | 'error',
	message: string
}

const Toast = () => {
	const [isOpen, setToggle] = useState(false);
	const [data, setData] = useState<ToastData | Record<string, any>>({});
	
	bus.on('toastOpen', (data) => open(data));
	
	function open(toastData: ToastData) {
		setToggle(true);
		setData(toastData);
		
		setTimeout(() => {
			setToggle(false);
			setData({});
		}, 3000);
	}
	
	return (
		<AnimatePresence>
			{isOpen ?
				<motion.div exit={{ translateX: '100%' }}
				            initial={{ translateX: '100%' }}
				            animate={{ translateX: 0 }}
				            className={'fixed right-0 top-20 bg-white flex items-center rounded-l-xl gap-4 p-3 !z-[1000000]'}>
					<div className={`rounded-xl flex items-center justify-center p-1 ${data.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
						<Icon icon={data.type === 'error' ? 'icon-park-solid:error' : 'mdi:success'} width="25" height="25" className={'text-white'}/>
					</div>
					<p className={'text-sm md:text-base'}>{data.message}</p>
				</motion.div> : null}
		
		</AnimatePresence>
	);
};

export default Toast;