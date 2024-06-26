'use client';
import { useState } from 'react';
import styles from './ask-question.module.scss';
import Link from 'next/link';
import { track } from '@vercel/analytics';
import cx from 'clsx';

const submitToApiEndpoint = async (question: string, name: string) => {
  const response = await fetch('/api/question/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      question: question.trim(),
      name: name.trim(),
    }),
  });
  return response.json();
};

export const AskQuestion = ({ showOpenButton = false }) => {
  const [response, setResponse] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [name, setName] = useState('');
  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await submitToApiEndpoint(question, name);
      setResponse(response);
      track('ask-question', {
        question: question.trim(),
        name: name.trim(),
        response,
      });
    } catch (error) {
      track('ask-question-error', {
        error: (error as Error).message,
      });
      window.alert(
        JSON.stringify({ error, message: (error as Error).message })
      );
    } finally {
      setLoading(false);
    }
  };

  if (response) {
    return (
      <div className={styles.container}>
        <h5>Thank you for your question</h5>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <form>
          <textarea
            className={styles.question}
            placeholder="Question"
            defaultValue={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <input
            className={styles.name}
            placeholder="Name (optional)"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className={cx(styles.button, {
              loading,
            })}
            onClick={submit}
            disabled={loading || question.trim().length === 0}
          >
            {loading ? 'Asking...' : 'Ask'}
          </button>
          {showOpenButton && response && (
            <div className={styles.response}>
              {response.editQuestionUrl && (
                <Link href={response.editQuestionUrl}>
                  <button className={styles.button}>Open</button>
                </Link>
              )}
            </div>
          )}
        </form>
      </div>
    </>
  );
};
