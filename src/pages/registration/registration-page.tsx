
import classNames from "classnames";
import { SubmitButton } from "components/submit-button";
import { useAppDispatch, useAppSelector } from "entities/hooks";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { RegistrationRequest } from "entities/interfaces";
import { LoadingStatus } from "entities/enums";
import { Loader } from "components/loader";
import { registerUser, setDefaultErrorMessage, setDefaultErrorStatusCode, setDefaultLoadingStatus } from "store/registration-page-slice";
import { loginValidator, passwordValidator } from "entities/helpers";
import { ReactComponent as CheckIcon } from '../../assets/checkIcon.svg';
import { ReactComponent as ClosedEyeIcon } from '../../assets/closedEyeIcon.svg';
import { ReactComponent as OpenedEyeIcon } from '../../assets/openedEyeIcon.svg';
import { ReactComponent as ChevronIcon } from '../../assets/chevronIcon.svg';

import './registration-page.scss';

interface IFormInputs {
    login: string;
    password: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
}

export const RegistrationPage = () => {
    const [step, setStep] = useState(1);
    const [firstInputOnFocus, setFirstInputOnFocus] = useState(false);
    const [secondInputOnFocus, setSecondInputOnFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { register, getValues, resetField, formState: { errors }, handleSubmit } = useForm<IFormInputs>({ criteriaMode: "all", mode: "all" })
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const $loadingStatus = useAppSelector((state) => state.registrationPage.loadingStatus);
    const $errorStatusCode = useAppSelector((state) => state.registrationPage.errorStatusCode);
    const $errorMessage = useAppSelector((state) => state.registrationPage.errorMessage);

    useEffect(() => {
        if ($loadingStatus === LoadingStatus.Loaded) {
            navigate('../auth');
        }
    }, [$loadingStatus, navigate]);

    useEffect(() => {
        return () => {
            dispatch(setDefaultLoadingStatus());
        }
    }, [dispatch])

    const toNextStep: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
        setStep(step + 1);
    };

    const resetForm = () => {
        resetField('email');
        resetField('login');
        resetField('name');
        resetField('password');
        resetField('phone');
        resetField('surname');
    }

    const registration = () => {
        const body: RegistrationRequest = {
            email: getValues().email,
            username: getValues().login,
            password: getValues().password,
            firstName: getValues().name,
            lastName: getValues().surname,
            phone: getValues().phone,
        };
        dispatch(registerUser(body));
    }

    const resetPage = () => {
        if ($errorStatusCode === 400) {
            dispatch(setDefaultLoadingStatus());
            dispatch(setDefaultErrorStatusCode());
            dispatch(setDefaultErrorMessage());
            setStep(1);
            resetForm();
        }
        else {
            registration();
        }
    }

    const highlighted = (error: string, text: string) => {
        const words = error.split(/\s/);
        const pattern = new RegExp((`${words.join('|')}`), 'g');

        return (
            <span
                dangerouslySetInnerHTML={{
                    __html: text.replace(pattern, (match) => `<span class='highlighted'>${match}</span>`),
                }}
            />
        );
    };

    return (
        <div>{$loadingStatus === LoadingStatus.Loading ?
            <Loader /> :
            $errorMessage ?
                <div className="error-window">
                    <h1>Данные не сохранились</h1>
                    <p>{$errorMessage}</p>
                    <button onClick={() => resetPage()} className="error-window-button" type='button'>{$errorStatusCode === 400 ? 'Назад к регистрации' : 'Повторить'}</button>
                </div>
                :
                <div className="registration-page">
                    {step === 1 &&
                        <form onSubmit={handleSubmit(toNextStep)}>
                            <div className="registration-page-top">
                                <h1 className="registration-page-top-header">
                                    Регистрация
                                </h1>
                                <p className="registration-page-top-step">
                                    {step} шаг из 3
                                </p>
                            </div>
                            <div className="registration-page-middle">
                                <div className="registration-page-middle-field">
                                    <div className={classNames("registration-page-middle-field-input-container", { 'error': errors.login?.message })}>
                                        <input
                                            placeholder="Придумайте логин для входа"
                                            {...register("login", {
                                                required: "Поле не может быть пустым",
                                                validate: loginValidator
                                            })}
                                            onFocus={() => setFirstInputOnFocus(true)}
                                            onBlur={() => setFirstInputOnFocus(false)}
                                        />
                                        <span>Придумайте логин для входа</span>
                                    </div>
                                    <div className={classNames('tip', { 'highlighted': !firstInputOnFocus })}>
                                        {errors.login?.message ?
                                            errors.login.type === 'required' ?
                                                <p>Используйте для логина латинский алфавит и цифры</p>
                                                :
                                                <p>{highlighted(errors.login.message, 'Используйте для логина латинский алфавит и цифры')}</p> :
                                            <p>Используйте для логина латинский алфавит и цифры</p>}
                                    </div>
                                </div>
                                <div className="registration-page-middle-field">
                                    <div className={classNames("registration-page-middle-field-input-container", { 'error': errors.password?.message })}>
                                        <input
                                            placeholder="Пароль"
                                            type={showPassword ? "" : "password"}
                                            {...register("password", {
                                                required: "Поле не может быть пустым",
                                                validate: passwordValidator,
                                            })}
                                            onFocus={() => setSecondInputOnFocus(true)}
                                            onBlur={() => setSecondInputOnFocus(false)}
                                        />
                                        <span>Пароль</span>
                                        <div className="registration-page-middle-field-input-container-icons">
                                            <div className={classNames('check-icon', { 'visible': getValues().password && !errors?.password?.types })} >
                                                <CheckIcon />
                                            </div>
                                            <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <OpenedEyeIcon /> : <ClosedEyeIcon />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className={classNames('tip', { 'highlighted': !secondInputOnFocus })}>
                                        {errors.password?.message ?
                                            errors.password.type === 'required' ?
                                                <p>Пароль не менее 8 символов, с заглавной буквой и цифрой</p>
                                                :
                                                <p>{highlighted(errors.password?.message, 'Пароль не менее 8 символов, с заглавной буквой и цифрой')}</p> :
                                            <p>Пароль не менее 8 символов, с заглавной буквой и цифрой</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="registration-page-bottom">
                                <SubmitButton text="Следующий шаг" disable={!!(errors.login?.message || errors.password?.message)} />
                                <div className="registration-page-bottom-text">
                                    <p>Есть учётная запись?</p>
                                    <NavLink to="../auth">Войти</NavLink>
                                </div>
                            </div>
                        </form>
                    }
                    {step === 2 &&
                        <form onSubmit={handleSubmit(toNextStep)}>
                            <div className="registration-page-top">
                                <h1 className="registration-page-top-header">
                                    Регистрация
                                </h1>
                                <p className="registration-page-top-step">
                                    {step} шаг из 3
                                </p>
                            </div>
                            <div className="registration-page-middle">
                                <div className="registration-page-middle-field">
                                    <div className={classNames("registration-page-middle-field-input-container", { 'error': errors.name?.message })}>
                                        <input
                                            placeholder="Имя"
                                            {...register("name", {
                                                required: "Поле не должно быть пустым",
                                            })}
                                            onFocus={() => setFirstInputOnFocus(true)}
                                            onBlur={() => setFirstInputOnFocus(false)}
                                        />
                                        <span>Имя</span>
                                    </div>
                                    <div className={classNames('tip', { 'highlighted': !firstInputOnFocus })}>
                                        {errors.name?.message ?
                                            errors.name.message :
                                            null}
                                    </div>
                                </div>
                                <div className="registration-page-middle-field">
                                    <div className={classNames("registration-page-middle-field-input-container", { 'error': errors.surname?.message })}>
                                        <input
                                            placeholder="Фамилия"
                                            {...register("surname", {
                                                required: "Поле не должно быть пустым",
                                            })}
                                            onFocus={() => setSecondInputOnFocus(true)}
                                            onBlur={() => setSecondInputOnFocus(false)}
                                        />
                                        <span>Фамилия</span>
                                    </div>
                                    <div className={classNames('tip', { 'highlighted': !secondInputOnFocus })}>
                                        {errors.surname?.message ?
                                            errors.surname.message :
                                            null}
                                    </div>
                                </div>
                            </div>
                            <div className="registration-page-bottom">
                                <SubmitButton text="Последний шаг" disable={!!(errors.name?.message || errors.surname?.message)} />
                                <div className="registration-page-bottom-text">
                                    <p>Есть учётная запись?</p>
                                    <NavLink to="../auth">Войти</NavLink>
                                </div>
                            </div>
                        </form>
                    }
                    {step === 3 &&
                        <form onSubmit={handleSubmit(registration)}>
                            <div className="registration-page-top">
                                <h1 className="registration-page-top-header">
                                    Регистрация
                                </h1>
                                <p className="registration-page-top-step">
                                    {step} шаг из 3
                                </p>
                            </div>
                            <div className="registration-page-middle">
                                <div className="registration-page-middle-field">
                                    <div className={classNames("registration-page-middle-field-input-container", { 'error': errors.name?.message })}>
                                        <input
                                            placeholder="Номер телефона"
                                            {...register("phone")}
                                            onFocus={() => setFirstInputOnFocus(true)}
                                            onBlur={() => setFirstInputOnFocus(false)}
                                        />
                                        <span>Номер телефона</span>
                                    </div>
                                    {errors.phone?.message ?
                                        highlighted(errors.phone.message, 'В формате +375 (xx) xxx-xx-xx') :
                                        <p>В формате +375 (xx) xxx-xx-xx</p>}
                                </div>
                                <div className="registration-page-middle-field">
                                    <div className={classNames("registration-page-middle-field-input-container", { 'error': errors.email?.message })}>
                                        <input
                                            placeholder="E-mail"
                                            {...register("email", {
                                                required: "Поле не может быть пустым",
                                                validate: (value) => /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,8})+$/.test(value) || 'Введите корректный e-mail',
                                            })}
                                            onFocus={() => setSecondInputOnFocus(true)}
                                            onBlur={() => setSecondInputOnFocus(false)}
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
                            <div className="registration-page-bottom">
                                <SubmitButton text="Зарегистрироваться" disable={!!(errors.email?.message)} />
                                <div className="registration-page-bottom-text">
                                    <p>Есть учётная запись?</p>
                                    <NavLink to="../auth">Войти<ChevronIcon /></NavLink>
                                </div>
                            </div>
                        </form>
                    }
                </div>
        }</div>
    )
};
