import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { LoadingStatus } from 'entities/enums';
import { RegistrationPageState, RegistrationRequest } from '../entities/interfaces';
import axios from './axios';

const initialState: RegistrationPageState = {
  loadingStatus: LoadingStatus.Default,
  errorStatusCode: null,
  errorMessage: null,
};

export const registerUser = createAsyncThunk<
  any,
  RegistrationRequest,
  { state: { registrationPage: RegistrationPageState } }
>(
  'register',
  async (body, { rejectWithValue }) => {
    const response = await axios
      .post('api/auth/local/register', body)
      .then((response) => {
        return response;
      })
      .catch(async (e) => {
        const error = e as AxiosError;
        if ((await error?.response?.status) === 400) {
          return rejectWithValue({
            statusCode: error?.response?.status,
            message:
              'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.',
          });
        }
        return rejectWithValue({
          statusCode: error?.response?.status,
          message: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
        });
      });
    return response;
  },
  {
    condition: (_, { getState }) => {
      if (
        getState().registrationPage.loadingStatus === LoadingStatus.Loading ||
        getState().registrationPage.loadingStatus === LoadingStatus.Error
      ) {
        return false;
      }
      return true;
    },
  }
);

const registrationPageSlice = createSlice({
  name: 'registration',
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
      .addCase(registerUser.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loadingStatus = LoadingStatus.Loaded;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loadingStatus = LoadingStatus.Error;
        state.errorStatusCode = (action.payload as any).statusCode;
        state.errorMessage = (action.payload as any).message;
      });
  },
});

export const { setDefaultLoadingStatus, setDefaultErrorStatusCode, setDefaultErrorMessage } =
  registrationPageSlice.actions;

export default registrationPageSlice.reducer;
