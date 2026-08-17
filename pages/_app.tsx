import "@/styles/globals.css";
import "keen-slider/keen-slider.min.css";
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import type { AppProps } from "next/app";
import Head from "next/head";
import { AuthProvider } from "@/lib/AuthContext";
import { ToastContainer } from 'react-toastify';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { Analytics } from '@vercel/analytics/react';
import { rootFontStyles } from "@/lib/fonts";

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <AuthProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          {/* Icons live in _document.tsx so there is a single source of truth */}
          <meta name="theme-color" content="#000000" />
          <style
            id="font-variables"
            dangerouslySetInnerHTML={{ __html: rootFontStyles }}
          />
        </Head>
        <Component {...pageProps} />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        <Analytics />
      </AuthProvider>
    </SessionContextProvider>
  );
}
