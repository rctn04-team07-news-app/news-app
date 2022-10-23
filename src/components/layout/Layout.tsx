import * as React from 'react';

import Header from '@/components/layout/Header';

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  const { children } = props;
  // Put Header or Footer Here
  return (
    <>
      <Header />
      {children}
    </>
  );
}
