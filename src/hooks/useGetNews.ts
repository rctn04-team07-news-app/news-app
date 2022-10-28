import * as React from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { newsAPI } from '@/redux/news-slice';

export default function useGetNews(title: string) {
  const { news, loading } = useAppSelector(({ news }) => news);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(newsAPI(title));
  }, [title]);

  return { news, loading };
}
