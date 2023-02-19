import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '../pages/test/test-page-slice';

import bookPageReducer from './book-page-slice';
import mainPageReducer from './main-page-slice';
import sidebarReducer from './sidebar-slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    sidebar: sidebarReducer,
    mainPage: mainPageReducer,
    bookPage: bookPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
