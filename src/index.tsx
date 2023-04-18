import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthorizationPage } from 'pages/authorisation';
import { RegistrationPage } from 'pages/registration';
import { ForgotPasswordPage } from 'pages/forgot-password';
import { LayoutEntrance } from 'components/layout-entrance';
import { LayoutMain } from 'components/layout-main';
import { Layout } from './components/layout';
import { BookPage } from './pages/book';
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
                    <Route path='/' element={<LayoutEntrance />}>
                        <Route path='/' element={<Navigate to='/auth' />} />
                        <Route path='/auth' element={<AuthorizationPage />} />
                        <Route path='/registration' element={<RegistrationPage />} />
                        <Route path='/forgot-pass' element={<ForgotPasswordPage />} />
                    </Route>
                    <Route element={<Layout />}>
                        <Route element={<LayoutMain />}>
                            <Route path='/books' element={<Navigate to='/books/all' />} />
                            <Route path='/books/:category' element={<MainPage />} />
                            <Route path='/terms' element={<TermsPage page='terms' />} />
                            <Route path='/pact' element={<TermsPage page='contract' />} />
                        </Route>
                        <Route path='/books/:category/:bookId' element={<BookPage />} />
                    </Route>
                </Routes>
            </HashRouter>
        </Provider>
    </React.StrictMode >
);
