import * as React from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { newsAPI } from '@/redux/news-slice';

export default function useGetIndonesiaNews() {
  const { news, loading } = useAppSelector(({ news }) => news);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(newsAPI('indonesia'));
  }, []);

  return { news, loading };
}
