import store from "@/redux/store";
import "@/styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>CLABBLE</title>
        <link rel="icon" href="/clabble_logo.png"></link>
      </Head>
      <Provider store={store}>
      <Toaster />

      <Component {...pageProps} />
      </Provider>
    </>
  );
}
