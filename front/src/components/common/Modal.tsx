import React, { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { AnimatePresence, motion } from 'framer-motion';
import { bus } from '@/utils/bus';

interface ModalProps {
	children: React.ReactNode;
	wrapperClasses?: string;
	id: string;
	shown: (data: any) => void;
}

const Modal: React.FC<ModalProps> = ({ children, wrapperClasses, id, shown }) => {
	const [isOpen, setToggle] = useState(false);
	
	useEffect(() => {
		const handleModalOpen = (data: any) => {
			if (data.id === id) {
				setToggle(true);
				shown(data);
			}
		};
		
		bus.on('modalOpen', handleModalOpen);
	}, [id]);
	
	bus.on('modalClose', () => setToggle(false));
	
	return (
		<AnimatePresence>
			{isOpen ?
				<motion.div exit={{ opacity: 0, scale: 1.05 }}
				            initial={{ opacity: 0, scale: 0.95 }}
				            animate={{ opacity: 1, scale: 1 }}
				            id={id}
				            className={'fixed w-screen flex items-center justify-center h-screen bg-gray-800/80 backdrop-blur-sm inset-0 !z-[10000]'}>
					<div className={`max-w-md bg-white aspect-square rounded-xl ${wrapperClasses}`}>
						<OutsideClickHandler onOutsideClick={() => setToggle(false)}>
							{children}
						</OutsideClickHandler>
					</div>
				</motion.div>
				: null}
		</AnimatePresence>
	);
};

export default Modal;