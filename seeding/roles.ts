import { prismaClient } from '@/prismaConnection';

export default prismaClient.$transaction(
  [
    {
      name: 'Admin',
    },
    {
      name: 'Project Manager',
    },
    {
      name: 'Submitter',
    },
    {
      name: 'Developer',
    },
  ].map((obj) => {
    return prismaClient.role.create({
      data: {
        name: obj.name,
      },
    });
  })
);

// export default prismaClient.role.createMany({
//   data: [
//     {
//       name: 'Admin',
//     },
//     {
//       name: 'Project Manager',
//     },
//     {
//       name: 'Submitter',
//     },
//     {
//       name: 'Developer',
//     },
//   ],
// });
