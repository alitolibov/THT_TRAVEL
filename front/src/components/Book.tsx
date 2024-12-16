import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { InputMask } from '@react-input/mask';
import { useService } from '@/composables/useService';
import { getErrorPathAndMsg } from '@/utils';
import { bus } from '@/utils/bus';

type FormData = {
    name: string;
    phone: string;
    email: string;
};

interface BookProps {
    tourName: string;
}


const Book: React.FC<BookProps> = ({ tourName }) => {
    const { t } = useTranslation('common');
    const service = useService('bot/send-application');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const {
        handleSubmit,
        reset,
        register
    } = useForm<FormData>({ criteriaMode: 'all' });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setErrors({});

        const sendData = {
            name: data.name,
            phone: data.phone,
            email: data.email,
            tourName,
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
        <>
            <motion.form onSubmit={handleSubmit(onSubmit)}
                         className={'space-y-3.5 w-full px-4 py-5 bg-[var(--main-color)] lg:border-[var(--main-color-two)] lg:border lg:rounded-xl'}>
                <h1 className="font-semibold text-lg text-white md:text-xl">{t('dynamicPage.bookForm.title')}</h1>
                <p className="text-xs text-white md:text-sm">{t('dynamicPage.bookForm.leaveRequest')}</p>
                <div>
                    <p className={'text-sm text-white md:text-base mb-2'}>{t('dynamicPage.bookForm.name')}</p>
                    <input
                        {...register('name')}
                        className={'py-1.5 px-2 w-full bg-transparent border border-white text-sm text-white md:text-base rounded-lg'}
                    />
                    {errors?.name && <p className={'text-xs text-red-700 md:text-sm mt-1'}>{errors?.name}</p>}
                </div>
                <div>
                    <p className={'text-sm text-white md:text-base mb-2'}>{t('dynamicPage.bookForm.tel')}</p>
                    <InputMask
                        {...register('phone')}
                        mask="+998 (__) ___-__-__" replacement={{ _: /\d/ }}
                        className={'py-1.5 px-2 w-full bg-transparent border border-white text-sm text-white md:text-base rounded-lg'} />
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
                        className={'py-1.5 px-2 w-full bg-transparent border border-white text-sm text-white md:text-base rounded-lg'}
                    />
                    {errors?.email && (
                        <p className={'text-xs text-red-700 md:text-sm mt-1'}>{errors?.email}</p>
                    )}
                </div>
                <button type={'submit'}
                        className="rounded-3xl duration-300 w-full py-1.5 text-white bg-[var(--main-color-two)] font-medium lg:hover:brightness-[.8]">{t('dynamicPage.bookForm.btnBook')}
                </button>
            </motion.form>
        </>
    );
};

export default Book;
