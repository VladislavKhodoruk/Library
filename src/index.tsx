import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout';
import { BookPage } from './pages/book';
import { LayoutMain } from './pages/layout-main';
import { MainPage } from './pages/main';
import { TermsPage } from './pages/terms';
import { store } from './store'

import 'react-toastify/dist/ReactToastify.css';
import './index.scss';
import './adaptive/adaptive.scss';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route element={<LayoutMain />}>
                            <Route path='/' element={<Navigate to='/books/all' />} />
                            <Route path='/books' element={<Navigate to='/books/all' />} />
                            <Route path='/books/:genreName' element={<MainPage />} />
                            <Route path='/terms' element={<TermsPage page='terms' />} />
                            <Route path='/pact' element={<TermsPage page='contract' />} />
                        </Route>
                        <Route path='/books/:genreName/:bookId' element={<BookPage />} />
                    </Route>
                </Routes>
            </HashRouter>
        </Provider>
    </React.StrictMode >
);
