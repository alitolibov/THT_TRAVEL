import React, { useContext, useState } from 'react';
import Modal from '@/components/common/Modal';
import { InputMask } from '@react-input/mask';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getErrorPathAndMsg } from '@/utils';
import { useService } from '@/composables/useService';
import { useTranslation } from 'next-i18next';
import { ModalContext } from '@/contexts/modal.context';
import { bus } from '@/utils/bus';

type FormData = {
	name: string;
	phone: string;
	email: string;
};


const VisaApplicationModal: React.FC = () => {
	const [errors, setErrors] = useState<Record<string, string>>({});
	const { t } = useTranslation('common');
	const service = useService('bot/send-application');
	const dataModal = useContext(ModalContext);
	const {
		handleSubmit,
		reset,
		register
	} = useForm<FormData>({ criteriaMode: 'all' });
	
	const onSubmit: SubmitHandler<FormData> = async (data) => {
		setErrors({});
		
		console.log('visaName', dataModal?.visaName);
		const sendData = {
			name: data.name,
			phone: data.phone,
			email: data.email,
			visaName: dataModal?.visaName
		};
		
		try {
			await service.create(sendData);
			bus.emit('toastOpen', {type: 'success', message: t('toast')});
			reset();
		} catch (e: any) {
			const newErrors: Record<string, string> = {};
			
			for (let error of e.message) {
				const { firstWord, msg } = getErrorPathAndMsg(error);
				newErrors[firstWord] = t(`dynamicPage.bookForm.${msg}`);
			}
			
			setErrors(newErrors);
		}
	};
	
	return (
		<Modal id={'visaApplicationModal'} wrapperClasses={'w-5/6 sm:w-2/3 md:w-1/2 px-3 py-5'}>
			<form onSubmit={handleSubmit(onSubmit)}
			      className={'space-y-3.5'}>
				<h4 className={'text-center font-medium sm:text-lg'}>{t('vises.bookTitle')}</h4>
				<p className={'text-center text-xs sm:text-sm'}>{t('vises.description')}</p>
				<div>
					<p className={'text-sm text-white md:text-base mb-2'}>{t('dynamicPage.bookForm.name')}</p>
					<input
						{...register('name')}
						className={'py-1.5 px-2 w-full bg-transparent border border-[var(--main-color-two)] text-sm md:text-base rounded-lg'}
					/>
					{errors?.name && <p className={'text-xs text-red-700 md:text-sm mt-1'}>{errors?.name}</p>}
				</div>
				<div>
					<p className={'text-sm text-white md:text-base mb-2'}>{t('dynamicPage.bookForm.tel')}</p>
					<InputMask
						{...register('phone')}
						mask="+998 (__) ___-__-__" replacement={{ _: /\d/ }}
						className={'py-1.5 px-2 w-full bg-transparent border border-[var(--main-color-two)] text-sm md:text-base rounded-lg'} />
					{errors?.phone && (
						<p className={'text-xs text-red-700 md:text-sm mt-1'}>
							{errors?.phone ? errors?.phone : t('dynamicPage.bookForm.errorTel')}
						</p>
					)}
				</div>
				<div>
					<p className={'text-sm text-white md:text-base mb-2'}>{t('dynamicPage.bookForm.email')}</p>
					<input
						{...register('email')}
						className={'py-1.5 px-2 w-full bg-transparent border border-[var(--main-color-two)] text-sm md:text-base rounded-lg'}
					/>
					{errors?.email && (
						<p className={'text-xs text-red-700 md:text-sm mt-1'}>{errors?.email}</p>
					)}
				</div>
				<button type={'submit'}
				        className="rounded-3xl duration-300 w-full py-2 text-white bg-[var(--main-color-two)] font-medium lg:hover:brightness-[.8]">{t('vises.bookBtn')}
				</button>
			</form>
		</Modal>
	);
};

export default VisaApplicationModal;