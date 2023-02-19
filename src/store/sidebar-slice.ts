import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { LoadingStatus } from 'entities/enums';

import { Category } from '../entities/interfaces';

import axios from './axios';

interface SidebarState {
  categories: Category[];
  loadingStatus: string;
}

export const fetchCategories = createAsyncThunk<Category[], undefined, { state: { sidebar: SidebarState } }>(
  'categories/fetchCategories',
  async () => {
    const response: AxiosResponse = await axios.get('/api/categories');

    return response.data;
  },
  {
    condition: (_, { getState }) => {
      if (getState().sidebar.loadingStatus === LoadingStatus.loading) {
        return false;
      }

      return true;
    },
  }
);

const initialState: SidebarState = {
  categories: [],
  loadingStatus: LoadingStatus.default,
};

const sidebarSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loadingStatus = LoadingStatus.loading;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loadingStatus = LoadingStatus.loaded;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loadingStatus = LoadingStatus.error;
      });
  },
});

export default sidebarSlice.reducer;
