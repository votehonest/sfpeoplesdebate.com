'use client';

import { Question as IQuestion, Status } from '@prisma/client';
import styles from './question.module.scss';
import Link from 'next/link';
import { FC, PropsWithChildren, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import cx from 'clsx';

export const Question = ({
  id,
  question,
  name,
  createdAt,
  asLink,
  status: originalStatus,
}: IQuestion & {
  asLink?: boolean;
}) => {
  const [status, setStatus] = useState<Status>(originalStatus);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const LinkToQuestion: FC<PropsWithChildren> = ({ children }) => {
    if (!asLink) {
      return <>{children}</>;
    }
    return (
      <Link className={styles.link} href={`/questions/${id}`}>
        {children}
      </Link>
    );
  };

  const updateQuestion = useCallback(
    async (status: Status) => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/question/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, status }),
        });
        setIsLoading(false);
        setStatus(status);
        return response.json();
      } catch (e) {
        alert(`Error updating question: ${e}`);
        setIsLoading(false);
        console.error(e);
      }
    },
    [id]
  );

  if (status === 'DELETED') {
    return null;
  }

  return (
    <div
      className={cx(styles.container, {
        [styles.asLink]: asLink,
      })}
      onClick={() => {
        if (asLink) {
          router.push(`/questions/${id}`);
        }
      }}
    >
      <header>
        <LinkToQuestion>
          <p>{status}</p>
          <h2>{question}</h2>
        </LinkToQuestion>
      </header>
      <footer>
        <p>
          <LinkToQuestion>
            <strong>{name || 'Anonymous'}</strong>
          </LinkToQuestion>
        </p>
        <p>
          <LinkToQuestion>
            Asked{' '}
            {createdAt.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            })}
          </LinkToQuestion>
        </p>
        <div className={styles.actions}>
          {status === 'ASKED' && (
            <button
              data-type="warning"
              disabled={isLoading}
              onClick={() => {
                updateQuestion('ACCEPTED');
              }}
            >
              Undo ask
            </button>
          )}
          {status === 'ACCEPTED' && (
            <button
              data-type="success"
              disabled={isLoading}
              onClick={() => {
                updateQuestion('ASKED');
              }}
            >
              Mark as asked
            </button>
          )}
          {(status === 'PENDING' || status === 'REJECTED') && (
            <button
              data-type="success"
              disabled={isLoading}
              onClick={() => {
                updateQuestion('ACCEPTED');
              }}
            >
              Approve
            </button>
          )}
          {status === 'REJECTED' && (
            <button
              data-type="error"
              disabled={isLoading}
              onClick={() => {
                const shouldDelete = confirm(
                  'Are you sure you want to delete this question?'
                );

                if (shouldDelete) {
                  updateQuestion('DELETED');
                }
              }}
            >
              Delete
            </button>
          )}
          {(status === 'PENDING' || status === 'ACCEPTED') && (
            <button
              data-type="error"
              disabled={isLoading}
              onClick={() => {
                updateQuestion('REJECTED');
              }}
            >
              Reject
            </button>
          )}
          {/* {status !== 'ASKED' && <button data-type="primary">Edit</button>} */}
        </div>
      </footer>
    </div>
  );
};
