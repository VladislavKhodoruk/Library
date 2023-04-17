import classNames from 'classnames';
import { Loader } from 'components/loader';
import { SubmitButton } from 'components/submit-button';
import { LoadingStatus } from 'entities/enums';
import { loginValidator, passwordValidator } from 'entities/helpers';
import { useAppDispatch, useAppSelector } from 'entities/hooks';
import { AuthorizationRequest } from 'entities/interfaces';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { authorize, setDefaultErrorMessage, setDefaultErrorStatusCode, setDefaultLoadingStatus } from 'store/authorization-page-slice';
import { ReactComponent as CheckIcon } from '../../assets/checkIcon.svg';
import { ReactComponent as ClosedEyeIcon } from '../../assets/closedEyeIcon.svg';
import { ReactComponent as OpenedEyeIcon } from '../../assets/openedEyeIcon.svg';
import { ReactComponent as ChevronIcon } from '../../assets/chevronIcon.svg';

import './authorization-page.scss';

interface IFormInputs {
    login: string;
    password: string;
}

export const AuthorizationPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [firstInputOnFocus, setFirstInputOnFocus] = useState(false);
    const [secondInputOnFocus, setSecondInputOnFocus] = useState(false);
    const { register, getValues, resetField, formState: { errors }, handleSubmit } = useForm<IFormInputs>({ criteriaMode: "all", mode: "all" })
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const $loadingStatus = useAppSelector((state) => state.authorizationPage.loadingStatus);
    const $errorMessage = useAppSelector((state) => state.authorizationPage.errorMessage);
    const $errorStatusCode = useAppSelector((state) => state.authorizationPage.errorStatusCode);

    const authorization = () => {
        const body: AuthorizationRequest = {
            identifier: getValues().login,
            password: getValues().password,
        };
        dispatch(authorize(body));
    }

    const resetForm = () => {
        resetField('login');
        resetField('password');
    }

    const resetPage = () => {
        dispatch(setDefaultLoadingStatus());
        dispatch(setDefaultErrorStatusCode());
        dispatch(setDefaultErrorMessage());
        resetForm();
    }

    useEffect(() => {
        if ($loadingStatus === LoadingStatus.Loaded) {
            navigate('../books/all');
        }
    }, [$loadingStatus, navigate]);

    useEffect(() => {
        return () => {
            dispatch(setDefaultLoadingStatus());
        }
    }, [dispatch])

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
            $errorMessage && $errorStatusCode !== 400 ?
                <div className="error-window">
                    <h1>Вход не выполнен</h1>
                    <p>{$errorMessage}</p>
                    <button onClick={() => resetPage()} className="error-window-button" type='button'>Повторить</button>
                </div>
                :
                <div className='authorization-page'>
                    <form onSubmit={handleSubmit(authorization)}>
                        <div className="authorization-page-top">
                            <h1 className="authorization-page-top-header">
                                Вход в личный кабинет
                            </h1>
                        </div>
                        <div className="authorization-page-middle">
                            <div className="authorization-page-middle-field">
                                <div className={classNames("authorization-page-middle-field-input-container", { 'error': errors.login?.message || $errorStatusCode === 400 })}>
                                    <input
                                        placeholder="Логин"
                                        {...register("login", {
                                            required: "Поле не может быть пустым",
                                            validate: loginValidator
                                        })}
                                        onFocus={() => setFirstInputOnFocus(true)}
                                        onBlur={() => setFirstInputOnFocus(false)}
                                    />
                                    <span>Логин</span>
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
                            <div className="authorization-page-middle-field">
                                <div className={classNames("authorization-page-middle-field-input-container", { 'error': errors.password?.message || $errorStatusCode === 400 })}>
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
                                    <div className="authorization-page-middle-field-input-container-icons">
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
                                {$errorStatusCode === 400 ?
                                    <div className='authorization-page-middle-tip'>
                                        <span className='highlighted'> Неверный логин или пароль!</span>
                                        <NavLink to='../forgot-pass'>Восстановить?</NavLink>
                                    </div>
                                    : null}
                            </div>
                        </div>
                        <div className="authorization-page-bottom">
                            <SubmitButton text="Вход" disable={!!(errors.login?.message || errors.password?.message)} />
                            <div className="authorization-page-bottom-text">
                                <p>Нет учётной записи?</p>
                                <NavLink to="../registration">Регистрация <ChevronIcon /></NavLink>
                            </div>
                        </div>
                    </form>
                </div>}
        </div>
    )
};
