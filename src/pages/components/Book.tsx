import React, {useEffect} from 'react';
import {useForm, Controller} from "react-hook-form";
import 'intl-tel-input/build/css/intlTelInput.css';
import 'intl-tel-input/build/js/intlTelInput.js';
import intlTelInput from 'intl-tel-input';
import {motion} from "framer-motion";

const Book = () => {
    let iti:any
    let numbers = '';
    let error: string = ''
    const errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
    const {handleSubmit, formState: {errors}, control} = useForm();
    const onSubmit = (data: object) => {
        console.log({data});
    };
    useEffect(() => {
        const input = document.querySelector("#telephone");
        iti = intlTelInput(input, {
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.min.js",
            preferredCountries: ["ru", "us", "es"]
        })
    })

    const validatePhoneNumber = () => {
        if (!iti.isValidNumber()) {
            const errorCode = iti.getValidationError();
            if(errorCode === -99) {
                console.log('error')
                error = 'error';
            } else {
                console.log(errorMap[errorCode])
                error = errorMap[errorCode];
            }
            return false;
        } else {
            numbers = iti.getNumber();
            return numbers;
        };
    }
    return (
        <motion.div className={`w-full px-4 py-5 bg-[var(--main-color)]`}>
            <div className="flex items-center justify-between w-full">
                <p className="text-xs text-[var(--main-color-two)] md:text-sm">From:<span
                    className='text-sm md:text-base ml-2 font-semibold text-white'>6000000 UZS</span></p>
                <p className="font-semibold text-sm text-white md:text-lg">ЧУДЕСА
                    ГРУЗИИ</p>
            </div>
            <div className={'w-full border-white border-dashed border-t my-5'}></div>
            <form onSubmit={handleSubmit(onSubmit)} className={'space-y-3.5'}>
                <h1 className="font-semibold text-lg text-white md:text-xl">Забронировать тур</h1>
                <p className='text-xs text-white md:text-sm'>Оставьте заявку и наш менеджер свяжется с вами</p>
                <div>
                    <p className={'text-sm text-white md:text-base mb-2'}>Name</p>
                    <input
                        className={'py-1.5 px-2 w-full bg-transparent border border-white text-sm text-white md:text-base rounded-lg'}/>
                </div>
                <div>
                    <p className={'text-sm text-white md:text-base mb-2'}>Tel</p>
                    <Controller
                        name="tel"
                        control={control}
                        rules={{
                            validate: (value) => validatePhoneNumber()
                        }}
                        render={({ field: { onChange, value } }) => (
                            <input
                                id={'telephone'}
                                className={'py-1.5 px-2 w-full bg-transparent border border-white text-sm text-white md:text-base rounded-lg'}/>
                        )}
                    />
                    {errors["telephone"] && (
                        <p className="text-red-700">{error}</p>
                    )}
                </div>
                <div>
                    <p className={'text-sm text-white md:text-base mb-2'}>Email</p>
                    <input
                        className={'py-1.5 px-2 w-full bg-transparent border border-white text-sm text-white md:text-base rounded-lg'}/>

                </div>
                <button className='rounded-3xl w-full py-1.5 text-white bg-[var(--main-color-two)] font-medium'>Book
                </button>
            </form>
        </motion.div>
    );
};

export default Book;