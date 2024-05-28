import assert from 'assert';
import { prisma } from '../../prisma';
import { Status } from '@prisma/client';

export async function POST(request: Request) {
  const { status, id } = await request.json();

  assert(typeof status === 'string', 'status is required');
  assert(
    Object.keys(Status).includes(status),
    `status should be in ${Object.keys(Status).join(', ')}`
  );
  assert(typeof id === 'string', 'id is required');

  // Return json response:
  try {
    const response = await prisma.question.update({
      where: {
        id,
      },
      data: {
        status: status as Status,
      },
    });

    return new Response(
      JSON.stringify({
        message: 'Question updated!',
        data: { response },
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
