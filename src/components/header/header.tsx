import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './header.scss';
import { Sidebar } from 'components/sidebar';
import { store } from 'redux/store';
import { HeaderProps } from './interfaces';
import logo from '../../assets/logo.svg';

export const Header = (props: HeaderProps) => {
    const [isMenuOpen, toggleMenu] = useState(false);

    const menu = useRef<HTMLInputElement>(null);
    const button = useRef<HTMLButtonElement>(null);
    document.addEventListener('click', (e: any) => {
        if (!menu?.current?.contains(e.target) && !button?.current?.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // useEffect(() => {
    //     const root = document.getElementById('root')!;
    //     if (isMenuOpen) {
    //         root.classList.add('block-scroll');
    //     }
    //     else {
    //         root.classList.remove('block-scroll');
    //     }
    // }, [isMenuOpen]);

    return (
        <div className={classNames('header', { 'visible': isMenuOpen })}>
            <NavLink className='logo' to='books/all'><img src={logo} alt='Logo' /></NavLink>
            <button data-test-id='button-burger' aria-label='menu' type='button' ref={button} onClick={() => {
                toggleMenu(!isMenuOpen);
            }} className='menu-button'>
                <div />
                <div />
                <div />
            </button>
            <div className='header-right-part'>
                <h1>Библиотека</h1>
                <div className='header-user'>
                    <span>Привет, {props.username}!</span>
                    <img src={props.imgLink} alt='Avatar' />
                </div>
            </div>
            <div data-test-id='burger-navigation' className='nav-menu' ref={menu}>
                <div className='nav-menu-container'>
                    <Sidebar store={store} isBurger={true} />
                </div>
                <div className='hr' />
                <div className='nav-menu-container bottom-buttons'>
                    <NavLink to='../profile' className='docs-link'><p>Профиль</p><div className='hr' /></NavLink>
                    <NavLink to='../profile' className='docs-link'><p>Выход</p><div className='hr' /></NavLink>
                </div>
            </div>
        </div>
    )
};
