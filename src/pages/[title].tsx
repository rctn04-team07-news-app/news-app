import { useRouter } from 'next/router';
import * as React from 'react';
import { ImSpinner2 } from 'react-icons/im';

import useGetNews from '@/hooks/useGetNews';

import Layout from '@/components/layout/Layout';
import NewsCard from '@/components/NewsCard';
import Seo from '@/components/Seo';
import Title from '@/components/TitlePage';

export default function Page() {
  const { query } = useRouter();
  const { title } = query;
  const { news, loading } = useGetNews(title?.toString()!);

  if (loading) {
    return (
      <Layout>
        <Seo />
        <div className='layout flex min-h-screen items-center justify-center'>
          <ImSpinner2 size={46} className='animate-spin' />
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col'>
            <Title>{title}</Title>
            <div className='-mx-4 mt-6 flex flex-wrap'>
              {news?.map((item) => {
                return <NewsCard key={item.url} {...item} />;
              })}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
