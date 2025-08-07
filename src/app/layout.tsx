import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScriptLoader from '@/components/ScriptLoader';
import { Provider } from '@/store/Provider';
import { QuickViewProvider } from '@/components/QuickViewProvider';

export const metadata: Metadata = {
  title: 'Skyshore - Car Accessories & Parts',
  description: 'Premium car accessories and automotive parts for your vehicle',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Provider>
          <QuickViewProvider>
            <div className="main-wrapper">
              <Header />
              {children}
              <Footer />
              <ScriptLoader />
            </div>
          </QuickViewProvider>
        </Provider>
      </body>
    </html>
  );
}
