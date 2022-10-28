import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import getConfig from 'next/config';

import { Article, ResponseType } from '@/types';

const { publicRuntimeConfig: config } = getConfig();

type NewsType = 'indonesia' | 'programming' | 'covid' | string;
// type NewsInput = {
//   q?: string;
// };

function fetchNews(type: NewsType) {
  const http = axios.create({
    baseURL: config.API_URL,
    headers: {
      'X-Api-Key': config.API_KEY,
      'content-type': 'application/json',
    },
  });
  const date = new Date();
  const monthAgo = new Date(date.setMonth(date.getMonth() - 1)).toISOString();
  if (type === 'indonesia') {
    return http.get<Article[]>(`/top-headlines?country=id`);
  }
  if (type === 'programming' || type === 'covid') {
    return http.get<Article[]>(`/everything?q=${type}&from=${monthAgo}`);
  }
  return http.get<Article[]>(`/everything?q=${type}`);
}

export const newsAPI = createAsyncThunk('news', async (type: NewsType) => {
  try {
    const res = await fetchNews(type);
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
      return { ...state, loading: true };
    });
    builder.addCase(newsAPI.fulfilled, (state, action) => {
      const data = action.payload as ResponseType;
      return { ...state, news: data.articles, loading: false };
    });
    builder.addCase(newsAPI.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error as AxiosError };
    });
  },
});

export default newsSlice.reducer;
