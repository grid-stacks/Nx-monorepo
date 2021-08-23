import { AppProps } from 'next/app';
import Head from 'next/head';
// import { Provider } from 'react-redux';
import { store, wrapper } from '@test/stores';
import './styles.css';
import { Provider } from 'next-auth/client';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Provider store={store}> */}
      <Head>
        <title>Welcome to ecommerce!</title>
      </Head>
      <div className="app">
        <header className="flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/nx-logo-white.svg" alt="Nx logo" width="75" height="50" />
          <h1>Welcome to ecommerce!</h1>
        </header>
        <main>
          <Provider session={pageProps.session}>
            <Component {...pageProps} />
          </Provider>
        </main>
      </div>
      {/* </Provider> */}
    </>
  );
}

export default wrapper.withRedux(CustomApp);
