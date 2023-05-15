import { prismaClient } from '@/prismaConnection';
import { randParagraph, randTextRange } from '@ngneat/falso';

const priorityArray = ['High', 'Medium', 'Low', 'None'] as const;

const statusArray = ['InProgress', 'New', 'Open', 'Resolved'] as const;
const typeArray = ['Bug', 'Feature', 'Story'] as const;

export default prismaClient.project.findMany().then(async (projects) => {
  const users = await prismaClient.user.findMany();

  return Promise.all(
    new Array(25).fill(1).map(() => {
      return prismaClient.ticket.create({
        data: {
          description: randParagraph(),
          priority:
            priorityArray[Math.floor(Math.random() * priorityArray.length)],
          status: statusArray[Math.floor(Math.random() * statusArray.length)],
          title: randTextRange({ min: 3, max: 8 }),
          type: typeArray[Math.floor(Math.random() * typeArray.length)],
          submitter: {
            connect: {
              id: users[Math.floor(Math.random() * users.length)].id,
            },
          },
          project: {
            connect: {
              id: projects[Math.floor(Math.random() * projects.length)].id,
            },
          },
        },
      });
    })
  );
});
