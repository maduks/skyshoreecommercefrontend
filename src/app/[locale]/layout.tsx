import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScriptLoader from '@/components/ScriptLoader';
import MainJsInitializer from '@/components/MainJsInitializer';
import { Provider } from '@/store/Provider';
import { QuickViewProvider } from '@/components/QuickViewProvider';
import SideCart from '@/components/SideCart';
import TawkToChat from '@/components/TawkToChat';
// import LocaleDebug from '@/components/LocaleDebug';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as (typeof locales)[number])) notFound();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <link rel="icon" href="/assets/images/favicon.png" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Provider>
            <QuickViewProvider>
              <div className="main-wrapper">
                <Header />
                {children}
                <Footer />
                <ScriptLoader />
                <MainJsInitializer />
                <SideCart />
                <TawkToChat />
              </div>
            </QuickViewProvider>
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
