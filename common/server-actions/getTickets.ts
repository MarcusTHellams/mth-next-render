'use server';

import { prismaClient } from '@/prismaConnection';

type GroupType = {
  count: number;
  [key: string]: string | number;
};

export async function getTickets() {
  'use server';

  const ticketsByType = prismaClient.$queryRaw<GroupType[]>`
    SELECT type as "name", CAST(COUNT(*) AS INTEGER) as "count" from "Ticket"
    GROUP BY type;
  `;

  const ticketsByStatus = prismaClient.$queryRaw<GroupType[]>`
    SELECT status as "name", CAST(COUNT(*) AS INTEGER) as "count" from "Ticket"
    GROUP BY status;
  `;

  const ticketsByPriority = prismaClient.$queryRaw<GroupType[]>`
    SELECT priority as "name", CAST(COUNT(*) AS INTEGER) as "count" from "Ticket"
    GROUP BY priority;
  `;

  const ticketsByDeveloper = prismaClient.$queryRaw<GroupType[]>`
      SELECT  "User"."username" as "name", CAST(COUNT("Ticket"."developerId") AS INTEGER) AS "count"
      from "User"
      INNER JOIN "Ticket"
      ON "User"."id" = "Ticket"."developerId"
      GROUP By "name"
      ORDER BY "count" DESC
      LIMIT 5
  `;


  const results = await prismaClient.$transaction([
    ticketsByType,
    ticketsByPriority,
    ticketsByStatus,
    ticketsByDeveloper,
  ]);

  results[0].forEach(r => r.count = Number(r.count));
  results[1].forEach(r => r.count = Number(r.count));
  results[2].forEach(r => r.count = Number(r.count));
  results[3].forEach(r => r.count = Number(r.count));


  return results;
}
