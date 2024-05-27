import './global.css';
import { metadata as coreMetadata } from './metadata';
import { Analytics } from '@vercel/analytics/react';

export const metadata = coreMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
