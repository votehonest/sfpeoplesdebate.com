'use client';
import { useState } from 'react';
import styles from './ask-question.module.scss';

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
  const [question, setQuestion] = useState('');
  const [name, setName] = useState('');
  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('submit');

    try {
      const response = await submitToApiEndpoint(question, name);

      window.alert(JSON.stringify({ response }));
    } catch (error) {
      window.alert(
        JSON.stringify({ error, message: (error as Error).message })
      );
    }
  };
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
          <button className={styles.button} onClick={submit}>
            Ask
          </button>
        </form>
      </div>
    </>
  );
};
