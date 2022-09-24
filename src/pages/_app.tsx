import { AppProps } from 'next/app';

import '../styles/globals.scss';
// import { QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools'
// import { queryClient } from '../services/queryClient';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
