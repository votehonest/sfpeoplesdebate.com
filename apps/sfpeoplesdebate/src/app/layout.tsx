import './global.css';
import { metadata as coreMetadata } from './metadata';

export const metadata = coreMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
