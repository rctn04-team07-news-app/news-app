import useCheckBookmarks from '@/hooks/useCheckBookmark';
import { deleteNews, saveNews } from '@/redux/bookmark-slice';
import { useAppDispatch } from '@/hooks/redux';
import * as React from 'react';
import {
  RiBookmarkFill,
  RiBookmarkLine,
  RiShareForwardFill,
} from 'react-icons/ri';
interface Props {
  source: { id: string; name: string };
  urlToImage: string;
  title: string;
  publishedAt: string;
  url: string;
}

export default function NewsCard({
  publishedAt,
  source,
  title,
  urlToImage,
  url,
}: Props) {
  const [onHover, setOnHover] = React.useState(false);

  const dispatch = useAppDispatch();
  const { saved } = useCheckBookmarks(url);

  const onSaveHandler = () => {
    saved
      ? dispatch(deleteNews(url))
      : dispatch(
          saveNews({
            author: '',
            content: '',
            description: '',
            publishedAt,
            source,
            title,
            url,
            urlToImage,
          })
        );
  };

  return (
    <div
      className='relative flex w-full justify-center px-4 py-6 md:w-6/12 lg:w-4/12'
      key={url}
    >
      {onHover && (
        <div
          className='absolute bottom-0 z-10 flex h-full w-full items-center justify-center gap-8 text-4xl text-white backdrop-blur-sm backdrop-grayscale transition-all'
          onMouseEnter={() => setOnHover(true)}
          onMouseLeave={() => setOnHover(false)}
        >
          <a
            className='rounded-full border-2 p-3'
            href={url}
            target='_blank'
            rel='noopener noreferrer'
          >
            <RiShareForwardFill />
          </a>
          <div
            className='cursor-pointer rounded-full border-2 p-3'
            onClick={onSaveHandler}
          >
            {saved ? <RiBookmarkFill /> : <RiBookmarkLine />}
          </div>
        </div>
      )}
      <div
        className='relative'
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        <img
          style={{
            height: 293,
            width: 440,
          }}
          src={
            urlToImage
              ? urlToImage
              : 'https://raw.githubusercontent.com/mrevanzak/DelosNews/main/assets/noImage.svg'
          }
          className='mb-4 rounded-3xl object-cover'
          alt={title}
        />
        <div className='xs:pt-10 absolute bottom-0 w-full rounded-b-3xl bg-gradient-to-b from-transparent to-zinc-900 px-2 pb-4 md:pt-20'>
          <h2 className='mb-2 text-center text-white md:text-sm lg:text-lg'>
            {title}
          </h2>
          <div className='flex justify-center gap-2 text-gray-200 md:text-xs lg:text-sm'>
            <p>{publishedAt.slice(0, 10)}</p>
            <span>&bull;</span>
            <p>{source.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
