import Link from 'next/link';
import styles from './layout.module.scss';
import { prisma } from '../../api/prisma';

const getData = async (token: string) => {
  const candidate = await prisma.candidate.findFirstOrThrow({
    where: {
      token: {
        equals: token,
      },
    },
  });

  return {
    candidate,
  };
};

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    token: string;
  };
}) {
  try {
    const { candidate } = await getData(params.token);
    return (
      <div className={styles.container}>
        <header className={styles.layoutHeader}>
          <Link href="/">
            <h1>The San Francisco People’s Debate for Mayor 2024</h1>
          </Link>
          <h3>
            {candidate.firstName} {candidate.middleName} {candidate.lastName}
          </h3>
        </header>
        {children}
      </div>
    );
  } catch (cause) {
    const error = cause as Error;
    return (
      <div className={styles.container}>
        <header className={styles.layoutHeader}>
          <Link href="/">
            <h1>The San Francisco People’s Debate for Mayor 2024</h1>
          </Link>
          <h3>Invalid token</h3>
          <p>
            {error.message === 'No Candidate found'
              ? 'Please check the URL and try again.'
              : 'An unexpected error occurred. Please try again later.'}
          </p>
        </header>
      </div>
    );
  }
}
