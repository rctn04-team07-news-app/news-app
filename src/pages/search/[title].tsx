import Layout from '@/components/layout/Layout';
import NewsCard from '@/components/NewsCard';
import Seo from '@/components/Seo';
import Title from '@/components/TitlePage';
import useGetGlobalNews from '@/hooks/useGetGlobalNews';
import { useRouter } from 'next/router';
import { ImSpinner2 } from 'react-icons/im';

export default function SearchPage() {
  const { query } = useRouter();
  const { title } = query;
  const { loading, news } = useGetGlobalNews(title?.toString()!);

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
