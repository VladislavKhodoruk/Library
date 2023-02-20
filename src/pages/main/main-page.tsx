import { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Card as CardComponent } from 'components/card';
import { useAppDispatch, useAppSelector } from 'entities/hooks';
import { Card } from 'entities/interfaces';
import { fetchBooks, setDefaultLoadingStatus } from 'store/main-page-slice';
import { LoadingStatus } from 'entities/enums';
import { Loader } from 'components/loader';
import { ToastContainer, toast } from 'react-toastify';

import { ReactComponent as ListIcon } from '../../assets/listIcon.svg';
import { ReactComponent as CrossIcon } from '../../assets/crossIcon.svg';
import searchIcon from '../../assets/searchIcon.svg';
import sortIcon from '../../assets/sortIcon.svg';
import { ReactComponent as TableIcon } from '../../assets/tableIcon.svg';
import { ViewModes } from '../../components/card/enums';

import './main-page.scss';

export const MainPage = () => {
    const { genreName } = useParams();
    const [cardsViewMode, setCardsViewMode] = useState(ViewModes.Table);
    const [inputView, setInputView] = useState(true);
    const [inputValue, setInputValue] = useState('');

    const dispatch = useAppDispatch();
    const allBooks = useAppSelector((state) => state.mainPage.books);
    const allBooksLoadingStatus = useAppSelector((state) => state.mainPage.loadingStatus);
    const categoriesLoadingStatus = useAppSelector((state) => state.sidebar.loadingStatus);

    const closeButton = () => (
        <button type='button' aria-label='close'><CrossIcon /></button>
    )

    useEffect(() => {
        if (allBooksLoadingStatus === LoadingStatus.error || categoriesLoadingStatus === LoadingStatus.error) {
            toast.error('Что-то пошло не так. Обновите страницу через некоторое время.', { toastId: '1' });
        }
    }, [allBooksLoadingStatus, categoriesLoadingStatus]);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(setDefaultLoadingStatus());
        };
    }, [dispatch]);

    let books: any;

    if (genreName === 'all') {
        books = allBooks.map((card: Card) => <CardComponent key={card.id} card={card} viewMode={cardsViewMode} />);
    }
    else {
        books = allBooks.find((card: Card) => card.categories?.includes(genreName!));
    }

    return (
        <div className='main'>
            {allBooksLoadingStatus === LoadingStatus.loading || categoriesLoadingStatus === LoadingStatus.loading ?
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
                    {allBooks.length ?
                        <div>
                            <div className={classNames('topbar', { 'scaled': inputView })}>
                                <div className='topbar-left'>
                                    <div className='input-container'>
                                        <button data-test-id='button-search-open' type='button' className='search-button' onClick={() => { setInputView(false) }}><img src={searchIcon} alt='Search' /></button>
                                        <input data-test-id='input-search' type='text' placeholder='Поиск книги или автора...' onChange={(event) => { setInputValue(event.target.value) }} value={inputValue} />
                                        <button aria-label='close' data-test-id='button-search-close' type='button' className='close-button' onClick={(e: SyntheticEvent) => {
                                            setInputView(true);
                                            setInputValue('');
                                        }}><CrossIcon /></button>
                                    </div>
                                    <button type='button' className='sort-button'><img className='icon' src={sortIcon} alt='Sort' /><span>По рейтингу</span></button>
                                </div>
                                <div className='topbar-right'>
                                    <button type='button' aria-label='table' data-test-id='button-menu-view-window' className={cardsViewMode === ViewModes.Table ? 'active' : ''} onClick={() => { setCardsViewMode(ViewModes.Table) }}><TableIcon className='icon' /></button>
                                    <button type='button' aria-label='list' data-test-id='button-menu-view-list' className={cardsViewMode === ViewModes.List ? 'active' : ''} onClick={() => { setCardsViewMode(ViewModes.List) }}><ListIcon className='icon' /></button>
                                </div>
                            </div>
                            <div className={cardsViewMode === ViewModes.Table ? 'table' : 'list'}>
                                {books}
                            </div>
                        </div> :
                        null}

                </div>
            }</div>
    )
};
