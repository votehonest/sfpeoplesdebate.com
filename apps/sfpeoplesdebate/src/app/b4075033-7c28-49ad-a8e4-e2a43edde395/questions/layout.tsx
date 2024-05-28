import Link from 'next/link';
import styles from './layout.module.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Link href="/">
        <h1>The San Francisco People’s Debate for Mayor 2024</h1>
      </Link>
      {children}
    </div>
  );
}
