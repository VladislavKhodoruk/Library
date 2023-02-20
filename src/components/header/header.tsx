import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Sidebar } from 'components/sidebar';

import logo from '../../assets/logo.svg';

import { HeaderProps } from './interfaces';

import './header.scss';

export const Header = (props: HeaderProps) => {
    const [isMenuOpen, toggleMenu] = useState(false);

    const menu = useRef<HTMLInputElement>(null);
    const button = useRef<HTMLButtonElement>(null);

    document.addEventListener('click', (e: any) => {
        if (!menu?.current?.contains(e.target) && !button?.current?.contains(e.target)) {
            toggleMenu(false);
        }
    });

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
                    <Sidebar isBurger={true} />
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
