import { prisma } from '../../utils/prisma';
import { CreateTransactionInput } from './transaction.schema';

export async function createTransaction(
  data: CreateTransactionInput & { ownerId: string }
) {
  return prisma.transaction.create({
    data
  });
}

export async function getTransactions(ownerId: string) {
  return prisma.transaction.findMany({
    where: {
      ownerId
    }
  });
}

export async function deleteTransactions(id: string) {
  return prisma.transaction.delete({
    where: {
      id
    }
  });
}
