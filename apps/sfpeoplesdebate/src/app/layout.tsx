import './global.css';
import { metadata as coreMetadata } from './metadata';
import { Analytics } from '@vercel/analytics/react';
import { ColorSchemeScript } from '@mantine/core';
// import { ChakraProvider } from '@chakra-ui/react';

export const metadata = coreMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      {/* <ChakraProvider> */}
      <body>{children}</body>
      {/* </ChakraProvider> */}
      <Analytics />
    </html>
  );
}
