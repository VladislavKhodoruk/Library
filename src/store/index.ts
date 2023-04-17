import { configureStore } from '@reduxjs/toolkit';

import bookPageReducer from './book-page-slice';
import mainPageReducer from './main-page-slice';
import sidebarReducer from './sidebar-slice';
import registrationPageReducer from './registration-page-slice';
import authorizationPageReducer from './authorization-page-slice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    mainPage: mainPageReducer,
    bookPage: bookPageReducer,
    registrationPage: registrationPageReducer,
    authorizationPage: authorizationPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
