import { metadata } from './metadata';
import { NextSeo } from 'next-seo';

export const Seo = () => {
  return (
    <NextSeo
      title={metadata.title}
      description={metadata.description}
      twitter={{
        cardType: 'summary_large_image',
      }}
      openGraph={{
        images: [
          {
            url: '/social/og.png',
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
  );
};
