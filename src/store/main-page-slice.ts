import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { LoadingStatus } from 'entities/enums';
import { MainPageState, Card } from '../entities/interfaces';

import axios from './axios';

const initialState: MainPageState = {
  books: [],
  loadingStatus: LoadingStatus.Default,
  filtration: {
    sortDirection: 'desc',
    sortCategory: 'all',
    searchingText: '',
  },
};

export const fetchBooks = createAsyncThunk<Card[], undefined, { state: { mainPage: MainPageState } }>(
  'books/fetchBooks',
  async () => {
    const response: AxiosResponse = await axios.get('/api/books');
    return response.data;
  },
  {
    condition: (_, { getState }) => {
      if (
        getState().mainPage.loadingStatus === LoadingStatus.Loading ||
        getState().mainPage.loadingStatus === LoadingStatus.Error
      ) {
        return false;
      }
      return true;
    },
  }
);

const mainPageSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setFiltration(state, action) {
      state.filtration.sortDirection = action.payload.sortDirection;
      state.filtration.sortCategory = action.payload.sortCategory;
      state.filtration.searchingText = action.payload.searchingText;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loadingStatus = LoadingStatus.Loaded;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.loadingStatus = LoadingStatus.Error;
      });
  },
});

export const { setFiltration } = mainPageSlice.actions;

export default mainPageSlice.reducer;
