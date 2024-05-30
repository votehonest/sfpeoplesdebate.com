'use client';

import {
  Candidate,
  CandidateQuestion,
  Question as IQuestion,
  Status,
} from '@prisma/client';
import styles from './question.module.scss';
import Link from 'next/link';
import { FC, PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import cx from 'clsx';

type CandidateQuestionDetails = CandidateQuestion & {
  candidate: Candidate;
};

type QuestionDetails = IQuestion & {
  candidateQuestions: CandidateQuestionDetails[];
};

export const Question = ({
  question: originalQuestion,
  asLink,
}: {
  question: QuestionDetails;
  asLink?: boolean;
}) => {
  const { token: candidateToken } = useParams();
  const [question, setQuestion] = useState<QuestionDetails>(originalQuestion);
  const [isLoading, setIsLoading] = useState(false);

  const {
    id,
    status,
    createdAt,
    name,
    candidateQuestions,
    question: questionText,
  } = question;

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
          body: JSON.stringify({ id, status, candidateToken }),
        });
        if (response.status !== 200) {
          try {
            throw new Error(await response.json());
          } catch (e) {
            throw new Error(await response.text());
          }
        }
        const { data } = await response.json();
        setIsLoading(false);
        setQuestion(data.question as unknown as QuestionDetails);
        return response.json();
      } catch (e) {
        alert(`Error updating question: ${e}`);
        setIsLoading(false);
        console.error(e);
      }
    },
    [candidateToken, id]
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
          <h2>{questionText}</h2>
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
            Asked <DisplayDate date={createdAt} />
          </LinkToQuestion>
        </p>
        <ul>
          {!candidateQuestions || candidateQuestions.length === 0 ? (
            <li>No candidates have replied</li>
          ) : (
            candidateQuestions
              .reduce<{ candidate: Candidate; actions: CandidateQuestion[] }[]>(
                (acc, candidateQuestion) => {
                  const existing = acc.find(
                    (item) =>
                      item.candidate.id === candidateQuestion.candidate.id
                  );
                  if (existing) {
                    existing.actions.push(candidateQuestion);
                  } else {
                    acc.push({
                      candidate: candidateQuestion.candidate,
                      actions: [candidateQuestion],
                    });
                  }
                  return acc;
                },
                []
              )
              .map(({ actions, candidate }) => {
                return (
                  <CandidateQuestionDetails
                    key={candidate.id}
                    actions={actions}
                    candidate={candidate}
                  />
                );
              })
          )}
        </ul>
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

const CandidateQuestionDetails = ({
  candidate,
  actions,
}: {
  candidate: Candidate;
  actions: CandidateQuestion[];
}) => {
  const [mostRecentAction, ...otherActions] = actions;

  const [showOtherActions, setShowOtherActions] = useState(false);

  return (
    <li key={candidate.id} className={styles.candidateQuestion}>
      <strong>
        {candidate.firstName} {candidate.lastName}
      </strong>{' '}
      marked as <strong>{mostRecentAction.status.toLowerCase()}</strong>
      <br />
      <small>
        <DisplayDate date={mostRecentAction.createdAt} />
        {otherActions.length > 0 && (
          <>
            {' '}
            ∙{' '}
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowOtherActions(!showOtherActions);
              }}
            >
              {showOtherActions ? 'Hide' : 'Show'} other actions
            </Link>
          </>
        )}
      </small>
      {otherActions.length > 0 && showOtherActions && (
        <table className={styles.otherActions}>
          {otherActions.map((action) => (
            <tr key={action.id}>
              <td>
                <strong>
                  {capitalizeFirstLetter(action.status.toLowerCase())}
                </strong>
              </td>
              <td>
                <small>
                  <DisplayDate date={action.createdAt} />
                </small>
              </td>
            </tr>
          ))}
        </table>
      )}
    </li>
  );
};

const DisplayDate = ({ date }: { date: Date | string }) => {
  const dateObject = useMemo(() => {
    if (typeof date === 'string') {
      return new Date(date);
    }
    return date;
  }, [date]);
  return (
    <time dateTime={date.toString()}>
      {dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })}
    </time>
  );
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
