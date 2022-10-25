import * as React from 'react';

type TitleProps = {
  children?: React.ReactNode;
};

export default function Title({ children }: TitleProps) {
  return (
    <div className='border-b border-gray-200 py-5'>
      <h3 className='text-center text-lg font-medium capitalize leading-6 text-gray-900'>
        {children} news
      </h3>
    </div>
  );
}
