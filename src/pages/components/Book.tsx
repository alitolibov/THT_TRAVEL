import React, {useState} from 'react';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {PhoneInput, usePhoneValidation} from 'react-international-phone';
import 'react-international-phone/style.css';
import {motion} from 'framer-motion';
import {useTranslation} from "next-i18next";
import ButtonBook from "@/pages/components/ButtonBook";

type FormData = {
    name: string;
    tel: string;
    email: string;
};

const Book: React.FC = () => {
    const {t} = useTranslation()
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    const {
        handleSubmit,
        register,
        formState: {errors},
        control,
    } = useForm<FormData>({criteriaMode: 'all'});

    const onSubmit: SubmitHandler<FormData> = (data) => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            console.log({data});
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 2000)
        }, 1000)
    };

    const HandleValidate = (value: string) => {
        const isValid = usePhoneValidation(value);
        return isValid.isValid;
    };

    return (
            <motion.form onSubmit={handleSubmit(onSubmit)} className={'space-y-3.5 w-full px-4 py-5 bg-[var(--main-color)] lg:border-[var(--main-color-two)] lg:border lg:rounded-xl'}>
                <h1 className="font-semibold text-lg text-white md:text-xl">{t('dynamicPage.bookForm.title')}</h1>
                <p className="text-xs text-white md:text-sm">{t('dynamicPage.bookForm.leaveRequest')}</p>
                <div>
                    <p className={'text-sm text-white md:text-base mb-2'}>{t('dynamicPage.bookForm.name')}</p>
                    <input
                        {...register('name', {
                            required: t('dynamicPage.bookForm.required'),
                            minLength: {value: 3, message: t('dynamicPage.bookForm.errorName')},
                        })}
                        className={`py-1.5 px-2 w-full bg-transparent border border-white text-sm text-white md:text-base rounded-lg`}
                    />
                    {errors?.name && <p className={'text-xs text-red-700 md:text-sm mt-1'}>{errors?.name.message}</p>}
                </div>
                <div>
                    <p className={'text-sm text-white md:text-base mb-2'}>{t('dynamicPage.bookForm.tel')}</p>
                    <Controller
                        name="tel"
                        control={control}
                        rules={{
                            required: t('dynamicPage.bookForm.required'),
                            validate: (value) => HandleValidate(value),
                        }}
                        render={({field: {onChange, value}}) => (
                            <PhoneInput defaultCountry="uz" value={value} onChange={onChange}/>
                        )}
                    />
                    {errors?.tel && (
                        <p className={'text-xs text-red-700 md:text-sm mt-1'}>
                            {errors?.tel.message ? errors?.tel.message : t('dynamicPage.bookForm.errorTel')}
                        </p>
                    )}
                </div>
                <div>
                    <p className={'text-sm text-white md:text-base mb-2'}>{t('dynamicPage.bookForm.email')}</p>
                    <input
                        {...register('email', {
                            required: t('dynamicPage.bookForm.required'),
                            pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: t('dynamicPage.bookForm.errorEmail')},
                        })}
                        className={'py-1.5 px-2 w-full bg-transparent border border-white text-sm text-white md:text-base rounded-lg'}
                    />
                    {errors?.email && (
                        <p className={'text-xs text-red-700 md:text-sm mt-1'}>{errors?.email.message}</p>
                    )}
                </div>
                <ButtonBook loading={loading} success={success}/>
            </motion.form>
    );
};

export default Book;
