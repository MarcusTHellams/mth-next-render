import { prismaClient } from '@/prismaConnection';

export default prismaClient.$transaction(
  [
    {
      title: 'Project 1',
      description: 'This is Project 1',
    },
    {
      title: 'Project 2',
      description: 'This is Project 1',
    },
    {
      title: 'Project 3',
      description: 'This is Project 3',
    },
  ].map((obj) => {
    return prismaClient.project.create({
      data: {
        description: obj.description,
        title: obj.title,
      },
    });
  })
);

// export default prismaClient.project.createMany({
//   data: [
//     {
//       title: 'Project 1',
//       description: 'This is Project 1'
//     },
//     {
//       title: 'Project 2',
//       description: 'This is Project 1'
//     },
//     {
//       title: 'Project 3',
//       description: 'This is Project 3'
//     },
//   ],
// });
