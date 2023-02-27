import { FastifyReply, FastifyRequest } from 'fastify';

import {
  CreateTransactionInput,
  DeleteTransactionInput,
  UpdateTransactionInput
} from './transaction.schema';
import {
  createTransaction,
  deleteTransactions,
  getTransactions,
  updateTransaction
} from './transaction.service';

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

export async function updateTransactionHandler(
  request: FastifyRequest<{ Body: UpdateTransactionInput }>
) {
  const transaction = await updateTransaction({
    ...request.body,
    ownerId: request.user.id
  });

  return transaction;
}

export async function deleteTransactionHandler(
  request: FastifyRequest<{ Body: DeleteTransactionInput }>,
  reply: FastifyReply
) {
  try {
    await deleteTransactions(request.body.id);
    return reply.code(200).send('Deleted!');
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error);
  }
}
