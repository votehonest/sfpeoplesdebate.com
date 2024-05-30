import Link from 'next/link';
import styles from './page.module.scss';
import { metadata } from './metadata';
import { Metadata } from 'next';
import { AskQuestion } from './ask-question';

const Info = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className={styles.info}>
    <h2>{title}</h2>
    <p>{children}</p>
  </div>
);

const InfoCards = () => {
  return (
    <div className={styles.infoCards}>
      <Info title="Who?">
        All mayoral candidates are invited to answer your questions
      </Info>
      <Info title="When?">
        Every Saturday 1 PM - 3 PM until election day November 5, 2024
      </Info>
      <Info title="Where?">The Hidalgo Monument atop Mission Dolores Park</Info>
    </div>
  );
};

const Hero = () => (
  <div className={styles.hero}>
    <div className={styles.heroLeft}>
      <h1>THE SAN FRANCISCO PEOPLE’S DEBATE FOR MAYOR 2024</h1>
      <p className={styles.lead}>
        Hear from the candidates for San Francisco Mayor you{' '}
        <strong>haven’t</strong> heard from
      </p>
      <Link href="#ask" className={styles.heroButtonLink}>
        <button className={styles.heroButton}>
          Ask the candidates a question &darr;
        </button>
      </Link>
      <div className={styles.heroContent}>
        <div className={styles.heroContentLeft}>
          <InfoCards />
        </div>
        <div className={styles.heroContentRight}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/statue.png"
            alt="The San Francisco People’s Debate for Mayor 2024"
          />
        </div>
      </div>
    </div>
  </div>
);

export const generateMetadata = (): Metadata => {
  return {
    title: metadata.title,
    description: metadata.description,
    twitter: {
      card: 'summary_large_image',
      images: [{ url: '/twitter-image.png' }],
    },
    openGraph: {
      images: [
        {
          url: '/opengraph-image.png',
          type: 'image/png',
          width: 2400,
          height: 1260,
          alt: metadata.title,
          secureUrl: '/opengraph-image.png',
        },
      ],
    },
    // additionalMetaTags: [
    //   {
    //     name: 'twitter:title',
    //     content: metadata.title,
    //   },
    //   {
    //     name: 'twitter:image',
    //     content: '/social/x.png',
    //   },
    // ],
  };
};

const BUILD_DATE = new Date(`${process.env.NEXT_PUBLIC_BUILD_DATE ?? ''}`);

export default function Index() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.left}>
          <Hero />
        </div>
        <div className={styles.right}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/statue.png"
            alt="The San Francisco People’s Debate for Mayor 2024"
          />
        </div>
      </header>
      <main className={styles.main} id="ask">
        <h3>Submit your Question</h3>
        <p>
          Have a question for the candidates? Submit it here and we’ll ask it
          for you!
        </p>
        <AskQuestion />
        <h3>The San Francisco People’s Debate</h3>
        <h4>Organizers</h4>
        <div className={styles.organizers}>
          <div className={styles.organizer}>
            <Link
              target="_blank"
              href="https://votehonest.org?ref=sfpeoplesdebate"
            >
              Honest Charley Bodkin
            </Link>
          </div>
          <div className={styles.organizer}>
            <Link
              target="_blank"
              href="https://www.dylanforsfmayor.com?ref=sfpeoplesdebate"
            >
              Dylan Hirsch-Shell
            </Link>
          </div>
          <div className={styles.organizer}>
            <Link
              target="_blank"
              href="https://www.serenahughes.com?ref=sfpeoplesdebate"
            >
              Serena Hughes
            </Link>
          </div>
          <div className={styles.organizer}>
            <Link
              target="_blank"
              href="https://www.sfmayor2025.com?ref=sfpeoplesdebate"
            >
              Shahram Shariati
            </Link>
          </div>
        </div>

        <h4>Contact</h4>
        <p>
          Questions or feedback?{' '}
          <strong>
            <Link href="mailto:honest@votehonest.org,s.shariati86@gmail.com?subject=San%20Francisco%20People's%20Debate%20for%20Mayor%202024">
              Contact the organizers
            </Link>
          </strong>
          .
        </p>

        <h4>Help promote</h4>
        <p>Want to help get out the word? Print these out and distribute!</p>
        <div className={styles.organizers}>
          <div className={styles.organizer}>
            <Link
              target="_blank"
              href="https://drive.google.com/file/d/1SmcAsO_cgrWpRa4VfXlCbKsR8iWb_1tA/view"
            >
              Poster (letter size)
            </Link>
          </div>
          <div className={styles.organizer}>
            <Link
              target="_blank"
              href="https://drive.google.com/file/d/1bfhCIDVccXWYS1j7PIbXwkLwAek69nYT/view"
            >
              Large poster (legal size)
            </Link>
          </div>
          <div className={styles.organizer}>
            <Link
              target="_blank"
              href="https://drive.google.com/drive/folders/1IujK5KZRX-F6GOvulZlFG1eWs3gGuVyM"
            >
              Social media post
            </Link>
          </div>
        </div>

        <p>
          <small>
            Last updated{' '}
            {BUILD_DATE.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </small>{' '}
          ∙{' '}
          <small>
            <Link
              target="_blank"
              href={'https://www.flickr.com/photos/livenature/4219728481'}
            >
              Photo credit
            </Link>
          </small>
        </p>
      </main>
    </div>
  );
}
