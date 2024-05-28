import { Status } from '@prisma/client';
import { prisma } from '../../api/prisma';
import { Question as QuestionUi } from './[id]/question';
import styles from './page.module.scss';

const getData = async () => {
  const questions = await prisma.question.findMany({
    where: {
      AND: [
        {
          question: {
            startsWith: '%',
          },
        },
        {
          status: {
            not: Status.DELETED,
          },
        },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
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
        <QuestionUi key={question.id} {...question} />
      ))}
    </div>
  );
}
