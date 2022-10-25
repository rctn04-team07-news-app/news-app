import { AppProps } from 'next/app';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { InputTextProvider } from '@/hooks/useTextInput';

import { wrapper } from '@/redux/store';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <InputTextProvider>
      <Component {...pageProps} />
    </InputTextProvider>
  );
}

export default wrapper.withRedux(MyApp);
