import * as React from 'react';

import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { newsAPI } from '@/redux/newsSlice';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const { news } = useAppSelector(({ news }) => news);
  const dispatch = useAppDispatch();

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
                <div
                  className='flex w-full justify-center px-4 py-6 md:w-6/12 lg:w-4/12'
                  key={item.source.id}
                >
                  <div className='relative'>
                    <NextImage
                      width={440}
                      height={293}
                      src={
                        item.urlToImage
                          ? item.urlToImage
                          : 'https://raw.githubusercontent.com/mrevanzak/DelosNews/main/assets/noImage.svg'
                      }
                      imgClassName='mb-4 rounded-3xl'
                      alt={item.title}
                    />
                    <div className='xs:pt-10 absolute bottom-0 rounded-b-3xl bg-gradient-to-b from-transparent to-zinc-900 px-2 pb-4 md:pt-20'>
                      <h2 className='mb-2 text-center text-white md:text-sm lg:text-lg'>
                        {item.title}
                      </h2>
                      <div className='flex justify-center gap-2 text-gray-200 md:text-xs lg:text-sm'>
                        <p>{item.publishedAt.slice(0, 10)}</p>
                        <span>&bull;</span>
                        <p>{item.source.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
