import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateTransactionInput } from './transaction.schema';
import { createTransaction, getTransactions } from './transaction.service';

export async function createTransactionHandler(
  request: FastifyRequest<{
    Body: CreateTransactionInput;
  }>
) {
  const transaction = await createTransaction({
    ...request.body,
    ownerId: request.user.id
  });

  return transaction;
}

export async function getTransactionsHandler(request: FastifyRequest) {
  const transactions = await getTransactions(request.user.id);

  return transactions;
}
