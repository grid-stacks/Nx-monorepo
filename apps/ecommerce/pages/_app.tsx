import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import {store} from "@test/stores"
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Provider store={store}>
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
          <Component {...pageProps} />
        </main>
      </div>
      </Provider>
    </>
  );
}

export default CustomApp;
