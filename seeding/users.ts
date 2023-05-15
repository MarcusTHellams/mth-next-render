import { prismaClient } from '@/prismaConnection';
import {
  randAvatar,
  randEmail,
  randFirstName,
  randLastName,
  randUserName,
} from '@ngneat/falso';
import bcrypt from 'bcryptjs';

const hashedPassword = bcrypt.hashSync('password', 10);


export default function seedUsers () {
  return Promise.all(
    new Array(10).fill(1).map((_, index) => {
      const isFirst = index === 0;
      return prismaClient.user.create({
        data: {
          firstName: isFirst ? 'Marcus' : randFirstName(),
          lastName: isFirst ? 'Hellams' : randLastName(),
          username: isFirst ? 'mhellams' : randUserName(),
          email: isFirst ? 'mhellams@hotmail.com' : randEmail(),
          password: hashedPassword,
          imageUrl: randAvatar({ size: 200 }),
        },
      });
    })
  );
}

seedUsers();
