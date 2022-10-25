import * as React from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { newsAPI } from '@/redux/news-slice';

export default function useGetGlobalNews(title: string) {
  const { news, loading } = useAppSelector(({ news }) => news);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(newsAPI(title));
  }, [title]);

  return { news, loading };
}
