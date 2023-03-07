import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const transactionInput = {
  text: z.string(),
  value: z.bigint()
};

const transactionGenerated = {
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
};

// Make a validation of the data that will be received using zod for creating a transaction
const createTransactionSchema = z.object({
  ...transactionInput
});

const updateTransactionSchema = z.object({
  ...transactionInput,
  id: z.string()
});

const deleteTransactionSchema = z.object({
  id: z.string()
});

// Filter what the route should respond with
const transactionResponseSchema = z.object({
  ...transactionInput,
  ...transactionGenerated
});

// Will return an array of transactions
const transactionsResponseSchema = z.array(transactionResponseSchema);

// Will export the type to be used on the service
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
export type DeleteTransactionInput = z.infer<typeof deleteTransactionSchema>;

// Create the schemas and enable to ref them into the routes
export const { schemas: transactionSchemas, $ref } = buildJsonSchemas(
  {
    createTransactionSchema,
    updateTransactionSchema,
    deleteTransactionSchema,
    transactionResponseSchema,
    transactionsResponseSchema
  },
  { $id: 'TransactionSchema' }
);
