import type { Metadata } from 'next';
import { Providers } from '../lib/providers';
import '@sheepgpt/ui/globals.css';

export const metadata: Metadata = {
  title: 'sheepGPT - AI SaaS 架构学习',
  description: '基于 BibiGPT 架构的现代化 AI SaaS 实践项目',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
