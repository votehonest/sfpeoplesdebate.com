'use client';
import { useState } from 'react';
import styles from './ask-question.module.scss';
import Link from 'next/link';

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
    console.log('submit');

    try {
      setLoading(true);
      const response = await submitToApiEndpoint(question, name);
      setResponse(response);
    } catch (error) {
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
            className={styles.button}
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
