import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { LoadingStatus } from 'entities/enums';

import { Book, BookPageState } from '../entities/interfaces';

import axios from './axios';

export const fetchBook = createAsyncThunk<Book, string, { state: { bookPage: BookPageState } }>(
  'book/fetchBook',
  async (id) => {
    const response: AxiosResponse = await axios.get(`/api/books/${id}`);
    return response.data;
  },
  {
    condition: (_, { getState }) => {
      if (getState().bookPage.loadingStatus === LoadingStatus.Loading) {
        return false;
      }
      return true;
    },
  }
);

const initialState: BookPageState = {
  book: null,
  loadingStatus: LoadingStatus.Default,
};

const bookPageSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBook.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.loadingStatus = LoadingStatus.Loaded;
        state.book = action.payload;
      })
      .addCase(fetchBook.rejected, (state) => {
        state.loadingStatus = LoadingStatus.Error;
      });
  },
});

export default bookPageSlice.reducer;
