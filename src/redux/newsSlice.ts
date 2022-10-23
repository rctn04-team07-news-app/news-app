import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import getConfig from 'next/config';

import { Article, ResponseType } from '@/types';

const { publicRuntimeConfig: config } = getConfig();

type NewsType = 'indonesia' | 'programming' | 'covid';

function fetchNews(type: NewsType) {
  const http = axios.create({
    baseURL: config.API_URL,
    headers: {
      'X-Api-Key': config.API_KEY,
      'content-type': 'application/json',
    },
  });
  if (type === 'indonesia') {
    return http.get<Article[]>(`/top-headlines?country=id`);
  }
  return http.get<Article[]>(`/everything`);
}

export const newsAPI = createAsyncThunk('news', async () => {
  try {
    const res = await fetchNews('indonesia');
    return res.data;
  } catch (err) {
    return err;
  }
});

type NewsState = {
  news: Article[];
  loading: boolean;
  error?: AxiosError;
};

const initialState = {
  news: [],
  loading: false,
} as NewsState;

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(newsAPI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(newsAPI.fulfilled, (state, action) => {
      const data = action.payload as ResponseType;
      state.loading = false;
      state.news = data.articles;
    });
    builder.addCase(newsAPI.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error as AxiosError;
    });
  },
});

export default newsSlice.reducer;
