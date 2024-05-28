import { prisma } from './prisma';

export async function POST(request: Request) {
  const { question, name } = await request.json();
  // Return json response:
  try {
    const response = await prisma.question.create({
      data: {
        question,
        name,
      },
    });

    return new Response(
      JSON.stringify({
        message: 'Question submitted!',
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
        message: 'Error submitting question',
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
