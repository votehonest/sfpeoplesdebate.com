import './global.css';
import { NextSeo } from 'next-seo';

export const metadata = {
  title: 'The San Francisco People’s Debate for Mayor 2024',
  description: `
    The San Francisco People’s Debate for Mayor 2024 is a series of weekly
    debates between the candidates for Mayor of San Francisco held
    in Mission Dolores Park on Saturdays from 1 PM - 3 PM.
  `,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextSeo
        title={metadata.title}
        description={metadata.description}
        twitter={{
          cardType: 'summary_large_image',
        }}
        openGraph={{
          images: [
            {
              url: '/social/fb.png',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'twitter:title',
            content: metadata.title,
          },
          {
            name: 'twitter:image',
            content: '/social/x.png',
          },
        ]}
      />
      <body>{children}</body>
    </html>
  );
}
