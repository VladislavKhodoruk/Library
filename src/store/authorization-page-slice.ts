import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { LoadingStatus } from 'entities/enums';
import {
  AuthorizationPageState,
  AuthorizationRequest,
  AuthorizationResponse,
  RegistrationPageState,
  RegistrationRequest,
} from '../entities/interfaces';
import axios from './axios';

const initialState: AuthorizationPageState = {
  loadingStatus: LoadingStatus.Default,
  errorStatusCode: null,
  errorMessage: null,
};

export const authorize = createAsyncThunk<
  any,
  AuthorizationRequest,
  { state: { authorizationPage: AuthorizationPageState } }
>(
  'authorize',
  async (body, { rejectWithValue }) => {
    const response = await axios
      .post('api/auth/local', body)
      .then((response: AxiosResponse<AuthorizationResponse>) => {
        localStorage.setItem('token', response.data.jwt);
        return response;
      })
      .catch(async (e) => {
        const error = e as AxiosError;
        return rejectWithValue({
          statusCode: error?.response?.status,
          message: 'Что-то пошло не так. Попробуйте ещё раз',
        });
      });
    return response;
  },
  {
    condition: (_, { getState }) => {
      if (
        getState().authorizationPage.loadingStatus === LoadingStatus.Loading ||
        getState().authorizationPage.loadingStatus === LoadingStatus.Error
      ) {
        return false;
      }
      return true;
    },
  }
);

const authorizationPageSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setDefaultLoadingStatus(state) {
      state.loadingStatus = LoadingStatus.Default;
    },
    setDefaultErrorStatusCode(state) {
      state.errorStatusCode = null;
    },
    setDefaultErrorMessage(state) {
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authorize.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(authorize.fulfilled, (state, action) => {
        state.loadingStatus = LoadingStatus.Loaded;
      })
      .addCase(authorize.rejected, (state, action) => {
        state.loadingStatus = LoadingStatus.Error;
        state.errorStatusCode = (action.payload as any).statusCode;
        state.errorMessage = (action.payload as any).message;
      });
  },
});

export const { setDefaultLoadingStatus, setDefaultErrorStatusCode, setDefaultErrorMessage } =
  authorizationPageSlice.actions;

export default authorizationPageSlice.reducer;
