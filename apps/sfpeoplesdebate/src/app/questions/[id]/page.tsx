import Link from 'next/link';
import { prisma } from '../../api/ask-question/prisma';
import { Question } from './question';
import styles from './page.module.scss';

const getData = async (id: string) => {
  const questions = await prisma.question.findFirstOrThrow({
    where: { id: id },
  });

  return questions;
};

export default async function Index({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await getData(id);
  return (
    <>
      <Question {...data} />
      <Link href={`/questions`} className={styles.backLink}>
        See other questions
      </Link>
    </>
  );
}
