import { FastifyInstance } from 'fastify';

import {
  createTransactionHandler,
  getTransactionsHandler
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
}
