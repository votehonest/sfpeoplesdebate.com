import { Question as IQuestion } from '@prisma/client';
import styles from './question.module.scss';
import Link from 'next/link';

export const Question = ({ id, question, name, createdAt }: IQuestion) => {
  return (
    <div className={styles.container}>
      <Link className={styles.link} href={`/questions/${id}`}>
        <h2>{question}</h2>
        <div className={styles.divider} />
        <p>
          <strong>{name || 'Anonymous'}</strong>
        </p>
        <p>
          {createdAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          })}
        </p>
      </Link>
    </div>
  );
};
