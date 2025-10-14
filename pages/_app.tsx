import "@/styles/globals.css";
import "keen-slider/keen-slider.min.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}