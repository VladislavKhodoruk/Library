import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { LoadingStatus } from 'entities/enums';

import { Category, SidebarState } from '../entities/interfaces';

import axios from './axios';

export const fetchCategories = createAsyncThunk<Category[], undefined, { state: { sidebar: SidebarState } }>(
  'categories/fetchCategories',
  async () => {
    const response: AxiosResponse = await axios.get('/api/categories');

    return response.data;
  },
  {
    condition: (_, { getState }) => {
      if (getState().sidebar.loadingStatus === LoadingStatus.Loading) {
        return false;
      }

      return true;
    },
  }
);

const initialState: SidebarState = {
  categories: [],
  loadingStatus: LoadingStatus.Default,
};

const sidebarSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategoriesDefaultLoadingStatus(state) {
      state.loadingStatus = LoadingStatus.Default;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loadingStatus = LoadingStatus.Loaded;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loadingStatus = LoadingStatus.Error;
      });
  },
});

export const { setCategoriesDefaultLoadingStatus } = sidebarSlice.actions;

export default sidebarSlice.reducer;
