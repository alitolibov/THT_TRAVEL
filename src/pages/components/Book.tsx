import React, {useEffect} from 'react';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {PhoneInput, usePhoneValidation} from 'react-international-phone';
import 'react-international-phone/style.css';
import {motion} from 'framer-motion';

type FormData = {
    name: string;
    tel: string;
    email: string;
};

const Book: React.FC = () => {
    const {
        handleSubmit,
        setError,
        register,
        formState: {errors},
        control,
    } = useForm<FormData>({criteriaMode: 'all'});

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log({data});
    };

    const handleValidate = (value: string) => {
        const isValid = usePhoneValidation(value);
        return isValid.isValid;
    };

    return (
            <motion.form onSubmit={handleSubmit(onSubmit)} className={'space-y-3.5 w-full px-4 py-5 bg-[var(--main-color)] lg:border-[var(--main-color-two)] lg:border lg:rounded-xl'}>
                <h1 className="font-semibold text-lg text-white md:text-xl">Забронировать тур</h1>
                <p className="text-xs text-white md:text-sm">Оставьте заявку и наш менеджер свяжется с вами</p>
                <div>
                    <p className={'text-sm text-white md:text-base mb-2'}>Name</p>
                    <input
                        {...register('name', {
                            required: 'this field required',
                            minLength: {value: 3, message: 'this 3 characters'},
                        })}
                        className={`py-1.5 px-2 w-full bg-transparent border border-white text-sm text-white md:text-base rounded-lg`}
                    />
                    {errors?.name && <p className={'text-xs text-red-700 md:text-sm mt-1'}>{errors?.name.message}</p>}
                </div>
                <div>
                    <p className={'text-sm text-white md:text-base mb-2'}>Tel</p>
                    <Controller
                        name="tel"
                        control={control}
                        rules={{
                            required: 'this field is required',
                            validate: (value) => handleValidate(value),
                        }}
                        render={({field: {onChange, value}}) => (
                            <PhoneInput defaultCountry="uz" value={value} onChange={onChange}/>
                        )}
                    />
                    {errors?.tel && (
                        <p className={'text-xs text-red-700 md:text-sm mt-1'}>
                            {errors?.tel.message ? errors?.tel.message : 'Invalid Phone'}
                        </p>
                    )}
                </div>
                <div>
                    <p className={'text-sm text-white md:text-base mb-2'}>Email</p>
                    <input
                        {...register('email', {
                            required: 'this field required',
                            pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'invalid email'},
                        })}
                        className={'py-1.5 px-2 w-full bg-transparent border border-white text-sm text-white md:text-base rounded-lg'}
                    />
                    {errors?.email && (
                        <p className={'text-xs text-red-700 md:text-sm mt-1'}>{errors?.email.message}</p>
                    )}
                </div>
                <button className='rounded-3xl w-full py-1.5 text-white bg-[var(--main-color-two)] font-medium lg:hover:brightness-[.8]'>Book
                </button>
            </motion.form>
    );
};

export default Book;
