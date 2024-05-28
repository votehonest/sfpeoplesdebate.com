import Link from 'next/link';
import { prisma } from '../../../api/prisma';
import { Question } from './question';
import styles from './page.module.scss';


export const revalidate = 1;

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
    <div className={styles.container}>
      <Question {...data} />
      <Link href={`/questions`} className={styles.backLink}>
        See other questions
      </Link>
    </div>
  );
}

