import { prismaClient } from '@/prismaConnection';
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await prismaClient.user.findMany();

  return NextResponse.json(users);
}
