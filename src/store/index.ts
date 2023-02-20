import { configureStore } from '@reduxjs/toolkit';

import bookPageReducer from './book-page-slice';
import mainPageReducer from './main-page-slice';
import sidebarReducer from './sidebar-slice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    mainPage: mainPageReducer,
    bookPage: bookPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
