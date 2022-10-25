import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Article } from '@/types';

type NewsState = {
  bookmarks: Article[];
};

const initialState = {
  bookmarks: [],
} as NewsState;

const bookmarksSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    saveNews: (state, action: PayloadAction<Article>) => {
      state.bookmarks.push(action.payload);
    },
    deleteNews: (state, action: PayloadAction<string>) => {
      const foundNews = state.bookmarks.findIndex(
        (item) => item.url === action.payload
      );
      if (foundNews > -1) {
        state.bookmarks.splice(foundNews, 1);
      }
    },
  },
});

export const { deleteNews, saveNews } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
