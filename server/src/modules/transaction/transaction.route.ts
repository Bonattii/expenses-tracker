import { FastifyInstance } from 'fastify';

import {
  createTransactionHandler,
  deleteTransactionHandler,
  getTransactionsHandler,
  updateTransactionHandler
} from './transaction.controller';
import { $ref } from './transaction.schema';

export async function transactionRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/',
    {
      preHandler: [fastify.authenticate],
      schema: {
        body: $ref('createTransactionSchema'),
        response: {
          201: $ref('transactionResponseSchema')
        }
      }
    },
    createTransactionHandler
  );

  fastify.get(
    '/',
    {
      preHandler: [fastify.authenticate],
      schema: {
        response: {
          200: $ref('transactionsResponseSchema')
        }
      }
    },
    getTransactionsHandler
  );

  fastify.put(
    '/',
    {
      preHandler: [fastify.authenticate],
      schema: {
        body: $ref('updateTransactionSchema'),
        response: { 201: $ref('transactionResponseSchema') }
      }
    },
    updateTransactionHandler
  );

  fastify.delete(
    '/',
    {
      preHandler: [fastify.authenticate],
      schema: {
        body: $ref('deleteTransactionSchema')
      }
    },
    deleteTransactionHandler
  );
}
