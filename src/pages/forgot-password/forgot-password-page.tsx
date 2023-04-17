import classNames from 'classnames';
import { SubmitButton } from 'components/submit-button';
import { useAppDispatch, useAppSelector } from 'entities/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { ReactComponent as ChevronIcon } from '../../assets/chevronIcon.svg';

import './forgot-password-page.scss';

interface IFormInputs {
    email: string;
}

export const ForgotPasswordPage = () => {
    const [inputOnFocus, setInputOnFocus] = useState(false);
    const { register, getValues, resetField, formState: { errors }, handleSubmit } = useForm<IFormInputs>({ criteriaMode: "all", mode: "all" })
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const $loadingStatus = useAppSelector((state) => state.authorizationPage.loadingStatus);
    const $errorMessage = useAppSelector((state) => state.authorizationPage.errorMessage);
    const $errorStatusCode = useAppSelector((state) => state.authorizationPage.errorStatusCode);

    const resetForm = () => {
        resetField('email');
    }

    const onSubmit = () => {
        console.log('d');
    }
    return (
        <div className='forgot-password-page'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="authorization-page-top">
                    <h1 className="authorization-page-top-header">
                        Вход в личный кабинет
                    </h1>
                </div>
                <div className="authorization-page-middle">
                    <div className="registration-page-middle-field">
                        <div className={classNames("registration-page-middle-field-input-container", { 'error': errors.email?.message })}>
                            <input
                                placeholder="E-mail"
                                {...register("email", {
                                    required: "Поле не может быть пустым",
                                    validate: (value) => /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,8})+$/.test(value) || 'Введите корректный e-mail',
                                })}
                                onFocus={() => setInputOnFocus(true)}
                                onBlur={() => setInputOnFocus(false)}
                            />
                            <span>E-mail</span>
                        </div>
                        <div className={classNames('tip', 'highlighted')}>
                            {errors.email?.message ?
                                errors.email.message :
                                null}
                        </div>
                    </div>
                </div>
                <span>На это email будет отправлено письмо с инструкциями по восстановлению пароля</span>
                <div className="authorization-page-bottom">
                    <SubmitButton text="Восстановить" disable={!!(errors.email?.message)} />
                    <div className="authorization-page-bottom-text">
                        <p>Нет учётной записи?</p>
                        <NavLink to="../registration">Регистрация<ChevronIcon /></NavLink>
                    </div>
                </div>
            </form >
        </div>
    )
};
