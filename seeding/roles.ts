import { prismaClient } from '@/prismaConnection';

export default prismaClient.role.createMany({
  data: [
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
  ],
});
