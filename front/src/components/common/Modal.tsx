import React, { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { AnimatePresence, motion } from 'framer-motion';
import { bus } from '@/utils/bus';
import { ModalContext } from '@/contexts/modal.context';

interface ModalProps {
	children: React.ReactNode;
	wrapperClasses?: string;
	id: string;
}

const Modal: React.FC<ModalProps> = ({ children, wrapperClasses, id }) => {
	const [isOpen, setToggle] = useState(false);
	const [data, setData] = useState<Record<string, any>>({});
	
	useEffect(() => {
		const handleModalOpen = (data: any) => {
			if (data.id === id) {
				setToggle(true);
				setData(data);
			}
		};
		
		bus.on('modalOpen', handleModalOpen);
	}, [id]);
	
	
	return (
		<AnimatePresence>
			{isOpen ?
				<motion.div exit={{ opacity: 0, scale: 1.05 }}
				            initial={{ opacity: 0, scale: 0.95 }}
				            animate={{ opacity: 1, scale: 1 }}
				            id={id}
				            className={'fixed w-screen flex items-center justify-center h-screen bg-gray-800/80 backdrop-blur-sm inset-0 !z-[10000]'}>
					<ModalContext.Provider value={{ data }}>
						<div className={`max-w-md bg-white aspect-square rounded-xl ${wrapperClasses}`}>
							<OutsideClickHandler onOutsideClick={() => setToggle(false)}>
								{children}
							</OutsideClickHandler>
						</div>
					</ModalContext.Provider>
				</motion.div>
				: null}
		</AnimatePresence>
	);
};

export default Modal;