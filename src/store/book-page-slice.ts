import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { LoadingStatus } from 'entities/enums';
import { Nullable } from 'entities/types';

import { Book } from '../entities/interfaces';

import axios from './axios';

interface BookPageState {
  book: Nullable<Book>;
  loadingStatus: string;
}

export const fetchBook = createAsyncThunk<Book, string, { state: { bookPage: BookPageState } }>(
  'book/fetchBook',
  async (id) => {
    const response: AxiosResponse = await axios.get(`/api/books/${id}`);
    return response.data;
  },
  {
    condition: (_, { getState }) => {
      if (getState().bookPage.loadingStatus === LoadingStatus.loading) {
        return false;
      }
      return true;
    },
  }
);

const initialState: BookPageState = {
  book: null,
  loadingStatus: LoadingStatus.default,
};

const bookPageSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBook.pending, (state) => {
        state.loadingStatus = LoadingStatus.loading;
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.loadingStatus = LoadingStatus.loaded;
        state.book = action.payload;
      })
      .addCase(fetchBook.rejected, (state) => {
        state.loadingStatus = LoadingStatus.error;
      });
  },
});

export default bookPageSlice.reducer;
