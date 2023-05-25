import { prismaClient } from '@/prismaConnection';
import React from 'react';

async function getTickets() {
  'use server';
  return prismaClient.ticket.findMany();
}

export default async function Page() {
  const tickets = await getTickets();
  return (
    <>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        {tickets.map((ticket) => {
          return (
            <React.Fragment key={ticket.id}>
              <li>
                <p className="leading-7 [&:not(:first-child)]:mt-[0.375rem]">
                  {ticket.title}
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-[0.375rem]">
                  {ticket.description}
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-[0.375rem]">
                  {ticket.createdAt.toISOString().split('T')[0]}
                </p>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </>
  );
}
