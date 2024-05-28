import { prisma } from '../api/prisma';
import { Question } from './[id]/question';
import styles from './page.module.scss';

const getData = async () => {
  const questions = await prisma.question.findMany({
    where: {
      question: {
        startsWith: '%',
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return questions.filter(
    (question) => question.question && question.question.length > 0
  );
};

export default async function Index() {
  const data = await getData();
  return (
    <div className={styles.questions}>
      {data.map((question) => (
        <Question key={question.id} {...question} />
      ))}
    </div>
  );
}