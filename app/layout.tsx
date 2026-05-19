import Layout from '@/components/common/layout';
import AppProvider from '@/providers/app.provider';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const samsungOneFont = localFont({
  src: [
    {
      path: '../public/fonts/samsungone/SamsungOne-400_v1.1.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/samsungone/SamsungOne-700_v1.1.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-samsung-one',
  display: 'swap',
});

const samsungSharpSansFont = localFont({
  src: [
    {
      path: '../public/fonts/samsung-sharp-sans/SamsungSharpSans-Bold-UTF8.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-samsung-sharp',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Samsung Store',
  description: 'Official Samsung Store - Buy the latest Samsung products',
  icons: {
    icon: [
      { url: '/favicons/favicon.png', type: 'image/png' },
      { url: '/favicons/app_ico.png', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${samsungOneFont.variable} ${samsungSharpSansFont.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <AppProvider>
          <Layout>{children}</Layout>
        </AppProvider>
      </body>
    </html>
  );
}
