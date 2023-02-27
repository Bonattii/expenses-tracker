require('dotenv').config();
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import jwt from '@fastify/jwt';

import { userRoutes } from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';
import { transactionRoutes } from './modules/transaction/transaction.route';
import { transactionSchemas } from './modules/transaction/transaction.schema';

// Initialize the server and export to be used on the user controller
export const fastify = Fastify({
  logger: true
});

// Register jwt into the server
fastify.register(jwt, {
  secret: process.env.SECRET!
});

// Customize the core fastify object to have the authenticate
fastify.decorate(
  'authenticate',
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      return reply.send(error);
    }
  }
);

async function bootstrap() {
  // Register the schemas into the server
  for (const schema of [...userSchemas, ...transactionSchemas]) {
    fastify.addSchema(schema);
  }

  // Register the routes on the server to be used
  await fastify.register(userRoutes, { prefix: 'api/users' });
  await fastify.register(transactionRoutes, { prefix: 'api/transactions' });

  // Put the server to lister to the port 3333
  await fastify.listen({ port: 3333, host: '0.0.0' });
}

bootstrap();
