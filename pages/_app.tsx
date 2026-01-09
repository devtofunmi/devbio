import "@/styles/globals.css";
import "keen-slider/keen-slider.min.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/lib/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}