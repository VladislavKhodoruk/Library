import classnames from 'classnames';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Genres } from './enums';
import { ReactComponent as ArrowIcon } from '../../assets/arrowIcon.svg';
import './sidebar.scss';

export const Sidebar = (props: { store: any, isBurger?: boolean }) => {
    const [menuIsOpened, setMenuView] = useState(true);

    return (
        <div className='sidebar'>
            <div className="sidebar-item">
                <NavLink data-test-id={props.isBurger ? 'burger-showcase' : 'navigation-showcase'} id='sidebar-arrow' className={({ isActive }) =>
                    `docs-link ' ${(isActive ? 'active' : 'non-active')}`
                } onClick={() => { setMenuView(!menuIsOpened) }} to='books'><div><p>Витрина книг</p><ArrowIcon className={classnames('icon', { 'icon-reversed': menuIsOpened })} /></div><div className='hr' /></NavLink>
                <ul className={menuIsOpened ? 'show-menu' : ''}>
                    <li><NavLink onClick={() => { setMenuView(false) }} data-test-id={props.isBurger ? 'burger-books' : 'navigation-books'} to='books/all'><span>Все книги</span></NavLink></li>
                    {props.store.booksData.map((el: any, index: number) => <li><NavLink onClick={() => { setMenuView(false) }} to={`books/${el.genreName}`}><span>{Genres[el.genreName as keyof typeof Genres]}</span><span>{el.books.length}</span></NavLink></li>)}
                </ul>
            </div>
            <div className="sidebar-item">
                <NavLink data-test-id={props.isBurger ? 'burger-terms' : 'navigation-terms'} to='../terms' className='docs-link' onClick={() => { setMenuView(false) }}><p>Правила пользования</p><div className='hr' /></NavLink>
            </div>
            <div className="sidebar-item">
                <NavLink data-test-id={props.isBurger ? 'burger-contract' : 'navigation-contract'} to='../pact' className='docs-link' onClick={() => { setMenuView(false) }}><p>Договор оферты</p><div className='hr' /></NavLink>
            </div>
        </div>
    )
};

Sidebar.defaultProps = { isBurger: false };
