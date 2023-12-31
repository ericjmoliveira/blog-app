import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import { Sidebar } from '@/components/sidebar';
import { Content } from '@/components/content';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar />
        <Content>{children}</Content>
        <ToastContainer />
      </body>
    </html>
  );
}
