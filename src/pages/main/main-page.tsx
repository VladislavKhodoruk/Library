import { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Card as CardComponent } from 'components/card';
import { useAppDispatch, useAppSelector } from 'entities/hooks';
import { Card } from 'entities/interfaces';
import { fetchBooks, setFiltration } from 'store/main-page-slice';
import { ErrorText, LoadingStatus, ViewModes } from 'entities/enums';
import { SortDirection } from 'entities/types';
import { searchBooksByTitle, sortBooksByCategory, sortBooksByDirection } from 'entities/helpers';
import { Loader } from 'components/loader';
import { ToastContainer, toast } from 'react-toastify';

import { ReactComponent as ListIcon } from '../../assets/listIcon.svg';
import { ReactComponent as CrossIcon } from '../../assets/crossIcon.svg';
import { ReactComponent as SearchIcon } from '../../assets/searchIcon.svg';
import { ReactComponent as DescSortIcon } from '../../assets/descSortIcon.svg';
import { ReactComponent as AscSortIcon } from '../../assets/ascSortIcon.svg';
import { ReactComponent as TableIcon } from '../../assets/tableIcon.svg';

import './main-page.scss';

export const MainPage = () => {
    const dispatch = useAppDispatch();
    const $allBooks = useAppSelector((state) => state.mainPage.books);
    const $allBooksLoadingStatus = useAppSelector((state) => state.mainPage.loadingStatus);
    const $categoriesLoadingStatus = useAppSelector((state) => state.sidebar.loadingStatus);
    const $ascDescSorting = useAppSelector((state) => state.mainPage.filtration.sortDirection);
    const $categorySorting = useAppSelector((state) => state.mainPage.filtration.sortCategory);
    const $searchingText = useAppSelector((state) => state.mainPage.filtration.searchingText);

    const { category } = useParams();
    const [cardsViewMode, setCardsViewMode] = useState<ViewModes>(ViewModes.Table);
    const [inputView, setInputView] = useState<boolean>(true);
    const [inputIsNotDirty, setInputIsNotDirty] = useState<boolean>(true);
    const [inputValue, setInputValue] = useState<string>('');
    const [currentAscDescSorting, setCurrentAscDescSorting,] = useState<SortDirection>($ascDescSorting);
    const [books, setBooks] = useState<Card[]>($allBooks);
    const [errorText, setErrorText] = useState<ErrorText>(ErrorText.NoError);

    useEffect(() => {
        if ($allBooksLoadingStatus === LoadingStatus.Error || $categoriesLoadingStatus === LoadingStatus.Error) {
            toast.error(ErrorText.ApiError, { toastId: '1' });
        }
    }, [$allBooksLoadingStatus, $categoriesLoadingStatus]);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    useEffect(() => {
        dispatch(setFiltration({ sortDirection: currentAscDescSorting, sortCategory: category, searchingText: inputValue }));
    }, [currentAscDescSorting, category, inputValue, dispatch]);

    useEffect(() => {
        let filteredBooks: Card[];

        if ($allBooks.length) {
            const sortedBooksByDirection = sortBooksByDirection($allBooks, $ascDescSorting);
            const sortedBooksByCategory = sortBooksByCategory(sortedBooksByDirection, $categorySorting);
            filteredBooks = searchBooksByTitle(sortedBooksByCategory, $searchingText);
            setBooks(filteredBooks);

            if (filteredBooks.length) {
                setErrorText(ErrorText.NoError);
            }
            else if (!sortedBooksByCategory.length)
                setErrorText(ErrorText.CategoryError);
            else
                setErrorText(ErrorText.RequestError);
        }
    }, [$ascDescSorting, $categorySorting, $searchingText, $allBooks]);

    const closeButton = () => (
        <button type='button' aria-label='close'><CrossIcon /></button>
    )

    const onSortingClick = () => {
        if (currentAscDescSorting === 'asc') {
            setCurrentAscDescSorting('desc');
        }
        else {
            setCurrentAscDescSorting('asc');
        }
    }

    return (
        <div className='main'>
            {$allBooksLoadingStatus === LoadingStatus.Loading || $categoriesLoadingStatus === LoadingStatus.Loading ?
                <div data-test-id='loader'><Loader /></div> :
                <div className='main-page'>
                    <div data-test-id='error'>
                        <ToastContainer closeButton={closeButton}
                            position='top-center'
                            newestOnTop={false}
                            closeOnClick={true}
                            autoClose={false}
                            rtl={false} />
                    </div>
                    {$allBooks.length ?
                        <div className='books-container'>
                            <div className={classNames('topbar', { 'scaled': inputView })}>
                                <div className='topbar-left'>
                                    <div className='input-container'>
                                        <button
                                            data-test-id='button-search-open'
                                            type='button'
                                            className='search-button'
                                            onClick={() => { setInputView(false) }}>
                                            <SearchIcon className={classNames('search-icon', { 'non-active': inputIsNotDirty })} />
                                        </button>
                                        <input
                                            data-test-id='input-search'
                                            type='text'
                                            placeholder='Поиск книги или автора…'
                                            value={inputValue}
                                            onChange={(event) => { setInputValue(event.target.value) }}
                                            onClick={() => { setInputIsNotDirty(false) }}
                                            onBlur={() => { setInputIsNotDirty(true) }}
                                        />
                                        <button
                                            aria-label='close'
                                            data-test-id='button-search-close'
                                            type='button'
                                            className='close-button'
                                            onClick={() => { setInputView(true) }}>
                                            <CrossIcon />
                                        </button>
                                    </div>
                                    <button
                                        data-test-id='sort-rating-button'
                                        type='button'
                                        className='sort-button'
                                        onClick={() => { onSortingClick() }}
                                    >
                                        {currentAscDescSorting === 'desc' ? <DescSortIcon /> : <AscSortIcon />}
                                        <span>По рейтингу</span>
                                    </button>
                                </div>
                                <div className='topbar-right'>
                                    <button type='button' aria-label='table' data-test-id='button-menu-view-window' className={cardsViewMode === ViewModes.Table ? 'active' : ''} onClick={() => { setCardsViewMode(ViewModes.Table) }}><TableIcon className='icon' /></button>
                                    <button type='button' aria-label='list' data-test-id='button-menu-view-list' className={cardsViewMode === ViewModes.List ? 'active' : ''} onClick={() => { setCardsViewMode(ViewModes.List) }}><ListIcon className='icon' /></button>
                                </div>
                            </div>
                            {errorText ? <div className='error'>
                                {errorText === ErrorText.CategoryError ?
                                    <p data-test-id='empty-category' className='error-text'>{errorText}</p> :
                                    <p data-test-id='search-result-not-found' className='error-text'>{errorText}</p>
                                }

                            </div> :
                                <div className={cardsViewMode === ViewModes.Table ? 'table' : 'list'}>
                                    {books.map((card: Card) => <CardComponent key={card.id} card={card} viewMode={cardsViewMode} searchingText={inputValue} />)}
                                </div>}
                        </div> :
                        null}
                </div>
            }</div>
    )
};
