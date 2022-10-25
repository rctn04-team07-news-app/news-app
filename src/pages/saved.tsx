import Layout from '@/components/layout/Layout';
import NewsCard from '@/components/NewsCard';
import Seo from '@/components/Seo';
import Title from '@/components/TitlePage';
import { useAppSelector } from '@/redux/hooks';

export default function SavedPage() {
  const { bookmarks } = useAppSelector(({ bookmarks }) => bookmarks);
  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col'>
            <Title>Saved</Title>
            <div className='-mx-4 mt-6 flex flex-wrap'>
              {bookmarks.length ? (
                bookmarks?.map((item) => {
                  return <NewsCard key={item.url} {...item} />;
                })
              ) : (
                <h2 className='mb-2 h-full w-full text-center text-black md:text-sm lg:text-lg'>
                  No News Saved
                </h2>
              )}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
