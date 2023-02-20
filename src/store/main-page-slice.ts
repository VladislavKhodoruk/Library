import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { LoadingStatus } from 'entities/enums';

import { Card } from '../entities/interfaces';

import axios from './axios';

interface MainPageState {
  books: Card[];
  loadingStatus: string;
}

export const fetchBooks = createAsyncThunk<Card[], undefined, { state: { mainPage: MainPageState } }>(
  'books/fetchBooks',
  async () => {
    const response: AxiosResponse = await axios.get('/api/books');
    return response.data;
  },
  {
    condition: (_, { getState }) => {
      if (
        getState().mainPage.loadingStatus === LoadingStatus.loading ||
        getState().mainPage.loadingStatus === LoadingStatus.error
      ) {
        return false;
      }
      return true;
    },
  }
);

const initialState: MainPageState = {
  books: [],
  loadingStatus: LoadingStatus.default,
};

const mainPageSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setDefaultLoadingStatus(state) {
      state.loadingStatus = LoadingStatus.default;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loadingStatus = LoadingStatus.loading;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loadingStatus = LoadingStatus.loaded;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.loadingStatus = LoadingStatus.error;
      });
  },
});

export const { setDefaultLoadingStatus } = mainPageSlice.actions;

export default mainPageSlice.reducer;
