import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchCategories } from 'store/sidebar-slice';
import { useAppDispatch, useAppSelector } from 'entities/hooks';
import { Card, Category } from 'entities/interfaces';
import { ReactComponent as ArrowIcon } from '../../assets/arrowIcon.svg';

import './sidebar.scss';

export const Sidebar = (props: { isBurger?: boolean, linkIsCliсked?: (e: React.ChangeEvent<HTMLInputElement>) => void; }) => {
    const [menuIsOpened, setMenuView] = useState(true);

    const dispatch = useAppDispatch();
    const $categories: Category[] = useAppSelector((state) => state.sidebar.categories);
    const $allBooks: Card[] = useAppSelector((state) => state.mainPage.books);

    useEffect(() => {
        if (!$categories.length) {
            dispatch(fetchCategories());
        }
    }, [dispatch, $categories]);

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (event.currentTarget.classList.contains('active')) {
            setMenuView(!menuIsOpened);
            event.preventDefault();
        }
        else
            setMenuView(false);
    }

    return (
        <div className='sidebar'>
            <div className="sidebar-item">
                <NavLink data-test-id={props.isBurger ? 'burger-showcase' : 'navigation-showcase'} id='sidebar-arrow' className={({ isActive }) =>
                    `docs-link ' ${(isActive ? 'active' : 'non-active')}`
                } onClick={(event) => {
                    handleClick(event)
                }} to='books'><div><p>Витрина книг</p><ArrowIcon className={classnames('icon', { 'icon-reversed': menuIsOpened }, { 'hide': !$categories.length })} /></div><div className='hr' /></NavLink>
                {$categories.length ?
                    <ul className={classnames('ul', { 'show-menu': menuIsOpened })}>
                        <li>
                            <NavLink
                                onClick={(e: any) => props.linkIsCliсked ? props.linkIsCliсked(e) : null}
                                data-test-id={props.isBurger ? 'burger-books' : 'navigation-books'}
                                to='books/all'>
                                <span>
                                    Все книги
                                </span>
                            </NavLink>
                        </li>
                        {$categories.map((category: Category) =>
                            <li key={category.id}>
                                <NavLink
                                    onClick={(e: any) => props.linkIsCliсked ? props.linkIsCliсked(e) : null}
                                    to={`books/${category.path}`}>
                                    <span data-test-id={props.isBurger ? `burger-${category.path}` : `navigation-${category.path}`}>{category.name}</span>
                                    <span data-test-id={props.isBurger ? `burger-book-count-for-${category.path}` : `navigation-book-count-for-${category.path}`}>
                                        {$allBooks.filter((book) => book.categories?.includes(category.name)).length}
                                    </span>
                                </NavLink>

                            </li>)}
                    </ul>
                    :
                    null}
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
