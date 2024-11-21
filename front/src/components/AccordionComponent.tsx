import React, { useState } from 'react';
import { Icon } from '@iconify-icon/react';

interface AccordionComponentProps {
	title: string;
	desc: string;
}

const AccordionComponent: React.FC<AccordionComponentProps> = ({ title, desc }) => {
	
	const [isOpen, setToggle] = useState(false);
	
	return (
		<div onClick={() => setToggle(!isOpen)} className={'bg-[var(--main-color-two)] cursor-pointer rounded-lg overflow-hidden p-4'}>
			<div className={'flex items-center justify-between'}>
				<p className={'text-white font-semibold'}>{title}</p>
				<Icon icon="bytesize:chevron-bottom"
				      className={`text-white text-lg ${isOpen ? '-rotate-180' : 'rotate-0'} duration-300`} />
			</div>
			<p className={`duration-300 text-white ${isOpen ? 'h-fit overflow-visible mt-4' : 'h-0 overflow-hidden'}`}>{desc}</p>
		</div>
	);
};

export default AccordionComponent;