// These styles apply to every route in the application
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import type { ComponentType } from 'react';

// <div className="flex justify-center items-center h-screen bg-gray-200">

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
