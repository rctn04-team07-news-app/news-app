import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

interface Props {
  source: { id: string; name: string };
  urlToImage: string;
  title: string;
  publishedAt: string;
}

export default function NewsCard(props: Props) {
  const { publishedAt, source, title, urlToImage } = props;
  return (
    <div
      className='group flex w-full justify-center px-4 py-6 md:w-6/12 lg:w-4/12'
      key={source.id}
    >
      <div className='relative'>
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
          className='mb-4 rounded-3xl object-cover transition duration-500 group-hover:brightness-50'
          alt={title}
        />
        <div className='xs:pt-10 absolute bottom-0 w-full rounded-b-3xl bg-gradient-to-b from-transparent to-zinc-900 px-2 pb-4 hover:shadow-xl md:pt-20'>
          <h2 className='mb-2 text-center text-white md:text-sm lg:text-lg'>
            {title}
          </h2>
          <div className='flex justify-center gap-2 text-gray-200 md:text-xs lg:text-sm'>
            <p>{publishedAt.slice(0, 10)}</p>
            <span>&bull;</span>
            <p>{source.name}</p>
          </div>
        </div>
        <button
          type='button'
          className='bg-white-500 hover:bg-white-800 absolute top-0 right-0 m-3 hidden rounded p-2 text-white transition duration-500 group-hover:block'
        >
          <FaRegBookmark />
          <FaBookmark />
        </button>
      </div>
    </div>
  );
}
