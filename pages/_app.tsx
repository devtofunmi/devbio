import "@/styles/globals.css";
import "keen-slider/keen-slider.min.css";
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from "next/app";
import { AuthProvider } from "@/lib/AuthContext";
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </AuthProvider>
  );
}