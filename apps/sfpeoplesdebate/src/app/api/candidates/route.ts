import { resolve } from 'path';
import CsvReadableStream from 'csv-reader';
import { createReadStream } from 'fs';
import { prisma } from '../prisma';

interface ICandidateInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  active?: boolean;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  if (searchParams.get('token') !== process.env.ADMIN_TOKEN) {
    return new Response(
      JSON.stringify({
        message: 'You are not authorized to access this resource.',
        error: 'Unauthorized',
      }),
      {
        status: 401,
      }
    );
  }

  const filePath = resolve('../../fixtures/candidates.csv');
  const inputStream = createReadStream(filePath, 'utf8');

  const records: ICandidateInfo[] = [];

  await new Promise<void>((resolve, reject) =>
    inputStream
      .pipe(
        new CsvReadableStream({
          parseNumbers: true,
          parseBooleans: true,
          trim: true,
          asObject: true,
        })
      )
      .on('data', function (row) {
        records.push(row as unknown as ICandidateInfo);
      })
      .on('end', function () {
        resolve();
      })
  );

  for (const candidateInfo of records) {
    await prisma.candidate.upsert({
      where: {
        firstName_lastName: {
          firstName: candidateInfo.firstName,
          lastName: candidateInfo.lastName,
        },
      },
      create: {
        firstName: candidateInfo.firstName,
        lastName: candidateInfo.lastName,
        email: candidateInfo.email,
        phone: candidateInfo.phone,
        notes: candidateInfo.notes,
        active: candidateInfo.active !== false,
      },
      update: {
        firstName: candidateInfo.firstName,
        lastName: candidateInfo.lastName,
        email: candidateInfo.email,
        phone: candidateInfo.phone,
        notes: candidateInfo.notes,
        active: candidateInfo.active !== false,
      },
    });
  }

  const allCandidates = await prisma.candidate.findMany({
    orderBy: {
      lastName: 'asc',
    },
    where: {
      active: true,
    },
  });

  return new Response(
    JSON.stringify(
      {
        candidates: allCandidates.map((candidate) => ({
          ...candidate,
          url: `/admin/${candidate.token}/`,
        })),
      },
      null,
      2
    ),
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
}
