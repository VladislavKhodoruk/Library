import { SyntheticEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Card } from 'components/card';
import crossIcon from '../../assets/crossIcon.svg';
import searchIcon from '../../assets/searchIcon.svg';
import sortIcon from '../../assets/sortIcon.svg';
import { ReactComponent as TableIcon } from '../../assets/tableIcon.svg';
import { Book } from '../../components/card/interfaces';
import { ViewModes } from '../../components/card/enums';
import { ReactComponent as ListIcon } from '../../assets/listIcon.svg';
import './main-page.scss';

export const MainPage = (props: { store: any }) => {
    const { genreName } = useParams();
    const [viewMode, setViewMode] = useState(ViewModes.Table);
    const [inputView, setInputView] = useState(true);
    const [inputValue, setInputValue] = useState('');

    let books;
    if (genreName === 'all') {
        books = props.store.booksData.map((el: any) => el.books.map((book: Book) => <Card key={book.id} book={book} viewMode={viewMode} />));
    }
    else {
        books = props.store.booksData.find((el: any) => el.genreName === genreName).books.map((book: Book) => <Card key={book.id} book={book} viewMode={viewMode} />);
    }
    return (
        <div className='main-page'>
            <div className={classNames('topbar', { 'scaled': inputView })}>
                <div className='topbar-left'>
                    <div className='input-container'>
                        <button data-test-id='button-search-open' type='button' className='search-button' onClick={() => { setInputView(false) }}><img src={searchIcon} alt='Search' /></button>
                        <input data-test-id='input-search' type='text' placeholder='Поиск книги или автора...' onChange={(e) => { setInputValue(e.target.value) }} value={inputValue} />
                        <button data-test-id='button-search-close' type='button' className='close-button' onClick={(e: SyntheticEvent) => {
                            setInputView(true);
                            setInputValue('');
                        }}><img src={crossIcon} alt='Close' /></button>
                    </div>
                    <button type='button' className='sort-button'><img className='icon' src={sortIcon} alt='Sort' /><span>По рейтингу</span></button>
                </div>
                <div className='topbar-right'>
                    <button type='button' aria-label='table' data-test-id='button-menu-view-window' className={viewMode === ViewModes.Table ? 'active' : ''} onClick={() => { setViewMode(ViewModes.Table) }}><TableIcon className='icon' /></button>
                    <button type='button' aria-label='list' data-test-id='button-menu-view-list' className={viewMode === ViewModes.List ? 'active' : ''} onClick={() => { setViewMode(ViewModes.List) }}><ListIcon className='icon' /></button>
                </div>
            </div>
            <div className={viewMode === ViewModes.Table ? 'table' : 'list'}>
                {books}
            </div>
        </div>
    )
};

