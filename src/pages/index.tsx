import * as React from 'react';

import Layout from '@/components/layout/Layout';
import NewsCard from '@/components/news-card';
import Seo from '@/components/Seo';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { newsAPI } from '@/redux/news-slice';

export default function HomePage() {
  const { news } = useAppSelector(({ news }) => news);
  const dispatch = useAppDispatch();

  // const { value } = useTextInput();

  React.useEffect(() => {
    dispatch(newsAPI('indonesia'));
  }, []);

  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col'>
            <div className='border-b border-gray-200 py-5'>
              <h3 className='text-center text-lg font-medium leading-6 text-gray-900'>
                News
              </h3>
            </div>
            <div className='-mx-4 mt-6 flex flex-wrap'>
              {news.map((item) => (
                <NewsCard key={item.source.id} {...item} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
