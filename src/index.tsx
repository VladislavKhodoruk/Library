import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { store } from './redux'
import './index.scss';
import { BookPage } from './pages/book';
import { TermsPage } from './pages/terms';
import { MainPage } from './pages/main';
import { Layout } from './components/layout';
import { LayoutMain } from './pages/layout-main';
import './adaptive/adaptive.scss';


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route element={<LayoutMain store={store} />}>
                        <Route path='/' element={<Navigate to='/books/all' />} />
                        <Route path='/books' element={<Navigate to='/books/all' />} />
                        <Route path='/books/:genreName' element={<MainPage store={store} />} />
                        <Route path='/terms' element={<TermsPage page='terms' />} />
                        <Route path='/pact' element={<TermsPage page='contract' />} />
                    </Route>
                    <Route path='/books/:genreName/:bookId' element={<BookPage store={store} />} />
                </Route>
            </Routes>
        </HashRouter>
    </React.StrictMode >
);
