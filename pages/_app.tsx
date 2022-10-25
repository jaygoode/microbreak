import "../styles/globals.css";
import "../styles/home.css";
import "../styles/timer.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
