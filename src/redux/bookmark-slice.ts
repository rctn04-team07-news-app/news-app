import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Article } from '@/types';

type NewsState = {
  news: Article[];
};

const initialState = {
  news: [],
} as NewsState;

const newsSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<Article>) => {
      state.news.push(action.payload);
    },
    delete: (state, action: PayloadAction<Article>) => {
      //found news by article
      const foundNews = state.news.findIndex(
        (item) => item.url === action.payload.url
      );
      if (foundNews > -1) {
        state.news.splice(foundNews, 1);
      }
    },
  },
});

export default newsSlice.reducer;
