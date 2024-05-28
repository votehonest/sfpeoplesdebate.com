'use client';
import { useState } from 'react';
import styles from './ask-question.module.scss';
import Link from 'next/link';

const submitToApiEndpoint = async (question: string, name: string) => {
  const response = await fetch('/api/ask-question', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question, name }),
  });
  return response.json();
};

export const AskQuestion = () => {
  const [response, setResponse] = useState<any | null>(null);
  const [question, setQuestion] = useState('');
  const [name, setName] = useState('');
  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('submit');

    try {
      const response = await submitToApiEndpoint(question, name);
      setResponse(response);
    } catch (error) {
      window.alert(
        JSON.stringify({ error, message: (error as Error).message })
      );
    }
  };
  return (
    <>
      <div className={styles.container} id="ask">
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
          <button className={styles.button} onClick={submit}>
            Ask
          </button>
          {response && (
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
