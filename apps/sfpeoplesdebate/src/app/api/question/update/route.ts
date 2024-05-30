import assert from 'assert';
import { prisma } from '../../prisma';
import { Status } from '@prisma/client';

export async function POST(request: Request) {
  const { status, id, candidateToken } = await request.json();

  assert(typeof candidateToken === 'string', 'candidateToken is required');
  assert(typeof status === 'string', 'status is required');
  assert(
    Object.keys(Status).includes(status),
    `status should be in ${Object.keys(Status).join(', ')}`
  );
  assert(typeof id === 'string', 'id is required');

  // Check token:

  const candidate = await prisma.candidate.findFirst({
    where: {
      token: candidateToken,
    },
  });

  if (!candidate) {
    return new Response(
      JSON.stringify({
        message: 'Error updating question',
        error: `Invalid token: ${candidateToken}`,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  const question = await prisma.question.findFirst({
    where: {
      id,
    },
  });

  if (!question) {
    return new Response(
      JSON.stringify({
        message: 'Error updating question',
        error: `Invalid question id: ${id}`,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  await prisma.candidateQuestion.create({
    data: {
      candidateId: candidate.id,
      questionId: id,
      status: status as Status,
    },
  });

  await prisma.question.update({
    where: {
      id,
    },
    data: {
      status: status as Status,
    },
  });

  console.log(
    `Candidate ${candidate.firstName} ${candidate.lastName} updated question ${id} to status ${status}: ${question.question}`
  );

  // Return json response:
  try {
    const response = await prisma.question.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        candidateQuestions: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            candidate: true,
          },
        },
      },
    });

    return new Response(
      JSON.stringify({
        message: 'Question updated!',
        data: {
          question: response,
        },
        editQuestionUrl: `/questions/${response.id}`,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: 'Error updating question',
        error: `${error}`,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
